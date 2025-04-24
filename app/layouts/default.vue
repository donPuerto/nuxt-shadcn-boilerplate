<template>
  <NuxtLoadingIndicator :color="false" class="z-100 bg-primary/80" />
  <div>
    <AppHeader />
    <Navigation />
   
      <slot />
    
    <Footer />
  </div>
</template>

<script setup lang="ts">
import Navigation from '@/components/Navigation.vue'
import Footer from '@/components/Footer.vue'
</script>

