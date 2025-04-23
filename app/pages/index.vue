<template>
  <main class="min-h-screen flex flex-col items-center justify-center bg-background text-foreground">
    <!-- Hero Section -->
    <section class="w-full max-w-2xl text-center py-16">
      <h1 class="text-4xl md:text-6xl font-bold mb-4">Nuxt 4 + Shadcn Boilerplate</h1>
      <p class="text-lg md:text-xl text-muted-foreground mb-8">
        A modern Nuxt 4 starter with Shadcn UI components, Tailwind CSS, and best practices out of the box.
      </p>
      <Button size="lg" class="px-8 py-4 text-lg">Get Started</Button>
    </section>

    <!-- Features Section -->
    <section class="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-8 py-12">
      <div class="bg-card rounded-lg p-6 shadow flex flex-col items-center">
        <Icon name="lucide:rocket" size="32" class="mb-2 text-primary" />
        <h2 class="font-semibold text-xl mb-2">Fast & Modern</h2>
        <p class="text-muted-foreground text-center">Built with Nuxt 4, Vite, and the latest frontend technologies for speed and DX.</p>
      </div>
      <div class="bg-card rounded-lg p-6 shadow flex flex-col items-center">
        <Icon name="lucide:component" size="32" class="mb-2 text-primary" />
        <h2 class="font-semibold text-xl mb-2">Shadcn UI</h2>
        <p class="text-muted-foreground text-center">Reusable, accessible, and beautiful UI components powered by Shadcn and Tailwind CSS.</p>
      </div>
      <div class="bg-card rounded-lg p-6 shadow flex flex-col items-center">
        <Icon name="lucide:settings" size="32" class="mb-2 text-primary" />
        <h2 class="font-semibold text-xl mb-2">Customizable</h2>
        <p class="text-muted-foreground text-center">Easily extend, theme, and configure to fit your project’s needs.</p>
      </div>
    </section>

    <!-- Component Showcase -->
    <section class="w-full max-w-2xl py-12 flex flex-col items-center gap-6">
      <h2 class="text-2xl font-bold mb-4">Component Showcase</h2>
      <div class="flex flex-wrap gap-4 justify-center">
        <Button>Primary Button</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="destructive">Destructive</Button>
      </div>
      <div class="w-full max-w-xs mt-8">
        <Input placeholder="Type something..." />
      </div>
      <div class="w-full max-w-xs mt-4">
        <Separator />
      </div>
      <div class="w-full max-w-xs mt-4">
        <Skeleton class="h-8 w-full" />
      </div>
    </section>

    <!-- Footer -->
    <footer class="w-full py-8 text-center text-muted-foreground text-sm mt-auto">
      &copy; {{ new Date().getFullYear() }} Nuxt 4 + Shadcn Boilerplate. All rights reserved.
    </footer>
  </main>
</template>

<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import Icon from '@/components/ui/icon' // If you have a local Icon component, otherwise use <Icon> from @nuxt/icon
</script>




