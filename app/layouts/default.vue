<template>
  <div class="relative min-h-screen w-full flex flex-col">
    <!-- Navigation (wrapped in layout container) -->
    <div class="w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div class="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        <AppNav />
      </div>
    </div>

    <!-- Main Content -->
    <main class="flex-1 w-full">
      <div class="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6">
        <slot />
      </div>
    </main>
    <ClientOnly>
      <FluidCursor />
    </ClientOnly>
    <CommonThemeCustomizer class="fixed bottom-4 right-4 z-50" />
    <!-- NEW BackToTop -->
    <BackToTop />
  </div>
</template>

<script setup lang="ts">
import BackToTop from "@/components/common/BackToTop.vue"
// import { useTheme } from '@/composables/useTheme'

// const { currentPrimaryColor, currentNeutralColor, currentRadius, fontScale, direction } = useTheme()
// useHead(() => ({
//   htmlAttrs: {
//     'data-theme-primary': currentPrimaryColor.value,
//     'data-theme-neutral': currentNeutralColor.value,
//     'data-radius': String(currentRadius.value),
//     'data-font': fontScale.value,
//     dir: direction.value
//   }
// }))
</script>
