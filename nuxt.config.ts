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
    '@nuxt/ui',
    '@nuxt/image',
    '@nuxt/scripts',
    // '@nuxtjs/tailwindcss'
    '@nuxt/content',
    'shadcn-nuxt',
    '@nuxtjs/color-mode'
  ],
  shadcn: {
    prefix: 'Ui',
    componentDir: './app/components/ui'
  }
})
