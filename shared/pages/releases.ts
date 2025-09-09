export type FontScale = 'sm' | 'base' | 'md' | 'lg'
export type Direction = 'ltr' | 'rtl'

export interface Release {
  id: string
  title: string
  tag: string
  description: string
  date: Date
  author?: string
  changelog?: {
    features?: string[]
    performance?: string[]
    fixes?: string[]
    chore?: string[]
    tests?: string[]
    ci?: string[]
    documentation?: string[]
    contributors?: string[]
  }
}

export const allReleases: Release[] = [
  {
    id: '1',
    title: 'Enhanced Theme System',
    tag: 'v1.2.0',
    description: 'Major improvements to the theming system with better customization options and performance enhancements.',
    date: new Date('2025-09-09'),
    author: 'Development Team',
    changelog: {
      features: [
        'New ThemeCustomizer component with real-time preview',
        'Support for custom primary and neutral color combinations',
        'Dynamic radius adjustment with live preview',
        'Font scaling system with multiple presets',
        'RTL direction support'
      ],
      performance: [
        'Improved theme persistence with localStorage',
        'Better SSR support for theme initialization',
        'Smoother theme transitions with CSS animations',
        'Optimized CSS custom property management',
        'Enhanced mobile responsiveness for theme controls'
      ],
      fixes: [
        'Fixed theme flashing on initial page load',
        'Resolved color mode toggle inconsistencies',
        'Fixed radius scaling calculations',
        'Corrected dark mode color contrasts',
        'Fixed theme customizer z-index issues'
      ]
    }
  },
  {
    id: '2',
    title: 'Performance & Bug Fixes',
    tag: 'v1.1.2',
    description: 'Minor performance improvements and bug fixes for better stability.',
    date: new Date('2025-09-01'),
    author: 'Development Team',
    changelog: {
      performance: [
        'Reduced bundle size by 15%',
        'Improved component loading times',
        'Better error handling in composables'
      ],
      fixes: [
        'Fixed navigation menu on mobile devices',
        'Resolved form validation edge cases',
        'Fixed memory leaks in theme watchers'
      ]
    }
  },
  {
    id: '3',
    title: 'Component Library Expansion',
    tag: 'v1.1.0',
    description: 'Added new components and improved existing ones with better accessibility.',
    date: new Date('2025-08-25'),
    author: 'UI Team',
    changelog: {
      features: [
        'New Slider component with customizable ranges',
        'Enhanced Button variants and sizes',
        'Improved Badge component with more styles',
        'Better Icon system with automatic loading'
      ],
      performance: [
        'Enhanced accessibility across all components',
        'Better TypeScript definitions',
        'Improved component documentation'
      ]
    }
  },
  {
    id: '4',
    title: 'Initial Release',
    tag: 'v1.0.0',
    description: 'The first stable release of our Nuxt 4 boilerplate with shadcn/ui integration.',
    date: new Date('2025-08-15'),
    author: 'Core Team',
    changelog: {
      features: [
        'Complete Nuxt 4 setup with latest features',
        'shadcn/ui component integration',
        'Dark/light mode support',
        'Responsive design system',
        'TypeScript support throughout',
        'ESLint and Prettier configuration'
      ]
    }
  }
]
