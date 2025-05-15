<script setup lang="ts">
import { themes } from '@/lib/registry/themes'

const { theme, radius, setTheme, setRadius } = useCustomize()
const appConfig = useAppConfig()
  
// Get colors from app config
const allColors = appConfig.theme?.availableColors || [
  'zinc',
  'rose',
  'blue',
  'green',
  'orange',
  'red',
  'slate',
  'stone',
  'gray',
  'neutral',
  'yellow',
  'violet',
]

const RADII = [0, 0.25, 0.5, 0.75, 1]

// Use hardcoded color map for demonstration
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
  // First try using the hardcoded color map for reliability
  if (colorMap[color]) {
    return colorMap[color]
  }
  
  // Fallback to using theme registry if available
  const bg = themes.find(t => t.name === color)
  
  if (!bg || !bg.activeColor || !bg.activeColor.light) {
    console.warn(`Theme color "${color}" not properly defined`)
    return 'hsl(0 0% 50%)' // Default gray if theme not found
  }
  
  // Format HSL values correctly
  const hslValue = bg.activeColor.light
  
  // Check if the format is correct, otherwise fix it
  if (hslValue.includes(' ')) {
    // Make sure we return a properly formatted HSL value
    const [h, s, l] = hslValue.split(' ')
    return `hsl(${h} ${s}% ${l}%)`
  }
  
  // If the value already has proper formatting
  return `hsl(${hslValue})`
}

// Add a function to determine text color based on background
function getTextColor(color: string) {
  // For certain colors that are light, return dark text
  if (['yellow', 'green', 'orange'].includes(color)) {
    return 'black'
  }
  // For all other colors return white text
  return 'white'
}

const colorMode = useColorMode()
</script>

<template>
  <div class="grid gap-6">
    <div class="space-y-1.5">
      <Label>Color</Label>
      <div class="grid grid-cols-3 gap-2">
        <template v-for="color in allColors" :key="color">
          <Button
            class="justify-start gap-2"
            variant="outline"
            :class="{ 'border-primary border-2': theme === color }"
            @click="setTheme(color)"
          >
            <span 
              class="h-5 w-5 flex items-center justify-center rounded-full border border-border" 
              :style="{ backgroundColor: backgroundColor(color) }"
            >
              <Icon 
                v-if="theme === color" 
                name="i-radix-icons-check" 
                size="16" 
                :class="getTextColor(color) === 'white' ? 'text-white' : 'text-black'"
              />
            </span>
            <span class="text-xs capitalize">{{ color }}</span>
          </Button>
        </template>
      </div>
    </div>
    <div class="space-y-1.5">
      <Label>Radius</Label>
      <div class="grid grid-cols-5 gap-2">
        <template v-for="r in RADII" :key="r">
          <Button
            class="justify-center gap-2"
            variant="outline"
            :class="{ 'border-primary border-2': radius === r }"
            @click="setRadius(r)"
          >
            <span class="text-xs capitalize">{{ r }}</span>
          </Button>
        </template>
      </div>
    </div>
    <div class="space-y-1.5">
      <Label>Theme</Label>
      <div class="grid grid-cols-3 gap-2">
        <Button
          class="justify-center gap-2"
          variant="outline"
          :class="{ 'border-primary border-2': colorMode.preference === 'light' }"
          @click="colorMode.preference = 'light'"
        >
          <Icon name="i-ph-sun-dim-duotone" size="16" />
          <span class="text-xs capitalize">Light</span>
        </Button>
        <Button
          class="justify-center gap-2"
          variant="outline"
          :class="{ 'border-primary border-2': colorMode.preference === 'dark' }"
          @click="colorMode.preference = 'dark'"
        >
          <Icon name="i-ph-moon-stars-duotone" size="16" />
          <span class="text-xs capitalize">Dark</span>
        </Button>
        <Button
          class="justify-center gap-2"
          variant="outline"
          :class="{ 'border-primary border-2': colorMode.preference === 'system' }"
          @click="colorMode.preference = 'system'"
        >
          <Icon name="i-lucide-monitor" size="16" />
          <span class="text-xs capitalize">System</span>
        </Button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.rounded-full {
  overflow: hidden;
}
</style>
