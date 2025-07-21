export interface CookieCategory {
  id: string
  name: string
  description: string
  required: boolean
  enabled: boolean
}

export interface CookieConsentState {
  hasConsented: boolean
  consentDate: string | null
  categories: Record<string, boolean>
  showBanner: boolean
}

export function useCookieConsent() {
  const STORAGE_KEY = 'cookie-consent'
  const CONSENT_VERSION = '1.0'

  // Default categories
  const defaultCategories: CookieCategory[] = [
    {
      id: 'necessary',
      name: 'Necessary',
      description: 'Essential cookies for website functionality',
      required: true,
      enabled: true
    },
    {
      id: 'analytics',
      name: 'Analytics',
      description: 'Help us understand how visitors interact with our website',
      required: false,
      enabled: false
    },
    {
      id: 'marketing',
      name: 'Marketing',
      description: 'Used to track visitors and display relevant ads',
      required: false,
      enabled: false
    },
    {
      id: 'preferences',
      name: 'Preferences',
      description: 'Remember your settings and preferences',
      required: false,
      enabled: false
    }
  ]

  // Reactive state
  const consentState = ref<CookieConsentState>({
    hasConsented: false,
    consentDate: null,
    categories: {},
    showBanner: true
  })

  const categories = ref<CookieCategory[]>(defaultCategories)

  // Load consent from storage
  const loadConsent = () => {
    if (import.meta.client) {
      try {
        const stored = localStorage.getItem(STORAGE_KEY)
        if (stored) {
          const data = JSON.parse(stored)
          if (data.version === CONSENT_VERSION) {
            consentState.value = { ...data.consent, showBanner: false }
            categories.value = categories.value.map(cat => ({
              ...cat,
              enabled: data.consent.categories[cat.id] ?? cat.required
            }))
          }
        }
      } catch (error) {
        console.warn('Failed to load cookie consent:', error)
      }
    }
  }

  // Save consent to storage
  const saveConsent = () => {
    if (import.meta.client) {
      try {
        const data = {
          version: CONSENT_VERSION,
          consent: {
            ...consentState.value,
            consentDate: new Date().toISOString()
          }
        }
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
      } catch (error) {
        console.warn('Failed to save cookie consent:', error)
      }
    }
  }

  // Accept all cookies
  const acceptAll = () => {
    categories.value.forEach(category => {
      consentState.value.categories[category.id] = true
      category.enabled = true
    })
    consentState.value.hasConsented = true
    consentState.value.showBanner = false
    saveConsent()
  }

  // Accept only necessary cookies
  const acceptNecessary = () => {
    categories.value.forEach(category => {
      const enabled = category.required
      consentState.value.categories[category.id] = enabled
      category.enabled = enabled
    })
    consentState.value.hasConsented = true
    consentState.value.showBanner = false
    saveConsent()
  }

  // Update specific category
  const updateCategory = (categoryId: string, enabled: boolean) => {
    const category = categories.value.find(c => c.id === categoryId)
    if (category && !category.required) {
      category.enabled = enabled
      consentState.value.categories[categoryId] = enabled
    }
  }

  // Save custom preferences
  const savePreferences = () => {
    consentState.value.hasConsented = true
    consentState.value.showBanner = false
    saveConsent()
  }

  // Reset consent (for testing/admin)
  const resetConsent = () => {
    if (import.meta.client) {
      localStorage.removeItem(STORAGE_KEY)
      consentState.value = {
        hasConsented: false,
        consentDate: null,
        categories: {},
        showBanner: true
      }
      categories.value = defaultCategories
    }
  }

  // Check if category is enabled
  const isCategoryEnabled = (categoryId: string): boolean => {
    return categories.value.find(c => c.id === categoryId)?.enabled ?? false
  }

  // Initialize
  onMounted(() => {
    loadConsent()
  })

  return {
    consentState: readonly(consentState),
    categories: readonly(categories),
    acceptAll,
    acceptNecessary,
    updateCategory,
    savePreferences,
    resetConsent,
    isCategoryEnabled
  }
}
