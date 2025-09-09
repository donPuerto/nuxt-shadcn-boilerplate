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

  // ---------- Dynamic CSS Loading ----------
  let currentPresetLink: HTMLLinkElement | null = null

  const loadPresetCSS = async (preset: ThemePreset) => {
    if (!import.meta.client) return
    console.log('loadPresetCSS called with:', preset)

    // Remove existing preset CSS
    if (currentPresetLink) {
      console.log('Removing existing preset CSS')
      currentPresetLink.remove()
      currentPresetLink = null
    }

    // Don't load CSS for default preset - it uses the base CSS
    if (preset === 'default') {
      console.log('Default preset - no CSS to load')
      return
    }

    // Load the preset CSS file
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = `/assets/css/presets/${preset}.css`
    link.dataset.themePreset = preset
    
    console.log('Loading preset CSS:', link.href)
    
    // Insert after the main stylesheet
    const mainStylesheet = document.querySelector('link[href*="main.css"]')
    if (mainStylesheet && mainStylesheet.parentNode) {
      mainStylesheet.parentNode.insertBefore(link, mainStylesheet.nextSibling)
    } else {
      document.head.appendChild(link)
    }
    
    currentPresetLink = link

    return new Promise((resolve, reject) => {
      link.onload = () => {
        console.log('Preset CSS loaded successfully')
        resolve(true)
      }
      link.onerror = () => {
        console.error('Failed to load preset CSS')
        reject(false)
      }
    })
  }

  // ---------- Theme Application ----------
  const applyTheme = async () => {
    if (!import.meta.client) return
    console.log('applyTheme called')
    const root = document.documentElement

    // Load preset CSS if needed
    try {
      await loadPresetCSS(currentPreset.value)
    } catch (error) {
      console.warn(`Failed to load preset CSS for ${currentPreset.value}:`, error)
    }

    // Set data attributes
    root.setAttribute('data-preset', currentPreset.value)
    root.setAttribute('data-radius', currentRadius.value.toString())
    root.setAttribute('data-font', fontScale.value)
    root.setAttribute('dir', direction.value)

    // Only set individual color attributes for default/custom theme
    if (currentPreset.value === 'default') {
      root.setAttribute('data-primary', currentPrimaryColor.value)
      root.setAttribute('data-neutral', currentNeutralColor.value)
      root.setAttribute('data-theme', currentNeutralColor.value)
    } else {
      // Remove individual color attributes when using presets
      root.removeAttribute('data-primary')
      root.removeAttribute('data-neutral') 
      root.removeAttribute('data-theme')
    }

    // Set CSS custom properties for radius (convert to rem)
    const radiusRem = currentRadius.value * 0.625
    root.style.setProperty('--radius', `${radiusRem}rem`)

    console.log('Theme applied:', {
      preset: currentPreset.value,
      primary: currentPrimaryColor.value,
      neutral: currentNeutralColor.value,
      radius: currentRadius.value,
      direction: direction.value
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
