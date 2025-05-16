<script setup lang="ts">
import { themes } from '@/lib/registry/themes'

const { theme, radius, setTheme, setRadius } = useCustomize()
const appConfig = useAppConfig()
const colorMode = useColorMode()
  
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

// Check if we're in client side execution
const isClient = ref(false)
onMounted(() => {
  isClient.value = true
})

// Create our own wave animation state to avoid Teleport issues
const animationInProgress = ref(false)
const showWave = ref(false)
const waveX = ref(0)
const waveY = ref(0)
const waveSize = ref(0)
const waveOpacity = ref(1)
const waveColor = ref('')

// Handle safe cleanup on component unmount
onBeforeUnmount(() => {
  showWave.value = false
  animationInProgress.value = false
})

// Function to trigger wave animation
const triggerWave = (event: MouseEvent, color: string, callback?: () => void) => {
  // Skip if not client side or animation already in progress
  if (!isClient.value || animationInProgress.value) {
    if (callback) callback()
    return
  }
  
  // Set animation flag
  animationInProgress.value = true
  
  // Get click position
  const clickX = event.clientX
  const clickY = event.clientY
  
  // Calculate max distance to farthest corner
  const maxX = Math.max(clickX, window.innerWidth - clickX)
  const maxY = Math.max(clickY, window.innerHeight - clickY)
  const maxRadius = Math.sqrt((maxX * maxX) + (maxY * maxY)) * 1.5
  
  // Set wave properties
  waveColor.value = color
  waveX.value = clickX
  waveY.value = clickY
  waveSize.value = 10 // Start small
  waveOpacity.value = 0.9
  
  // Show the wave
  showWave.value = true
  
  // Animation steps using nextTick for better reliability
  nextTick(() => {
    // Expand wave after DOM has updated
    setTimeout(() => {
      waveSize.value = maxRadius * 2
      
      // Execute callback after a short delay
      setTimeout(() => {
        if (callback) callback()
        
        // Fade out wave
        waveOpacity.value = 0
        
        // Clean up
        setTimeout(() => {
          if (isClient.value) { // Check if still mounted
            showWave.value = false
            animationInProgress.value = false
          }
        }, 500)
      }, 200)
    }, 30)
  })
}

// Function to change theme with wave animation
const changeTheme = (mode: string, event: MouseEvent) => {
  // Skip if already this mode or animation in progress
  if (colorMode.preference === mode || animationInProgress.value) {
    return
  }
  
  // Determine wave color based on target mode
  let waveColorValue
  if (mode === 'light') {
    waveColorValue = '#ffffff' // Light mode wave
  } else if (mode === 'dark') {
    waveColorValue = '#09090b' // Dark mode wave
  } else {
    // System mode - use current system preference to determine color
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    waveColorValue = prefersDark ? '#09090b' : '#ffffff'
  }
  
  // Trigger the wave animation
  triggerWave(event, waveColorValue, () => {
    colorMode.preference = mode
  })
}
</script>

<!-- filepath: d:\Code\Nuxt\v4\LearnNuxt\nuxt-shadcn-boilerplate\app\components\ThemeCustomizer.vue -->
<template>
  <!-- Main component content -->
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
          :disabled="animationInProgress"
          @click="changeTheme('light', $event)"
        >
          <Icon name="i-ph-sun-dim-duotone" size="16" />
          <span class="text-xs capitalize">Light</span>
        </Button>
        <Button
          class="justify-center gap-2"
          variant="outline"
          :class="{ 'border-primary border-2': colorMode.preference === 'dark' }"
          :disabled="animationInProgress"
          @click="changeTheme('dark', $event)"
        >
          <Icon name="i-ph-moon-stars-duotone" size="16" />
          <span class="text-xs capitalize">Dark</span>
        </Button>
        <Button
          class="justify-center gap-2"
          variant="outline"
          :class="{ 'border-primary border-2': colorMode.preference === 'system' }"
          :disabled="animationInProgress"
          @click="changeTheme('system', $event)"
        >
          <Icon name="i-lucide-monitor" size="16" />
          <span class="text-xs capitalize">System</span>
        </Button>
      </div>
    </div>
  </div>

  <!-- Wave effect container - with improved client-side checks -->
  <Teleport v-if="isClient && showWave" to="body">
    <div class="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      <div 
        class="rounded-full absolute transform -translate-x-1/2 -translate-y-1/2"
        :style="{
          top: `${waveY}px`,
          left: `${waveX}px`,
          width: `${waveSize}px`,
          height: `${waveSize}px`,
          backgroundColor: waveColor,
          opacity: waveOpacity,
          transition: `width 0.8s cubic-bezier(0.16, 1, 0.3, 1), height 0.8s cubic-bezier(0.16, 1, 0.3, 1), opacity 1s ease-in-out`,
        }"
      />
    </div>
  </Teleport>
</template>

<style scoped>
.rounded-full {
  overflow: hidden;
}
</style>
