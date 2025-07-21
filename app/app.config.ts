import { config } from './config'

export default defineAppConfig({

  // App basic info
  name: config?.shared?.app?.app?.name || 'Nuxt Shadcn Boilerplate',
  description: config?.shared?.app?.app?.description || 'A modern Nuxt 3 boilerplate with Shadcn UI components',
  version: config.shared.app.app.version,
  author: config.shared.app.author,
  url: config.shared.app.repository.homepage,
  
  // Theme configuration
  theme: config.shared.app.theme,

  // Core app information - FIX: Use config instead of sharedConfig
  app: config.shared.app.app,

  // Features
  features: config.shared.app.features,

  // Navigation configuration
  navigation: {
    main: config.shared.navigation.mainNav,
    user: config.shared.navigation.userNav,
    admin: config.shared.navigation.adminNav,
    mobile: config.shared.navigation.mobileNav,
    breadcrumb: config.shared.navigation.breadcrumb,
    behavior: config.shared.navigation.behavior
  },
  
   // Social links configuration
  social: {
    links: config.shared.social.links,
    developer: config.shared.social.developer,
    display: config.shared.social.display,
    shareButtons: config.shared.social.shareButtons
  },

  // Footer configuration
  footer: {
    companyName: config.shared.footer.companyName,
    description: config.shared.footer.description,
    copyright: config.shared.footer.copyright,
    navigation: config.shared.footer.navigation,
    actions: config.shared.footer.actions,
    contact: config.shared.footer.contact,
    display: config.shared.footer.display,
    newsletter: config.shared.footer.newsletter,
    backToTop: config.shared.footer.backToTop
  },

   // SEO configuration
  seo: {
    default: config.shared.seo.default,
    pages: config.shared.seo.pages,
    organization: config.shared.seo.organization,
    meta: config.shared.seo.meta,
    jsonLd: config.shared.seo.jsonLd
  },

  // PWA configuration
  pwa: {
    name: config.shared.pwa.name,
    shortName: config.shared.pwa.shortName,
    description: config.shared.pwa.description,
    themeColor: config.shared.pwa.themeColor,
    backgroundColor: config.shared.pwa.backgroundColor,
    display: config.shared.pwa.display,
    orientation: config.shared.pwa.orientation,
    icons: config.shared.pwa.icons,
    startUrl: config.shared.pwa.startUrl,
    scope: config.shared.pwa.scope,
    categories: config.shared.pwa.categories,
    screenshots: config.shared.pwa.screenshots,
    features: config.shared.pwa.features,
    serviceWorker: config.shared.pwa.serviceWorker,
    shortcuts: config.shared.pwa.shortcuts
  },

  // Cookie consent configuration
  cookies: {
    enabled: true,
    version: '1.0',
    banner: {
      position: 'bottom',
      theme: 'light',
      showOnFirstVisit: true,
      autoHide: false,
      hideDelay: 0
    },
    categories: [
      {
        id: 'necessary',
        name: 'Necessary',
        description: 'Essential cookies for website functionality',
        required: true,
        cookies: ['session', 'csrf', 'auth']
      },
      {
        id: 'analytics',
        name: 'Analytics',
        description: 'Help us understand how visitors interact with our website',
        required: false,
        cookies: ['_ga', '_gid', '_gtag', 'analytics']
      },
      {
        id: 'marketing',
        name: 'Marketing',
        description: 'Used to track visitors and display relevant ads',
        required: false,
        cookies: ['_fbp', '_fbc', 'marketing', 'ads']
      },
      {
        id: 'preferences',
        name: 'Preferences',
        description: 'Remember your settings and preferences',
        required: false,
        cookies: ['theme', 'language', 'sidebar', 'preferences']
      }
    ],
    links: {
      policy: '/cookie-policy',
      privacy: '/privacy',
      terms: '/terms'
    },
    compliance: {
      gdpr: true,
      ccpa: true,
      showDeclineOption: true,
      requiredCategories: ['necessary']
    }
  }
    
})
