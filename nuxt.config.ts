// https://nuxt.com/docs/api/configuration/nuxt-config

import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  future: {
    compatibilityVersion: 4,
  },
  devtools: { enabled: true },
  css: ['~/assets/css/tailwind.css', '~/assets/css/dashboard.css'],
  ssr: true, // Keep SSR enabled globally
  nitro: {
    routeRules: {
      '/dashboard/**': { ssr: false }, // Disable SSR for all dashboard routes
    }
  },
  vite: {
    plugins: [
      tailwindcss(),
    ],
    
  },
  modules: [
    '@nuxt/devtools',
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/test-utils',
    '@nuxt/image',
    '@nuxt/content',
    'shadcn-nuxt',
    '@nuxt/scripts',
    '@nuxtjs/color-mode',
    '@nuxtjs/i18n',
    '@vueuse/nuxt',
  ],
  shadcn: {
    prefix: '',
    componentDir: './app/components/ui'
  },
  content: {
    experimental: { nativeSqlite: true },
  },
  icon: {
    serverBundle: {
      collections: ['logos', 'mdi', 'ic','token', 'flagpack'] 
    }
  },
  i18n: {
    vueI18n: '~/i18n/i18n.config.ts',
    strategy: 'prefix_except_default',
    baseUrl: process.env.NUXT_APP_URL,
    locales: [
      { code: 'en', iso: 'en-US', name: 'English' },
      { code: 'fr', iso: 'fr-FR', name: 'Français' },
      { code: 'es', iso: 'es-ES', name: 'Spanish' },
      { code: 'de', iso: 'de-DE', name: 'German' },
    ],
    defaultLocale: 'en',
    
  },
  colorMode: {
    preference: 'system', // Default preference
    dataValue: 'theme', // activate data-theme in <html> tag
    fallback: 'light',    // Fallback when system preference isn't available
    classSuffix: '',      // Important for Tailwind dark mode
    storageKey: 'nuxt-color-mode'
  },
  // Disable SSR components for the particles component
  experimental: {
    componentIslands: true
  },
  runtimeConfig: {   
    
    public: {
     
    }
  }
})
