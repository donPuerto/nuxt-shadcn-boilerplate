<script setup lang="ts">
import type {
  SidebarProps,
} from '@/components/ui/sidebar'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarRail,
  SidebarHeader,
} from '@/components/ui/sidebar'
import { RotateCcw, Check, Sun, Moon, Monitor } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { Separator } from '@/components/ui/separator'


// Get sidebar settings from app config and user preferences
const { sidebar } = useAppSettings()

// Use the customize composable
const { theme, radius, preference, setTheme, setRadius } = useCustomize()
const appConfig = useAppConfig()

// Merge app config settings with any additional props
const props = defineProps<SidebarProps>()

// Computed sidebar props that combine app config with component props
const sidebarProps = computed(() => ({
  ...props,
  collapsible: sidebar.value.collapsible,
  side: props.side || sidebar.value.side,
  variant: sidebar.value.variant,
}))

// Get colors from app config
const allColors = appConfig.theme?.availableColors || [
  'zinc', 'rose', 'blue', 'green', 'orange', 'red',
  'slate', 'stone', 'gray', 'neutral', 'yellow', 'violet',
]

// Color map based on your themes.css
const colorMap = {
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

// Add a function to determine text color based on background
function getTextColor(color: string) {
  // For certain colors that are light, return dark text
  if (['yellow', 'orange'].includes(color)) {
    return 'black'
  }
  // For all other colors return white text
  return 'white'
}

// Color mode options
const colorModeOptions = [
  { value: 'light', label: 'Light', icon: Sun },
  { value: 'dark', label: 'Dark', icon: Moon },
  { value: 'system', label: 'System', icon: Monitor },
]

// Set color mode
function setColorMode(mode: string) {
  preference.value = mode
}

// Set radius with slider
function setRadiusSlider(value: number[]) {
  setRadius(value[0])
}

// Get radius as array for slider
const radiusArray = computed({
  get: () => [radius.value],
  set: (value) => setRadiusSlider(value)
})

// Reset to defaults
function resetToDefaults() {
  setTheme(appConfig.theme?.default || 'zinc')
  setRadius(appConfig.theme?.defaultRadius || 0.5)
  setColorMode('system')
}
</script>

<template>
  <Sidebar v-bind="sidebarProps">
    <SidebarHeader class="border-b p-4">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2">
          <h2 class="text-lg font-semibold">{{ appConfig.app?.header?.title || 'shadcn-docs' }}</h2>
        </div>
        <div class="flex items-center gap-2">
          <!-- Reset Button (Icon Only) -->
          <Button variant="outline" size="icon" class="h-8 w-8" @click="resetToDefaults">
            <RotateCcw class="h-4 w-4" />
            <span class="sr-only">Reset to defaults</span>
          </Button>
        </div>
      </div>
    </SidebarHeader>

    <SidebarContent class="p-4 space-y-6">
      <!-- Current Settings -->
      <SidebarGroup>
        <Label class="mb-1">Current Settings</Label>
        <SidebarGroupContent class="space-y-3">
          <div class="flex justify-between items-center text-sm">
            <span class="text-muted-foreground">Theme Color:</span>
            <div class="flex items-center gap-2">
              <span class="h-4 w-4 rounded-full border" :style="{ backgroundColor: backgroundColor(theme) }" />
              <span class="font-medium capitalize">{{ theme }}</span>
            </div>
          </div>
          <div class="flex justify-between text-sm">
            <span class="text-muted-foreground">Color Mode:</span>
            <span class="font-medium capitalize">{{ preference }}</span>
          </div>
          <div class="flex justify-between text-sm">
            <span class="text-muted-foreground">Border Radius:</span>
            <span class="font-medium">{{ radius }}rem</span>
          </div>
        </SidebarGroupContent>
      </SidebarGroup>

      <Separator />

      <!-- Color Theme Section -->
      <SidebarGroup>
        <Label class="mb-1">Color Theme</Label>
        <SidebarGroupContent>
          <div class="grid grid-cols-2 gap-2">
            <Button v-for="color in allColors" :key="color" class="justify-start gap-2 h-auto p-3" variant="outline"
              :class="{ 'border-primary border-2': theme === color }" @click="setTheme(color)">
              <span class="h-4 w-4 flex items-center justify-center rounded-full border border-border"
                :style="{ backgroundColor: backgroundColor(color) }">
                <Check v-if="theme === color" class="h-3 w-3"
                  :class="getTextColor(color) === 'white' ? 'text-white' : 'text-black'" />
              </span>
              <span class="text-xs capitalize">{{ color }}</span>
            </Button>
          </div>
        </SidebarGroupContent>
      </SidebarGroup>

      <Separator />

      <!-- Border Radius Section -->
      <SidebarGroup>
        <Label class="mb-1">Border Radius</Label>
        <SidebarGroupContent class="space-y-4">
          <!-- Radius Slider -->
          <div class="space-y-2">
            <div class="flex items-center justify-between">
              <Label class="text-xs">Radius</Label>
              <span class="text-xs text-muted-foreground">{{ radius }}rem</span>
            </div>
            <Slider v-model="radiusArray" :max="2" :min="0" :step="0.05" class="w-full" />
          </div>

          <!-- Preview -->
          <div class="space-y-2">
            <Label class="text-xs">Preview</Label>
            <div
              class="w-full h-12 bg-muted border flex items-center justify-center text-xs text-muted-foreground font-medium"
              :style="{ borderRadius: `${radius}rem` }">
              {{ radius }}rem
            </div>
          </div>
        </SidebarGroupContent>
      </SidebarGroup>

      <Separator />

      <!-- Color Mode Section -->
      <SidebarGroup>
        <Label class="mb-1">Color Mode</Label>
        <SidebarGroupContent>
          <div class="space-y-2">
            <Button v-for="mode in colorModeOptions" :key="mode.value" class="w-full justify-start gap-3 h-auto p-3"
              variant="outline" :class="{ 'border-primary border-2': preference === mode.value }"
              @click="setColorMode(mode.value)">
              <component :is="mode.icon" class="h-4 w-4" />
              <span class="text-sm">{{ mode.label }}</span>
              <Check v-if="preference === mode.value" class="h-4 w-4 ml-auto text-primary" />
            </Button>
          </div>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>

    <SidebarRail />
  </Sidebar>
</template>
