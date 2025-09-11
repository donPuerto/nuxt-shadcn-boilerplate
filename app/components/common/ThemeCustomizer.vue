<template>
  <ClientOnly>
    <Teleport to="body">
      <!-- Debug info -->
      <div v-if="isOpenState" class="fixed top-4 left-4 z-[10000] bg-red-500 text-white p-2 text-xs rounded">
        DEBUG: isOpen = {{ isOpenState }}
      </div>

      <!-- Overlay -->
      <div
        v-if="isOpenState"
        class="fixed inset-0 z-[9998] bg-black/50 backdrop-blur-sm"
        @click="handleOverlayClick"
      />

      <!-- Customizer Panel -->
      <Transition
        enter-active-class="transition-transform duration-300 ease-out"
        enter-from-class="translate-x-full"
        enter-to-class="translate-x-0"
        leave-active-class="transition-transform duration-200 ease-in"
        leave-from-class="translate-x-0"
        leave-to-class="translate-x-full"
      >
        <div
          v-if="isOpenState"
          class="fixed right-0 top-0 z-[9999] h-full w-full sm:w-[420px] bg-background border-l shadow-xl flex flex-col"
        >
          <!-- Header -->
          <div class="flex items-center justify-between border-b p-4 bg-muted/30">
            <div>
              <h2 class="text-lg font-semibold">Theme Customizer</h2>
              <p class="text-sm text-muted-foreground">Personalize your experience</p>
            </div>
            <div class="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                title="Reset to defaults"
                @click="handleReset"
              >
                <Icon name="lucide:rotate-ccw" class="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                title="Close customizer"
                @click="handleClose"
              >
                <Icon name="lucide:x" class="h-4 w-4" />
              </Button>
            </div>
          </div>

          <!-- Accordion Content -->
          <div class="flex-1 overflow-y-auto">
            <Accordion type="multiple" :default-value="['current']" class="px-4">
              <!-- Current Theme Info -->
              <AccordionItem value="current">
                <AccordionTrigger class="py-4">
                  <div class="flex items-center gap-2">
                    <Icon name="lucide:info" class="h-4 w-4" />
                    Current Theme
                  </div>
                </AccordionTrigger>
                <AccordionContent class="pb-4">
                  <div class="space-y-3">
                    <div class="bg-muted/20 p-3 rounded border-l-2 border-primary/20">
                      <div class="flex items-center justify-between text-sm">
                        <span class="text-muted-foreground">Preset:</span>
                        <span class="font-medium">{{ currentPresetLabel }}</span>
                      </div>
                      <div v-if="isCustomThemeComputed" class="flex items-center justify-between text-sm mt-2">
                        <span class="text-muted-foreground">Colors:</span>
                        <div class="flex items-center gap-2">
                          <span
                            class="h-3 w-3 rounded-full border"
                            :style="{ backgroundColor: theme.getColorValue(currentPrimaryColorValue) }"
                          />
                          <span class="text-xs">{{ currentPrimaryColorValue }}</span>
                          <span
                            class="h-3 w-3 rounded-full border ml-2"
                            :style="{ backgroundColor: theme.getColorValue(currentNeutralColorValue) }"
                          />
                          <span class="text-xs">{{ currentNeutralColorValue }}</span>
                        </div>
                      </div>
                      <div class="flex items-center justify-between text-sm mt-2">
                        <span class="text-muted-foreground">Radius:</span>
                        <span class="font-medium">{{ radiusDisplay }}rem</span>
                      </div>
                      <div class="flex items-center justify-between text-sm mt-2">
                        <span class="text-muted-foreground">Mode:</span>
                        <span class="font-medium capitalize">{{ colorMode.preference }}</span>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <!-- Theme Presets -->
              <AccordionItem value="presets">
                <AccordionTrigger class="py-4">
                  <div class="flex items-center gap-2">
                    <Icon name="lucide:palette" class="h-4 w-4" />
                    Theme Presets
                  </div>
                </AccordionTrigger>
                <AccordionContent class="pb-4">
                  <div class="space-y-3">
                    <select 
                      :value="currentPresetValue" 
                      class="w-full p-2 border rounded bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
                      @change="handlePresetChange"
                    >
                      <option 
                        v-for="preset in presetsList"
                        :key="preset.value"
                        :value="preset.value"
                      >
                        {{ preset.label }}
                      </option>
                    </select>

                    <div class="text-xs text-muted-foreground bg-muted/30 p-3 rounded border-l-2 border-primary/20">
                      {{ currentPresetDescription }}
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <!-- Primary Colors (only for customizable themes) -->
              <AccordionItem v-if="isCustomThemeComputed" value="primary">
                <AccordionTrigger class="py-4">
                  <div class="flex items-center gap-2">
                    <Icon name="lucide:circle-dot" class="h-4 w-4" />
                    Primary Color
                  </div>
                </AccordionTrigger>
                <AccordionContent class="pb-4">
                  <div class="grid grid-cols-2 gap-2">
                    <Button
                      v-for="color in primaryColorsList"
                      :key="color.value"
                      variant="outline"
                      class="flex items-center gap-2 h-auto p-3 justify-start transition-all hover:scale-105"
                      :class="{
                        'border-primary border-2 bg-primary/10 shadow-sm': currentPrimaryColorValue === color.value
                      }"
                      @click="handlePrimaryColorClick(color.value)"
                    >
                      <span
                        class="h-4 w-4 rounded-full border-2 border-white shadow-sm flex-shrink-0"
                        :style="{ backgroundColor: theme.getColorValue(color.value) }"
                      />
                      <span class="text-xs font-medium">{{ color.label }}</span>
                      <Icon
                        v-if="currentPrimaryColorValue === color.value"
                        name="lucide:check"
                        class="h-3 w-3 ml-auto text-primary"
                      />
                    </Button>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <!-- Neutral Colors (only for customizable themes) -->
              <AccordionItem v-if="isCustomThemeComputed" value="neutral">
                <AccordionTrigger class="py-4">
                  <div class="flex items-center gap-2">
                    <Icon name="lucide:layers" class="h-4 w-4" />
                    Neutral Theme
                  </div>
                </AccordionTrigger>
                <AccordionContent class="pb-4">
                  <div class="grid grid-cols-1 gap-2">
                    <Button
                      v-for="color in neutralColorsList"
                      :key="color.value"
                      variant="outline"
                      class="flex items-center gap-2 h-auto p-3 justify-start transition-all hover:scale-105"
                      :class="{
                        'border-primary border-2 bg-primary/10 shadow-sm': currentNeutralColorValue === color.value
                      }"
                      @click="handleNeutralColorClick(color.value)"
                    >
                      <span
                        class="h-4 w-4 rounded-full border-2 border-white shadow-sm flex-shrink-0"
                        :style="{ backgroundColor: theme.getColorValue(color.value) }"
                      />
                      <span class="text-xs font-medium">{{ color.label }}</span>
                      <Icon
                        v-if="currentNeutralColorValue === color.value"
                        name="lucide:check"
                        class="h-3 w-3 ml-auto text-primary"
                      />
                    </Button>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <!-- Border Radius -->
              <AccordionItem value="radius">
                <AccordionTrigger class="py-4">
                  <div class="flex items-center gap-2">
                    <Icon name="lucide:corner-down-right" class="h-4 w-4" />
                    Border Radius
                  </div>
                </AccordionTrigger>
                <AccordionContent class="pb-4">
                  <div class="space-y-4">
                    <div class="space-y-3">
                      <Slider
                        :model-value="[currentRadiusValue]"
                        :max="2"
                        :min="0"
                        :step="0.1"
                        class="w-full"
                        @update:model-value="handleRadiusChange"
                      />
                      <div class="flex justify-between text-xs text-muted-foreground">
                        <span>0 (Sharp)</span>
                        <span class="font-medium">{{ radiusDisplay }}rem</span>
                        <span>2 (Rounded)</span>
                      </div>
                    </div>
                    <!-- Preview -->
                    <div class="flex gap-3 justify-center p-3 bg-muted/30 rounded">
                      <div
                        class="w-8 h-8 bg-primary border shadow-sm"
                        :style="{ borderRadius: `${currentRadiusValue}rem` }"
                      />
                      <div
                        class="w-8 h-8 bg-secondary border shadow-sm"
                        :style="{ borderRadius: `${currentRadiusValue}rem` }"
                      />
                      <div
                        class="w-8 h-8 bg-muted-foreground border shadow-sm"
                        :style="{ borderRadius: `${currentRadiusValue}rem` }"
                      />
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <!-- Font Size -->
              <AccordionItem value="font">
                <AccordionTrigger class="py-4">
                  <div class="flex items-center gap-2">
                    <Icon name="lucide:type" class="h-4 w-4" />
                    Font Size
                  </div>
                </AccordionTrigger>
                <AccordionContent class="pb-4">
                  <div class="grid grid-cols-2 gap-2">
                    <Button
                      v-for="font in fontOptions"
                      :key="font.value"
                      variant="outline"
                      class="flex items-center gap-2 h-auto p-3 justify-start transition-all hover:scale-105"
                      :class="{
                        'border-primary border-2 bg-primary/10 shadow-sm': currentFontScaleValue === font.value
                      }"
                      @click="handleFontScaleClick(font.value)"
                    >
                      <Icon name="lucide:type" class="h-4 w-4 flex-shrink-0" />
                      <span class="text-xs font-medium">{{ font.label }}</span>
                      <Icon
                        v-if="currentFontScaleValue === font.value"
                        name="lucide:check"
                        class="h-3 w-3 ml-auto text-primary"
                      />
                    </Button>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <!-- Color Mode -->
              <AccordionItem value="mode">
                <AccordionTrigger class="py-4">
                  <div class="flex items-center gap-2">
                    <Icon name="lucide:monitor" class="h-4 w-4" />
                    Color Mode
                  </div>
                </AccordionTrigger>
                <AccordionContent class="pb-4">
                  <div class="grid grid-cols-1 gap-2">
                    <Button
                      v-for="mode in modeOptionsList"
                      :key="mode.value"
                      variant="outline"
                      class="flex items-center gap-3 h-auto p-3 justify-start transition-all hover:scale-105"
                      :class="{
                        'border-primary border-2 bg-primary/10 shadow-sm': colorMode.preference === mode.value
                      }"
                      @click="handleColorModeClick(mode.value)"
                    >
                      <Icon :name="mode.icon" class="h-4 w-4 flex-shrink-0" />
                      <span class="text-sm font-medium">{{ mode.label }}</span>
                      <Icon
                        v-if="colorMode.preference === mode.value"
                        name="lucide:check"
                        class="h-3 w-3 ml-auto text-primary"
                      />
                    </Button>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <!-- Direction Toggle -->
              <AccordionItem value="direction">
                <AccordionTrigger class="py-4">
                  <div class="flex items-center gap-2">
                    <Icon name="lucide:move-horizontal" class="h-4 w-4" />
                    Text Direction
                  </div>
                </AccordionTrigger>
                <AccordionContent class="pb-4">
                  <div class="grid grid-cols-2 gap-2">
                    <Button
                      variant="outline"
                      class="flex items-center gap-2 h-auto p-3 justify-start transition-all hover:scale-105"
                      :class="{
                        'border-primary border-2 bg-primary/10 shadow-sm': currentDirectionValue === 'ltr'
                      }"
                      @click="handleDirectionClick('ltr')"
                    >
                      <Icon name="lucide:align-left" class="h-4 w-4 flex-shrink-0" />
                      <span class="text-xs font-medium">LTR</span>
                      <Icon
                        v-if="currentDirectionValue === 'ltr'"
                        name="lucide:check"
                        class="h-3 w-3 ml-auto text-primary"
                      />
                    </Button>
                    <Button
                      variant="outline"
                      class="flex items-center gap-2 h-auto p-3 justify-start transition-all hover:scale-105"
                      :class="{
                        'border-primary border-2 bg-primary/10 shadow-sm': currentDirectionValue === 'rtl'
                      }"
                      @click="handleDirectionClick('rtl')"
                    >
                      <Icon name="lucide:align-right" class="h-4 w-4 flex-shrink-0" />
                      <span class="text-xs font-medium">RTL</span>
                      <Icon
                        v-if="currentDirectionValue === 'rtl'"
                        name="lucide:check"
                        class="h-3 w-3 ml-auto text-primary"
                      />
                    </Button>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <!-- Debug Section -->
              <AccordionItem value="debug">
                <AccordionTrigger class="py-4">
                  <div class="flex items-center gap-2">
                    <Icon name="lucide:bug" class="h-4 w-4" />
                    Debug Controls
                  </div>
                </AccordionTrigger>
                <AccordionContent class="pb-4">
                  <div class="space-y-2">
                    <Button variant="destructive" size="sm" class="w-full" @click="testClose">
                      Test Close Function
                    </Button>
                    <Button variant="secondary" size="sm" class="w-full" @click="testToggle">
                      Test Toggle Function
                    </Button>
                    <div class="text-xs p-2 bg-muted/20 rounded">
                      <div>theme.isOpen: {{ theme.isOpen }}</div>
                      <div>isOpenValue: {{ isOpenValue }}</div>
                      <div>isOpenState: {{ isOpenState }}</div>
                      <div>Component mounted: {{ isMounted }}</div>
                      <div>Current Preset: {{ currentPresetValue }}</div>
                      <div>Primary Color: {{ currentPrimaryColorValue }}</div>
                      <div>Neutral Color: {{ currentNeutralColorValue }}</div>
                      <div>Font Scale: {{ currentFontScaleValue }}</div>
                      <div>Direction: {{ currentDirectionValue }}</div>
                      <div>PresetsList Length: {{ presetsList.length }}</div>
                      <div>PresetsList: {{ JSON.stringify(presetsList.map(p => ({ value: p.value, label: p.label }))) }}</div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </Transition>
    </Teleport>
  </ClientOnly>
</template>

<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

const theme = useTheme()
const colorMode = useColorMode()
const isMounted = ref(false)

console.log('[ThemeCustomizer] SETUP - theme.isOpen:', theme.isOpen)

// Create local reactive state to test - this is now our single source of truth for UI
const isOpenState = ref(false)

// Computed to unwrap theme.isOpen
const isOpenValue = computed(() => {
  const value = unref(theme.isOpen)
  console.log('[ThemeCustomizer] isOpenValue computed - raw:', theme.isOpen, 'unref:', value)
  return value
})

// CRITICAL FIX: Create computed values for all theme properties to properly unwrap the readonly refs
const currentPresetValue = computed(() => {
  const value = unref(theme.currentPreset)
  console.log('[ThemeCustomizer] currentPresetValue computed:', value)
  return value
})

const currentPrimaryColorValue = computed(() => {
  const value = unref(theme.currentPrimaryColor)
  console.log('[ThemeCustomizer] currentPrimaryColorValue computed:', value)
  return value
})

const currentNeutralColorValue = computed(() => {
  const value = unref(theme.currentNeutralColor)
  console.log('[ThemeCustomizer] currentNeutralColorValue computed:', value)
  return value
})

const currentRadiusValue = computed(() => {
  const value = unref(theme.currentRadius)
  console.log('[ThemeCustomizer] currentRadiusValue computed:', value)
  return typeof value === 'number' && !isNaN(value) ? value : 0.5
})

const currentFontScaleValue = computed(() => {
  const value = unref(theme.fontScale)
  console.log('[ThemeCustomizer] currentFontScaleValue computed:', value)
  return value
})

const currentDirectionValue = computed(() => {
  const value = unref(theme.direction)
  console.log('[ThemeCustomizer] currentDirectionValue computed:', value)
  return value
})

const isCustomThemeComputed = computed(() => {
  const value = unref(theme.isCustomTheme)
  console.log('[ThemeCustomizer] isCustomThemeComputed computed:', value)
  return value
})

// Font size options
const fontOptions = [
  { label: 'Small', value: 'sm' },
  { label: 'Base', value: 'base' },
  { label: 'Medium', value: 'md' },
  { label: 'Large', value: 'lg' }
]

// Convert computed arrays to reactive arrays with safety checks
const presetsList = computed(() => {
  const presets = theme.presets.value
  console.log('[ThemeCustomizer] presets computed - RAW:', presets)
  console.log('[ThemeCustomizer] presets computed - IS ARRAY:', Array.isArray(presets))
  console.log('[ThemeCustomizer] presets computed - DETAILED:', presets?.map(p => ({ value: p.value, label: p.label })))
  return Array.isArray(presets) ? presets : []
})

const primaryColorsList = computed(() => {
  const colors = theme.primaryColors.value
  console.log('[ThemeCustomizer] primaryColors computed:', colors)
  return Array.isArray(colors) ? colors : []
})

const neutralColorsList = computed(() => {
  const colors = theme.neutralColors.value
  console.log('[ThemeCustomizer] neutralColors computed:', colors)
  return Array.isArray(colors) ? colors : []
})

const modeOptionsList = computed(() => {
  const modes = theme.modeOptions.value
  console.log('[ThemeCustomizer] modeOptions computed:', modes)
  return Array.isArray(modes) ? modes : []
})

const radiusDisplay = computed(() => {
  return currentRadiusValue.value.toFixed(1)
})

// ENHANCED DEBUG VERSION: currentPresetLabel with detailed logging
const currentPresetLabel = computed(() => {
  const searchValue = currentPresetValue.value
  const availablePresets = presetsList.value
  
  console.log('[ThemeCustomizer] currentPresetLabel DEBUG - searchValue:', searchValue)
  console.log('[ThemeCustomizer] currentPresetLabel DEBUG - availablePresets:', availablePresets)
  console.log('[ThemeCustomizer] currentPresetLabel DEBUG - availablePresets length:', availablePresets.length)
  
  if (availablePresets.length === 0) {
    console.log('[ThemeCustomizer] currentPresetLabel DEBUG - NO PRESETS AVAILABLE')
    return 'Loading...'
  }
  
  // Log each preset for comparison
  availablePresets.forEach((preset, index) => {
    console.log(`[ThemeCustomizer] currentPresetLabel DEBUG - preset[${index}]:`, { 
      value: preset.value, 
      label: preset.label,
      matches: preset.value === searchValue,
      valueType: typeof preset.value,
      searchType: typeof searchValue
    })
  })
  
  const foundPreset = availablePresets.find(p => p.value === searchValue)
  console.log('[ThemeCustomizer] currentPresetLabel DEBUG - foundPreset:', foundPreset)
  
  const result = foundPreset?.label || `Unknown (${searchValue})`
  console.log('[ThemeCustomizer] currentPresetLabel DEBUG - RESULT:', result)
  
  return result
})

const currentPresetDescription = computed(() => {
  const preset = presetsList.value.find(p => p.value === currentPresetValue.value)
  return preset?.description || 'No description available for this preset.'
})

// Sync local state with theme state
watch(isOpenValue, (newValue) => {
  console.log('[ThemeCustomizer] isOpenValue watcher - newValue:', newValue)
  isOpenState.value = newValue
}, { immediate: true })

// Watch theme.isOpen directly to extract the actual value
watch(() => theme.isOpen, (newValue, oldValue) => {
  console.log('[ThemeCustomizer] RAW theme.isOpen watcher - NEW:', newValue, 'OLD:', oldValue)
  console.log('[ThemeCustomizer] RAW theme.isOpen watcher - NEW TYPE:', typeof newValue)
  
  // Try to extract actual value
  if (newValue && typeof newValue === 'object' && 'value' in newValue) {
    console.log('[ThemeCustomizer] RAW theme.isOpen watcher - ACTUAL VALUE:', newValue.value)
    isOpenState.value = newValue.value
  } else {
    console.log('[ThemeCustomizer] RAW theme.isOpen watcher - DIRECT VALUE:', newValue)
    isOpenState.value = !!newValue
  }
}, { immediate: true })

// Event handlers with detailed logging
const handleClose = () => {
  console.log('[ThemeCustomizer] handleClose clicked')
  console.log('[ThemeCustomizer] Before close - isOpenState:', isOpenState.value)
  console.log('[ThemeCustomizer] Before close - isOpenValue:', isOpenValue.value)
  theme.closeCustomizer()
  console.log('[ThemeCustomizer] After close - isOpenState:', isOpenState.value)
  console.log('[ThemeCustomizer] After close - isOpenValue:', isOpenValue.value)
}

const handleOverlayClick = () => {
  console.log('[ThemeCustomizer] overlay clicked')
  console.log('[ThemeCustomizer] Before overlay close - isOpenState:', isOpenState.value)
  theme.closeCustomizer()
  console.log('[ThemeCustomizer] After overlay close - isOpenState:', isOpenState.value)
}

const handleReset = () => {
  console.log('[ThemeCustomizer] handleReset called')
  if (confirm('Reset all theme settings to defaults?')) {
    theme.resetToDefaults()
  }
}

const handlePresetChange = (event: Event) => {
  const target = event.target as HTMLSelectElement
  console.log('[ThemeCustomizer] handlePresetChange called with:', target.value)
  theme.setPreset(target.value as any)
}

const handlePrimaryColorClick = (value: string) => {
  console.log('[ThemeCustomizer] handlePrimaryColorClick called with:', value)
  theme.setPrimaryColor(value)
}

const handleNeutralColorClick = (value: string) => {
  console.log('[ThemeCustomizer] handleNeutralColorClick called with:', value)
  theme.setNeutralColor(value)
}

const handleRadiusChange = (value: number[]) => {
  console.log('[ThemeCustomizer] handleRadiusChange called with:', value[0])
  theme.setRadius(value[0])
}

const handleFontScaleClick = (value: string) => {
  console.log('[ThemeCustomizer] handleFontScaleClick called with:', value)
  theme.setFontScale(value as any)
}

const handleColorModeClick = (value: string) => {
  console.log('[ThemeCustomizer] handleColorModeClick called with:', value)
  theme.setColorMode(value)
}

const handleDirectionClick = (value: string) => {
  console.log('[ThemeCustomizer] handleDirectionClick called with:', value)
  theme.setDirection(value as any)
}

// Debug test functions
const testClose = () => {
  console.log('[ThemeCustomizer] Test close button clicked')
  console.log('[ThemeCustomizer] Current isOpenState:', isOpenState.value)
  console.log('[ThemeCustomizer] Current isOpenValue:', isOpenValue.value)
  theme.closeCustomizer()
  console.log('[ThemeCustomizer] After test close isOpenState:', isOpenState.value)
  console.log('[ThemeCustomizer] After test close isOpenValue:', isOpenValue.value)
}

const testToggle = () => {
  console.log('[ThemeCustomizer] Test toggle button clicked')
  console.log('[ThemeCustomizer] Current isOpenState:', isOpenState.value)
  console.log('[ThemeCustomizer] Current isOpenValue:', isOpenValue.value)
  theme.toggleCustomizer()
  console.log('[ThemeCustomizer] After test toggle isOpenState:', isOpenState.value)
  console.log('[ThemeCustomizer] After test toggle isOpenValue:', isOpenValue.value)
}

// Keyboard handler for ESC key
const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && isOpenState.value) {
    console.log('[ThemeCustomizer] ESC key pressed')
    handleClose()
  }
}

onMounted(() => {
  isMounted.value = true
  if (import.meta.client) {
    document.addEventListener('keydown', handleKeydown)
    console.log('[ThemeCustomizer] mounted, keyboard listener added')
  }
  console.log('[ThemeCustomizer] MOUNTED - theme.isOpen:', theme.isOpen)
  console.log('[ThemeCustomizer] MOUNTED - isOpenValue:', isOpenValue.value)
  console.log('[ThemeCustomizer] MOUNTED - isOpenState:', isOpenState.value)
})

onUnmounted(() => {
  if (import.meta.client) {
    document.removeEventListener('keydown', handleKeydown)
    console.log('[ThemeCustomizer] unmounted, keyboard listener removed')
  }
})

// Initial state logging
console.log('[ThemeCustomizer] INITIAL STATE:', {
  themeIsOpen: theme.isOpen,
  isOpenValue: isOpenValue.value,
  isOpenState: isOpenState.value
})
</script>
