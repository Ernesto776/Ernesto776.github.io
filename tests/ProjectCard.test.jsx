/*
 * Unit and component tests for ProjectCard component.
 */
import React from 'react';
import {
    describe,
    it,
    expect,
    vi,
    afterEach
} from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ProjectCard from '../src/components/ProjectCard';

describe('ProjectCard Component', () => {
    const mockProject = {
        id: 'test-project',
        title: 'Innovative App',
        description: 'An advanced test project for unit verification.',
        tags: ['React', 'Vite', 'Vitest'],
        highlights: [
            'Modular micro-architecture',
            'Full end-to-end test suite'
        ],
        demoUrl: 'https://example.com/demo',
        githubUrl: 'https://github.com/example/repo',
        featured: true,
        stats: 'Active'
    };

    let openSpy;

    afterEach(() => {
        if (openSpy) {
            openSpy.mockRestore();
            openSpy = undefined;
        }
    });

    it('renders project title and description', () => {
        render(<ProjectCard project={mockProject} />);
        expect(screen.getByText('Innovative App')).toBeInTheDocument();
        expect(
            screen.getByText('An advanced test project for unit verification.')
        ).toBeInTheDocument();
    });

    it('renders tags and badges correctly', () => {
        render(<ProjectCard project={mockProject} />);
        expect(screen.getByText('React')).toBeInTheDocument();
        expect(screen.getByText('Vitest')).toBeInTheDocument();
        expect(screen.getByText('Featured')).toBeInTheDocument();
        expect(screen.getByText('Active')).toBeInTheDocument();
    });

    it('toggles architecture highlights on button click', () => {
        render(<ProjectCard project={mockProject} />);
        const toggleBtn = screen.getByText('View Architecture & Highlights');
        expect(toggleBtn).toBeInTheDocument();

        // Highlights initially not in the document
        expect(
            screen.queryByText('Modular micro-architecture')
        ).not.toBeInTheDocument();

        // Click to expand
        fireEvent.click(toggleBtn);
        expect(
            screen.getByText('Modular micro-architecture')
        ).toBeInTheDocument();
        expect(screen.getByText('Hide Key Highlights')).toBeInTheDocument();

        // Click to collapse
        fireEvent.click(screen.getByText('Hide Key Highlights'));
        expect(
            screen.queryByText('Modular micro-architecture')
        ).not.toBeInTheDocument();
    });

    it('contains correct external links for demo and code', () => {
        render(<ProjectCard project={mockProject} />);
        const demoLink = screen.getByText('Explore Repo').closest('a');
        const codeLink = screen
            .getByLabelText('Source code for Innovative App');

        expect(demoLink).toHaveAttribute('href', 'https://example.com/demo');
        expect(demoLink).toHaveAttribute('target', '_blank');
        expect(codeLink).toHaveAttribute(
            'href',
            'https://github.com/example/repo'
        );
    });

    it('renders Play Game CTA and opens a new window for game demos', () => {
        const mockPopup = { opener: window, focus: vi.fn() };
        openSpy = vi.spyOn(window, 'open').mockReturnValue(mockPopup);

        const gameProject = {
            ...mockProject,
            id: 'try-harder-test',
            demoUrl: './play-try-harder.html',
            demoLabel: 'Play Game',
            demoType: 'game',
            demoWindowName: 'TryHarderGameWindow'
        };

        render(<ProjectCard project={gameProject} />);
        const playLink = screen.getByText('Play Game').closest('a');

        expect(playLink).toHaveAttribute('href', './play-try-harder.html');
        expect(playLink).toHaveAttribute('target', '_blank');

        fireEvent.click(playLink);
        expect(openSpy).toHaveBeenCalledWith(
            './play-try-harder.html',
            'TryHarderGameWindow',
            expect.stringContaining('resizable=yes')
        );
        expect(mockPopup.focus).toHaveBeenCalledTimes(1);
    });
});
