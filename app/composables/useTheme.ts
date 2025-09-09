import { themeConfig } from '~~/shared'
import type { ThemePreset } from '~~/shared'

type Direction = 'ltr' | 'rtl'
type FontScale = 'sm' | 'base' | 'md' | 'lg'

const LS_PRESET      = 'theme-preset'
const LS_PRIMARY     = 'theme-primary-color'
const LS_NEUTRAL     = 'theme-neutral-color'
const LS_RADIUS      = 'theme-radius'
const LS_MODE        = 'theme-mode'
const LS_DIRECTION   = 'theme-direction'
const LS_FONT        = 'theme-font-scale'

export const useTheme = () => {
  const colorMode = useColorMode()

  // ---------- Initializers ----------
  const getInitialPreset = (): ThemePreset => {
    if (import.meta.client) {
      const saved = localStorage.getItem(LS_PRESET) as ThemePreset | null
      if (saved && themeConfig.presets?.map(p => p.value).includes(saved)) return saved
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
  
  const getInitialNeutralColor = () => {
    if (import.meta.client) {
      const saved = localStorage.getItem(LS_NEUTRAL)
      if (saved && themeConfig.neutralColors?.map(c => c.value).includes(saved)) return saved
    }
    return 'slate'
  }
  
  const getInitialRadius = () => {
    if (import.meta.client) {
      const saved = localStorage.getItem(LS_RADIUS)
      if (saved) {
        const v = parseFloat(saved)
        if (!Number.isNaN(v) && v >= 0 && v <= 2) return v
      }
    }
    return 0.5
  }
  
  const getInitialDirection = (): Direction => {
    if (import.meta.client) {
      const saved = localStorage.getItem(LS_DIRECTION) as Direction | null
      if (saved === 'ltr' || saved === 'rtl') return saved
    }
    return 'ltr'
  }
  
  const getInitialFontScale = (): FontScale => {
    if (import.meta.client) {
      const saved = localStorage.getItem(LS_FONT) as FontScale | null
      if (saved && ['sm','base','md','lg'].includes(saved)) return saved
    }
    return 'base'
  }

  // ---------- State (SSR safe) ----------
  const isOpen               = useState<boolean>('theme-customizer-open', () => false)
  const currentPreset        = useState<ThemePreset>('theme-current-preset', getInitialPreset)
  const currentPrimaryColor  = useState<string>('theme-current-primary-color', getInitialPrimaryColor)
  const currentNeutralColor  = useState<string>('theme-current-neutral-color', getInitialNeutralColor)
  const currentRadius        = useState<number>('theme-current-radius', getInitialRadius)
  const direction            = useState<Direction>('theme-direction', getInitialDirection)
  const fontScale            = useState<FontScale>('theme-font-scale', getInitialFontScale)

  // ---------- Computed values ----------
  const isCustomTheme = computed(() => currentPreset.value === 'default')

  // ---------- Screen helpers ----------
  const isMobile    = ref(false)
  const screenWidth = ref(0)
  const checkScreen = () => {
    if (!import.meta.client) return
    screenWidth.value = window.innerWidth
    isMobile.value = window.innerWidth < 640
    if (isMobile.value && isOpen.value) isOpen.value = false
  }

  // ---------- Preset Theme Definitions ----------
  const presetThemes = {
    default: {
      // Uses individual color settings
    },
    vercel: {
      light: {
        background: 'oklch(0.9900 0 0)',
        foreground: 'oklch(0 0 0)',
        card: 'oklch(1 0 0)',
        'card-foreground': 'oklch(0 0 0)',
        popover: 'oklch(0.9900 0 0)',
        'popover-foreground': 'oklch(0 0 0)',
        primary: 'oklch(0 0 0)',
        'primary-foreground': 'oklch(1 0 0)',
        secondary: 'oklch(0.9400 0 0)',
        'secondary-foreground': 'oklch(0 0 0)',
        muted: 'oklch(0.9700 0 0)',
        'muted-foreground': 'oklch(0.4400 0 0)',
        accent: 'oklch(0.9400 0 0)',
        'accent-foreground': 'oklch(0 0 0)',
        destructive: 'oklch(0.6300 0.1900 23.0300)',
        'destructive-foreground': 'oklch(1 0 0)',
        border: 'oklch(0.9200 0 0)',
        input: 'oklch(0.9400 0 0)',
        ring: 'oklch(0 0 0)',
        radius: '0.5rem'
      },
      dark: {
        background: 'oklch(0 0 0)',
        foreground: 'oklch(1 0 0)',
        card: 'oklch(0.1400 0 0)',
        'card-foreground': 'oklch(1 0 0)',
        popover: 'oklch(0.1800 0 0)',
        'popover-foreground': 'oklch(1 0 0)',
        primary: 'oklch(1 0 0)',
        'primary-foreground': 'oklch(0 0 0)',
        secondary: 'oklch(0.2500 0 0)',
        'secondary-foreground': 'oklch(1 0 0)',
        muted: 'oklch(0.2300 0 0)',
        'muted-foreground': 'oklch(0.7200 0 0)',
        accent: 'oklch(0.3200 0 0)',
        'accent-foreground': 'oklch(1 0 0)',
        destructive: 'oklch(0.6900 0.2000 23.9100)',
        'destructive-foreground': 'oklch(0 0 0)',
        border: 'oklch(0.2600 0 0)',
        input: 'oklch(0.3200 0 0)',
        ring: 'oklch(0.7200 0 0)',
        radius: '0.5rem'
      }
    },
    cosmicNight: {
      light: {
        background: 'oklch(0.98 0.02 280)',
        foreground: 'oklch(0.15 0.05 280)',
        card: 'oklch(1 0 0)',
        'card-foreground': 'oklch(0.15 0.05 280)',
        popover: 'oklch(1 0 0)',
        'popover-foreground': 'oklch(0.15 0.05 280)',
        primary: 'oklch(0.35 0.15 280)',
        'primary-foreground': 'oklch(0.98 0.02 280)',
        secondary: 'oklch(0.92 0.05 280)',
        'secondary-foreground': 'oklch(0.25 0.08 280)',
        muted: 'oklch(0.95 0.02 280)',
        'muted-foreground': 'oklch(0.45 0.05 280)',
        accent: 'oklch(0.90 0.08 280)',
        'accent-foreground': 'oklch(0.25 0.08 280)',
        destructive: 'oklch(0.65 0.20 25)',
        'destructive-foreground': 'oklch(0.98 0.02 280)',
        border: 'oklch(0.88 0.05 280)',
        input: 'oklch(0.92 0.05 280)',
        ring: 'oklch(0.35 0.15 280)',
        radius: '0.75rem'
      },
      dark: {
        background: 'oklch(0.08 0.05 280)',
        foreground: 'oklch(0.95 0.02 280)',
        card: 'oklch(0.12 0.08 280)',
        'card-foreground': 'oklch(0.95 0.02 280)',
        popover: 'oklch(0.12 0.08 280)',
        'popover-foreground': 'oklch(0.95 0.02 280)',
        primary: 'oklch(0.65 0.20 280)',
        'primary-foreground': 'oklch(0.08 0.05 280)',
        secondary: 'oklch(0.18 0.10 280)',
        'secondary-foreground': 'oklch(0.85 0.05 280)',
        muted: 'oklch(0.15 0.08 280)',
        'muted-foreground': 'oklch(0.65 0.05 280)',
        accent: 'oklch(0.25 0.12 280)',
        'accent-foreground': 'oklch(0.85 0.05 280)',
        destructive: 'oklch(0.70 0.25 25)',
        'destructive-foreground': 'oklch(0.08 0.05 280)',
        border: 'oklch(0.20 0.10 280)',
        input: 'oklch(0.18 0.10 280)',
        ring: 'oklch(0.65 0.20 280)',
        radius: '0.75rem'
      }
    },
    twitter: {
      light: {
        background: 'oklch(1 0 0)',
        foreground: 'oklch(0.15 0 0)',
        card: 'oklch(1 0 0)',
        'card-foreground': 'oklch(0.15 0 0)',
        popover: 'oklch(1 0 0)',
        'popover-foreground': 'oklch(0.15 0 0)',
        primary: 'oklch(0.60 0.20 230)',
        'primary-foreground': 'oklch(1 0 0)',
        secondary: 'oklch(0.97 0.01 230)',
        'secondary-foreground': 'oklch(0.25 0.02 230)',
        muted: 'oklch(0.97 0.01 230)',
        'muted-foreground': 'oklch(0.45 0.02 230)',
        accent: 'oklch(0.95 0.02 230)',
        'accent-foreground': 'oklch(0.25 0.02 230)',
        destructive: 'oklch(0.65 0.20 25)',
        'destructive-foreground': 'oklch(1 0 0)',
        border: 'oklch(0.90 0.02 230)',
        input: 'oklch(0.95 0.02 230)',
        ring: 'oklch(0.60 0.20 230)',
        radius: '0.5rem'
      },
      dark: {
        background: 'oklch(0.08 0 0)',
        foreground: 'oklch(0.95 0 0)',
        card: 'oklch(0.12 0 0)',
        'card-foreground': 'oklch(0.95 0 0)',
        popover: 'oklch(0.12 0 0)',
        'popover-foreground': 'oklch(0.95 0 0)',
        primary: 'oklch(0.65 0.20 230)',
        'primary-foreground': 'oklch(0.08 0 0)',
        secondary: 'oklch(0.18 0.02 230)',
        'secondary-foreground': 'oklch(0.85 0.02 230)',
        muted: 'oklch(0.15 0.02 230)',
        'muted-foreground': 'oklch(0.65 0.02 230)',
        accent: 'oklch(0.22 0.05 230)',
        'accent-foreground': 'oklch(0.85 0.02 230)',
        destructive: 'oklch(0.70 0.25 25)',
        'destructive-foreground': 'oklch(0.08 0 0)',
        border: 'oklch(0.20 0.02 230)',
        input: 'oklch(0.18 0.02 230)',
        ring: 'oklch(0.65 0.20 230)',
        radius: '0.5rem'
      }
    },
    claude: {
      light: {
        background: 'oklch(0.98 0.02 60)',
        foreground: 'oklch(0.15 0.05 30)',
        card: 'oklch(1 0 0)',
        'card-foreground': 'oklch(0.15 0.05 30)',
        popover: 'oklch(1 0 0)',
        'popover-foreground': 'oklch(0.15 0.05 30)',
        primary: 'oklch(0.55 0.15 60)',
        'primary-foreground': 'oklch(0.98 0.02 60)',
        secondary: 'oklch(0.92 0.05 60)',
        'secondary-foreground': 'oklch(0.25 0.08 30)',
        muted: 'oklch(0.95 0.02 60)',
        'muted-foreground': 'oklch(0.45 0.05 30)',
        accent: 'oklch(0.90 0.08 60)',
        'accent-foreground': 'oklch(0.25 0.08 30)',
        destructive: 'oklch(0.65 0.20 25)',
        'destructive-foreground': 'oklch(0.98 0.02 60)',
        border: 'oklch(0.88 0.05 60)',
        input: 'oklch(0.92 0.05 60)',
        ring: 'oklch(0.55 0.15 60)',
        radius: '0.75rem'
      },
      dark: {
        background: 'oklch(0.08 0.05 30)',
        foreground: 'oklch(0.95 0.02 60)',
        card: 'oklch(0.12 0.08 30)',
        'card-foreground': 'oklch(0.95 0.02 60)',
        popover: 'oklch(0.12 0.08 30)',
        'popover-foreground': 'oklch(0.95 0.02 60)',
        primary: 'oklch(0.65 0.20 60)',
        'primary-foreground': 'oklch(0.08 0.05 30)',
        secondary: 'oklch(0.18 0.10 30)',
        'secondary-foreground': 'oklch(0.85 0.05 60)',
        muted: 'oklch(0.15 0.08 30)',
        'muted-foreground': 'oklch(0.65 0.05 30)',
        accent: 'oklch(0.25 0.12 60)',
        'accent-foreground': 'oklch(0.85 0.05 60)',
        destructive: 'oklch(0.70 0.25 25)',
        'destructive-foreground': 'oklch(0.08 0.05 30)',
        border: 'oklch(0.20 0.10 30)',
        input: 'oklch(0.18 0.10 30)',
        ring: 'oklch(0.65 0.20 60)',
        radius: '0.75rem'
      }
    }
  }

  // ---------- Persistence setters ----------
  const setPreset = (preset: ThemePreset) => {
    console.log('setPreset called with:', preset)
    const validPresets = ['default', 'vercel', 'cosmicNight', 'twitter', 'claude']
    if (!validPresets.includes(preset)) {
      console.warn('Invalid preset:', preset)
      return
    }
    currentPreset.value = preset
    if (import.meta.client) localStorage.setItem(LS_PRESET, preset)
    applyTheme()
  }

  const setPrimaryColor = (c: string) => {
    console.log('setPrimaryColor called with:', c)
    // Only allow primary color changes in default/custom mode
    if (currentPreset.value !== 'default') {
      console.log('Primary color change ignored - not in default preset')
      return
    }
    const validColors = themeConfig.primaryColors?.map(color => color.value) || []
    if (!validColors.includes(c)) {
      console.warn('Invalid primary color:', c)
      return
    }
    currentPrimaryColor.value = c
    if (import.meta.client) localStorage.setItem(LS_PRIMARY, c)
    applyTheme()
  }
  
  const setNeutralColor = (c: string) => {
    console.log('setNeutralColor called with:', c)
    // Only allow neutral color changes in default/custom mode
    if (currentPreset.value !== 'default') {
      console.log('Neutral color change ignored - not in default preset')
      return
    }
    const validColors = themeConfig.neutralColors?.map(color => color.value) || []
    if (!validColors.includes(c)) {
      console.warn('Invalid neutral color:', c)
      return
    }
    currentNeutralColor.value = c
    if (import.meta.client) localStorage.setItem(LS_NEUTRAL, c)
    applyTheme()
  }
  
  const setRadius = (r: number) => {
    console.log('setRadius called with:', r)
    const clamped = Math.min(2, Math.max(0, r))
    currentRadius.value = clamped
    if (import.meta.client) localStorage.setItem(LS_RADIUS, String(clamped))
    applyTheme()
  }
  
  const setColorMode = (mode: string) => {
    console.log('setColorMode called with:', mode)
    colorMode.preference = mode
    if (import.meta.client) localStorage.setItem(LS_MODE, mode)
  }
  
  const setDirection = (dir: Direction) => {
    console.log('setDirection called with:', dir)
    direction.value = dir
    if (import.meta.client) localStorage.setItem(LS_DIRECTION, dir)
    applyTheme()
  }
  
  const toggleDirection = () => setDirection(direction.value === 'ltr' ? 'rtl' : 'ltr')
  
  const setFontScale = (s: FontScale) => {
    console.log('setFontScale called with:', s)
    fontScale.value = s
    if (import.meta.client) localStorage.setItem(LS_FONT, s)
    applyTheme()
  }

  const resetToDefaults = () => {
    console.log('resetToDefaults called')
    setPreset('default')
    setPrimaryColor('violet')
    setNeutralColor('slate')
    setRadius(0.5)
    setColorMode('system')
    setDirection('ltr')
    setFontScale('base')
    if (import.meta.client) {
      [LS_PRESET, LS_PRIMARY, LS_NEUTRAL, LS_RADIUS, LS_MODE, LS_DIRECTION, LS_FONT].forEach(k => localStorage.removeItem(k))
    }
    applyTheme()
  }

  const toggleCustomizer = () => {
    console.log('toggleCustomizer called, current isOpen:', isOpen.value)
    if (isMobile.value && !isOpen.value) {
      console.log('Prevented opening on mobile')
      return
    }
    isOpen.value = !isOpen.value
    console.log('toggleCustomizer after toggle:', isOpen.value)
    if (import.meta.client) document.documentElement.classList.add('theme-animate')
  }
  
  const openCustomizer = () => {
    console.log('openCustomizer called')
    if (isMobile.value) {
      console.log('Prevented opening on mobile')
      return
    }
    isOpen.value = true
  }
  
  const closeCustomizer = () => {
    console.log('closeCustomizer called')
    isOpen.value = false
  }

  // ---------- Apply CSS Variables ----------
  const applyCSSVariables = (variables: Record<string, string>) => {
    if (!import.meta.client) return
    const root = document.documentElement
    
    Object.entries(variables).forEach(([key, value]) => {
      root.style.setProperty(`--${key}`, value)
    })
  }

  // ---------- Theme Application ----------
  const applyTheme = async () => {
    if (!import.meta.client) return
    console.log('applyTheme called')
    const root = document.documentElement

    // Set data attributes
    root.setAttribute('data-preset', currentPreset.value)
    root.setAttribute('data-radius', currentRadius.value.toString())
    root.setAttribute('data-font', fontScale.value)
    root.setAttribute('dir', direction.value)

    // Apply preset theme or custom theme
    if (currentPreset.value !== 'default' && presetThemes[currentPreset.value]) {
      const preset = presetThemes[currentPreset.value]
      const isDark = colorMode.value === 'dark'
      const themeVariables = isDark ? preset.dark : preset.light
      
      console.log('Applying preset theme:', currentPreset.value, isDark ? 'dark' : 'light')
      applyCSSVariables(themeVariables)
      
      // Remove individual color attributes when using presets
      root.removeAttribute('data-primary')
      root.removeAttribute('data-neutral') 
      root.removeAttribute('data-theme')
    } else {
      // Apply custom theme with individual colors
      console.log('Applying custom/default theme')
      root.setAttribute('data-primary', currentPrimaryColor.value)
      root.setAttribute('data-neutral', currentNeutralColor.value)
      root.setAttribute('data-theme', currentNeutralColor.value)
    }

    // Always apply custom radius (overrides preset radius if user changes it)
    const radiusRem = currentRadius.value * 0.625
    root.style.setProperty('--radius', `${radiusRem}rem`)

    console.log('Theme applied:', {
      preset: currentPreset.value,
      primary: currentPrimaryColor.value,
      neutral: currentNeutralColor.value,
      radius: currentRadius.value,
      direction: direction.value,
      mode: colorMode.value
    })
  }

  // ---------- Helpers ----------
  const getColorValue = (name: string) => {
    const colorMap: Record<string, string> = {
      violet: '#8b5cf6',
      blue: '#3b82f6',
      green: '#22c55e',
      amber: '#f59e0b',
      red: '#ef4444',
      rose: '#f43f5e',
      slate: '#64748b',
      gray: '#6b7280',
      zinc: '#71717a',
      neutral: '#737373',
      stone: '#78716c'
    }
    return colorMap[name] || '#000'
  }
  
  const getColorCategory = (name: string) => {
    return 'custom'
  }

  // ---------- Watchers ----------
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
    
    onMounted(() => {
      console.log('useTheme onMounted')
      applyTheme()
      checkScreen()
      window.addEventListener('resize', checkScreen)
      onUnmounted(() => window.removeEventListener('resize', checkScreen))
    })
  }

  // ---------- Color mode restore ----------
  onMounted(() => {
    if (!import.meta.client) return
    const savedMode = localStorage.getItem(LS_MODE)
    if (savedMode && themeConfig.modeOptions?.some(m => m.value === savedMode)) {
      colorMode.preference = savedMode
    } else {
      colorMode.preference = 'system'
    }
    applyTheme()
  })

  // ---------- Public API ----------
  return {
    // state (readonly)
    isOpen: readonly(isOpen),
    currentPreset: readonly(currentPreset),
    currentPrimaryColor: readonly(currentPrimaryColor),
    currentNeutralColor: readonly(currentNeutralColor),
    currentRadius: readonly(currentRadius),
    direction: readonly(direction),
    fontScale: readonly(fontScale),
    isMobile: readonly(isMobile),
    screenWidth: readonly(screenWidth),
    isCustomTheme: readonly(isCustomTheme),

    // config (pass-through)
    presets: themeConfig.presets || [],
    primaryColors: themeConfig.primaryColors?.map(c => c.value) || [],
    neutralColors: themeConfig.neutralColors?.map(c => c.value) || [],
    modeOptions: themeConfig.modeOptions || [],

    // actions
    toggleCustomizer,
    openCustomizer,
    closeCustomizer,
    setPreset,
    setPrimaryColor,
    setNeutralColor,
    setRadius,
    setColorMode,
    setDirection,
    toggleDirection,
    setFontScale,
    resetToDefaults,
    getColorValue,
    getColorCategory,
    applyTheme
  }
}
