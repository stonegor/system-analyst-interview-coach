# Specification: JSON Data Import Feature

## 1. Overview
The application currently allows users to export their progress as a `.json` file and import progress by pasting a JSON string into a text area. This feature will add a corresponding "Upload JSON" button to allow users to directly select and import a `.json` file from their device.

## 2. Functional Requirements
- **File Upload Button:** Add an "Upload JSON file" button in the Settings modal under the "Data (Export/Import)" tab.
- **File Input Handling:** When the user selects a `.json` file, the app will read the file contents using a `FileReader`.
- **Direct Import:** The application will immediately attempt to parse and import the selected file's data.
- **Existing Textarea:** The current "Paste JSON" textarea and "Import & Replace" button will remain functional, alongside the new file upload option.
- **Confirmation Dialog:** Before the imported file data overwrites the current progress, the app will prompt the user with a browser confirmation dialog (e.g., `window.confirm`).
- **Feedback:** Upon successful import, the app will display a success message and reload. If the file is invalid JSON or cannot be read, an error message will be displayed.

## 3. Non-Functional Requirements
- **UI Consistency:** The new button should match the styling of the existing "Download JSON" and "Copy to Clipboard" buttons.
- **File Type Validation:** The file input should be restricted to `.json` files (`accept=".json"`).

## 4. Acceptance Criteria
- [ ] A user can click an "Upload JSON file" button and select a local file.
- [ ] Selecting a valid JSON file triggers a confirmation dialog.
- [ ] Confirming the dialog successfully imports the data and reloads the app.
- [ ] Canceling the dialog aborts the import.
- [ ] Selecting an invalid file displays an error message.
- [ ] The existing textarea import method still works as before.

## 5. Out of Scope
- Detailed JSON schema validation (the current basic object check is sufficient).
- Custom modal UI for the confirmation dialog (browser default will be used).