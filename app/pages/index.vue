<!-- filepath: d:\Code\Nuxt\v4\LearnNuxt\nuxt-shadcn-boilerplate\app\pages\index.vue -->
<template>
  <div class="relative">

    <!-- Hero Section -->
    <section class="py-16 backdrop-blur-[1px]">
      <div class="mx-auto max-w-7xl px-4 text-center">
        <h1 class="animate-fade-in bg-gradient-to-r from-primary to-secondary bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl md:text-6xl">
          {{ $t('home.title') }}
        </h1>
        <p class="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
          {{ $t('home.subtitle') }}
        </p>
        <div class="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">
          <!-- Get Started button with confetti trigger -->
          <Button 
            size="lg" 
            variant="default" 
            class="group gap-1 w-full sm:w-auto"
            @click="showEmojiConfetti"
          >
            {{ $t('home.getStarted') }}
            <Icon 
              name="lucide:arrow-right" 
              class="h-4 w-4 transition-transform group-hover:translate-x-1" 
            />
          </Button>
          
          <!-- Loop through buttons from app.config -->
          <template v-for="button in appConfig.heroButtons" :key="button.key">
            <NuxtLink 
              :to="button.url" 
              target="_blank" 
              rel="noopener noreferrer" 
              class="inline-block w-full sm:w-auto"
            >
              <Button size="lg" variant="secondary" class="gap-1 w-full">
                <Icon 
                  :name="`lucide:${button.key.toLowerCase()}`" 
                  class="h-4 w-4 mr-2" 
                />
                {{ $t(`home.buttons.${button.key.toLowerCase()}`) }}
              </Button>
            </NuxtLink>
          </template>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-16 backdrop-blur-[1px]">
      <div class="mx-auto max-w-7xl px-4">
        <h2 class="text-center text-3xl font-bold tracking-tight sm:text-4xl">{{ $t('home.features') }}</h2>
        <p class="mx-auto mt-4 max-w-2xl text-center text-muted-foreground">
          {{ $t('home.featuresDescription') }}
        </p>

        <div class="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <!-- Loop through features from app.config -->
          <template v-for="feature in appConfig.features" :key="feature.key">
            <Card class="overflow-hidden transition-all hover:shadow-md bg-background/60 backdrop-blur-sm">
              <div class="absolute right-2 top-2 rounded-full bg-primary/10 p-2 text-primary">
                <i :class="`i-lucide-${feature.icon} h-5 w-5`"/>
              </div>
              <CardHeader>
                <CardTitle class="flex items-center gap-2">
                  {{ $t(`home.featureCards.${feature.key.toLowerCase()}.title`) }}
                </CardTitle>
                <CardDescription>
                  {{ $t(`home.featureCards.${feature.key.toLowerCase()}.description`) }}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p class="text-sm text-muted-foreground">
                  {{ $t(`home.featureCards.${feature.key.toLowerCase()}.content`) }}
                </p>
              </CardContent>
              <CardFooter class="border-t bg-background/30 px-4 py-2">
                <NuxtLink :to="feature.url" target="_blank" rel="noopener noreferrer">
                  <Button variant="ghost" size="sm" class="gap-1 px-2 py-1">
                    {{ $t('home.learnMore') }} <i class="i-lucide-arrow-right h-4 w-4"/>
                  </Button>
                </NuxtLink>
              </CardFooter>
            </Card>
          </template>
        </div>
      </div>
    </section>

  </div>
</template>

<script lang="ts" setup>
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'

const appConfig = useAppConfig()
const { randomEmoji } = useConfetti();

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


function showEmojiConfetti() {
  // Use composable with specific sets
  randomEmoji({ 
    sets: ['vue', 'tech'], 
    size: 40, 
    count: 40 
  });
}




</script>

<style scoped>

</style>
