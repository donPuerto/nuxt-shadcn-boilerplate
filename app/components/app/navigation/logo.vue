<template>
  <NuxtLink to="/" class="flex items-center gap-3">
    <div class="w-8 h-8">
      <!-- SVG Logo with dark/light mode support -->
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full">
        <!-- Main shape - changes color based on theme -->
        <path 
          d="M12 2L2 7V17L12 22L22 17V7L12 2Z" 
          class="fill-primary-600 dark:fill-primary-400" 
          stroke="currentColor" 
          stroke-width="1.5"
        />
        <!-- Inner N for Nuxt - always contrasts with background -->
        <path 
          d="M8 8L8 16M8 8L16 16M16 8V16" 
          stroke="currentColor" 
          class="stroke-white dark:stroke-gray-900" 
          stroke-width="1.5" 
          stroke-linecap="round" 
          stroke-linejoin="round"
        />
      </svg>
    </div>
    <span class="text-lg font-semibold whitespace-nowrap">Nuxt Boilerplate</span>
  </NuxtLink>
</template>

<style scoped>
/* Optional: Add some animation to the logo */
@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

.logo-animate:hover {
  animation: pulse 1s infinite;
}
</style>
