<!-- filepath: d:\Code\Nuxt\v4\LearnNuxt\nuxt-shadcn-boilerplate\app\layouts\dashboard\default.vue -->
<script setup lang="ts">
// Get dashboard config from app.config.ts
const appConfig = useAppConfig();
const dashboardConfig = appConfig.dashboard || {};
</script>

<template>
  <div class="min-h-screen bg-background">
    <slot />
  </div>
</template>
