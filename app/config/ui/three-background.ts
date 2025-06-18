export const threeBackgroundConfig = {
  // Default preset
  defaultPreset: 'default',
  
  // Available presets
  presets: {
    default: {
      name: 'Default',
      description: 'Calm blue particles',
      count: 7000,
      speed: 5,
      size: 2,
      colors: ['#3f51b5', '#5e35b1', '#1a237e', '#0d47a1'], // Blues
      opacity: 0.6,
      connections: true,
      mouse: {
        attract: true,
        repel: false,
        maxDistance: 100
      }
    },
    
    sunset: {
      name: 'Sunset',
      description: 'Warm orange and red tones',
      count: 5000,
      speed: 0.8,
      size: 2.5,
      colors: ['#ff9e80', '#ff6e40', '#ff3d00', '#dd2c00'], // Oranges
      opacity: 0.7,
      connections: true,
      mouse: {
        attract: true,
        repel: false,
        maxDistance: 120
      }
    },
    
    emerald: {
      name: 'Emerald',
      description: 'Fresh green nature vibes',
      count: 6000,
      speed: 0.9,
      size: 2,
      colors: ['#00c853', '#00e676', '#69f0ae', '#004d40'], // Greens
      opacity: 0.5,
      connections: true,
      mouse: {
        attract: true,
        repel: false,
        maxDistance: 90
      }
    },
    
    galaxy: {
      name: 'Galaxy',
      description: 'Mystical purple and blue space',
      count: 10000,
      speed: 1.5,
      size: 1.5,
      colors: ['#aa00ff', '#d500f9', '#e040fb', '#304ffe'], // Purple/Blue
      opacity: 0.8,
      connections: true,
      mouse: {
        attract: true,
        repel: false,
        maxDistance: 150
      }
    },
    
    minimal: {
      name: 'Minimal',
      description: 'Subtle monochrome particles',
      count: 3000,
      speed: 0.5,
      size: 1.5,
      colors: ['#ffffff', '#f5f5f5', '#e0e0e0', '#bdbdbd'], // Grays
      opacity: 0.3,
      connections: false,
      mouse: {
        attract: false,
        repel: false,
        maxDistance: 0
      }
    },
    
    cyberpunk: {
      name: 'Cyberpunk',
      description: 'Neon cyber aesthetic',
      count: 8000,
      speed: 2.5,
      size: 1.8,
      colors: ['#00ffff', '#ff00ff', '#ffff00', '#00ff00'], // Neon colors
      opacity: 0.9,
      connections: true,
      mouse: {
        attract: true,
        repel: true,
        maxDistance: 200
      }
    }
  },

  // Performance settings
  performance: {
    autoAdjust: true, // Automatically adjust based on device performance
    maxFPS: 60,
    
    // Device-specific settings
    mobile: {
      reduceParticles: 0.5, // Reduce particle count by 50%
      disableConnections: false,
      maxCount: 3000
    },
    
    lowEnd: {
      reduceParticles: 0.3, // Reduce by 70%
      disableConnections: true,
      maxCount: 2000
    }
  },

  // Interaction settings
  interactions: {
    mouse: {
      enabled: true,
      attract: true,
      repel: false,
      maxDistance: 100,
      strength: 1
    },
    
    touch: {
      enabled: true,
      multiTouch: false
    },
    
    scroll: {
      enabled: false,
      parallax: false,
      speed: 0.5
    }
  },

  // Canvas settings
  canvas: {
    alpha: true,
    antialias: false, // Disable for better performance
    powerPreference: 'high-performance',
    preserveDrawingBuffer: false
  },

  // Responsive breakpoints
  responsive: {
    breakpoints: {
      mobile: 768,
      tablet: 1024,
      desktop: 1440
    },
    
    // Settings per breakpoint
    settings: {
      mobile: {
        count: 2000,
        connections: false,
        mouse: { enabled: false }
      },
      tablet: {
        count: 4000,
        connections: true,
        mouse: { enabled: true }
      },
      desktop: {
        count: 7000,
        connections: true,
        mouse: { enabled: true }
      }
    }
  },

  // Debug settings (development only)
  debug: {
    enabled: process.env.NODE_ENV === 'development',
    showFPS: false,
    showParticleCount: false,
    showMousePosition: false
  }
}
