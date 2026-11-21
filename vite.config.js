/*
 * Vite configuration for Ernesto776 GitHub Pages portfolio.
 * Configured with React plugin, relative base URL, and Vitest environment.
 */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    base: './',
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './tests/setupTests.js'
    }
});
