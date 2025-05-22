<!-- filepath: d:\Code\Nuxt\v4\LearnNuxt\nuxt-shadcn-boilerplate\app\components\ThreeBackgroundPopover.vue -->
<template>
  <Popover>
    <PopoverTrigger as-child>
      <Button
        variant="ghost"
        size="icon"
      >
        <Icon 
          name="lucide:sparkles" 
          class="h-[1.2rem] w-[1.2rem] transition-all" 
        />
      </Button>
    </PopoverTrigger>
    <PopoverContent side="bottom" align="end" class="w-80 p-4">
      <div class="flex items-center justify-between mb-4">
        <h4 class="text-sm font-medium leading-none">Background Style</h4>
        <Button
          variant="ghost"
          size="sm"
          class="h-7 w-7 p-0"
          title="Reset to default"
          @click="resetToDefault"
        >
          <Icon name="lucide:rotate-ccw" class="h-4 w-4" />
        </Button>
      </div>

      <!-- Preset Selection -->
      <div class="mb-4">
        <Label>Preset Themes</Label>
        <div class="grid grid-cols-2 gap-2 mt-2">
          <Button 
            v-for="(preset, name) in presets" 
            :key="name"
            variant="outline"
            size="sm" 
            :class="[
              'justify-start',
              activePreset === name 
                ? 'border-primary text-primary' 
                : ''
            ]"
            @click="applyPreset(name)"
          >
            <span
              :class="`inline-block w-3 h-3 rounded-full mr-2`"
              :style="{
                background: `linear-gradient(45deg, ${preset.colors[0]} 0%, ${preset.colors[1] || preset.colors[0]} 100%)`
              }"
            />
            {{ name }}
          </Button>
        </div>
      </div>

      <!-- Star Count Slider -->
      <div class="space-y-2 mb-4">
        <div class="flex items-center justify-between">
          <Label>Star Count</Label>
          <span class="text-xs text-muted-foreground">{{ form.count[0].toLocaleString() }}</span>
        </div>
        <Slider
          :model-value="form.count"
          :max="15000"
          :min="2000"
          :step="500"
          class="pt-2"
          @update:model-value="updateCount"
        />
      </div>
      
      <!-- Star Size Slider -->
      <div class="space-y-2 mb-4">
        <div class="flex items-center justify-between">
          <Label>Star Size</Label>
          <span class="text-xs text-muted-foreground">{{ form.size[0].toFixed(1) }}</span>
        </div>
        <Slider
          :model-value="form.size"
          :max="4"
          :min="0.5"
          :step="0.1"
          class="pt-2"
          @update:model-value="updateSize"
        />
      </div>
      
      <!-- Star Speed Slider -->
      <div class="space-y-2">
        <div class="flex items-center justify-between">
          <Label>Animation Speed</Label>
          <span class="text-xs text-muted-foreground">{{ form.speed[0].toFixed(1) }}</span>
        </div>
        <Slider
          :model-value="form.speed"
          :max="8"
          :min="0.1"
          :step="0.1"
          class="pt-2"
          @update:model-value="updateSpeed"
        />
      </div>
    </PopoverContent>
  </Popover>
</template>

<script setup lang="ts">
import { ref, reactive, watch, onMounted } from 'vue'
import { useThreeBackground } from '~/composables/useThreeBackground'
import { useAppConfig } from '#imports'

import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'

import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'

// Get app config
const appConfig = useAppConfig()
const threeBackgroundConfig = appConfig.threeBackground

// Storage key for localStorage
const STORAGE_KEY = 'threeBackgroundSettings'

// Get the ThreeBackground composable
const threeBackground = useThreeBackground()

// Get presets from config
const presets = threeBackgroundConfig.presets

// Track active preset
const activePreset = ref(threeBackgroundConfig.defaultPreset || 'default')

// Form state for sliders - use arrays as required by Shadcn Slider
const form = reactive({
  count: [7000],
  size: [2],
  speed: [5]
})

// Load settings from localStorage
function loadFromLocalStorage() {
  if (typeof window === 'undefined') return false
  
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    console.log('Loading from localStorage:', saved)
    
    if (saved) {
      const data = JSON.parse(saved)
      
      // Set active preset
      if (data.activePreset && presets[data.activePreset]) {
        activePreset.value = data.activePreset
      }
      
      // Set form values
      if (data.settings) {
        if (data.settings.count !== undefined) {
          form.count = [data.settings.count]
        }
        
        if (data.settings.size !== undefined) {
          form.size = [data.settings.size]
        }
        
        if (data.settings.speed !== undefined) {
          form.speed = [data.settings.speed]
        }
      }
      
      console.log('Loaded settings from localStorage:', {
        activePreset: activePreset.value,
        count: form.count[0],
        size: form.size[0],
        speed: form.speed[0]
      })
      
      return true
    }
  } catch (e) {
    console.error('Error loading from localStorage:', e)
  }
  
  return false
}

// Save settings to localStorage
function saveToLocalStorage() {
  if (typeof window === 'undefined') return
  
  try {
    const data = {
      activePreset: activePreset.value,
      settings: {
        count: form.count[0],
        size: form.size[0],
        speed: form.speed[0]
      }
    }
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    console.log('Saved to localStorage:', data)
  } catch (e) {
    console.error('Error saving to localStorage:', e)
  }
}

// Update functions for sliders
function updateCount(value) {
  if (!value || !value.length) return
  
  // Update form value
  form.count = value
  
  // Directly update ThreeBackground settings
  threeBackground.settings.stars.count = value[0]
  
  // Save to localStorage
  saveToLocalStorage()
}

function updateSize(value) {
  if (!value || !value.length) return
  
  // Update form value
  form.size = value
  
  // Directly update ThreeBackground settings
  threeBackground.settings.stars.size = value[0]
  
  // Save to localStorage
  saveToLocalStorage()
}

function updateSpeed(value) {
  if (!value || !value.length) return
  
  // Update form value
  form.speed = value
  
  // Directly update ThreeBackground settings
  threeBackground.settings.stars.speed = value[0]
  
  // Save to localStorage
  saveToLocalStorage()
}

// Apply a specific preset
function applyPreset(presetName) {
  if (!presets[presetName]) return
  
  const preset = presets[presetName]
  
  // Update form values
  form.count = [preset.count]
  form.size = [preset.size]
  form.speed = [preset.speed]
  
  // Update active preset
  activePreset.value = presetName
  
  // Apply to ThreeBackground
  threeBackground.applyPreset(presetName)
  
  // Save to localStorage
  saveToLocalStorage()
}

// Reset to default preset
function resetToDefault() {
  applyPreset(threeBackgroundConfig.defaultPreset || 'default')
}

// Apply current form settings to ThreeBackground
function applyCurrentSettings() {
  // Update values in ThreeBackground
  threeBackground.settings.stars.count = form.count[0]
  threeBackground.settings.stars.size = form.size[0]
  threeBackground.settings.stars.speed = form.speed[0]
  
  // Update colors from preset
  const preset = presets[activePreset.value]
  if (preset && preset.colors && Array.isArray(threeBackground.settings.stars.colors)) {
    // Clear existing colors
    threeBackground.settings.stars.colors.length = 0
    
    // Add new colors
    preset.colors.forEach(color => {
      threeBackground.settings.stars.colors.push(color)
    })
  }
  
  // Ensure the active preset is set
  threeBackground.activePreset.value = activePreset.value
  
  console.log('Applied settings to ThreeBackground:', {
    count: threeBackground.settings.stars.count,
    size: threeBackground.settings.stars.size,
    speed: threeBackground.settings.stars.speed,
    activePreset: activePreset.value
  })
}

// Watch for ThreeBackground changes to keep form in sync
watch(() => threeBackground.settings?.stars?.count, (newVal) => {
  if (newVal !== undefined && form.count[0] !== newVal) {
    form.count = [newVal]
  }
})

watch(() => threeBackground.settings?.stars?.size, (newVal) => {
  if (newVal !== undefined && form.size[0] !== newVal) {
    form.size = [newVal]
  }
})

watch(() => threeBackground.settings?.stars?.speed, (newVal) => {
  if (newVal !== undefined && form.speed[0] !== newVal) {
    form.speed = [newVal]
  }
})

// Watch for active preset changes
watch(() => threeBackground.activePreset?.value, (newVal) => {
  if (newVal && newVal !== activePreset.value) {
    activePreset.value = newVal
    
    // Update form values from preset
    const preset = presets[newVal]
    if (preset) {
      form.count = [preset.count]
      form.size = [preset.size]
      form.speed = [preset.speed]
    }
  }
})

// Initialize on mount
onMounted(() => {
  console.log('ThreeBackgroundPopover mounted')
  
  // First try to load from localStorage
  const loaded = loadFromLocalStorage()
  
  if (!loaded) {
    // If nothing in localStorage, use app config default preset
    console.log('No localStorage data found, initializing from default preset')
    const defaultPreset = presets[threeBackgroundConfig.defaultPreset || 'default']
    
    form.count = [defaultPreset.count]
    form.size = [defaultPreset.size]
    form.speed = [defaultPreset.speed]
    activePreset.value = threeBackgroundConfig.defaultPreset || 'default'
  }
  
  // Apply settings to ThreeBackground - ensures visualization is shown
  applyCurrentSettings()
})
</script>
