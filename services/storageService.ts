import { Question, UserProgress, AppData, Category } from '../types';
import { INITIAL_DATA } from '../constants';

const STORAGE_KEY = 'sa_coach_progress';

export const getAllQuestions = (): Question[] => {
  const questions: Question[] = [];
  INITIAL_DATA.categories.forEach(cat => {
    cat.questions.forEach(q => {
      questions.push({ ...q, categoryId: cat.id });
    });
  });
  return questions;
};

export const getProgress = (): Record<number, UserProgress> => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : {};
};

export const saveProgress = (questionId: number, score: 1 | 2 | 3) => {
  const allProgress = getProgress();
  const current = allProgress[questionId] || {
    questionId,
    box: 0,
    nextReview: 0,
    lastReviewed: 0,
    history: []
  };

  // Algorithm: Simplified Leitner/SM-2
  // Score 1 (Bad): Reset box to 1, review in 10 minutes.
  // Score 2 (Ok): Keep box, review in 1 day.
  // Score 3 (Good): Increment box, review in 2^box days.

  let newBox = current.box;
  let intervalMs = 0;

  if (score === 1) {
    newBox = 1;
    intervalMs = 10 * 60 * 1000; // 10 mins
  } else if (score === 2) {
    // Keep box same, verify tomorrow
    intervalMs = 24 * 60 * 60 * 1000;
  } else {
    newBox = Math.min(current.box + 1, 6);
    // Exponential: 1 day, 3 days, 7 days, 14 days...
    const days = Math.pow(2, newBox - 1); 
    intervalMs = days * 24 * 60 * 60 * 1000;
  }

  const updated: UserProgress = {
    ...current,
    box: newBox,
    lastReviewed: Date.now(),
    nextReview: Date.now() + intervalMs,
    history: [...current.history, { date: Date.now(), score }]
  };

  allProgress[questionId] = updated;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(allProgress));
};

export const skipQuestion = (questionId: number) => {
  const allProgress = getProgress();
  const current = allProgress[questionId] || {
    questionId,
    box: 0,
    nextReview: 0,
    lastReviewed: 0,
    history: []
  };

  // Push review time forward by 20 minutes
  const updated: UserProgress = {
    ...current,
    nextReview: Date.now() + 20 * 60 * 1000,
    // Do not update history or lastReviewed for a skip, or update lastReviewed if you want to track it
  };

  allProgress[questionId] = updated;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(allProgress));
};

export const getSmartQueue = (): Question[] => {
  const questions = getAllQuestions();
  const progress = getProgress();
  const now = Date.now();

  // Sort by urgency:
  // 1. Never seen (prioritize slightly less than overdue to mix them in)
  // 2. Overdue (nextReview < now)
  // 3. Due soon
  
  return questions.sort((a, b) => {
    const pA = progress[a.id];
    const pB = progress[b.id];

    // If both undefined, sort by id (stable)
    if (!pA && !pB) return a.id - b.id;
    // Prioritize unseen questions if they are mixed
    if (!pA) return -1; 
    if (!pB) return 1;

    return pA.nextReview - pB.nextReview;
  });
};

export const getStats = () => {
  const progress = getProgress();
  const total = getAllQuestions().length;
  const learned = Object.values(progress).filter(p => p.box > 2).length;
  const struggling = Object.values(progress).filter(p => p.box === 1).length;
  
  return {
    total,
    learned,
    struggling,
    started: Object.keys(progress).length
  };
};