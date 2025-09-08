export type Direction = 'ltr' | 'rtl'

const STORAGE_KEY = 'app-direction'

export function useDirection() {
  const direction = useState<Direction>('app-direction', () =>
    (import.meta.client && (localStorage.getItem(STORAGE_KEY) as Direction)) || 'ltr'
  )

  const setDirection = (dir: Direction) => {
    direction.value = dir
    if (import.meta.client) {
      document.documentElement.setAttribute('dir', dir)
      localStorage.setItem(STORAGE_KEY, dir)
    }
  }

  onMounted(() => setDirection(direction.value))

  return { direction, setDirection, toggle: () => setDirection(direction.value === 'ltr' ? 'rtl' : 'ltr') }
}
