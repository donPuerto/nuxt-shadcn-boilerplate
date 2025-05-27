<!-- filepath: d:\Code\Nuxt\v4\LearnNuxt\nuxt-shadcn-boilerplate\app\components\app\navigation\index.vue -->
<template>
  <header class="sticky top-0 z-40 w-full border-b border-transparent backdrop-blur-sm">
    <div class="container mx-auto flex h-16 items-center justify-between px-4">
      <!-- Left side: Logo and Title -->
      <div class="flex items-center gap-6">
        <AppNavigationLogo />
      </div>

      <!-- Center: Main Navigation -->
      <nav class="hidden gap-6 md:flex">
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
      <div class="flex items-center gap-2">
        <!-- Add ThreeBackground popover here -->
        <ThreeBackgroundPopover />
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
  { path: '/dashboard', i18nKey: 'navigation.components' },
  { path: '/roadmap', i18nKey: 'navigation.roadmap' }
]
</script>
