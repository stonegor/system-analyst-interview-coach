# Track Specification: Allow user to ask clarification questions AFTER the review

## 1. Overview
This feature allows users to continue interacting with the AI after the interview session has concluded. Instead of the session ending abruptly with a "Chat is closed" message, the chat interface will remain active. The user can ask clarification questions about their performance, the feedback received, or general concepts. The AI will switch to a supportive "Coach" persona to facilitate learning and explanation.

## 2. Functional Requirements

### 2.1. Chat Continuity
- **FR1:** The chat interface must remain active and interactive after the interview session concludes.
- **FR2:** The existing chat history from the interview session must be preserved and visible.
- **FR3:** The user must be able to send new messages (questions) after the review phase starts.

### 2.2. Context & Persona Management
- **FR4:** The AI's context for post-review interactions must include:
    - The full transcript of the interview.
    - The detailed feedback/rating provided by the AI.
- **FR5:** The AI must switch to a "Coach" persona for all post-review interactions.
    - **Tone:** Supportive, educational, explanatory.
    - **Goal:** To help the user understand their mistakes, clarify concepts, and improve for next time.
- **FR6:** The AI must NOT simulate the interviewer persona during this phase.

### 2.3. Scoring & State
- **FR7:** The session scores and ratings generated at the end of the interview are **FINAL**.
- **FR8:** Post-review interactions (clarification questions) must NOT update or change the recorded scores for the session.

### 2.4. UI/UX Changes
- **FR9:** A distinct visual separator (e.g., a horizontal bar or divider) must be inserted in the chat history to mark the end of the interview and the start of the review/clarification phase.
- **FR10:** Immediately after the review is generated, the system must automatically inject a new message into the chat from the "Coach" persona.
    - **Content:** An invitation for the user to ask questions (e.g., "The interview is complete. Feel free to ask me any questions about your feedback or the topics we covered.").
- **FR11:** The "Chat is closed" or similar blocking UI elements must be removed or conditionalized to allow input during this phase.

## 3. Non-Functional Requirements
- **NFR1:** **Responsiveness:** The transition from "Interview" to "Review/Clarification" mode should be instantaneous or near-instantaneous.
- **NFR2:** **Clarity:** The distinction between the "Test" (Interview) and "Learning" (Review) phases must be clear to the user to avoid confusion about scoring.

## 4. Out of Scope
- Re-grading or score adjustments based on post-review chat.
- Starting a new interview session directly from the chat context (user must exit/restart).
- Saving the post-review Q&A as a separate "session" (it appends to the current session log).

## 5. Acceptance Criteria
- [ ] The chat input field remains enabled after the interview ends.
- [ ] A visual separator appears in the chat log between the last interview exchange and the review phase.
- [ ] A system/coach message appears inviting the user to ask questions.
- [ ] The user can ask a question about the feedback.
- [ ] The AI responds in a helpful, coaching tone, referencing the specific feedback/ratings.
- [ ] The session score remains unchanged regardless of the user's post-review inputs.
