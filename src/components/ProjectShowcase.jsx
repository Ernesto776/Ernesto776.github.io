/*
 * Project showcase section with interactive category filter tabs.
 */
import React, { useState } from 'react';
import ProjectCard from './ProjectCard';
import { CATEGORIES, PROJECTS } from '../data/projectsData';

// Renders the main portfolio projects grid and category filtering controls
export default function ProjectShowcase() {
    const [selectedCategory, setSelectedCategory] = useState('all');

    const filteredProjects =
        selectedCategory === 'all'
            ? PROJECTS
            : PROJECTS.filter((proj) => proj.category === selectedCategory);

    return (
        <section id="projects" className="py-16 px-4 max-w-6xl mx-auto">
            <div className="text-center mb-10">
                <h2 className="text-3xl sm:text-4xl font-bold text-white">
                    Featured Projects
                </h2>
                <p className="mt-2 text-slate-400 max-w-xl mx-auto">
                    Explore my recent builds, live applications, and open-source
                    code repositories.
                </p>

                {/* Category Filter Pills */}
                <div
                    className="mt-8 flex flex-wrap items-center justify-center
                        gap-2"
                >
                    {CATEGORIES.map((cat) => {
                        const isActive = selectedCategory === cat.id;
                        return (
                            <button
                                key={cat.id}
                                onClick={() => setSelectedCategory(cat.id)}
                                className={`px-4 py-2 rounded-xl text-xs sm:text-sm
                                    font-medium transition-all ${
                                        isActive
                                            ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                                            : 'glass-panel text-slate-300 hover:text-white'
                                    }`}
                            >
                                {cat.label}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Projects Grid */}
            <div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3
                    gap-6"
            >
                {filteredProjects.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                ))}
            </div>

            {filteredProjects.length === 0 && (
                <div className="text-center py-12 text-slate-400 glass-panel
                    rounded-2xl">
                    No projects found for this category yet.
                </div>
            )}
        </section>
    );
}
