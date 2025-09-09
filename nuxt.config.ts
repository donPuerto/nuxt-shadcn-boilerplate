import tailwindcss from '@tailwindcss/vite'
import tsconfigPaths from 'vite-tsconfig-paths'


export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools:{ enabled: true },
  ssr: true,
  
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
  plugins: ['~/plugins/direction.client'],
  css: ['@/assets/css/main.css'],
  image: {
   
  },
  vite: {
    assetsInclude: ['**/*.css'],
    plugins: [
      tsconfigPaths(),
      tailwindcss(),
    ],
  },
  nitro: {
    publicAssets: [
      {
        dir: 'assets/css/presets',
        maxAge: 60 * 60 * 24 * 7 // 1 week
      }
    ]
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
    fallback: 'light',    // Fallback when system preference isn't available
    hid: 'nuxt-color-mode-script',
    globalName: '__NUXT_COLOR_MODE__',
    componentName: 'ColorScheme',
    classPrefix: '',
    classSuffix: '',      // Important for Tailwind dark mode
    storage: 'localStorage', // or 'sessionStorage' or 'cookie'
    storageKey: 'nuxt-color-mode'
  },
  
})
