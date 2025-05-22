import { ref, reactive, watch } from 'vue'
import { useAppConfig } from '#imports'

// Create a global singleton instance to prevent duplicate state on HMR
let globalState = null

export const useThreeBackground = () => {
  // Return the existing instance if it exists
  if (globalState) return globalState
  
  // Get app config values
  const appConfig = useAppConfig()
  const configSettings = appConfig.threeBackground
  
  // Initialize with default settings from app.config.ts
  const presets = reactive({...configSettings.presets})
  
  // Get the default preset name
  const defaultPresetName = configSettings.defaultPreset || 'default'
  
  // Track active preset, starting with default from app.config
  const activePreset = ref(defaultPresetName)
  
  // Default colors if none exist in the preset
  const defaultColors = ['#3f51b5', '#5e35b1', '#1a237e', '#0d47a1']
  
  // Update trigger for forcing visualization updates
  const updateTrigger = ref(0)
  
  // Get the default preset data
  const defaultPreset = presets[defaultPresetName]
  
  // Background settings initialized from app.config default preset
  const settings = reactive({
    stars: {
      count: defaultPreset?.count ?? 7000,
      speed: defaultPreset?.speed ?? 5,
      size: defaultPreset?.size ?? 2,
      colors: [...(defaultPreset?.colors || defaultColors)]
    }
  })
  
  // Apply a preset theme
  const applyPreset = (presetName) => {
    const preset = presets[presetName]
    if (preset) {
      console.log(`Applying preset ${presetName}...`)
      
      // Update active preset
      activePreset.value = presetName
      
      // Update all settings
      settings.stars.count = preset.count
      settings.stars.speed = preset.speed
      settings.stars.size = preset.size
      
      // Handle colors
      if (Array.isArray(preset.colors) && preset.colors.length > 0) {
        settings.stars.colors.length = 0
        preset.colors.forEach(color => settings.stars.colors.push(color))
      } else {
        settings.stars.colors.length = 0
        defaultColors.forEach(color => settings.stars.colors.push(color))
      }
      
      console.log(`Applied preset: ${presetName}`, {
        count: settings.stars.count,
        speed: settings.stars.speed, 
        size: settings.stars.size,
        colors: settings.stars.colors
      })
      
      // Force update the visualization
      forceUpdate()
    }
  }
  
  // Force update visualization
  const forceUpdate = () => {
    updateTrigger.value++
    console.log("Force update triggered:", updateTrigger.value)
  }
  
  // Create and store our state
  const state = {
    activePreset,
    settings,
    presets,
    applyPreset,
    forceUpdate,
    updateTrigger
  }
  
  // Store the state globally to avoid recreation on HMR
  globalState = state
  
  return state
}
