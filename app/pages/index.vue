<template>
  <section class="space-y-8">
    <h1 class="text-2xl font-bold mb-6">{{ $t('home.title') }}</h1>
    <p class="mb-6">{{ $t('home.subtitle') }}</p>

    <!-- Language Switcher -->
    <div class="mb-6 flex gap-2">
      <Button variant="outline" size="sm" @click="switchLanguage('en')">English</Button>
      <Button variant="outline" size="sm" @click="switchLanguage('fr')">Français</Button>
      <Button variant="outline" size="sm" @click="switchLanguage('es')">Español</Button>
      <Button variant="outline" size="sm" @click="switchLanguage('de')">Deutsch</Button>
    </div>

    <!-- Navigation Links -->
    <div class="flex gap-4 mb-8">
      <Button as-child>
        <NuxtLink to="/">{{ $t('navigation.home') }}</NuxtLink>
      </Button>
      <Button as-child variant="outline">
        <NuxtLink to="/components">{{ $t('navigation.components') }}</NuxtLink>
      </Button>
      <Button as-child variant="outline">
        <NuxtLink to="/roadmap">{{ $t('navigation.roadmap') }}</NuxtLink>
      </Button>
    </div>

    <!-- Current Language Display -->
    <div class="mt-10 p-4 border rounded bg-gray-50 dark:bg-gray-800">
      <p class="text-sm">{{ $t('common.loading') }}</p>
      <p class="font-bold mt-2">{{ $t('home.getStarted') }}</p>
    </div>

     <!-- Test Section for Popover -->
    <div class="mb-8 border p-4 rounded">
        <h2 class="text-xl mb-4">Popover Test</h2>
        <PopoverDemo />
    </div>
  </section>

 
</template>

<script lang="ts" setup>
import { useI18n } from '#imports'

const { locale } = useI18n()

/**
 * Switch to the selected language
 */
const switchLanguage = (lang: string) => {
  locale.value = lang
}
</script>
