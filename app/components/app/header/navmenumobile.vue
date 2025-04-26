<template>
  <div>
    <Button variant="ghost" class="px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0" @click="isOpen = !isOpen">
      <span class="sr-only">Toggle menu</span>
      <i v-if="!isOpen" class="i-heroicons-bars-3 h-6 w-6"/>
      <i v-else class="i-heroicons-x-mark h-6 w-6"/>
    </Button>
    <div v-if="isOpen" class="fixed inset-0 top-16 z-50 grid h-[calc(100vh-4rem)] grid-flow-row auto-rows-max overflow-auto p-6 pb-32 shadow-md animate-in slide-in-from-bottom-80 md:hidden">
      <div class="relative z-20 grid gap-6 rounded-md bg-popover p-4 text-popover-foreground shadow-md">
        <nav class="grid gap-3">
          <NuxtLink to="/" class="flex items-center gap-2 text-sm font-medium hover:text-primary" @click="isOpen = false">
            Home
          </NuxtLink>
          <NuxtLink to="/about" class="flex items-center gap-2 text-sm font-medium hover:text-primary" @click="isOpen = false">
            About
          </NuxtLink>
          <NuxtLink to="/contact" class="flex items-center gap-2 text-sm font-medium hover:text-primary" @click="isOpen = false">
            Contact
          </NuxtLink>
        </nav>
      </div>
    </div>
  </div>
</template>

<script setup>
const isOpen = ref(false);
</script>
