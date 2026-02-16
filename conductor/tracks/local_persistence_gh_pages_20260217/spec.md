# Specification: Local Persistence, Data Export/Import, and BYO-Key Deployment

## 1. Overview
Enable users to run the application entirely client-side (via GitHub Pages) by allowing them to bring their own Gemini API key. Additionally, ensure user progress is saved locally and can be exported/imported to transfer state between devices.

## 2. Functional Requirements

### 2.1. API Key Configuration
- **Settings Modal:** Create a new "Settings" modal accessible from the main UI.
- **Input Fields:**
    - `GEMINI_API_KEY` (Required): Text input for the user's Google GenAI key.
    - `GEMINI_BASE_URL` (Optional): Text input for a custom API endpoint (defaults to standard Google GenAI URL).
- **Persistence:**
    - "Remember Me" Checkbox:
        - If checked: Store credentials in the browser's `localStorage`.
        - If unchecked: Store credentials in memory/`sessionStorage` only for the current session.
- **Validation:** Basic validation to ensure the key is not empty before attempting to use it.

### 2.2. Progress Persistence
- **Local Storage:** Automatically save the user's progress to `localStorage`.
- **Data Scope:**
    - **Question Progress:** Metadata for each question (e.g., proficiency rating, "New"/"Hard"/"Easy" markers, last attempted date) to enable the prioritization algorithm.
    - **Aggregated Stats:** Mastery levels per topic and usage streaks (derived from question progress).

### 2.3. Data Export & Import
- **Location:** Within the "Settings" modal.
- **Export Options:**
    - **Download:** Button to download the current question progress and stats as a `.json` file.
    - **Copy:** Button/Text area to copy the raw JSON string to clipboard.
- **Import Options:**
    - **Upload:** Button to select and load a `.json` file.
    - **Paste:** Text area to paste a JSON string and "Load" it.
- **Conflict Resolution:** If importing data while local data exists, prompt for confirmation to overwrite (simple "Replace" strategy).

### 2.4. Deployment
- **Platform:** GitHub Pages.
- **Configuration:** Ensure the build process (Vite) is configured for relative paths or the specific repository base URL to support GitHub Pages hosting.
- **CI/CD:** Add a GitHub Action workflow to build and deploy to the `gh-pages` branch on push to `main`.

## 3. Non-Functional Requirements
- **Security:** Do NOT include the API Key in the "Export" data to prevent accidental sharing of credentials.
- **Usability:** The app should detect if an API key is missing on startup and prompt the user to open Settings/Enter Key immediately.
- **Performance:** Local storage operations should be non-blocking.

## 4. Out of Scope
- Server-side database integration.
- User accounts/authentication (beyond the local API key).
- Detailed history/transcripts of past interview sessions.
- Merging imported data with existing data (Import replaces current state).
