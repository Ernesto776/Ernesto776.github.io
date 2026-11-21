/*
 * Main application component orchestrating the layout and ambient glows.
 */
import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProjectShowcase from './components/ProjectShowcase';
import SkillsSection from './components/SkillsSection';
import Footer from './components/Footer';

// Top-level application layout with ambient background glow effects
export default function App() {
    return (
        <div className="relative min-h-screen text-slate-100 flex flex-col">
            {/* Ambient background glowing orbs */}
            <div
                className="glow-orb w-96 h-96 bg-indigo-600/20 top-10 left-10"
                aria-hidden="true"
            />
            <div
                className="glow-orb w-[500px] h-[500px] bg-purple-600/15
                    top-96 right-10"
                aria-hidden="true"
            />
            <div
                className="glow-orb w-80 h-80 bg-cyan-600/15 bottom-40 left-1/3"
                aria-hidden="true"
            />

            {/* Application layers */}
            <div className="relative z-10 flex flex-col flex-grow">
                <Navbar />
                <main className="flex-grow">
                    <Hero />
                    <ProjectShowcase />
                    <SkillsSection />
                </main>
                <Footer />
            </div>
        </div>
    );
}
