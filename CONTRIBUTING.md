# 👥 Contributing to TaskForge

Thanks for helping improve TaskForge! We appreciate your contributions and want to make the process as smooth as possible.

---

## 📦 Setup

1.  **Clone this repository**: Get a copy of the TaskForge codebase onto your local machine.
2.  **Install all dependencies**: Navigate to the root directory and run the following command to install necessary packages for both the client and server:

    ```bash
    npm install
    ```

3.  **Configure environment variables**: Copy the example environment files to create your local configurations. Do this for both the `client/` and `server/` directories:

    ```bash
    cp .env.example .env
    ```

    *Remember to fill in any necessary API keys or other sensitive information in your new `.env` files.*

4.  **Run the project**: Start the development servers for both the client and server with a single command:

    ```bash
    npm run dev
    ```

---

## 🌱 Branch Naming Conventions

To keep our commit history clean and understandable, please follow these branch naming conventions:

* **`feat/your-feature-name`**: For new features or significant additions (e.g., `feat/auth-flow`, `feat/dark-mode`).
* **`fix/description-of-fix`**: For bug fixes (e.g., `fix/login-bug`, `fix/task-sorting`).
* **`docs/description-of-docs-change`**: For documentation updates (e.g., `docs/update-readme`, `docs/add-contributing-guide`).
* **`refactor/description-of-refactor`**: For code refactoring that doesn't add new features or fix bugs (e.g., `refactor/improve-api-structure`).
* **`chore/description-of-chore`**: For routine tasks, build process changes, or dependency updates (e.g., `chore/update-dependencies`).

---

## ✅ Pull Request Checklist

Before submitting your pull request, please ensure you've checked off the following:

* [ ] **Code runs locally**: Your changes are fully functional and don't introduce new issues.
* [ ] **Clear, descriptive commit messages**: Each commit message accurately reflects the changes made.
* [ ] **No `console.log` or debug code**: Remove any temporary debugging statements before submitting.
* [ ] **Code formatted correctly**: Ensure your code adheres to the project's formatting standards (e.g., run a linter/prettier if configured).
* [ ] **Tests pass (if applicable)**: If the project has tests, make sure all existing tests pass, and consider adding new tests for new features or bug fixes.
* [ ] **Updated documentation (if necessary)**: If your changes affect how others use or understand the project, update the relevant documentation.
* [ ] **Changes are focused**: Your pull request addresses a single, clear objective. Avoid mixing multiple unrelated changes.

---

Thanks again for contributing to TaskForge! We look forward to your pull request.