# Implementation Plan - Track: Local Persistence & GitHub Pages Deployment

## Phase 1: Storage Service Refactoring
Goal: Implement a robust local storage service to handle user preferences and question progress, replacing any temporary or mock storage.

- [x] Task: Create `services/localStorageService.ts` 59a8702
    - [ ] Define TypeScript interfaces for `QuestionProgress` (id, status, lastAttempted, etc.) and `UserPreferences` (apiKey, baseUrl).
    - [ ] Implement methods to `saveProgress`, `loadProgress`, `savePreferences`, `loadPreferences`.
    - [ ] Implement `exportData` (returns JSON string) and `importData` (parses JSON string and validates schema).
- [x] Task: Write Unit Tests for Storage Service 59a8702
    - [ ] Test saving/loading valid data.
    - [ ] Test handling of missing/corrupt data (schema validation).
    - [ ] Test export/import logic (ensure API keys are NOT exported).
- [x] Task: Integrate Storage Service into App Context c584581
    - [ ] Update `App.tsx` or a new `StorageContext` to initialize state from local storage on boot.
- [x] Task: Conductor - User Manual Verification 'Storage Service Refactoring' (Protocol in workflow.md)

## Phase 2: Settings & API Key Management UI
Goal: Create the user interface for inputting API keys and managing data export/import.

- [x] Task: Create `components/SettingsModal.tsx` 0db61b4
    - [ ] Design a modal with two tabs/sections: "General" (API Key) and "Data" (Export/Import).
    - [ ] Implement "API Key" form with validation and "Remember Me" checkbox.
    - [ ] Implement "Export" section with "Download JSON" and "Copy to Clipboard" buttons.
    - [ ] Implement "Import" section with "Upload JSON" and "Paste JSON" text area.
- [x] Task: Update Main Layout a6c5b85
    - [ ] Add a "Settings" gear icon/button to the main header to open the modal.
    - [ ] Add a check on app load: If no API key is found in storage/context, automatically open the Settings modal with a prompt.
- [ ] Task: Verify API Key Usage
    - [ ] Update `services/geminiService.ts` to accept an API key and Base URL dynamically (constructor or method injection) instead of hardcoded env vars.
    - [ ] Ensure the service throws a clear error if the key is missing or invalid, prompting the UI to show the settings modal.
- [ ] Task: Conductor - User Manual Verification 'Settings & API Key Management UI' (Protocol in workflow.md)

## Phase 3: GitHub Pages Deployment
Goal: Configure the project for hosting on GitHub Pages.

- [ ] Task: Update Vite Configuration
    - [ ] Modify `vite.config.ts` to set the `base` path correctly (likely `./` or the repo name) for GitHub Pages.
- [ ] Task: Create GitHub Actions Workflow
    - [ ] Create `.github/workflows/deploy.yml`.
    - [ ] Configure the workflow to install dependencies, build the project, and deploy the `dist` folder to the `gh-pages` branch on push to `main`.
- [ ] Task: Documentation
    - [ ] Update `README.md` with instructions on how to generate a Gemini API key and use the "Bring Your Own Key" feature.
- [ ] Task: Conductor - User Manual Verification 'GitHub Pages Deployment' (Protocol in workflow.md)

## Phase 4: Final Verification
Goal: Comprehensive testing of the new features.

- [ ] Task: Manual Verification - Fresh Load
    - [ ] Clear browser storage.
    - [ ] Verify app prompts for API Key.
    - [ ] Enter key and verify it persists (or doesn't, based on "Remember Me").
- [ ] Task: Manual Verification - Progress & Export
    - [ ] Complete a session/mark a question.
    - [ ] Reload page -> Verify progress persists.
    - [ ] Export data.
    - [ ] Clear storage.
    - [ ] Import data -> Verify progress is restored.
- [ ] Task: Conductor - User Manual Verification 'Final Verification' (Protocol in workflow.md)
