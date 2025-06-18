export interface SeoConfig {
  title: string
  description: string
  keywords: string[]
  image?: string
  url?: string
  type?: string
  locale?: string
  siteName?: string
}

export const defaultSeo: SeoConfig = {
  title: 'Nuxt Shadcn Boilerplate',
  description: 'A modern Nuxt 3 boilerplate with Shadcn UI components, TypeScript, and Tailwind CSS',
  keywords: [
    'nuxt',
    'vue',
    'shadcn',
    'tailwind',
    'typescript',
    'boilerplate',
    'starter',
    'template'
  ],
  image: '/images/og-image.png',
  url: 'https://your-domain.com',
  type: 'website',
  locale: 'en_US',
  siteName: 'Nuxt Shadcn Boilerplate'
}

export const pageSeo = {
  home: {
    title: 'Home - Nuxt Shadcn Boilerplate',
    description: 'Welcome to our modern Nuxt 3 boilerplate with Shadcn UI components',
    keywords: ['home', 'landing', 'nuxt', 'boilerplate']
  },
  about: {
    title: 'About Us - Nuxt Shadcn Boilerplate', 
    description: 'Learn more about our mission and the team behind this project',
    keywords: ['about', 'team', 'mission', 'company']
  },
  contact: {
    title: 'Contact Us - Nuxt Shadcn Boilerplate',
    description: 'Get in touch with our team for support or inquiries',
    keywords: ['contact', 'support', 'help', 'inquiry']
  },
  dashboard: {
    title: 'Dashboard - Nuxt Shadcn Boilerplate',
    description: 'Access your personalized dashboard and manage your account',
    keywords: ['dashboard', 'account', 'profile', 'manage']
  }
}

export const seoConfig = {
  default: defaultSeo,
  pages: pageSeo,
  
  // Structured data
  organization: {
    name: 'Your Company Name',
    url: 'https://your-domain.com',
    logo: 'https://your-domain.com/images/logo.png',
    sameAs: [
      'https://twitter.com/your-username',
      'https://github.com/your-username',
      'https://linkedin.com/company/your-company'
    ]
  },

  // Additional meta tags
  meta: {
    robots: 'index,follow',
    googlebot: 'index,follow',
    generator: 'Nuxt 3',
    theme_color: '#000000',
    msapplication_TileColor: '#000000'
  },

  // JSON-LD settings
  jsonLd: {
    enabled: true,
    organization: true,
    website: true,
    breadcrumb: true
  }
}
