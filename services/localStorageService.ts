import { UserProgress } from '../types';

export interface UserPreferences {
  apiKey: string;
  baseUrl?: string;
}

const PREFS_KEY = 'saic_preferences';
const PROGRESS_KEY = 'sa_coach_progress'; // Compatible with existing storageService

export const localStorageService = {
  savePreferences(prefs: UserPreferences): void {
    localStorage.setItem(PREFS_KEY, JSON.stringify(prefs));
  },

  loadPreferences(): UserPreferences | null {
    const data = localStorage.getItem(PREFS_KEY);
    if (!data) return null;
    try {
      return JSON.parse(data);
    } catch (e) {
      console.error('Failed to parse preferences', e);
      return null;
    }
  },

  saveAllProgress(progress: Record<number, UserProgress>): void {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
  },

  loadAllProgress(): Record<number, UserProgress> {
    const data = localStorage.getItem(PROGRESS_KEY);
    if (!data) return {};
    try {
      return JSON.parse(data);
    } catch (e) {
      console.error('Failed to parse progress', e);
      return {};
    }
  },

  exportData(): string {
    const data = {
      progress: this.loadAllProgress(),
      // Explicitly excluding preferences (API Key)
    };
    return JSON.stringify(data, null, 2);
  },

  importData(json: string): boolean {
    try {
      const data = JSON.parse(json);
      if (data.progress && typeof data.progress === 'object') {
        // Basic validation could go here
        this.saveAllProgress(data.progress);
        return true;
      }
      return false;
    } catch (e) {
      console.error('Failed to import data', e);
      return false;
    }
  }
};