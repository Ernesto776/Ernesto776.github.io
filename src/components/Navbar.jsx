/*
 * Navigation bar component with glassmorphism styling and smooth links.
 */
import React, { useState } from 'react';
import { Menu, X, Sparkles } from 'lucide-react';
import GithubIcon from './GithubIcon';

// Renders the sticky top glassmorphic navigation bar
export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen((prev) => !prev);
    };

    const navLinks = [
        { name: 'Projects', href: '#projects' },
        { name: 'Skills', href: '#skills' },
        { name: 'About', href: '#about' },
        { name: 'Contact', href: '#contact' }
    ];

    return (
        <header className="sticky top-0 z-50 px-4 py-3 sm:px-8">
            <div
                className="max-w-6xl mx-auto glass-panel rounded-2xl px-5 py-3
                    flex items-center justify-between"
            >
                <a
                    href="#top"
                    className="flex items-center gap-2 text-lg font-bold
                        tracking-tight text-white hover:text-indigo-400
                        transition-colors"
                >
                    <div
                        className="p-1.5 rounded-lg bg-indigo-600/30
                            border border-indigo-400/30 text-indigo-400"
                    >
                        <Sparkles className="w-4 h-4" />
                    </div>
                    <span>Ernesto</span>
                </a>

                <nav className="hidden md:flex items-center gap-6">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className="text-sm font-medium text-slate-300
                                hover:text-white transition-colors"
                        >
                            {link.name}
                        </a>
                    ))}
                    <a
                        href="https://github.com/Ernesto776"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="glass-pill px-3 py-1.5 rounded-xl
                            flex items-center gap-2 text-sm text-slate-200
                            hover:text-white hover:border-indigo-400/50
                            transition-all"
                        aria-label="GitHub Profile"
                    >
                        <GithubIcon className="w-4 h-4" />
                        <span>GitHub</span>
                    </a>
                </nav>

                <button
                    onClick={toggleMenu}
                    className="md:hidden p-2 text-slate-300 hover:text-white"
                    aria-label="Toggle navigation menu"
                >
                    {isOpen ? (
                        <X className="w-6 h-6" />
                    ) : (
                        <Menu className="w-6 h-6" />
                    )}
                </button>
            </div>

            {isOpen && (
                <div
                    className="md:hidden max-w-6xl mx-auto mt-2 glass-panel
                        rounded-2xl p-4 flex flex-col gap-3"
                >
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            onClick={() => setIsOpen(false)}
                            className="text-slate-300 hover:text-white
                                font-medium py-1 transition-colors"
                        >
                            {link.name}
                        </a>
                    ))}
                    <a
                        href="https://github.com/Ernesto776"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="glass-pill px-3 py-2 rounded-xl
                            flex items-center justify-center gap-2 text-sm
                            text-slate-200"
                    >
                        <GithubIcon className="w-4 h-4" />
                        <span>GitHub Profile</span>
                    </a>
                </div>
            )}
        </header>
    );
}
