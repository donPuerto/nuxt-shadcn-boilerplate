// Import all UI configurations first
import { themeConfig } from './theme'
import { themeCustomizerConfig } from './theme-customizer'
import { sidebarConfig } from './sidebar'
import { threeBackgroundConfig } from './three-background'

// Icon configuration
export const iconConfig = {
  // Default icon library
  library: 'lucide', // 'lucide' | 'heroicons' | 'tabler'
  
  // Icon defaults
  defaults: {
    size: 24,
    strokeWidth: 2,
    color: 'currentColor'
  },
  
  // Custom icon mappings
  aliases: {
    'menu': 'lucide:menu',
    'close': 'lucide:x',
    'arrow-right': 'lucide:arrow-right',
    'arrow-left': 'lucide:arrow-left',
    'chevron-down': 'lucide:chevron-down',
    'external-link': 'lucide:external-link'
  }
}

// Component configuration
export const componentConfig = {
  // Button variants
  button: {
    defaultVariant: 'default',
    defaultSize: 'md',
    variants: ['default', 'outline', 'ghost', 'destructive', 'secondary'],
    sizes: ['sm', 'md', 'lg', 'xl']
  },
  
  // Input defaults
  input: {
    defaultSize: 'md',
    sizes: ['sm', 'md', 'lg']
  },
  
  // Card defaults
  card: {
    defaultVariant: 'default',
    variants: ['default', 'outline', 'ghost']
  }
}

// Combined UI configuration
export const uiConfig = {
  theme: themeConfig,
  themeCustomizer: themeCustomizerConfig,
  sidebar: sidebarConfig,
  threeBackground: threeBackgroundConfig,
  icon: iconConfig,
  components: componentConfig
}

// Export default for easier importing
export default uiConfig
