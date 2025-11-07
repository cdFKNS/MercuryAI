# MercuryAI

MercuryAI is an AI-powered portfolio assistant that helps users generate professional bios, project summaries, and learning reflections for their portfolios. The app features a tabbed interface, tone selection, and persistent storage of generated outputs. It uses Google Gemini for content generation via a secure backend API proxy.

## Team & Roles
- Kabelo Modimoeng (Scrum Master & Backend Developer)
- Nomdumiso Mtshilibe (Backend Developer)
- Fortune Malaza (Frontend Developer)
- Sibonelo Buthelezi (Frontend Developer)

## Features
- Tabbed UI for Bio, Profile, and Portfolio Summary
- Tone selector for Bio generation (Formal, Friendly, Technical)
- AI-powered content generation using Gemini API
- Save, view, and delete generated outputs
- Secure backend proxy for API key protection

## Getting Started

### Prerequisites
- [Node.js & npm](https://nodejs.org/) (for backend)
- [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension for VS Code (or any static server)

### 1. Clone the Repository
```sh
git clone https://github.com/<your-username>/MercuryAI.git
cd MercuryAI
```

### 2. Backend Setup (API Proxy)
```sh
cd server
cp .env.example .env
# Edit .env and add your real GEMINI_API_KEY
npm install
npm start
```
- The backend will run on `http://localhost:3001` by default.

### 3. Frontend Setup
- Open the project folder in VS Code.
- Right-click `index.html` and select **"Open with Live Server"** (or use any static server).
- The app will be available at `http://127.0.0.1:5500/index.html` (or similar).

### 4. Usage
- Enter your data in the Bio, Profile, or Portfolio Summary tabs.
- Select the desired tone for the Bio generator.
- Click **Generate** to get AI-powered content.
- Use **Save Output** to store results, and **View Saved Outputs** to manage them.

### 5. Deployment
- Deploy the frontend (static files) to GitHub Pages or any static host.
- Deploy the backend (`server/`) to a Node.js host (Render, Railway, Heroku, etc.) and set the `GEMINI_API_KEY` in the host's environment variables.
- Update the frontend API URL in `script.js` to point to your deployed backend if needed.

### 6. Security
- **Never commit your `.env` file or real API keys.**
- Only share `.env.example` in the repo.

## Live Deployment

- **Frontend (GitHub Pages):**
  [https://yourusername.github.io/MercuryAI/](https://yourusername.github.io/MercuryAI/)

- **Backend (Render):**
  [https://mercuryai.onrender.com/api/generate](https://mercuryai.onrender.com/api/generate)

Update the frontend API URL in `script.js` to use the Render backend for production use.

---

For more details, see the project Kanban board and documentation files.
