<template>
  <footer class="py-4 px-4 border-t text-[11px] flex flex-col sm:flex-row items-center gap-3 sm:gap-2 sm:justify-between text-muted-foreground">
    <div class="text-center sm:text-left leading-snug">
      © {{ year }} Nuxt | Tailwind | Vue Shadcn | Inspira UI · All rights reserved.
    </div>
    <div class="flex items-center gap-3">
      <a
        href="https://twitter.com"
        target="_blank"
        rel="noopener noreferrer"
        class="hover:text-primary transition"
        aria-label="X (Twitter)"
      >
        <Icon name="lucide:twitter" class="h-4 w-4" />
      </a>
      <a
        href="https://linkedin.com"
        target="_blank"
        rel="noopener noreferrer"
        class="hover:text-primary transition"
        aria-label="LinkedIn"
      >
        <Icon name="radix-icons:linkedin-logo" class="h-4 w-4" />
      </a>
    </div>
  </footer>
</template>

<script setup lang="ts">
const year = new Date().getFullYear()
</script>


