export const themeConfig = {
  // Default theme color (should match one of the available colors)
  color: 'zinc',
  
  // Default color mode preference
  mode: 'system', // 'light' | 'dark' | 'system'
  
  // Default border radius
  radius: 0.5,
  
  // Available theme colors
  availableColors: [
    'zinc', 'slate', 'stone', 'gray', 'neutral',
    'red', 'rose', 'orange', 'green', 'blue',
    'yellow', 'violet'
  ],
  
  // Color definitions for each theme
  colorDefinitions: {
    zinc: {
      name: 'Zinc',
      description: 'A neutral zinc color scheme',
      primary: '#71717a',
      preview: '#71717a'
    },
    slate: {
      name: 'Slate',
      description: 'A cool slate color scheme',
      primary: '#64748b',
      preview: '#64748b'
    },
    stone: {
      name: 'Stone',
      description: 'A warm stone color scheme',
      primary: '#78716c',
      preview: '#78716c'
    },
    gray: {
      name: 'Gray',
      description: 'A classic gray color scheme',
      primary: '#6b7280',
      preview: '#6b7280'
    },
    neutral: {
      name: 'Neutral',
      description: 'A balanced neutral color scheme',
      primary: '#737373',
      preview: '#737373'
    },
    red: {
      name: 'Red',
      description: 'A vibrant red color scheme',
      primary: '#ef4444',
      preview: '#ef4444'
    },
    rose: {
      name: 'Rose',
      description: 'A romantic rose color scheme',
      primary: '#f43f5e',
      preview: '#f43f5e'
    },
    orange: {
      name: 'Orange',
      description: 'An energetic orange color scheme',
      primary: '#f97316',
      preview: '#f97316'
    },
    green: {
      name: 'Green',
      description: 'A fresh green color scheme',
      primary: '#22c55e',
      preview: '#22c55e'
    },
    blue: {
      name: 'Blue',
      description: 'A calm blue color scheme',
      primary: '#3b82f6',
      preview: '#3b82f6'
    },
    yellow: {
      name: 'Yellow',
      description: 'A bright yellow color scheme',
      primary: '#eab308',
      preview: '#eab308'
    },
    violet: {
      name: 'Violet',
      description: 'A mystical violet color scheme',
      primary: '#8b5cf6',
      preview: '#8b5cf6'
    }
  },

  // Border radius options
  radiusOptions: [
    { value: 0, label: 'None', class: 'rounded-none' },
    { value: 0.25, label: 'Small', class: 'rounded-sm' },
    { value: 0.5, label: 'Medium', class: 'rounded-md' },
    { value: 0.75, label: 'Large', class: 'rounded-lg' },
    { value: 1, label: 'Extra Large', class: 'rounded-xl' }
  ],

  // Mode options
  modeOptions: [
    { 
      value: 'light', 
      label: 'Light', 
      icon: 'Sun',
      description: 'Light mode for bright environments'
    },
    { 
      value: 'dark', 
      label: 'Dark', 
      icon: 'Moon',
      description: 'Dark mode for low-light environments'
    },
    { 
      value: 'system', 
      label: 'System', 
      icon: 'Monitor',
      description: 'Follow your system preference'
    }
  ],
  
  // Persistence settings
  persistence: {
    enabled: true,
    storageKey: 'app-theme-settings',
    cookieOptions: {
      httpOnly: false,
      secure: false,
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 365 // 1 year
    }
  },

  // Theme transition settings
  transitions: {
    enabled: true,
    duration: 300, // milliseconds
    easing: 'ease-in-out'
  },

  // Custom CSS properties
  cssProperties: {
    '--theme-transition': 'all 0.3s ease-in-out',
    '--theme-border-radius': 'var(--radius)',
    '--theme-font-family': 'Inter, sans-serif'
  }
}
