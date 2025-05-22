<!-- filepath: d:\Code\Nuxt\v4\LearnNuxt\nuxt-shadcn-boilerplate\app\components\app\footer\index.vue -->
<template>
  <footer class="border-t border-transparent backdrop-blur-sm">
    <div class="mx-auto max-w-7xl px-4 py-12">
      <!-- Footer Top Section with Logo and Links -->
      <div class="grid gap-8 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
        <!-- Logo and Description -->
        <div class="lg:col-span-2">
          <div class="flex items-center gap-2">
            <!-- <img src="/logo.svg" alt="Logo" class="h-8 w-8" > -->
            <span class="text-xl font-bold">Nuxt Shadcn</span>
          </div>
          <p class="mt-4 text-sm text-muted-foreground">
            A modern boilerplate combining the power of Nuxt.js and Shadcn UI components with 
            Tailwind CSS for building beautiful, accessible, and responsive web applications.
          </p>
          <div class="mt-6 flex items-center gap-4">
            <a 
              href="https://twitter.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              class="rounded-full bg-muted/50 p-2 text-muted-foreground transition-colors hover:bg-muted/80 hover:text-foreground"
              aria-label="Twitter"
            >
              <i class="i-lucide-twitter h-5 w-5"/>
            </a>
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              class="rounded-full bg-muted/50 p-2 text-muted-foreground transition-colors hover:bg-muted/80 hover:text-foreground"
              aria-label="GitHub"
            >
              <i class="i-lucide-github h-5 w-5"/>
            </a>
            <a 
              href="https://discord.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              class="rounded-full bg-muted/50 p-2 text-muted-foreground transition-colors hover:bg-muted/80 hover:text-foreground"
              aria-label="Discord"
            >
              <i class="i-lucide-message-circle h-5 w-5"/>
            </a>
          </div>
        </div>

        <!-- Resources Links -->
        <div>
          <h3 class="mb-3 text-sm font-semibold uppercase tracking-wider">Resources</h3>
          <ul class="space-y-2">
            <li><NuxtLink to="/components" class="text-sm text-muted-foreground transition-colors hover:text-foreground">Components</NuxtLink></li>
            <li><NuxtLink to="/roadmap" class="text-sm text-muted-foreground transition-colors hover:text-foreground">Roadmap</NuxtLink></li>
            <li><a href="#" class="text-sm text-muted-foreground transition-colors hover:text-foreground">Documentation</a></li>
            <li><a href="#" class="text-sm text-muted-foreground transition-colors hover:text-foreground">Tutorials</a></li>
          </ul>
        </div>

        <!-- Community Links -->
        <div>
          <h3 class="mb-3 text-sm font-semibold uppercase tracking-wider">Community</h3>
          <ul class="space-y-2">
            <li><a href="#" class="text-sm text-muted-foreground transition-colors hover:text-foreground">GitHub</a></li>
            <li><a href="#" class="text-sm text-muted-foreground transition-colors hover:text-foreground">Discord</a></li>
            <li><a href="#" class="text-sm text-muted-foreground transition-colors hover:text-foreground">Twitter</a></li>
            <li><a href="#" class="text-sm text-muted-foreground transition-colors hover:text-foreground">Contributors</a></li>
          </ul>
        </div>

        <!-- Legal Links -->
        <div>
          <h3 class="mb-3 text-sm font-semibold uppercase tracking-wider">Legal</h3>
          <ul class="space-y-2">
            <li><a href="#" class="text-sm text-muted-foreground transition-colors hover:text-foreground">Privacy Policy</a></li>
            <li><a href="#" class="text-sm text-muted-foreground transition-colors hover:text-foreground">Terms of Service</a></li>
            <li><a href="#" class="text-sm text-muted-foreground transition-colors hover:text-foreground">License</a></li>
          </ul>
        </div>
      </div>

      <Separator class="my-8 opacity-30" />

      <!-- Footer Bottom Section with Copyright -->
      <div class="flex flex-col items-center justify-between gap-4 sm:flex-row">
        <p class="text-sm text-muted-foreground">
          &copy; {{ new Date().getFullYear() }} Nuxt Shadcn Boilerplate. All rights reserved.
        </p>
        <div class="flex items-center gap-4">
          <Button variant="ghost" size="sm" class="bg-transparent hover:bg-muted/50">
            <i class="i-lucide-globe mr-2 h-4 w-4"/>
            <span class="hidden sm:inline">{{ $t('common.changeLanguage') }}</span>
            <span class="sm:hidden">{{ locale.toUpperCase() }}</span>
          </Button>
          <Button variant="ghost" size="sm" class="bg-transparent hover:bg-muted/50">
            <i class="i-lucide-moon mr-2 h-4 w-4"/>
            <span class="hidden sm:inline">{{ $t('common.toggleTheme') }}</span>
          </Button>
        </div>
      </div>
    </div>
  </footer>
</template>

<script lang="ts" setup>
const { locale } = useI18n()
</script>

<style scoped>
footer {
  position: relative;
  z-index: 10;
  transition: background-color 0.3s ease;
}

/* Optional: Add a subtle gradient overlay for better text readability */
footer:before {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100%;
  background: linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.1));
  z-index: -1;
  pointer-events: none;
}

/* Dark mode version */
:global(.dark) footer:before {
  background: linear-gradient(to bottom, transparent, rgba(255, 255, 255, 0.05));
}
</style>
