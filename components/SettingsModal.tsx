import React, { useState, useEffect } from 'react';
import { X, Save, Download, Upload, Copy, Check } from 'lucide-react';
import { useStorage } from '../contexts/StorageContext';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const { preferences, savePreferences, exportData, importData } = useStorage();
  const [activeTab, setActiveTab] = useState<'general' | 'data'>('general');
  const [apiKey, setApiKey] = useState('');
  const [baseUrl, setBaseUrl] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [importJson, setImportJson] = useState('');
  const [copySuccess, setCopySuccess] = useState(false);
  const [importStatus, setImportStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    if (isOpen && preferences) {
      setApiKey(preferences.apiKey || '');
      setBaseUrl(preferences.baseUrl || '');
    }
  }, [isOpen, preferences]);

  if (!isOpen) return null;

  const handleSave = () => {
    if (!apiKey.trim()) return; // validation
    savePreferences({ apiKey, baseUrl }, rememberMe);
    onClose();
  };

  const handleCopy = async () => {
    const data = exportData();
    try {
      await navigator.clipboard.writeText(data);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  const handleDownload = () => {
    const data = exportData();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sa_coach_backup_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImport = () => {
    if (!importJson.trim()) return;
    const success = importData(importJson);
    if (success) {
      setImportStatus('success');
      setTimeout(() => {
        setImportStatus('idle');
        window.location.reload(); // Reload to reflect changes
      }, 1500);
    } else {
      setImportStatus('error');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" role="dialog" aria-modal="true">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <h2 className="text-lg font-semibold text-slate-800">Settings</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-slate-100">
          <button
            onClick={() => setActiveTab('general')}
            className={`flex-1 py-3 text-sm font-medium transition-colors ${
              activeTab === 'general'
                ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50/50'
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            General
          </button>
          <button
            onClick={() => setActiveTab('data')}
            className={`flex-1 py-3 text-sm font-medium transition-colors ${
              activeTab === 'data'
                ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50/50'
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            Data (Export/Import)
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto">
          {activeTab === 'general' ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Gemini API Key <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  placeholder="Paste your API key here"
                  aria-label="API Key"
                />
                <p className="text-xs text-slate-500 mt-1">
                  Your key is stored locally in your browser. We never see it.
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Custom Base URL (Optional)
                </label>
                <input
                  type="text"
                  value={baseUrl}
                  onChange={(e) => setBaseUrl(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  placeholder="https://generativelanguage.googleapis.com"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="rememberMe"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="rememberMe" className="text-sm text-slate-700 select-none cursor-pointer">
                  Remember me (Save to Local Storage)
                </label>
              </div>
              
              {!rememberMe && (
                 <p className="text-xs text-amber-600 bg-amber-50 p-2 rounded">
                    Credentials will be lost when you close the tab.
                 </p>
              )}

              <div className="pt-4 flex justify-end">
                <button
                  onClick={handleSave}
                  disabled={!apiKey.trim()}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  <Save size={16} />
                  Save Changes
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Export */}
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-slate-900">Export Progress</h3>
                <p className="text-xs text-slate-500">Save your progress to a file or clipboard.</p>
                <div className="flex gap-2">
                  <button
                    onClick={handleDownload}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 transition-all text-sm"
                  >
                    <Download size={16} />
                    Download JSON
                  </button>
                  <button
                    onClick={handleCopy}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 transition-all text-sm"
                  >
                    {copySuccess ? <Check size={16} className="text-green-600" /> : <Copy size={16} />}
                    {copySuccess ? 'Copied!' : 'Copy to Clipboard'}
                  </button>
                </div>
              </div>

              <div className="h-px bg-slate-200" />

              {/* Import */}
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-slate-900">Import Progress</h3>
                <p className="text-xs text-slate-500">Paste your JSON data below to restore progress.</p>
                <textarea
                  value={importJson}
                  onChange={(e) => setImportJson(e.target.value)}
                  className="w-full h-32 px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-xs font-mono resize-none"
                  placeholder='{"progress": { ... }}'
                />
                
                {importStatus === 'error' && (
                    <p className="text-xs text-red-600">Invalid JSON data. Please check your input.</p>
                )}
                {importStatus === 'success' && (
                    <p className="text-xs text-green-600">Import successful! Reloading...</p>
                )}

                <div className="flex justify-end">
                   <button
                    onClick={handleImport}
                    disabled={!importJson.trim()}
                    className="flex items-center gap-2 px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all text-sm"
                  >
                    <Upload size={16} />
                    Import & Replace
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};