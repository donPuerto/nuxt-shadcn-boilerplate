<template>
  <header class="border-b sticky top-0 z-40 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
    <div class="container flex h-16 items-center">
      <!-- Left side: Logo and Title -->
      <div class="flex items-center gap-2 mr-4">
        <NuxtLink to="/" class="flex items-center gap-2">
          <!-- <img src="/logo.svg" alt="Logo" class="h-8 w-8" > -->
          <span class="font-semibold hidden sm:inline-block">Nuxt/Shadcn</span>
        </NuxtLink>
      </div>

      <!-- Center: Main Navigation -->
      <nav class="flex-1 flex items-center justify-center">
        <ul class="flex space-x-4">
          <li>
            <NuxtLink to="/" class="text-sm font-medium transition-colors hover:text-primary">
              Home
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/components" class="text-sm font-medium transition-colors hover:text-primary">
              Components
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/roadmap" class="text-sm font-medium transition-colors hover:text-primary">
              Roadmap
            </NuxtLink>
          </li>
        </ul>
      </nav>

      <!-- Right side: Theme and Language -->
      <div class="flex items-center gap-4">
        <!-- Theme Toggle -->
        <!-- <ThemeToggle /> -->
        
        <!-- Language Dropdown -->
        <LanguageSwitcher />
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import LanguageSwitcher from '@/components/LanguageSwitcher.vue'



</script>
