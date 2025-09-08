export interface Release {
  id: number
  title: string
  tag: string
  description: string
  date: Date
  author?: string
  changelog?: Record<string, string[]>
}

export const allReleases: Release[] = [
  {
    id: 1,
    title: 'v1.0.0 - Touch Down',
    tag: 'v1.0.0',
    description: 'First public release of the Nuxt + Shadcn UI + Tailwind CSS v4 starter.',
    date: new Date('2024-01-15'),
    author: 'Don Puerto',
    changelog: {
      performance: [
        'Enabled Nuxt route-level code splitting & component-level lazy imports',
        'Configured Tailwind CSS v4 JIT for faster dev rebuilds',
        'Reduced initial CSS payload via layer pruning & safelist auditing',
        'Deferred non-critical icon components with dynamic import',
        'Optimized image and font loading with modern formats'
      ],
      fixes: [
        'Resolved initial hydration mismatch in dark mode toggle',
        'Fixed layout shift on first paint by stabilizing container sizes',
        'Corrected timeline alignment issues in responsive breakpoints'
      ],
      features: [
        'Integrated Nuxt 4 foundation with SSR + dynamic meta handling',
        'Added Shadcn UI component registry & automatic style tokens',
        'Implemented Tailwind CSS v4 setup with custom design tokens',
        'Dark / Light mode system preference detection & persistence',
        'Reusable Timeline component with responsive label positions',
        'Release notes page with structured changelog categories',
        'Semantic theming (background / foreground / border / ring)',
        'Accessibility-focused focus states & skip logic',
        'Global icon system using lucide with tree-shaking',
        'Auto-imported composables & components configuration',
        'Pre-configured alias paths and TypeScript strict mode',
        'Responsive typography + container sizing patterns'
      ],
      chore: [
        'Established folder structure: components/ui, composables, config',
        'Created theme + navigation config injection via app.config',
        'Added ESLint + Prettier + Stylelint baseline rules',
        'Added commit conventions + lint-staged hooks',
        'Cleaned unused scaffold files and demo clutter'
      ],
      tests: [
        'Prepared testing setup placeholders (unit + e2e)',
        'Added accessibility linting pipeline hooks'
      ],
      ci: [
        'Initial GitHub Actions workflow draft (build + typecheck)',
        'Configured dependency caching for faster pipelines'
      ],
      documentation: [
        'Authored README with setup, scripts, and deployment guide',
        'Added component usage notes (buttons, badges, timeline)',
        'Documented theming + adding new Shadcn components',
        'Included Tailwind config notes for v4 transition',
        'Added release workflow & semantic versioning guidelines'
      ],
      contributors: [
        'Don Puerto (@donPuerto) - Lead Developer'
      ]
    }
  },
  {
    id: 2,
    title: 'v0.9.5 - Release Candidate',
    tag: 'v0.9.5',
    description: 'Release candidate with final refinements before 1.0.0.',
    date: new Date('2024-01-10'),
    author: 'Don Puerto',
    changelog: {
      fixes: [
        'Fixed memory leak in navigation component',
        'Resolved SSR hydration mismatch'
      ],
      chore: [
        'Updated build configuration',
        'Cleaned up development dependencies'
      ],
      tests: [
        'Added missing test coverage for edge cases',
        'Fixed flaky integration tests'
      ]
    }
  },
  {
    id: 3,
    title: 'v0.9.0 - Beta Release',
    tag: 'v0.9.0',
    description: 'Beta release with major features and improvements.',
    date: new Date('2024-01-05'),
    author: 'Don Puerto',
    changelog: {
      features: [
        'Added dark mode support',
        'Implemented user authentication',
        'Added dashboard functionality'
      ],
      fixes: [
        'Fixed responsive layout issues',
        'Resolved API timeout problems'
      ]
    }
  },
  {
    id: 4,
    title: 'v0.8.0 - Alpha Release',
    tag: 'v0.8.0',
    description: 'Alpha release with core functionality.',
    date: new Date('2023-12-20'),
    author: 'Don Puerto',
    changelog: {
      features: [
        'Initial project setup',
        'Basic routing implementation',
        'Component library integration'
      ]
    }
  }
]
