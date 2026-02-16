<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# System Analyst Interview Coach

An AI-powered interactive coach designed to help aspiring System Analysts prepare for technical interviews. The application simulates a real interview environment, asking questions ranging from basic to "divine" difficulty, and provides personalized feedback using Google's Gemini models.

## Features

- **Interactive AI Interview:** Real-time chat with an AI interviewer.
- **Adaptive Difficulty:** Questions are categorized by difficulty (Base, Intermediate, Hardcore, Divine).
- **Instant Feedback:** Get detailed scoring and constructive feedback after each answer.
- **Local Persistence:** Your progress is saved automatically to your browser.
- **Data Export/Import:** Backup your progress or move it between devices.
- **Bring Your Own Key (BYOK):** Run the app entirely client-side using your own free Gemini API key.

## Getting Started

### 1. Get a Gemini API Key
To use this application, you need a free API key from Google.
1. Go to [Google AI Studio](https://aistudio.google.com/app/apikey).
2. Click "Create API Key".
3. Copy the key.

### 2. Run the App
You can run the app locally or access the deployed version.

**Using the Deployed Version:**
1. Open the application URL (e.g., on GitHub Pages).
2. You will be prompted to enter your API Key.
3. Paste your key and click "Save". 
   * *Note: Your key is stored locally in your browser's Local Storage. It is never sent to our servers.*

**Running Locally:**
1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open http://localhost:5173 in your browser.

## Data Management

Your progress is saved automatically. To backup or transfer your data:
1. Click the **Settings (Gear)** icon in the top right corner.
2. Go to the **Data (Export/Import)** tab.
3. Click **Download JSON** or **Copy to Clipboard** to save your data.
4. To restore, paste the JSON into the text area and click **Import**.

## Tech Stack
- **Frontend:** React, TypeScript, Vite, Tailwind CSS
- **AI:** Google GenAI SDK (Gemini 2.0 Flash / 1.5 Pro)
- **Deployment:** GitHub Pages