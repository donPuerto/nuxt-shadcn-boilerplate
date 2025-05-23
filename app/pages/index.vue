<!-- filepath: d:\Code\Nuxt\v4\LearnNuxt\nuxt-shadcn-boilerplate\app\pages\index.vue -->
<template>
  <div class="relative">
    <!-- Hero Section -->
    <section class="relative overflow-hidden pb-16 pt-24 sm:pb-24 sm:pt-32">
      <!-- Background Gradient - Keep this for the hero section only -->
      <div class="absolute inset-0 -z-10 opacity-30 dark:opacity-20">
        <div class="absolute inset-x-0 top-0 h-80 bg-gradient-to-b from-primary/20"/>
        <div class="absolute bottom-0 left-20 aspect-square w-3/4 rounded-full bg-gradient-to-tr from-primary/40 to-secondary/40 blur-3xl"/>
        <div class="absolute right-0 top-0 h-64 w-64 rounded-full bg-gradient-to-br from-primary/30 to-secondary/30 blur-2xl"/>
      </div>

      <div class="mx-auto max-w-7xl px-4 text-center">
        <h1 class="animate-fade-in bg-gradient-to-r from-primary to-secondary bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl md:text-6xl">
          {{ $t('home.title') }}
        </h1>
        <p class="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
          {{ $t('home.subtitle') }}
        </p>
        <div class="mt-10 flex justify-center gap-4">
          <Button size="lg" variant="default" class="group gap-1">
            {{ $t('home.getStarted') }}
            <i class="i-lucide-arrow-right transition-transform group-hover:translate-x-1"/>
          </Button>
          <Button size="lg" variant="secondary">
            <i class="i-lucide-github mr-2"/>
            GitHub
          </Button>
        </div>
        
        <div class="mt-12 flex justify-center">
          <Card class="w-full max-w-md border-primary/10 bg-background/60 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>{{ $t('home.switchLanguage') }}</CardTitle>
              <CardDescription>{{ $t('home.languageInfo') }}</CardDescription>
            </CardHeader>
            <CardContent>
              <div class="flex flex-wrap gap-2">
                <Button
                  variant="outline" size="sm" :class="{'border-primary text-primary': locale === 'en'}" 
                  @click="switchLanguage('en')">English</Button>
                <Button
                  variant="outline" size="sm" :class="{'border-primary text-primary': locale === 'fr'}"
                  @click="switchLanguage('fr')">Français</Button>
                <Button
                  variant="outline" size="sm" :class="{'border-primary text-primary': locale === 'es'}"
                  @click="switchLanguage('es')">Español</Button>
                <Button
                  variant="outline" size="sm" :class="{'border-primary text-primary': locale === 'de'}"
                  @click="switchLanguage('de')">Deutsch</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>

    <div class="p-4 space-y-4 bg-transparent">
      <h2 class="text-xl font-bold">Confetti Test</h2>
      <div class="space-x-4">
        <Button variant="secondary" size="sm" @click="showDefaultConfetti">Default Confetti</Button>
        <Button variant="primary" size="sm" @click="showEmojiConfetti">Random Emoji</Button>
        <Button variant="outline" size="sm" @click="showColoredConfetti">Tech Colors</Button>
      </div>
    </div>

    <!-- Features Section - CHANGED: Removed bg-muted/50 to make background visible -->
    <section class="py-16 backdrop-blur-[1px]">
      <div class="mx-auto max-w-7xl px-4">
        <h2 class="text-center text-3xl font-bold tracking-tight sm:text-4xl">{{ $t('home.features') }}</h2>
        <p class="mx-auto mt-4 max-w-2xl text-center text-muted-foreground">
          {{ $t('home.featuresDescription') }}
        </p>

        <div class="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <!-- Feature 1 -->
          <Card class="overflow-hidden transition-all hover:shadow-md bg-background/60 backdrop-blur-sm">
            <div class="absolute right-2 top-2 rounded-full bg-primary/10 p-2 text-primary">
              <i class="i-lucide-layout h-5 w-5"/>
            </div>
            <CardHeader>
              <CardTitle class="flex items-center gap-2">
                Shadcn UI Components
              </CardTitle>
              <CardDescription>
                Beautiful, accessible UI components with a consistent design system
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p class="text-sm text-muted-foreground">
                Ready-to-use components that you can copy and paste into your apps. 
                Accessible, customizable, and open source.
              </p>
            </CardContent>
            <CardFooter class="border-t bg-background/30 px-6 py-4">
              <Button variant="ghost" size="sm" class="gap-1">
                Learn more <i class="i-lucide-arrow-right h-4 w-4"/>
              </Button>
            </CardFooter>
          </Card>

          <!-- Feature 2 - Same pattern for other cards -->
          <Card class="overflow-hidden transition-all hover:shadow-md bg-background/60 backdrop-blur-sm">
            <!-- Card content remains the same -->
            <div class="absolute right-2 top-2 rounded-full bg-primary/10 p-2 text-primary">
              <i class="i-lucide-palette h-5 w-5"/>
            </div>
            <CardHeader>
              <CardTitle class="flex items-center gap-2">
                Tailwind CSS
              </CardTitle>
              <CardDescription>
                Utility-first CSS framework for rapid UI development
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p class="text-sm text-muted-foreground">
                A utility-first CSS framework packed with classes that can be composed
                to build any design, directly in your markup.
              </p>
            </CardContent>
            <CardFooter class="border-t bg-background/30 px-6 py-4">
              <Button variant="ghost" size="sm" class="gap-1">
                Learn more <i class="i-lucide-arrow-right h-4 w-4"/>
              </Button>
            </CardFooter>
          </Card>

          <!-- Feature 3 -->
          <Card class="overflow-hidden transition-all hover:shadow-md bg-background/60 backdrop-blur-sm">
            <!-- Card content remains the same -->
            <div class="absolute right-2 top-2 rounded-full bg-primary/10 p-2 text-primary">
              <i class="i-lucide-globe h-5 w-5"/>
            </div>
            <CardHeader>
              <CardTitle class="flex items-center gap-2">
                i18n Support
              </CardTitle>
              <CardDescription>
                Built-in internationalization for global applications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p class="text-sm text-muted-foreground">
                Support for multiple languages out of the box with simple
                translation keys and seamless language switching.
              </p>
            </CardContent>
            <CardFooter class="border-t bg-background/30 px-6 py-4">
              <Button variant="ghost" size="sm" class="gap-1">
                Learn more <i class="i-lucide-arrow-right h-4 w-4"/>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>

    <!-- Demo Components Section -->
    <section class="py-16 backdrop-blur-[1px]">
      <div class="mx-auto max-w-7xl px-4">
        <h2 class="text-center text-3xl font-bold tracking-tight sm:text-4xl">{{ $t('home.components') }}</h2>
        <p class="mx-auto mt-4 max-w-2xl text-center text-muted-foreground">
          {{ $t('home.componentsDescription') }}
        </p>

        <div class="mt-16 grid gap-6 sm:grid-cols-2">
          <!-- Component Demo Card -->
          <Card class="overflow-hidden bg-background/60 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Popover Component</CardTitle>
              <CardDescription>Interactive popover dialog</CardDescription>
            </CardHeader>
            <CardContent>
              <PopoverDemo />
            </CardContent>
          </Card>

          <!-- Theme Card -->
          <Card class="overflow-hidden bg-background/60 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Theme Selection</CardTitle>
              <CardDescription>Customize your experience</CardDescription>
            </CardHeader>
            <CardContent>
              <div class="grid gap-4">
                <div class="flex items-center justify-between">
                  <span class="flex items-center gap-2">
                    <i class="i-lucide-moon h-4 w-4"/>
                    Dark Mode
                  </span>
                  <ModeSwitcher />
                </div>
                <Separator />
                <div class="flex items-center justify-between">
                  <span class="flex items-center gap-2">
                    <i class="i-lucide-palette h-4 w-4"/>
                    Color Theme
                  </span>
                  <ThemePopover />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>

    <!-- CTA Section - CHANGED: Removed background color -->
    <section class="relative overflow-hidden border-y border-transparent py-16 backdrop-blur-[2px]">
      <div class="absolute inset-0 -z-10 opacity-30 dark:opacity-20">
        <div class="absolute right-1/4 top-0 h-64 w-64 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 blur-3xl"/>
        <div class="absolute bottom-0 left-1/4 h-64 w-64 rounded-full bg-gradient-to-tr from-primary/20 to-secondary/20 blur-3xl"/>
      </div>

      <div class="mx-auto max-w-7xl px-4 text-center">
        <h2 class="text-3xl font-bold tracking-tight sm:text-4xl">{{ $t('home.ready') }}</h2>
        <p class="mx-auto mt-4 max-w-2xl text-muted-foreground">
          {{ $t('home.readyDescription') }}
        </p>
        <div class="mt-8 flex justify-center gap-4">
          <Button size="lg">
            <i class="i-lucide-rocket mr-2"/>
            {{ $t('home.getStarted') }}
          </Button>
          <Button size="lg" variant="outline" class="bg-background/40 backdrop-blur-sm">
            <i class="i-lucide-book-open mr-2"/>
            {{ $t('home.documentation') }}
          </Button>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
import { useI18n } from '#imports'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

const { locale } = useI18n()
const { randomEmoji, techConfetti } = useConfetti();

// Show emoji confetti when the page loads
onMounted(() => {
  randomEmoji();
})

// Listen for route changes and show emoji confetti
const router = useRouter()
onBeforeMount(() => {
  router.beforeEach((to, from) => {
    // Only trigger if actually changing routes (not just query params)
    if (to.path !== from.path) {
      // Small delay to ensure it happens after route change
      setTimeout(() => {
        randomEmoji();
      }, 100)
    }
    return true
  })
})

function showDefaultConfetti() {
  const { $confetti } = useNuxtApp();
  $confetti.trigger(); // No options for default confetti
}

function showEmojiConfetti() {
  // Use composable with specific sets
  randomEmoji({ 
    sets: ['vue', 'tech'], 
    size: 40, 
    count: 40 
  });
}

function showColoredConfetti() {
  // Use composable for tech colors
  techConfetti();
}

/**
 * Switch to the selected language
 */
const switchLanguage = (lang: string) => {
  locale.value = lang

  // Show random celebration emojis when changing language
  randomEmoji({ 
    sets: ['celebration'],
    size: 30,
    count: 20
  });
}
</script>

<style scoped>
/* Add a subtle text shadow for better readability over the background */
h1, h2, h3 {
  text-shadow: 0 1px 2px rgba(0,0,0,0.1);
}

/* In dark mode, adjust the text shadow for better visibility */
:global(.dark) h1, 
:global(.dark) h2, 
:global(.dark) h3 {
  text-shadow: 0 1px 3px rgba(0,0,0,0.2);
}

/* Add a subtle border to cards for definition */
.card {
  border: 1px solid rgba(255,255,255,0.1);
}
</style>
