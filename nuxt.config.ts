// https://nuxt.com/docs/api/configuration/nuxt-config

import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  future: {
    compatibilityVersion: 4,
  },
  devtools: { enabled: true },
  css: ['~/assets/css/tailwind.css'],
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
    '@nuxtjs/color-mode'
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
      collections: ['logos', 'mdi', 'ic','token'] 
    }
  }
})
