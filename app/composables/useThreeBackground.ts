import { ref, reactive } from 'vue'

// Create a global singleton instance to prevent duplicate state on HMR
let globalState = null

export const useThreeBackground = () => {
  // Return the existing instance if it exists
  if (globalState) return globalState

  // Track active preset
  const activePreset = ref('default')
  
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
      console.log(`Applying preset ${presetName}...`)
      
      // First, change the preset name
      activePreset.value = presetName
      
      // Then update all settings to trigger reactivity
      settings.stars.count = preset.count
      settings.stars.speed = preset.speed
      settings.stars.size = preset.size
      
      // Clear the colors array
      settings.stars.colors.length = 0
      
      // Add the new colors
      preset.colors.forEach(color => settings.stars.colors.push(color))
      
      console.log(`Applied preset: ${presetName}`, {
        count: settings.stars.count,
        speed: settings.stars.speed,
        size: settings.stars.size,
        colors: [...settings.stars.colors]
      })
    }
  }
  
  const state = {
    activePreset,
    settings,
    presets,
    applyPreset
  }
  
  // Store the state globally
  globalState = state
  
  // Only initialize on client-side to avoid SSR issues
  if (typeof window !== 'undefined') {
    // Initialize with default preset
    applyPreset('default')
  }
  
  return state
}
