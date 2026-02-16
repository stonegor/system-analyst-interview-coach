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

vi.mock('../EditRatingControl', () => ({
  default: ({ initialRating, onSave, children }) => (
    <div data-testid="edit-rating-control">
      {children}
      <div data-testid="mock-rating-display">Rating: {initialRating}</div>
      <button onClick={() => onSave(3)}>Update Rating</button>
    </div>
  ),
}));

// Mock Lucide icons
vi.mock('lucide-react', () => ({
  ArrowLeft: () => <span>ArrowLeft</span>,
  Star: () => <span>Star</span>,
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

  it('renders EditRatingControl when result is available', async () => {
    render(<Session onExit={() => {}} />);
    
    // Complete the chat to show results
    fireEvent.click(screen.getByText('Complete Chat'));

    await waitFor(() => {
        expect(screen.getByTestId('edit-rating-control')).toBeInTheDocument();
        expect(screen.getByText('Rating: 2')).toBeInTheDocument();
    });
  });

  it('updates rating display when EditRatingControl saves', async () => {
    render(<Session onExit={() => {}} />);
    
    // Complete the chat to show results
    fireEvent.click(screen.getByText('Complete Chat'));

    await waitFor(() => {
        expect(screen.getByText('Rating: 2')).toBeInTheDocument();
    });

    // Update rating
    fireEvent.click(screen.getByText('Update Rating'));

    await waitFor(() => {
        // Since we are mocking EditRatingControl, we check if the prop passed to it would update
        expect(screen.getByText('Rating: 3')).toBeInTheDocument();
    });
    
    expect(storageService.updateLastRating).toHaveBeenCalledWith(1, 3);
    expect(screen.getByText(/изменено/i)).toBeInTheDocument();
  });
});
