<!-- components/dashboard/footer/default.vue -->
<template>
  <footer class="border-t py-4 px-6 bg-background">
    <div class="flex flex-col md:flex-row justify-between items-center gap-4">
      <div class="text-sm text-muted-foreground">
        &copy; {{ new Date().getFullYear() }} Acme Inc. All rights reserved.
      </div>
      
      <nav class="flex items-center gap-4">
        <NuxtLink to="/" class="text-sm text-muted-foreground hover:text-foreground transition-colors">
          Home
        </NuxtLink>
        <NuxtLink to="/dashboard" class="text-sm text-muted-foreground hover:text-foreground transition-colors">
          Dashboard
        </NuxtLink>
        <a href="#" class="text-sm text-muted-foreground hover:text-foreground transition-colors">
          Help
        </a>
      </nav>
    </div>
  </footer>
</template>
