export default defineNuxtPlugin(() => {
  // Only run on client-side
  if (import.meta.client) {
    console.log('Theme initialization plugin started')
    
    // Wait for DOM to be ready
    nextTick(() => {
      try {
        // Get saved values from localStorage
        const savedColor = localStorage.getItem('theme-color') || 'white'
        const savedRadius = localStorage.getItem('theme-radius') || '0.5'
        const savedMode = localStorage.getItem('theme-mode') || 'system'
        
        console.log('Retrieved from localStorage:', {
          color: savedColor,
          radius: savedRadius,
          mode: savedMode
        })
        
        // Store in global state for immediate access
        if (typeof window !== 'undefined') {
          window.__THEME_SETTINGS__ = {
            color: savedColor,
            radius: parseFloat(savedRadius),
            mode: savedMode
          }
        }
        
        console.log('Theme initialization completed')
      } catch (error) {
        console.error('Error initializing theme:', error)
      }
    })
  }
})
