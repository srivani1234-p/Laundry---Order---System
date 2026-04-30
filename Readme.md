Mini Laundry Order Management System

Overview

This project is a simple backend system for managing laundry orders. It allows creating orders, tracking their status, calculating billing, and viewing dashboard statistics.

---

Setup Instructions

1. Install Node.js
2. Run:
   npm install
   node app.js

---

Features Implemented

- Create Order (with billing calculation)
- Update Order Status
- View Orders (filter by status, search by name/phone)
- Dashboard (total orders, revenue, status count)

---

API Endpoints

POST /orders
PUT /orders/:id/status
GET /orders
GET /dashboard

---

AI Usage Report

Tools Used

- ChatGPT

Prompts Used

- Create Node.js Express API for laundry system
- Add filtering to orders API
- Fix bug in status update API
- Add dashboard aggregation logic

Where AI Helped

- Generated initial backend code
- Helped implement billing logic
- Created API endpoints

What AI Got Wrong

- No validation initially
- Missing error handling
- Basic filtering logic

What I Improved

- Added validation
- Fixed edge cases
- Improved filtering
- Cleaned code structure

---

Tradeoffs

- Used in-memory storage (data resets after restart)
- No authentication implemented
- No frontend UI

---

Future Improvements

- Add MongoDB database
- Add authentication
- Build frontend
- Deploy project

---

Run Instructions

npm install
node app.js



