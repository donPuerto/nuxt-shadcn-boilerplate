<template>
  <ClientOnly>
    <Button variant="ghost" size="icon" class="h-8 w-8" @click="theme.toggleCustomizer">
      <Icon name="lucide:palette" class="h-4 w-4" />
      <span class="sr-only">Open theme customizer</span>
    </Button>
    
    <template #fallback>
      <Button variant="ghost" size="icon" class="h-8 w-8">
        <Icon name="lucide:loader-2" class="h-4 w-4 animate-spin" />
      </Button>
    </template>
  </ClientOnly>
</template>

<script setup lang="ts">

const theme = useTheme()
</script>
