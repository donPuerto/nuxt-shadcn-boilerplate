export type ThemePreset = 'default' | 'vercel' | 'cosmicNight' | 'twitter' | 'claude'
export type Direction = 'ltr' | 'rtl'
export type FontScale = 'sm' | 'base' | 'md' | 'lg'

export interface PresetMeta {
  value: string
  label: string
  description: string
  supportsCustomColors: boolean
}

export interface ColorOption {
  label: string
  value: string
  hex: string
}

export interface ModeOption {
  label: string
  value: string
  icon: string
}

// Static theme configuration
export const themeConfig = {
  presets: [
    { label: 'Default', value: 'default', description: 'Customizable base theme', supportsCustomColors: true },
    { label: 'Vercel', value: 'vercel', description: 'Black & white', supportsCustomColors: false },
    { label: 'Cosmic Night', value: 'cosmicNight', description: 'Space purples', supportsCustomColors: false },
    { label: 'Twitter', value: 'twitter', description: 'Blue social', supportsCustomColors: false },
    { label: 'Claude', value: 'claude', description: 'Warm neutral', supportsCustomColors: false }
  ] as PresetMeta[],

  primaryColors: [
    { label: 'Violet', value: 'violet', hex: '#7c3aed' },
    { label: 'Blue', value: 'blue', hex: '#3b82f6' },
    { label: 'Green', value: 'green', hex: '#22c55e' },
    { label: 'Amber', value: 'amber', hex: '#f59e0b' },
    { label: 'Red', value: 'red', hex: '#ef4444' },
    { label: 'Rose', value: 'rose', hex: '#f43f5e' }
  ] as ColorOption[],

  neutralColors: [
    { label: 'Slate', value: 'slate', hex: '#64748b' },
    { label: 'Gray', value: 'gray', hex: '#6b7280' },
    { label: 'Zinc', value: 'zinc', hex: '#71717a' },
    { label: 'Neutral', value: 'neutral', hex: '#737373' },
    { label: 'Stone', value: 'stone', hex: '#78716c' }
  ] as ColorOption[],

  modeOptions: [
    { label: 'System', value: 'system', icon: 'lucide:monitor' },
    { label: 'Light', value: 'light', icon: 'lucide:sun' },
    { label: 'Dark', value: 'dark', icon: 'lucide:moon' }
  ] as ModeOption[],

  fontOptions: [
    { label: 'Small', value: 'sm' },
    { label: 'Base', value: 'base' },
    { label: 'Medium', value: 'md' },
    { label: 'Large', value: 'lg' }
  ]
}

// Color CSS variables for each primary color
export const primaryColorVars: Record<string, { light: Record<string, string>; dark: Record<string, string> }> = {
  violet: {
    light: { '--primary': '#7c3aed', '--primary-foreground': '#ffffff', '--accent': '#8b5cf6', '--accent-foreground': '#ffffff', '--ring': '#7c3aed' },
    dark: { '--primary': '#8b5cf6', '--primary-foreground': '#1e1b29', '--accent': '#7c3aed', '--accent-foreground': '#ffffff', '--ring': '#8b5cf6' }
  },
  blue: {
    light: { '--primary': '#3b82f6', '--primary-foreground': '#ffffff', '--accent': '#2563eb', '--accent-foreground': '#ffffff', '--ring': '#3b82f6' },
    dark: { '--primary': '#60a5fa', '--primary-foreground': '#0c111b', '--accent': '#3b82f6', '--accent-foreground': '#ffffff', '--ring': '#60a5fa' }
  },
  green: {
    light: { '--primary': '#22c55e', '--primary-foreground': '#ffffff', '--accent': '#16a34a', '--accent-foreground': '#ffffff', '--ring': '#22c55e' },
    dark: { '--primary': '#4ade80', '--primary-foreground': '#0f1a13', '--accent': '#22c55e', '--accent-foreground': '#ffffff', '--ring': '#4ade80' }
  },
  amber: {
    light: { '--primary': '#f59e0b', '--primary-foreground': '#1a1405', '--accent': '#d97706', '--accent-foreground': '#ffffff', '--ring': '#f59e0b' },
    dark: { '--primary': '#fbbf24', '--primary-foreground': '#1a1405', '--accent': '#f59e0b', '--accent-foreground': '#1a1405', '--ring': '#fbbf24' }
  },
  red: {
    light: { '--primary': '#ef4444', '--primary-foreground': '#ffffff', '--accent': '#dc2626', '--accent-foreground': '#ffffff', '--ring': '#ef4444' },
    dark: { '--primary': '#f87171', '--primary-foreground': '#220b0b', '--accent': '#ef4444', '--accent-foreground': '#ffffff', '--ring': '#f87171' }
  },
  rose: {
    light: { '--primary': '#f43f5e', '--primary-foreground': '#ffffff', '--accent': '#e11d48', '--accent-foreground': '#ffffff', '--ring': '#f43f5e' },
    dark: { '--primary': '#fb7185', '--primary-foreground': '#2a0d14', '--accent': '#f43f5e', '--accent-foreground': '#ffffff', '--ring': '#fb7185' }
  }
}

<<<<<<< HEAD
// Neutral color CSS variables
export const neutralColorVars: Record<string, { light: Record<string, string>; dark: Record<string, string> }> = {
  slate: {
    light: { '--background': '#ffffff', '--foreground': '#0f172a', '--card': '#ffffff', '--card-foreground': '#0f172a', '--muted': '#f1f5f9', '--muted-foreground': '#64748b', '--border': '#e2e8f0' },
    dark: { '--background': '#0f172a', '--foreground': '#f1f5f9', '--card': '#1e293b', '--card-foreground': '#f1f5f9', '--muted': '#1e293b', '--muted-foreground': '#94a3b8', '--border': '#334155' }
  },
  gray: {
    light: { '--background': '#ffffff', '--foreground': '#1f2937', '--card': '#ffffff', '--card-foreground': '#1f2937', '--muted': '#f3f4f6', '--muted-foreground': '#6b7280', '--border': '#e5e7eb' },
    dark: { '--background': '#1f2937', '--foreground': '#f3f4f6', '--card': '#273548', '--card-foreground': '#f3f4f6', '--muted': '#273548', '--muted-foreground': '#9ca3af', '--border': '#374151' }
  },
  zinc: {
    light: { '--background': '#fafafa', '--foreground': '#18181b', '--card': '#ffffff', '--card-foreground': '#18181b', '--muted': '#f4f4f5', '--muted-foreground': '#71717a', '--border': '#e4e4e7' },
    dark: { '--background': '#18181b', '--foreground': '#fafafa', '--card': '#27272a', '--card-foreground': '#fafafa', '--muted': '#27272a', '--muted-foreground': '#a1a1aa', '--border': '#3f3f46' }
  },
  neutral: {
    light: { '--background': '#fafafa', '--foreground': '#171717', '--card': '#ffffff', '--card-foreground': '#171717', '--muted': '#f5f5f5', '--muted-foreground': '#737373', '--border': '#e5e5e5' },
    dark: { '--background': '#171717', '--foreground': '#f5f5f5', '--card': '#262626', '--card-foreground': '#f5f5f5', '--muted': '#262626', '--muted-foreground': '#a3a3a3', '--border': '#3d3d3d' }
  },
  stone: {
    light: { '--background': '#fafaf9', '--foreground': '#1c1917', '--card': '#ffffff', '--card-foreground': '#1c1917', '--muted': '#f5f5f4', '--muted-foreground': '#78716c', '--border': '#e7e5e4' },
    dark: { '--background': '#1c1917', '--foreground': '#f5f5f4', '--card': '#292524', '--card-foreground': '#f5f5f4', '--muted': '#292524', '--muted-foreground': '#a8a29e', '--border': '#3f3a37' }
  }
}

// Helper function to get color hex value
export const getColorHex = (colorKey: string): string => {
  // Check primary colors first
  const primaryColor = themeConfig.primaryColors.find(c => c.value === colorKey)
  if (primaryColor) return primaryColor.hex
  
  // Check neutral colors
  const neutralColor = themeConfig.neutralColors.find(c => c.value === colorKey)
  if (neutralColor) return neutralColor.hex
  
  // Fallback
  return '#000000'
}

// LocalStorage keys
export const STORAGE_KEYS = {
  PRESET: 'theme-preset',
  PRIMARY: 'theme-primary-color',
  NEUTRAL: 'theme-neutral-color',
  RADIUS: 'theme-radius',
  MODE: 'theme-mode',
  DIRECTION: 'theme-direction',
  FONT: 'theme-font-scale'
} as const
=======
export type FontScale = 'sm' | 'base' | 'md' | 'lg'
export type Direction = 'ltr' | 'rtl'
export type ThemePreset = 'default' | 'vercel' | 'cosmicNight' | 'twitter' | 'claude'
>>>>>>> defc675f949766f1cf0d1acb9fb477dbb2f27695
