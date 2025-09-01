import colors from 'tailwindcss/colors'

export const themeConfig = {
  // Default settings - separate for primary and neutral
  primaryColor: 'white' as const,
  neutralColor: 'neutral' as const,
  mode: 'system' as const,
  radius: 0.5,

  // Available colors organized by category
  primaryColors: ['white', 'red', 'orange', 'amber', 'yellow', 'lime', 'green', 'emerald', 'teal', 'cyan', 'sky', 'blue', 'indigo', 'violet', 'purple', 'fuchsia', 'pink', 'rose'] as const,
  neutralColors: ['slate', 'gray', 'neutral', 'zinc', 'stone'] as const,
  
  // All available colors (for backward compatibility)
  get availableColors() {
    return [...this.primaryColors, ...this.neutralColors] as const
  },

  // Color definitions with Tailwind colors
  colorDefinitions: {
    // Primary colors
    white: { name: 'White', primary: colors.white, category: 'primary' },
    red: { name: 'Red', primary: colors.red[500], category: 'primary' },
    orange: { name: 'Orange', primary: colors.orange[500], category: 'primary' },
    amber: { name: 'Amber', primary: colors.amber[500], category: 'primary' },
    yellow: { name: 'Yellow', primary: colors.yellow[500], category: 'primary' },
    lime: { name: 'Lime', primary: colors.lime[500], category: 'primary' },
    green: { name: 'Green', primary: colors.green[500], category: 'primary' },
    emerald: { name: 'Emerald', primary: colors.emerald[500], category: 'primary' },
    teal: { name: 'Teal', primary: colors.teal[500], category: 'primary' },
    cyan: { name: 'Cyan', primary: colors.cyan[500], category: 'primary' },
    sky: { name: 'Sky', primary: colors.sky[500], category: 'primary' },
    blue: { name: 'Blue', primary: colors.blue[500], category: 'primary' },
    indigo: { name: 'Indigo', primary: colors.indigo[500], category: 'primary' },
    violet: { name: 'Violet', primary: colors.violet[500], category: 'primary' },
    purple: { name: 'Purple', primary: colors.purple[500], category: 'primary' },
    fuchsia: { name: 'Fuchsia', primary: colors.fuchsia[500], category: 'primary' },
    pink: { name: 'Pink', primary: colors.pink[500], category: 'primary' },
    rose: { name: 'Rose', primary: colors.rose[500], category: 'primary' },
    
    // Neutral colors
    slate: { name: 'Slate', primary: colors.slate[500], category: 'neutral' },
    gray: { name: 'Gray', primary: colors.gray[500], category: 'neutral' },
    neutral: { name: 'Neutral', primary: colors.neutral[500], category: 'neutral' },
    zinc: { name: 'Zinc', primary: colors.zinc[500], category: 'neutral' },
    stone: { name: 'Stone', primary: colors.stone[500], category: 'neutral' },
  } as const,

  // Radius options
  radiusOptions: [
    { value: 0, label: '0' },
    { value: 0.25, label: '0.25' },
    { value: 0.5, label: '0.5' },
    { value: 0.75, label: '0.75' },
    { value: 1, label: '1' }
  ] as const,

  // Mode options
  modeOptions: [
    { value: 'light' as const, label: 'Light', icon: 'lucide:sun' },
    { value: 'dark' as const, label: 'Dark', icon: 'lucide:moon' },
    { value: 'system' as const, label: 'System', icon: 'lucide:monitor' }
  ] as const
} as const

// Type exports
export type ThemeColor = typeof themeConfig.availableColors[number]
export type PrimaryColor = typeof themeConfig.primaryColors[number]
export type NeutralColor = typeof themeConfig.neutralColors[number]
export type ThemeMode = typeof themeConfig.modeOptions[number]['value']
export type ThemeConfig = typeof themeConfig
