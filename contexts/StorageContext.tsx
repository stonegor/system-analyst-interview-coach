import React, { createContext, useContext, useState, useEffect } from 'react';
import { localStorageService, UserPreferences } from '../services/localStorageService';

interface StorageContextType {
  preferences: UserPreferences | null;
  savePreferences: (prefs: UserPreferences) => void;
  isLoading: boolean;
}

const StorageContext = createContext<StorageContextType | undefined>(undefined);

export const StorageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [preferences, setPreferences] = useState<UserPreferences | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const prefs = localStorageService.loadPreferences();
    setPreferences(prefs);
    setIsLoading(false);
  }, []);

  const handleSavePreferences = (prefs: UserPreferences) => {
    localStorageService.savePreferences(prefs);
    setPreferences(prefs);
  };

  return (
    <StorageContext.Provider value={{ preferences, savePreferences: handleSavePreferences, isLoading }}>
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
