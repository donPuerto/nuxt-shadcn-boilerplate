// Global i18n configuration for the app
import global from './global.json'

// Import basic UI translations
import enTranslations from './locales/en.json'
import frTranslations from './locales/fr.json'
import esTranslations from './locales/es.json'
import deTranslations from './locales/de.json'

const messages = {
  'en': {
    ...enTranslations,
    ...global.en
  },
  'fr': {
    ...frTranslations,
    ...global.fr
  },
  'es': {
    ...esTranslations,
    ...global.es
  },
  'de': {
    ...deTranslations,
    ...global.de
  }
}

// Debug imports
// console.log('global:', global)
// console.log('enTranslations:', enTranslations)
// console.log('frTranslations:', frTranslations)

export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'en',
  fallbackWarn: false,
  missingWarn: false,
  messages
}))
