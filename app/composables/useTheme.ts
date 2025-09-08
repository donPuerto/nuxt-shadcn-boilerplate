import { themeConfig } from '~~/shared' // Ensure themeConfig exported from shared (primaryColors, neutralColors, colorDefinitions, etc.)

type Direction = 'ltr' | 'rtl'
type FontScale = 'sm' | 'base' | 'md' | 'lg'

const LS_PRIMARY    = 'theme-primary-color'
const LS_NEUTRAL    = 'theme-neutral-color'
const LS_RADIUS     = 'theme-radius'
const LS_MODE       = 'theme-mode'
const LS_DIRECTION  = 'theme-direction'
const LS_FONT       = 'theme-font-scale'

export const useTheme = () => {
  const colorMode = useColorMode()

  // ---------- Initializers ----------
  const getInitialPrimaryColor = () => {
    if (import.meta.client) {
      const saved = localStorage.getItem(LS_PRIMARY)
      if (saved && themeConfig.primaryColors.includes(saved)) return saved
    }
    return themeConfig.primaryColor
  }
  const getInitialNeutralColor = () => {
    if (import.meta.client) {
      const saved = localStorage.getItem(LS_NEUTRAL)
      if (saved && themeConfig.neutralColors.includes(saved)) return saved
    }
    return themeConfig.neutralColor
  }
  const getInitialRadius = () => {
    if (import.meta.client) {
      const saved = localStorage.getItem(LS_RADIUS)
      if (saved) {
        const v = parseFloat(saved)
        if (!Number.isNaN(v) && v >= 0 && v <= 1) return v
      }
    }
    return themeConfig.radius
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
  const currentPrimaryColor  = useState<string>('theme-current-primary-color', getInitialPrimaryColor)
  const currentNeutralColor  = useState<string>('theme-current-neutral-color', getInitialNeutralColor)
  const currentRadius        = useState<number>('theme-current-radius', getInitialRadius)
  const direction            = useState<Direction>('theme-direction', getInitialDirection)
  const fontScale            = useState<FontScale>('theme-font-scale', getInitialFontScale)

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
  const setPrimaryColor = (c: string) => {
    if (!themeConfig.primaryColors.includes(c)) return
    currentPrimaryColor.value = c
    if (import.meta.client) localStorage.setItem(LS_PRIMARY, c)
  }
  const setNeutralColor = (c: string) => {
    if (!themeConfig.neutralColors.includes(c)) return
    currentNeutralColor.value = c
    if (import.meta.client) localStorage.setItem(LS_NEUTRAL, c)
  }
  const setRadius = (r: number) => {
    const clamped = Math.min(1, Math.max(0, r))
    currentRadius.value = clamped
    if (import.meta.client) localStorage.setItem(LS_RADIUS, String(clamped))
  }
  const setColorMode = (mode: string) => {
    colorMode.preference = mode
    if (import.meta.client) localStorage.setItem(LS_MODE, mode)
  }
  const setDirection = (dir: Direction) => {
    direction.value = dir
    if (import.meta.client) localStorage.setItem(LS_DIRECTION, dir)
  }
  const toggleDirection = () => setDirection(direction.value === 'ltr' ? 'rtl' : 'ltr')
  const setFontScale = (s: FontScale) => {
    fontScale.value = s
    if (import.meta.client) localStorage.setItem(LS_FONT, s)
  }

  const resetToDefaults = () => {
    setPrimaryColor(themeConfig.primaryColor)
    setNeutralColor(themeConfig.neutralColor)
    setRadius(themeConfig.radius)
    setColorMode(themeConfig.mode)
    setDirection('ltr')
    setFontScale('base')
    if (import.meta.client) {
      [LS_PRIMARY, LS_NEUTRAL, LS_RADIUS, LS_MODE, LS_DIRECTION, LS_FONT].forEach(k => localStorage.removeItem(k))
    }
    applyTheme()
  }

  const toggleCustomizer = () => {
    if (isMobile.value && !isOpen.value) return
    isOpen.value = !isOpen.value
    if (import.meta.client) document.documentElement.classList.add('theme-animate')
  }
  const closeCustomizer = () => { isOpen.value = false }

  // ---------- Helpers ----------
  const getColorValue = (name: string) => {
    const def = themeConfig.colorDefinitions[name as keyof typeof themeConfig.colorDefinitions]
    return def?.primary
  }
  const getColorCategory = (name: string) => {
    const def = themeConfig.colorDefinitions[name as keyof typeof themeConfig.colorDefinitions]
    return def?.category || 'custom'
  }

  // ---------- Theme Application ----------
  const applyTheme = () => {
    if (!import.meta.client) return
    const root = document.documentElement

    // Attributes
    root.setAttribute('data-theme-primary', currentPrimaryColor.value)
    root.setAttribute('data-theme-neutral', currentNeutralColor.value)
    root.setAttribute('data-radius', currentRadius.value.toString())
    root.setAttribute('data-font', fontScale.value)
    root.setAttribute('dir', direction.value)

    // Radius (map 0..1 -> 4px..18px)
    const minR = 4
    const maxR = 18
    const rPx = minR + (maxR - minR) * currentRadius.value
    root.style.setProperty('--radius', rPx + 'px')

    // Primary definition
    const pDef = themeConfig.colorDefinitions[currentPrimaryColor.value as keyof typeof themeConfig.colorDefinitions]
    if (pDef) {
      root.style.setProperty('--primary', pDef.primary)
      if (pDef.contrast) root.style.setProperty('--primary-foreground', pDef.contrast)
      root.style.setProperty('--ring', pDef.ring ?? pDef.primary)
    }

    // Neutral definition
    const nDef = themeConfig.colorDefinitions[currentNeutralColor.value as keyof typeof themeConfig.colorDefinitions]
    if (nDef) {
      root.style.setProperty('--background', nDef.background ?? nDef.primary)
      root.style.setProperty('--card', nDef.card ?? nDef.background ?? nDef.primary)
      root.style.setProperty('--popover', nDef.popover ?? nDef.card ?? nDef.background ?? nDef.primary)
      root.style.setProperty('--foreground', nDef.foreground ?? '#111')
      root.style.setProperty('--muted', nDef.muted ?? nDef.background ?? nDef.primary)
      root.style.setProperty('--muted-foreground', nDef.mutedForeground ?? '#666')
      root.style.setProperty('--border', nDef.border ?? 'rgba(0,0,0,0.14)')
      root.style.setProperty('--input', nDef.input ?? nDef.border ?? 'rgba(0,0,0,0.14)')
      root.style.setProperty('--accent', nDef.accent ?? nDef.muted ?? nDef.primary)
      root.style.setProperty('--accent-foreground', nDef.accentForeground ?? nDef.foreground ?? '#111')
      root.style.setProperty('--secondary', nDef.secondary ?? nDef.accent ?? nDef.primary)
      root.style.setProperty('--secondary-foreground', nDef.secondaryForeground ?? nDef.accentForeground ?? nDef.foreground ?? '#111')
      root.style.setProperty('--destructive', nDef.destructive ?? '#b3261e')
      root.style.setProperty('--destructive-foreground', nDef.destructiveForeground ?? '#fff')
    }

    // Bridge roles (if legacy utilities still rely on these)
    const cs = (v: string) => getComputedStyle(root).getPropertyValue(v).trim()
    root.style.setProperty('--color-bg', cs('--background'))
    root.style.setProperty('--color-surface', cs('--card'))
    root.style.setProperty('--color-border', cs('--border'))
    root.style.setProperty('--color-text', cs('--foreground'))
    root.style.setProperty('--color-text-muted', cs('--muted-foreground'))
    root.style.setProperty('--color-primary', cs('--primary'))
    root.style.setProperty('--color-primary-foreground', cs('--primary-foreground'))
    root.style.setProperty('--color-ring', cs('--ring'))
  }

  // ---------- Watchers ----------
  if (import.meta.client) {
    watch(
      [currentPrimaryColor, currentNeutralColor, currentRadius, direction, fontScale],
      () => applyTheme(),
      { immediate: true }
    )
    onMounted(() => {
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
    if (savedMode && themeConfig.modeOptions.some(m => m.value === savedMode)) {
      colorMode.preference = savedMode
    } else {
      colorMode.preference = themeConfig.mode
    }
    applyTheme()
  })

  // ---------- Public API ----------
  return {
    // state (readonly)
    isOpen: readonly(isOpen),
    currentPrimaryColor: readonly(currentPrimaryColor),
    currentNeutralColor: readonly(currentNeutralColor),
    currentRadius: readonly(currentRadius),
    direction: readonly(direction),
    fontScale: readonly(fontScale),
    isMobile: readonly(isMobile),
    screenWidth: readonly(screenWidth),

    // config (pass-through)
    primaryColors: themeConfig.primaryColors,
    neutralColors: themeConfig.neutralColors,
    radiusOptions: themeConfig.radiusOptions,
    modeOptions: themeConfig.modeOptions,

    // actions
    toggleCustomizer,
    closeCustomizer,
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
