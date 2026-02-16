import { describe, it, expect, beforeEach, vi } from 'vitest';
import { localStorageService } from '../localStorageService';
import { UserProgress } from '../../types';

describe('localStorageService', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  describe('Preferences', () => {
    it('should save and load user preferences', () => {
      const prefs = { apiKey: 'test-key', baseUrl: 'https://test.api' };
      localStorageService.savePreferences(prefs);
      
      const loaded = localStorageService.loadPreferences();
      expect(loaded).toEqual(prefs);
    });

    it('should return null if no preferences saved', () => {
      const loaded = localStorageService.loadPreferences();
      expect(loaded).toBeNull();
    });
  });

  describe('Progress', () => {
    it('should save and load progress', () => {
      const progress: Record<number, UserProgress> = {
        1: {
          questionId: 1,
          box: 1,
          nextReview: Date.now(),
          lastReviewed: Date.now(),
          history: []
        }
      };
      
      localStorageService.saveAllProgress(progress);
      const loaded = localStorageService.loadAllProgress();
      expect(loaded).toEqual(progress);
    });
  });

  describe('Export/Import', () => {
    it('should export data without API key', () => {
      const prefs = { apiKey: 'secret-key' };
      localStorageService.savePreferences(prefs);
      
      const progress: Record<number, UserProgress> = {
        1: {
          questionId: 1,
          box: 1,
          nextReview: 100,
          lastReviewed: 100,
          history: []
        }
      };
      localStorageService.saveAllProgress(progress);

      const json = localStorageService.exportData();
      const parsed = JSON.parse(json);

      expect(parsed.progress).toEqual(progress);
      expect(parsed.preferences).toBeUndefined();
      expect(json).not.toContain('secret-key');
    });

    it('should import valid data', () => {
      const importData = {
        progress: {
          2: {
            questionId: 2,
            box: 2,
            nextReview: 200,
            lastReviewed: 200,
            history: []
          }
        }
      };
      const json = JSON.stringify(importData);
      
      const success = localStorageService.importData(json);
      expect(success).toBe(true);

      const loaded = localStorageService.loadAllProgress();
      expect(loaded).toEqual(importData.progress);
    });

    it('should fail to import invalid data', () => {
      const json = JSON.stringify({ wrong: 'data' });
      const success = localStorageService.importData(json);
      expect(success).toBe(false);
    });
  });
});