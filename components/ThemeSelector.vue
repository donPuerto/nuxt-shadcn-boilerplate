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
      <DropdownMenuItem v-for="theme in themes" :key="theme" @click="setTheme(theme)">
        {{ theme }}
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>

<script setup>
const themes = ["light", "dark", "system", "pink", "blue", "green"];

const setTheme = (theme) => {
  // Implement theme changing logic here
  // This would typically interact with a theme store or composable
  console.log(`Theme changed to ${theme}`);
};
</script>
