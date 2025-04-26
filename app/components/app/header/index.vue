<template>
  <header class="border-b">
    <div class="container flex h-16 items-center justify-between">
      <div class="flex items-center gap-6">
        <HeaderLogo />
        <HeaderNavmenu class="hidden md:flex" />
      </div>
      <div class="flex items-center gap-4">
        <ThemeSelector />
        <ModeSwitcher />
        <HeaderNavmenumobile class="md:hidden" />
      </div>
    </div>
  </header>
</template>

<script setup>
// Make sure the component is properly defined with a name
defineOptions({
  name: 'AppHeaderIndex'
})
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}
</style>
