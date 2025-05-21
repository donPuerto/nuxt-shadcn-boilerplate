import { ref, computed } from 'vue'

export const useVantaEffect = () => {
  // Get app config
  const config = useAppConfig()

  // Track active preset as a ref
  const activeEffect = ref(config.defaultVantaEffect || 'waves')

  // Effect options
  const effectOptions = {
    waves: {
      color: 0x1a237e,
      waveHeight: 20,
      shininess: 50,
      waveSpeed: 1.5,
      zoom: 0.75
    },
    birds: {
      backgroundColor: 0x07192f,
      color1: 0x3e88e5,
      color2: 0x5e35b1,
      colorMode: 'variance',
      quantity: 3,
      birdSize: 1.5,
      wingSpan: 30,
      speedLimit: 5,
      separation: 20
    },
    net: {
      color: 0x3f51b5,
      backgroundColor: 0x0d47a1,
      points: 10,
      maxDistance: 20,
      spacing: 15
    },
    cells: {
      color1: 0x0d47a1,
      color2: 0x00897b,
      size: 1.5,
      speed: 1
    },
    fog: {
      highlightColor: 0xffffff,
      midtoneColor: 0x3f51b5,
      lowlightColor: 0x0d47a1,
      baseColor: 0x102035,
      speed: 1.5
    }
  }

  // Computed property to get current effect options
  const currentEffectOptions = computed(() => 
    effectOptions[activeEffect.value] || effectOptions.waves
  )

  // Get effect names
  const effectNames = computed(() => Object.keys(effectOptions))

  return {
    // Return the ref itself for two-way binding
    activeEffect,
    // Return the computed property for reactive updates
    currentEffectOptions,
    // Return the computed property for reactive updates
    effectNames,
    setEffect: (effect) => {
      if (effectOptions[effect]) {
        activeEffect.value = effect
      }
    }
  }
}
