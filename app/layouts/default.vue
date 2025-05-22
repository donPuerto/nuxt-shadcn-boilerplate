<!-- filepath: d:\Code\Nuxt\v4\LearnNuxt\nuxt-shadcn-boilerplate\app\layouts\default.vue -->
<template>
  <div class="flex min-h-screen flex-col relative">
    <!-- ThreeBackground component wrapped correctly in ClientOnly -->
    <ClientOnly>
      <!-- Explicitly give ThreeBackground control of the canvas z-index and sizing -->
      <ThreeBackground />
    </ClientOnly>
    
    <!-- Main content -->
    <div class="relative z-10 flex flex-col min-h-screen bg-transparent">
      <AppNavigation />
      
      <main class="container mx-auto px-4 py-8 flex-1">
        <slot />
      </main>
      
      <AppFooter />
    </div>
  </div>
</template>

<script setup>
// Import the ThreeBackground component
import ThreeBackground from '~/components/ThreeBackground.client.vue'
</script>
