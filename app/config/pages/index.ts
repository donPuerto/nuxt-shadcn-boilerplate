// Import all page configurations first
import { homeConfig } from './home'
import { roadmapConfig } from './roadmap'
import { dashboardConfig } from './dashboard'
import { errorConfig } from './error'

// Export individual configs
export { homeConfig, roadmapConfig, dashboardConfig, errorConfig }

// Combined pages configuration object
export const pagesConfig = {
  home: homeConfig,
  roadmap: roadmapConfig,
  dashboard: dashboardConfig,
  error: errorConfig
}

// Export default for easier importing
export default pagesConfig
