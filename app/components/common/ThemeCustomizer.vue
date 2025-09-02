<!-- filepath: d:\Code\Nuxt\v4\LearnNuxt\nuxt-shadcn-boilerplate-next\app\components\common\ThemeCustomizer.vue -->
<template>
  <ClientOnly>
    <Teleport to="body">
      <!-- Overlay -->
      <Transition
        enter-active-class="transition-opacity duration-300"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition-opacity duration-200"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-show="isOpen"
          class="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
          @click="handleOverlayClick"
        />
      </Transition>

      <!-- Sidebar -->
      <Transition
        enter-active-class="transition-transform duration-300"
        enter-from-class="translate-x-full"
        enter-to-class="translate-x-0"
        leave-active-class="transition-transform duration-200"
        leave-from-class="translate-x-0"
        leave-to-class="translate-x-full"
      >
        <div
          v-show="isOpen"
          class="fixed right-0 top-0 z-50 h-full w-[400px] bg-background border-l shadow-lg"
          @click.stop
        >
          <!-- Header -->
          <div class="flex items-center justify-between border-b p-4">
            <div class="flex flex-col gap-1">
              <h2 class="text-lg font-semibold">Theme Customizer</h2>
              <p class="text-sm text-muted-foreground">Customize your theme</p>
            </div>
            <div class="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="icon" 
                class="h-8 w-8 transition-all duration-200" 
                :style="{ borderRadius: `${currentRadius}rem` }"
                @click="handleResetClick"
              >
                <Icon name="lucide:rotate-ccw" class="h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                size="icon" 
                class="h-8 w-8 transition-all duration-200" 
                :style="{ borderRadius: `${currentRadius}rem` }"
                @click="handleCloseClick"
              >
                <Icon name="lucide:x" class="h-4 w-4" />
              </Button>
            </div>
          </div>

          <!-- Content -->
          <div class="h-[calc(100%-5rem)] overflow-y-auto p-4 space-y-6">
            <!-- Current Settings -->
            <div class="space-y-3">
              <Label class="text-sm font-medium">Current Settings</Label>
              <div class="space-y-2 text-sm">
                <!-- Primary Colors -->
                <div class="flex justify-between items-center">
                  <span class="text-muted-foreground">Primary Colors:</span>
                  <div class="flex items-center gap-2">
                    <div class="flex -space-x-1">
                      <!-- Show selected color first if it's not in the first 4 -->
                      <span
                        v-if="!primaryColorsToShow.includes(currentPrimaryColor)"
                        class="h-3 w-3 border-2 border-background transition-all duration-200 relative ring-2 ring-primary scale-110"
                        :style="{ 
                          backgroundColor: theme.getColorValue(currentPrimaryColor),
                          borderRadius: `${currentRadius * 0.5}rem`,
                          zIndex: 10,
                          border: currentPrimaryColor === 'white' ? '2px solid #e5e7eb' : '2px solid rgba(255,255,255,0.1)'
                        }"
                      >
                        <Icon
                          name="lucide:check"
                          class="h-2 w-2 absolute inset-0 m-auto drop-shadow-sm"
                          :class="currentPrimaryColor === 'white' ? 'text-gray-600' : 'text-white'"
                        />
                      </span>
                      
                      <!-- Show first 3-4 colors (depending on whether selected is shown separately) -->
                      <span
                        v-for="(color, index) in primaryColorsToShow"
                        :key="color"
                        class="h-3 w-3 border-2 border-background transition-all duration-200 relative"
                        :class="{ 
                          'ring-2 ring-primary scale-110': currentPrimaryColor === color,
                          'opacity-60': currentPrimaryColor !== color
                        }"
                        :style="{ 
                          backgroundColor: theme.getColorValue(color),
                          borderRadius: `${currentRadius * 0.5}rem`,
                          zIndex: currentPrimaryColor === color ? 10 : 4 - index,
                          border: color === 'white' ? '2px solid #e5e7eb' : '2px solid rgba(255,255,255,0.1)'
                        }"
                      >
                        <Icon
                          v-if="currentPrimaryColor === color"
                          name="lucide:check"
                          class="h-2 w-2 absolute inset-0 m-auto drop-shadow-sm"
                          :class="color === 'white' ? 'text-gray-600' : 'text-white'"
                        />
                      </span>
                      
                      <!-- Show remaining count -->
                      <span 
                        v-if="remainingPrimaryCount > 0"
                        class="h-3 w-4 bg-muted border-2 border-background flex items-center justify-center text-[8px] font-bold text-muted-foreground"
                        :style="{ borderRadius: `${currentRadius * 0.5}rem` }"
                      >
                        +{{ remainingPrimaryCount }}
                      </span>
                    </div>
                    <span class="font-medium">{{ theme.primaryColors.length }} colors</span>
                    <span
                      class="text-xs text-primary font-medium capitalize px-1.5 py-0.5 bg-primary/10 rounded"
                      :style="{ borderRadius: `${currentRadius * 0.5}rem` }"
                    >
                      {{ currentPrimaryColor }} active
                    </span>
                  </div>
                </div>

                <!-- Neutral Colors -->
                <div class="flex justify-between items-center">
                  <span class="text-muted-foreground">Neutral Colors:</span>
                  <div class="flex items-center gap-2">
                    <div class="flex -space-x-1">
                      <span
                        v-for="(color, index) in theme.neutralColors"
                        :key="color"
                        class="h-3 w-3 border-2 border-background transition-all duration-200 relative"
                        :class="{ 
                          'ring-2 ring-primary scale-110': currentNeutralColor === color,
                          'opacity-60': currentNeutralColor !== color
                        }"
                        :style="{ 
                          backgroundColor: theme.getColorValue(color),
                          borderRadius: `${currentRadius * 0.5}rem`,
                          zIndex: currentNeutralColor === color ? 10 : 5 - index,
                          border: '2px solid rgba(255,255,255,0.1)'
                        }"
                      >
                        <Icon
                          v-if="currentNeutralColor === color"
                          name="lucide:check"
                          class="h-2 w-2 absolute inset-0 m-auto text-white drop-shadow-sm"
                        />
                      </span>
                    </div>
                    <span class="font-medium">{{ theme.neutralColors.length }} colors</span>
                    <span
                      class="text-xs text-primary font-medium capitalize px-1.5 py-0.5 bg-primary/10 rounded"
                      :style="{ borderRadius: `${currentRadius * 0.5}rem` }"
                    >
                      {{ currentNeutralColor }} active
                    </span>
                  </div>
                </div>

                <!-- Border Radius -->
                <div class="flex justify-between items-center">
                  <span class="text-muted-foreground">Border Radius:</span>
                  <div class="flex items-center gap-2">
                    <div 
                      class="h-3 w-6 bg-muted border transition-all duration-200"
                      :style="{ borderRadius: `${currentRadius}rem` }"
                    />
                    <span class="font-medium font-mono">{{ currentRadius }}rem</span>
                    <span
                      class="text-xs text-muted-foreground px-1.5 py-0.5 bg-muted/50 rounded"
                      :style="{ borderRadius: `${currentRadius * 0.5}rem` }"
                    >
                      {{ isDefaultRadius ? 'default' : 'custom' }}
                    </span>
                  </div>
                </div>

                <!-- Color Mode -->
                <div class="flex justify-between items-center">
                  <span class="text-muted-foreground">Color Mode:</span>
                  <div class="flex items-center gap-2">
                    <Icon :name="currentModeIcon" class="h-4 w-4" />
                    <span class="font-medium capitalize">{{ currentMode }}</span>
                    <span
                      class="text-xs text-muted-foreground px-1.5 py-0.5 bg-muted/50 rounded"
                      :style="{ borderRadius: `${currentRadius * 0.5}rem` }"
                    >
                      {{ isDefaultMode ? 'default' : 'custom' }}
                    </span>
                  </div>
                </div>

              </div>
            </div>

            <Separator />

            <!-- Primary Colors -->
            <div class="space-y-3">
              <div class="flex items-center justify-between">
                <Label class="text-sm font-medium">Primary Colors</Label>
                <span
                  class="text-xs text-primary font-medium capitalize px-2 py-1 bg-primary/10 rounded"
                  :style="{ borderRadius: `${currentRadius * 0.5}rem` }"
                >
                  {{ currentPrimaryColor }} selected
                </span>
              </div>
              <div class="grid grid-cols-3 gap-2">
                <Button
                  v-for="color in theme.primaryColors"
                  :key="color"
                  class="flex items-center gap-2 h-auto p-2 transition-all duration-200 relative justify-start"
                  variant="outline"
                  :class="{ 
                    'border-primary border-2 bg-primary/5': currentPrimaryColor === color,
                    'hover:bg-muted/50': currentPrimaryColor !== color 
                  }"
                  :style="{ borderRadius: `${currentRadius}rem` }"
                  @click="handlePrimaryColorChange(color)"
                >
                  <!-- Color circle on the left -->
                  <span
                    class="h-3 w-3 flex items-center justify-center border transition-all duration-200 flex-shrink-0"
                    :style="{ 
                      backgroundColor: theme.getColorValue(color),
                      borderRadius: `${currentRadius * 0.5}rem`,
                      border: color === 'white' ? '1px solid #e5e7eb' : 'none'
                    }"
                  >
                    <Icon
                      v-if="currentPrimaryColor === color"
                      name="lucide:check"
                      class="h-2 w-2 transition-all duration-200"
                      :class="color === 'white' ? 'text-gray-600' : 'text-white'"
                    />
                  </span>
                  <!-- Color label on the right -->
                  <span class="text-xs capitalize font-medium text-left flex-1">{{ color }}</span>
                </Button>
              </div>
            </div>

            <Separator />

            <!-- Neutral Colors -->
            <div class="space-y-3">
              <div class="flex items-center justify-between">
                <Label class="text-sm font-medium">Neutral Colors</Label>
                <span
                  class="text-xs text-primary font-medium capitalize px-2 py-1 bg-primary/10 rounded"
                  :style="{ borderRadius: `${currentRadius * 0.5}rem` }"
                >
                  {{ currentNeutralColor }} selected
                </span>
              </div>
              <div class="grid grid-cols-3 gap-2">
                <Button
                  v-for="color in theme.neutralColors"
                  :key="color"
                  class="flex items-center gap-2 h-auto p-2 transition-all duration-200 relative justify-start"
                  variant="outline"
                  :class="{ 
                    'border-primary border-2 bg-primary/5': currentNeutralColor === color,
                    'hover:bg-muted/50': currentNeutralColor !== color 
                  }"
                  :style="{ borderRadius: `${currentRadius}rem` }"
                  @click="handleNeutralColorChange(color)"
                >
                  <!-- Color circle on the left -->
                  <span
                    class="h-3 w-3 flex items-center justify-center border transition-all duration-200 flex-shrink-0"
                    :style="{ 
                      backgroundColor: theme.getColorValue(color),
                      borderRadius: `${currentRadius * 0.5}rem`,
                      border: '1px solid rgba(255,255,255,0.1)'
                    }"
                  >
                    <Icon
                      v-if="currentNeutralColor === color"
                      name="lucide:check"
                      class="h-2 w-2 text-white drop-shadow-sm transition-all duration-200"
                    />
                  </span>
                  <!-- Color label on the right -->
                  <span class="text-xs capitalize font-medium text-left flex-1">{{ color }}</span>
                </Button>
              </div>
            </div>

            <Separator />

            <!-- Border Radius -->
            <div class="space-y-4">
              <Label class="text-sm font-medium">Border Radius</Label>
              <div class="space-y-2">
                <div class="flex items-center justify-between">
                  <Label class="text-xs">Radius</Label>
                  <span class="text-xs text-muted-foreground font-mono">{{ currentRadius }}rem</span>
                </div>
                <Slider 
                  :model-value="radiusValue" 
                  :max="1"
                  :min="0" 
                  :step="0.05" 
                  class="w-full" 
                  @update:model-value="handleRadiusChange" 
                />
              </div>
              <div class="space-y-2">
                <Label class="text-xs">Preview</Label>
                <div
                  class="w-full h-10 bg-muted border flex items-center justify-center text-xs font-medium transition-all duration-300 ease-out"
                  :style="{ borderRadius: `${currentRadius}rem` }"
                >
                  <span class="font-mono">{{ currentRadius }}rem</span>
                </div>
              </div>
              
              <!-- Radius presets -->
              <div class="flex gap-1">
                <Button
                  v-for="preset in radiusPresets"
                  :key="preset.value"
                  size="sm"
                  variant="outline"
                  class="h-8 px-2 text-xs transition-all duration-200"
                  :class="{ 'border-primary bg-primary/5': currentRadius === preset.value }"
                  :style="{ borderRadius: `${currentRadius}rem` }"
                  @click="handleRadiusChange([preset.value])"
                >
                  {{ preset.label }}
                </Button>
              </div>
            </div>

            <Separator />

            <!-- Color Mode -->
            <div class="space-y-3">
              <Label class="text-sm font-medium">Color Mode</Label>
              <div class="grid grid-cols-3 gap-2">
                <Button
                  v-for="mode in theme.modeOptions"
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
                  <!-- Icon on the left -->
                  <Icon :name="mode.icon" class="h-4 w-4 flex-shrink-0" />
                  <!-- Label on the right -->
                  <span class="text-xs font-medium text-left flex-1">{{ mode.label }}</span>
                  <!-- Check icon when selected -->
                  <Icon
                    v-if="currentMode === mode.value"
                    name="lucide:check"
                    class="h-3 w-3 text-primary flex-shrink-0"
                  />
                </Button>
              </div>
              <!-- Mode description -->
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
            </div>
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
import { themeConfig } from '~~/shared'

const theme = useTheme()
const colorMode = useColorMode()

// Create local reactive references that properly track the theme state
const isOpen = computed(() => unref(theme.isOpen))
const currentPrimaryColor = computed(() => unref(theme.currentPrimaryColor))
const currentNeutralColor = computed(() => unref(theme.currentNeutralColor))
const currentRadius = computed(() => unref(theme.currentRadius))
const currentMode = computed(() => colorMode.preference || 'system')

// Computed for primary colors display logic
const primaryColorsToShow = computed(() => {
  const selectedColorIndex = theme.primaryColors.findIndex(color => color === currentPrimaryColor.value)
  
  // If selected color is in the first 4, show first 4
  if (selectedColorIndex < 4) {
    return theme.primaryColors.slice(0, 4)
  }
  
  // If selected color is beyond 4th position, show first 3 + selected
  return theme.primaryColors.slice(0, 3)
})

const remainingPrimaryCount = computed(() => {
  const selectedColorIndex = theme.primaryColors.findIndex(color => color === currentPrimaryColor.value)
  
  if (selectedColorIndex < 4) {
    // Show remaining count after first 4
    return Math.max(0, theme.primaryColors.length - 4)
  } else {
    // Show remaining count after first 3 + 1 selected color shown separately
    return Math.max(0, theme.primaryColors.length - 4)
  }
})

// Derived computeds for enhanced UX
const currentModeIcon = computed(() => {
  const mode = theme.modeOptions.find(m => m.value === currentMode.value)
  return mode?.icon || 'lucide:monitor'
})

// Default value checkers
const isDefaultRadius = computed(() => currentRadius.value === themeConfig.radius)
const isDefaultMode = computed(() => currentMode.value === themeConfig.mode)

// Slider value for radius
const radiusValue = computed(() => [currentRadius.value])

// Radius presets for quick selection
const radiusPresets = [
  { label: '0', value: 0 },
  { label: '0.25', value: 0.25 },
  { label: '0.5', value: 0.5 },
  { label: '0.75', value: 0.75 },
  { label: '1', value: 1 }
]

// Event handlers with proper reactivity
const handlePrimaryColorChange = (color: string) => {
  theme.setPrimaryColor(color)
}

const handleNeutralColorChange = (color: string) => {
  theme.setNeutralColor(color)
}

const handleRadiusChange = (value: number[]) => {
  theme.setRadius(value[0])
}

const handleModeChange = (mode: string) => {
  theme.setColorMode(mode)
}

const handleResetClick = () => {
  theme.resetToDefaults()
}

const handleCloseClick = () => {
  theme.closeCustomizer()
}

const handleOverlayClick = () => {
  theme.closeCustomizer()
}

</script>
