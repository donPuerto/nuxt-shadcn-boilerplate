<template>
  <div class="min-h-screen flex flex-col">
    <!-- <AppHeader /> -->
    <main class="flex-1">
      <slot />
    </main>
    <footer class="py-6 border-t">
      <div class="container flex justify-between items-center">
        <p class="text-sm">© {{ new Date().getFullYear() }} Nuxt Shadcn Boilerplate</p>
      </div>
    </footer>
  </div>
</template>



