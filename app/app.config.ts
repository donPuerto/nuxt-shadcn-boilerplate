import { config } from './config'

export default defineAppConfig({

  // App basic info
  name: config.shared.app.name,
  description: config.shared.app.description,
  version: config.shared.app.version,
  author: config.shared.app.author,
  url: config.shared.app.url,
  
  // Theme configuration
  theme: config.shared.app.theme,

  // Core app information
  app: sharedConfig.app.app,

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
  }
    
})
