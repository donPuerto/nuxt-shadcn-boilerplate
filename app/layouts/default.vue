<template>
  <div class="min-h-screen flex flex-col bg-background">
    <!-- Make sure to use the proper component name -->
    <AppNavigation />
    <main class="flex-1">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>

<script setup>
// No need to explicitly import components with Nuxt auto-imports
</script>



