import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import React from 'react';
import { SettingsModal } from '../SettingsModal';

// Mock the context hook
const mockSavePreferences = vi.fn();
const mockExportData = vi.fn();
const mockImportData = vi.fn();
const mockPreferences = { apiKey: 'test-api-key', baseUrl: '' };

vi.mock('../../contexts/StorageContext', () => ({
  useStorage: () => ({
    preferences: mockPreferences,
    savePreferences: mockSavePreferences,
    exportData: mockExportData,
    importData: mockImportData,
    isLoading: false
  }),
  StorageProvider: ({ children }: any) => <div>{children}</div>
}));

describe('SettingsModal', () => {
  const onClose = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders correctly when open', () => {
    render(<SettingsModal isOpen={true} onClose={onClose} />);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Settings')).toBeInTheDocument();
    expect(screen.getByLabelText(/API Key/i)).toHaveValue('test-api-key');
  });

  it('does not render when closed', () => {
    render(<SettingsModal isOpen={false} onClose={onClose} />);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('calls savePreferences when API key is changed and saved', async () => {
    render(<SettingsModal isOpen={true} onClose={onClose} />);
    
    const input = screen.getByLabelText(/API Key/i);
    fireEvent.change(input, { target: { value: 'new-key' } });
    
    expect(input).toHaveValue('new-key');

    const saveButton = screen.getByRole('button', { name: /save changes/i });
    fireEvent.click(saveButton);
    
    expect(mockSavePreferences).toHaveBeenCalledWith(expect.objectContaining({ apiKey: 'new-key' }), true);
    expect(onClose).toHaveBeenCalled();
  });

  it('switches tabs and handles export', async () => {
    mockExportData.mockReturnValue('{"test": "data"}');
    
    render(<SettingsModal isOpen={true} onClose={onClose} />);
    
    // Switch to Data tab
    const dataTab = screen.getByRole('button', { name: /data/i });
    fireEvent.click(dataTab);
    
    expect(screen.getByText(/export progress/i)).toBeInTheDocument();
    
    // Find Copy button
    const copyButton = screen.getByRole('button', { name: /copy to clipboard/i });
    
    // Mock navigator.clipboard
    Object.defineProperty(navigator, 'clipboard', {
        value: {
            writeText: vi.fn(),
        },
        configurable: true,
    });
    
    fireEvent.click(copyButton);
    
    expect(mockExportData).toHaveBeenCalled();
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('{"test": "data"}');
  });

  it('handles import data', async () => {
    mockImportData.mockReturnValue(true);
    // Mock window.location.reload
    Object.defineProperty(window, 'location', {
        configurable: true,
        value: { reload: vi.fn() },
    });
    
    render(<SettingsModal isOpen={true} onClose={onClose} />);
    
    const dataTab = screen.getByRole('button', { name: /data/i });
    fireEvent.click(dataTab);
    
    // Use a regex that matches the actual placeholder or get by role if possible (textarea doesn't usually have role unless assigned)
    // Placeholder is '{"progress": { ... }}'
    const textarea = screen.getByPlaceholderText(/\{"progress":/i); 
    fireEvent.change(textarea, { target: { value: '{"progress": {}}' } });
    
    const importButton = screen.getByRole('button', { name: /import & replace/i });
    fireEvent.click(importButton); 
    
    expect(mockImportData).toHaveBeenCalledWith('{"progress": {}}');
    // Wait for timeout
    await waitFor(() => {
        expect(window.location.reload).toHaveBeenCalled();
    }, { timeout: 2000 });
  });
});
