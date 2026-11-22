/*
 * Dedicated arcade player wrapper for Try Harder HTML5 build.
 * Probes build availability, renders responsive 16:9 stage, and handles
 * fullscreen, reload, and keyboard focus management.
 */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
    AlertCircle,
    ArrowLeft,
    Gamepad2,
    Keyboard,
    Maximize2,
    Minimize2,
    RotateCcw
} from 'lucide-react';
import { TRY_HARDER_CONFIG } from '../data/projectsData';

// Probes whether the compiled HTML5 game entrypoint is served cleanly
async function probeBuildStatus(embedUrl) {
    try {
        const response = await fetch(embedUrl, {
            method: 'HEAD',
            cache: 'no-store'
        });

        if (!response.ok) {
            return 'unavailable';
        }

        const rawType = response.headers
            ? response.headers.get('content-type') || ''
            : '';
        const contentType = rawType.toLowerCase();
        const isHtml = contentType === '' || contentType.includes('text/html');

        return isHtml ? 'ready' : 'unavailable';
    } catch {
        return 'unavailable';
    }
}

// Renders header navigation, centered 16:9 game iframe, and control hints
export default function TryHarderPlayer() {
    const [status, setStatus] = useState('checking');
    const [reloadKey, setReloadKey] = useState(0);
    const [isFullscreen, setIsFullscreen] = useState(false);

    const stageRef = useRef(null);
    const iframeRef = useRef(null);
    const mountedRef = useRef(true);

    // Checks availability of the compiled game bundle and updates view state
    const checkAvailability = useCallback(async () => {
        setStatus('checking');
        const nextStatus = await probeBuildStatus(TRY_HARDER_CONFIG.embedUrl);
        if (mountedRef.current) {
            setStatus(nextStatus);
        }
    }, []);

    useEffect(() => {
        mountedRef.current = true;
        checkAvailability();

        return () => {
            mountedRef.current = false;
        };
    }, [checkAvailability]);

    useEffect(() => {
        // Syncs local fullscreen state when browser fullscreen changes
        const handleFullscreenChange = () => {
            setIsFullscreen(Boolean(document.fullscreenElement));
        };

        document.addEventListener('fullscreenchange', handleFullscreenChange);
        return () => {
            document.removeEventListener(
                'fullscreenchange',
                handleFullscreenChange
            );
        };
    }, []);

    useEffect(() => {
        if (status !== 'ready') {
            return undefined;
        }

        // Prevents page scroll when pressing game control keys
        const handleKeyDown = (event) => {
            const isGameKey =
                event.code === 'Space' ||
                event.key === ' ' ||
                event.key === 'ArrowUp' ||
                event.key === 'ArrowDown';

            if (isGameKey) {
                event.preventDefault();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [status]);

    // Moves keyboard focus into the embedded game iframe
    const focusGame = () => {
        if (iframeRef.current) {
            iframeRef.current.focus();
            try {
                iframeRef.current.contentWindow?.focus();
            } catch {
                // Ignore cross-frame focus restrictions
            }
        }
    };

    // Reloads the embedded game iframe cleanly
    const handleReload = () => {
        setReloadKey((prev) => prev + 1);
    };

    // Toggles native browser fullscreen on the 16:9 game stage
    const handleToggleFullscreen = async () => {
        try {
            if (document.fullscreenElement) {
                await document.exitFullscreen();
            } else if (stageRef.current?.requestFullscreen) {
                await stageRef.current.requestFullscreen();
            }
        } catch {
            // Ignore fullscreen API rejection when blocked by browser
        }
    };

    const isReady = status === 'ready';

    return (
        <div
            className="h-screen w-screen flex flex-col overflow-hidden
                relative text-slate-100"
        >
            {/* Ambient background glowing orbs */}
            <div
                className="glow-orb w-80 h-80 bg-indigo-600/20 top-4 left-8"
                aria-hidden="true"
            />
            <div
                className="glow-orb w-96 h-96 bg-purple-600/15
                    bottom-8 right-8"
                aria-hidden="true"
            />

            {/* Header toolbar */}
            <header className="relative z-10 px-4 pt-3 pb-2">
                <div
                    className="max-w-7xl mx-auto glass-panel rounded-2xl
                        px-4 py-2.5 flex flex-wrap items-center
                        justify-between gap-3"
                >
                    <div className="flex items-center gap-3">
                        <div
                            className="p-1.5 rounded-lg bg-indigo-600/30
                                border border-indigo-400/30 text-indigo-300"
                        >
                            <Gamepad2 className="w-4 h-4" />
                        </div>
                        <h1 className="text-base sm:text-lg font-bold">
                            {TRY_HARDER_CONFIG.title}
                        </h1>
                        <span
                            className="glass-pill text-xs px-2.5 py-0.5
                                rounded-full text-indigo-300"
                        >
                            HTML5 &bull; {TRY_HARDER_CONFIG.branch} branch
                        </span>
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            onClick={handleReload}
                            disabled={!isReady}
                            className="glass-pill px-3 py-1.5 rounded-xl
                                text-xs font-medium text-slate-200
                                hover:text-white hover:border-indigo-400/50
                                disabled:opacity-40 disabled:cursor-not-allowed
                                flex items-center gap-1.5 transition-all"
                            aria-label="Reload game"
                        >
                            <RotateCcw className="w-3.5 h-3.5" />
                            <span>Reload</span>
                        </button>

                        <button
                            type="button"
                            onClick={handleToggleFullscreen}
                            disabled={!isReady}
                            className="glass-pill px-3 py-1.5 rounded-xl
                                text-xs font-medium text-slate-200
                                hover:text-white hover:border-indigo-400/50
                                disabled:opacity-40 disabled:cursor-not-allowed
                                flex items-center gap-1.5 transition-all"
                            aria-label={
                                isFullscreen
                                    ? 'Exit fullscreen'
                                    : 'Enter fullscreen'
                            }
                        >
                            {isFullscreen ? (
                                <Minimize2 className="w-3.5 h-3.5" />
                            ) : (
                                <Maximize2 className="w-3.5 h-3.5" />
                            )}
                            <span>
                                {isFullscreen ? 'Exit Full' : 'Fullscreen'}
                            </span>
                        </button>

                        <a
                            href="./index.html"
                            className="glass-pill px-3 py-1.5 rounded-xl
                                text-xs font-medium text-slate-200
                                hover:text-white hover:border-indigo-400/50
                                flex items-center gap-1.5 transition-all"
                        >
                            <ArrowLeft className="w-3.5 h-3.5" />
                            <span>Portfolio</span>
                        </a>
                    </div>
                </div>
            </header>

            {/* Centered 16:9 responsive game stage */}
            <main
                className="relative z-10 flex-1 flex items-center
                    justify-center px-4 py-1 min-h-0"
            >
                <div
                    ref={stageRef}
                    className="w-full
                        max-w-[min(1280px,calc((100vh-148px)*16/9))]
                        aspect-video glass-panel rounded-2xl overflow-hidden
                        relative bg-black flex items-center justify-center"
                >
                    {status === 'checking' && (
                        <div className="text-center p-6">
                            <div
                                className="w-8 h-8 border-2 border-indigo-400
                                    border-t-transparent rounded-full
                                    animate-spin mx-auto mb-3"
                            />
                            <p className="text-sm text-slate-300">
                                Loading Try Harder HTML5 build...
                            </p>
                        </div>
                    )}

                    {status === 'ready' && (
                        <iframe
                            ref={iframeRef}
                            key={reloadKey}
                            src={TRY_HARDER_CONFIG.embedUrl}
                            title="Try Harder HTML5 Game"
                            className="w-full h-full border-0 block bg-black"
                            allow="autoplay; fullscreen"
                            allowFullScreen
                            onLoad={focusGame}
                        />
                    )}

                    {status === 'unavailable' && (
                        <div className="max-w-md text-center p-6 space-y-4">
                            <div
                                className="w-12 h-12 rounded-2xl bg-amber-500/15
                                    border border-amber-400/30 text-amber-300
                                    flex items-center justify-center mx-auto"
                            >
                                <AlertCircle className="w-6 h-6" />
                            </div>
                            <h2 className="text-lg font-bold text-white">
                                HTML5 Game Build Unavailable
                            </h2>
                            <p className="text-xs sm:text-sm text-slate-300">
                                The compiled HTML5 bundle could not be loaded.
                                For local development, run the Lime HTML5 build
                                in Try-Harder-restoration-project. For live
                                GitHub Pages, configure TRY_HARDER_REPO_TOKEN
                                in repository secrets.
                            </p>
                            <div
                                className="flex flex-wrap items-center
                                    justify-center gap-3 pt-1"
                            >
                                <button
                                    type="button"
                                    onClick={checkAvailability}
                                    className="px-4 py-2 rounded-xl
                                        bg-indigo-600 hover:bg-indigo-500
                                        text-white text-xs font-medium
                                        transition-colors"
                                >
                                    Retry
                                </button>
                                <a
                                    href="./index.html"
                                    className="glass-pill px-4 py-2 rounded-xl
                                        text-xs font-medium text-slate-200
                                        hover:text-white transition-colors"
                                >
                                    Back to Portfolio
                                </a>
                            </div>
                        </div>
                    )}
                </div>
            </main>

            {/* Footer controls legend */}
            <footer className="relative z-10 px-4 pt-2 pb-3">
                <div
                    className="max-w-7xl mx-auto glass-panel rounded-2xl
                        px-4 py-2 flex flex-wrap items-center
                        justify-between gap-2 text-xs text-slate-300"
                >
                    <div className="flex flex-wrap items-center gap-3">
                        <span
                            className="flex items-center gap-1.5 font-medium
                                text-indigo-300"
                        >
                            <Keyboard className="w-3.5 h-3.5" />
                            <span>Controls:</span>
                        </span>
                        {TRY_HARDER_CONFIG.controls.map((item) => (
                            <span
                                key={item.keys}
                                className="flex items-center gap-1.5"
                            >
                                <kbd
                                    className="glass-pill px-2 py-0.5 rounded
                                        text-slate-100 font-mono text-[11px]"
                                >
                                    {item.keys}
                                </kbd>
                                <span className="text-slate-400">
                                    {item.action}
                                </span>
                            </span>
                        ))}
                    </div>

                    <p className="text-[11px] text-slate-400">
                        Click the game once to enable sound; Chrome/Edge/Firefox
                        recommended for OGG audio.
                    </p>
                </div>
            </footer>
        </div>
    );
}
