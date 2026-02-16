import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import EditRatingControl from '../EditRatingControl';

describe('EditRatingControl', () => {
    const mockOnSave = vi.fn();

    beforeEach(() => {
        mockOnSave.mockClear();
    });

    it('renders children when provided', () => {
        render(
            <EditRatingControl initialRating={2} onSave={mockOnSave}>
                <div data-testid="child-content">Child Content</div>
            </EditRatingControl>
        );
        expect(screen.getByTestId('child-content')).toBeInTheDocument();
        expect(screen.queryByText('2')).not.toBeInTheDocument(); // Should not render default text if children provided
        expect(screen.getByRole('button', { name: /edit rating/i })).toBeInTheDocument();
    });

    it('renders initial rating in view mode (default)', () => {
        render(<EditRatingControl initialRating={2} onSave={mockOnSave} />);
        expect(screen.getByText('2')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /edit rating/i })).toBeInTheDocument();
    });

    it('switches to edit mode on clicking edit button', () => {
        render(<EditRatingControl initialRating={2} onSave={mockOnSave} />);
        fireEvent.click(screen.getByRole('button', { name: /edit rating/i }));
        
        expect(screen.getByRole('spinbutton')).toBeInTheDocument();
        expect(screen.getByRole('spinbutton')).toHaveValue(2);
        expect(screen.getByRole('button', { name: /save/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument();
    });

    it('calls onSave with new value when save is clicked', () => {
        render(<EditRatingControl initialRating={2} onSave={mockOnSave} />);
        fireEvent.click(screen.getByRole('button', { name: /edit rating/i }));
        
        const input = screen.getByRole('spinbutton');
        fireEvent.change(input, { target: { value: '3' } });
        fireEvent.click(screen.getByRole('button', { name: /save/i }));

        expect(mockOnSave).toHaveBeenCalledWith(3);
    });

    it('cancels edit mode and resets value on cancel', () => {
        render(<EditRatingControl initialRating={2} onSave={mockOnSave} />);
        fireEvent.click(screen.getByRole('button', { name: /edit rating/i }));
        
        const input = screen.getByRole('spinbutton');
        fireEvent.change(input, { target: { value: '3' } });
        fireEvent.click(screen.getByRole('button', { name: /cancel/i }));

        expect(screen.queryByRole('spinbutton')).not.toBeInTheDocument();
        expect(screen.getByText('2')).toBeInTheDocument();
        expect(mockOnSave).not.toHaveBeenCalled();
    });

    it('validates input range (1-3)', () => {
        render(<EditRatingControl initialRating={2} onSave={mockOnSave} />);
        fireEvent.click(screen.getByRole('button', { name: /edit rating/i }));
        
        const input = screen.getByRole('spinbutton');
        fireEvent.change(input, { target: { value: '4' } });
        fireEvent.click(screen.getByRole('button', { name: /save/i }));

        expect(screen.getByText(/rating must be between 1 and 3/i)).toBeInTheDocument();
        expect(mockOnSave).not.toHaveBeenCalled();
    });
});

