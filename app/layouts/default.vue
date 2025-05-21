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
                class="px-2 py-1 text-xs rounded hover:bg-gray-300 dark:hover:bg-gray-600"
                :class="[
                  threeBackground.activePreset.value === name 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-200 dark:bg-gray-700'
                ]"
                @click="applyThemePreset(name)"
              >
                {{ name }}
              </button>
            </div>
          </div>
          
          <!-- Star Count Slider -->
          <div class="mb-2">
            <label class="block text-sm font-medium mb-1">Star Count: {{ threeBackground.settings.stars.count }}</label>
            <input 
              v-model.number="threeBackground.settings.stars.count" 
              type="range" 
              min="1000" 
              max="15000" 
              step="500"
              class="w-full"
            >
          </div>
          
          <!-- Star Size Slider -->
          <div class="mb-2">
            <label class="block text-sm font-medium mb-1">Star Size: {{ threeBackground.settings.stars.size }}</label>
            <input 
              v-model.number="threeBackground.settings.stars.size" 
              type="range" 
              min="0.5" 
              max="5" 
              step="0.5"
              class="w-full"
            >
          </div>
          
          <!-- Speed Slider -->
          <div class="mb-2">
            <label class="block text-sm font-medium mb-1">Speed: {{ threeBackground.settings.stars.speed }}</label>
            <input 
              v-model.number="threeBackground.settings.stars.speed" 
              type="range" 
              min="0.1" 
              max="3" 
              step="0.1"
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

// Function to apply a theme preset with additional logging
function applyThemePreset(presetName) {
  console.log('Button clicked for preset:', presetName)
  console.log('Current preset before change:', threeBackground.activePreset.value)
  
  threeBackground.applyPreset(presetName)
  
  console.log('Preset after change:', threeBackground.activePreset.value)
}
</script>
