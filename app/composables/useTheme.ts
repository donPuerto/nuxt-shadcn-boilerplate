import { themeConfig } from '~~/shared'

export const useTheme = () => {
  const colorMode = useColorMode()

  // Initialize default values using centralized config
  const getInitialPrimaryColor = () => {
    if (import.meta.client) {
      try {
        const saved = localStorage.getItem('theme-primary-color')
        if (saved && themeConfig.primaryColors.includes(saved as any)) {
          return saved
        }
      } catch (error) {
        console.warn('Error reading theme-primary-color from localStorage:', error)
      }
    }
    return themeConfig.primaryColor
  }

  const getInitialNeutralColor = () => {
    if (import.meta.client) {
      try {
        const saved = localStorage.getItem('theme-neutral-color')
        if (saved && themeConfig.neutralColors.includes(saved as any)) {
          return saved
        }
      } catch (error) {
        console.warn('Error reading theme-neutral-color from localStorage:', error)
      }
    }
    return themeConfig.neutralColor
  }

  const getInitialRadius = () => {
    if (import.meta.client) {
      try {
        const saved = localStorage.getItem('theme-radius')
        if (saved) {
          const radius = parseFloat(saved)
          if (!isNaN(radius) && radius >= 0 && radius <= 1) {
            return radius
          }
        }
      } catch (error) {
        console.warn('Error reading theme-radius from localStorage:', error)
      }
    }
    return themeConfig.radius
  }

  const getInitialMode = () => {
    if (import.meta.client) {
      try {
        const saved = localStorage.getItem('theme-mode')
        if (saved && themeConfig.modeOptions.some(mode => mode.value === saved)) {
          return saved
        }
      } catch (error) {
        console.warn('Error reading theme-mode from localStorage:', error)
      }
    }
    return themeConfig.mode
  }

  // Use Nuxt's useState for SSR-safe global state
  const isOpen = useState('theme-customizer-open', () => false)
  const currentPrimaryColor = useState('theme-current-primary-color', () => getInitialPrimaryColor())
  const currentNeutralColor = useState('theme-current-neutral-color', () => getInitialNeutralColor())
  const currentRadius = useState('theme-current-radius', () => getInitialRadius())

  // Actions with localStorage persistence
  const setPrimaryColor = (color: string) => {
    console.log('Setting primary color:', color)
    currentPrimaryColor.value = color
    
    if (import.meta.client) {
      try {
        localStorage.setItem('theme-primary-color', color)
        console.log('Saved primary color to localStorage:', color)
      } catch (error) {
        console.error('Error saving theme-primary-color to localStorage:', error)
      }
    }
  }

  const setNeutralColor = (color: string) => {
    console.log('Setting neutral color:', color)
    currentNeutralColor.value = color
    
    if (import.meta.client) {
      try {
        localStorage.setItem('theme-neutral-color', color)
        console.log('Saved neutral color to localStorage:', color)
      } catch (error) {
        console.error('Error saving theme-neutral-color to localStorage:', error)
      }
    }
  }

  const setRadius = (radius: number) => {
    console.log('Setting theme radius:', radius)
    currentRadius.value = radius
    
    if (import.meta.client) {
      try {
        localStorage.setItem('theme-radius', String(radius))
        console.log('Saved radius to localStorage:', radius)
      } catch (error) {
        console.error('Error saving theme-radius to localStorage:', error)
      }
    }
  }

  const setColorMode = (mode: string) => {
    console.log('Setting color mode:', mode)
    colorMode.preference = mode
    
    if (import.meta.client) {
      try {
        localStorage.setItem('theme-mode', mode)
        console.log('Saved mode to localStorage:', mode)
      } catch (error) {
        console.error('Error saving theme-mode to localStorage:', error)
      }
    }
  }

  const resetToDefaults = () => {
    console.log('Resetting to defaults from themeConfig')
    setPrimaryColor(themeConfig.primaryColor)
    setNeutralColor(themeConfig.neutralColor)
    setRadius(themeConfig.radius)
    setColorMode(themeConfig.mode)
    
    if (import.meta.client) {
      try {
        localStorage.removeItem('theme-primary-color')
        localStorage.removeItem('theme-neutral-color')
        localStorage.removeItem('theme-radius') 
        localStorage.removeItem('theme-mode')
        console.log('Cleared localStorage theme settings')
      } catch (error) {
        console.error('Error clearing localStorage:', error)
      }
    }
  }

  const toggleCustomizer = () => {
    isOpen.value = !isOpen.value
  }

  const closeCustomizer = () => {
    isOpen.value = false
  }

  // Helper functions
  const getColorValue = (colorName: string) => {
    const colorDef = themeConfig.colorDefinitions[colorName as keyof typeof themeConfig.colorDefinitions]
    return colorDef?.primary || themeConfig.colorDefinitions.white.primary
  }

  const getColorCategory = (colorName: string) => {
    const colorDef = themeConfig.colorDefinitions[colorName as keyof typeof themeConfig.colorDefinitions]
    return colorDef?.category || 'primary'
  }

  // Initialize from localStorage on client mount
  onMounted(() => {
    if (import.meta.client) {
      try {
        console.log('Initializing theme from localStorage on mount...')
        console.log('Default config:', {
          primaryColor: themeConfig.primaryColor,
          neutralColor: themeConfig.neutralColor,
          radius: themeConfig.radius,
          mode: themeConfig.mode
        })
        
        const savedPrimaryColor = localStorage.getItem('theme-primary-color')
        const savedNeutralColor = localStorage.getItem('theme-neutral-color')
        const savedRadius = localStorage.getItem('theme-radius')
        const savedMode = localStorage.getItem('theme-mode')
        
        if (savedPrimaryColor && themeConfig.primaryColors.includes(savedPrimaryColor as any)) {
          currentPrimaryColor.value = savedPrimaryColor
          console.log('Restored primary color:', savedPrimaryColor)
        } else {
          console.log('Using default primary color:', themeConfig.primaryColor)
        }

        if (savedNeutralColor && themeConfig.neutralColors.includes(savedNeutralColor as any)) {
          currentNeutralColor.value = savedNeutralColor
          console.log('Restored neutral color:', savedNeutralColor)
        } else {
          console.log('Using default neutral color:', themeConfig.neutralColor)
        }
        
        if (savedRadius) {
          const radius = parseFloat(savedRadius)
          if (!isNaN(radius) && radius >= 0 && radius <= 1) {
            currentRadius.value = radius
            console.log('Restored radius:', radius)
          } else {
            console.log('Using default radius:', themeConfig.radius)
          }
        } else {
          console.log('Using default radius:', themeConfig.radius)
        }
        
        if (savedMode && themeConfig.modeOptions.some(mode => mode.value === savedMode)) {
          colorMode.preference = savedMode
          console.log('Restored mode:', savedMode)
        } else {
          colorMode.preference = themeConfig.mode
          console.log('Using default mode:', themeConfig.mode)
        }
        
        console.log('Theme initialization completed:', {
          primaryColor: currentPrimaryColor.value,
          neutralColor: currentNeutralColor.value,
          radius: currentRadius.value,
          mode: colorMode.preference
        })
      } catch (error) {
        console.error('Error during theme initialization:', error)
      }
    }
  })

  // Watchers for debugging
  watch(currentPrimaryColor, (newVal, oldVal) => {
    console.log('Primary color changed:', oldVal, '->', newVal)
  })

  watch(currentNeutralColor, (newVal, oldVal) => {
    console.log('Neutral color changed:', oldVal, '->', newVal)
  })

  watch(currentRadius, (newVal, oldVal) => {
    console.log('Theme radius changed:', oldVal, '->', newVal)
  })

  return {
    // State (readonly to prevent direct mutation)
    isOpen: readonly(isOpen),
    currentPrimaryColor: readonly(currentPrimaryColor),
    currentNeutralColor: readonly(currentNeutralColor),
    currentRadius: readonly(currentRadius),
    
    // Theme config
    availableColors: themeConfig.availableColors,
    primaryColors: themeConfig.primaryColors,
    neutralColors: themeConfig.neutralColors,
    radiusOptions: themeConfig.radiusOptions,
    modeOptions: themeConfig.modeOptions,
    
    // Actions
    toggleCustomizer,
    closeCustomizer,
    setPrimaryColor,
    setNeutralColor,
    setRadius,
    setColorMode,
    resetToDefaults,
    getColorValue,
    getColorCategory
  }
}
