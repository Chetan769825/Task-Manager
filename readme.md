# 📌 Ethara-AI Task Manager 

A full-featured task management application designed for individuals and teams to organize, track, and collaborate on tasks effectively.

---

## 🚀 Features

1. **User Dashboard** – View assigned tasks, track progress, and get task insights.  
2. **Task Management** – Create, update, and track tasks with due dates and priorities.  
3. **Automated Status Updates** – Task status changes automatically based on the checklist.  
4. **Team Collaboration** – Assign tasks to multiple users and track completion.  
5. **Priority & Progress Tracking** – Categorize tasks by priority and monitor completion levels.  
6. **Task Report Downloads** – Export task data for analysis and tracking.  
7. **Attachments Support** – Add and access task-related file links easily.  
8. **Mobile Responsive UI** – Seamless experience on desktop, tablet, and mobile.  
9. **Intuitive Navigation** – Clean sidebar menu for quick access to tasks and dashboard.  

---

## 🛠️ Tech Stack

- **Frontend:** React.js, Tailwind CSS 
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB  
- **Authentication:** JWT

---

## 🛠️ Setup Instructions


# 📁 Project Structure

```
root/
│
├── backtend/               # React frontend
│
├── frontend/Task-Manager   # Express backend with mongoDB
│
├── profile pics/           # Express backend with mongoDB
│
└── README.md
```

---

### 1. Install Dependencies

# Server (Backend)

```bash
cd backend
npm install
npm install jsonwebtoken
npm install mongoose
```

#### Client (Frontend)

```bash
cd ../frontend
cd Task-Manager
npm install

```
---

## 🔧 Environment Variables

Create a `.env` file in the `backend`.

### Example `.env` for `backend`:

```
PORT=8000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
ADMIN_INVITE_TOKEN=your_admin_token
```
---
## 🧪 Run the App Locally

### Run Backend

```bash
cd backend
npm run dev
```

### Run Frontend

In a new terminal:

```bash
cd frontend
cd Task-Manager
npm run dev
```

Open your browser and go to `http://localhost:5173`


