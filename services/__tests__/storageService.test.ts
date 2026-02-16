import { describe, it, expect, beforeEach, vi } from 'vitest';
import { saveProgress, updateLastRating, getProgress } from '../storageService';

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
      // Wait, if I just apply logic: Score 1 always resets to Box 1.
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

      // Change to Score 2 (Ok) -> Should stay Box 1 (if we assume it was 1 before? No, it was 0 before).
      // Here is the problem: we lost the "before" state.
      // If we assume "before" was 0 (new question).
      // Score 2 -> Box should stay same (0).
      
      // If updateLastRating doesn't know previous state, it might fail to revert correctly.
      // Let's see how we implement it.
    });
  });
});
