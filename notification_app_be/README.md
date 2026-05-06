# Notification App Backend

A complete Node.js + Express backend project to fetch, score, and rank notifications using a protected remote evaluation API.

## Installation Steps
1. Clone the repository.
2. Ensure you have Node.js (v14+) installed.
3. Run `npm install` to install dependencies.

## Setup Instructions
1. Create a `.env` file in the root directory (or use the provided one).
2. Configure the `.env` file with your credentials:
   ```env
   PORT=5000
   ACCESS_TOKEN=<your_provided_access_token>
   ```

## Run Instructions
- **Start the server**:
  ```bash
  node server.js
  ```
The server will start on port `5000` (or the port specified in `.env`).

## API Endpoint Documentation

### `GET /api/notifications/priority`
Fetches all notifications from the remote evaluation service, applies a priority ranking algorithm based on notification Type and Recency, and returns the top 10 notifications.

**Priority Weights**:
- Placement = 30
- Result = 20
- Event = 10
- Recency = Dynamic score that increases for newer timestamps.

**Response**:
```json
{
  "success": true,
  "count": 10,
  "data": [
    {
      "ID": "d146095a-0d86-4a34-9e69-3900a14576bc",
      "Type": "Placement",
      "Message": "Interview Scheduled",
      "Timestamp": "2026-05-06 17:51:30",
      "score": 130
    }
  ]
}
```

## Architecture Explanation
The application follows a modular architecture:
- **Routes** (`src/routes/`): Maps HTTP endpoints to specific controllers.
- **Controllers** (`src/controllers/`): Handles request parsing and response formatting.
- **Services** (`src/services/`): Handles business logic, including fetching data from the external API and invoking the priority ranking.
- **Utils** (`src/utils/`): Pure utility functions for mathematical scoring and array operations (acting as a heap for Top-N extraction).
- **Config** (`src/config/`): Houses configuration files, including a dedicated reusable logging middleware that posts telemetry to the evaluation server.

## Screenshots
*(Insert screenshots of the running application and API responses in the `screenshots` folder)*
