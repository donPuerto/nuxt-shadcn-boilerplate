import { themeConfig, navigationConfig } from '~~/shared'


export default defineAppConfig({
  // Theme configuration
  theme: themeConfig,

  // Navigation configuration
  navigation: navigationConfig,

  icon: {
    mode: 'css',
    cssLayer: 'base'
  },


})
