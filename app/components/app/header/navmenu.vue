<template>
  <header class="w-full border-b border-border bg-background">
    <div class="container flex h-16 items-center justify-between">
      <div class="flex items-center gap-6">
        <NuxtLink to="/" class="font-semibold text-xl flex items-center gap-2">
          <Icon name="lucide:box" class="h-6 w-6 text-primary" />
          <span>Nuxt Shadcn</span>
        </NuxtLink>
        <nav class="hidden md:flex items-center gap-6">
          <NuxtLink to="/" class="text-sm font-medium hover:text-primary">Home</NuxtLink>
          <NuxtLink to="/components" class="text-sm font-medium hover:text-primary">Components</NuxtLink>
          <NuxtLink to="/docs" class="text-sm font-medium hover:text-primary">Documentation</NuxtLink>
        </nav>
      </div>
      <div class="flex items-center gap-4">
        <a href="https://github.com/shadcn-vue/ui" target="_blank" rel="noreferrer" class="hidden md:flex">
          <Icon name="lucide:github" class="h-5 w-5" />
          <span class="sr-only">GitHub</span>
        </a>
        <Button variant="outline" size="icon" class="hidden md:flex">
          <Icon name="lucide:sun" class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Icon name="lucide:moon" class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span class="sr-only">Toggle theme</span>
        </Button>
        <Sheet>
          <SheetTrigger as-child class="md:hidden">
            <Button variant="outline" size="icon">
              <Icon name="lucide:menu" class="h-5 w-5" />
              <span class="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <SheetHeader>
              <SheetTitle class="text-left">Navigation</SheetTitle>
            </SheetHeader>
            <nav class="flex flex-col gap-4 mt-4">
              <NuxtLink to="/" class="text-sm font-medium hover:text-primary">Home</NuxtLink>
              <NuxtLink to="/components" class="text-sm font-medium hover:text-primary">Components</NuxtLink>
              <NuxtLink to="/docs" class="text-sm font-medium hover:text-primary">Documentation</NuxtLink>
              <Separator />
              <a href="https://github.com/shadcn-vue/ui" target="_blank" rel="noreferrer" class="flex items-center gap-2 text-sm font-medium">
                <Icon name="lucide:github" class="h-5 w-5" />
                GitHub
              </a>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Separator } from '@/components/ui/separator'
</script>
