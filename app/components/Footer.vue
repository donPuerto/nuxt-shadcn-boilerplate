<template>
  <footer class="border-t border-border bg-background">
    <div class="container py-10 md:py-12">
      <div class="grid grid-cols-1 gap-8 md:grid-cols-4">
        <div class="flex flex-col gap-2">
          <h2 class="font-semibold text-lg flex items-center gap-2">
            <Icon name="lucide:box" class="h-5 w-5 text-primary" />
            <span>Nuxt Shadcn</span>
          </h2>
          <p class="text-sm text-muted-foreground">
            A beautiful UI components boilerplate built with Nuxt and Shadcn UI.
          </p>
        </div>
        
        <div class="flex flex-col gap-2">
          <h3 class="font-medium">Resources</h3>
          <nav class="flex flex-col gap-2">
            <NuxtLink to="/docs" class="text-sm text-muted-foreground hover:text-foreground">Documentation</NuxtLink>
            <NuxtLink to="/components" class="text-sm text-muted-foreground hover:text-foreground">Components</NuxtLink>
            <NuxtLink to="/examples" class="text-sm text-muted-foreground hover:text-foreground">Examples</NuxtLink>
          </nav>
        </div>
        
        <div class="flex flex-col gap-2">
          <h3 class="font-medium">Community</h3>
          <nav class="flex flex-col gap-2">
            <a href="https://github.com/shadcn-vue/ui" target="_blank" rel="noreferrer" class="text-sm text-muted-foreground hover:text-foreground">GitHub</a>
            <a href="https://discord.gg/shadcn-ui" target="_blank" rel="noreferrer" class="text-sm text-muted-foreground hover:text-foreground">Discord</a>
            <a href="https://twitter.com/shadcn" target="_blank" rel="noreferrer" class="text-sm text-muted-foreground hover:text-foreground">Twitter</a>
          </nav>
        </div>
        
        <div class="flex flex-col gap-2">
          <h3 class="font-medium">Legal</h3>
          <nav class="flex flex-col gap-2">
            <NuxtLink to="/privacy" class="text-sm text-muted-foreground hover:text-foreground">Privacy Policy</NuxtLink>
            <NuxtLink to="/terms" class="text-sm text-muted-foreground hover:text-foreground">Terms of Service</NuxtLink>
            <NuxtLink to="/license" class="text-sm text-muted-foreground hover:text-foreground">License</NuxtLink>
          </nav>
        </div>
      </div>
      
      <div class="mt-8 border-t border-border pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <p class="text-sm text-muted-foreground">
          &copy; {{ new Date().getFullYear() }} Nuxt Shadcn Boilerplate. All rights reserved.
        </p>
        <div class="flex items-center gap-4">
          <a href="https://github.com/shadcn-vue/ui" target="_blank" rel="noreferrer" class="text-muted-foreground hover:text-foreground">
            <Icon name="lucide:github" class="h-5 w-5" />
            <span class="sr-only">GitHub</span>
          </a>
          <a href="https://twitter.com/shadcn" target="_blank" rel="noreferrer" class="text-muted-foreground hover:text-foreground">
            <Icon name="lucide:twitter" class="h-5 w-5" />
            <span class="sr-only">Twitter</span>
          </a>
          <a href="https://discord.gg/shadcn-ui" target="_blank" rel="noreferrer" class="text-muted-foreground hover:text-foreground">
            <Icon name="lucide:message-square" class="h-5 w-5" />
            <span class="sr-only">Discord</span>
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
// No imports needed for this component
</script>
