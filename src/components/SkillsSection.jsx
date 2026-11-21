/*
 * Technical skills matrix component categorized by area.
 */
import React from 'react';
import { SKILL_CATEGORIES } from '../data/projectsData';
import { Cpu } from 'lucide-react';

// Renders glassmorphic cards showing core competencies
export default function SkillsSection() {
    return (
        <section id="skills" className="py-16 px-4 max-w-6xl mx-auto">
            <div className="text-center mb-12">
                <div
                    className="inline-flex items-center gap-2 p-2 rounded-xl
                        bg-indigo-500/10 text-indigo-400 mb-3"
                >
                    <Cpu className="w-5 h-5" />
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold text-white">
                    Skills & Tech Stack
                </h2>
                <p className="mt-2 text-slate-400 max-w-xl mx-auto">
                    Technologies and development tools I use to bring ideas to life.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {SKILL_CATEGORIES.map((category) => (
                    <div
                        key={category.title}
                        className="glass-panel glass-panel-hover rounded-2xl
                            p-6"
                    >
                        <h3 className="text-lg font-semibold text-white mb-4
                            pb-2 border-b border-slate-800">
                            {category.title}
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {category.skills.map((skill) => (
                                <span
                                    key={skill}
                                    className="glass-pill px-3 py-1.5
                                        rounded-lg text-xs font-medium
                                        text-slate-200"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
