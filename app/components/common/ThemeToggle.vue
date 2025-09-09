<template>
  <ClientOnly>
    <!-- Theme Customizer Toggle Button -->
    <Button
      variant="outline"
      size="icon"
      class="h-9 w-9 transition-all duration-200"
      :style="{ borderRadius: `${currentRadius}rem` }"
      @click="handleToggleCustomizer"
    >
      <Icon name="lucide:palette" class="h-4 w-4" />
    </Button>
    
    <!-- Fallback for SSR - must match exactly -->
    <template #fallback>
      <Button
        variant="outline"
        size="icon"
        class="h-9 w-9 transition-all duration-200"
        style="border-radius: 0.5rem"
      >
        <Icon name="lucide:palette" class="h-4 w-4" />
      </Button>
    </template>
  </ClientOnly>
</template>

<script setup lang="ts">
import { Button } from '@/components/ui/button'

// ===== Composables =====
const theme = useTheme()

// ===== Reactive State =====

/**
 * Current border radius value with fallback
 * Ensures the button styling matches the current theme radius setting
 */
const currentRadius = computed(() => theme.currentRadius?.value || 0.5)

// ===== Event Handlers =====

/**
 * Handle theme customizer toggle button click
 * Opens the customizer if closed, closes it if open
 */
const handleToggleCustomizer = () => {
  if (theme.isOpen.value) {
    theme.closeCustomizer?.()
  } else {
    theme.openCustomizer?.()
  }
}

// ===== Accessibility Enhancement =====

/**
 * Add title attribute after component is mounted to avoid hydration issues
 * This provides accessibility without causing SSR/hydration mismatches
 */
onMounted(() => {
  if (import.meta.client) {
    const button = document.querySelector('[data-theme-toggle]')
    if (button) {
      button.setAttribute('title', 'Toggle theme customizer')
    }
  }
})
</script>
