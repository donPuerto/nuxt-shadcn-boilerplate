<template>
  <NuxtRouteAnnouncer />
  <NuxtLayout>
    <NuxtPage />
    <Toaster />
  </NuxtLayout>
</template>
<script setup lang="ts">
import 'vue-sonner/style.css' 


const meta = [
  { name: 'description', content: 'Nuxt 4 application with Shadcn and Inspira UI' },
  { name: 'format-detection', content: 'telephone=no' },
  { name: 'theme-color', content: '#00DC82' },
  { name: 'robots', content: 'index, follow' },
  
  // Open Graph
  { property: 'og:type', content: 'website' },
  { property: 'og:title', content: 'Nuxt 4 Application' },
  { property: 'og:description', content: 'Nuxt 4 application with Shadcn and Inspira UI' },
  { property: 'og:image', content: '/android-chrome-512x512.png' },
  
  // Twitter
  { name: 'twitter:card', content: 'summary_large_image' },
  { name: 'twitter:title', content: 'Nuxt 4 Application' },
  { name: 'twitter:description', content: 'Nuxt 4 application with Shadcn and Inspira UI' },
  { name: 'twitter:image', content: '/android-chrome-512x512.png' }
]

const links = [
  { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
  { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
  { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
  { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
  { rel: 'icon', type: 'image/png', sizes: '192x192', href: '/android-chrome-192x192.png' },
  { rel: 'icon', type: 'image/png', sizes: '512x512', href: '/android-chrome-512x512.png' },
  { rel: 'manifest', href: '/site.webmanifest' },
  { rel: 'canonical', href: 'https://nuxt-shadcn-boilerplate.netlify.app/' }
]

useHead({
  htmlAttrs: { dir: 'ltr' }, 
  titleTemplate: '%s - Nuxt 4 App',
  title: 'Welcome',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
  charset: 'utf-8',
  meta,
  link: links
})
</script>
