# Product Guidelines

## 1. Visual Identity
**Style:** Modern Professional & Clean SaaS
- **Core Concept:** A trustworthy, educational environment that focuses on clarity and readability. The design uses ample whitespace, rounded corners, and a structured grid layout to reduce cognitive load.
- **Color Palette:**
    - **Primary:** Blue (`#2563eb`) - Used for primary actions, active states, and branding.
    - **Neutral:** Slate (`#475569` to `#f8fafc`) - Used for text, backgrounds, and borders to create a soft, high-contrast reading experience.
    - **Surface:** White (`#ffffff`) - Used for cards and content areas to stand out against the light slate background.
    - **Feedback:** Green (Success/Easy), Yellow (Warning/Medium), Red (Error/Hard) - Used for difficulty indicators and status feedback.
- **Typography:**
    - **Font Family:** Sans-serif (Tailwind default) for a clean, modern look.
    - **Hierarchy:** Bold headings (`text-2xl`, `text-3xl`) clearly separate sections from readable body text (`text-base`, `text-slate-600`).

## 2. UX/UI Patterns
- **Navigation:** Simple, dashboard-centric navigation. Users return to a central hub to access different study modes.
- **Interactivity:**
    - **Hover Effects:** Subtle color shifts and shadow increases on interactive elements (buttons, cards) to indicate affordance.
    - **Transitions:** Smooth transitions (`transition-colors`, `transition-all`) for a polished feel.
- **Components:**
    - **Cards:** Content is grouped into rounded cards (`rounded-2xl`, `border-slate-200`) with soft shadows (`shadow-sm`) to define distinct areas.
    - **Icons:** Consistent use of Lucide React icons to provide visual cues and break up text.
    - **Responsive:** Grid layouts (`grid-cols-1` to `md:grid-cols-2`) ensure usability across devices.

## 3. Tone and Voice
- **Educational & Encouraging:** The application acts as a supportive coach. Feedback should be constructive and motivating.
- **Professional:** Language should be precise and industry-relevant, mirroring real-world interview scenarios.
- **Direct:** Instructions and feedback are concise and easy to parse.
