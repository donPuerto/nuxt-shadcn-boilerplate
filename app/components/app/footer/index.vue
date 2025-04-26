<template>
  <footer class="border-t border-border bg-background">
    <div class="container py-10 md:py-12">
 
      
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
