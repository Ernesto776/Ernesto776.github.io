/*
 * Hero banner component highlighting introduction and core calls-to-action.
 */
import React from 'react';
import { ArrowDown, Code2, ExternalLink } from 'lucide-react';

// Displays greeting, status pill, headline, and primary action buttons
export default function Hero() {
    return (
        <section
            id="top"
            className="relative px-4 pt-16 pb-20 sm:pt-24 sm:pb-28 max-w-5xl
                mx-auto text-center flex flex-col items-center"
        >
            <div
                className="inline-flex items-center gap-2 px-3.5 py-1.5
                    rounded-full glass-pill mb-6 text-xs sm:text-sm
                    text-indigo-300 border-indigo-400/20"
            >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Available for collaborations & new projects</span>
            </div>

            <h1
                className="text-4xl sm:text-6xl lg:text-7xl font-extrabold
                    tracking-tight text-white max-w-4xl leading-tight sm:leading-none"
            >
                Building modern web apps &{' '}
                <span
                    className="bg-gradient-to-r from-indigo-400 via-purple-300
                        to-pink-400 bg-clip-text text-transparent"
                >
                    sleek digital tools
                </span>
            </h1>

            <p
                className="mt-6 text-base sm:text-xl text-slate-300 max-w-2xl
                    font-light leading-relaxed"
            >
                Welcome to my portfolio! I craft responsive applications,
                clean architectures, and interactive digital experiences.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <a
                    href="#projects"
                    className="px-6 py-3 rounded-xl bg-indigo-600
                        hover:bg-indigo-500 text-white font-medium shadow-lg
                        shadow-indigo-600/30 transition-all hover:scale-105
                        flex items-center gap-2"
                >
                    <Code2 className="w-4 h-4" />
                    <span>View Projects</span>
                </a>

                <a
                    href="#contact"
                    className="glass-panel glass-panel-hover px-6 py-3
                        rounded-xl text-slate-200 font-medium flex items-center
                        gap-2"
                >
                    <span>Get in Touch</span>
                    <ExternalLink className="w-4 h-4 text-slate-400" />
                </a>
            </div>

            <a
                href="#projects"
                aria-label="Scroll down to projects"
                className="mt-14 p-2 text-slate-400 hover:text-white
                    animate-bounce transition-colors"
            >
                <ArrowDown className="w-5 h-5" />
            </a>
        </section>
    );
}
