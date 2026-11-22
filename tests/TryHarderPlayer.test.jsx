/*
 * Component tests for TryHarderPlayer verifying availability probing,
 * iframe rendering, reload controls, fallback UI, and controls legend.
 */
import React from 'react';
import {
    describe,
    it,
    expect,
    vi,
    beforeEach,
    afterEach
} from 'vitest';
import {
    render,
    screen,
    waitFor,
    fireEvent
} from '@testing-library/react';
import TryHarderPlayer from '../src/components/TryHarderPlayer';

describe('TryHarderPlayer Component', () => {
    let fetchSpy;

    beforeEach(() => {
        fetchSpy = vi.spyOn(globalThis, 'fetch');
    });

    afterEach(() => {
        fetchSpy.mockRestore();
    });

    it('renders loading state before build check resolves', () => {
        fetchSpy.mockReturnValue(new Promise(() => {}));
        render(<TryHarderPlayer />);

        expect(
            screen.getByText('Loading Try Harder HTML5 build...')
        ).toBeInTheDocument();
        expect(screen.getByLabelText('Reload game')).toBeDisabled();
    });

    it('renders the game iframe and controls when build is ready', async () => {
        fetchSpy.mockResolvedValue({
            ok: true,
            headers: new Headers({ 'content-type': 'text/html; charset=utf-8' })
        });

        render(<TryHarderPlayer />);

        const iframe = await waitFor(() =>
            screen.getByTitle('Try Harder HTML5 Game')
        );
        expect(iframe).toHaveAttribute('src', './games/try-harder/index.html');
        expect(
            screen.getByText('Space / W / Up / Click')
        ).toBeInTheDocument();
        expect(screen.getByText('Jump & Double Jump')).toBeInTheDocument();
    });

    it('reloads the game iframe when Reload is clicked', async () => {
        fetchSpy.mockResolvedValue({
            ok: true,
            headers: new Headers({ 'content-type': 'text/html' })
        });

        render(<TryHarderPlayer />);
        const initialIframe = await waitFor(() =>
            screen.getByTitle('Try Harder HTML5 Game')
        );

        const reloadButton = screen.getByLabelText('Reload game');
        expect(reloadButton).toBeEnabled();
        fireEvent.click(reloadButton);

        const reloadedIframe = screen.getByTitle('Try Harder HTML5 Game');
        expect(reloadedIframe).not.toBe(initialIframe);
    });

    it('shows unavailable fallback and retries on Retry click', async () => {
        fetchSpy
            .mockResolvedValueOnce({
                ok: false,
                headers: new Headers()
            })
            .mockResolvedValueOnce({
                ok: true,
                headers: new Headers({ 'content-type': 'text/html' })
            });

        render(<TryHarderPlayer />);

        await waitFor(() => {
            expect(
                screen.getByText('HTML5 Game Build Unavailable')
            ).toBeInTheDocument();
        });

        fireEvent.click(screen.getByText('Retry'));

        await waitFor(() => {
            expect(
                screen.getByTitle('Try Harder HTML5 Game')
            ).toBeInTheDocument();
        });
        expect(fetchSpy).toHaveBeenCalledTimes(2);
    });
});
