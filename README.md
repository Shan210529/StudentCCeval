# Student Registration System

A premium Student Registration website built with **React (Vite)**, **Node.js**, and **MongoDB**.

## Prerequisites
- Node.js installed on your system.
- MongoDB installed and running locally (default port 27017).

## Project Structure
- `client/`: React Frontend
- `server/`: Node.js Backend

## Getting Started

### 1. Start the Backend Server
The server runs on port **5000** and connects to your local MongoDB.

```bash
cd server
npm start
# OR if you haven't defined start script locally yet (I did not add a start script, so use node)
node server.js
```

### 2. Start the Frontend Client
The client runs on port **5173** (default Vite port).

```bash
cd client
npm run dev
```

### 3. Open in Browser
Visit the URL shown in your terminal (usually `http://localhost:5173`) to view the application.

## Features
- **Modern UI**: Glassmorphism design with animated backgrounds.
- **Responsive**: Works on mobile and desktop.
- **Form Handling**: Validation and real-time inputs.
- **API Integration**: Connects to Node.js/Express backend.
- **Database**: Stores student data in MongoDB.

## Troubleshooting
- **MongoDB Connection Error**: Ensure MongoDB service is running. Open **MongoDB Compass** and try to connect to `mongodb://localhost:27017`.
- **CORS Error**: The server is configured with `cors`, but ensure you are hitting the correct port (5000).
