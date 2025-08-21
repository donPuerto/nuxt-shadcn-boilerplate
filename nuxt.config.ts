import tailwindcss from '@tailwindcss/vite'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools:{ enabled: true },

  modules: [
    '@nuxt/devtools',
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxt/test-utils',
    'shadcn-nuxt',
    'motion-v/nuxt',
    '@nuxtjs/color-mode',
  ],
  css: ['@/assets/css/tailwind.css'],
  vite: {
    plugins: [
      tsconfigPaths(),
      tailwindcss(),
    ],
  },
  shadcn: {
    prefix: '',
    componentDir: './app/components/ui'
  },

  content: {
    experimental: { nativeSqlite: true },
  },
  colorMode: {
    preference: 'system', // Default preference
    dataValue: 'theme', // activate data-theme in <html> tag
    fallback: 'light',    // Fallback when system preference isn't available
    classSuffix: '',      // Important for Tailwind dark mode
    storageKey: 'nuxt-color-mode'
  },
  
})
