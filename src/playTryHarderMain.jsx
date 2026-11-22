/*
 * Entrypoint mounting the dedicated Try Harder HTML5 Arcade Player page.
 */
import React from 'react';
import ReactDOM from 'react-dom/client';
import TryHarderPlayer from './components/TryHarderPlayer';
import './index.css';

const rootElement = document.getElementById('root');

if (rootElement) {
    ReactDOM.createRoot(rootElement).render(
        <React.StrictMode>
            <TryHarderPlayer />
        </React.StrictMode>
    );
}
