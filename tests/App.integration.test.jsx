/*
 * Integration tests verifying portfolio filtering and game launcher flow.
 */
import React from 'react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../src/App';

describe('Portfolio App Integration', () => {
    let openSpy;

    afterEach(() => {
        if (openSpy) {
            openSpy.mockRestore();
            openSpy = undefined;
        }
    });

    it('filters by Systems & Architecture and launches Try Harder', () => {
        const mockPopup = { opener: window, focus: vi.fn() };
        openSpy = vi.spyOn(window, 'open').mockReturnValue(mockPopup);

        render(<App />);

        fireEvent.click(screen.getByText('Systems & Architecture'));

        expect(
            screen.getByText('Try Harder Game Restoration & Port')
        ).toBeInTheDocument();
        expect(
            screen.queryByText('Automated Internship Tracker & Analytics')
        ).not.toBeInTheDocument();

        const playLink = screen.getByText('Play Game').closest('a');
        expect(playLink).toHaveAttribute('href', './play-try-harder.html');

        fireEvent.click(playLink);
        expect(openSpy).toHaveBeenCalledWith(
            './play-try-harder.html',
            'TryHarderGameWindow',
            expect.stringContaining('width=1120,height=740')
        );
    });
});
