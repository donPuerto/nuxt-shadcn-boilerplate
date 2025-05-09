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
            transition: `transform 1.2s ease-out, width 1.2s ease-out, height 1.2s ease-out, opacity 1.5s ease-in-out`,
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
const waveColor = ref('#000000');

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
  
  // Set wave properties
  waveX.value = clickX;
  waveY.value = clickY;
  waveSize.value = 10; // Start small
  waveOpacity.value = 1;
  waveColor.value = colorMode.preference === 'light' ? '#09090b' : '#ffffff';
  
  // Show the wave
  showWave.value = true;
  
  // Execute animation after a brief delay
  setTimeout(() => {
    // Expand wave
    waveSize.value = maxRadius * 2;
    
    // After a delay, change theme
    setTimeout(() => {
      colorMode.preference = colorMode.preference === 'light' ? 'dark' : 'light';
      
      // Fade out wave
      waveOpacity.value = 0;
      
      // Clean up
      setTimeout(() => {
        showWave.value = false;
        animationInProgress.value = false;
      }, 800);
    }, 400);
  }, 50);
};
</script>
