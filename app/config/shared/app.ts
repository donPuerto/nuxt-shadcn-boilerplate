import { socialConfig } from './social'

export const appConfig = {
  // Core app information
  app: {
    name: process.env.NUXT_PUBLIC_APP_NAME || '',
    shortName: process.env.NUXT_PUBLIC_APP_SHORT_NAME || '',
    description: process.env.NUXT_PUBLIC_APP_DESCRIPTION || '',
    tagline: process.env.NUXT_PUBLIC_APP_TAGLINE || '',
    version: process.env.NUXT_PUBLIC_APP_VERSION || '',
    status: process.env.NUXT_PUBLIC_APP_STATUS || 'stable', // 'alpha' | 'beta' | 'stable'
    license: process.env.NUXT_PUBLIC_APP_LICENSE || '',
    languages: process.env.NUXT_PUBLIC_APP_LANGUAGES?.split(',') || ['en'],
    defaultLanguage: process.env.NUXT_PUBLIC_APP_DEFAULT_LANGUAGE || 'en'
  },

  // Author/Organization information
  author: {
    name: process.env.NUXT_PUBLIC_AUTHOR_NAME || '',
    email: process.env.NUXT_PUBLIC_AUTHOR_EMAIL || '',
    url: process.env.NUXT_PUBLIC_AUTHOR_URL || '',
    location: process.env.NUXT_PUBLIC_AUTHOR_LOCATION || '',
    bio: process.env.NUXT_PUBLIC_AUTHOR_BIO || '',
    avatar: process.env.NUXT_PUBLIC_AUTHOR_AVATAR || ''
  },

  // Organization (if applicable)
  organization: {
    name: process.env.NUXT_PUBLIC_ORG_NAME || '',
    url: process.env.NUXT_PUBLIC_ORG_URL || '',
    logo: process.env.NUXT_PUBLIC_ORG_LOGO || '',
    type: process.env.NUXT_PUBLIC_ORG_TYPE || 'Personal' // 'Personal' | 'Company' | 'Organization'
  },

  // Repository information
  repository: {
    url: process.env.NUXT_PUBLIC_REPO_URL || 'https://github.com/donPuerto/nuxt-shadcn-boilerplate',
    homepage: process.env.NUXT_PUBLIC_REPO_HOMEPAGE || 'https://nuxt-shadcn-boilerplate.vercel.app',
    issuesUrl: process.env.NUXT_PUBLIC_REPO_ISSUES_URL || 'https://github.com/donPuerto/nuxt-shadcn-boilerplate/issues',
    discussionsUrl: process.env.NUXT_PUBLIC_REPO_DISCUSSIONS_URL || 'https://github.com/donPuerto/nuxt-shadcn-boilerplate/discussions',
    contributingUrl: process.env.NUXT_PUBLIC_REPO_CONTRIBUTING_URL || 'https://github.com/donPuerto/nuxt-shadcn-boilerplate/blob/main/CONTRIBUTING.md',
    changelogUrl: process.env.NUXT_PUBLIC_REPO_CHANGELOG_URL || 'https://github.com/donPuerto/nuxt-shadcn-boilerplate/blob/main/CHANGELOG.md',
    docsUrl: process.env.NUXT_PUBLIC_REPO_DOCS_URL || 'https://nuxt-shadcn-boilerplate.vercel.app/docs'
  },

  // Contact information
  contact: {
    general: process.env.NUXT_PUBLIC_CONTACT_EMAIL || "don.puerto.1003@gmail.com",
    support: process.env.NUXT_PUBLIC_CONTACT_EMAIL || "don.puerto.1003@gmail.com",
    business: process.env.NUXT_PUBLIC_CONTACT_EMAIL || "don.puerto.1003@gmail.com",
    security: process.env.NUXT_PUBLIC_CONTACT_SECURITY_EMAIL || "security@donpuerto.dev", // For security issues
    press: process.env.NUXT_PUBLIC_CONTACT_PRESS_EMAIL || "press@donpuerto.dev" // For media inquiries
  },

  // Legal information
  legal: {
    privacyPolicy: "/privacy",
    termsOfService: "/terms",
    license: "/license",
    security: "/security",
    cookies: "/cookies",
    disclaimer: "/disclaimer",
    copyrightYear: new Date().getFullYear(),
    companyRegistration: null // Add if company is registered
  },

  // Social links (reference from social config)
  social: {
    // Get only enabled profiles
    profiles: Object.entries(socialConfig.profiles)
      .filter(([_, profile]) => profile.enabled)
      .reduce((acc, [key, profile]) => {
        acc[key] = profile
        return acc
      }, {} as Record<string, any>),
    
    // Project-specific social
    project: socialConfig.project
  },

  // Brand assets
  brand: {
    logo: "/images/logo.svg",
    logoLight: "/images/logo-light.svg",
    logoDark: "/images/logo-dark.svg",
    favicon: "/favicon.ico",
    appleTouchIcon: "/apple-touch-icon.png",
    colors: {
      primary: "#000000",
      secondary: "#ffffff",
      accent: "#3b82f6"
    }
  }
}
