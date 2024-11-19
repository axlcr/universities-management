
# Universities Management - Monorepo

This repository contains both the **backend** (API in Ruby on Rails) and the **frontend** (React.js with TypeScript and TailwindCSS) for the Universities Management application. Follow the steps below to install and run both projects.

Each folder (`backend` and `frontend`) contains its own detailed README file with specific instructions for setup and usage.

---

## 🚀 Quick Installation

### 1. Clone the Repository

```bash
git clone https://github.com/axlcr/universities-management.git
cd universities-management
```

### 2. Backend (API)

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   bundle install
   ```

3. Set up the database:
   - Edit `config/database.yml` with your PostgreSQL credentials.
   - Create and migrate the database:
     ```bash
     rails db:create
     rails db:migrate
     ```

4. Start the server:
   ```bash
   rails server
   ```

   The server will be available at `http://localhost:3000`.

For more details, check the [Backend README](backend/README.md).

---

### 3. Frontend

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env` file and set the port:
   ```env
   PORT=3001
   ```

4. Start the development server:
   ```bash
   npm start
   # or
   yarn start
   ```

   The app will be available at `http://localhost:3001`.

For more details, check the [Frontend README](frontend/README.md).

---

Now both projects are running locally. Happy coding!
