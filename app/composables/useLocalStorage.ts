export function useLocalStorage<T>(key: string, defaultValue: T) {
  // Create reactive reference
  const storedValue = ref<T>(defaultValue)

  // Read from localStorage on client side
  const read = (): T => {
    if (!import.meta.client) return defaultValue
    
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : defaultValue
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error)
      return defaultValue
    }
  }

  // Write to localStorage
  const write = (value: T): void => {
    if (!import.meta.client) return
    
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.warn(`Error writing localStorage key "${key}":`, error)
    }
  }

  // Initialize value from localStorage
  onMounted(() => {
    storedValue.value = read()
  })

  // Watch for changes and persist them
  watch(
    storedValue,
    (newValue) => {
      write(newValue)
    },
    { deep: true }
  )

  return storedValue
}
