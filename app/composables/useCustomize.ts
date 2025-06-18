export function useCustomize() {
  // Initialize with proper defaults
  const theme = useState<string>('app-theme', () => 'zinc')
  const radius = useState<number>('app-radius', () => 0.5)
  
  // Color mode
  const colorMode = useColorMode()
  const preference = computed({
    get: () => colorMode.preference,
    set: (value) => {
      colorMode.preference = value
    }
  })

  // Available colors
  const availableColors = ref([
    'zinc', 'rose', 'blue', 'green', 'orange', 'red',
    'slate', 'stone', 'gray', 'neutral', 'yellow', 'violet'
  ])

  // Load from localStorage on client
  onMounted(() => {
    if (import.meta.client) {
      try {
        const storedTheme = localStorage.getItem('theme-settings')
        if (storedTheme) {
          const settings = JSON.parse(storedTheme)
          theme.value = settings.theme || 'zinc'
          radius.value = settings.radius || 0.5
          applyTheme(theme.value)
          applyRadius(radius.value)
        }
      } catch (error) {
        console.warn('Failed to load theme settings from localStorage:', error)
      }
    }
  })

  // Save to localStorage when settings change
  watch(
    () => ({ theme: theme.value, radius: radius.value }),
    (newSettings) => {
      if (import.meta.client) {
        try {
          localStorage.setItem('theme-settings', JSON.stringify(newSettings))
        } catch (error) {
          console.warn('Failed to save theme settings to localStorage:', error)
        }
      }
    },
    { deep: true }
  )

  // Apply theme to document
  const applyTheme = (newTheme: string) => {
    if (import.meta.client) {
      const root = document.documentElement
      root.setAttribute('data-theme', newTheme)
      root.className = root.className.replace(/theme-\w+/g, '')
      root.classList.add(`theme-${newTheme}`)
    }
  }

  // Apply radius CSS custom property
  const applyRadius = (newRadius: number) => {
    if (import.meta.client) {
      document.documentElement.style.setProperty('--radius', `${newRadius}rem`)
    }
  }

  // Actions
  const setTheme = (newTheme: string) => {
    theme.value = newTheme
    applyTheme(newTheme)
  }

  const setRadius = (newRadius: number) => {
    radius.value = newRadius
    applyRadius(newRadius)
  }

  const resetThemeToDefaults = () => {
    setTheme('zinc')
    setRadius(0.5)
    preference.value = 'system'
    
    if (import.meta.client) {
      localStorage.removeItem('theme-settings')
    }
  }

  return {
    theme: readonly(theme),
    radius: readonly(radius),
    preference,
    availableColors: readonly(availableColors),
    setTheme,
    setRadius,
    resetThemeToDefaults
  }
}
