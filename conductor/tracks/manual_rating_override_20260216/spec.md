# Specification: Manual Rating Override

## 1. Overview
This feature allows users to manually override the AI-generated rating for their interview answers. This addresses scenarios where the user feels the AI's assessment is inaccurate or when they want to adjust the score based on their own self-reflection.

## 2. Functional Requirements
- **Trigger:** Users can click an "Edit" icon/button next to the displayed AI rating.
- **Input:** Users can input a new rating value.
- **Validation:** The manual rating must be within the valid range of the AI rating system (e.g., 0-100 or 1-5, matching the current implementation).
- **Data Update:** The manual rating completely replaces the AI rating in the database for that specific response.
- **Impact:** All statistics, progress tracking, and mastery levels must be recalculated based on the new manual rating.

## 3. Non-Functional Requirements
- **Performance:** The update should be immediate on the frontend and persist to the backend without significant delay.
- **UX:** The edit mode should be intuitive and clearly indicate that the rating has been modified by the user.

## 4. Acceptance Criteria
- [ ] An edit button is visible next to the AI score on the session result or history page.
- [ ] Clicking the edit button allows the user to change the score.
- [ ] Entering a score outside the valid range displays an error message.
- [ ] Saving the new score updates the displayed value immediately.
- [ ] The new score is persisted to storage.
- [ ] Dashboard statistics reflect the manually updated score.

## 5. Out of Scope
- A separate "dispute" workflow where the AI re-evaluates based on user feedback (this is a simple manual override).
- Storing both AI and Manual ratings side-by-side for comparison (the manual one replaces the AI one).