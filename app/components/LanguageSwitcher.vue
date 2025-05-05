<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="ghost" size="icon">
        <span class="sr-only">Select language</span>
  
        <Icon name="ic:baseline-g-translate" size="20" style="color: black" />

      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuLabel>Language</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem @click="switchLanguage('en')">
        <span class="mr-2">🇺🇸</span> English
      </DropdownMenuItem>
      <DropdownMenuItem @click="switchLanguage('fr')">
        <span class="mr-2">🇫🇷</span> Français
      </DropdownMenuItem>
      <DropdownMenuItem @click="switchLanguage('es')">
        <span class="mr-2">🇪🇸</span> Español
      </DropdownMenuItem>
      <DropdownMenuItem @click="switchLanguage('de')">
        <span class="mr-2">🇩🇪</span> Deutsch
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'

// No explicit imports needed since shadcn components should be auto-imported
// or globally registered with your configuration

const currentLanguage = ref('en')

// Initialize on client-side only
onMounted(() => {
  if (import.meta.client) {
    currentLanguage.value = localStorage.getItem('preferredLanguage') || 'en'
  }
})

const switchLanguage = (lang: string) => {
  // For now, just log the selected language
  console.log(`Switching to language: ${lang}`)
  
  // Only access localStorage on the client side
  if (import.meta.client) {
    localStorage.setItem('preferredLanguage', lang)
  }
  
  currentLanguage.value = lang
}
</script>
