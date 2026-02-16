import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { Session } from '../Session';
import * as storageService from '../../services/storageService';
import { Question } from '../../types';

// Mock child components to simplify testing
vi.mock('../ChatInterface', () => ({
  ChatInterface: ({ onComplete }) => (
    <button onClick={() => onComplete({ score: 2, feedback: 'Good job', correctAnswer: 'Answer' })}>
      Complete Chat
    </button>
  ),
}));

// Mock Lucide icons
vi.mock('lucide-react', () => ({
  ArrowLeft: () => <span>ArrowLeft</span>,
  Star: () => <span data-testid="star-icon">Star</span>,
  BookOpen: () => <span>BookOpen</span>,
  ExternalLink: () => <span>ExternalLink</span>,
  RefreshCw: () => <span>RefreshCw</span>,
  Play: () => <span>Play</span>,
  Pencil: () => <span>Pencil</span>,
  Save: () => <span>Save</span>,
  X: () => <span>X</span>,
}));

// Mock ReactMarkdown
vi.mock('react-markdown', () => ({
    default: ({ children }) => <div>{children}</div>,
}));

describe('Session', () => {
  const mockQuestion: Question = {
    id: 1,
    question: 'Test Question',
    difficulty: 'База',
    sources: [],
    answer: 'Test Answer',
  };

  beforeEach(() => {
    vi.spyOn(storageService, 'getSmartQueue').mockReturnValue([mockQuestion]);
    vi.spyOn(storageService, 'saveProgress').mockImplementation(() => {});
    vi.spyOn(storageService, 'skipQuestion').mockImplementation(() => {});
    vi.spyOn(storageService, 'updateLastRating').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders star rating controls when result is available', async () => {
    render(<Session onExit={() => {}} />);
    
    // Complete the chat to show results
    fireEvent.click(screen.getByText('Complete Chat'));

    await waitFor(() => {
        const stars = screen.getAllByTestId('star-icon');
        expect(stars).toHaveLength(3);
        expect(screen.getByText('Нажмите для изменения оценки')).toBeInTheDocument();
        // Initial rating is 2 ("Хорошо")
        expect(screen.getByText('Хорошо')).toBeInTheDocument();
    });
  });

  it('updates rating when clicking a star', async () => {
    render(<Session onExit={() => {}} />);
    
    // Complete the chat to show results
    fireEvent.click(screen.getByText('Complete Chat'));

    await waitFor(() => {
        expect(screen.getByText('Хорошо')).toBeInTheDocument();
    });

    // Update rating to 3 by clicking the 3rd star
    // The stars are rendered in a loop 1, 2, 3. 
    // The buttons wrap the stars.
    const stars = screen.getAllByTestId('star-icon');
    const thirdStar = stars[2];
    const button = thirdStar.closest('button');
    
    if (!button) throw new Error('Star button not found');
    
    fireEvent.click(button);

    await waitFor(() => {
        expect(screen.getByText('Отлично')).toBeInTheDocument();
    });
    
    expect(storageService.updateLastRating).toHaveBeenCalledWith(1, 3);
    expect(screen.getByText(/изменено вручную/i)).toBeInTheDocument();
  });
});