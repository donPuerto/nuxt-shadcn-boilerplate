<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="ghost" size="icon">
        <i class="i-heroicons-swatch-20-solid h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
        <span class="sr-only">Toggle theme</span>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuLabel>Themes</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem v-for="theme in availableThemes" :key="theme" @click="setTheme(theme)">
        <i 
          v-if="currentTheme === theme" 
          class="i-heroicons-check mr-2 h-4 w-4"
        />
        <span :class="currentTheme === theme ? 'font-medium' : ''">
          {{ theme.charAt(0).toUpperCase() + theme.slice(1) }}
        </span>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>

<script setup>
import { computed } from 'vue';
import { useTheme } from '../composables/useTheme';

const { theme: currentTheme, availableThemes, setTheme } = useTheme();
</script>
