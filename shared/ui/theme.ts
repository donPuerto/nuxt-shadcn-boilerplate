export type ThemePreset = 'default' | 'vercel' | 'cosmicNight' | 'twitter' | 'claude'
export type Direction = 'ltr' | 'rtl'
export type FontScale = 'sm' | 'base' | 'md' | 'lg'
export type SpacingScale = number // in rem
export type ShadowColorType = 'custom' | 'tailwind'

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

// Shadow configuration interface
export interface ShadowConfig {
  colorType: ShadowColorType
  customColor: string
  tailwindColor: string
  opacity: number // 0-100
  blurRadius: number // in px
  spread: number // in px
  offsetX: number // in px
  offsetY: number // in px
}

// Default shadow configuration - UPDATED with better defaults
export const defaultShadowConfig: ShadowConfig = {
  colorType: 'tailwind',
  customColor: '#000000',
  tailwindColor: 'gray',
  opacity: 15, // Increased for better visibility
  blurRadius: 10, // Increased for better visibility
  spread: 0,
  offsetX: 0,
  offsetY: 4
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

  // Shadow colors (Tailwind colors)
  shadowColors: [
    { label: 'Black', value: 'black', hex: '#000000' },
    { label: 'Gray', value: 'gray', hex: '#6b7280' },
    { label: 'Slate', value: 'slate', hex: '#64748b' },
    { label: 'Zinc', value: 'zinc', hex: '#71717a' },
    { label: 'Blue', value: 'blue', hex: '#3b82f6' },
    { label: 'Purple', value: 'purple', hex: '#8b5cf6' },
    { label: 'Red', value: 'red', hex: '#ef4444' }
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
  
  // Check shadow colors
  const shadowColor = themeConfig.shadowColors.find(c => c.value === colorKey)
  if (shadowColor) return shadowColor.hex
  
  // Fallback
  return '#000000'
}

// IMPROVED: Helper function to convert hex to rgba with validation
export const hexToRgba = (hex: string, alpha: number): string => {
  // Remove # if present
  hex = hex.replace('#', '')
  
  // Handle 3-digit hex
  if (hex.length === 3) {
    hex = hex.split('').map(char => char + char).join('')
  }
  
  // Validate hex format
  if (hex.length !== 6 || !/^[0-9A-Fa-f]{6}$/.test(hex)) {
    console.warn(`Invalid hex color: ${hex}, using fallback`)
    return `rgba(0, 0, 0, ${alpha})`
  }
  
  const r = parseInt(hex.slice(0, 2), 16)
  const g = parseInt(hex.slice(2, 4), 16)
  const b = parseInt(hex.slice(4, 6), 16)
  
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

// IMPROVED: Helper function to generate shadow CSS with validation
export const generateShadowCSS = (config: ShadowConfig): string => {
  try {
    const color = config.colorType === 'custom' 
      ? config.customColor 
      : getColorHex(config.tailwindColor)
    
    const alpha = Math.min(1, Math.max(0, config.opacity / 100))
    const rgba = hexToRgba(color, alpha)
    
    const offsetX = Math.round(config.offsetX)
    const offsetY = Math.round(config.offsetY)
    const blurRadius = Math.max(0, Math.round(config.blurRadius))
    const spread = Math.round(config.spread)
    
    const shadowCSS = `${offsetX}px ${offsetY}px ${blurRadius}px ${spread}px ${rgba}`
    
    console.log(`[theme] Generated shadow: ${shadowCSS}`)
    return shadowCSS
  } catch (error) {
    console.error('[theme] Error generating shadow CSS:', error)
    return '0px 4px 6px 0px rgba(0, 0, 0, 0.1)'
  }
}

// LocalStorage keys
export const STORAGE_KEYS = {
  PRESET: 'theme-preset',
  PRIMARY: 'theme-primary-color',
  NEUTRAL: 'theme-neutral-color',
  RADIUS: 'theme-radius',
  MODE: 'theme-mode',
  DIRECTION: 'theme-direction',
  FONT: 'theme-font-scale',
  SPACING: 'theme-spacing',
  SHADOW_CONFIG: 'theme-shadow-config'
} as const

// Storage interface for future database integration
export interface ThemeStorage {
  preset: ThemePreset
  primaryColor: string
  neutralColor: string
  radius: number
  mode: string
  direction: Direction
  fontScale: FontScale
  spacing: number
  shadowConfig: ShadowConfig
  userId?: string
  createdAt?: string
  updatedAt?: string
}
