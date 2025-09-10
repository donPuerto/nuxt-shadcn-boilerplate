export const themeConfig = {
  // Defaults
  theme: 'default',
  primaryColor: 'violet',
  neutralColor: 'slate',
  radius: 0.5,
  fontScale: 'base' as FontScale,
  mode: 'system',
  direction: 'ltr' as Direction,
  
  // Available presets (matches your presets folder)
  presets: [
    { value: 'default', label: 'Default (Custom)' },
    { value: 'vercel', label: 'Vercel' },
    { value: 'cosmicNight', label: 'Cosmic Night' },
    { value: 'twitter', label: 'Twitter' },
    { value: 'claude', label: 'Claude' },
  ],
  
  // Primary color options (matches your CSS data-primary selectors)
  primaryColors: [
    { value: 'violet', label: 'Violet' },
    { value: 'blue', label: 'Blue' },
    { value: 'green', label: 'Green' },
    { value: 'amber', label: 'Amber' },
    { value: 'red', label: 'Red' },
    { value: 'rose', label: 'Rose' },
  ],
  
  // Neutral color options (matches your CSS data-theme selectors)
  neutralColors: [
    { value: 'slate', label: 'Slate' },
    { value: 'gray', label: 'Gray' },
    { value: 'zinc', label: 'Zinc' },
    { value: 'neutral', label: 'Neutral' },
    { value: 'stone', label: 'Stone' },
  ],
  
  fontScales: [
    { value: 'sm', label: 'Small' },
    { value: 'base', label: 'Base' },
    { value: 'md', label: 'Medium' },
    { value: 'lg', label: 'Large' },
  ],
  
  modeOptions: [
    { value: 'light', label: 'Light', icon: 'lucide:sun' },
    { value: 'dark', label: 'Dark', icon: 'lucide:moon' },
    { value: 'system', label: 'System', icon: 'lucide:monitor' },
  ],

  // Color definitions for preview purposes
  colorDefinitions: {
    // Primary colors
    violet: {
      primary: 'oklch(0.592 0.183 299.323)',
      category: 'primary'
    },
    blue: {
      primary: 'oklch(0.578 0.15 255.718)',
      category: 'primary'
    },
    green: {
      primary: 'oklch(0.682 0.167 149.579)',
      category: 'primary'
    },
    amber: {
      primary: 'oklch(0.781 0.186 74.885)',
      category: 'primary'
    },
    red: {
      primary: 'oklch(0.633 0.244 25.331)',
      category: 'primary'
    },
    rose: {
      primary: 'oklch(0.658 0.232 15.24)',
      category: 'primary'
    },
    // Neutral colors (using a representative color for preview)
    slate: {
      primary: 'oklch(0.554 0.046 257.417)',
      category: 'neutral'
    },
    gray: {
      primary: 'oklch(0.551 0.027 264.364)',
      category: 'neutral'
    },
    zinc: {
      primary: 'oklch(0.552 0.016 285.938)',
      category: 'neutral'
    },
    neutral: {
      primary: 'oklch(0.556 0 0)',
      category: 'neutral'
    },
    stone: {
      primary: 'oklch(0.553 0.013 58.071)',
      category: 'neutral'
    },
    white: {
      primary: '#ffffff',
      category: 'neutral'
    }
  }
}

export type FontScale = 'sm' | 'base' | 'md' | 'lg'
export type Direction = 'ltr' | 'rtl'
export type ThemePreset = 'default' | 'vercel' | 'cosmicNight' | 'twitter' | 'claude'
