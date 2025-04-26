<template>
  <Button variant="ghost" size="icon" @click="toggleMode">
    <i class="i-heroicons-sun-20-solid h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
    <i class="i-heroicons-moon-20-solid absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    <span class="sr-only">Toggle dark mode</span>
  </Button>
</template>

<script setup>
const colorMode = useColorMode();

const toggleMode = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark';
};
</script>
