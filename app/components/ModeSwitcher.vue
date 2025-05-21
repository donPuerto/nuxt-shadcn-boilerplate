<template>
  <ClientOnly>
    <div class="relative">
      <Button 
        variant="ghost" 
        size="icon" 
        :disabled="animationInProgress"
        @click="handleThemeToggle"
      >
        <!-- Light mode icon -->
        <Icon 
          name="lucide:sun" 
          class="h-[1.2rem] w-[1.2rem] transition-all" 
          :class="showLightIcon ? 'rotate-0 scale-100' : 'rotate-90 scale-0 absolute'" 
        />
            
        <!-- Dark mode icon -->
        <Icon 
          name="lucide:moon" 
          class="h-[1.2rem] w-[1.2rem] transition-all" 
          :class="showDarkIcon ? 'rotate-0 scale-100' : 'rotate-90 scale-0 absolute'" 
        />
      </Button>
      
      <!-- Wave effect (now shared via composable) -->
      <div
        v-if="showWave" 
        class="fixed inset-0 pointer-events-none z-50 overflow-hidden"
      >
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
    </div>

    <template #fallback>
      <Button variant="ghost" size="icon">
        <Icon name="lucide:loader-2" class="h-[1.2rem] w-[1.2rem] animate-spin" />
      </Button>
    </template>
  </ClientOnly>
</template>

<script setup>
const colorMode = useColorMode();

// Use the wave animation composable
const { 
  animationInProgress,
  showWave,
  waveX,
  waveY,
  waveSize,
  waveOpacity,
  waveColor,
  triggerWave
} = useWaveAnimation();

// Computed properties to determine which icon to show
const systemTheme = computed(() => {
  if (import.meta.client) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  return 'light'; // Default to light for SSR
});

const effectiveTheme = computed(() => {
  return colorMode.preference === 'system' ? systemTheme.value : colorMode.preference;
});

const showLightIcon = computed(() => effectiveTheme.value === 'light');
const showDarkIcon = computed(() => effectiveTheme.value === 'dark');

// Handle theme toggle with animation
const handleThemeToggle = (event) => {
  let nextMode;
  let waveColorValue;
  
  if (colorMode.preference === 'light') {
    nextMode = 'dark';
    waveColorValue = '#09090b'; // Going to dark
  } else if (colorMode.preference === 'dark') {
    nextMode = 'light';
    waveColorValue = '#ffffff'; // Going to light
  } else {
    // If system, toggle based on current system theme
    if (systemTheme.value === 'dark') {
      nextMode = 'light';
      waveColorValue = '#ffffff';
    } else {
      nextMode = 'dark';
      waveColorValue = '#09090b';
    }
  }
  
  // Trigger the wave animation
  triggerWave(event, waveColorValue, () => {
    colorMode.preference = nextMode;
  });
};

// Watch for system preference changes
onMounted(() => {
  if (import.meta.client) {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Force update when system theme changes
    mediaQuery.addEventListener('change', () => {
      // This will re-evaluate our computed properties
      if (colorMode.preference === 'system') {
        // Force a component update
        nextTick();
      }
    });
  }
});
</script>
