<template>
  <div class="container max-w-screen-2xl mx-auto px-4">
    <!-- Hero Section -->
    <section class="py-20 lg:py-32">
      <div class="flex flex-col items-center justify-center text-center">
        <!-- Hero Badge -->
        <div class="mb-6">
          <Badge variant="secondary" class="px-4 py-2 text-sm font-medium">
            <Icon name="lucide:sparkles" class="mr-2 h-4 w-4" />
            Modern Development Stack
          </Badge>
        </div>

        <!-- Hero Title -->
        <h1 class="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl mb-6">
          <span class="gradient-text">{{ pageTitle }}</span>
        </h1>

        <!-- Hero Description -->
        <p class="text-xl text-muted-foreground max-w-3xl mb-8 leading-relaxed">
          {{ pageDescription }}
        </p>

        <!-- CTA Buttons -->
        <div class="flex flex-col sm:flex-row gap-4 mb-12">
          <Button size="lg" class="px-8 py-4 text-lg" as-child>
            <NuxtLink to="/dashboard">
              Get Started
              <Icon name="lucide:arrow-right" class="ml-2 h-5 w-5" />
            </NuxtLink>
          </Button>
          <Button variant="outline" size="lg" class="px-8 py-4 text-lg" as-child>
            <NuxtLink to="/docs">
              View Documentation
              <Icon name="lucide:book-open" class="ml-2 h-5 w-5" />
            </NuxtLink>
          </Button>
        </div>

        <!-- Stats -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8 w-full max-w-2xl">
          <div class="text-center">
            <div class="text-2xl font-bold text-primary">100%</div>
            <div class="text-sm text-muted-foreground">TypeScript</div>
          </div>
          <div class="text-center">
            <div class="text-2xl font-bold text-primary">SSR</div>
            <div class="text-sm text-muted-foreground">Ready</div>
          </div>
          <div class="text-center">
            <div class="text-2xl font-bold text-primary">50+</div>
            <div class="text-sm text-muted-foreground">Components</div>
          </div>
          <div class="text-center">
            <div class="text-2xl font-bold text-primary">Fast</div>
            <div class="text-sm text-muted-foreground">Performance</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-20 border-t">
      <div class="text-center mb-16">
        <h2 class="text-3xl font-bold mb-4">Everything You Need</h2>
        <p class="text-lg text-muted-foreground max-w-2xl mx-auto">
          A complete boilerplate with modern tools and best practices built-in
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <Card v-for="feature in features" :key="feature.title" class="p-6 hover:shadow-lg transition-shadow">
          <div class="flex items-center mb-4">
            <div class="p-2 bg-primary/10 rounded-lg mr-4">
              <Icon :name="feature.icon" class="h-6 w-6 text-primary" />
            </div>
            <h3 class="text-lg font-semibold">{{ feature.title }}</h3>
          </div>
          <p class="text-muted-foreground">{{ feature.description }}</p>
        </Card>
      </div>
    </section>

    <!-- Tech Stack Section -->
    <section class="py-20 border-t">
      <div class="text-center mb-16">
        <h2 class="text-3xl font-bold mb-4">Built With Modern Tech</h2>
        <p class="text-lg text-muted-foreground max-w-2xl mx-auto">
          Powered by the latest and greatest technologies
        </p>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
        <div v-for="tech in techStack" :key="tech.name" class="flex flex-col items-center group">
          <div class="p-4 bg-background border rounded-lg mb-3 group-hover:shadow-md transition-shadow">
            <Icon :name="tech.icon" class="h-8 w-8" />
          </div>
          <span class="text-sm font-medium">{{ tech.name }}</span>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 border-t">
      <div class="text-center">
        <h2 class="text-3xl font-bold mb-4">Ready to Build Something Amazing?</h2>
        <p class="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
          Start your next project with this powerful boilerplate and save weeks of setup time
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" class="px-8 py-4" as-child>
            <NuxtLink to="/dashboard">
              Start Building
              <Icon name="lucide:rocket" class="ml-2 h-5 w-5" />
            </NuxtLink>
          </Button>
          <Button variant="outline" size="lg" class="px-8 py-4" as-child>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
              View on GitHub
              <Icon name="lucide:github" class="ml-2 h-5 w-5" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const appConfig = useAppConfig()

// Page meta
useSeoMeta({
  title: 'Nuxt Shad Boilerplate - Modern Development Stack',
  description: 'A complete Nuxt 3 boilerplate with Shadcn UI, TypeScript, and modern development tools',
  ogTitle: 'Nuxt Shad Boilerplate',
  ogDescription: 'Start your next project with this powerful boilerplate',
  twitterCard: 'summary_large_image'
})

// Use computed properties to ensure consistent rendering
const pageTitle = computed(() => {
  return appConfig?.app?.name || 'Nuxt Shad Boilerplate'
})

const pageDescription = computed(() => {
  return appConfig?.app?.description || 'A complete Nuxt 3 boilerplate with Shadcn UI, TypeScript, Tailwind CSS, and modern development tools. Start building your next project with confidence.'
})

// Features data
const features = ref([
  {
    title: 'TypeScript First',
    description: 'Full TypeScript support with strict type checking and excellent DX',
    icon: 'logos:typescript-icon'
  },
  {
    title: 'Shadcn UI',
    description: 'Beautiful, accessible components built with Radix UI and Tailwind CSS',
    icon: 'lucide:palette'
  },
  {
    title: 'SSR Ready',
    description: 'Server-side rendering with hydration for optimal performance and SEO',
    icon: 'lucide:server'
  },
  {
    title: 'Dark Mode',
    description: 'Built-in dark mode support with system preference detection',
    icon: 'lucide:moon'
  },
  {
    title: 'Internationalization',
    description: 'Multi-language support with vue-i18n integration',
    icon: 'lucide:globe'
  },
  {
    title: 'Developer Experience',
    description: 'ESLint, Prettier, and hot reload for the best development experience',
    icon: 'lucide:code'
  }
])

// Tech stack data
const techStack = ref([
  { name: 'Nuxt 3', icon: 'logos:nuxt-icon' },
  { name: 'Vue 3', icon: 'logos:vue' },
  { name: 'TypeScript', icon: 'logos:typescript-icon' },
  { name: 'Tailwind', icon: 'logos:tailwindcss-icon' },
  { name: 'Vite', icon: 'logos:vitejs' },
  { name: 'Pinia', icon: 'logos:pinia' }
])

// Ensure appConfig is fully loaded on both client and server
onMounted(() => {
  console.log('App config loaded:', appConfig)
})
</script>

<style scoped>
.gradient-text {
  /* Light mode gradient */
  background: linear-gradient(135deg, #2563eb 0%, #7c3aed 50%, #dc2626 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Dark mode gradient */
.dark .gradient-text {
  background: linear-gradient(135deg, #60a5fa 0%, #a78bfa 50%, #f87171 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Fallback for browsers that don't support background-clip */
@supports not (-webkit-background-clip: text) {
  .gradient-text {
    color: hsl(var(--primary));
  }
}
</style>
