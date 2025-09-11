import { 
  type ThemePreset, 
  type Direction, 
  type FontScale,
  themeConfig, 
  primaryColorVars, 
  neutralColorVars, 
  getColorHex,
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
    console.log('[theme] Returning existing global state, isOpen:', globalThemeState.isOpen.value)
    return globalThemeState
  }

  console.log('[theme] Initializing NEW global state')
  
  globalThemeState = {
    // CRITICAL: Start with false - this is the actual ref
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
    )
  }

  console.log('[theme] Global state initialized with isOpen VALUE:', globalThemeState.isOpen.value)
  return globalThemeState
}

export const useTheme = () => {
  console.log('[theme] useTheme() called')
  const colorMode = useColorMode()
<<<<<<< HEAD
=======

  // ---------- Theme Metadata (derived from themeConfig presets) ----------
  const presetMetadata = computed(() => {
    const metadata: Record<string, { name: string, description: string, supportsCustomColors: boolean }> = {}
    
    // Build metadata from themeConfig.presets
    themeConfig.presets?.forEach(preset => {
      metadata[preset.value] = {
        name: preset.label,
        description: preset.value === 'default' 
          ? 'Customizable theme with individual color controls'
          : `Predefined theme: ${preset.label}`,
        supportsCustomColors: preset.value === 'default'
      }
    })
    
    return metadata
  })

  // ---------- Initializers ----------
  const getInitialPreset = (): ThemePreset => {
    if (import.meta.client) {
      const saved = localStorage.getItem(LS_PRESET) as ThemePreset | null
      if (saved && themeConfig.presets?.some(p => p.value === saved)) return saved
    }
    return 'default'
  }

  const getInitialPrimaryColor = () => {
    if (import.meta.client) {
      const saved = localStorage.getItem(LS_PRIMARY)
      if (saved && themeConfig.primaryColors?.map(c => c.value).includes(saved)) return saved
    }
    return 'violet'
  }
>>>>>>> defc675f949766f1cf0d1acb9fb477dbb2f27695
  
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
    fontScale
  } = state

  console.log('[theme] useTheme state destructured, isOpen VALUE:', isOpen.value)

  // Computed values
  const currentPresetMeta = computed(() => {
    return themeConfig.presets.find(p => p.value === currentPreset.value) || themeConfig.presets[0]
  })

  const isCustomTheme = computed(() => {
    return currentPresetMeta.value.supportsCustomColors === true
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

      console.log('[theme] Dynamic vars applied:', {
        isDark,
        primary: currentPrimaryColor.value,
        neutral: currentNeutralColor.value,
        isCustom: isCustomTheme.value
      })
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
      
      // Set CSS custom properties
      root.style.setProperty('--radius', `${currentRadius.value}rem`)

      // Apply dynamic color variables
      applyDynamicVars()

      console.log('[theme] Theme applied:', {
        preset: currentPreset.value,
        primary: currentPrimaryColor.value,
        neutral: currentNeutralColor.value,
        radius: currentRadius.value,
        direction: direction.value,
        fontScale: fontScale.value
      })
    } catch (error) {
      console.error('[theme] Error applying theme:', error)
    }
  }

  // State management actions
  const setPreset = (preset: ThemePreset) => {
<<<<<<< HEAD
    console.log('[theme] setPreset:', preset)
=======
    console.log('Setting preset:', preset)
    if (!themeConfig.presets?.some(p => p.value === preset)) {
      console.warn('Invalid preset:', preset)
      return
    }
    
>>>>>>> defc675f949766f1cf0d1acb9fb477dbb2f27695
    currentPreset.value = preset
    setStoredValue(STORAGE_KEYS.PRESET, preset)
    applyTheme()
  }

  const setPrimaryColor = (color: string) => {
    console.log('[theme] setPrimaryColor:', color)
    currentPrimaryColor.value = color
    setStoredValue(STORAGE_KEYS.PRIMARY, color)
    applyDynamicVars()
  }

  const setNeutralColor = (color: string) => {
    console.log('[theme] setNeutralColor:', color)
    currentNeutralColor.value = color
    setStoredValue(STORAGE_KEYS.NEUTRAL, color)
    applyDynamicVars()
  }

  const setRadius = (radius: number) => {
    console.log('[theme] setRadius:', radius)
    const clamped = Math.min(2, Math.max(0, radius))
    currentRadius.value = clamped
    setStoredValue(STORAGE_KEYS.RADIUS, clamped)
    applyTheme()
  }

  const setDirection = (dir: Direction) => {
    console.log('[theme] setDirection:', dir)
    direction.value = dir
    setStoredValue(STORAGE_KEYS.DIRECTION, dir)
    applyTheme()
  }

  const setFontScale = (scale: FontScale) => {
    console.log('[theme] setFontScale:', scale)
    fontScale.value = scale
    setStoredValue(STORAGE_KEYS.FONT, scale)
    applyTheme()
  }

  const setColorMode = (mode: string) => {
    console.log('[theme] setColorMode:', mode)
    colorMode.preference = mode
    setStoredValue(STORAGE_KEYS.MODE, mode)
  }

  const resetToDefaults = () => {
    console.log('[theme] resetToDefaults called')
    
    // Reset all values to defaults
    currentPreset.value = 'default'
    currentPrimaryColor.value = 'violet'
    currentNeutralColor.value = 'slate'
    currentRadius.value = 0.5
    direction.value = 'ltr'
    fontScale.value = 'base'
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

  // Customizer visibility actions - CRITICAL FIX
  const toggleCustomizer = () => {
    console.log('[theme] toggleCustomizer - before VALUE:', isOpen.value)
    isOpen.value = !isOpen.value
    console.log('[theme] toggleCustomizer - after VALUE:', isOpen.value)
  }
  
  const openCustomizer = () => {
    console.log('[theme] openCustomizer - before VALUE:', isOpen.value)
    isOpen.value = true
    console.log('[theme] openCustomizer - after VALUE:', isOpen.value)
  }
  
  const closeCustomizer = () => {
    console.log('[theme] closeCustomizer - before VALUE:', isOpen.value)
    isOpen.value = false
    console.log('[theme] closeCustomizer - after VALUE:', isOpen.value)
  }

  const toggleDirection = () => {
    setDirection(direction.value === 'ltr' ? 'rtl' : 'ltr')
  }

<<<<<<< HEAD
  const getColorValue = (colorKey: string): string => {
    return getColorHex(colorKey)
  }

  // Client-side watchers and lifecycle
  if (import.meta.client) {
    // Watch for radius, direction, and font changes
    watch([currentRadius, direction, fontScale], () => {
      try {
        const root = document.documentElement
        root.setAttribute('data-radius', String(currentRadius.value))
        root.setAttribute('data-font', fontScale.value)
        root.setAttribute('dir', direction.value)
        root.style.setProperty('--radius', `${currentRadius.value}rem`)
      } catch (error) {
        console.error('[theme] Error in watcher:', error)
      }
    })

    // Watch for color mode changes
    watch(colorMode, applyDynamicVars, { immediate: false })

    // Initialize on mount
    onMounted(() => {
      // FORCE CLOSE on mount - this is critical
      console.log('[theme] onMounted - FORCING isOpen to false, was VALUE:', isOpen.value)
      isOpen.value = false
      console.log('[theme] onMounted - forced isOpen to VALUE:', isOpen.value)
      
      // Apply current theme
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

  // CRITICAL: Return the ACTUAL reactive refs, not readonly wrappers
=======
  // ---------- Watchers and Lifecycle ----------
  if (import.meta.client) {
    // Watch for color mode changes
    watch(colorMode, () => {
      console.log('Color mode changed:', colorMode.value)
      applyTheme()
    })

    watch(
      [currentPreset, currentPrimaryColor, currentNeutralColor, currentRadius, direction, fontScale],
      () => {
        console.log('Theme watcher triggered')
        applyTheme()
      },
      { immediate: true }
    )
  }

  // ---------- Setup resize handler ----------
  let resizeHandler: (() => void) | null = null

  // ---------- Mount handling ----------
  onMounted(() => {
    if (!import.meta.client) return
    
    console.log('useTheme onMounted')
    applyTheme()
    checkScreen()
    
    // Setup resize listener
    resizeHandler = checkScreen
    window?.addEventListener?.('resize', resizeHandler)
    
    // Color mode restore
    const savedMode = localStorage.getItem(LS_MODE)
    if (savedMode && themeConfig.modeOptions?.some(m => m.value === savedMode)) {
      colorMode.preference = savedMode
    } else {
      colorMode.preference = 'system'
    }
  })

  // ---------- Cleanup ----------
  onUnmounted(() => {
    if (resizeHandler && import.meta.client) {
      window?.removeEventListener?.('resize', resizeHandler)
      resizeHandler = null
    }
  })

  // ---------- Public API ----------
>>>>>>> defc675f949766f1cf0d1acb9fb477dbb2f27695
  return {
    // State - return the refs directly for full reactivity
    isOpen,  // This is the actual ref from global state
    currentPreset: readonly(currentPreset),
    currentPrimaryColor: readonly(currentPrimaryColor),
    currentNeutralColor: readonly(currentNeutralColor),
    currentRadius: readonly(currentRadius),
    direction: readonly(direction),
    fontScale: readonly(fontScale),
    
    // Computed
    currentPresetMeta,
    isCustomTheme,

<<<<<<< HEAD
    // Static config from theme.ts
    presets: computed(() => themeConfig.presets),
    primaryColors: computed(() => themeConfig.primaryColors),
    neutralColors: computed(() => themeConfig.neutralColors),
    modeOptions: computed(() => themeConfig.modeOptions),
    fontOptions: computed(() => themeConfig.fontOptions),
=======
    // metadata
    presetMetadata: readonly(presetMetadata),
>>>>>>> defc675f949766f1cf0d1acb9fb477dbb2f27695

    // Actions
    setPreset,
    setPrimaryColor,
    setNeutralColor,
    setRadius,
    setDirection,
    setFontScale,
    setColorMode,
    resetToDefaults,
    toggleCustomizer,
    openCustomizer,
    closeCustomizer,
    toggleDirection,
    getColorValue,
    applyTheme
  }
}
