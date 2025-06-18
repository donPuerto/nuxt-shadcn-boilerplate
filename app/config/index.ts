import { 
  appConfig, 
  navigationConfig, 
  socialConfig, 
  footerConfig, 
  seoConfig, 
  pwaConfig 
} from './shared'

export const config = {
  shared: {
    app: appConfig,
    navigation: navigationConfig,
    social: socialConfig,
    footer: footerConfig,
    seo: seoConfig,
    pwa: pwaConfig
  }
  // pages: {} - We'll add this when we work on pages config
  // ui: {} - We'll add this when we work on UI config
}

export default config

// Re-export shared configs for direct import
export {
  appConfig,
  navigationConfig,
  socialConfig,
  footerConfig,
  seoConfig,
  pwaConfig
}
