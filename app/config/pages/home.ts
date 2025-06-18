export const homeConfig = {
  seo: {
    title: 'Home',
    description: 'Welcome to Nuxt Shadcn Boilerplate',
    keywords: ['home', 'landing', 'boilerplate', 'nuxt', 'vue'],
    robots: 'index, follow',
    ogType: 'website'
  },
  
  layout: {
    name: 'default',
    showHeader: true,
    showFooter: true,
    containerClass: 'min-h-screen',
    headerTransparent: false
  },

  header: {
    variant: 'default',
    sticky: true,
    showLogo: true,
    showNavigation: true,
    showCta: true,
    cta: {
      key: 'get-started',
      to: '/dashboard',
      variant: 'default'
    }
  },

  structure: {
    showHero: true,
    showFeatures: true,
    showStats: true,
    showTestimonials: false,
    showCta: true,
    showFaq: false
  },

  hero: {
    layout: 'centered',
    background: 'gradient',
    showImage: true,
    assets: {
      image: '/images/hero-dashboard.png',
      alt: 'hero-image',
      width: 1200,
      height: 600
    },
    buttons: [
      {
        key: 'get-started',
        to: '/dashboard',
        icon: 'lucide:arrow-right',
        variant: 'default',
        size: 'lg'
      },
      {
        key: 'github',
        url: 'https://github.com/donPuerto/nuxt-shadcn-boilerplate',
        icon: 'lucide:github',
        variant: 'outline',
        size: 'lg',
        external: true
      }
    ]
  },

  features: {
    layout: 'grid',
    columns: 3,
    showIcons: true,
    items: [
      {
        key: 'vue',
        icon: 'lucide:code',
        url: 'https://vuejs.org/',
        color: 'green',
        external: true
      },
      {
        key: 'nuxt',
        icon: 'lucide:layers',
        url: 'https://nuxt.com/',
        color: 'blue',
        external: true
      },
      {
        key: 'shadcn',
        icon: 'lucide:layout',
        url: 'https://ui.shadcn.com/',
        color: 'purple',
        external: true
      },
      {
        key: 'tailwind',
        icon: 'lucide:palette',
        url: 'https://tailwindcss.com/',
        color: 'cyan',
        external: true
      },
      {
        key: 'typescript',
        icon: 'lucide:code-2',
        url: 'https://www.typescriptlang.org/',
        color: 'blue',
        external: true
      },
      {
        key: 'i18n',
        icon: 'lucide:globe',
        url: 'https://i18n.nuxtjs.org/',
        color: 'orange',
        external: true
      }
    ]
  },

  stats: {
    enabled: true,
    layout: 'horizontal',
    items: [
      {
        key: 'downloads',
        value: '10K+',
        icon: 'lucide:download',
        color: 'blue'
      },
      {
        key: 'stars',
        value: '500+',
        icon: 'lucide:star',
        color: 'yellow'
      },
      {
        key: 'contributors',
        value: '25+',
        icon: 'lucide:users',
        color: 'green'
      },
      {
        key: 'forks',
        value: '100+',
        icon: 'lucide:git-fork',
        color: 'purple'
      }
    ]
  },

  cta: {
    layout: 'centered',
    background: 'gradient',
    buttons: [
      {
        key: 'start-project',
        to: '/dashboard',
        icon: 'lucide:rocket',
        variant: 'default',
        size: 'lg'
      },
      {
        key: 'view-docs',
        to: '/docs',
        icon: 'lucide:book',
        variant: 'outline',
        size: 'lg'
      }
    ]
  },

  footer: {
    variant: 'full',
    showNewsletter: false,
    showSocial: true
  }
}
