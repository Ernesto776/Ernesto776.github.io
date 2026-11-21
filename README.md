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
│   └── deploy.yml          # Automated CI/CD deployment to GitHub Pages
├── index.html              # HTML entrypoint with metadata and fonts
├── package.json            # Dependencies and scripts
├── vite.config.js          # Vite and Vitest configuration
├── tailwind.config.js      # Tailwind configuration with glass colors
├── postcss.config.js       # PostCSS plugins
├── src/
│   ├── main.jsx            # React root DOM mount
│   ├── App.jsx             # Main application layout and ambient orbs
│   ├── index.css           # Global stylesheet and glassmorphic classes
│   ├── data/
│   │   └── projectsData.js # Central project & skill data registry
│   └── components/
│       ├── Navbar.jsx          # Glassmorphic top navigation bar
│       ├── Hero.jsx            # Hero presentation banner
│       ├── ProjectCard.jsx     # Reusable glassmorphic project card
│       ├── ProjectShowcase.jsx # Filterable projects grid
│       ├── SkillsSection.jsx   # Categorized skills matrix
│       └── Footer.jsx          # Contact links and footer
└── tests/
    ├── setupTests.js       # Testing library environment setup
    ├── ProjectCard.test.jsx# Component tests
    └── projectsData.test.js# Data schema integrity tests
```

---

## Local Development

### 1. Install dependencies
```bash
npm install
```

### 2. Start the local development server
```bash
npm run dev
```

### 3. Run automated tests
```bash
npm test
```

### 4. Build for production
```bash
npm run build
```
