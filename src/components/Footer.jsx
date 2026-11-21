/*
 * Footer component with contact links
 */
import React from 'react';
import { ArrowUp, Mail } from 'lucide-react';
import GithubIcon from './GithubIcon';

// Renders the footer with contact info
export default function Footer() {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer
            id="contact"
            className="mt-20 border-t border-slate-800/80 px-4 py-12"
        >
            <div
                className="max-w-6xl mx-auto flex flex-col md:flex-row
                    items-center justify-between gap-6 text-center md:text-left"
            >
                <div>
                    <h3 className="text-xl font-bold text-white">
                        Feel free to explore my GitHub page!
                    </h3>
                    <p className="mt-1 text-sm text-slate-400"> 
                        {/* Maybe I can add something onto here later */}
                    </p>
                </div>

                <div className="flex items-center gap-4">
                    <a
                        href="https://github.com/Ernesto776"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="glass-panel glass-panel-hover p-2.5 rounded-xl
                            text-slate-300 hover:text-white"
                        aria-label="Ernesto776's GitHub Profile"
                    >
                        <GithubIcon className="w-5 h-5" />
                    </a>
                    <a
                        href="mailto:galianaernesto@gmail.com"
                        className="glass-panel glass-panel-hover p-2.5 rounded-xl
                            text-slate-300 hover:text-white"
                        aria-label="Email Contact"
                    >
                        <Mail className="w-5 h-5" />
                    </a>
                    <button
                        onClick={scrollToTop}
                        className="glass-panel glass-panel-hover p-2.5 rounded-xl
                            text-slate-300 hover:text-white"
                        aria-label="Back to top"
                    >
                        <ArrowUp className="w-5 h-5" />
                    </button>
                </div>
            </div>

            <div
                className="max-w-6xl mx-auto mt-8 pt-6 border-t
                    border-slate-900 text-center text-xs text-slate-500"
            >
                <p>
                    &copy; {new Date().getFullYear()} Ernesto. Hosted on GitHub
                    Pages.
                </p>
            </div>
        </footer>
    );
}
