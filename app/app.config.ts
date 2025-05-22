export default defineAppConfig({
  app: {
    header: {
      title: 'shadcn-docs',
    }
  },
  ui: {
    // Theme settings
  },
  // Default particles preset
  defaultVantaEffect: 'waves',
  // Three.js Background Settings
  threeBackground: {
    defaultPreset: 'default',
    presets: {
      default: {
        count: 7000,
        speed: 5,
        size: 2,
        colors: ['#3f51b5', '#5e35b1', '#1a237e', '#0d47a1'] // Blues
      },
      sunset: {
        count: 5000,
        speed: 0.8,
        size: 2.5,
        colors: ['#ff9e80', '#ff6e40', '#ff3d00', '#dd2c00'] // Oranges
      },
      emerald: {
        count: 6000,
        speed: 0.9,
        size: 2,
        colors: ['#00c853', '#00e676', '#69f0ae', '#004d40'] // Greens
      },
      galaxy: {
        count: 10000,
        speed: 1.5,
        size: 1.5,
        colors: ['#aa00ff', '#d500f9', '#e040fb', '#304ffe'] // Purple/Blue
      }
    }
  },
  theme: {
    default: 'zinc',
    defaultRadius: 0.5,
    availableColors: [
      'zinc', 'rose', 'blue', 'green', 'orange', 'red',
      'slate', 'stone', 'gray', 'neutral', 'yellow', 'violet',
    ]
  },
  icon: {
    mode: 'css',
    cssLayer: 'base'
  }
})
