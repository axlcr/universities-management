
# Universities Management - Frontend

This is the **frontend** application for the **Universities Management** system. It is built using **React.js** and **TypeScript**, styled with **TailwindCSS**, and communicates with the backend API built with Ruby on Rails.

## 🚀 Getting Started

### Prerequisites

Ensure the following are installed on your machine:

- **Node.js** (version 16.x or higher)
- **npm** (comes with Node.js) or **Yarn**

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/axlcr/universities-management.git
   cd universities-management/frontend
   ```

2. **Install the project dependencies**:

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Create a `.env` file** in the `frontend` directory. Add the following variable:

   ```env
   PORT=3001
   ```

4. **Start the development server**:

   ```bash
   npm start
   # or
   yarn start
   ```

   The app will be accessible at [http://localhost:3001](http://localhost:3001).

---

## 🛠️ Project Structure

Here’s an overview of the folder structure:

```
frontend/
├── src/
│   ├── components/       # Reusable UI components
│   │   ├── AddUniversityForm.tsx
│   │   ├── EditUniversityForm.tsx
│   │   ├── Modal.tsx
│   │   ├── Spinner.tsx
│   │   └── UniversitiesTable.tsx
│   ├── services/         # API calls and utilities
│   │   └── api.ts
│   ├── types/            # TypeScript interfaces and types
│   │   └── University.ts
│   ├── App.tsx           # Main application file
│   ├── index.tsx         # Entry point for React
│   └── index.css         # Global styles
├── public/               # Static assets
├── .env                  # Environment variables
├── tailwind.config.js    # TailwindCSS configuration
├── package.json          # Project dependencies and scripts
└── tsconfig.json         # TypeScript configuration
```

---

## 📋 Available Scripts

The following scripts are available in the `frontend` directory:

### `npm start` / `yarn start`

Runs the development server. Open [http://localhost:3001](http://localhost:3001) to view the app in your browser.

### `npm test` / `yarn test`

Launches the test runner for unit and integration tests.

### `npm run build` / `yarn build`

Builds the application for production. The build artifacts are stored in the `build` directory.

### `npm run lint` / `yarn lint`

Runs linting checks to ensure code quality and consistency.

---

## ✨ Key Features

- **Universities Management**: Add, edit, and view universities.
- **Form Validation**: Type-safe validation using Zod.
- **Reusable Components**: Modular structure for scalability.
- **TailwindCSS Styling**: Rapid UI development with utility-first classes.

---

## 🌐 Environment Variables

The app uses environment variables defined in a `.env` file. For this project, you only need:

```env
PORT=3001
```

This specifies the port on which the development server runs.

---

## 🛡️ License

This project is licensed under the [MIT License](LICENSE). Feel free to use it as a base for your own projects.

---

## 👥 Author

- **Axl Blandon** - [axlblandonm@gmail.com](mailto:axlblandonm@gmail.com)
- [GitHub Repository](https://github.com/axlcr/universities-management)

---

