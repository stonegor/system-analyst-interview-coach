# Implementation Plan - Track: Allow clarification questions AFTER review

## Phase 1: Backend/State Logic Update

- [ ] Task: Update Chat Context Management
    - [ ] Create a new context property `isPostReview` (boolean) in `useChat` or similar state management to track if the interview has ended.
    - [ ] Modify the `sendMessage` function to handle messages sent *after* the interview phase.
        - [ ] Ensure these messages are appended to the chat history but flagged as "post-review".
        - [ ] Prevent these messages from triggering scoring updates or interview progression logic.

- [ ] Task: Integrate "Coach" Persona into Prompt Engineering
    - [ ] Locate the prompt generation logic (likely in `geminiService.ts` or similar).
    - [ ] Create a new prompt template or conditional logic for "Post-Review/Coach Mode".
        - [ ] **Input:** Full interview transcript + Final Feedback/Ratings.
        - [ ] **Instruction:** "You are now a helpful coach. Explain the feedback, answer questions, and clarify concepts. Do NOT simulate the interview anymore."
    - [ ] Update the API call to use this new prompt when `isPostReview` is true.

## Phase 2: Frontend UI Implementation

- [ ] Task: Update Chat Interface Component
    - [ ] Locate the `ChatInterface` (or equivalent) component.
    - [ ] Remove/Disable the condition that hides or disables the input field when `isInterviewComplete` (or similar) is true.
    - [ ] Instead, ensure the input remains enabled if `isPostReview` is true.

- [ ] Task: Implement Visual Separator & System Message
    - [ ] Create a `ChatSeparator` component or style to visually divide interview messages from post-review messages.
    - [ ] Logic to insert this separator into the message list immediately after the final interview message.
    - [ ] Logic to automatically append a "System Message" from the Coach:
        - "The interview is complete. Feel free to ask me any questions about your feedback or the topics we covered."
