import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ChatInterface } from '../ChatInterface';
import { Question } from '../../types';
import * as geminiService from '../../services/geminiService';

vi.mock('../../services/geminiService', () => ({
  sendChatMessage: vi.fn(),
  sendCoachMessage: vi.fn(),
  evaluateSession: vi.fn()
}));

// Mock scrollIntoView
window.HTMLElement.prototype.scrollIntoView = function() {};

describe('ChatInterface', () => {
  const mockQuestion: Question = {
    id: 1,
    question: 'Test Question',
    difficulty: 'База',
    sources: [],
    answer: 'Test Answer',
  };

  const mockReviewResult = {
    score: 2,
    feedback: 'Feedback',
    correctAnswer: 'Correct Answer'
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders correctly in interview mode', () => {
    render(<ChatInterface question={mockQuestion} onComplete={() => {}} onSkip={() => {}} />);
    expect(screen.getByText(/Интервью с ИИ/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Ваш ответ.../i)).toBeInTheDocument();
  });

  it('renders correctly in post-review mode', () => {
    render(
      <ChatInterface 
        question={mockQuestion} 
        onComplete={() => {}} 
        onSkip={() => {}}
        isPostReview={true}
        reviewResult={mockReviewResult}
      />
    );
    
    expect(screen.getAllByText(/Интервью завершено/i)).toHaveLength(2);
    expect(screen.getByText(/Изучите результаты слева/i)).toBeInTheDocument();
  });

  it('calls sendCoachMessage when in post-review mode', async () => {
    (geminiService.sendCoachMessage as any).mockResolvedValue('Coach response');

    render(
      <ChatInterface 
        question={mockQuestion} 
        onComplete={() => {}} 
        onSkip={() => {}}
        isPostReview={true}
        reviewResult={mockReviewResult}
      />
    );

    const input = screen.getByPlaceholderText(/Задайте вопрос коучу.../i);
    fireEvent.change(input, { target: { value: 'Why only 2 stars?' } });
    fireEvent.click(screen.getByRole('button', { name: '' })); // Send button usually has icon, might need better selector

    await waitFor(() => {
      expect(geminiService.sendCoachMessage).toHaveBeenCalledWith(
        expect.anything(), 
        'Why only 2 stars?',
        expect.objectContaining({
          question: mockQuestion.question,
          feedback: mockReviewResult.feedback,
          score: mockReviewResult.score
        })
      );
    });
  });
});
