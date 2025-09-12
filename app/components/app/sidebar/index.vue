<script setup lang="ts">
// Placeholder sidebar wrapper. Extend with real sidebar logic/components later.
defineOptions({ name: 'AppSidebarShell' })
</script>

<template>
  <aside class="hidden lg:flex flex-col w-64 border-r bg-background">
    <!-- Replace with real sidebar content -->
    <slot />
  </aside>
</template>
