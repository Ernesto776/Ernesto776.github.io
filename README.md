# Ernesto's Personal Portfolio (Ernesto776.github.io)

A sleek, responsive personal portfolio website hosted on GitHub Pages.
Built with **React**, **Vite**, **Tailwind CSS**, and **Lucide Icons**
featuring a glassmorphic visual aesthetic and automated GitHub Actions
deployments.

---

## Live Website
Once pushed to the `main` branch, the site automatically deploys via GitHub
Actions at:
[https://ernesto776.github.io/](https://ernesto776.github.io/)

---

## Tech Stack
- **Framework**: React 18
- **Bundler & Dev Server**: Vite
- **Styling**: Tailwind CSS with custom glassmorphism utilities
- **Icons**: Lucide React
- **Testing**: Vitest & React Testing Library
- **CI/CD**: GitHub Actions (`.github/workflows/deploy.yml`)

---

## Project Structure
```
Ernesto776.github.io/
├── .github/workflows/
│   └── deploy.yml                # CI/CD deploy + Try Harder HTML5 bundle
├── index.html                    # Main portfolio HTML entrypoint
├── play-try-harder.html          # Dedicated Try Harder Arcade Player page
├── package.json                  # Dependencies and scripts
├── vite.config.js                # Vite multi-page & Vitest configuration
├── vite-plugins/
│   └── localGamesPlugin.js       # Local dev/preview server for game builds
├── tailwind.config.js            # Tailwind config with glass tokens
├── postcss.config.js             # PostCSS plugins
├── src/
│   ├── main.jsx                  # Portfolio React root mount
│   ├── playTryHarderMain.jsx     # Arcade Player React root mount
│   ├── App.jsx                   # Main portfolio layout & ambient orbs
│   ├── index.css                 # Global stylesheet & glass utility classes
│   ├── data/
│   │   └── projectsData.js       # Central project & skill data registry
│   ├── utils/
│   │   └── windowLauncher.js     # Popup launcher with tab fallback
│   └── components/
│       ├── Navbar.jsx            # Glassmorphic top navigation bar
│       ├── Hero.jsx              # Hero presentation banner
│       ├── ProjectCard.jsx       # Reusable glassmorphic project card
│       ├── ProjectShowcase.jsx   # Filterable projects grid
│       ├── TryHarderPlayer.jsx   # Responsive 16:9 HTML5 arcade player
│       ├── SkillsSection.jsx     # Categorized skills matrix
│       └── Footer.jsx            # Contact links and footer
└── tests/
    ├── setupTests.js             # Testing library environment setup
    ├── App.integration.test.jsx  # Portfolio filter & play flow tests
    ├── ProjectCard.test.jsx      # Card & Play Game button tests
    ├── TryHarderPlayer.test.jsx  # Arcade player availability & UI tests
    ├── localGamesPlugin.test.js  # Static middleware path safety tests
    ├── projectsData.test.js      # Data schema integrity tests
    └── windowLauncher.test.js    # Window open & fallback tests
```

---

## Try Harder HTML5 Arcade Player & Auto-Sync

Clicking **Play Game** on the *Try Harder* card opens
`play-try-harder.html` in a dedicated centered window featuring a responsive
16:9 canvas, reload control, fullscreen mode, and control hints.
