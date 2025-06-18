## Local Development

To run the project locally:

```bash
# 1. Install dependencies
npm install

# 2. Start the development server
npm run dev
```

Then open `http://localhost:3000` in your browser.

Make sure to create a `.env` file with the required environment variables (see `.env.example` if available).

---

## ✅ Project Rules

### 1. Branch Naming

Use the following convention when creating branches:

```
(feature|fix)/taskName
```

Examples:

- `feature/addProductPage`
- `fix/cartDiscountBug`

> Use `feature/` for new features and `fix/` for bug fixes or patches.

---

### 2. Pull Requests (PRs)

- All work must go through a **Pull Request**.
- **Target branch should always be `staging`.**
- Never merge directly to `main`.
- PRs must be reviewed and approved before merging.

---

### 3. Commit & Staging Guidelines

- Only stage and commit **what belongs to your current task**.
- Avoid committing unrelated changes like:
  - Formatting/indentation adjustments (unless necessary for the task)
  - Console logs
  - Unused variables or commented-out code

> Keep each PR clean and focused to make reviewing easy and safe.

---
