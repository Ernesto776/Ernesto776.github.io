/*
 * Vite configuration for Ernesto776 GitHub Pages portfolio.
 * Configured with React plugin, multi-page HTML inputs, and Vitest.
 */
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import localGamesPlugin from './vite-plugins/localGamesPlugin.js';

const rootDir = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
    plugins: [react(), localGamesPlugin()],
    base: './',
    build: {
        rollupOptions: {
            input: {
                main: path.resolve(rootDir, 'index.html'),
                playTryHarder: path.resolve(
                        rootDir,
                        'play-try-harder.html'
                )
            }
        }
    },
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './tests/setupTests.js'
    }
});
