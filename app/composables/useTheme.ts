import { 
  type ThemePreset, 
  type Direction, 
  type FontScale,
  type ShadowConfig,
  themeConfig, 
  primaryColorVars, 
  neutralColorVars, 
  getColorHex,
  generateShadowCSS,
  defaultShadowConfig,
  STORAGE_KEYS 
} from '../../shared/ui/theme'

// Global singleton state to ensure single instance across all components
let globalThemeState: any = null

// SSR-safe localStorage helpers
const getStoredValue = (key: string, defaultValue: any, validator?: (value: any) => boolean) => {
  if (!import.meta.client) return defaultValue
  
  try {
    const stored = localStorage.getItem(key)
    if (stored === null) return defaultValue
    
    const parsed = JSON.parse(stored)
    if (validator && !validator(parsed)) return defaultValue
    
    return parsed
  } catch {
    return defaultValue
  }
}

const setStoredValue = (key: string, value: any) => {
  if (!import.meta.client) return
  
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (error) {
    console.warn(`Failed to store ${key}:`, error)
  }
}

// Initialize global state only once
const initializeGlobalState = () => {
  if (globalThemeState) {
    return globalThemeState
  }
  
  globalThemeState = {
    isOpen: ref(false),
    currentPreset: ref<ThemePreset>(
      getStoredValue(STORAGE_KEYS.PRESET, 'default', (v) => 
        ['default', 'vercel', 'cosmicNight', 'twitter', 'claude'].includes(v)
      )
    ),
    currentPrimaryColor: ref<string>(
      getStoredValue(STORAGE_KEYS.PRIMARY, 'violet', (v) => 
        ['violet', 'blue', 'green', 'amber', 'red', 'rose'].includes(v)
      )
    ),
    currentNeutralColor: ref<string>(
      getStoredValue(STORAGE_KEYS.NEUTRAL, 'slate', (v) => 
        ['slate', 'gray', 'zinc', 'neutral', 'stone'].includes(v)
      )
    ),
    currentRadius: ref<number>(
      getStoredValue(STORAGE_KEYS.RADIUS, 0.5, (v) => 
        typeof v === 'number' && v >= 0 && v <= 2
      )
    ),
    direction: ref<Direction>(
      getStoredValue(STORAGE_KEYS.DIRECTION, 'ltr', (v) => 
        ['ltr', 'rtl'].includes(v)
      )
    ),
    fontScale: ref<FontScale>(
      getStoredValue(STORAGE_KEYS.FONT, 'base', (v) => 
        ['sm', 'base', 'md', 'lg'].includes(v)
      )
    ),
    // NEW: Spacing state
    spacing: ref<number>(
      getStoredValue(STORAGE_KEYS.SPACING, 1, (v) => 
        typeof v === 'number' && v >= 0.5 && v <= 3
      )
    ),
    // NEW: Shadow configuration state
    shadowConfig: ref<ShadowConfig>(
      getStoredValue(STORAGE_KEYS.SHADOW_CONFIG, defaultShadowConfig, (v) => 
        v && typeof v === 'object' && 
        typeof v.opacity === 'number' &&
        typeof v.blurRadius === 'number' &&
        typeof v.spread === 'number' &&
        typeof v.offsetX === 'number' &&
        typeof v.offsetY === 'number'
      )
    )
  }

  return globalThemeState
}

export const useTheme = () => {
  const colorMode = useColorMode()
  
  // Get or create global state
  const state = initializeGlobalState()
  
  // Destructure state for easier access - these are the actual refs
  const {
    isOpen,
    currentPreset,
    currentPrimaryColor,
    currentNeutralColor,
    currentRadius,
    direction,
    fontScale,
    spacing,
    shadowConfig
  } = state

  // Computed values
  const currentPresetMeta = computed(() => {
    return themeConfig.presets.find(p => p.value === currentPreset.value) || themeConfig.presets[0]
  })

  const isCustomTheme = computed(() => {
    return currentPresetMeta.value.supportsCustomColors === true
  })

  // NEW: Computed shadow CSS
  const computedShadowCSS = computed(() => {
    return generateShadowCSS(shadowConfig.value)
  })

  // Theme application functions
  const applyDynamicVars = () => {
    if (!import.meta.client) return
    
    try {
      const root = document.documentElement
      const isDark = root.classList.contains('dark')

      if (isCustomTheme.value) {
        // Apply primary color variables
        const primaryVars = primaryColorVars[currentPrimaryColor.value]
        if (primaryVars) {
          const primarySet = isDark ? primaryVars.dark : primaryVars.light
          Object.entries(primarySet).forEach(([key, value]) => {
            root.style.setProperty(key, value)
          })
        }

        // Apply neutral color variables
        const neutralVars = neutralColorVars[currentNeutralColor.value]
        if (neutralVars) {
          const neutralSet = isDark ? neutralVars.dark : neutralVars.light
          Object.entries(neutralSet).forEach(([key, value]) => {
            root.style.setProperty(key, value)
          })
        }
      }

      // NEW: Apply shadow CSS variable
      root.style.setProperty('--custom-shadow', computedShadowCSS.value)
      
    } catch (error) {
      console.error('[theme] Error applying dynamic vars:', error)
    }
  }

  const applyTheme = () => {
    if (!import.meta.client) return
    
    try {
      const root = document.documentElement
      
      // Set data attributes
      root.setAttribute('data-preset', currentPreset.value)
      root.setAttribute('data-primary', currentPrimaryColor.value)
      root.setAttribute('data-neutral', currentNeutralColor.value)
      root.setAttribute('data-radius', String(currentRadius.value))
      root.setAttribute('data-font', fontScale.value)
      root.setAttribute('dir', direction.value)
      
      // NEW: Apply spacing and shadow attributes
      root.setAttribute('data-spacing', String(spacing.value))
      
      // Set CSS custom properties
      root.style.setProperty('--radius', `${currentRadius.value}rem`)
      root.style.setProperty('--spacing-multiplier', String(spacing.value))

      // Apply dynamic color variables and shadow
      applyDynamicVars()
      
    } catch (error) {
      console.error('[theme] Error applying theme:', error)
    }
  }

  // State management actions
  const setPreset = (preset: ThemePreset) => {
    currentPreset.value = preset
    setStoredValue(STORAGE_KEYS.PRESET, preset)
    applyTheme()
  }

  const setPrimaryColor = (color: string) => {
    currentPrimaryColor.value = color
    setStoredValue(STORAGE_KEYS.PRIMARY, color)
    applyDynamicVars()
  }

  const setNeutralColor = (color: string) => {
    currentNeutralColor.value = color
    setStoredValue(STORAGE_KEYS.NEUTRAL, color)
    applyDynamicVars()
  }

  const setRadius = (radius: number) => {
    const clamped = Math.min(2, Math.max(0, radius))
    currentRadius.value = clamped
    setStoredValue(STORAGE_KEYS.RADIUS, clamped)
    applyTheme()
  }

  const setDirection = (dir: Direction) => {
    direction.value = dir
    setStoredValue(STORAGE_KEYS.DIRECTION, dir)
    applyTheme()
  }

  const setFontScale = (scale: FontScale) => {
    fontScale.value = scale
    setStoredValue(STORAGE_KEYS.FONT, scale)
    applyTheme()
  }

  // NEW: Spacing setter
  const setSpacing = (spacingValue: number) => {
    const clamped = Math.min(3, Math.max(0.5, spacingValue))
    spacing.value = clamped
    setStoredValue(STORAGE_KEYS.SPACING, clamped)
    applyTheme()
  }

  // NEW: Shadow configuration setters
  const setShadowColorType = (colorType: 'custom' | 'tailwind') => {
    shadowConfig.value = { ...shadowConfig.value, colorType }
    setStoredValue(STORAGE_KEYS.SHADOW_CONFIG, shadowConfig.value)
    applyDynamicVars()
  }

  const setShadowCustomColor = (color: string) => {
    shadowConfig.value = { ...shadowConfig.value, customColor: color }
    setStoredValue(STORAGE_KEYS.SHADOW_CONFIG, shadowConfig.value)
    applyDynamicVars()
  }

  const setShadowTailwindColor = (color: string) => {
    shadowConfig.value = { ...shadowConfig.value, tailwindColor: color }
    setStoredValue(STORAGE_KEYS.SHADOW_CONFIG, shadowConfig.value)
    applyDynamicVars()
  }

  const setShadowOpacity = (opacity: number) => {
    const clamped = Math.min(100, Math.max(0, opacity))
    shadowConfig.value = { ...shadowConfig.value, opacity: clamped }
    setStoredValue(STORAGE_KEYS.SHADOW_CONFIG, shadowConfig.value)
    applyDynamicVars()
  }

  const setShadowBlurRadius = (blurRadius: number) => {
    const clamped = Math.min(50, Math.max(0, blurRadius))
    shadowConfig.value = { ...shadowConfig.value, blurRadius: clamped }
    setStoredValue(STORAGE_KEYS.SHADOW_CONFIG, shadowConfig.value)
    applyDynamicVars()
  }

  const setShadowSpread = (spread: number) => {
    const clamped = Math.min(25, Math.max(-25, spread))
    shadowConfig.value = { ...shadowConfig.value, spread: clamped }
    setStoredValue(STORAGE_KEYS.SHADOW_CONFIG, shadowConfig.value)
    applyDynamicVars()
  }

  const setShadowOffsetX = (offsetX: number) => {
    const clamped = Math.min(25, Math.max(-25, offsetX))
    shadowConfig.value = { ...shadowConfig.value, offsetX: clamped }
    setStoredValue(STORAGE_KEYS.SHADOW_CONFIG, shadowConfig.value)
    applyDynamicVars()
  }

  const setShadowOffsetY = (offsetY: number) => {
    const clamped = Math.min(25, Math.max(-25, offsetY))
    shadowConfig.value = { ...shadowConfig.value, offsetY: clamped }
    setStoredValue(STORAGE_KEYS.SHADOW_CONFIG, shadowConfig.value)
    applyDynamicVars()
  }

  const setColorMode = (mode: string) => {
    colorMode.preference = mode
    setStoredValue(STORAGE_KEYS.MODE, mode)
  }

  const resetToDefaults = () => {
    // Reset all values to defaults
    currentPreset.value = 'default'
    currentPrimaryColor.value = 'violet'
    currentNeutralColor.value = 'slate'
    currentRadius.value = 0.5
    direction.value = 'ltr'
    fontScale.value = 'base'
    spacing.value = 1
    shadowConfig.value = { ...defaultShadowConfig }
    colorMode.preference = 'system'
    
    // Clear localStorage
    if (import.meta.client) {
      Object.values(STORAGE_KEYS).forEach(key => {
        try {
          localStorage.removeItem(key)
        } catch (error) {
          console.warn(`Failed to remove ${key}:`, error)
        }
      })
    }
    
    applyTheme()
  }

  // Customizer visibility actions
  const toggleCustomizer = () => {
    isOpen.value = !isOpen.value
  }
  
  const openCustomizer = () => {
    isOpen.value = true
  }
  
  const closeCustomizer = () => {
    isOpen.value = false
  }

  const toggleDirection = () => {
    setDirection(direction.value === 'ltr' ? 'rtl' : 'ltr')
  }

  const getColorValue = (colorKey: string): string => {
    return getColorHex(colorKey)
  }

  // Client-side watchers and lifecycle
  if (import.meta.client) {
    // Watch for changes that need DOM updates
    watch([currentRadius, direction, fontScale, spacing], () => {
      try {
        const root = document.documentElement
        root.setAttribute('data-radius', String(currentRadius.value))
        root.setAttribute('data-font', fontScale.value)
        root.setAttribute('dir', direction.value)
        root.setAttribute('data-spacing', String(spacing.value))
        root.style.setProperty('--radius', `${currentRadius.value}rem`)
        root.style.setProperty('--spacing-multiplier', String(spacing.value))
      } catch (error) {
        console.error('[theme] Error in watcher:', error)
      }
    })

    // Watch for shadow config changes
    watch(shadowConfig, () => {
      applyDynamicVars()
    }, { deep: true })

    // Watch for color mode changes
    watch(colorMode, applyDynamicVars, { immediate: false })

    // Initialize on mount
    onMounted(() => {
      isOpen.value = false
      applyTheme()
      
      // Set up mutation observer for dark/light mode changes
      try {
        const observer = new MutationObserver((mutations) => {
          mutations.forEach((mutation) => {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
              applyDynamicVars()
            }
          })
        })
        
        observer.observe(document.documentElement, {
          attributes: true,
          attributeFilter: ['class']
        })
        
        onUnmounted(() => {
          observer.disconnect()
        })
      } catch (error) {
        console.error('[theme] Error setting up observer:', error)
      }
    })
  }

  return {
    // State - return the refs directly for full reactivity
    isOpen,
    currentPreset: readonly(currentPreset),
    currentPrimaryColor: readonly(currentPrimaryColor),
    currentNeutralColor: readonly(currentNeutralColor),
    currentRadius: readonly(currentRadius),
    direction: readonly(direction),
    fontScale: readonly(fontScale),
    
    // NEW: Shadow and spacing state
    spacing: readonly(spacing),
    shadowConfig: readonly(shadowConfig),
    
    // Computed
    currentPresetMeta,
    isCustomTheme,
    computedShadowCSS,

    // Static config from theme.ts
    presets: computed(() => themeConfig.presets),
    primaryColors: computed(() => themeConfig.primaryColors),
    neutralColors: computed(() => themeConfig.neutralColors),
    shadowColors: computed(() => themeConfig.shadowColors),
    modeOptions: computed(() => themeConfig.modeOptions),
    fontOptions: computed(() => themeConfig.fontOptions),

    // Actions
    setPreset,
    setPrimaryColor,
    setNeutralColor,
    setRadius,
    setDirection,
    setFontScale,
    setColorMode,
    
    // NEW: Shadow and spacing actions
    setSpacing,
    setShadowColorType,
    setShadowCustomColor,
    setShadowTailwindColor,
    setShadowOpacity,
    setShadowBlurRadius,
    setShadowSpread,
    setShadowOffsetX,
    setShadowOffsetY,
    
    // Utility actions
    resetToDefaults,
    toggleCustomizer,
    openCustomizer,
    closeCustomizer,
    toggleDirection,
    getColorValue,
    applyTheme
  }
}
