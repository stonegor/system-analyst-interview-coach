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
    
    await waitFor(() => {
      expect(screen.getByText('Copied!')).toBeInTheDocument();
    });

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

  it('handles file upload and import with confirmation', async () => {
    mockImportData.mockReturnValue(true);
    Object.defineProperty(window, 'location', {
        configurable: true,
        value: { reload: vi.fn() },
    });
    
    // Mock window.confirm
    window.confirm = vi.fn();
    const confirmSpy = vi.spyOn(window, 'confirm').mockImplementation(() => true);

    render(<SettingsModal isOpen={true} onClose={onClose} />);
    
    const dataTab = screen.getByRole('button', { name: /data/i });
    fireEvent.click(dataTab);
    
    // Find the file input
    // The input should be hidden, but we can query it by its label or role, or just test id if we add one.
    // Let's assume we add a data-testid to it.
    // Wait, testing-library prefers finding by label. Let's assume there's a label "Upload JSON file" or a test id.
    // We will query by data-testid "file-upload-input" to be safe.
    // Actually, since it's a file input, we can get it by `document.querySelector('input[type="file"]')` if we have to,
    // but better to add data-testid="json-upload-input" in the implementation.
    
    // We expect the button "Upload JSON file" to be present.
    const uploadButton = screen.getByRole('button', { name: /upload json file/i });
    expect(uploadButton).toBeInTheDocument();
    
    // In our implementation, clicking the button will trigger the input. We'll simulate changing the input directly.
    // The test runner might not be able to easily test the `button.click()` triggering `input.click()`, so we test the input directly.
    const file = new File(['{"progress": {"1": {"status": "done"}}}'], 'data.json', { type: 'application/json' });
    
    // We need the input element
    const fileInput = screen.getByTestId('json-upload-input');
    
    fireEvent.change(fileInput, { target: { files: [file] } });
    
    // FileReader is asynchronous
    await waitFor(() => {
        expect(confirmSpy).toHaveBeenCalledWith(expect.stringMatching(/overwrite/i));
    });
    
    expect(mockImportData).toHaveBeenCalledWith('{"progress": {"1": {"status": "done"}}}');
    
    await waitFor(() => {
        expect(window.location.reload).toHaveBeenCalled();
    }, { timeout: 2000 });

    confirmSpy.mockRestore();
  });

  it('aborts file upload if confirmation is cancelled', async () => {
    // Mock window.confirm to return false
    const confirmSpy = vi.spyOn(window, 'confirm').mockImplementation(() => false);

    render(<SettingsModal isOpen={true} onClose={onClose} />);
    
    const dataTab = screen.getByRole('button', { name: /data/i });
    fireEvent.click(dataTab);
    
    const file = new File(['{"progress": {"1": {"status": "done"}}}'], 'data.json', { type: 'application/json' });
    const fileInput = screen.getByTestId('json-upload-input');
    
    fireEvent.change(fileInput, { target: { files: [file] } });
    
    await waitFor(() => {
        expect(confirmSpy).toHaveBeenCalled();
    });
    
    expect(mockImportData).not.toHaveBeenCalled();
    
    confirmSpy.mockRestore();
  });
});
