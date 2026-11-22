/*
 * Reusable glassmorphic project card component.
 * Displays project title, description, architecture highlights, and links.
 */
import React, { useState } from 'react';
import {
    CheckCircle2,
    ChevronDown,
    ChevronUp,
    ExternalLink,
    Gamepad2,
    Sparkles
} from 'lucide-react';
import GithubIcon from './GithubIcon';
import { openInNewWindow } from '../utils/windowLauncher';

// Renders an individual project card with expandable architecture highlights
export default function ProjectCard({ project }) {
    const [showHighlights, setShowHighlights] = useState(false);

    const {
        title,
        description,
        tags,
        demoUrl,
        demoLabel,
        demoType,
        demoWindowName,
        githubUrl,
        featured,
        stats,
        highlights
    } = project;

    const isGameDemo = demoType === 'game';
    const actionLabel = demoLabel || 'Explore Repo';
    const primaryLinkClass = isGameDemo
        ? 'flex-1 py-2 px-3 rounded-lg bg-gradient-to-r from-indigo-600 ' +
            'to-purple-600 hover:from-indigo-500 hover:to-purple-500 ' +
            'shadow-md shadow-indigo-600/25 text-white text-xs ' +
            'font-medium flex items-center justify-center gap-1.5 ' +
            'transition-all'
        : 'flex-1 py-2 px-3 rounded-lg bg-indigo-600/80 ' +
            'hover:bg-indigo-600 text-white text-xs font-medium flex ' +
            'items-center justify-center gap-1.5 transition-colors';

    // Toggles visibility of the architecture highlights bullet list
    const toggleHighlights = () => {
        setShowHighlights((prev) => !prev);
    };

    // Opens playable game demos in a centered dedicated browser window
    const handlePrimaryAction = (event) => {
        if (isGameDemo) {
            openInNewWindow(event, demoUrl, demoWindowName);
        }
    };

    return (
        <article
            className="glass-panel glass-panel-hover rounded-2xl p-6 flex
                flex-col justify-between h-full relative group transition-all"
        >
            <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                    <span
                        className="text-xs font-semibold px-2.5 py-1 rounded-lg
                            bg-indigo-500/10 text-indigo-400 border
                            border-indigo-500/20"
                    >
                        {stats || 'Project'}
                    </span>
                    {featured && (
                        <span
                            className="flex items-center gap-1 text-xs
                                font-medium text-amber-300"
                        >
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>Featured</span>
                        </span>
                    )}
                </div>

                <h3
                    className="text-xl font-bold text-white
                        group-hover:text-indigo-300 transition-colors"
                >
                    {title}
                </h3>

                <p className="mt-3 text-sm text-slate-300 leading-relaxed">
                    {description}
                </p>

                {highlights && highlights.length > 0 && (
                    <div className="mt-4">
                        <button
                            type="button"
                            onClick={toggleHighlights}
                            className="text-xs font-medium text-indigo-400
                                hover:text-indigo-300 flex items-center gap-1.5
                                py-1 transition-colors"
                            aria-expanded={showHighlights}
                        >
                            <span>
                                {showHighlights
                                    ? 'Hide Key Highlights'
                                    : 'View Architecture & Highlights'}
                            </span>
                            {showHighlights ? (
                                <ChevronUp className="w-3.5 h-3.5" />
                            ) : (
                                <ChevronDown className="w-3.5 h-3.5" />
                            )}
                        </button>

                        {showHighlights && (
                            <ul
                                className="mt-3 space-y-2 border-t
                                    border-slate-800/80 pt-3 text-xs
                                    text-slate-300"
                            >
                                {highlights.map((item, idx) => (
                                    <li
                                        key={idx}
                                        className="flex items-start gap-2"
                                    >
                                        <CheckCircle2
                                            className="w-3.5 h-3.5
                                                text-emerald-400 mt-0.5
                                                flex-shrink-0"
                                        />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                )}
            </div>

            <div className="mt-6">
                <div className="flex flex-wrap gap-1.5 mb-6">
                    {tags.map((tag) => (
                        <span
                            key={tag}
                            className="glass-pill text-xs px-2.5 py-1
                                rounded-md text-slate-300"
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                <div
                    className="flex items-center gap-3 pt-3 border-t
                        border-slate-800"
                >
                    {demoUrl && (
                        <a
                            href={demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={handlePrimaryAction}
                            className={primaryLinkClass}
                        >
                            {isGameDemo ? (
                                <>
                                    <Gamepad2 className="w-3.5 h-3.5" />
                                    <span>{actionLabel}</span>
                                </>
                            ) : (
                                <>
                                    <span>{actionLabel}</span>
                                    <ExternalLink className="w-3.5 h-3.5" />
                                </>
                            )}
                        </a>
                    )}
                    {githubUrl && (
                        <a
                            href={githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="py-2 px-3 rounded-lg glass-pill
                                hover:border-slate-400 text-slate-300
                                hover:text-white text-xs font-medium flex
                                items-center gap-1.5 transition-colors"
                            aria-label={`Source code for ${title}`}
                        >
                            <GithubIcon className="w-3.5 h-3.5" />
                            <span>Code</span>
                        </a>
                    )}
                </div>
            </div>
        </article>
    );
}
