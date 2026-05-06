# Backend Assessment Repository

This repository contains solutions for multiple backend assessment problems implemented using Node.js and Express.js.

The project focuses on:
- modular backend architecture
- reusable logging middleware
- REST API design
- optimization algorithms
- scalable notification systems
- structured error handling
- real API integration

---

# Repository Structure

```bash
2117230020060/
│
├── logging_middleware/
│
├── vehicle_maintenance_scheduler/
│
├── notification_app_be/
│
├── notification_system_design.md
│
└── .gitignore
```

---

# Projects Overview

## 1. Logging Middleware

Reusable backend logging middleware implemented as a shared utility.

### Features

- Structured logging
- External logging API integration
- Reusable Log() function
- Validation for:
  - stack
  - level
  - package
- Error logging support
- Middleware-ready architecture

### Technologies

- Node.js
- Express.js
- Axios

### Logging Format

```js
Log(stack, level, package, message)
```

### Example

```js
await Log(
  "backend",
  "info",
  "service",
  "Fetching vehicle data"
);
```

---

# 2. Vehicle Maintenance Scheduler

Backend microservice for optimizing vehicle maintenance scheduling using dynamic programming.

The service fetches:
- depot mechanic-hour constraints
- vehicle maintenance tasks

Then computes:
- optimal maintenance schedule
- maximum operational impact
- selected maintenance tasks

---

## Problem Objective

Maximize operational impact score while ensuring:
- total maintenance duration
- does not exceed available mechanic hours

This is implemented using:
- 0/1 Knapsack Algorithm

---

## Features

- Live protected API integration
- Dynamic programming optimization
- Depot-wise scheduling
- Structured backend architecture
- Reusable services and utilities
- Logging middleware integration

---

## API Endpoints

### Get Optimized Schedule

```http
GET /api/schedule
```

---

## Sample Response

```json
{
  "success": true,
  "data": [
    {
      "depotID": 1,
      "mechanicHours": 60,
      "totalImpact": 112,
      "selectedTasks": []
    }
  ]
}
```

---

# 3. Campus Notifications Backend

Backend notification ranking system designed for campus updates such as:
- placements
- results
- events

The application consumes notifications from a protected API and prioritizes them using weighted ranking and recency scoring.

---

## Features

- Real notification API integration
- Priority ranking system
- Top-N notification retrieval
- REST APIs
- Modular backend design
- Logging middleware integration
- Error handling
- Scalable architecture

---

## Notification Priority Logic

Priority is determined using:
- notification type weight
- recency score

### Weights

| Notification Type | Weight |
|---|---|
| Placement | 30 |
| Result | 20 |
| Event | 10 |

More recent notifications receive higher scores.

---

## API Endpoint

### Get Priority Notifications

```http
GET /api/notifications/priority
```

---

## Sample Response

```json
{
  "success": true,
  "count": 10,
  "data": [
    {
      "ID": "656a194e-78d9-46c1-ace5-8072d92d8420",
      "Type": "Placement",
      "Message": "Alphabet Inc. Class A hiring",
      "Timestamp": "2026-05-06 02:41:17",
      "score": 39.98
    }
  ]
}
```

---

# Notification System Design

The repository also includes:

```bash
notification_system_design.md
```

This document contains:
- REST API design
- DB schema design
- scaling strategies
- indexing strategies
- optimization approaches
- queue-based architecture
- caching strategies
- notification delivery architecture

Stages Covered:
- Stage 1
- Stage 2
- Stage 3
- Stage 4
- Stage 5
- Stage 6

---

# Technologies Used

- Node.js
- Express.js
- Axios
- dotenv

---

# Common Backend Features

All services follow:
- modular architecture
- service-controller separation
- reusable utilities
- structured logging
- async/await patterns
- centralized configuration
- scalable code organization

---

# Environment Variables

Each project uses:

```env
ACCESS_TOKEN=your_token_here
```

---

# Installation

## Clone Repository

```bash
git clone <repository-url>
cd 2117230020060
```

---

# Install Dependencies

Install dependencies separately inside each project folder.

Example:

```bash
cd notification_app_be
npm install
```

---

# Run Applications

Example:

```bash
node server.js
```
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

- Uses protected live APIs
- No mock notification data used
- No database setup required
- Modular backend structure followed
- Logging middleware integrated throughout all backend services
- Real-time notification architecture documented
- Optimization algorithms implemented without external algorithm libraries
