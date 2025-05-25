import { ref, reactive } from 'vue'
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
      // Silent error handling
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
  
  // Get the default preset data or fallback to defaults
  const initialPreset = presets[initialPresetName] || { 
    count: 7000,
    size: 2,
    speed: 5,
    colors: defaultColors
  }
  
  // Initialize settings from stored values or preset defaults
  const settings = reactive({
    stars: {
      // Use stored values if available, otherwise use the active preset values
      count: storedSettings?.settings?.count ?? initialPreset.count ?? 7000,
      speed: storedSettings?.settings?.speed ?? initialPreset.speed ?? 5,
      size: storedSettings?.settings?.size ?? initialPreset.size ?? 2,
      colors: [...(initialPreset.colors || defaultColors)]
    }
  })
  
  // Apply a preset theme
  // Update the applyPreset function:
const applyPreset = (presetName) => {
  // Check that preset exists
  if (!presets[presetName]) {
    return;
  }
  
  const preset = presets[presetName];
  
  // Update active preset
  activePreset.value = presetName;
  
  // Update all settings with fallbacks for missing values
  settings.stars.count = preset.count ?? 7000;
  settings.stars.speed = preset.speed ?? 5;
  settings.stars.size = preset.size ?? 2;
  
  // Handle colors - this is critical for the visualization update
  if (Array.isArray(preset.colors) && preset.colors.length > 0) {
    // First wipe out all colors
    settings.stars.colors.length = 0;
    
    // Then add new colors from preset
    for (const color of preset.colors) {
      settings.stars.colors.push(color);
    }
  } else {
    // If no colors provided, use default colors
    settings.stars.colors.length = 0;
    for (const color of defaultColors) {
      settings.stars.colors.push(color);
    }
  }
  
  // Force multiple updates to ensure changes take effect
  forceUpdate();
  
  // Sometimes a second update after a brief delay helps ensure changes take effect
  setTimeout(() => {
    forceUpdate();
  }, 20);
};
  
  // Force update visualization
  const forceUpdate = () => {
    updateTrigger.value++
    
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
