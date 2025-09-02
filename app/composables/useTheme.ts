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
        // Silent error handling
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
        // Silent error handling
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
        // Silent error handling
      }
    }
    return themeConfig.radius
  }

  // Use Nuxt's useState for SSR-safe global state
  const isOpen = useState('theme-customizer-open', () => false)
  const currentPrimaryColor = useState('theme-current-primary-color', () => getInitialPrimaryColor())
  const currentNeutralColor = useState('theme-current-neutral-color', () => getInitialNeutralColor())
  const currentRadius = useState('theme-current-radius', () => getInitialRadius())

  // Screen size reactive state
  const isMobile = ref(false)
  const screenWidth = ref(0)

  // Check if screen is mobile/small (xs breakpoint: 640px)
  const checkScreenSize = () => {
    if (import.meta.client) {
      screenWidth.value = window.innerWidth
      isMobile.value = window.innerWidth < 640 // xs breakpoint
      
      // Auto-close on mobile if open
      if (isMobile.value && isOpen.value) {
        isOpen.value = false
      }
    }
  }

  // Actions with localStorage persistence
  const setPrimaryColor = (color: string) => {
    currentPrimaryColor.value = color
    
    if (import.meta.client) {
      try {
        localStorage.setItem('theme-primary-color', color)        
      } catch (error) {
        // Silent error handling
      }
    }
  }

  const setNeutralColor = (color: string) => {
    currentNeutralColor.value = color
    
    if (import.meta.client) {
      try {
        localStorage.setItem('theme-neutral-color', color)
      } catch (error) {
        // Silent error handling
      }
    }
  }

  const setRadius = (radius: number) => {
    currentRadius.value = radius
    
    if (import.meta.client) {
      try {
        localStorage.setItem('theme-radius', String(radius))
      } catch (error) {
        // Silent error handling
      }
    }
  }

  const setColorMode = (mode: string) => {
    colorMode.preference = mode
    
    if (import.meta.client) {
      try {
        localStorage.setItem('theme-mode', mode)
      } catch (error) {
        // Silent error handling
      }
    }
  }

  const resetToDefaults = () => {
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
      } catch (error) {
        // Silent error handling
      }
    }
  }

  const toggleCustomizer = () => {
    // Prevent opening on mobile (xs breakpoint)
    if (isMobile.value && !isOpen.value) {
      return
    }
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
        // Initialize screen size detection
        checkScreenSize()
        
        // Add resize listener
        const handleResize = () => {
          checkScreenSize()
        }
        
        window.addEventListener('resize', handleResize)
        
        // Cleanup on unmount
        onUnmounted(() => {
          window.removeEventListener('resize', handleResize)
        })

        const savedPrimaryColor = localStorage.getItem('theme-primary-color')
        const savedNeutralColor = localStorage.getItem('theme-neutral-color')
        const savedRadius = localStorage.getItem('theme-radius')
        const savedMode = localStorage.getItem('theme-mode')
        
        if (savedPrimaryColor && themeConfig.primaryColors.includes(savedPrimaryColor as any)) {
          currentPrimaryColor.value = savedPrimaryColor        
        }

        if (savedNeutralColor && themeConfig.neutralColors.includes(savedNeutralColor as any)) {
          currentNeutralColor.value = savedNeutralColor          
        }
        
        if (savedRadius) {
          const radius = parseFloat(savedRadius)
          if (!isNaN(radius) && radius >= 0 && radius <= 1) {
            currentRadius.value = radius            
          }
        }
        
        if (savedMode && themeConfig.modeOptions.some(mode => mode.value === savedMode)) {
          colorMode.preference = savedMode          
        } else {
          colorMode.preference = themeConfig.mode          
        }        
        
      } catch (error) {
        // Silent error handling
      }
    }
  })

  return {
    // State (readonly to prevent direct mutation)
    isOpen: readonly(isOpen),
    currentPrimaryColor: readonly(currentPrimaryColor),
    currentNeutralColor: readonly(currentNeutralColor),
    currentRadius: readonly(currentRadius),
    
    // Screen size state
    isMobile: readonly(isMobile),
    screenWidth: readonly(screenWidth),
    
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
