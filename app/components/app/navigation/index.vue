<template>
  <nav
    class="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
    <div class="container flex h-14 max-w-screen-2xl items-center">
      <!-- Left: Mobile Menu + App Logo -->
      <div class="flex items-center">
        <AppNavigationMobile />
        <AppNavigationLogo />
      </div>

      <!-- Center: Navigation Menu -->
      <AppNavigationMenu />

      <!-- Right: Action Icons -->
      <AppNavigationActions />
    </div>
  </nav>
</template>

<script setup lang="ts">
// Clean main navigation component that composes all parts
</script>
