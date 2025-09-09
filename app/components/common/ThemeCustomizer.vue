<template>
  <ClientOnly>
    <Teleport to="body">
      <!-- Backdrop Overlay -->
      <Transition
        enter-active-class="transition-opacity duration-300"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition-opacity duration-200"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-show="isCustomizerOpen"
          class="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
          @click="handleOverlayClick"
        />
      </Transition>

      <!-- Customizer Sidebar -->
      <Transition
        enter-active-class="transition-transform duration-300"
        enter-from-class="translate-x-full"
        enter-to-class="translate-x-0"
        leave-active-class="transition-transform duration-200"
        leave-from-class="translate-x-0"
        leave-to-class="translate-x-full"
      >
        <div
          v-show="isCustomizerOpen"
          class="fixed right-0 top-0 z-50 h-full w-full sm:w-[400px] bg-background border-l shadow-lg"
          @click.stop
        >
          <!-- Header Section -->
          <div class="flex items-center justify-between border-b p-4">
            <div class="flex flex-col gap-1">
              <h2 class="text-lg font-semibold">Theme Customizer</h2>
              <p class="text-sm text-muted-foreground">Customize your theme settings</p>
            </div>
            
            <!-- Action Buttons -->
            <div class="flex items-center gap-2">
              <!-- Reset Button -->
              <Button 
                variant="outline" 
                size="icon" 
                class="h-8 w-8 transition-all duration-200" 
                :style="{ borderRadius: `${currentRadius}rem` }"
                title="Reset to defaults"
                @click="handleResetClick"
              >
                <Icon name="lucide:rotate-ccw" class="h-4 w-4" />
              </Button>
              
              <!-- Close Button -->
              <Button 
                variant="outline" 
                size="icon" 
                class="h-8 w-8 transition-all duration-200" 
                :style="{ borderRadius: `${currentRadius}rem` }"
                title="Close customizer"
                @click="handleCloseClick"
              >
                <Icon name="lucide:x" class="h-4 w-4" />
              </Button>
            </div>
          </div>

          <!-- Scrollable Content Area -->
          <div class="h-[calc(100%-5rem)] overflow-y-auto p-4 space-y-6">
            
            <!-- Current Settings Summary -->
            <section class="space-y-3">
              <Label class="text-sm font-medium">Current Settings</Label>
              <div class="space-y-2 text-sm">
                
                <!-- Current Theme Display -->
                <div class="flex justify-between items-center">
                  <span class="text-muted-foreground">Active Theme:</span>
                  <div class="flex items-center gap-2">
                    <span
                      class="h-3 w-3 rounded-full bg-primary border"
                      :style="{ borderRadius: `${currentRadius * 0.5}rem` }"
                    />
                    <span class="font-medium capitalize">{{ selectedPresetLabel }}</span>
                  </div>
                </div>

                <!-- Primary Color Display (only for custom theme) -->
                <div v-if="isCustomTheme" class="flex justify-between items-center">
                  <span class="text-muted-foreground">Primary Color:</span>
                  <div class="flex items-center gap-2">
                    <span
                      class="h-3 w-3 rounded-full border"
                      :style="{ 
                        backgroundColor: getColorValue(currentPrimaryColor),
                        borderRadius: `${currentRadius * 0.5}rem`,
                        border: currentPrimaryColor === 'white' ? '1px solid #e5e7eb' : 'none'
                      }"
                    />
                    <span class="font-medium capitalize">{{ currentPrimaryColor }}</span>
                  </div>
                </div>

                <!-- Neutral Color Display (only for custom theme) -->
                <div v-if="isCustomTheme" class="flex justify-between items-center">
                  <span class="text-muted-foreground">Neutral Theme:</span>
                  <div class="flex items-center gap-2">
                    <span
                      class="h-3 w-3 rounded-full border"
                      :style="{ 
                        backgroundColor: getColorValue(currentNeutralColor),
                        borderRadius: `${currentRadius * 0.5}rem`
                      }"
                    />
                    <span class="font-medium capitalize">{{ currentNeutralColor }}</span>
                  </div>
                </div>

                <!-- Border Radius Display -->
                <div class="flex justify-between items-center">
                  <span class="text-muted-foreground">Border Radius:</span>
                  <div class="flex items-center gap-2">
                    <div 
                      class="h-3 w-6 bg-muted border transition-all duration-200"
                      :style="{ borderRadius: `${currentRadius * 0.625}rem` }"
                    />
                    <span class="font-medium font-mono">{{ (currentRadius * 0.625).toFixed(3) }}rem</span>
                  </div>
                </div>

                <!-- Color Mode Display -->
                <div class="flex justify-between items-center">
                  <span class="text-muted-foreground">Color Mode:</span>
                  <div class="flex items-center gap-2">
                    <Icon :name="currentModeIcon" class="h-4 w-4" />
                    <span class="font-medium capitalize">{{ currentMode }}</span>
                  </div>
                </div>
              </div>
            </section>

            <Separator />

            <!-- Theme Presets Selection -->
            <section class="space-y-3">
              <Label class="text-sm font-medium">Theme Presets</Label>
              <div class="space-y-2">
                <Select :model-value="currentPreset" @update:model-value="handlePresetChange">
                  <SelectTrigger 
                    class="w-full transition-all duration-200"
                    :style="{ borderRadius: `${currentRadius}rem` }"
                  >
                    <SelectValue placeholder="Choose a theme preset" />
                  </SelectTrigger>
                  <SelectContent :style="{ borderRadius: `${currentRadius}rem` }">
                    <SelectItem
                      v-for="preset in themePresets"
                      :key="preset.value"
                      :value="preset.value"
                      class="transition-all duration-200"
                      :style="{ borderRadius: `${currentRadius * 0.75}rem` }"
                    >
                      <div class="flex items-center gap-2">
                        <!-- Theme Preview -->
                        <div v-if="preset.preview" class="flex gap-1">
                          <span
                            class="h-3 w-3 border rounded-full"
                            :style="{ 
                              backgroundColor: preset.preview.primary,
                              borderRadius: `${currentRadius * 0.3}rem`,
                              border: preset.preview.primary === '#ffffff' ? '1px solid #e5e7eb' : 'none'
                            }"
                          />
                          <span
                            class="h-3 w-3 border rounded-full"
                            :style="{ 
                              backgroundColor: preset.preview.secondary,
                              borderRadius: `${currentRadius * 0.3}rem`,
                              border: '1px solid rgba(0,0,0,0.1)'
                            }"
                          />
                        </div>
                        <!-- Theme Name -->
                        <span class="font-medium">{{ preset.label }}</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
                
                <!-- Theme Description -->
                <div 
                  class="text-xs text-muted-foreground bg-muted/30 p-3 transition-all duration-200"
                  :style="{ borderRadius: `${currentRadius}rem` }"
                >
                  <div v-if="selectedPresetData">
                    <strong>{{ selectedPresetData.label }}</strong> - {{ selectedPresetData.description }}
                  </div>
                  <div v-else>
                    Choose a predefined theme preset to quickly apply a complete theme style
                  </div>
                </div>
              </div>
            </section>

            <Separator />

            <!-- Primary Colors Selection (only show for custom theme) -->
            <section v-if="isCustomTheme" class="space-y-3">
              <div class="flex items-center justify-between">
                <Label class="text-sm font-medium">Primary Colors</Label>
                <span
                  class="text-xs text-primary font-medium capitalize px-2 py-1 bg-primary/10 rounded"
                  :style="{ borderRadius: `${currentRadius * 0.5}rem` }"
                >
                  {{ currentPrimaryColor }} selected
                </span>
              </div>
              
              <!-- Primary Color Grid -->
              <div class="grid grid-cols-2 sm:grid-cols-3 gap-2">
                <Button
                  v-for="color in themeConfig.primaryColors"
                  :key="color.value"
                  class="flex items-center gap-2 h-auto p-2 transition-all duration-200 relative justify-start"
                  variant="outline"
                  :class="{ 
                    'border-primary border-2 bg-primary/5': currentPrimaryColor === color.value,
                    'hover:bg-muted/50': currentPrimaryColor !== color.value 
                  }"
                  :style="{ borderRadius: `${currentRadius}rem` }"
                  @click="handlePrimaryColorChange(color.value)"
                >
                  <!-- Color Preview Circle -->
                  <span
                    class="h-3 w-3 flex items-center justify-center border transition-all duration-200 flex-shrink-0"
                    :style="{ 
                      backgroundColor: getColorValue(color.value),
                      borderRadius: `${currentRadius * 0.5}rem`,
                      border: color.value === 'white' ? '1px solid #e5e7eb' : 'none'
                    }"
                  >
                    <!-- Selection Indicator -->
                    <Icon
                      v-if="currentPrimaryColor === color.value"
                      name="lucide:check"
                      class="h-2 w-2 transition-all duration-200"
                      :class="color.value === 'white' ? 'text-gray-600' : 'text-white'"
                    />
                  </span>
                  <!-- Color Name -->
                  <span class="text-xs capitalize font-medium text-left flex-1">{{ color.label }}</span>
                </Button>
              </div>
            </section>

            <Separator v-if="isCustomTheme" />

            <!-- Neutral Colors Selection (only show for custom theme) -->
            <section v-if="isCustomTheme" class="space-y-3">
              <div class="flex items-center justify-between">
                <Label class="text-sm font-medium">Neutral Theme</Label>
                <span
                  class="text-xs text-primary font-medium capitalize px-2 py-1 bg-primary/10 rounded"
                  :style="{ borderRadius: `${currentRadius * 0.5}rem` }"
                >
                  {{ currentNeutralColor }} selected
                </span>
              </div>
              
              <!-- Neutral Color Grid -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <Button
                  v-for="color in themeConfig.neutralColors"
                  :key="color.value"
                  class="flex items-center gap-2 h-auto p-2 transition-all duration-200 relative justify-start"
                  variant="outline"
                  :class="{ 
                    'border-primary border-2 bg-primary/5': currentNeutralColor === color.value,
                    'hover:bg-muted/50': currentNeutralColor !== color.value 
                  }"
                  :style="{ borderRadius: `${currentRadius}rem` }"
                  @click="handleNeutralColorChange(color.value)"
                >
                  <!-- Color Preview Circle -->
                  <span
                    class="h-3 w-3 flex items-center justify-center border transition-all duration-200 flex-shrink-0"
                    :style="{ 
                      backgroundColor: getColorValue(color.value),
                      borderRadius: `${currentRadius * 0.5}rem`,
                      border: '1px solid rgba(255,255,255,0.1)'
                    }"
                  >
                    <!-- Selection Indicator -->
                    <Icon
                      v-if="currentNeutralColor === color.value"
                      name="lucide:check"
                      class="h-2 w-2 text-white drop-shadow-sm transition-all duration-200"
                    />
                  </span>
                  <!-- Color Name -->
                  <span class="text-xs capitalize font-medium text-left flex-1">{{ color.label }}</span>
                </Button>
              </div>
            </section>

            <Separator v-if="isCustomTheme" />

            <!-- Border Radius Configuration -->
            <section class="space-y-4">
              <Label class="text-sm font-medium">Border Radius</Label>
              
              <!-- Radius Slider -->
              <div class="space-y-2">
                <div class="flex items-center justify-between">
                  <Label class="text-xs">Radius</Label>
                  <span class="text-xs text-muted-foreground font-mono">{{ (currentRadius * 0.625).toFixed(3) }}rem</span>
                </div>
                <Slider 
                  :model-value="radiusValue" 
                  :max="2"
                  :min="0" 
                  :step="0.1" 
                  class="w-full" 
                  @update:model-value="handleRadiusChange" 
                />
              </div>
              
              <!-- Radius Preview -->
              <div class="space-y-2">
                <Label class="text-xs">Preview</Label>
                <div
                  class="w-full h-10 bg-muted border flex items-center justify-center text-xs font-medium transition-all duration-300 ease-out"
                  :style="{ borderRadius: `${currentRadius}rem` }"
                >
                  <span class="font-mono">{{ currentRadius.toFixed(1) }}rem</span>
                </div>
              </div>
              
              <!-- Radius Presets -->
              <div class="flex flex-wrap gap-1">
                <Button
                  v-for="preset in radiusPresets"
                  :key="preset.value"
                  size="sm"
                  variant="outline"
                  class="h-8 px-2 text-xs transition-all duration-200"
                  :class="{ 'border-primary bg-primary/5': Math.abs(currentRadius - preset.value) < 0.01 }"
                  :style="{ borderRadius: `${currentRadius}rem` }"
                  @click="handleRadiusPresetChange(preset.value)"
                >
                  {{ preset.label }}
                </Button>
              </div>
            </section>

            <Separator />

            <!-- Color Mode Selection -->
            <section class="space-y-3">
              <Label class="text-sm font-medium">Color Mode</Label>
              
              <!-- Mode Options -->
              <div class="grid grid-cols-1 gap-2">
                <Button
                  v-for="mode in themeConfig.modeOptions"
                  :key="mode.value"
                  class="flex items-center gap-2 h-auto p-2 transition-all duration-200 relative justify-start"
                  variant="outline"
                  :class="{ 
                    'border-primary border-2 bg-primary/5': currentMode === mode.value,
                    'hover:bg-muted/50': currentMode !== mode.value 
                  }"
                  :style="{ borderRadius: `${currentRadius}rem` }"
                  @click="handleModeChange(mode.value)"
                >
                  <!-- Mode Icon -->
                  <Icon :name="mode.icon" class="h-4 w-4 flex-shrink-0" />
                  <!-- Mode Label -->
                  <span class="text-xs font-medium text-left flex-1">{{ mode.label }}</span>
                  <!-- Selection Indicator -->
                  <Icon
                    v-if="currentMode === mode.value"
                    name="lucide:check"
                    class="h-3 w-3 text-primary flex-shrink-0"
                  />
                </Button>
              </div>
              
              <!-- Mode Description -->
              <div 
                class="text-xs text-muted-foreground bg-muted/30 p-3 transition-all duration-200"
                :style="{ borderRadius: `${currentRadius}rem` }"
              >
                <div v-if="currentMode === 'light'">
                  Uses light theme regardless of system preference
                </div>
                <div v-else-if="currentMode === 'dark'">
                  Uses dark theme regardless of system preference
                </div>
                <div v-else>
                  Automatically switches between light and dark based on your system preference
                </div>
              </div>
            </section>

            <!-- Direction Configuration -->
            <section v-if="isCustomTheme" class="space-y-3">
              <Label class="text-sm font-medium">Direction</Label>
              
              <div class="grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  class="flex items-center gap-2 h-auto p-2"
                  :class="{ 'border-primary bg-primary/5': direction === 'ltr' }"
                  :style="{ borderRadius: `${currentRadius}rem` }"
                  @click="handleDirectionChange('ltr')"
                >
                  <Icon name="lucide:align-left" class="h-4 w-4" />
                  <span class="text-xs font-medium">LTR</span>
                </Button>
                
                <Button
                  variant="outline"
                  class="flex items-center gap-2 h-auto p-2"
                  :class="{ 'border-primary bg-primary/5': direction === 'rtl' }"
                  :style="{ borderRadius: `${currentRadius}rem` }"
                  @click="handleDirectionChange('rtl')"
                >
                  <Icon name="lucide:align-right" class="h-4 w-4" />
                  <span class="text-xs font-medium">RTL</span>
                </Button>
              </div>
            </section>
          </div>
        </div>
      </Transition>
    </Teleport>
  </ClientOnly>
</template>

<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { Separator } from '@/components/ui/separator'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { themeConfig } from '~~/shared'
import type { ThemePreset } from '~~/shared'

// ===== Composables =====
const theme = useTheme()
const colorMode = useColorMode()

// ===== Reactive State =====

/**
 * Simplified customizer visibility state - direct reference to theme.isOpen
 */
const isCustomizerOpen = computed(() => theme.isOpen.value)

/**
 * Current theme property values with fallbacks
 */
const currentPreset = computed(() => theme.currentPreset?.value || 'default')
const currentPrimaryColor = computed(() => theme.currentPrimaryColor?.value || 'violet')
const currentNeutralColor = computed(() => theme.currentNeutralColor?.value || 'slate')
const currentRadius = computed(() => theme.currentRadius?.value || 0.5)
const currentMode = computed(() => colorMode.preference || 'system')
const direction = computed(() => theme.direction?.value || 'ltr')
const isCustomTheme = computed(() => theme.isCustomTheme?.value || true)

// Add debug logging
watch(isCustomizerOpen, (newVal) => {
  console.log('ThemeCustomizer isOpen changed:', newVal)
})

// ===== Theme Presets Configuration =====
const themePresets = [
  {
    value: 'default',
    label: 'Default',
    description: 'Custom theme with individual color controls',
    preview: {
      primary: '#8b5cf6',
      secondary: '#64748b'
    }
  },
  {
    value: 'vercel',
    label: 'Vercel',
    description: 'Vercel\'s clean black and white design system',
    preview: {
      primary: '#000000',
      secondary: '#fafafa'
    }
  },
  {
    value: 'cosmicNight',
    label: 'Cosmic Night',
    description: 'Dark space-themed design with cosmic colors',
    preview: {
      primary: '#1a1b3a',
      secondary: '#2a2d5a'
    }
  },
  {
    value: 'twitter',
    label: 'Twitter',
    description: 'Twitter\'s signature blue-themed design',
    preview: {
      primary: '#1d9bf0',
      secondary: '#f7f9fa'
    }
  },
  {
    value: 'claude',
    label: 'Claude',
    description: 'Claude AI\'s warm and friendly theme',
    preview: {
      primary: '#d97706',
      secondary: '#fef3c7'
    }
  }
]

/**
 * Current color mode icon based on selected mode
 */
const currentModeIcon = computed(() => {
  const mode = themeConfig.modeOptions?.find(m => m.value === currentMode.value)
  return mode?.icon || 'lucide:monitor'
})

/**
 * Slider value array for radius control (Slider component expects array)
 */
const radiusValue = computed(() => [currentRadius.value])

/**
 * Selected preset data object
 */
const selectedPresetData = computed(() => {
  return themePresets.find(preset => preset.value === currentPreset.value)
})

/**
 * Selected preset label for display
 */
const selectedPresetLabel = computed(() => {
  return selectedPresetData.value?.label || 'Custom'
})

// ===== Constants =====
const radiusPresets = [
  { label: '0', value: 0 },
  { label: '0.3', value: 0.3 },
  { label: '0.5', value: 0.5 },
  { label: '0.8', value: 0.8 },
  { label: '1', value: 1 }
]

// ===== Helper Functions =====
const getColorValue = (colorKey: string): string => {
  return theme.getColorValue?.(colorKey) || '#000000'
}

// ===== Event Handlers =====
const handlePresetChange = (preset: string) => {
  console.log('Preset changed to:', preset)
  theme.setPreset?.(preset as ThemePreset)
}

const handlePrimaryColorChange = (color: string) => {
  console.log('Primary color changed to:', color)
  theme.setPrimaryColor?.(color)
}

const handleNeutralColorChange = (color: string) => {
  console.log('Neutral color changed to:', color)
  theme.setNeutralColor?.(color)
}

const handleRadiusChange = (value: number[]) => {
  console.log('Radius changed to:', value[0])
  theme.setRadius?.(value[0])
}

const handleRadiusPresetChange = (value: number) => {
  console.log('Radius preset changed to:', value)
  theme.setRadius?.(value)
}

const handleModeChange = (mode: string) => {
  console.log('Mode changed to:', mode)
  theme.setColorMode?.(mode)
}

const handleDirectionChange = (dir: 'ltr' | 'rtl') => {
  console.log('Direction changed to:', dir)
  theme.setDirection?.(dir)
}

const handleResetClick = () => {
  console.log('Reset clicked')
  theme.resetToDefaults?.()
}

const handleCloseClick = () => {
  console.log('Close clicked')
  theme.closeCustomizer?.()
}

const handleOverlayClick = () => {
  console.log('Overlay clicked')
  theme.closeCustomizer?.()
}

// ===== Responsive Handling =====
const isSmallScreen = ref(false)
const checkScreenSize = () => {
  if (import.meta.client) {
    isSmallScreen.value = window.innerWidth < 640
  }
}

const handleResize = () => {
  checkScreenSize()
  if (isSmallScreen.value && theme.isOpen?.value) {
    theme.closeCustomizer?.()
  }
}

// ===== Lifecycle Hooks =====
onMounted(() => {
  if (import.meta.client) {
    console.log('ThemeCustomizer mounted')
    console.log('Theme object:', theme)
    console.log('Initial isOpen:', theme.isOpen?.value)
    
    checkScreenSize()
    window.addEventListener('resize', handleResize)
  }
})

onUnmounted(() => {
  if (import.meta.client) {
    window.removeEventListener('resize', handleResize)
  }
})
</script>
