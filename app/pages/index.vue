<template>
  <div>
    <!-- Hero Section -->
    <section class="container py-20 md:py-28">
      <div class="mx-auto max-w-3xl text-center">
        <h1 class="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
          Build beautiful Nuxt apps with
          <span class="text-primary">Shadcn UI</span>
        </h1>
        <p class="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          A professionally designed boilerplate with accessible components, powerful theming, 
          and everything you need to build modern Nuxt applications.
        </p>
        <div class="flex flex-wrap gap-4 justify-center">
          <Button size="lg" as-child>
            <NuxtLink to="/components">
              Browse Components
            </NuxtLink>
          </Button>
          <Button size="lg" variant="outline" as-child>
            <a href="https://github.com/shadcn-vue/ui" target="_blank" rel="noreferrer">
              <Icon name="lucide:github" class="mr-2 h-4 w-4" />
              GitHub
            </a>
          </Button>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="container py-16">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="rounded-lg border bg-card p-6 shadow-sm flex flex-col">
          <div class="mb-4 rounded-full bg-primary/10 p-3 w-fit">
            <Icon name="lucide:palette" class="h-6 w-6 text-primary" />
          </div>
          <h3 class="text-xl font-semibold mb-2">Beautiful Design</h3>
          <p class="text-muted-foreground flex-1">
            Professionally designed components that follow modern design principles and look great in any application.
          </p>
        </div>
        
        <div class="rounded-lg border bg-card p-6 shadow-sm flex flex-col">
          <div class="mb-4 rounded-full bg-primary/10 p-3 w-fit">
            <Icon name="lucide:box" class="h-6 w-6 text-primary" />
          </div>
          <h3 class="text-xl font-semibold mb-2">Composable Components</h3>
          <p class="text-muted-foreground flex-1">
            Flexible, reusable components built with composition and customization in mind.
          </p>
        </div>
        
        <div class="rounded-lg border bg-card p-6 shadow-sm flex flex-col">
          <div class="mb-4 rounded-full bg-primary/10 p-3 w-fit">
            <Icon name="lucide:moon" class="h-6 w-6 text-primary" />
          </div>
          <h3 class="text-xl font-semibold mb-2">Dark Mode</h3>
          <p class="text-muted-foreground flex-1">
            Built-in dark mode with perfect color matching for all components and seamless switching.
          </p>
        </div>
      </div>
    </section>

    <!-- Component Preview Section -->
    <section class="container py-16 border-t">
      <div class="mx-auto max-w-3xl text-center mb-10">
        <h2 class="text-3xl font-bold mb-3">Component Showcase</h2>
        <p class="text-muted-foreground">
          A preview of some beautiful components you can use in your projects.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div class="rounded-lg border bg-card p-6 shadow-sm">
          <h3 class="text-lg font-medium mb-4">Buttons</h3>
          <div class="flex flex-wrap gap-3">
            <Button>Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
          </div>
        </div>

        <div class="rounded-lg border bg-card p-6 shadow-sm">
          <h3 class="text-lg font-medium mb-4">Form Controls</h3>
          <div class="flex flex-col gap-4">
            <Input placeholder="Email address" />
            <div class="grid grid-cols-2 gap-4">
              <Button variant="outline">Cancel</Button>
              <Button>Submit</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
</script>




