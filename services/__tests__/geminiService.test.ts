import { describe, it, expect, vi, beforeEach } from 'vitest';
import { sendCoachMessage, sendChatMessage } from '../geminiService';
import { ChatMessage } from '../../types';
import { localStorageService } from '../localStorageService';

// Mock localStorageService
vi.mock('../localStorageService', () => ({
  localStorageService: {
    loadPreferences: vi.fn()
  }
}));

// Mock the GoogleGenAI SDK
const mockSendMessage = vi.fn();
const mockChatsCreate = vi.fn().mockReturnValue({
  sendMessage: mockSendMessage
});
const mockGenerateContent = vi.fn();

// Spy on constructor
const GoogleGenAIConstructorSpy = vi.fn();

vi.mock('@google/genai', () => {
  return {
    GoogleGenAI: class {
      chats = {
        create: mockChatsCreate
      };
      models = {
        generateContent: mockGenerateContent
      };
      constructor(options: any) {
        GoogleGenAIConstructorSpy(options);
      }
    },
    Type: {
      OBJECT: 'OBJECT',
      INTEGER: 'INTEGER',
      STRING: 'STRING'
    }
  };
});

describe('geminiService', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    vi.clearAllMocks();
    process.env = { ...originalEnv };
    process.env.VITE_GEMINI_API_KEY = 'env-key';
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it('should use API key from localStorage if available', async () => {
    // Explicitly set return value
    const mockPrefs = { apiKey: 'local-key', baseUrl: '' };
    (localStorageService.loadPreferences as any).mockReturnValue(mockPrefs);
    mockSendMessage.mockResolvedValue({ text: 'Response' });

    await sendChatMessage([], 'test');
    
    expect(localStorageService.loadPreferences).toHaveBeenCalled();
    expect(GoogleGenAIConstructorSpy).toHaveBeenCalledWith(expect.objectContaining({
      apiKey: 'local-key'
    }));
  });

  it('should fallback to env var if localStorage has no key', async () => {
    (localStorageService.loadPreferences as any).mockReturnValue(null);
    process.env.VITE_GEMINI_API_KEY = 'env-key';
    mockSendMessage.mockResolvedValue({ text: 'Response' });

    await sendChatMessage([], 'test');

    expect(GoogleGenAIConstructorSpy).toHaveBeenCalledWith(expect.objectContaining({
      apiKey: 'env-key'
    }));
  });

  it('should throw error if no API key found', async () => {
    (localStorageService.loadPreferences as any).mockReturnValue(null);
    delete process.env.VITE_GEMINI_API_KEY;
    delete process.env.API_KEY; 

    await expect(sendChatMessage([], 'test')).rejects.toThrow('API Key is missing');
  });
//...

  describe('sendCoachMessage', () => {
    it('should use the coach persona and include review context', async () => {
      (localStorageService.loadPreferences as any).mockReturnValue({ apiKey: 'key' });
      process.env.VITE_GEMINI_API_KEY = 'key'; 

      const history: ChatMessage[] = [
        { id: '1', role: 'model', text: 'Question' },
        { id: '2', role: 'user', text: 'Answer' }
      ];
      const newMessage = 'Explain why I was wrong';
      const reviewContext = {
        question: 'What is SQL?',
        feedback: 'You missed the structured part.',
        score: 2
      };

      mockSendMessage.mockResolvedValue({ text: 'Because SQL is structured.' });

      const response = await sendCoachMessage(history, newMessage, reviewContext);

      expect(response).toBe('Because SQL is structured.');
      
      // Verify chat creation config
      const createCallArgs = mockChatsCreate.mock.calls[0][0];
      expect(createCallArgs.config.systemInstruction).toContain('You are a helpful and supportive System Analyst Interview Coach.');
      expect(createCallArgs.config.systemInstruction).toContain('What is SQL?');
      expect(createCallArgs.config.systemInstruction).toContain('You missed the structured part.');
      expect(createCallArgs.config.systemInstruction).toContain('2/3');
      
      // Verify history transformation
      expect(createCallArgs.history).toHaveLength(2);
      expect(createCallArgs.history[0].role).toBe('model');
      expect(createCallArgs.history[1].role).toBe('user');
    });

    it('should propagate API errors', async () => {
    (localStorageService.loadPreferences as any).mockReturnValue({ apiKey: 'key' });
    const history: ChatMessage[] = [];
    const reviewContext = { question: 'q', feedback: 'f', score: 1 };
    
    mockSendMessage.mockRejectedValue(new Error('API Error'));

    await expect(sendCoachMessage(history, 'test', reviewContext)).rejects.toThrow('API Error');
  });
  });
});
