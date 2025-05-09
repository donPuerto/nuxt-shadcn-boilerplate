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
      </Button>
      
      <!-- Wave effect -->
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
const animationInProgress = ref(false);

// Wave animation state
const showWave = ref(false);
const waveX = ref(0);
const waveY = ref(0);
const waveSize = ref(0);
const waveOpacity = ref(1);
const waveColor = ref('');

// Function to get CSS variable value
const getCSSVariable = (varName) => {
  if (typeof document !== 'undefined') {
    return getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
  }
  return '';
};

// Handle theme toggle with animation
const handleThemeToggle = (event) => {
  // Skip if animation is already in progress
  if (animationInProgress.value) return;
  
  // Set animation flag
  animationInProgress.value = true;
  
  // Get click position
  const clickX = event.clientX;
  const clickY = event.clientY;
  
  // Calculate max distance to farthest corner
  const maxX = Math.max(clickX, window.innerWidth - clickX);
  const maxY = Math.max(clickY, window.innerHeight - clickY);
  const maxRadius = Math.sqrt((maxX * maxX) + (maxY * maxY)) * 1.5;
  
  // Set the wave color based on the target theme
  // We want the wave color to match the background color of the theme we're switching TO
  if (colorMode.preference === 'light') {
    // Switching to dark, so use dark background color
    waveColor.value = getCSSVariable('--background').replace('oklch', 'oklch');
  } else {
    // Switching to light, so use light background color
    waveColor.value = getCSSVariable('--background').replace('oklch', 'oklch');
  }
  
  // Set wave properties
  waveX.value = clickX;
  waveY.value = clickY;
  waveSize.value = 10; // Start small
  waveOpacity.value = 1;
  
  // Show the wave
  showWave.value = true;
  
  // Speed up the animation steps
  setTimeout(() => {
    // Expand wave
    waveSize.value = maxRadius * 2;
    
    // Change theme sooner
    setTimeout(() => {
      colorMode.preference = colorMode.preference === 'light' ? 'dark' : 'light';
      
      // Fade out wave
      waveOpacity.value = 0;
      
      // Clean up faster
      setTimeout(() => {
        showWave.value = false;
        animationInProgress.value = false;
      }, 500); // Reduced from 600ms
    }, 200); // Reduced from 300ms
  }, 30);
};
</script>
