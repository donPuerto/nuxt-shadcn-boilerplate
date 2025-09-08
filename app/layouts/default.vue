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
    <CommonThemeCustomizer class="fixed bottom-4 right-4 z-50" />
  </div>
</template>

<script setup lang="ts">
import { useTheme } from '@/composables/useTheme'

const { currentPrimaryColor, currentNeutralColor, currentRadius, fontScale, direction } = useTheme()
useHead(() => ({
  htmlAttrs: {
    'data-theme-primary': currentPrimaryColor.value,
    'data-theme-neutral': currentNeutralColor.value,
    'data-radius': String(currentRadius.value),
    'data-font': fontScale.value,
    dir: direction.value
  }
}))
</script>
