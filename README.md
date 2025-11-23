<<<<<<< HEAD

---

# 💬 Rooms Chat — Real-Time Chat Application

A modern **real-time chat platform** featuring rooms, direct messaging, reactions, typing indicators, online status, image uploads, and a clean, responsive UI.

Built with:

* ⚛️ **React + Vite**
* 🟦 **TypeScript**
* 🧠 **Node.js + Express**
* ⚡ **Socket.IO (real-time)**
* 🗄️ **MongoDB + Mongoose**
* 🔐 **JWT Authentication**
* 🚀 Deployable on **Render** + **Vercel**

---

# 🌟 Features

### 🔌 Real-Time Messaging

* Live chat powered by **Socket.IO**
* Typing indicators
* Delivered & Read receipts
* Online/offline presence tracking
* Auto-reconnect & room subscriptions

### 💬 Rooms + Direct Messages

* Public rooms (General, Tech, Random)
* Private 1-to-1 conversations
* Message search-ready structure

### 🖼️ Media Support

* Image uploads (Multer + Sharp)
* Avatars with live update
* Attachments appear inside chat bubbles

### 😀 Extra Goodies

* Emoji reactions (❤️ 🔥 😂 👍 etc.)
* Clean light/dark dark-themed UI
* Mobile-friendly responsive layout
* Error handling + loading states

---

# 🖼️ Screenshots

### 🔑 Login Page

<img src="./Screenshots/Login.png" alt="Login Page" width="600"/>

---

### 📝 Register Page

<img src="./Screenshots/Register.png" alt="Register Page" width="600"/>

---

### 💬 Chat Room

<img src="./Screenshots/Chats.png" alt="Chat Room" width="600"/>

---

### 📱 Mobile View

<img src="./screenshots/Mobile.png" alt="Mobile Chat UI" width="400"/>

---

# ⚙️ Installation — Local Development

## 🧩 Backend (Server)

```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

The backend starts at:

```
http://localhost:5000
```

### Required `.env` values

```
PORT=5000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=supersecret
FRONTEND_URL=http://localhost:5173
UPLOAD_DIR=uploads
```

---

## 🖥️ Frontend (Client)

```bash
cd frontend
npm install
npm run dev
```

The frontend starts at:

```
http://localhost:5173
```

Environment variable:

```
VITE_API_URL=http://localhost:5000
```

---

# 🧪 API Overview

### 🔐 Authentication

* `POST /api/auth/register`
* `POST /api/auth/login`

### 👤 Users

* `POST /api/users/avatar`
* `GET /api/users/me`

### 💬 Messaging

* `GET /api/messages/:room`
* `DELETE /api/messages/:id`
* `POST /api/files/upload`

### ⚡ Socket.IO Events

* `join_room`
* `send_message`
* `message_edited`
* `delete_message`
* `typing`
* `presence_update`
* `react`
* `delivered`
* `read`

---

# 🚀 Deployment Guide

## 🌐 Backend → Render.com

### 1️⃣ Create new Web Service

* Environment: **Node**
* Root folder: `/backend`

### 2️⃣ Set build & start commands:

```
Build Command: npm install
Start Command: npm start
```

### 3️⃣ Add Environment Variables

Match your `.env.example`

### 4️⃣ Persistent Uploads

Add a **Render Disk**:

* Name: `chat_uploads`
* Mount: `/backend/uploads`

### 5️⃣ CORS Settings

Ensure:

```
FRONTEND_URL=https://your-vercel-domain.vercel.app
```

---

## 🎨 Frontend → Vercel

### 1️⃣ Import your GitHub repo

Select the **frontend** folder.

### 2️⃣ Add env variable

```
VITE_API_URL=https://your-render-backend.onrender.com
```

### 3️⃣ Build settings:

* **Framework:** Vite
* **Build Command:** `npm run build`
* **Output Directory:** `dist`

### 4️⃣ Optional vercel.json

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}
```

=======
# MERN Stack Capstone Project

This assignment focuses on designing, developing, and deploying a comprehensive full-stack MERN application that showcases all the skills you've learned throughout the course.

## Assignment Overview

You will:
1. Plan and design a full-stack MERN application
2. Develop a robust backend with MongoDB, Express.js, and Node.js
3. Create an interactive frontend with React.js
4. Implement testing across the entire application
5. Deploy the application to production

## Getting Started

1. Accept the GitHub Classroom assignment
2. Clone the repository to your local machine
3. Follow the instructions in the `Week8-Assignment.md` file
4. Plan, develop, and deploy your capstone project

## Files Included

- `Week8-Assignment.md`: Detailed assignment instructions

## Requirements

- Node.js (v18 or higher)
- MongoDB (local installation or Atlas account)
- npm or yarn
- Git and GitHub account
- Accounts on deployment platforms (Render/Vercel/Netlify/etc.)

## Project Ideas

The `Week8-Assignment.md` file includes several project ideas, but you're encouraged to develop your own idea that demonstrates your skills and interests.

## Submission

Your project will be automatically submitted when you push to your GitHub Classroom repository. Make sure to:

1. Commit and push your code regularly
2. Include comprehensive documentation
3. Deploy your application and add the live URL to your README.md
4. Create a video demonstration and include the link in your README.md

## Resources

- [MongoDB Documentation](https://docs.mongodb.com/)
- [Express.js Documentation](https://expressjs.com/)
- [React Documentation](https://react.dev/)
- [Node.js Documentation](https://nodejs.org/en/docs/)
- [GitHub Classroom Guide](https://docs.github.com/en/education/manage-coursework-with-github-classroom) 
>>>>>>> 883b4cd55d37367d54c6749c0a15cbb01cb85be1
