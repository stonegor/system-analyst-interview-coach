# Implementation Plan - Track: Manual Rating Override

## Phase 1: Frontend - UI Components & State Management
- [ ] Task: Create `EditRatingControl` component
    - [ ] Create a new component `components/EditRatingControl.tsx` that accepts `initialRating` and `onSave` props.
    - [ ] Implement toggle state for view/edit mode.
    - [ ] In edit mode, render an input field (number) and Save/Cancel buttons.
    - [ ] Add validation to ensure input is within 0-100 range (or 1-5 based on existing system).
    - [ ] Display an error message for invalid input.
- [ ] Task: Integrate `EditRatingControl` into `Session` and `TopicDetails` components
    - [ ] Locate where the rating is currently displayed in `components/Session.tsx`.
    - [ ] Replace the static rating display with `EditRatingControl`.
    - [ ] Locate where the rating is currently displayed in `components/TopicDetails.tsx` (if applicable for historical view).
    - [ ] Replace the static rating display with `EditRatingControl`.
- [ ] Task: Conductor - User Manual Verification 'Frontend - UI Components & State Management' (Protocol in workflow.md)

## Phase 2: State Management & Data Persistence
- [ ] Task: Update `storageService` to handle rating updates
    - [ ] Add a new method `updateSessionRating(sessionId: string, questionId: string, newRating: number): Promise<void>` to `services/storageService.ts`.
    - [ ] Implement logic to find the specific session and question, update the rating, and save the updated data to local storage.
    - [ ] Ensure that updating the rating triggers a recalculation of any derived stats if necessary (or rely on the existing stats calculation logic to pick up the change on re-render/re-fetch).
- [ ] Task: Connect UI to `storageService`
    - [ ] In `components/Session.tsx` (and `TopicDetails.tsx`), implement the `onSave` handler for `EditRatingControl`.
    - [ ] Call `storageService.updateSessionRating` with the new value.
    - [ ] Update local component state to reflect the change immediately.
    - [ ] Trigger a refresh of the dashboard/stats data if needed.
- [ ] Task: Conductor - User Manual Verification 'State Management & Data Persistence' (Protocol in workflow.md)

## Phase 3: Verification & Polish
- [ ] Task: Verify Statistics Update
    - [ ] Manually change a rating for a past session.
    - [ ] Navigate to the Dashboard.
    - [ ] Verify that the overall mastery/progress score reflects the new manual rating.
- [ ] Task: UI Polish
    - [ ] Ensure the "Edit" icon is subtle but accessible.
    - [ ] Add a tooltip or visual indicator that a rating has been manually edited (optional, but good UX).
- [ ] Task: Conductor - User Manual Verification 'Verification & Polish' (Protocol in workflow.md)