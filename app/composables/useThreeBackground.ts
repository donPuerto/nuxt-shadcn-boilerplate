import { ref, reactive, watch } from 'vue'
import { useAppConfig } from '#imports'

// Create a global singleton instance to prevent duplicate state on HMR
let globalState = null

// Storage key for ThreeBackground settings
const STORAGE_KEY = 'threeBackgroundSettings'

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
  
  // Function to get settings from localStorage
  const getStoredSettings = () => {
    if (typeof window === 'undefined') return null
    
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        return JSON.parse(saved)
      }
    } catch (e) {
      console.error('Error reading from localStorage in useThreeBackground:', e)
    }
    
    return null
  }
  
  // Get stored settings
  const storedSettings = getStoredSettings()
  
  // Determine initial active preset - use stored value if available
  let initialPresetName = defaultPresetName
  if (storedSettings?.activePreset && presets[storedSettings.activePreset]) {
    initialPresetName = storedSettings.activePreset
  }
  
  // Track active preset
  const activePreset = ref(initialPresetName)
  
  // Default colors if none exist in the preset
  const defaultColors = ['#3f51b5', '#5e35b1', '#1a237e', '#0d47a1']
  
  // Update trigger for forcing visualization updates
  const updateTrigger = ref(0)
  
  // Get the default preset data
  const initialPreset = presets[initialPresetName] || presets[defaultPresetName]
  
  // Initialize settings from stored values or preset defaults
  const settings = reactive({
    stars: {
      // Use stored values if available, otherwise use the active preset values
      count: storedSettings?.settings?.count ?? initialPreset?.count ?? 7000,
      speed: storedSettings?.settings?.speed ?? initialPreset?.speed ?? 5,
      size: storedSettings?.settings?.size ?? initialPreset?.size ?? 2,
      colors: [...(initialPreset?.colors || defaultColors)]
    }
  })
  
  console.log('ThreeBackground initialized with settings:', {
    activePreset: activePreset.value,
    count: settings.stars.count,
    size: settings.stars.size,
    speed: settings.stars.speed,
    colors: settings.stars.colors
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
      
      // Force update the visualization
      forceUpdate()
      
      console.log(`Applied preset: ${presetName}`, {
        count: settings.stars.count,
        speed: settings.stars.speed, 
        size: settings.stars.size,
        colors: settings.stars.colors
      })
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
