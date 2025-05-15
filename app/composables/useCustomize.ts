// Define a type for all theme settings
export interface ThemeSettings {
  theme: string
  radius: number
}

export function useCustomize() {
  const appConfig = useAppConfig()
  
  // Get defaults from app config
  const defaultTheme = appConfig.theme?.default || 'zinc'
  const defaultRadius = appConfig.theme?.defaultRadius || 0.5

  // Create reactive refs
  const theme = useState('ui-theme', () => defaultTheme)
  const radius = useState('ui-radius', () => defaultRadius)

  // Load saved settings on init
  function loadSavedSettings() {
    if (!import.meta.client) return
    
    try {
      const savedSettings = localStorage.getItem('theme-settings')
      if (savedSettings) {
        const parsed = JSON.parse(savedSettings) as ThemeSettings
        theme.value = parsed.theme || defaultTheme
        radius.value = parsed.radius ?? defaultRadius
      }
    } catch (error) {
      console.error('Failed to load saved theme settings', error)
      // Reset to defaults if loading fails
      theme.value = defaultTheme
      radius.value = defaultRadius
    }
  }

  // Save settings to localStorage
  function saveSettings() {
    if (!import.meta.client) return
    
    try {
      const settings: ThemeSettings = {
        theme: theme.value,
        radius: radius.value
      }
      localStorage.setItem('theme-settings', JSON.stringify(settings))
    } catch (error) {
      console.error('Failed to save theme settings', error)
    }
  }

  // Set theme with automatic saving
  function setTheme(value: string) {
    theme.value = value
    saveSettings()
  }

  // Set radius with automatic saving
  function setRadius(value: number) {
    radius.value = value
    saveSettings()
  }

  // Call loadSavedSettings to initialize from localStorage when in client mode
  if (import.meta.client) {
    loadSavedSettings()
  }

  // Return the reactive refs and setter functions
  return {
    theme,
    radius,
    setTheme,
    setRadius
  }
}
