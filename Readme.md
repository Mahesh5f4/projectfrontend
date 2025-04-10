

``
# 🔖 Saved Projects Manager (Full Stack)

A full-stack web application to **create, view, and delete saved project entries**, built with the **MERN stack** (React + Node.js + Express + TypeORM + PostgreSQL). The UI is designed using **Material UI (MUI)** for a modern and responsive experience.

---

## 🚀 Features

- ✅ Save new projects with title, description, tech stack, link, and category
- 🗃️ View all saved projects in a beautiful card-based layout
- 🗑️ Delete any saved project with a single click
- 🌐 Fully functional REST API using Express & TypeORM
- 💬 Snackbar messages for success & error alerts

---

## 📦 Tech Stack

### ⚙️ Backend:
- **Node.js**
- **Express.js**
- **TypeORM**
- **PostgreSQL**
- **RESTful APIs**

### 🎨 Frontend:
- **React**
- **TypeScript**
- **Material UI (MUI)**
- **Axios**

---

## 📁 Folder Structure

```
📦 saved-projects-app/
├── 📁 backend/
│   ├── controller/
│   │   └── savedProject.controller.ts
│   ├── routes/
│   │   └── savedProject.route.ts
│   ├── entity/
│   │   └── SavedProject.ts
│   ├── data-source.ts
│   └── server.ts
├── 📁 frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── SavedProjects.tsx
│   │   ├── App.tsx
│   │   └── index.tsx
```

---

## 🔌 API Endpoints

| Method | Endpoint                 | Description              |
|--------|--------------------------|--------------------------|
| `GET`  | `/api/saved`             | Get all saved projects   |
| `POST` | `/api/saved`             | Save a new project       |
| `DELETE`| `/api/saved/:id`        | Delete project by ID     |

---

## 🧪 How to Run Locally

### 1️⃣ Backend Setup

```bash
cd backend
npm install
npm run dev
```

Make sure your `.env` contains DB connection config for TypeORM.

### 2️⃣ Frontend Setup

```bash
cd frontend
npm install
npm start
```

App will be available at: `http://localhost:3000`

---

## 🧠 Example Project Object

```json
{
  "title": "Portfolio Website",
  "description": "A personal portfolio website built with React and MUI.",
  "technologies": "React, MUI, TypeScript",
  "link": "https://myportfolio.com",
  "category": "Frontend"
}
```

---

## 📸 UI Preview

> Coming soon: screenshots or screen recordings!

---

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

---

## 📜 License

[MIT](LICENSE)

---

## 🙌 Acknowledgements

- Built with ❤️ by [Kondampudi Mahesh Babu](https://github.com/kondampudimahesh)
```

---

Let me know if you'd like:
- A **badge section** (e.g., React, Node, TypeORM badges)
- **Screenshots**
- A separate section for deployment (e.g., Render, Vercel)
- Or if you're planning to make it a **MERN project with MongoDB**, I can tweak that too.