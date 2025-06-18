<template>
  <div class="container max-w-screen-2xl mx-auto px-4 py-8">
    <!-- Your page content here -->
    <div class="flex flex-col items-center justify-center min-h-[calc(100vh-12rem)]">
      <h1 class="text-4xl font-bold text-center mb-4">
        Welcome to {{ appConfig?.app?.name || 'Nuxt Shadcn Boilerplate' }}
      </h1>
      <p class="text-xl text-muted-foreground text-center mb-8 max-w-2xl">
        {{ appConfig?.app?.description || 'A modern Nuxt 3 boilerplate with Shadcn UI components' }}
      </p>

      <div class="flex gap-4">
        <Button as-child size="lg">
          <NuxtLink to="/dashboard">
            Get Started
            <Icon name="lucide:arrow-right" class="ml-2 h-4 w-4" />
          </NuxtLink>
        </Button>
        <Button variant="outline" size="lg" as-child>
          <NuxtLink to="/roadmap">
            View Roadmap
          </NuxtLink>
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { $config } = useNuxtApp()

// Get app config
const appConfig = computed(() => $config?.shared?.app || null)
</script>
