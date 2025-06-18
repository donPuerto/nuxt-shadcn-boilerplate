<template>
  <div class="flex items-center space-x-2">
    <img v-if="appConfig?.brand?.logo" :src="appConfig.brand.logo" :alt="appConfig?.app?.name" class="h-6 w-6">
    <span class="hidden font-bold sm:inline-block">
      {{ appConfig?.app?.name || 'Nuxt Shadcn' }}
    </span>
  </div>
</template>

<script setup lang="ts">
const { $config } = useNuxtApp()

// Get app config
const appConfig = computed(() => $config?.shared?.app || null)
</script>
