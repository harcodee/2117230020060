# Campus Notifications Backend

Backend microservice for ranking and prioritizing campus notifications using weighted scoring and recency-based ranking.

---

# Features

- Fetches live notifications from protected API
- Priority-based notification ranking
- Real-time ready backend architecture
- Reusable logging middleware integration
- Modular Express backend structure
- REST API implementation
- Error handling and structured logging

---

# Tech Stack

- Node.js
- Express.js
- Axios
- dotenv

---

# Folder Structure

```bash
notification_app_be/
│
├── src/
│   ├── config/
│   ├── controllers/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   └── app.js
│
├── screenshots/
├── notification_system_design.md
├── server.js
├── .env
└── README.md
```

---

# Setup Instructions

## Clone Repository

```bash
git clone <repo-url>
cd notification_app_be
```

## Install Dependencies

```bash
npm install
```

## Configure Environment Variables

Create `.env`

```env
ACCESS_TOKEN=your_token_here
```

## Run Server

```bash
node server.js
```

---

# API Endpoint

## Get Priority Notifications

```http
GET /api/notifications/priority
```

### Sample Response

```json
{
  "success": true,
  "count": 10,
  "data": [
    {
      "ID": "...",
      "Type": "Placement",
      "Message": "Microsoft hiring",
      "Timestamp": "2026-05-06 02:41:17",
      "score": 39.98
    }
  ]
}
```

---

# Priority Logic

Notification priority is calculated using:

- Notification Type Weight
- Recency Score

Weights:

| Type | Weight |
|------|------|
| Placement | 30 |
| Result | 20 |
| Event | 10 |

More recent notifications receive higher scores.

---

# Logging Middleware

Reusable logging middleware is integrated throughout:
- API calls
- ranking operations
- route handling
- error handling

---

# Screenshots
## API Response - Vehicle Maintenance Scheduler
<img width="1347" height="852" alt="image" src="https://github.com/user-attachments/assets/d039d973-aac9-4a55-8a56-54fc1f89b4f1" />

## API Response - Notification app
<img width="1338" height="783" alt="Notification api response" src="https://github.com/user-attachments/assets/693be693-5f2e-4cbc-8baf-cfa3bf25b47e" />


## Folder Structure
<img width="360" height="769" alt="image" src="https://github.com/user-attachments/assets/680ef13f-d29d-4c7a-a3fa-7916d047df47" />

## Logging Middleware
<img width="706" height="413" alt="image" src="https://github.com/user-attachments/assets/79abaa56-6fd9-4759-ac49-713b5d732678" />

# Notes

- Uses live protected API data
- No hardcoded notifications used
- Modular backend architecture followed
- Designed for scalability and maintainability
