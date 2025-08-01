# 📝 Live Collaborative To-Do List (Full Stack)

A real-time collaborative to-do list application built with Node.js, Express, React, and Socket.IO for live updates across all connected users.



## 🌟 Features

- Real-time task synchronization across clients
- Create and delete tasks instantly
- Full TypeScript support (frontend + backend)
- REST API + WebSocket integration
- Modern React frontend with Vite
- MongoDB for data persistence

![Alt text](https://github.com/shoyebmd424/Live-Collaborative-To-Do-List/blob/main/collab.png)

## 🛠 Tech Stack

**Frontend**:
- React 18
- TypeScript
- Vite
- Socket.IO Client
- Axios

**Backend**:
- Node.js
- Express
- TypeScript
- MongoDB (Mongoose)
- Socket.IO

**Infrastructure**:
- MongoDB Atlas (Cloud Database)
- Vercel (Frontend Hosting)
- Render/Railway (Backend Hosting)

## 🚀 Getting Started

### Prerequisites
- Node.js (v16+)
- npm or yarn
- MongoDB connection string

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/live-collab-todo.git
   cd live-collab-todo


   ### 2\. Setup Backend
`    server  npm install   `

#### 📄 Create .env file

`MONGO_URI=your_mongodb_connection_string  PORT=5000   `

#### Run the backend:
`  run dev   `

Server will be running on [http://localhost:5000](http://localhost:5000)

### 3\. Setup Frontend

`cd ../client  npm install   `

#### Update backend URL in src/App.tsx if needed:

`    socket = io('http://localhost:5000'); // or deployed URL  axios.get('http://localhost:5000/tasks')    // or deployed URL   `

#### Run frontend:
`   npm run dev   `

App will be available at http://localhost:5173

📡 Real-time Collaboration
--------------------------

*   When one user creates or deletes a task, all other users see it instantly.
    
*   Powered by **Socket.IO** (WebSockets).
    

🌐 API Documentation
--------------------

### Base URL

`   http://localhost:5000   `

### Endpoints

#### GET /tasks

Get all tasks

**Response:**

`   [    {      "_id": "abc123",      "text": "Buy milk",      "completed": false    }  ]   `

#### POST /tasks

Create a new task

**Request:**

`   {    "text": "Buy milk",    "completed": false  }   `

**Response:**
`   {    "_id": "abc123",    "text": "Buy milk",    "completed": false  }   `

#### DELETE /tasks/:id

Delete a task by ID

**Response:**204 No Content

### Socket.IO Events

EventDirectionPayloadDescriptiontaskCreatedServer → ClientTask objectNew task addedtaskDeletedServer → Clientstring (task ID)Task deleted

📚 Features
-----------

*   ✅ Create and delete tasks
    
*   🔄 Real-time sync via WebSockets
    
*   ⚛️ React + Vite + TypeScript frontend
    
*   ⚙️ Express + TypeScript backend with MongoDB
    
*   🌐 RESTful API and WebSocket integration
    
*   📁 Clean, modular codebase
