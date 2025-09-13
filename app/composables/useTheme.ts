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
} from '@@/shared/ui/theme'

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
    spacing: ref<number>(
      getStoredValue(STORAGE_KEYS.SPACING, 1, (v) =>
        typeof v === 'number' && v >= 0.5 && v <= 3
      )
    ),
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
  const state = initializeGlobalState()
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

  const currentPresetMeta = computed(() => {
    return themeConfig.presets.find(p => p.value === currentPreset.value) || themeConfig.presets[0]
  })

  const isCustomTheme = computed(() => {
    return currentPresetMeta.value.supportsCustomColors === true
  })

  const computedShadowCSS = computed(() => {
    const config = shadowConfig.value
    if (!config) {
      return '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
    }
    try {
      return generateShadowCSS(config)
    } catch (error) {
      console.error('[theme] Error computing shadow CSS:', error)
      return '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
    }
  })

  // Only sets color variables, not shadow
  const applyDynamicVars = () => {
    if (!import.meta.client) return
    try {
      const root = document.documentElement
      const isDark = root.classList.contains('dark')
      if (isCustomTheme.value) {
        const primaryVars = primaryColorVars[currentPrimaryColor.value]
        if (primaryVars) {
          const primarySet = isDark ? primaryVars.dark : primaryVars.light
          Object.entries(primarySet).forEach(([key, value]) => {
            root.style.setProperty(key, value)
          })
        }
        const neutralVars = neutralColorVars[currentNeutralColor.value]
        if (neutralVars) {
          const neutralSet = isDark ? neutralVars.dark : neutralVars.light
          Object.entries(neutralSet).forEach(([key, value]) => {
            root.style.setProperty(key, value)
          })
        }
      }
    } catch (error) {
      console.error('[theme] Error applying dynamic vars:', error)
    }
  }

  // Only sets shadow variables
  const applyShadowVars = () => {
    if (!import.meta.client) return
    try {
      const root = document.documentElement
      const shadowCSS = computedShadowCSS.value
      root.style.setProperty('--custom-shadow', shadowCSS)
      root.style.setProperty('--shadow-custom', shadowCSS)

      // Update all shadcn components with the shadow class
      // Use [data-shadcn-shadow] for every shadcn component (Button, Card, Input, etc.)
      const shadcnElements = document.querySelectorAll('[data-shadcn-shadow]')
      shadcnElements.forEach((el: HTMLElement) => {
        el.style.boxShadow = shadowCSS
      })

      // Also update legacy shadow classes if present
      const shadowElements = document.querySelectorAll('.shadow-custom, .theme-shadow-update, .theme-shadow-update-force')
      shadowElements.forEach((el: any) => {
        if (el.style) {
          el.style.boxShadow = shadowCSS
        }
      })
    } catch (error) {
      console.error('[theme] Error applying shadow vars:', error)
    }
  }


  const applyTheme = () => {
    if (!import.meta.client) return
    try {
      const root = document.documentElement
      root.setAttribute('data-preset', currentPreset.value)
      root.setAttribute('data-primary', currentPrimaryColor.value)
      root.setAttribute('data-neutral', currentNeutralColor.value)
      root.setAttribute('data-radius', String(currentRadius.value))
      root.setAttribute('data-font', fontScale.value)
      root.setAttribute('dir', direction.value)
      root.setAttribute('data-spacing', String(spacing.value))
      root.style.setProperty('--radius', `${currentRadius.value}rem`)
      root.style.setProperty('--spacing-multiplier', String(spacing.value))
      applyDynamicVars()
      applyShadowVars()
      root.classList.add('theme-animate')
    } catch (error) {
      console.error('[theme] Error applying theme:', error)
    }
  }

  // State management actions
  const setPreset = (preset: ThemePreset) => {
    currentPreset.value = preset
    setStoredValue(STORAGE_KEYS.PRESET, preset)
    nextTick(() => applyTheme())
  }

  const setPrimaryColor = (color: string) => {
    currentPrimaryColor.value = color
    setStoredValue(STORAGE_KEYS.PRIMARY, color)
    nextTick(() => applyDynamicVars())
  }

  const setNeutralColor = (color: string) => {
    currentNeutralColor.value = color
    setStoredValue(STORAGE_KEYS.NEUTRAL, color)
    nextTick(() => applyDynamicVars())
  }

  const setRadius = (radius: number) => {
    const clamped = Math.min(2, Math.max(0, radius))
    currentRadius.value = clamped
    setStoredValue(STORAGE_KEYS.RADIUS, clamped)
    nextTick(() => applyTheme())
  }

  const setDirection = (dir: Direction) => {
    direction.value = dir
    setStoredValue(STORAGE_KEYS.DIRECTION, dir)
    nextTick(() => applyTheme())
  }

  const setFontScale = (scale: FontScale) => {
    fontScale.value = scale
    setStoredValue(STORAGE_KEYS.FONT, scale)
    nextTick(() => applyTheme())
  }

  const setSpacing = (spacingValue: number) => {
    const clamped = Math.min(3, Math.max(0.5, spacingValue))
    spacing.value = clamped
    setStoredValue(STORAGE_KEYS.SPACING, clamped)
    nextTick(() => applyTheme())
  }

  // Shadow configuration setters
  const setShadowColorType = (colorType: 'custom' | 'tailwind') => {
    shadowConfig.value = { ...shadowConfig.value, colorType }
    setStoredValue(STORAGE_KEYS.SHADOW_CONFIG, shadowConfig.value)
  }

  const setShadowCustomColor = (color: string) => {
    shadowConfig.value = { ...shadowConfig.value, customColor: color, colorType: 'custom' }
    setStoredValue(STORAGE_KEYS.SHADOW_CONFIG, shadowConfig.value)
  }

  const setShadowTailwindColor = (color: string) => {
    shadowConfig.value = { ...shadowConfig.value, tailwindColor: color, colorType: 'tailwind' }
    setStoredValue(STORAGE_KEYS.SHADOW_CONFIG, shadowConfig.value)
  }

  const setShadowOpacity = (opacity: number) => {
    const clamped = Math.min(100, Math.max(0, opacity))
    shadowConfig.value = { ...shadowConfig.value, opacity: clamped }
    setStoredValue(STORAGE_KEYS.SHADOW_CONFIG, shadowConfig.value)
  }

  const setShadowBlurRadius = (blurRadius: number) => {
    const clamped = Math.min(50, Math.max(0, blurRadius))
    shadowConfig.value = { ...shadowConfig.value, blurRadius: clamped }
    setStoredValue(STORAGE_KEYS.SHADOW_CONFIG, shadowConfig.value)
  }

  const setShadowSpread = (spread: number) => {
    const clamped = Math.min(25, Math.max(-25, spread))
    shadowConfig.value = { ...shadowConfig.value, spread: clamped }
    setStoredValue(STORAGE_KEYS.SHADOW_CONFIG, shadowConfig.value)
  }

  const setShadowOffsetX = (offsetX: number) => {
    const clamped = Math.min(25, Math.max(-25, offsetX))
    shadowConfig.value = { ...shadowConfig.value, offsetX: clamped }
    setStoredValue(STORAGE_KEYS.SHADOW_CONFIG, shadowConfig.value)
  }

  const setShadowOffsetY = (offsetY: number) => {
    const clamped = Math.min(25, Math.max(-25, offsetY))
    shadowConfig.value = { ...shadowConfig.value, offsetY: clamped }
    setStoredValue(STORAGE_KEYS.SHADOW_CONFIG, shadowConfig.value)
  }

  const setColorMode = (mode: string) => {
    colorMode.preference = mode
    setStoredValue(STORAGE_KEYS.MODE, mode)
  }

  const resetToDefaults = () => {
    currentPreset.value = 'default'
    currentPrimaryColor.value = 'violet'
    currentNeutralColor.value = 'slate'
    currentRadius.value = 0.5
    direction.value = 'ltr'
    fontScale.value = 'base'
    spacing.value = 1
    shadowConfig.value = { ...defaultShadowConfig }
    colorMode.preference = 'system'
    if (import.meta.client) {
      Object.values(STORAGE_KEYS).forEach(key => {
        try {
          localStorage.removeItem(key)
        } catch (error) {
          console.warn(`Failed to remove ${key}:`, error)
        }
      })
    }
    nextTick(() => applyTheme())
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

  // Watchers
  if (import.meta.client) {
    watch([currentRadius, direction, fontScale, spacing], () => {
      const root = document.documentElement
      root.setAttribute('data-radius', String(currentRadius.value))
      root.setAttribute('data-font', fontScale.value)
      root.setAttribute('dir', direction.value)
      root.setAttribute('data-spacing', String(spacing.value))
      root.style.setProperty('--radius', `${currentRadius.value}rem`)
      root.style.setProperty('--spacing-multiplier', String(spacing.value))
    }, { immediate: false })

    // Only update shadow when shadowConfig changes
    watch(shadowConfig, () => {
      applyShadowVars()
    }, { deep: true, immediate: true })

    // Only update colors when colorMode changes
    watch(colorMode, () => {
      applyDynamicVars()
    }, { immediate: false })

    onMounted(() => {
      isOpen.value = false
      nextTick(() => {
        applyTheme()
      })
    })
  }

  return {
    isOpen,
    currentPreset: readonly(currentPreset),
    currentPrimaryColor: readonly(currentPrimaryColor),
    currentNeutralColor: readonly(currentNeutralColor),
    currentRadius: readonly(currentRadius),
    direction: readonly(direction),
    fontScale: readonly(fontScale),
    spacing: readonly(spacing),
    shadowConfig: readonly(shadowConfig),
    currentPresetMeta,
    isCustomTheme,
    computedShadowCSS,
    presets: computed(() => themeConfig.presets),
    primaryColors: computed(() => themeConfig.primaryColors),
    neutralColors: computed(() => themeConfig.neutralColors),
    shadowColors: computed(() => themeConfig.shadowColors),
    modeOptions: computed(() => themeConfig.modeOptions),
    fontOptions: computed(() => themeConfig.fontOptions),
    setPreset,
    setPrimaryColor,
    setNeutralColor,
    setRadius,
    setDirection,
    setFontScale,
    setColorMode,
    setSpacing,
    setShadowColorType,
    setShadowCustomColor,
    setShadowTailwindColor,
    setShadowOpacity,
    setShadowBlurRadius,
    setShadowSpread,
    setShadowOffsetX,
    setShadowOffsetY,
    resetToDefaults,
    toggleCustomizer,
    openCustomizer,
    closeCustomizer,
    toggleDirection,
    getColorValue,
    applyTheme,
    forceShadowUpdate: () => {
      applyShadowVars()
    }
  }
}
