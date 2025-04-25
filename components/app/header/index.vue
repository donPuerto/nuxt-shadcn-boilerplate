<template>
  <header class="border-b">
    <div class="container flex h-16 items-center justify-between">
      <div class="flex items-center gap-6">
        <AppHeaderLogo />
        <AppHeaderNavmenu class="hidden md:flex" />
      </div>
      <div class="flex items-center gap-4">
        <ThemeSelector />
        <ModeSwitcher />
        <AppHeaderNavmenumobile class="md:hidden" />
      </div>
    </div>
  </header>
</template>

<script setup>
// Header component logic
</script>
