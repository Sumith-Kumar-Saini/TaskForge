# 📂 TaskForge

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)

> **TaskForge** is a sleek and modern project management web app tailored for freelancers, developers, startups, and creatives who need to stay on top of their game.

---

## 🛠️ Tech Stack

Here’s what’s under the hood of this monorepo:

| Tech                                                                                                                           | Purpose                                               |
| ------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------- |
| ![Vite](https://img.shields.io/badge/-Vite-646CFF?style=flat-square&logo=vite&logoColor=white)                                 | Lightning-fast frontend build tool                    |
| ![React](https://img.shields.io/badge/-React-61DAFB?style=flat-square&logo=react&logoColor=black)                              | UI library for building interactive UIs               |
| ![React Router](https://img.shields.io/badge/-React%20Router-CA4245?style=flat-square&logo=react-router&logoColor=white)       | Client-side routing                                   |
| ![Redux](https://img.shields.io/badge/-Redux-764ABC?style=flat-square&logo=redux&logoColor=white)                              | State management                                      |
| ![Tailwind CSS](https://img.shields.io/badge/-Tailwind%20CSS-06B6D4?style=flat-square&logo=tailwind-css&logoColor=white)       | Utility-first CSS framework                           |
| ![Node.js](https://img.shields.io/badge/-Node.js-339933?style=flat-square&logo=node.js&logoColor=white)                        | JavaScript runtime for backend                        |
| ![Express](https://img.shields.io/badge/-Express-000000?style=flat-square&logo=express&logoColor=white)                        | Web framework for Node.js                             |
| ![MongoDB](https://img.shields.io/badge/-MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white)                        | NoSQL database (coming soon)                          |
| ![Monorepo](https://img.shields.io/badge/-Monorepo-555555?style=flat-square&logo=nx&logoColor=white)                           | Unified codebase for client & server                  |
| ![GitHub Actions](https://img.shields.io/badge/-GitHub%20Actions-2088FF?style=flat-square&logo=github-actions&logoColor=white) | CI/CD automation (coming soon)                        |

---

## 🚀 Getting Started

### Clone and Install

```bash
git clone https://github.com/Sumith-Kumar-Saini/taskforge.git
cd taskforge
npm install
````

### Environment Setup

Make sure to copy environment templates into both the frontend and backend directories.

```bash
# In client/
cp .env.example .env

# In server/
cp .env.example .env
```

### Development

Run both client and server concurrently:

```bash
npm run dev
```

---

## 📁 Project Structure

The repo follows a simple and scalable monorepo setup.

```
taskforge/
├── client/                            # Frontend - React + Vite + Redux
│   ├── public/                        # Static files
│   ├── src/                           # Source files
│   │   ├── components/                # Reusable UI components
│   │   ├── features/                  # Redux slices and domain logic
│   │   ├── hooks/                     # Custom React hooks
│   │   ├── pages/                     # Route-based pages
│   │   ├── router/                    # React Router configs
│   │   ├── store/                     # Redux store configuration
│   │   ├── App.jsx                    # Root component
│   │   ├── index.css                  # Global styles
│   │   └── main.jsx                   # Entry point
│   ├── index.html                     # HTML template
│   ├── vite.config.js                 # Vite config
│   ├── package.json                   # Client dependencies & scripts
│   └── .env.example                   # Sample environment config
│
├── server/                            # Backend - Node.js + Express + MongoDB
│   ├── src/
│   │   ├── controllers/               # Business logic for routes
│   │   ├── middlewares/               # Custom Express middleware
│   │   ├── models/                    # MongoDB schemas (Mongoose)
│   │   ├── routes/                    # API endpoints
│   │   └── app.js                     # Sets up app (routes, middleware, etc.)
│   ├── server.js                      # Entry point – starts the server
│   ├── package.json                   # Server dependencies & scripts
│   └── .env.example                   # Sample environment config
│
├── .env.example                       # Shared/global env vars (optional)
├── .gitignore                         # Ignored files and directories
├── CONTRIBUTING.md                    # How to contribute (see below)
├── LICENSE                            # MIT License (see below)
├── README.md                          # This file
├── package.json                       # Monorepo-level scripts and tools
└── node_modules/                      # Installed dependencies
```

---

## 📦 Available Scripts

| Command         | Description                     |
| :-------------- | :------------------------------ |
| `npm run dev`   | Starts both client and server   |
| `npm run build` | Builds both apps for production |
| `npm run test`  | Runs test suites (coming soon)  |

---

## 🤝 Contributing

Wanna contribute? We'd love that!

Check out [`CONTRIBUTING.md`](CONTRIBUTING.md) for guidelines on:

* Submitting pull requests
* Filing issues or feature requests
* Coding standards
* Branching strategy

Feel free to fork this repo, make improvements, and open a PR!

---

## 📄 License

This project is licensed under the [MIT License](LICENSE). You're free to use, modify, and distribute this project as long as the original copyright and license
notice are included.
