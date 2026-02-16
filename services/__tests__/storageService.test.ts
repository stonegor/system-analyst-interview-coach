import { describe, it, expect, beforeEach, vi } from 'vitest';
import { saveProgress, updateLastRating, getProgress, getStats } from '../storageService';

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('storageService', () => {
  beforeEach(() => {
    localStorageMock.clear();
  });

  describe('updateLastRating', () => {
    it('updates the score of the last history entry', () => {
      const questionId = 1;
      saveProgress(questionId, 2); // Initial score 2
      
      let progress = getProgress()[questionId];
      expect(progress.history[0].score).toBe(2);

      updateLastRating(questionId, 3); // Update to 3

      progress = getProgress()[questionId];
      expect(progress.history[0].score).toBe(3);
    });

    it('recalculates box and nextReview based on new score', () => {
      const questionId = 1;
      // Assume initial state (box 0)
      
      // Case 1: Score 3 (Good) -> Box 1
      saveProgress(questionId, 3);
      let progress = getProgress()[questionId];
      expect(progress.box).toBe(1);
      
      // Change to Score 1 (Bad) -> Should become Box 1 (reset)
      updateLastRating(questionId, 1);
      progress = getProgress()[questionId];
      expect(progress.box).toBe(1);
      expect(progress.history[0].score).toBe(1);

      // Reset
      localStorageMock.clear();

      // Case 2: Score 1 (Bad) -> Box 1
      saveProgress(questionId, 1);
      progress = getProgress()[questionId];
      expect(progress.box).toBe(1);
    });
  });

  describe('getStats', () => {
    it('reflects changes made by updateLastRating', () => {
      const questionId = 1;
      
      // Initial: Score 3 -> Box 1 (Not Learned, Not Struggling)
      // Learned > 2, Struggling == 1
      // Wait, let's check logic:
      // Learned: box > 2. Struggling: box === 1.
      
      // 1. Initial: Score 3 (Good) -> Box 1. (Struggling)
      saveProgress(questionId, 3);
      let stats = getStats();
      expect(stats.struggling).toBe(1);
      expect(stats.learned).toBe(0);

      // 2. Update to Score 3 repeatedly to reach learned state?
      // Or manually set box?
      // Or just check if box changes affect stats.
      
      // Let's try changing from Struggling to NOT Struggling.
      // Box 1 -> Struggling.
      // If we update rating to 3, does it change box?
      // updateLastRating(1, 3):
      // oldScore 3. prevBox = max(0, 1-1) = 0.
      // newRating 3. newBox = min(0+1, 6) = 1.
      // Still box 1. So still struggling.
      
      // This is because a single correct answer only moves box from 0 to 1.
      // We need multiple correct answers to reach Learned (>2).
      
      // Let's try with a question that IS Learned.
      // Simulate multiple correct answers.
      saveProgress(questionId, 3); // Box 1 -> 2
      saveProgress(questionId, 3); // Box 2 -> 3 (Learned)
      
      stats = getStats();
      expect(stats.learned).toBe(1);
      expect(stats.struggling).toBe(0);
      
      // Now update the LAST rating (which was 3) to 1.
      // updateLastRating(1, 1).
      // oldScore 3. prevBox = max(0, 3-1) = 2.
      // newRating 1. newBox = 1.
      // So Box becomes 1 (Struggling).
      
      updateLastRating(questionId, 1);
      
      stats = getStats();
      expect(stats.learned).toBe(0);
      expect(stats.struggling).toBe(1);
    });
  });
});
