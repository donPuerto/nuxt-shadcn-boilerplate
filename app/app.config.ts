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
  // Default Theme Customization
  theme: {
    default: 'zinc',
    defaultRadius: 0.5,
    availableColors: [
      'zinc',
      'rose',
      'blue',
      'green',
      'orange',
      'red',
      'slate',
      'stone',
      'gray',
      'neutral',
      'yellow',
      'violet',
    ]
  },
  icon: {
    mode: 'css',
    cssLayer: 'base'
  }
})
