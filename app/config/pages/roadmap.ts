import { seoConfig } from '../shared/seo'

export const roadmapConfig = {
  // Reference SEO from central config (no duplicate)
  seo: seoConfig.pages.roadmap,

  // Page layout configuration
  layout: {
    name: 'default',
    showHeader: true,
    showFooter: true,
    containerClass: 'min-h-screen',
    headerTransparent: false
  },

  // Page content structure
  structure: {
    showHeader: true,
    showTimeline: true,
    showStats: true,
    showContribute: true
  },

  // Header section
  header: {
    title: 'Development Roadmap',
    description: 'Track our progress and see what\'s coming next',
    showBadge: true,
    badge: {
      text: 'In Development',
      variant: 'outline'
    }
  },

  // Timeline configuration
  timeline: {
    layout: 'vertical', // 'vertical' | 'horizontal'
    showProgress: true,
    groupByQuarter: true,
    
    // Timeline items will be fetched from API or CMS
    // This is just the display configuration
    itemConfig: {
      showStatus: true,
      showProgress: true,
      showDescription: true,
      showTags: true,
      expandable: true
    }
  },

  // Stats section
  stats: {
    enabled: true,
    items: [
      {
        key: 'completed',
        value: '25',
        label: 'Features Completed',
        icon: 'CheckCircle',
        color: 'green'
      },
      {
        key: 'in-progress',
        value: '8',
        label: 'In Progress',
        icon: 'Clock',
        color: 'blue'
      },
      {
        key: 'planned',
        value: '15',
        label: 'Planned',
        icon: 'Calendar',
        color: 'orange'
      },
      {
        key: 'ideas',
        value: '32',
        label: 'Ideas & Requests',
        icon: 'Lightbulb',
        color: 'purple'
      }
    ]
  },

  // Contribute section
  contribute: {
    enabled: true,
    title: 'Help Shape the Future',
    description: 'Your feedback and contributions help us prioritize features',
    actions: [
      {
        key: 'suggest-feature',
        to: '/roadmap/suggest',
        icon: 'Plus',
        variant: 'default'
      },
      {
        key: 'vote-features',
        to: '/roadmap/vote',
        icon: 'Heart',
        variant: 'outline'
      },
      {
        key: 'contribute',
        url: 'https://github.com/donPuerto/nuxt-shadcn-boilerplate/blob/main/CONTRIBUTING.md',
        icon: 'Github',
        variant: 'ghost',
        external: true
      }
    ]
  }
}
