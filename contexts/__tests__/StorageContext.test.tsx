import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import React, { useContext } from 'react';
import { StorageProvider, useStorage } from '../StorageContext'; // Updated path
import { localStorageService } from '../../services/localStorageService';

// Mock localStorageService
vi.mock('../../services/localStorageService', () => ({
  localStorageService: {
    loadPreferences: vi.fn(),
    savePreferences: vi.fn(),
  },
}));

const TestComponent = () => {
  const { preferences, savePreferences, isLoading } = useStorage();
  
  if (isLoading) return <div>Loading...</div>;
  if (!preferences) return <button onClick={() => savePreferences({ apiKey: 'new-key' })}>Save</button>;
  
  return <div>API Key: {preferences.apiKey}</div>;
};

describe('StorageContext', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should provide preferences from localStorageService on mount', async () => {
    (localStorageService.loadPreferences as any).mockReturnValue({ apiKey: 'test-key' });

    render(
      <StorageProvider>
        <TestComponent />
      </StorageProvider>
    );

    // Initial render might show loading or result depending on useEffect timing
    // With `happy-dom`/`jsdom` and React 18, useEffect runs after render.
    // We expect "API Key: test-key" eventually.
    
    expect(await screen.findByText('API Key: test-key')).toBeInTheDocument();
    expect(localStorageService.loadPreferences).toHaveBeenCalled();
  });

  it('should update preferences when savePreferences is called', async () => {
    (localStorageService.loadPreferences as any).mockReturnValue(null);

    render(
      <StorageProvider>
        <TestComponent />
      </StorageProvider>
    );

    const button = await screen.findByText('Save');
    act(() => {
        button.click();
    });

    expect(localStorageService.savePreferences).toHaveBeenCalledWith({ apiKey: 'new-key' });
    expect(await screen.findByText('API Key: new-key')).toBeInTheDocument();
  });
});
