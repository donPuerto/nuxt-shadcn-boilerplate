<!-- filepath: d:\Code\Nuxt\v4\LearnNuxt\nuxt-shadcn-boilerplate\app\components\ThreeBackground.client.vue -->
<template>
  <div 
    id="three-background" 
    class="fixed inset-0 z-0" 
    :style="{
      opacity: visible ? 1 : 0,
      pointerEvents: 'none'
    }"
  />
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import * as THREE from 'three'
import { useThreeBackground } from '~/composables/useThreeBackground'

// Get settings from the composable
const threeBackground = useThreeBackground()

// Track visibility
const visible = ref(false)

// Hold references
let scene, camera, renderer
let stars = []
let animationFrame

// Function to create the visualization
function createVisualization() {
  console.log('Creating ThreeBackground visualization')
  
  // Clean up existing scene if any
  if (scene) {
    cleanupScene()
  }
  
  // Create scene, camera, renderer
  scene = new THREE.Scene()
  
  // Use a perspective camera with reasonable defaults
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  )
  camera.position.z = 100
  
  // Create renderer
  renderer = new THREE.WebGLRenderer({ 
    antialias: true,
    alpha: true 
  })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(window.devicePixelRatio)
  
  // Find the container element
  const container = document.getElementById('three-background')
  if (!container) {
    console.error('Three.js container element not found!')
    return false
  }
  
  // Clear any existing canvases
  while (container.firstChild) {
    container.removeChild(container.firstChild)
  }
  
  // Add the renderer DOM element to the container
  container.appendChild(renderer.domElement)
  
  // Create stars
  createStars()
  
  // Show the visualization
  visible.value = true
  
  // Start animation
  animate()
  
  // Log successful creation
  console.log('ThreeBackground visualization created successfully')
  console.log('Current settings:', {
    count: threeBackground.settings.stars.count,
    size: threeBackground.settings.stars.size,
    speed: threeBackground.settings.stars.speed
  })
  
  return true
}

// Function to create stars based on settings
function createStars() {
  console.log('Creating stars with settings:', {
    count: threeBackground.settings.stars.count,
    size: threeBackground.settings.stars.size,
    colors: threeBackground.settings.stars.colors
  })
  
  const { count, size, colors } = threeBackground.settings.stars
  
  // Clear existing stars
  stars.forEach(star => {
    if (star && star.geometry) star.geometry.dispose()
    if (star && star.material) star.material.dispose()
    if (star && scene) scene.remove(star)
  })
  stars = []
  
  // Geometry for all stars
  const geometry = new THREE.BufferGeometry()
  const vertices = []
  
  // Use bigger bounds for more immersive feel
  const bounds = 300
  
  // Generate random star positions
  for (let i = 0; i < count; i++) {
    const x = Math.random() * bounds - bounds/2
    const y = Math.random() * bounds - bounds/2
    const z = Math.random() * bounds - bounds/2
    vertices.push(x, y, z)
  }
  
  // Set position attribute
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3))
  
  // Create points with the geometry
  const material = new THREE.PointsMaterial({
    size: size,
    sizeAttenuation: true,
    transparent: true,
    opacity: 0.8
  })
  
  // Set color based on settings
  if (colors && colors.length > 0) {
    // Use the first color as base
    material.color = new THREE.Color(colors[0])
  }
  
  // Create the star system
  const starSystem = new THREE.Points(geometry, material)
  scene.add(starSystem)
  stars.push(starSystem)
  
  // If there are multiple colors, create additional star systems
  if (colors && colors.length > 1) {
    for (let i = 1; i < colors.length; i++) {
      // Create additional smaller star systems with different colors
      const subGeometry = new THREE.BufferGeometry()
      const subVertices = []
      
      // Fewer stars in the additional systems
      const subCount = Math.floor(count / (colors.length * 2))
      
      for (let j = 0; j < subCount; j++) {
        const x = Math.random() * bounds - bounds/2
        const y = Math.random() * bounds - bounds/2
        const z = Math.random() * bounds - bounds/2
        subVertices.push(x, y, z)
      }
      
      subGeometry.setAttribute('position', new THREE.Float32BufferAttribute(subVertices, 3))
      
      // Create material with the current color
      const subMaterial = new THREE.PointsMaterial({
        size: size * 1.2, // Slightly larger
        sizeAttenuation: true,
        transparent: true,
        opacity: 0.7,
        color: new THREE.Color(colors[i])
      })
      
      const subSystem = new THREE.Points(subGeometry, subMaterial)
      scene.add(subSystem)
      stars.push(subSystem)
    }
  }
  
  console.log(`Created ${stars.length} star systems with ${count} total stars`)
}

// Animation function
function animate() {
  animationFrame = requestAnimationFrame(animate)
  
  if (!scene || !camera || !renderer || stars.length === 0) return
  
  // Get speed from settings
  const speed = threeBackground.settings.stars.speed * 0.0005
  
  // Rotate each star system slightly
  stars.forEach((star, i) => {
    star.rotation.x += speed * (i % 2 === 0 ? 1 : -1)
    star.rotation.y += speed * 0.7
  })
  
  // Render the scene
  renderer.render(scene, camera)
}

// Handle window resize
function handleResize() {
  if (!camera || !renderer) return
  
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
}

// Clean up the scene
function cleanupScene() {
  console.log('Cleaning up ThreeBackground scene')
  
  if (animationFrame) {
    cancelAnimationFrame(animationFrame)
    animationFrame = null
  }
  
  // Clean up stars
  stars.forEach(star => {
    if (star && star.geometry) star.geometry.dispose()
    if (star && star.material) star.material.dispose()
    if (star && scene) scene.remove(star)
  })
  stars = []
  
  // Clean up scene, camera, renderer
  if (renderer) {
    renderer.dispose()
    const container = document.getElementById('three-background')
    if (container && renderer.domElement) {
      container.removeChild(renderer.domElement)
    }
  }
  
  scene = null
  camera = null
  renderer = null
}

// Update the visualization with current settings
function updateVisualization() {
  console.log('Updating ThreeBackground visualization with settings:', {
    count: threeBackground.settings.stars.count,
    size: threeBackground.settings.stars.size,
    speed: threeBackground.settings.stars.speed
  })
  
  if (!scene) {
    console.log('Scene does not exist, creating new visualization')
    createVisualization()
    return
  }
  
  // Recreate the stars with new settings
  createStars()
}

// Watch for individual star settings changes to ensure real-time updates
watch(() => threeBackground.settings.stars.count, (newValue) => {
  console.log('Star count changed to:', newValue)
  updateVisualization()
})

watch(() => threeBackground.settings.stars.size, (newValue) => {
  console.log('Star size changed to:', newValue)
  updateVisualization()
})

// No need to watch speed as it's used directly in animate function

// Also watch the updateTrigger for forced updates
watch(() => threeBackground.updateTrigger, () => {
  console.log('Force update triggered from updateTrigger')
  updateVisualization()
})

// Initialize on mount
onMounted(() => {
  console.log('ThreeBackground component mounted')
  
  // Create the visualization
  createVisualization()
  
  // Add resize listener
  window.addEventListener('resize', handleResize)
})

// Clean up on unmount
onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
  cleanupScene()
})
</script>
