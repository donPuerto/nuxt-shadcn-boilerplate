<!-- filepath: d:\Code\Nuxt\v4\LearnNuxt\nuxt-shadcn-boilerplate\app\components\ThreeBackground.client.vue -->
<template>
  <div ref="threeContainer" class="absolute inset-0 z-0 w-full min-h-screen"/>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue'
import * as THREE from 'three'
import { useThreeBackground } from '~/composables/useThreeBackground'

const threeContainer = ref(null)
let renderer, scene, camera, stars
let animationFrame = null
let handleResize = null

// Get background settings from composable
const threeBackground = useThreeBackground()

// Convert hex color strings to THREE.Color objects
function hexToThreeColor(hexColors) {
  return hexColors.map(hex => new THREE.Color(hex))
}

// Force recreation of stars with new settings
function recreateStars() {
  console.log('Recreating stars with settings:', {
    count: threeBackground.settings.stars.count,
    size: threeBackground.settings.stars.size,
    colors: threeBackground.settings.stars.colors
  })
  
  // Remove current stars if they exist
  if (stars) {
    scene.remove(stars)
    stars.geometry.dispose()
    stars.material.dispose()
  }
  
  // Create new stars
  stars = createStarfield()
}

// Create and update the starfield based on current settings
function createStarfield() {
  if (!scene) return null

  // Performance safeguard - limit star count
  const starSettings = threeBackground.settings.stars
  const particleCount = Math.min(starSettings.count, 15000) // Limit to 15,000 maximum
  
  // Create geometry
  const particles = new THREE.BufferGeometry()
  const positions = new Float32Array(particleCount * 3)
  const colors = new Float32Array(particleCount * 3)
  
  // Convert hex colors to THREE colors
  const colorOptions = hexToThreeColor(starSettings.colors)
  console.log('Using colors:', starSettings.colors, 'converted to:', colorOptions)
  
  for (let i = 0; i < particleCount * 3; i += 3) {
    // Positions - spread stars throughout the scene
    positions[i] = (Math.random() - 0.5) * 2000
    positions[i + 1] = (Math.random() - 0.5) * 2000
    positions[i + 2] = (Math.random() - 0.5) * 2000
    
    // Random color from our options
    const colorIndex = Math.floor(Math.random() * colorOptions.length)
    const color = colorOptions[colorIndex]
    colors[i] = color.r
    colors[i + 1] = color.g
    colors[i + 2] = color.b
  }
  
  particles.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  particles.setAttribute('color', new THREE.BufferAttribute(colors, 3))
  
  const material = new THREE.PointsMaterial({
    size: starSettings.size,
    vertexColors: true,
    transparent: true,
    opacity: 0.8,
    sizeAttenuation: true
  })
  
  const newStars = new THREE.Points(particles, material)
  scene.add(newStars)
  
  return newStars
}

// Initialize THREE.js scene
function initThreeScene() {
  if (!threeContainer.value) return
  
  try {
    // Create scene
    scene = new THREE.Scene()
    
    // Create camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000)
    camera.position.z = 1000
    
    // Create renderer with optimizations
    renderer = new THREE.WebGLRenderer({ 
      antialias: false, 
      alpha: true,
      powerPreference: 'high-performance'
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    
    // Use device pixel ratio, but cap it for performance
    const pixelRatio = Math.min(window.devicePixelRatio, 2)
    renderer.setPixelRatio(pixelRatio)
    
    threeContainer.value.appendChild(renderer.domElement)
    
    // Create stars
    stars = createStarfield()
    
    // Setup resize handler with debounce
    handleResize = () => {
      if (!camera || !renderer) return
      
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    
    let resizeTimeout
    const debouncedResize = () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(handleResize, 250)
    }
    window.addEventListener('resize', debouncedResize)
    
    // Start animation
    animate()
    
    console.log('THREE.js scene initialized')
  } catch (error) {
    console.error('Error initializing THREE.js scene:', error)
  }
}

// Animation loop
function animate() {
  if (!scene || !camera || !renderer || !stars) return
  
  // Get current speed
  const speed = threeBackground.settings.stars.speed
  
  // Rotate the stars based on speed setting
  stars.rotation.x += 0.0003 * speed
  stars.rotation.y += 0.0002 * speed
  
  // Move through space
  stars.position.z += 0.1 * speed
  if (stars.position.z > 300) {
    stars.position.z = 0
  }
  
  renderer.render(scene, camera)
  
  // Use the return value to be able to cancel the animation
  animationFrame = requestAnimationFrame(animate)
}

// Debounce the updates to prevent excessive rerendering
let updateTimeout = null

// Update the visualization when settings change
function updateVisualization() {
  // Clear previous timeout if it exists
  if (updateTimeout) {
    clearTimeout(updateTimeout)
  }
  
  // Debounce visualization updates
  updateTimeout = setTimeout(() => {
    if (!scene) return
    
    console.log('Executing deferred visualization update')
    
    // Cancel the animation frame first
    if (animationFrame) {
      cancelAnimationFrame(animationFrame)
    }
    
    // Recreate stars with new settings
    recreateStars()
    
    // Restart animation
    animationFrame = requestAnimationFrame(animate)
  }, 300) // Wait 300ms before updating
}

// Watch for preset changes directly
watch(() => threeBackground.activePreset.value, (newPreset, oldPreset) => {
  if (newPreset !== oldPreset) {
    console.log(`Preset changed from '${oldPreset}' to '${newPreset}'`)
    nextTick(() => {
      updateVisualization()
    })
  }
}, { immediate: true })

// Watch for individual property changes
watch(() => threeBackground.settings.stars.count, (newCount) => {
  console.log('Star count changed:', newCount)
  updateVisualization()
})

watch(() => threeBackground.settings.stars.size, (newSize) => {
  console.log('Star size changed:', newSize)
  updateVisualization()
})

// Watch for color changes using a function to create a new array reference
watch(() => [...threeBackground.settings.stars.colors], (newColors) => {
  console.log('Colors changed:', newColors)
  updateVisualization()
}, { deep: true })

// Speed doesn't require recreation of stars
watch(() => threeBackground.settings.stars.speed, (newSpeed) => {
  console.log('Speed updated:', newSpeed)
})

onMounted(() => {
  if (typeof window !== 'undefined') {
    console.log('ThreeBackground component mounted')
    
    // Initialize with a small delay to avoid initial freezing
    setTimeout(() => {
      initThreeScene()
      
      // Force apply preset after initialization
      const currentPreset = threeBackground.activePreset.value
      console.log('Applying initial preset:', currentPreset)
      threeBackground.applyPreset(currentPreset)
    }, 100)
  }
})

onUnmounted(() => {
  // Cancel animation frame
  if (animationFrame) {
    cancelAnimationFrame(animationFrame)
    animationFrame = null
  }
  
  // Clear any pending timeouts
  if (updateTimeout) {
    clearTimeout(updateTimeout)
    updateTimeout = null
  }
  
  // Remove event listeners
  if (handleResize) {
    window.removeEventListener('resize', handleResize)
  }
  
  // Clean up resources
  if (renderer) {
    if (renderer.domElement) {
      renderer.domElement.remove()
    }
    renderer.dispose()
    renderer = null
  }
  
  if (stars) {
    if (scene) scene.remove(stars)
    stars.geometry.dispose()
    stars.material.dispose()
    stars = null
  }
  
  scene = null
  camera = null
})
</script>
