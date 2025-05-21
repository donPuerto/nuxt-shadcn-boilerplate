<template>
  <div ref="vantaRef" class="absolute inset-0 z-0 w-full min-h-screen bg-transparent"/>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import * as THREE from 'three'

const vantaRef = ref(null)
let vantaEffect = null

onMounted(async () => {
  console.log('VantaBackground mounted')
  
  if (typeof window !== 'undefined' && vantaRef.value) {
    try {
      console.log('Loading birds effect')
      const BIRDS = (await import('vanta/dist/vanta.birds.min')).default
      console.log('Birds effect loaded:', BIRDS)
      
      vantaEffect = BIRDS({
        el: vantaRef.value,
        THREE,
        backgroundColor: 0x000000,
        color1: 0x3e88e5,
        color2: 0x5e35b1,
        colorMode: 'lerpGradient',
        quantity: 3,
        birdSize: 1.5,
        wingSpan: 30,
        speedLimit: 5,
        separation: 20
      })
      
      console.log('Effect created:', vantaEffect)
    } catch (error) {
      console.error('Error initializing Vanta effect:', error)
    }
  }
})

onUnmounted(() => {
  if (vantaEffect) {
    vantaEffect.destroy()
  }
})
</script>
