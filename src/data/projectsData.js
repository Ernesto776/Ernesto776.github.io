/*
 * Central data source for portfolio projects.
 * Single source of truth for all project metadata, demo links, and tags.
 */

export const CATEGORIES = [
    { id: 'all', label: 'All Projects' },
    { id: 'systems', label: 'Systems & Architecture' },
    { id: 'tools', label: 'Tools & Automation' },
    { id: 'web', label: 'Web Applications' }
];

export const PROJECTS = [
    {
        id: 'microsoft-grammar-spellcheck',
        title: 'Microsoft Word Grammar and Context Add-On',
        description:
            'An Microsoft Word taskpane copilot built with ' +
            'React, Fluent UI, and Office.js, backed by a FastAPI backend. ' +
            'Features live in-document cursor navigation, one-click text ' +
            'replacements, APA/MLA citation preservation, and vocabulary ' +
            'profiling via Damerau-Levenshtein distance.',
        category: 'systems',
        tags: [
            'React',
            'TypeScript',
            'Office.js',
            'Fluent UI',
            'FastAPI',
            'Python'
        ],
        highlights: [
            'Deep Word.js document integration: reads active document text, ' +
                'intelligently fuzzy-matches sentences, and replaces text in-place.',
            'Multi-engine analysis facade: pairs LanguageTool with custom syntax ' +
                'rules and academic citation filters to protect APA/MLA references.',
            'Dynamic DocumentLexicon profiler: scores candidate suggestions ' +
                'using Damerau-Levenshtein distance and document vocabulary context.',
            'Benchmark-backed reliability: validated with automated essay ' +
                'evaluation suites for true-positive recall and precision.'
        ],
        demoUrl: 'https://github.com/Ernesto776/Microsoft-grammar-spellcheck',
        githubUrl:
            'https://github.com/Ernesto776/Microsoft-grammar-spellcheck',
        featured: true,
        stats: 'Office.js'
    },
    {
        id: 'internship-scraper',
        title: 'Automated Internship Tracker & Analytics',
        description:
            'A full-stack job monitoring system that crawls listings, ' +
            'persists records to PostgreSQL, alerts via automated email ' +
            'summaries on a 15-min cron, and visualizes trends on Streamlit.',
        category: 'tools',
        tags: [
            'Python',
            'Streamlit',
            'PostgreSQL',
            'GitHub Actions',
            'BeautifulSoup',
            'Plotly'
        ],
        highlights: [
            'Serverless GitHub Actions background scraping running every 15 min.',
            'Relational persistence and deduplication on cloud PostgreSQL (Render).',
            'Interactive analytics dashboard built with Streamlit and Plotly.',
            'Automated HTML email summaries triggered on newly detected postings.'
        ],
        demoUrl: 'https://github.com/Ernesto776/Internship-scraper',
        githubUrl: 'https://github.com/Ernesto776/Internship-scraper',
        featured: true,
        stats: '15-Min Cron & Alerts'
    },
    {
        id: 'try-harder-restoration-project',
        title: 'Try Harder Game Restoration & Port',
        description:
            'Source code restoration and modern 64-bit Android port of the ' +
            'classic platformer game Try Harder, targeting modern Android ' +
            'SDK 34 using Haxe, HaxeFlixel, OpenFL, and Lime.',
        category: 'systems',
        tags: ['Haxe', 'HaxeFlixel', 'OpenFL', 'Android SDK', 'C++ / Lime'],
        highlights: [
            'Targeting modern Android SDK 34 with 64-bit arm64 and x64 support.',
            'Native cross-platform compilation via Lime and Haxe C++ toolchains.',
            'Full asset mapping, orientation management, and 60 FPS vsync.'
        ],
        demoUrl:
            'https://github.com/Ernesto776/Try-Harder-restoration-project',
        githubUrl:
            'https://github.com/Ernesto776/Try-Harder-restoration-project',
        featured: true,
        stats: 'Android SDK 34 & 64-bit'
    },
    {
        id: 'portfolio-v1',
        title: 'Glassmorphic Developer Portfolio',
        description:
            'A responsive developer portfolio built with React, Vite, ' +
            'and Tailwind CSS featuring frosted-glass components, ' +
            'automated Vitest suites, and GitHub Actions CI/CD deployment.',
        category: 'web',
        tags: ['React', 'Vite', 'Tailwind CSS', 'GitHub Actions', 'Vitest'],
        highlights: [
            'Glassmorphic UI design tokens with multi-color ambient glows.',
            'Automated CI/CD pipeline building and publishing to GitHub Pages.',
            'Decoupled data architecture with 100% Vitest test coverage.'
        ],
        demoUrl: 'https://ernesto776.github.io',
        githubUrl: 'https://github.com/Ernesto776/Ernesto776.github.io',
        featured: false,
        stats: 'Live on GitHub Pages'
    }
];

export const SKILL_CATEGORIES = [
    {
        title: 'Languages & Core',
        skills: [
            'Python',
            'TypeScript',
            'JavaScript',
            'Haxe',
            'SQL',
            'HTML5 & CSS3'
        ]
    },
    {
        title: 'Frameworks & Libraries',
        skills: [
            'React',
            'FastAPI',
            'Office.js',
            'Fluent UI',
            'Streamlit',
            'HaxeFlixel',
            'OpenFL',
            'Tailwind CSS'
        ]
    },
    {
        title: 'Cloud, Systems & Tools',
        skills: [
            'PostgreSQL',
            'GitHub Actions (CI/CD)',
            'Render',
            'Git',
            'Vite',
            'Docker',
            'Vitest / Pytest'
        ]
    }
];
