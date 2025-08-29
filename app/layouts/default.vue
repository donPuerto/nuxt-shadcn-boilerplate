<template>
  <div class="relative h-60 w-full flex flex-col items-center justify-center gap-4">
    <AppNav />
    <!-- Main Content -->
    <main>
      <slot />
    </main>
    <ClientOnly>
      <FluidCursor />
    </ClientOnly>

  </div>
</template>

<script setup lang="ts">
// import { FluidCursor } from '@/app/components/ui/fluid-cursor/FluidCursor.vue'

// Clean layout that uses the navigation component
</script>
