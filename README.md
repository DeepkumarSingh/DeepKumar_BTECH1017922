# Task Manager (Ozi Assignment)

## Project Overview

A simple task management full-stack application with user authentication, task CRUD operations, and a React + Vite frontend. The backend is built with Express and MongoDB.

## Tech Stack

- **Backend:** Node.js, Express, MongoDB, Mongoose
- **Frontend:** React, Vite, TailwindCSS
- **Auth:** JSON Web Tokens (JWT)

## Backend Setup Instructions

Prerequisites: Node.js (16+), a MongoDB instance or MongoDB Atlas connection string.

1. Open a terminal and change into the backend folder:

```bash
cd backend
```
2. Install dependencies:

```bash
npm install
```
3. Copy environment variables and update them (see Environment Variables):

```bash
cp .env.example .env
# edit .env and fill values
```
4. Start the server in development mode:

```bash
npm run dev
```
Or start production:

```bash
npm start
```

The server entry point is [backend/src/server.js](backend/src/server.js).

## Frontend Setup Instructions

Prerequisites: Node.js (16+)

1. Change into the frontend folder:

```bash
cd frontend
```
2. Install dependencies:

```bash
npm install
```
3. Start the dev server:

```bash
npm run dev
```

By default the frontend expects the API at `http://localhost:5000` (see `VITE_API_URL`). The frontend entry is in [frontend/src/main.jsx](frontend/src/main.jsx).

## Environment Variables Configuration

Copy `.env.example` to `.env` and fill the values. Variables used by this project:

- `MONGO_URI` or `MONGODB_URI`: MongoDB connection string (example uses MongoDB Atlas). Example: `mongodb+srv://...`.
- `JWT_SECRET`: Secret key for signing JWTs.
- `PORT`: Backend server port (default: `5000`).
- `CLIENT_URL`: Frontend origin (used in CORS or email links if applicable).
- `VITE_API_URL`: Frontend environment variable pointing to the API base URL (e.g., `http://localhost:5000`).

Refer to [\.env.example](.env.example) for the current example values.

## API Overview

Base URL: `http://localhost:5000/api`

Auth routes ([backend/src/routes/authRoutes.js](backend/src/routes/authRoutes.js)):
- `POST /api/auth/signup` — Register a new user
- `POST /api/auth/login` — Authenticate and receive JWT
- `GET /api/auth/me` — Get current user (protected)

Task routes ([backend/src/routes/taskRoutes.js](backend/src/routes/taskRoutes.js)) — all protected (require JWT):
- `GET /api/tasks` — List tasks for the authenticated user
- `POST /api/tasks` — Create a new task
- `GET /api/tasks/:id` — Get a single task
- `PUT /api/tasks/:id` — Update a task
- `DELETE /api/tasks/:id` — Delete a task

User routes ([backend/src/routes/userRoutes.js](backend/src/routes/userRoutes.js)) — protected:
- `PUT /api/users/profile` — Update authenticated user's profile
- `DELETE /api/users/profile` — Delete authenticated user's profile

Note: The app protects routes using JWT present in the `Authorization: Bearer <token>` header.
