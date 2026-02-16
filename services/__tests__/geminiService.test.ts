import { describe, it, expect, vi, beforeEach } from 'vitest';
import { sendCoachMessage, sendChatMessage } from '../geminiService';
import { ChatMessage } from '../../types';

// Mock the GoogleGenAI SDK
const mockSendMessage = vi.fn();
const mockChatsCreate = vi.fn().mockReturnValue({
  sendMessage: mockSendMessage
});

vi.mock('@google/genai', () => {
  return {
    GoogleGenAI: class {
      chats = {
        create: mockChatsCreate
      };
      models = {
        generateContent: vi.fn()
      };
      constructor(options: any) {}
    },
    Type: {
      OBJECT: 'OBJECT',
      INTEGER: 'INTEGER',
      STRING: 'STRING'
    }
  };
});

describe('geminiService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.API_KEY = 'test-api-key';
  });

  describe('sendCoachMessage', () => {
    it('should use the coach persona and include review context', async () => {
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

    it('should handle API errors gracefully', async () => {
        const history: ChatMessage[] = [];
        const reviewContext = { question: 'q', feedback: 'f', score: 1 };
        
        mockSendMessage.mockRejectedValue(new Error('API Error'));

        const response = await sendCoachMessage(history, 'test', reviewContext);
        
        expect(response).toBe('Извините, произошла ошибка при генерации ответа.');
    });
  });
});
