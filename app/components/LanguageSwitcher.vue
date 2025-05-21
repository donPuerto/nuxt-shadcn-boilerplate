<template>
  <ClientOnly>
    <div class="relative">
      <DropdownMenu v-model:open="isOpen">
        <DropdownMenuTrigger as-child>
          <Button 
            variant="ghost"
            size="icon"
            class="h-9 w-9 p-0"
            :disabled="isLoading"
          >
            <template v-if="isLoading || initialLoading">
              <Icon 
                name="i-lucide-loader-2" 
                class="h-[1.2rem] w-[1.2rem] animate-spin"
                data-testid="loading-icon" 
              />
            </template>
            <template v-else>
              <Icon 
                :name="`flag:${currentFlag}`" 
                size="16"
                data-testid="flag-icon"
              />
            </template>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" class="p-2">
          <DropdownMenuLabel><span class="font-bold text-xs uppercase tracking-wide">Translation</span></DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem :disabled="isLoading" @click="switchLanguage('en')">
            <Icon name="flag:us-4x3" class="mr-2 h-4 w-6" />
            English {{ locale === 'en' ? '✓' : '' }}
          </DropdownMenuItem>
          <DropdownMenuItem :disabled="isLoading" @click="switchLanguage('fr')">
            <Icon name="flag:fr-4x3" class="mr-2 h-4 w-6" />
            Français {{ locale === 'fr' ? '✓' : '' }}
          </DropdownMenuItem>
          <DropdownMenuItem :disabled="isLoading" @click="switchLanguage('es')">
            <Icon name="flag:es-4x3" class="mr-2 h-4 w-6" />
            Español {{ locale === 'es' ? '✓' : '' }}
          </DropdownMenuItem>
          <DropdownMenuItem :disabled="isLoading" @click="switchLanguage('de')">
            <Icon name="flag:de-4x3" class="mr-2 h-4 w-6" />
            Deutsch {{ locale === 'de' ? '✓' : '' }}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>

    <!-- Fallback template while client-side JS is loading -->
    <template #fallback>
      <Button variant="ghost" size="icon" class="h-9 w-9 p-0">
        <Icon name="lucide:loader-2" class="h-[1.2rem] w-[1.2rem] animate-spin" />
      </Button>
    </template>
  </ClientOnly>
</template>

<script setup lang="ts">
// Track dropdown and loading states
const isOpen = ref(false)
const isLoading = ref(false)
const initialLoading = ref(true) // Start with loading state active

// Get i18n composable
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

// Function to switch language
async function switchLanguage(lang: string) {
  // Skip if already selected or already loading
  if (lang === locale.value || isLoading.value) {
    isOpen.value = false
    return
  }
  
  // Set loading state and close dropdown
  isLoading.value = true
  isOpen.value = false
  
  // Force a DOM update
  await nextTick()
  
  try {
    // Simulate loading for demonstration
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Change locale
    locale.value = lang
    
    // Save to localStorage
    if (import.meta.client) {
      localStorage.setItem('preferredLanguage', lang)
    }
  
  } catch (error) {
    // Handle error silently
    console.error('Error switching language:', error)
  } finally {
    // Add a small delay before turning off loading state
    setTimeout(() => {
      isLoading.value = false
    }, 300)
  }
}

// Initialize language from localStorage on component mount
onMounted(async () => {
  if (import.meta.client) {
    // Start with loading indicator
    initialLoading.value = true
    
    try {
      // Simulate initial loading time
      await new Promise(resolve => setTimeout(resolve, 800))
      
      const savedLang = localStorage.getItem('preferredLanguage')
      
      if (savedLang && Object.keys(languageToFlag).includes(savedLang)) {
        locale.value = savedLang
      }
    } catch (error) {
      // Handle error silently
      console.log('Error loading language:', error)
    } finally {
      // Turn off initial loading state after a slight delay
      setTimeout(() => {
        initialLoading.value = false
      }, 200)
    }
  }
})
</script>

<style scoped>
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
.animate-spin {
  animation: spin 1s linear infinite;
}
</style>
