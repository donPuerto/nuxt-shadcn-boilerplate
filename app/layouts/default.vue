<!-- filepath: d:\Code\Nuxt\v4\LearnNuxt\nuxt-shadcn-boilerplate\app\layouts\default.vue -->
<template>
  <div class="flex min-h-screen flex-col relative">
    <!-- THREE.js background - only render on client side -->
    <ClientOnly>
      <ThreeBackground />
    </ClientOnly>
    
    <!-- Background Controls -->
    <ClientOnly>
      <div class="fixed top-20 right-4 z-20">
        <div class="bg-white/80 dark:bg-gray-800/80 p-3 rounded-lg shadow-lg">
          <!-- Preset Themes Selector -->
          <div class="mb-3">
            <label class="block text-sm font-medium mb-1">Preset Themes</label>
            <div class="flex space-x-2 flex-wrap gap-1">
              <button 
                v-for="(preset, name) in threeBackground.presets" 
                :key="name"
                class="px-2 py-1 text-xs rounded bg-gray-200 dark:bg-gray-700"
                @click="threeBackground.applyPreset(name)"
              >
                {{ name }}
              </button>
            </div>
          </div>

          <div class="mb-2">
            <label class="block text-sm font-medium mb-1">Star Count</label>
            <input 
              v-model.number="threeBackground.settings.stars.count" 
              type="range" 
              min="1000" 
              max="15000" 
              step="500"
              class="w-full"
            >
          </div>
          <div class="mb-2">
            <label class="block text-sm font-medium mb-1">Speed</label>
            <input 
              v-model.number="threeBackground.settings.stars.speed" 
              type="range" 
              min="0.1" 
              max="3" 
              step="0.1"
              class="w-full"
            >
          </div>
          <div class="mb-2">
            <label class="block text-sm font-medium mb-1">Star Size</label>
            <input 
              v-model.number="threeBackground.settings.stars.size" 
              type="range" 
              min="1" 
              max="5" 
              step="0.5"
              class="w-full"
            >
          </div>
        </div>
      </div>
    </ClientOnly>
    
    <div class="relative z-10 flex flex-col min-h-screen">
      <AppNavigation />
      
      <main class="container mx-auto px-4 py-8 flex-1">
        <slot />
      </main>
      <AppFooter />
    </div>
  </div>
</template>

<script setup>
import ThreeBackground from '~/components/ThreeBackground.client.vue'
import { useThreeBackground } from '~/composables/useThreeBackground'

// Get background settings
const threeBackground = useThreeBackground()
</script>
