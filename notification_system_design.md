# Notification System Design

## Stage 1: API Design
- `GET /api/notifications/priority` - Gets the top 10 notifications for the user.
- **Notification Schema**:
  ```json
  {
    "ID": "UUID",
    "Type": "Placement | Result | Event",
    "Message": "String",
    "Timestamp": "DateTime"
  }
  ```
- **Unread/Read Flow**: The DB stores an `isRead` boolean. We can update this via a `PATCH /api/notifications/:id/read` route when the user clicks a notification.
- **Realtime**: WebSockets or Server-Sent Events (SSE) would be good here. SSE is simpler if we only need one-way updates (server -> client) when new notifications arrive.

## Stage 2: Database
- **Choice**: PostgreSQL. Notifications have a rigid structure, and we'll probably need relational queries (like joining with user preferences).
- **Schema**:
  ```sql
  CREATE TABLE notifications (
      id UUID PRIMARY KEY,
      student_id INT NOT NULL,
      type VARCHAR(50),
      message TEXT,
      is_read BOOLEAN DEFAULT FALSE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
  ```
- **Indexing**: A composite index on `(student_id, is_read, created_at DESC)` would speed up queries.
- **Scaling**: We can partition the table by month so older notifications don't slow down current queries.

## Stage 3: Query Optimization
**Slow Query**:
```sql
SELECT * FROM notifications WHERE studentID = 1042 AND isRead = false ORDER BY createdAt DESC;
```
**Why it's slow**: Without a composite index, Postgres has to filter the rows, then sort them in memory (which is expensive).

**Optimized Index**:
```sql
CREATE INDEX idx_student_unread ON notifications(studentID, isRead, createdAt DESC);
```
*Note: We shouldn't just index everything because indexes take up disk space and slow down INSERTs/UPDATEs.*

**Recent Placement Notifications Query**:
```sql
SELECT DISTINCT student_id FROM notifications 
WHERE type = 'Placement' AND created_at >= NOW() - INTERVAL '7 days';
```

## Stage 4: Polling Issues
Polling the DB every 5 seconds is going to kill the database when user counts go up.
- **Solutions**: 
  - Cache unread counts in Redis.
  - Push updates via WebSockets/SSE instead of making the client ask for them constantly.
  - Rate limiting API requests to avoid spam.

## Stage 5: Message Queue
The basic pseudocode blocks the thread and doesn't handle failures well. If the email API goes down, we lose notifications.

**Better Architecture**:
Use a message queue (like RabbitMQ or Redis BullMQ). 
- The publisher adds the notification to a queue.
- Background workers process the queue asynchronously.
- If sending fails, the worker retries. If it fails too many times, it goes to a Dead Letter Queue (DLQ) for debugging.

```javascript
// Publisher
async function sendNotification(event) {
  await queue.add('notify_job', event);
}

// Worker
queue.process('notify_job', async (job) => {
  try {
    await emailService.send(job.data);
  } catch (error) {
    if (job.attemptsMade < 3) throw error; // trigger retry
    else await dlq.add(job); // give up and log it
  }
});
```
