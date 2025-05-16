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
          :class="colorMode.preference === 'light' ? 'rotate-0 scale-100' : 'rotate-90 scale-0 absolute'" 
        />
            
        <!-- Dark mode icon -->
        <Icon 
          name="lucide:moon" 
          class="h-[1.2rem] w-[1.2rem] transition-all" 
          :class="colorMode.preference === 'dark' ? 'rotate-0 scale-100' : 'rotate-90 scale-0 absolute'" 
        />
        
        <!-- System mode icon -->
        <Icon 
          name="lucide:monitor" 
          class="h-[1.2rem] w-[1.2rem] transition-all" 
          :class="colorMode.preference === 'system' ? 'rotate-0 scale-100' : 'rotate-90 scale-0 absolute'" 
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

// Handle theme toggle with animation
const handleThemeToggle = (event) => {
  // Determine next mode in cycle: light → dark → system → light
  let nextMode;
  let waveColorValue;
  
  if (colorMode.preference === 'light') {
    nextMode = 'dark';
    waveColorValue = '#09090b'; // Going to dark
  } else if (colorMode.preference === 'dark') {
    nextMode = 'system';
    waveColorValue = '#ffffff'; // Going to system (assume light for animation)
  } else {
    nextMode = 'light';
    waveColorValue = '#ffffff'; // Going to light
  }
  
  // Trigger the wave animation
  triggerWave(event, waveColorValue, () => {
    colorMode.preference = nextMode;
  });
};
</script>
