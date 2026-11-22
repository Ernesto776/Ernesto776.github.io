/*
 * Window launcher utility for opening dedicated application popup windows
 * with graceful fallback to standard browser tab navigation.
 */

export const GAME_WINDOW_DEFAULTS = {
    width: 1120,
    height: 740,
    windowName: 'TryHarderGameWindow'
};

// Computes centered popup window feature string for the current display
export function buildWindowFeatures(
        width = GAME_WINDOW_DEFAULTS.width,
        height = GAME_WINDOW_DEFAULTS.height
) {
    const screenX =
        typeof window !== 'undefined' && typeof window.screenX === 'number'
            ? window.screenX
            : 0;
    const screenY =
        typeof window !== 'undefined' && typeof window.screenY === 'number'
            ? window.screenY
            : 0;
    const outerWidth =
        typeof window !== 'undefined' && window.outerWidth > 0
            ? window.outerWidth
            : width;
    const outerHeight =
        typeof window !== 'undefined' && window.outerHeight > 0
            ? window.outerHeight
            : height;

    const left = Math.max(0, Math.round(screenX + (outerWidth - width) / 2));
    const top = Math.max(0, Math.round(screenY + (outerHeight - height) / 2));

    return (
        `width=${width},height=${height},left=${left},top=${top},` +
        'resizable=yes,scrollbars=no'
    );
}

// Checks whether a click uses modifier keys or a non-primary mouse button
function isModifiedClick(event) {
    if (!event) {
        return false;
    }

    const hasModifier =
        Boolean(event.metaKey) ||
        Boolean(event.ctrlKey) ||
        Boolean(event.shiftKey) ||
        Boolean(event.altKey);
    const isNonPrimary =
        typeof event.button === 'number' && event.button !== 0;

    return hasModifier || isNonPrimary;
}

// Opens a target URL in a centered popup window, falling back to anchor nav
export function openInNewWindow(
        event,
        url,
        windowName = GAME_WINDOW_DEFAULTS.windowName,
        options = {}
) {
    if (!url || isModifiedClick(event)) {
        return false;
    }

    const width = options.width || GAME_WINDOW_DEFAULTS.width;
    const height = options.height || GAME_WINDOW_DEFAULTS.height;
    const features = buildWindowFeatures(width, height);
    const popup = window.open(url, windowName, features);

    if (!popup) {
        return false;
    }

    try {
        popup.opener = null;
    } catch {
        // Ignore cross-origin opener assignment errors
    }

    if (event && typeof event.preventDefault === 'function') {
        event.preventDefault();
    }

    if (typeof popup.focus === 'function') {
        popup.focus();
    }

    return true;
}
