<template>
  <NuxtLink to="/" class="flex items-center space-x-2 select-none">
    <span class="inline-block">
      <svg
        v-if="colorMode === 'dark'"
        class="h-8 w-8"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="16" cy="16" r="16" fill="#18181b"/>
        <path d="M8 24L16 8L24 24H8Z" fill="#fff"/>
      </svg>
      <svg
        v-else
        class="h-8 w-8"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="16" cy="16" r="16" fill="#fff"/>
        <path d="M8 24L16 8L24 24H8Z" fill="#18181b"/>
      </svg>
    </span>
    <span class="hidden font-bold sm:inline-block text-lg">
      {{ appConfig?.app?.name || 'Nuxt Shadcn Boilerplate' }}
    </span>
  </NuxtLink>
</template>

<script setup lang="ts">
const colorMode = useColorMode()
const appConfig = useAppConfig() 
</script>