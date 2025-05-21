import { ref, reactive } from 'vue'

export const useThreeBackground = () => {
  // Background theme
  const theme = ref('stars') // 'stars', 'nebula', 'space'
  
  // Background settings
  const settings = reactive({
    stars: {
      count: 7000,
      speed: 1,
      size: 2,
      colors: ['#3f51b5', '#5e35b1', '#1a237e', '#0d47a1']
    }
  })
  
  // Preset themes
  const presets = {
    default: {
      count: 7000,
      speed: 1,
      size: 2,
      colors: ['#3f51b5', '#5e35b1', '#1a237e', '#0d47a1'] // Blues
    },
    sunset: {
      count: 5000,
      speed: 0.8,
      size: 2.5,
      colors: ['#ff9e80', '#ff6e40', '#ff3d00', '#dd2c00'] // Oranges
    },
    emerald: {
      count: 6000,
      speed: 0.9,
      size: 2,
      colors: ['#00c853', '#00e676', '#69f0ae', '#004d40'] // Greens
    },
    galaxy: {
      count: 10000,
      speed: 1.5,
      size: 1.5,
      colors: ['#aa00ff', '#d500f9', '#e040fb', '#304ffe'] // Purple/Blue
    }
  }
  
  // Apply a preset theme
  const applyPreset = (presetName) => {
    const preset = presets[presetName]
    if (preset) {
      settings.stars.count = preset.count
      settings.stars.speed = preset.speed
      settings.stars.size = preset.size
      settings.stars.colors = [...preset.colors]
    }
  }
  
  // Toggle between themes
  const setTheme = (newTheme) => {
    if (['stars', 'nebula', 'space'].includes(newTheme)) {
      theme.value = newTheme
    }
  }
  
  return {
    theme,
    settings,
    setTheme,
    applyPreset,
    presets
  }
}
