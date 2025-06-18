<!-- filepath: components/ThemeCustomizer.vue -->
<template>
  <!-- Mobile Overlay -->
  <ClientOnly>
    <Teleport to="body">
      <Transition enter-active-class="transition-opacity duration-300" enter-from-class="opacity-0"
        enter-to-class="opacity-100" leave-active-class="transition-opacity duration-200" leave-from-class="opacity-100"
        leave-to-class="opacity-0">
        <div v-if="debugInfo.isOpen && !isLargeScreen" class="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
          @click="handleOverlayClick" />
      </Transition>
    </Teleport>
  </ClientOnly>

  <!-- Sidebar -->
  <ClientOnly>
    <Teleport to="body">
      <div :class="sidebarClasses" :dir="debugInfo.direction" @click="handleSidebarClick">
        <!-- Header -->
        <div class="flex items-center justify-between border-b p-4">
          <div class="flex flex-col gap-1">
            <h2 class="text-lg font-semibold">{{ sidebarTitle }}</h2>
            <p class="text-sm text-muted-foreground">{{ sidebarDescription }}</p>
          </div>

          <div class="flex items-center gap-2">
            <!-- Reset Button -->
            <Button variant="outline" size="icon" class="h-8 w-8" @click="resetToDefaults">
              <RotateCcw class="h-4 w-4" />
            </Button>
            <!-- Close Button -->
            <Button variant="outline" size="icon" class="h-8 w-8" @click="handleOverlayClick">
              <X class="h-4 w-4" />
            </Button>
          </div>
        </div>

        <!-- Content -->
        <div class="h-[calc(100%-5rem)] overflow-y-auto p-4 space-y-6">
          <!-- Current Settings -->
          <div class="space-y-3">
            <Label class="text-sm font-medium">Current Settings</Label>
            <div class="space-y-3">
              <div class="flex justify-between items-center text-sm">
                <span class="text-muted-foreground">Theme Color:</span>
                <div class="flex items-center gap-2">
                  <span class="h-4 w-4 rounded-full border"
                    :style="{ backgroundColor: backgroundColor(settings?.theme?.value || 'zinc') }" />
                  <span class="font-medium capitalize">{{ settings?.theme?.value || 'zinc' }}</span>
                </div>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-muted-foreground">Color Mode:</span>
                <span class="font-medium capitalize">{{ currentColorMode || 'system' }}</span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-muted-foreground">Border Radius:</span>
                <span class="font-medium">{{ settings?.radius?.value || 0.5 }}rem</span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-muted-foreground">Sidebar Position:</span>
                <span class="font-medium capitalize">{{ debugInfo.side }}</span>
              </div>
            </div>
          </div>

          <Separator />

          <!-- Sidebar Settings -->
          <div class="space-y-4">
            <Label class="text-sm font-medium">Sidebar Settings</Label>

            <!-- Position -->
            <div class="space-y-2">
              <Label class="text-xs">Position</Label>
              <Select :model-value="debugInfo.side"
                @update:model-value="(value) => settings?.setSidebarPosition && settings.setSidebarPosition(value)">
                <SelectTrigger class="w-full">
                  <SelectValue placeholder="Select position" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem v-for="position in availablePositions" :key="position.value" :value="position.value">
                    <div class="flex items-center gap-2">
                      <Move class="h-4 w-4" />
                      {{ position.label }}
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <!-- Direction -->
            <div class="space-y-2">
              <Label class="text-xs">Direction</Label>
              <Select :model-value="debugInfo.direction"
                @update:model-value="(value) => settings?.setSidebarDirection && settings.setSidebarDirection(value)">
                <SelectTrigger class="w-full">
                  <SelectValue placeholder="Select direction" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem v-for="direction in availableDirections" :key="direction.value" :value="direction.value">
                    <div class="flex items-center gap-2">
                      <ArrowLeftRight class="h-4 w-4" />
                      {{ direction.label }}
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Separator />

          <!-- Color Theme -->
          <div class="space-y-3">
            <Label class="text-sm font-medium">Color Theme</Label>
            <div class="grid grid-cols-2 gap-2">
              <Button v-for="color in (settings?.availableColors?.value || [])" :key="color"
                class="justify-start gap-2 h-auto p-3" variant="outline"
                :class="{ 'border-primary border-2': settings?.theme?.value === color }"
                @click="() => settings?.setTheme && settings.setTheme(color)">
                <span class="h-4 w-4 flex items-center justify-center rounded-full border border-border"
                  :style="{ backgroundColor: backgroundColor(color) }">
                  <Check v-if="settings?.theme?.value === color" class="h-3 w-3"
                    :class="getTextColor(color) === 'white' ? 'text-white' : 'text-black'" />
                </span>
                <span class="text-xs capitalize">{{ color }}</span>
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
                <span class="text-xs text-muted-foreground">{{ settings?.radius?.value || 0.5 }}rem</span>
              </div>
              <Slider v-model="radiusArray" :max="2" :min="0" :step="0.05" class="w-full" />
            </div>

            <!-- Preview -->
            <div class="space-y-2">
              <Label class="text-xs">Preview</Label>
              <div
                class="w-full h-12 bg-muted border flex items-center justify-center text-xs text-muted-foreground font-medium"
                :style="{ borderRadius: `${settings?.radius?.value || 0.5}rem` }">
                {{ settings?.radius?.value || 0.5 }}rem
              </div>
            </div>
          </div>

          <Separator />

          <!-- Color Mode -->
          <div class="space-y-3">
            <Label class="text-sm font-medium">Color Mode</Label>
            <div class="space-y-2">
              <Button v-for="mode in colorModeOptions" :key="mode.value" class="w-full justify-start gap-3 h-auto p-3"
                variant="outline" :class="{ 'border-primary border-2': currentColorMode === mode.value }"
                @click="setColorMode(mode.value)">
                <component :is="mode.icon" class="h-4 w-4" />
                <span class="text-sm">{{ mode.label }}</span>
                <Check v-if="currentColorMode === mode.value" class="h-4 w-4 ml-auto text-primary" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </ClientOnly>
</template>

<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { Separator } from '@/components/ui/separator'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { RotateCcw, Check, Sun, Moon, Monitor, X, ArrowLeftRight, Move } from 'lucide-vue-next'

const settings = useAppSettings()
const colorMode = useColorMode()
const appConfig = useAppConfig()

const isLargeScreen = ref(false)

// Computed properties for config values
const sidebarTitle = computed(() =>
  appConfig.app?.sidebar?.name ||
  appConfig.themeCustomizer?.name ||
  'Theme Customizer'
)

const sidebarDescription = computed(() =>
  appConfig.app?.sidebar?.description ||
  appConfig.themeCustomizer?.description ||
  'Customize your application'
)

const availablePositions = computed(() =>
  appConfig.app?.sidebar?.availablePositions || [
    { value: 'left', label: 'Left' },
    { value: 'right', label: 'Right' }
  ]
)

const availableDirections = computed(() =>
  appConfig.app?.sidebar?.availableDirections || [
    { value: 'ltr', label: 'Left to Right' },
    { value: 'rtl', label: 'Right to Left' }
  ]
)

// Color map
const colorMap: Record<string, string> = {
  zinc: 'hsl(240 5% 65%)',
  slate: 'hsl(215 20% 65%)',
  stone: 'hsl(30 6% 65%)',
  gray: 'hsl(220 9% 65%)',
  neutral: 'hsl(0 0% 65%)',
  red: 'hsl(0 85% 60%)',
  rose: 'hsl(350 90% 70%)',
  orange: 'hsl(30 100% 65%)',
  green: 'hsl(142 70% 45%)',
  blue: 'hsl(217 91% 60%)',
  yellow: 'hsl(47 100% 65%)',
  violet: 'hsl(250 90% 65%)'
}

function backgroundColor(color: string) {
  return colorMap[color] || 'hsl(0 0% 50%)'
}

function getTextColor(color: string) {
  return ['yellow', 'orange'].includes(color) ? 'black' : 'white'
}

const colorModeOptions = [
  { value: 'light', label: 'Light', icon: Sun },
  { value: 'dark', label: 'Dark', icon: Moon },
  { value: 'system', label: 'System', icon: Monitor },
]

// Actions
function setColorMode(mode: string) {
  if (colorMode?.preference !== undefined) {
    colorMode.preference = mode
  }
  if (settings?.setColorMode) {
    settings.setColorMode(mode)
  }
}

function setRadiusSlider(value: number[]) {
  if (settings?.setRadius) {
    settings.setRadius(value[0])
  }
}

function resetToDefaults() {
  // Reset theme to config defaults
  if (settings?.resetThemeToDefaults) {
    settings.resetThemeToDefaults()
  }

  // Reset sidebar to config defaults
  if (settings?.resetSidebarToDefaults) {
    settings.resetSidebarToDefaults()
  }
}

function handleOverlayClick() {
  if (settings?.closeSidebar) {
    settings.closeSidebar()
  }
}

function handleSidebarClick(event: Event) {
  event.stopPropagation()
}

// Computed properties
const radiusArray = computed({
  get: () => [settings?.radius?.value || 0.5],
  set: (value) => setRadiusSlider(value)
})

const currentColorMode = computed(() => {
  return colorMode?.preference || 'system'
})

const sidebarClasses = computed(() => {
  const isOpen = settings?.sidebar?.value?.isOpen ?? false
  const side = settings?.sidebar?.value?.side ?? 'right'
  const width = settings?.sidebar?.value?.width ?? '420px'

  const classes = [
    'fixed',
    'top-0',
    'z-50',
    'h-full',
    'bg-background',
    'shadow-lg',
    'transition-transform',
    'duration-300',
    'ease-in-out'
  ]

  if (side === 'left') {
    classes.push('left-0', 'border-r')
  } else {
    classes.push('right-0', 'border-l')
  }

  if (isOpen) {
    classes.push('translate-x-0')
  } else {
    if (side === 'left') {
      classes.push('-translate-x-full')
    } else {
      classes.push('translate-x-full')
    }
  }

  classes.push('w-[420px]')

  return classes
})

const debugInfo = computed(() => ({
  isOpen: settings?.sidebar?.value?.isOpen ?? false,
  side: settings?.sidebar?.value?.side ?? 'right',
  direction: settings?.sidebar?.value?.direction ?? 'ltr',
  width: settings?.sidebar?.value?.width ?? '420px'
}))

// Responsive handling
const handleResize = () => {
  if (!import.meta.client) return
  isLargeScreen.value = window.innerWidth >= 640
}

onMounted(() => {
  if (import.meta.client) {
    handleResize()
    window.addEventListener('resize', handleResize)
  }
})

onUnmounted(() => {
  if (import.meta.client) {
    window.removeEventListener('resize', handleResize)
  }
})
</script>
