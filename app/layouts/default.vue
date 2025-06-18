<template>
  <div class="min-h-screen bg-background font-sans antialiased">
    <!-- Navigation -->
    <AppNavigation />

    <!-- Main Content -->
    <main class="flex-1">
      <slot />
    </main>

    <!-- Footer (optional) -->
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
// Clean layout that uses the navigation component
</script>
