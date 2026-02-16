import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import React from 'react';
import App from '../App';
import * as StorageContext from '../contexts/StorageContext';
import { SettingsModal } from '../components/SettingsModal';
import { Dashboard } from '../components/Dashboard';

// Mock components
vi.mock('../components/Dashboard', () => ({
  Dashboard: ({ onOpenSettings }: { onOpenSettings: () => void }) => (
    <div>
      <button onClick={onOpenSettings}>Open Settings</button>
      Dashboard Content
    </div>
  ),
}));

vi.mock('../components/Session', () => ({
  Session: () => <div>Session Content</div>,
}));

vi.mock('../components/TopicDetails', () => ({
  TopicDetails: () => <div>TopicDetails Content</div>,
}));

vi.mock('../components/SettingsModal', () => ({
  SettingsModal: ({ isOpen }: { isOpen: boolean }) => (
    isOpen ? <div role="dialog">Settings Modal</div> : null
  ),
}));

// Mock StorageContext
const useStorageSpy = vi.spyOn(StorageContext, 'useStorage');

describe('App', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('automatically opens settings modal if no API key is present', () => {
    useStorageSpy.mockReturnValue({
      preferences: { apiKey: '', baseUrl: '' },
      savePreferences: vi.fn(),
      exportData: vi.fn(),
      importData: vi.fn(),
      isLoading: false,
    });

    render(<App />);

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Settings Modal')).toBeInTheDocument();
  });

  it('does not open settings modal if API key is present', () => {
    useStorageSpy.mockReturnValue({
      preferences: { apiKey: 'valid-key', baseUrl: '' },
      savePreferences: vi.fn(),
      exportData: vi.fn(),
      importData: vi.fn(),
      isLoading: false,
    });

    render(<App />);

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('opens settings modal when triggered from Dashboard', () => {
    useStorageSpy.mockReturnValue({
      preferences: { apiKey: 'valid-key', baseUrl: '' },
      savePreferences: vi.fn(),
      exportData: vi.fn(),
      importData: vi.fn(),
      isLoading: false,
    });

    render(<App />);

    const settingsButton = screen.getByText('Open Settings');
    fireEvent.click(settingsButton);

    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });
});
