export default defineNuxtPlugin({
  name: 'theme-initializer',
  enforce: 'pre', // Run before other plugins
  setup() {
    // Only run on client-side
    if (!import.meta.client) return
    
    const appConfig = useAppConfig()
    const { theme, radius } = useCustomize()
    
    // Get available colors from config
    const allColors = appConfig.theme?.availableColors || [
      'zinc', 'slate', 'stone', 'gray', 'neutral',
      'red', 'rose', 'orange', 'green', 'blue',
      'yellow', 'violet'
    ]
    
    // Apply theme class to body
    function setClassTheme() {
      document.body.classList.remove(
        ...allColors.map(color => `theme-${color}`)
      )
      document.body.classList.add(`theme-${theme.value}`)
    }
    
    // Apply radius to CSS variable
    function setStyleRadius() {
      document.body.style.setProperty('--radius', `${radius.value}rem`)
    }
    
    // Apply settings on initial load
    setClassTheme()
    setStyleRadius()
    
    // Watch for theme changes
    watch(theme, setClassTheme, { immediate: true })
    
    // Watch for radius changes
    watch(radius, setStyleRadius, { immediate: true })
    
    // Sync color mode with dark/light theme
    const colorMode = useColorMode()
    if (!colorMode.preference || colorMode.preference === 'system') {
      // Keep system preference
    } else {
      // Honor existing preference
    }
    
    return {
      provide: {
        themeInitialized: true
      }
    }
  }
})
