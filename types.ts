export type Difficulty = "База" | "Среднячок" | "Хардкор" | "Божественный";

export interface Source {
  name: string;
  url: string;
}

export interface Question {
  id: number;
  question: string;
  difficulty: Difficulty;
  sources: Source[];
  answer: string;
  categoryId?: string; // Augmented at runtime
}

export interface Category {
  id: string;
  title: string;
  questions: Question[];
}

export interface AppData {
  app_metadata: {
    title: string;
    description: string;
    version: string;
    difficulty_legend: { level: string; description: string }[];
    author_tips: string[];
  };
  categories: Category[];
}

export interface UserProgress {
  questionId: number;
  box: number; // 0 to 5 (Leitner boxes or similar concept)
  nextReview: number; // Timestamp
  lastReviewed: number; // Timestamp
  history: { date: number; score: 1 | 2 | 3 }[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model' | 'system';
  text: string;
  isThinking?: boolean;
}

export interface EvaluationResult {
  score: 1 | 2 | 3;
  feedback: string;
  correctAnswer: string;
}
