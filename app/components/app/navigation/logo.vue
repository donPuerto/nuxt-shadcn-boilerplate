<template>
  <NuxtLink to="/" class="flex items-center space-x-2 select-none">
    <span class="inline-block">
      <!-- Dark mode logo -->
      <svg
        v-if="$colorMode.value === 'dark'"
        class="h-8 w-8 transition-all duration-300"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <!-- Gradient background -->
        <defs>
          <linearGradient id="darkGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#1e293b"/>
            <stop offset="100%" style="stop-color:#0f172a"/>
          </linearGradient>
        </defs>
        <circle cx="16" cy="16" r="15" fill="url(#darkGradient)" stroke="#334155" stroke-width="1"/>
        <!-- Refined N with better proportions -->
        <path d="M9 23V9h3v8.5l6-8.5h3v14h-3v-8.5L12 23H9z" fill="#f8fafc"/>
        <!-- Accent dot -->
        <circle cx="25" cy="7" r="1.5" fill="#00dc82"/>
      </svg>
      
      <!-- Light mode logo -->
      <svg
        v-else-if="$colorMode.value === 'light'"
        class="h-8 w-8 transition-all duration-300"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <!-- Gradient background -->
        <defs>
          <linearGradient id="lightGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#f8fafc"/>
            <stop offset="100%" style="stop-color:#e2e8f0"/>
          </linearGradient>
        </defs>
        <circle cx="16" cy="16" r="15" fill="url(#lightGradient)" stroke="#cbd5e1" stroke-width="1"/>
        <!-- Refined N with better proportions -->
        <path d="M9 23V9h3v8.5l6-8.5h3v14h-3v-8.5L12 23H9z" fill="#1e293b"/>
        <!-- Accent dot -->
        <circle cx="25" cy="7" r="1.5" fill="#00dc82"/>
      </svg>
      
      <!-- System mode logo -->
      <svg
        v-else
        class="h-8 w-8 transition-all duration-300"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle 
          cx="16" 
          cy="16" 
          r="15" 
          :fill="systemModeCircleFill" 
          :stroke="systemModeCircleStroke" 
          stroke-width="1"
          class="transition-colors duration-300"
        />
        <!-- Refined N with better proportions -->
        <path 
          d="M9 23V9h3v8.5l6-8.5h3v14h-3v-8.5L12 23H9z" 
          :fill="systemModePathFill"
          class="transition-colors duration-300"
        />
        <!-- Accent dot -->
        <circle cx="25" cy="7" r="1.5" fill="#00dc82"/>
      </svg>
    </span>
    <span class="hidden font-bold sm:inline-block text-lg text-foreground transition-colors duration-300">
      {{ appConfig?.app?.name || 'Nuxt Shadcn Boilerplate' }}
    </span>
  </NuxtLink>
</template>

<script setup lang="ts">
const { $colorMode } = useNuxtApp()
const appConfig = useAppConfig()

// Computed properties for system mode colors
const systemModeCircleFill = computed(() => {
  return 'hsl(var(--background))'
})

const systemModeCircleStroke = computed(() => {
  return 'hsl(var(--border))'
})

const systemModePathFill = computed(() => {
  return 'hsl(var(--foreground))'
})
</script>

<style scoped>
/* Enhanced hover effect with glow */
.select-none:hover svg {
  transform: scale(1.05);
  filter: drop-shadow(0 4px 8px rgba(0, 220, 130, 0.2));
}

/* Smooth transition for all effects */
.select-none svg {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
