export const sidebarConfig = {
  // Default state
  defaultOpen: false,
  
  // Position settings
  side: 'right', // 'left' | 'right'
  direction: 'ltr', // 'ltr' | 'rtl'
  
  // Size settings
  width: '420px',
  
  // Behavior
  collapsible: true,
  variant: 'default', // 'default' | 'inset' | 'sidebar'
  
  // Available options for users
  availablePositions: [
    { value: 'left', label: 'Left Side' },
    { value: 'right', label: 'Right Side' }
  ],
  
  availableDirections: [
    { value: 'ltr', label: 'Left to Right' },
    { value: 'rtl', label: 'Right to Left' }
  ],
  
  // Persistence settings
  persistence: {
    enabled: true,
    storageKey: 'app-sidebar-settings'
  }
}
