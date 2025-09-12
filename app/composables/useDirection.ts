export type Direction = 'ltr' | 'rtl'

const STORAGE_KEY = 'app-direction'

/**
 * Composable for managing text direction (LTR/RTL)
 * Provides reactive direction state with localStorage persistence
 */
export function useDirection() {
  /**
   * Reactive direction state with SSR-safe initialization
   * Checks localStorage on client-side, defaults to 'ltr' on server
   */
  const direction = useState<Direction>('app-direction', () =>
    (import.meta.client && (localStorage.getItem(STORAGE_KEY) as Direction)) || 'ltr'
  )

  /**
   * Set the text direction and persist to localStorage
   * Also applies the direction to the document element
   * @param dir - The direction to set ('ltr' or 'rtl')
   */
  const setDirection = (dir: Direction) => {
    direction.value = dir
    
    // Apply to DOM and persist only on client-side
    if (import.meta.client) {
      document.documentElement.setAttribute('dir', dir)
      localStorage.setItem(STORAGE_KEY, dir)
    }
  }

  /**
   * Toggle between LTR and RTL directions
   */
  const toggle = () => {
    setDirection(direction.value === 'ltr' ? 'rtl' : 'ltr')
  }

  /**
   * Initialize direction on component mount (only if in component context)
   * Uses try-catch to handle cases where this composable is used outside components
   */
  const initializeDirection = () => {
    try {
      // Only call onMounted if we're in a component context
      if (getCurrentInstance()) {
        onMounted(() => {
          setDirection(direction.value)
        })
      } else {
        // If not in component context, initialize immediately on client
        if (import.meta.client) {
          setDirection(direction.value)
        }
      }
    } catch (error) {
      // Fallback: initialize immediately on client if lifecycle hooks fail
      if (import.meta.client) {
        setDirection(direction.value)
      }
    }
  }

  // Initialize direction
  initializeDirection()

  return { 
    direction: readonly(direction), 
    setDirection, 
    toggle 
  }
}
