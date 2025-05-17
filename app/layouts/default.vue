<template>
  <div class="flex min-h-screen flex-col">
    <!-- Navigation is a separate component -->
    <AppNavigation />
    <main class="container mx-auto px-4 py-8 flex-1">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>

<script setup>
// No need to explicitly import components with Nuxt auto-imports
</script>



