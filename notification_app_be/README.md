# Notification App Backend

A Node.js backend for fetching and ranking student notifications. Built to demonstrate API integration and ranking algorithms for a placement assessment.

## Setup
1. Clone this repo and run `npm install`.
2. Create a `.env` file and add your token:
   ```env
   PORT=5000
   ACCESS_TOKEN=your_token_here
   ```
3. Run the server: `node server.js`

## API Endpoints

### `GET /api/notifications/priority`
Fetches all notifications, ranks them by priority and recency, and returns the top 10.

**Response Example:**
```json
{
  "success": true,
  "count": 10,
  "data": [
    {
      "ID": "d146095a-0d86-4a34-9e69-3900a14576bc",
      "Type": "Placement",
      "Message": "Interview call",
      "Timestamp": "2026-05-06 17:51:30",
      "score": 130
    }
  ]
}
```

## Structure
- `src/controllers` - Request handlers.
- `src/services` - Core business logic (fetching APIs, ranking).
- `src/utils` - Helpers for scoring and sorting.
- `src/config` - Settings and the custom logger middleware.
