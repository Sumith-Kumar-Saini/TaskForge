# 📂 TaskForge

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)

> **TaskForge** is a modern project management web app designed for freelancers, developers, startups, and creatives.

---

## 🛠️ Tech Stack

A breakdown of the tools and technologies used across the monorepo:

| Tech | Purpose |
|------|---------|
| ![Vite](https://img.shields.io/badge/-Vite-646CFF?style=flat-square&logo=vite&logoColor=white) | Lightning-fast frontend build tool |
| ![React](https://img.shields.io/badge/-React-61DAFB?style=flat-square&logo=react&logoColor=black) | UI library for building interactive UIs |
| ![React Router](https://img.shields.io/badge/-React%20Router-CA4245?style=flat-square&logo=react-router&logoColor=white) | Handles routing in React apps (coming soon) |
| ![Redux](https://img.shields.io/badge/-Redux-764ABC?style=flat-square&logo=redux&logoColor=white) | Predictable state container for React (coming soon) |
| ![Tailwind CSS](https://img.shields.io/badge/-Tailwind%20CSS-06B6D4?style=flat-square&logo=tailwind-css&logoColor=white) | Utility-first CSS framework for rapid UI development |
| ![Node.js](https://img.shields.io/badge/-Node.js-339933?style=flat-square&logo=node.js&logoColor=white) | Backend runtime environment for JavaScript |
| ![Express](https://img.shields.io/badge/-Express-000000?style=flat-square&logo=express&logoColor=white) | Lightweight web framework for Node.js |
| ![MongoDB](https://img.shields.io/badge/-MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white) | NoSQL database for data persistence (coming soon) |
| ![Monorepo](https://img.shields.io/badge/-Monorepo-555555?style=flat-square&logo=nx&logoColor=white) | Centralized project structure (single `package.json`) |
| ![GitHub Actions](https://img.shields.io/badge/-GitHub%20Actions-2088FF?style=flat-square&logo=github-actions&logoColor=white) | CI/CD automation (coming soon) |
---

## 🚀 Getting Started

### Clone and Install

```bash
git clone https://github.com/Sumith-Kumar-Saini/taskforge.git
cd taskforge
npm install
````

### Environment Setup

Copy the `.env.example` file to `.env` in both the **`client/`** and **`server/`** directories.

```bash
# In client/
cp .env.example .env

# In server/
cp .env.example .env
```

### Development

Start both the frontend and backend with a single command:

```bash
npm run dev
```

-----

## 📁 Project Structure

```
root/
├── client/                          # Vite + React + Redux (JavaScript)
│   ├── app/                         # Your pages/components
│   ├── index.html
│   ├── main.jsx
│   ├── vite.config.js
│   ├── package.json
│   ├── .env.example
│   └── README.md (optional)
│
├── server/                          # Node.js + Express + MongoDB (JavaScript)
│   ├── src/
│   │   ├── routes/                 # Express routes
│   │   ├── models/                 # Mongoose schemas
│   │   ├── controllers/            # Logic functions
│   │   ├── middlewares/           # Custom middlewares
│   │   └── index.js               # Entry point
│   ├── .env.example
│   ├── package.json
│   └── README.md (optional)
│
├── .env.example                     # Shared env vars (if needed)
├── .gitignore                       # Git ignored files
├── CONTRIBUTING.md                  # Contributor guidelines
├── README.md                        # Project overview
├── package.json                     # Root-level scripts
└── node_modules/                    # Shared dependencies
```

-----

## 📦 Available Scripts

| Command           | Description                        |
| :---------------- | :--------------------------------- |
| `npm run dev`     | Runs both frontend and backend     |
| `npm run build`   | Builds both client and server apps |
| `npm run test`    | Runs project tests (future)        |

