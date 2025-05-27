<!-- components/dashboard/footer/default.vue -->
<template>
  <footer class="border-t bg-background py-4 px-6">
    <div class="flex flex-col md:flex-row justify-between items-center gap-4">
      <div class="text-sm text-muted-foreground">
        &copy; {{ new Date().getFullYear() }} Your Company. All rights reserved.
      </div>
      
      <nav class="flex items-center gap-4">
        <NuxtLink to="/terms" class="text-sm text-muted-foreground hover:text-foreground transition-colors">
          Terms
        </NuxtLink>
        <NuxtLink to="/privacy" class="text-sm text-muted-foreground hover:text-foreground transition-colors">
          Privacy
        </NuxtLink>
        <NuxtLink to="/contact" class="text-sm text-muted-foreground hover:text-foreground transition-colors">
          Contact
        </NuxtLink>
      </nav>
    </div>
  </footer>
</template>
