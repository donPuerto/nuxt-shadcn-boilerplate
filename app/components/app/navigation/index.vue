<template>
  <header class="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
    <div class="container max-w-screen-2xl mx-auto px-4 flex h-14 items-center">
      <!-- Logo -->
      <AppNavigationLogo />

      <!-- Desktop Navigation -->
      <div class="flex flex-1 items-center justify-between space-x-2 md:justify-end">
        <div class="w-full flex-1 md:w-auto md:flex-none">
          <div class="hidden md:flex">
            <AppNavigationMenu />
          </div>
        </div>

        <!-- Right side actions -->
        <nav class="flex items-center space-x-2">
          <!-- Social Links -->
          <div class="hidden md:flex items-center space-x-1">
            <Button variant="ghost" size="icon" as-child>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                <Icon :name="getSocialIcon('github')" class="h-[1.2rem] w-[1.2rem]" />
                <span class="sr-only">GitHub</span>
              </a>
            </Button>

            <Button variant="ghost" size="icon" as-child>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <Icon :name="getSocialIcon('twitter')" class="h-[1.2rem] w-[1.2rem]" />
                <span class="sr-only">Twitter</span>
              </a>
            </Button>
          </div>

          <!-- Theme Toggle -->
          <Button variant="ghost" size="icon" @click="toggleTheme">
            <Icon :name="getThemeIcon('sun')" class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Icon :name="getThemeIcon('moon')" class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span class="sr-only">Toggle theme</span>
          </Button>

          <!-- Mobile Navigation -->
          <AppNavigationMobile />
        </nav>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
// Methods
function toggleTheme() {
  console.log('Toggle theme')
}

function getSocialIcon(platform: string): string {
  // Clean icon mapping for social platforms
  const iconMap: Record<string, string> = {
    'github': 'lucide:github',
    'twitter': 'lucide:twitter',
    'x': 'lucide:twitter',
    'linkedin': 'lucide:linkedin',
    'facebook': 'lucide:facebook',
    'instagram': 'lucide:instagram',
    'youtube': 'lucide:youtube'
  }

  return iconMap[platform] || `lucide:${platform}`
}

function getThemeIcon(theme: string): string {
  // Clean icon mapping for theme icons
  const iconMap: Record<string, string> = {
    'sun': 'lucide:sun',
    'moon': 'lucide:moon',
    'system': 'lucide:monitor'
  }

  return iconMap[theme] || `lucide:${theme}`
}
</script>
