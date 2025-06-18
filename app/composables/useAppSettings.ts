import { reactive, computed, watch, nextTick } from 'vue'

// Global singleton to prevent memory leaks
let globalSettings: any = null

// Main composable function
export const useAppSettings = () => {
  // Return existing instance to prevent memory leaks
  if (globalSettings && import.meta.client) {
    return globalSettings
  }

  const appConfig = useAppConfig()

  // Reactive settings state
  const themeSettings = reactive({
    color: appConfig.theme?.color || 'zinc',
    mode: appConfig.theme?.mode || 'system',
    radius: appConfig.theme?.radius || 0.5
  })

  const sidebarSettings = reactive({
    isOpen: appConfig.app?.sidebar?.defaultOpen || false,
    position: appConfig.app?.sidebar?.side || 'right',
    direction: appConfig.app?.sidebar?.direction || 'ltr',
    width: appConfig.app?.sidebar?.width || '420px'
  })

  // Computed properties
  const availableColors = computed(() => appConfig.theme?.availableColors || [
    'zinc', 'slate', 'stone', 'gray', 'neutral',
    'red', 'rose', 'orange', 'green', 'blue',
    'yellow', 'violet'
  ])

  const sidebarConfig = computed(() => ({
    name: appConfig.app?.sidebar?.name || appConfig.themeCustomizer?.name || 'Theme Customizer',
    description: appConfig.app?.sidebar?.description || appConfig.themeCustomizer?.description || 'Customize your application',
    availablePositions: appConfig.app?.sidebar?.availablePositions || [
      { value: 'left', label: 'Left' },
      { value: 'right', label: 'Right' }
    ],
    availableDirections: appConfig.app?.sidebar?.availableDirections || [
      { value: 'ltr', label: 'Left to Right' },
      { value: 'rtl', label: 'Right to Left' }
    ]
  }))

  const sidebar = computed(() => ({
    isOpen: sidebarSettings.isOpen,
    side: sidebarSettings.position,
    direction: sidebarSettings.direction,
    width: sidebarSettings.width
  }))

  // Storage utilities
  const THEME_KEY = appConfig.theme?.persistence?.storageKey || 'app-theme-settings'
  const SIDEBAR_KEY = appConfig.app?.sidebar?.persistence?.storageKey || 'app-sidebar-settings'

  const loadSettings = () => {
    if (!import.meta.client) return

    try {
      if (appConfig.theme?.persistence?.enabled !== false) {
        const savedTheme = localStorage.getItem(THEME_KEY)
        if (savedTheme) {
          const parsed = JSON.parse(savedTheme)
          Object.assign(themeSettings, parsed)
        }
      }

      if (appConfig.app?.sidebar?.persistence?.enabled !== false) {
        const savedSidebar = localStorage.getItem(SIDEBAR_KEY)
        if (savedSidebar) {
          const parsed = JSON.parse(savedSidebar)
          Object.assign(sidebarSettings, { ...parsed, isOpen: false })
        }
      }
    } catch (error) {
      console.warn('Failed to load settings:', error)
    }
  }

  const saveThemeSettings = () => {
    if (!import.meta.client || appConfig.theme?.persistence?.enabled === false) return
    try {
      localStorage.setItem(THEME_KEY, JSON.stringify({
        color: themeSettings.color,
        mode: themeSettings.mode,
        radius: themeSettings.radius
      }))
    } catch (error) {
      console.warn('Failed to save theme:', error)
    }
  }

  const saveSidebarSettings = () => {
    if (!import.meta.client || appConfig.app?.sidebar?.persistence?.enabled === false) return
    try {
      localStorage.setItem(SIDEBAR_KEY, JSON.stringify({
        position: sidebarSettings.position,
        direction: sidebarSettings.direction,
        width: sidebarSettings.width
      }))
    } catch (error) {
      console.warn('Failed to save sidebar:', error)
    }
  }

  // DOM manipulation
  const applyThemeToDOM = () => {
    if (!import.meta.client) return

    try {
      availableColors.value.forEach(color => {
        document.body.classList.remove(`theme-${color}`)
      })
      
      document.body.classList.add(`theme-${themeSettings.color}`)
      document.body.style.setProperty('--radius', `${themeSettings.radius}rem`)
    } catch (error) {
      console.warn('Failed to apply theme:', error)
    }
  }

  // Actions
  const setTheme = (color: string) => {
    if (!availableColors.value.includes(color)) return
    themeSettings.color = color
    saveThemeSettings()
    if (import.meta.client) {
      nextTick(() => applyThemeToDOM())
    }
  }

  const setColorMode = (mode: string) => {
    if (!['light', 'dark', 'system'].includes(mode)) return
    themeSettings.mode = mode
    saveThemeSettings()
  }

  const setRadius = (radius: number) => {
    themeSettings.radius = Math.max(0, Math.min(2, radius))
    saveThemeSettings()
    if (import.meta.client) {
      nextTick(() => applyThemeToDOM())
    }
  }

  const openSidebar = () => {
    sidebarSettings.isOpen = true
  }

  const closeSidebar = () => {
    sidebarSettings.isOpen = false
  }

  const toggleSidebar = () => {
    sidebarSettings.isOpen = !sidebarSettings.isOpen
  }

  const setSidebarPosition = (position: string) => {
    if (!['left', 'right'].includes(position)) return
    sidebarSettings.position = position
    saveSidebarSettings()
  }

  const setSidebarDirection = (direction: string) => {
    if (!['ltr', 'rtl'].includes(direction)) return
    sidebarSettings.direction = direction
    saveSidebarSettings()
  }

  const setSidebarWidth = (width: string) => {
    sidebarSettings.width = width
    saveSidebarSettings()
  }

  const resetThemeToDefaults = () => {
    themeSettings.color = appConfig.theme?.color || 'zinc'
    themeSettings.mode = appConfig.theme?.mode || 'system'
    themeSettings.radius = appConfig.theme?.radius || 0.5
    saveThemeSettings()
    if (import.meta.client) {
      nextTick(() => applyThemeToDOM())
    }
  }

  const resetSidebarToDefaults = () => {
    sidebarSettings.position = appConfig.app?.sidebar?.side || 'right'
    sidebarSettings.direction = appConfig.app?.sidebar?.direction || 'ltr'
    sidebarSettings.width = appConfig.app?.sidebar?.width || '420px'
    saveSidebarSettings()
  }

  // Create settings object
  const settings = {
    // State
    theme: computed(() => themeSettings.color),
    colorMode: computed(() => themeSettings.mode),
    radius: computed(() => themeSettings.radius),
    availableColors,
    sidebar,
    sidebarConfig,

    // Actions
    setTheme,
    setColorMode,
    setRadius,
    openSidebar,
    closeSidebar,
    toggleSidebar,
    setSidebarPosition,
    setSidebarDirection,
    setSidebarWidth,
    resetThemeToDefaults,
    resetSidebarToDefaults,
    loadSettings,
    applyThemeToDOM
  }

  // Client-side initialization
  if (import.meta.client) {
    watch(() => themeSettings.color, () => {
      nextTick(() => applyThemeToDOM())
    })

    watch(() => themeSettings.radius, () => {
      nextTick(() => applyThemeToDOM())
    })

    loadSettings()
    nextTick(() => applyThemeToDOM())
  }

  globalSettings = settings
  return settings
}

// Default export for explicit imports
export default useAppSettings
