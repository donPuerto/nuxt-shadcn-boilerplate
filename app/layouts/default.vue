<template>
  <div class="flex min-h-screen flex-col">
    
    <AppNavigation />
    <main class="container mx-auto flex-1 px-4 py-8">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>

<script setup>
// No need to explicitly import components with Nuxt auto-imports
</script>



