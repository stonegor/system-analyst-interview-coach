import React, { createContext, useContext, useState, useEffect } from 'react';
import { localStorageService, UserPreferences } from '../services/localStorageService';

interface StorageContextType {
  preferences: UserPreferences | null;
  savePreferences: (prefs: UserPreferences, remember?: boolean) => void;
  exportData: () => string;
  importData: (json: string) => boolean;
  isLoading: boolean;
}

const StorageContext = createContext<StorageContextType | undefined>(undefined);

export const StorageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [preferences, setPreferences] = useState<UserPreferences | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Try local storage first
    let prefs = localStorageService.loadPreferences();
    
    // If not found, try session storage
    if (!prefs) {
      try {
        const sessionData = sessionStorage.getItem('saic_preferences');
        if (sessionData) {
          prefs = JSON.parse(sessionData);
        }
      } catch (e) {
        console.error('Failed to parse session preferences', e);
      }
    }
    
    setPreferences(prefs);
    setIsLoading(false);
  }, []);

  const handleSavePreferences = (prefs: UserPreferences, remember: boolean = true) => {
    if (remember) {
      localStorageService.savePreferences(prefs);
      // Clear session storage to avoid confusion? Or keep it synced?
      // Usually if "Remember Me", we don't need session storage.
      sessionStorage.removeItem('saic_preferences');
    } else {
      // Save to session storage
      sessionStorage.setItem('saic_preferences', JSON.stringify(prefs));
      // Clear local storage if exists (user opted out of remembering)
      localStorage.removeItem('saic_preferences');
    }
    setPreferences(prefs);
  };

  const handleExportData = () => {
    return localStorageService.exportData();
  };

  const handleImportData = (json: string) => {
    return localStorageService.importData(json);
  };

  return (
    <StorageContext.Provider value={{ 
      preferences, 
      savePreferences: handleSavePreferences, 
      exportData: handleExportData,
      importData: handleImportData,
      isLoading 
    }}>
      {children}
    </StorageContext.Provider>
  );
};

export const useStorage = () => {
  const context = useContext(StorageContext);
  if (!context) {
    throw new Error('useStorage must be used within a StorageProvider');
  }
  return context;
};
