<template>
  <DropdownMenu v-model:open="isOpen">
    <DropdownMenuTrigger as-child>
      <Button 
        :variant="isOpen ? 'secondary' : 'outline'" 
        size="icon"
        :class="isOpen ? 'ring-2 ring-primary ring-offset-2' : ''"
      >
        <Icon :name="`flag:${currentFlag}`" size="14" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" class="p-2 px-4">
      <DropdownMenuLabel><span class="font-bold text-xs uppercase tracking-wide">Translation</span></DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem @click="switchLanguage('en')">
        <Icon name="flag:us-4x3" class="mr-2 h-4 w-6" />
        English
      </DropdownMenuItem>
      <DropdownMenuItem @click="switchLanguage('fr')">
        <Icon name="flag:fr-4x3" class="mr-2 h-4 w-6" />
        Français
      </DropdownMenuItem>
      <DropdownMenuItem @click="switchLanguage('es')">
        <Icon name="flag:es-4x3" class="mr-2 h-4 w-6" />
        Español
      </DropdownMenuItem>
      <DropdownMenuItem @click="switchLanguage('de')">
        <Icon name="flag:de-4x3" class="mr-2 h-4 w-6" />
        Deutsch
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { useI18n } from '#imports'

// Track dropdown open state
const isOpen = ref(false)

// Use Nuxt's i18n composable
const { locale } = useI18n()

// Map language codes to flag icons
const languageToFlag = {
  'en': 'us-4x3',
  'fr': 'fr-4x3',
  'es': 'es-4x3',
  'de': 'de-4x3'
}

// Compute current flag based on current locale
const currentFlag = computed(() => {
  return languageToFlag[locale.value] || 'us-4x3'
})

// Switch language using i18n
const switchLanguage = (lang: string) => {
  locale.value = lang
  
  // Save preference in localStorage
  if (import.meta.client) {
    localStorage.setItem('preferredLanguage', lang)
  }
}

// Initialize from localStorage if available
onMounted(() => {
  if (import.meta.client) {
    const savedLang = localStorage.getItem('preferredLanguage')
    if (savedLang && Object.keys(languageToFlag).includes(savedLang)) {
      locale.value = savedLang
    }
  }
})
</script>
