<template>
  <header class="bg-background sticky inset-x-0 top-0 isolate z-10 flex shrink-0 items-center gap-2 border-b">
    <div class="container flex h-14 items-center">
      <!-- Left side: Logo and Title -->
      <div class="flex items-center">
        <AppNavigationLogo />
      </div>

      <!-- Center: Main Navigation -->
      <nav class="hidden md:flex flex-1 items-center justify-center">
        <ul class="flex space-x-6">
          <li v-for="item in navigationItems" :key="item.path">
            <NuxtLink 
              :to="item.path" 
              class="relative py-1.5 px-1 text-sm font-medium transition-colors hover:text-primary"
              active-class="text-primary after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-primary"
            >
              {{ $t(item.i18nKey) }}
            </NuxtLink>
          </li>
        </ul>
      </nav>

      <!-- Theme and Language -->
      <div class="ml-auto flex items-center space-x-2">
        <ThemePopover />
        <LanguageSwitcher />
        <ModeSwitcher />
      </div>
    </div>
    
  </header>
</template>

<script setup lang="ts">


// Navigation items configuration
const navigationItems = [
  { path: '/', i18nKey: 'navigation.home' },
  { path: '/components', i18nKey: 'navigation.components' },
  { path: '/roadmap', i18nKey: 'navigation.roadmap' }
]



</script>

<style scoped>
/* Optional: Add hover effects for navigation items */
.nav-item {
  position: relative;
}

.nav-item::after {
  content: '';
  position: absolute;
  width: 0;
  height: 2px;
  bottom: -2px;
  left: 0;
  background-color: currentColor;
  transition: width 0.3s ease;
}

.nav-item:hover::after {
  width: 100%;
}
</style>
