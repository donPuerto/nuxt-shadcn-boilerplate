<template>
  <div class="hidden md:flex items-center space-x-1">
    <!-- GitHub Icon -->
    <Button variant="ghost" size="icon">
      <Icon :name="`lucide:${getSocialIcon('github')}`" class="h-[1.2rem] w-[1.2rem] transition-all" />
      <span class="sr-only">GitHub</span>
    </Button>

    <!-- Twitter Icon -->
    <Button variant="ghost" size="icon">
      <Icon :name="`lucide:${getSocialIcon('twitter')}`" class="h-[1.2rem] w-[1.2rem] transition-all" />
      <span class="sr-only">Twitter</span>
    </Button>

    <!-- Theme Toggle -->
    <Button variant="ghost" size="icon" @click="toggleTheme">
      <Icon :name="`lucide:${getThemeIcon('sun')}`"
        class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Icon :name="`lucide:${getThemeIcon('moon')}`"
        class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span class="sr-only">Toggle theme</span>
    </Button>
  </div>
</template>

<script setup lang="ts">
// Use the icons composable
const { getSocialIcon, getThemeIcon } = useIcons()

// Methods
function toggleTheme() {
  console.log('Toggle theme')
}
</script>
