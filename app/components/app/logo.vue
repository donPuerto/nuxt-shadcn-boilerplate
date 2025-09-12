<script setup lang="ts">
interface Props {
  width?: string | number
  height?: string | number
  imgSrc?: string
}

// Define props with default values
const props = withDefaults(defineProps<Props>(), {
  width: '28',
  height: '28',
  imgSrc: '/logo.png'
})

const isLoading = ref(true)
const isImageVisible = ref(false)

const handleImageLoad = () => {
  // Show container first
  isLoading.value = false
  // Then show image after a small delay
  setTimeout(() => {
    isImageVisible.value = true
  }, 300)
}
</script>

<template>
  <div
    class="logo-container relative rounded-full border border-border transition-all duration-500 ease-in-out overflow-hidden dark:bg-background flex-shrink-0"
    :class="{ 'opacity-0': isLoading }"
    :style="{
      width: typeof props.width === 'number' ? `${props.width}px` : props.width,
      height: typeof props.height === 'number' ? `${props.height}px` : props.height,
    }"
  >
    <div 
        class="absolute inset-0 flex items-center justify-center transition-opacity duration-500"
        :class="{ 'opacity-0': isImageVisible }"
      >
      <Icon
        name="svg-spinners:180-ring-with-bg"
        class="w-1/2 h-1/2 text-primary"
      />
    </div>

    <NuxtImg
      :class="[
        'w-full h-full object-cover p-0.5 transition-all duration-500 ease-in-out hover:scale-105',
        { 'opacity-0': !isImageVisible }
      ]"
      :src="props.imgSrc"
      alt="Logo"
      format="webp"
      quality="100"
      loading="eager"
      :width="Number(props.width)"
      :height="Number(props.height)"
      
      @load="handleImageLoad"
    />
  </div>
</template>

<style scoped>
.logo-container {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  backdrop-filter: blur(0);
}

/* Light theme glow */
.logo-container:hover {
  border-color: hsl(var(--primary));
  box-shadow: 
    0 0 0 1px hsl(var(--primary) / 0.2),
    0 0 0 3px hsl(var(--primary) / 0.1),
    0 0 10px hsl(var(--primary) / 0.1);
}

/* Dark theme specific styles */
:global(.dark) .logo-container:hover {
  border-color: hsl(var(--primary));
  box-shadow: 
    0 0 0 1px hsl(var(--primary) / 0.3),
    0 0 0 3px hsl(var(--primary) / 0.2),
    0 0 15px hsl(var(--primary) / 0.2);
}

@keyframes glow {
  from {
    box-shadow: 
      0 0 0 1px hsl(var(--primary) / 0.2),
      0 0 0 3px hsl(var(--primary) / 0.1),
      0 0 10px hsl(var(--primary) / 0.1);
  }
  to {
    box-shadow: 
      0 0 0 1px hsl(var(--primary) / 0.3),
      0 0 0 4px hsl(var(--primary) / 0.2),
      0 0 20px hsl(var(--primary) / 0.2);
  }
}

@keyframes glowDark {
  from {
    box-shadow: 
      0 0 0 1px hsl(var(--primary) / 0.3),
      0 0 0 3px hsl(var(--primary) / 0.2),
      0 0 15px hsl(var(--primary) / 0.2);
  }
  to {
    box-shadow: 
      0 0 0 1px hsl(var(--primary) / 0.4),
      0 0 0 4px hsl(var(--primary) / 0.3),
      0 0 25px hsl(var(--primary) / 0.3);
  }
}

.logo-container:hover {
  animation: glow 1.5s ease-in-out infinite alternate;
}

:global(.dark) .logo-container:hover {
  animation: glowDark 1.5s ease-in-out infinite alternate;
}
</style>
