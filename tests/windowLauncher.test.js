/*
 * Unit tests for windowLauncher utility verifying popup geometry,
 * security clearing, modifier bypass, and popup-blocker fallback.
 */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
    buildWindowFeatures,
    openInNewWindow
} from '../src/utils/windowLauncher';

describe('windowLauncher Utility', () => {
    let openSpy;

    beforeEach(() => {
        Object.defineProperty(window, 'screenX', {
            value: 100,
            configurable: true
        });
        Object.defineProperty(window, 'screenY', {
            value: 50,
            configurable: true
        });
        Object.defineProperty(window, 'outerWidth', {
            value: 1600,
            configurable: true
        });
        Object.defineProperty(window, 'outerHeight', {
            value: 1000,
            configurable: true
        });
    });

    afterEach(() => {
        if (openSpy) {
            openSpy.mockRestore();
        }
    });

    it('builds centered popup feature strings without noopener', () => {
        const features = buildWindowFeatures(1120, 740);
        expect(features).toContain('width=1120');
        expect(features).toContain('height=740');
        expect(features).toContain('left=340');
        expect(features).toContain('top=180');
        expect(features).toContain('resizable=yes');
        expect(features).not.toContain('noopener');
    });

    it('opens a popup, clears opener, prevents default, and focuses', () => {
        const mockPopup = {
            opener: window,
            focus: vi.fn()
        };
        openSpy = vi.spyOn(window, 'open').mockReturnValue(mockPopup);
        const event = { preventDefault: vi.fn(), button: 0 };

        const result = openInNewWindow(
            event,
            './play-try-harder.html',
            'TryHarderGameWindow'
        );

        expect(result).toBe(true);
        expect(openSpy).toHaveBeenCalledWith(
            './play-try-harder.html',
            'TryHarderGameWindow',
            expect.stringContaining('width=1120,height=740')
        );
        expect(mockPopup.opener).toBeNull();
        expect(event.preventDefault).toHaveBeenCalledTimes(1);
        expect(mockPopup.focus).toHaveBeenCalledTimes(1);
    });

    it('falls back cleanly when popup is blocked', () => {
        openSpy = vi.spyOn(window, 'open').mockReturnValue(null);
        const event = { preventDefault: vi.fn(), button: 0 };

        const result = openInNewWindow(
            event,
            './play-try-harder.html',
            'TryHarderGameWindow'
        );

        expect(result).toBe(false);
        expect(openSpy).toHaveBeenCalledTimes(1);
        expect(event.preventDefault).not.toHaveBeenCalled();
    });

    it('skips window.open on modifier or middle-mouse clicks', () => {
        openSpy = vi.spyOn(window, 'open');

        const ctrlEvent = { preventDefault: vi.fn(), ctrlKey: true };
        const metaEvent = { preventDefault: vi.fn(), metaKey: true };
        const shiftEvent = { preventDefault: vi.fn(), shiftKey: true };
        const middleEvent = { preventDefault: vi.fn(), button: 1 };

        expect(openInNewWindow(ctrlEvent, './play.html')).toBe(false);
        expect(openInNewWindow(metaEvent, './play.html')).toBe(false);
        expect(openInNewWindow(shiftEvent, './play.html')).toBe(false);
        expect(openInNewWindow(middleEvent, './play.html')).toBe(false);
        expect(openSpy).not.toHaveBeenCalled();
    });
});
