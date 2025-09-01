<template>
  <div class="relative min-h-screen w-full flex flex-col">
    <!-- Navigation -->
    <AppNav />

    <!-- Main Content -->
    <main class="container flex-1 py-6">
      <slot />
    </main>
    <ClientOnly>
      <FluidCursor />
    </ClientOnly>
    <CommonThemeCustomizer />
  </div>
</template>

<script setup lang="ts">
// import { FluidCursor } from '@/app/components/ui/fluid-cursor/FluidCursor.vue'

// Clean layout that uses the navigation component
</script>
