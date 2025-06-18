export const themeCustomizerConfig = {
  // Customizer UI settings
  ui: {
    enabled: true,
    position: 'right', // 'left' | 'right'
    trigger: 'floating', // 'floating' | 'menu' | 'both'
    defaultOpen: false,
    showPreview: true,
    showResetButton: true
  },

  // Floating button settings
  floatingButton: {
    enabled: true,
    position: 'bottom-right', // 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'
    icon: 'Palette',
    size: 'md', // 'sm' | 'md' | 'lg'
    variant: 'default', // 'default' | 'outline' | 'ghost'
    className: 'fixed z-50 shadow-lg',
    offset: {
      x: 24, // pixels from edge
      y: 24  // pixels from edge
    }
  },

  // Panel settings
  panel: {
    width: '320px',
    maxHeight: '80vh',
    backdrop: true,
    backdropBlur: true,
    animation: 'slide', // 'slide' | 'fade' | 'scale'
    className: 'border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'
  },

  // Sections configuration
  sections: [
    {
      key: 'color',
      title: 'Color Theme',
      icon: 'Palette',
      order: 1,
      enabled: true,
      description: 'Choose your preferred color scheme'
    },
    {
      key: 'mode',
      title: 'Appearance',
      icon: 'Monitor',
      order: 2,
      enabled: true,
      description: 'Toggle between light and dark mode'
    },
    {
      key: 'radius',
      title: 'Border Radius',
      icon: 'Square',
      order: 3,
      enabled: true,
      description: 'Adjust the roundness of components'
    },
    {
      key: 'preview',
      title: 'Preview',
      icon: 'Eye',
      order: 4,
      enabled: true,
      description: 'Preview your theme changes'
    }
  ],

  // Preview components
  preview: {
    enabled: true,
    components: [
      {
        type: 'button',
        variants: ['default', 'outline', 'ghost'],
        sizes: ['sm', 'md', 'lg']
      },
      {
        type: 'card',
        showContent: true,
        showHeader: true,
        showFooter: true
      },
      {
        type: 'input',
        placeholder: 'Preview input...',
        showLabel: true
      },
      {
        type: 'badge',
        variants: ['default', 'secondary', 'outline']
      }
    ]
  },

  // Keyboard shortcuts
  shortcuts: {
    enabled: true,
    toggleCustomizer: ['cmd', 'shift', 't'],
    resetTheme: ['cmd', 'shift', 'r'],
    toggleMode: ['cmd', 'shift', 'm']
  },

  // Export/Import settings
  exportImport: {
    enabled: true,
    showExport: true,
    showImport: true,
    includePresets: true
  },

  // Preset themes
  presets: [
    {
      name: 'Default',
      key: 'default',
      description: 'Clean and minimal design',
      settings: {
        color: 'zinc',
        mode: 'system',
        radius: 0.5
      }
    },
    {
      name: 'Vibrant',
      key: 'vibrant',
      description: 'Bold and colorful theme',
      settings: {
        color: 'blue',
        mode: 'light',
        radius: 0.75
      }
    },
    {
      name: 'Dark Pro',
      key: 'dark-pro',
      description: 'Professional dark theme',
      settings: {
        color: 'slate',
        mode: 'dark',
        radius: 0.25
      }
    },
    {
      name: 'Warm',
      key: 'warm',
      description: 'Warm and cozy feeling',
      settings: {
        color: 'orange',
        mode: 'light',
        radius: 1
      }
    },
    {
      name: 'Nature',
      key: 'nature',
      description: 'Fresh and natural',
      settings: {
        color: 'green',
        mode: 'light',
        radius: 0.5
      }
    }
  ]
}
