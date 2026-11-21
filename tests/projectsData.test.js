/*
 * Unit tests validating schema and integrity of projectsData.
 */
import { describe, it, expect } from 'vitest';
import {
    PROJECTS,
    CATEGORIES,
    SKILL_CATEGORIES
} from '../src/data/projectsData';

describe('projectsData Integrity', () => {
    it('has non-empty project list and categories', () => {
        expect(PROJECTS.length).toBeGreaterThan(0);
        expect(CATEGORIES.length).toBeGreaterThan(0);
        expect(SKILL_CATEGORIES.length).toBeGreaterThan(0);
    });

    it('ensures each project has required fields with valid types', () => {
        PROJECTS.forEach((project) => {
            expect(project.id).toBeTruthy();
            expect(typeof project.title).toBe('string');
            expect(typeof project.description).toBe('string');
            expect(Array.isArray(project.tags)).toBe(true);
            expect(project.tags.length).toBeGreaterThan(0);
            expect(typeof project.category).toBe('string');
            expect(typeof project.githubUrl).toBe('string');
        });
    });

    it('ensures all project categories exist in CATEGORIES list', () => {
        const validCategoryIds = CATEGORIES.map((c) => c.id);
        PROJECTS.forEach((project) => {
            expect(validCategoryIds).toContain(project.category);
        });
    });

    it('ensures each skill category has title and non-empty skills array', () => {
        SKILL_CATEGORIES.forEach((cat) => {
            expect(cat.title).toBeTruthy();
            expect(Array.isArray(cat.skills)).toBe(true);
            expect(cat.skills.length).toBeGreaterThan(0);
        });
    });
});
