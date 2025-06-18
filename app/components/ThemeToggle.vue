<template>
  <ClientOnly>
    <Button variant="ghost" size="icon" class="h-8 w-8" @click="toggleSidebar">
      <Icon name="lucide:settings" class="h-4 w-4" />
      <span class="sr-only">Open theme customizer</span>
    </Button>
    <!-- Fallback template while client-side JS is loading -->
    <template #fallback>
      <Button variant="ghost" size="icon" class="h-9 w-9 p-0">
        <Icon name="lucide:loader-2" class="h-[1.2rem] w-[1.2rem] animate-spin" />
      </Button>

    </template>
  </ClientOnly>
</template>

<script setup lang="ts">
const settings = useAppSettings()

function toggleSidebar() {
  try {
    if (settings?.toggleSidebar) {
      settings.toggleSidebar()
    }
  } catch (error) {
    console.warn('Failed to toggle sidebar:', error)
  }
}
</script>
