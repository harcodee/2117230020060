# Stage 1

## REST API Design
The notification system exposes a RESTful interface for fetching and ranking notifications.

### Endpoint Contracts
- `GET /api/notifications/priority` - Fetches the top 10 ranked notifications from the remote evaluation service.

### Request/Response JSON
**Response (GET /api/notifications/priority)**:
```json
{
  "success": true,
  "count": 10,
  "data": [
    {
      "ID": "d146095a-0d86-4a34-9e69-3900a14576bc",
      "Type": "Placement",
      "Message": "Google Interview Scheduled",
      "Timestamp": "2026-05-06 10:51:30",
      "score": 130
    }
  ]
}
```

### Headers
- `Authorization: Bearer <TOKEN>` - Used to securely authenticate to the upstream Evaluation Service.
- `Content-Type: application/json`

### Status Codes
- `200 OK` - Success.
- `401 Unauthorized` - Token missing or expired.
- `500 Internal Server Error` - Server failed to process the request.

### Notification Schema
```json
{
  "ID": "String (UUID)",
  "Type": "Enum (Placement, Result, Event)",
  "Message": "String",
  "Timestamp": "DateTime"
}
```

### Unread Notification Flow
1. Notification is created in the DB with `isRead = false`.
2. Client queries for unread items.
3. Server returns a paginated list of unread notifications.

### Mark-Read Flow
1. User clicks or interacts with a notification.
2. Client sends a `PATCH` request to mark it as read.
3. Server updates `isRead = true` and updates the unread badge count.

### Preferences API
Allows users to configure which notification types they wish to receive (e.g., opting out of "Event" alerts).

### Pagination & Filtering
- Supports filtering by `Type`.
- Uses cursor-based pagination for infinite scrolling to maintain performance on large datasets.

### Realtime Notification Architecture
The backend uses **WebSockets** or **Server-Sent Events (SSE)**.
- **WebSocket Explanation**: Bi-directional communication enabling both live push of notifications and instant read-receipt feedback.
- **SSE Explanation**: Uni-directional (Server -> Client) streaming of text data, perfect for broadcasting notifications where clients don't need to send complex updates back over the same channel.

---

# Stage 2

## Database Choice
**PostgreSQL vs MongoDB**
PostgreSQL is preferred. Notifications are highly structured and typically require relational joins (e.g., joining with user profiles or preferences). PostgreSQL's strict schema constraints, robust ACID properties, and advanced indexing (like composite indexes for complex filtering) make it superior to MongoDB for this use case.

## Schema Design
```sql
CREATE TABLE notifications (
    id UUID PRIMARY KEY,
    student_id INT NOT NULL,
    type VARCHAR(50) NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Indexing Strategy
```sql
CREATE INDEX idx_student_unread ON notifications(student_id, is_read, created_at DESC);
```

## Scaling Concerns
- **Partitioning**: Partition the `notifications` table by `created_at` (e.g., weekly or monthly) to manage vast volumes of temporal data efficiently.
- **Archival Strategy**: Automatically move notifications older than 90 days to cold storage or an archive table.
- **Caching**: Cache unread notification counts per student in Redis to prevent heavy COUNT() queries on page load.

---

# Stage 3

## Slow Query Analysis
```sql
SELECT * FROM notifications
WHERE studentID = 1042 AND isRead = false
ORDER BY createdAt DESC;
```
**Why is it slow?**
- **Missing Composite Indexes**: Without a proper composite index, the DB must filter by `studentID`, then `isRead`, and finally perform an expensive memory or disk-based sort (FileSort) for `createdAt DESC`.
- **Complexity**: Full table scans or index scans without sort keys cause extreme CPU and I/O overhead.

## Optimized Index Query
```sql
CREATE INDEX idx_notifications_student_read_created
ON notifications(studentID, isRead, createdAt DESC);
```

**Why Indexing Every Column is Bad?**
- **Storage Overhead**: Indexes consume significant disk space and RAM.
- **Write Amplification**: Every insert or update requires updating multiple B-Trees, heavily degrading write performance.
- **Maintenance Cost**: More indexes increase the time taken by database vacuums and indexing rebuilds.

## SQL Query: Placement Notifications in Last 7 Days
```sql
SELECT DISTINCT student_id 
FROM notifications 
WHERE type = 'Placement' 
  AND created_at >= NOW() - INTERVAL '7 days';
```

---

# Stage 4

## DB Overload from Polling
Polling (e.g., HTTP requests every 5 seconds) causes massive database connection saturation and CPU spikes, especially as concurrent user counts scale into the thousands.

## Solutions
- **Redis Caching**: Cache recent or unread notifications so DB hits are minimized.
- **WebSocket Push / SSE**: Send data to clients only when an event actually occurs, reducing idle network and DB overhead to zero.
- **Read Replicas**: Distribute heavy `GET` queries across read replicas to protect the primary DB.
- **CQRS**: Separate the read model from the write model.
- **Batching & Rate Limiting**: Limit API requests and batch multiple DB inserts together.

**Tradeoffs**:
WebSockets require stateful connections and complex load balancing (sticky sessions, pub/sub for scaling), which introduces operational complexity compared to stateless HTTP polling.

---

# Stage 5

## Flaws in Provided Pseudocode
(Assuming synchronous loop processing):
- **Sequential Processing**: Sending notifications sequentially blocks the event loop.
- **Blocking IO**: Wait times for external APIs (like email/SMS providers) stall the entire queue.
- **No Retries**: Partial failures mean some users receive notifications while others permanently miss out.
- **Inconsistent State**: Crashes leave the system unaware of which notifications were successfully dispatched.
- **Scalability Issues**: A single process cannot handle a burst of 100,000 notifications.

## Improved Solution Architecture
- **Queue Architecture**: Utilize RabbitMQ, Kafka, or Redis BullMQ.
- **Worker Consumers**: Run background workers that independently pull and process jobs.
- **Retry Logic & DLQ**: Exponential backoff for retries; move permanently failed jobs to a Dead Letter Queue (DLQ) for manual inspection.
- **Async Processing & Idempotency**: Process non-blockingly and guarantee that sending the same payload twice does not result in duplicate emails.

## Improved Pseudocode
```javascript
// Publisher
async function publishNotification(event) {
  await queue.publish('notifications_queue', {
    id: event.id,
    payload: event.payload
  });
}

// Consumer Worker
queue.consume('notifications_queue', async (job) => {
  try {
    if (await isProcessed(job.id)) return; // Idempotency check
    
    await notificationService.send(job.payload);
    await markProcessed(job.id);
    
    job.ack();
  } catch (err) {
    if (job.attempts < 3) {
      job.nack(exponentialBackoff(job.attempts)); // Retry
    } else {
      await DLQ.push(job); // Dead Letter Queue
      job.ack();
    }
  }
});
```
