# 📬 Postify – A Minimalist MERN Social App

**Postify** is a full-stack social wall app built using the **MERN stack** (MongoDB, Express, React, Node). It allows users to post, view, edit, and delete content in real-time with a beautiful minimalist UI — all without authentication.

🔗 **Live Demo**: [postify-delta.vercel.app](https://postify-delta.vercel.app/)

---

## ✨ Features

### 🖥️ Frontend
- ⚡ Built with React (Vite or CRA)
- 📝 Create, edit, delete posts
- 🌙 Dark theme UI
- 📱 Responsive and mobile-friendly
- 🧠 State management with React hooks
- 💾 Posts stored persistently via backend (MongoDB)

### 🔧 Backend
- 🌐 Express.js API
- 🧩 RESTful routes for post management
- 🛢️ MongoDB (with Mongoose) for storing post data
- 🛡️ CORS, body-parser, and JSON middleware
- 📤 Hosted backend (Render, Cyclic, etc.)

---

## 🖼️ Preview
> ![App Demo](assets/demo1.png)
> ![App Demo](assets/demo2.png)

---

## 🧱 Tech Stack

| Layer       | Technology     |
|-------------|----------------|
| Frontend    | React, CSS     |
| Backend     | Node.js, Express.js |
| Database    | MongoDB (Cloud Atlas) |
| Deployment  | Vercel (Frontend), Render/Cyclic (Backend) |

---

## 🚀 Getting Started (Local Setup)

### ⚙️ Backend

1. Clone the repository and install dependencies:
   ```bash
   cd backend
   npm install

2. Create a .env file
   ```bash
   PORT=5000
   MONGO_URI=your_mongo_connection_string

3. Start the server:
   ```bash
   npm run start

**The backend will run at *http://localhost:5000***

### 🎨 Frontend
1. In the project root, go to the frontend directory:
   ```bash
   cd frontend
   npm install

2. Create .env in the frontend
   ```bash
   VITE_API_URL=http://localhost:5000

3. Start the frontend:
   ```bash
   npm run dev

**The app will be running at *http://localhost:5173***

---

## 🌐 Deployment
- Frontend: Vercel
- Backend: Render or Cyclic
- Ensure CORS is enabled and frontend *.env* uses the deployed API URL

---

## 🤝 Contributing
Have ideas to improve Postify?
Feel free to fork, open an issue, or submit a PR.

## 👤 Author
Pavan Chauhan
