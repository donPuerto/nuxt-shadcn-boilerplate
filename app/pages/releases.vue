<template>
  <div class="min-h-screen bg-background">
    <!-- Header -->
    <div class="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="flex items-center py-4">
          <div class="w-32 sm:w-40 pr-4 sm:pr-6 flex items-center">
            <div class="flex items-center gap-2">
              <h1 class="text-lg sm:text-xl font-bold leading-none">Releases</h1>
              <Badge variant="secondary" class="text-xs inline-flex items-center h-5 px-2 self-end mt-1">
                {{ totalReleases }}
              </Badge>
            </div>
          </div>
          <div class="w-6 flex-shrink-0"/>
            <div class="flex-1 pl-4 lg:pl-6">
              <div class="flex justify-end">
                <div class="relative w-full sm:w-64 max-w-sm">
                  <Icon name="lucide:search" class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    v-model="searchQuery"
                    placeholder="Search (title, tag, date)..."
                    class="pl-9 w-full"
                  />
                </div>
              </div>
            </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <!-- Loading -->
      <div v-if="isLoading" class="flex items-center justify-center min-h-[60vh]">
        <div class="text-center">
          <Icon name="lucide:loader-2" class="h-8 w-8 animate-spin text-primary mx-auto mb-4" />
          <h3 class="text-lg font-semibold mb-2">Loading Releases</h3>
          <p class="text-muted-foreground">Please wait while we fetch the latest releases...</p>
        </div>
      </div>

      <div v-else>
        <div v-if="isLoadingMore" class="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
          <div class="text-center">
            <Icon name="lucide:loader-2" class="h-8 w-8 animate-spin text-primary mx-auto mb-4" />
            <h3 class="text-lg font-semibold mb-2">Loading More Releases</h3>
            <p class="text-muted-foreground">Fetching additional releases...</p>
          </div>
        </div>

        <Timeline :items="sortedFilteredReleases">
          <template #default="{ item: release, index }">
            <div class="rounded-lg border bg-card hover:bg-accent/5 transition-colors">
              <div class="p-4 sm:p-6">
                <!-- Header -->
                <div class="flex flex-col sm:flex-row sm:items-start justify-between mb-4 gap-4">
                  <div class="flex items-start gap-3 sm:gap-4 flex-1">
                    <!-- Release Icon -->
                    <div class="flex items-center justify-center rounded-full bg-muted w-8 h-8 sm:w-9 sm:h-9 flex-shrink-0 border border-border">
                      <Icon name="lucide:tag" class="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
                    </div>
                    <!-- Title / Badges -->
                    <div class="space-y-2 flex-1 min-w-0">
                      <div class="flex flex-col sm:flex-row sm:items-center gap-2">
                        <h3 class="text-lg sm:text-xl font-bold hover:text-primary cursor-pointer break-words">
                          {{ release.title }}
                        </h3>
                        <div class="flex items-center gap-2">
                          <Badge variant="outline" class="w-fit">{{ release.tag }}</Badge>
                          <Badge
                            v-if="index === 0"
                            class="w-fit bg-green-50 text-green-700 border-green-200 hover:bg-green-100 dark:bg-green-950 dark:text-green-300 dark:border-green-800"
                          >
                            Latest
                          </Badge>
                        </div>
                      </div>
                      <p class="text-muted-foreground leading-relaxed text-sm sm:text-base">
                        {{ release.description }}
                      </p>
                    </div>
                  </div>
                </div>

                <!-- Changelog (Collapsible) -->
                <div
                  :class="[
                    'relative transition-all',
                    collapsedReleases[release.id] ? 'max-h-60 overflow-hidden' : ''
                  ]"
                >
                  <div class="space-y-4">
                    <!-- Performance -->
                    <div v-if="release.changelog?.performance?.length" class="space-y-2">
                      <h4 class="flex items-center gap-2 text-sm font-semibold text-foreground">
                        <span class="text-base sm:text-lg">⚡</span>
                        Performance
                      </h4>
                      <ul class="ml-4 sm:ml-6 space-y-1">
                        <li
                          v-for="(item, i) in release.changelog.performance"
                          :key="`perf-${release.id}-${i}`"
                          class="text-xs sm:text-sm text-muted-foreground flex items-start gap-2"
                        >
                          <span class="text-muted-foreground mt-1.5 block w-1 h-1 rounded-full bg-current flex-shrink-0"/>
                          {{ item }}
                        </li>
                      </ul>
                    </div>

                    <!-- Fixes -->
                    <div v-if="release.changelog?.fixes?.length" class="space-y-2">
                      <h4 class="flex items-center gap-2 text-sm font-semibold text-foreground">
                        <span class="text-base sm:text-lg">🐛</span>
                        Bug Fixes
                      </h4>
                      <ul class="ml-4 sm:ml-6 space-y-1">
                        <li
                          v-for="(item, i) in release.changelog.fixes"
                          :key="`fix-${release.id}-${i}`"
                          class="text-xs sm:text-sm text-muted-foreground flex items-start gap-2"
                        >
                          <span class="text-muted-foreground mt-1.5 block w-1 h-1 rounded-full bg-current flex-shrink-0"/>
                          {{ item }}
                        </li>
                      </ul>
                    </div>

                    <!-- Features -->
                    <div v-if="release.changelog?.features?.length" class="space-y-2">
                      <h4 class="flex items-center gap-2 text-sm font-semibold text-foreground">
                        <span class="text-base sm:text-lg">✨</span>
                        New Features
                      </h4>
                      <ul class="ml-4 sm:ml-6 space-y-1">
                        <li
                          v-for="(item, i) in release.changelog.features"
                          :key="`feat-${release.id}-${i}`"
                          class="text-xs sm:text-sm text-muted-foreground flex items-start gap-2"
                        >
                          <span class="text-muted-foreground mt-1.5 block w-1 h-1 rounded-full bg-current flex-shrink-0"/>
                          {{ item }}
                        </li>
                      </ul>
                    </div>

                    <!-- Chore -->
                    <div v-if="release.changelog?.chore?.length" class="space-y-2">
                      <h4 class="flex items-center gap-2 text-sm font-semibold text-foreground">
                        <span class="text-base sm:text-lg">🧹</span>
                        Chore
                      </h4>
                      <ul class="ml-4 sm:ml-6 space-y-1">
                        <li
                          v-for="(item, i) in release.changelog.chore"
                          :key="`chore-${release.id}-${i}`"
                          class="text-xs sm:text-sm text-muted-foreground flex items-start gap-2"
                        >
                          <span class="text-muted-foreground mt-1.5 block w-1 h-1 rounded-full bg-current flex-shrink-0"/>
                          {{ item }}
                        </li>
                      </ul>
                    </div>

                    <!-- Tests -->
                    <div v-if="release.changelog?.tests?.length" class="space-y-2">
                      <h4 class="flex items-center gap-2 text-sm font-semibold text-foreground">
                        <span class="text-base sm:text-lg">🧪</span>
                        Tests
                      </h4>
                      <ul class="ml-4 sm:ml-6 space-y-1">
                        <li
                          v-for="(item, i) in release.changelog.tests"
                          :key="`tests-${release.id}-${i}`"
                          class="text-xs sm:text-sm text-muted-foreground flex items-start gap-2"
                        >
                          <span class="text-muted-foreground mt-1.5 block w-1 h-1 rounded-full bg-current flex-shrink-0"/>
                          {{ item }}
                        </li>
                      </ul>
                    </div>

                    <!-- CI/CD -->
                    <div v-if="release.changelog?.ci?.length" class="space-y-2">
                      <h4 class="flex items-center gap-2 text-sm font-semibold text-foreground">
                        <span class="text-base sm:text-lg">🔧</span>
                        CI/CD
                      </h4>
                      <ul class="ml-4 sm:ml-6 space-y-1">
                        <li
                          v-for="(item, i) in release.changelog.ci"
                          :key="`ci-${release.id}-${i}`"
                          class="text-xs sm:text-sm text-muted-foreground flex items-start gap-2"
                        >
                          <span class="text-muted-foreground mt-1.5 block w-1 h-1 rounded-full bg-current flex-shrink-0"/>
                          {{ item }}
                        </li>
                      </ul>
                    </div>

                    <!-- Documentation -->
                    <div v-if="release.changelog?.documentation?.length" class="space-y-2">
                      <h4 class="flex items-center gap-2 text-sm font-semibold text-foreground">
                        <span class="text-base sm:text-lg">📚</span>
                        Documentation
                      </h4>
                      <ul class="ml-4 sm:ml-6 space-y-1">
                        <li
                          v-for="(item, i) in release.changelog.documentation"
                          :key="`doc-${release.id}-${i}`"
                          class="text-xs sm:text-sm text-muted-foreground flex items-start gap-2"
                        >
                          <span class="text-muted-foreground mt-1.5 block w-1 h-1 rounded-full bg-current flex-shrink-0"/>
                          {{ item }}
                        </li>
                      </ul>
                    </div>

                    <!-- Contributors -->
                    <div v-if="release.changelog?.contributors?.length" class="space-y-2">
                      <h4 class="flex items-center gap-2 text-sm font-semibold text-foreground">
                        <span class="text-base sm:text-lg">👥</span>
                        Contributors
                      </h4>
                      <ul class="ml-4 sm:ml-6 space-y-1">
                        <li
                          v-for="(item, i) in release.changelog.contributors"
                          :key="`contrib-${release.id}-${i}`"
                          class="text-xs sm:text-sm text-muted-foreground flex items-start gap-2"
                        >
                          <span class="text-muted-foreground mt-1.5 block w-1 h-1 rounded-full bg-current flex-shrink-0"/>
                          {{ item }}
                        </li>
                      </ul>
                    </div>
                  </div>

                  <!-- Overlay when collapsed -->
                  <div
                    v-if="collapsedReleases[release.id]"
                    class="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-card to-transparent"
                  />
                </div>

                <!-- Read More -->
                <div
                  v-if="shouldShowReadMore(release)"
                  class="mt-4 flex justify-center"
                >
                  <button
                    class="text-xs sm:text-sm font-medium text-primary hover:underline inline-flex items-center gap-1"
                    @click="toggleCollapse(release.id)"
                  >
                    <span>{{ collapsedReleases[release.id] ? 'Read more...' : 'Show less' }}</span>
                    <Icon
                      :name="collapsedReleases[release.id] ? 'lucide:chevron-down' : 'lucide:chevron-up'"
                      class="h-4 w-4"
                    />
                  </button>
                </div>
              </div>
            </div>
          </template>
        </Timeline>

        <!-- Load More -->
        <div v-if="hasMoreReleases" class="flex justify-center pt-8">
          <Button
            variant="outline"
            class="gap-2"
            :disabled="isLoadingMore"
            @click="loadMoreReleases"
          >
            <Icon name="lucide:refresh-cw" class="h-4 w-4" />
            Load more releases
          </Button>
        </div>

        <!-- Empty -->
        <div v-if="sortedFilteredReleases.length === 0" class="text-center py-12">
          <div class="rounded-full bg-muted p-4 w-16 h-16 mx-auto mb-4">
            <Icon name="lucide:package" class="h-8 w-8 text-muted-foreground" />
          </div>
            <h3 class="text-lg font-semibold mb-2">No releases found</h3>
          <p class="text-muted-foreground mb-4 text-sm sm:text-base">
            {{ searchQuery ? 'Try adjusting your search terms.' : 'No releases available yet.' }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Timeline from "@/components/timeline"

definePageMeta({ title: 'Releases' })

const searchQuery = ref('')
const isLoading = ref(true)
const isLoadingMore = ref(false)
const displayedCount = ref(2)
const totalReleases = ref(6)

// Collapsed state per release
const collapsedReleases = ref<Record<number, boolean>>({})

const changelogItemCount = (release: any) => {
  const keys = ['performance','fixes','features','chore','tests','ci','documentation','contributors']
  return keys.reduce((acc, k) => acc + (release.changelog?.[k]?.length || 0), 0)
}
const shouldShowReadMore = (release: any) => changelogItemCount(release) > 6
const toggleCollapse = (id: number) => { collapsedReleases.value[id] = !collapsedReleases.value[id] }

// Data
const allReleases = ref([
  {
    id: 1,
    title: 'v1.0.0 - Touch Down',
    tag: 'v1.0.0',
    description: 'First public release of the Nuxt + Shadcn UI + Tailwind CSS v4 starter.',
    date: new Date('2024-01-15'),
    author: 'Don Puerto',
    changelog: {
      performance: [
        'Enabled Nuxt route-level code splitting & component-level lazy imports',
        'Configured Tailwind CSS v4 JIT for faster dev rebuilds',
        'Reduced initial CSS payload via layer pruning & safelist auditing',
        'Deferred non-critical icon components with dynamic import',
        'Optimized image and font loading with modern formats'
      ],
      fixes: [
        'Resolved initial hydration mismatch in dark mode toggle',
        'Fixed layout shift on first paint by stabilizing container sizes',
        'Corrected timeline alignment issues in responsive breakpoints'
      ],
      features: [
        'Integrated Nuxt 4 foundation with SSR + dynamic meta handling',
        'Added Shadcn UI component registry & automatic style tokens',
        'Implemented Tailwind CSS v4 setup with custom design tokens',
        'Dark / Light mode system preference detection & persistence',
        'Reusable Timeline component with responsive label positions',
        'Release notes page with structured changelog categories',
        'Semantic theming (background / foreground / border / ring)',
        'Accessibility-focused focus states & skip logic',
        'Global icon system using lucide with tree-shaking',
        'Auto-imported composables & components configuration',
        'Pre-configured alias paths and TypeScript strict mode',
        'Responsive typography + container sizing patterns'
      ],
      chore: [
        'Established folder structure: components/ui, composables, config',
        'Created theme + navigation config injection via app.config',
        'Added ESLint + Prettier + Stylelint baseline rules',
        'Added commit conventions + lint-staged hooks',
        'Cleaned unused scaffold files and demo clutter'
      ],
      tests: [
        'Prepared testing setup placeholders (unit + e2e)',
        'Added accessibility linting pipeline hooks'
      ],
      ci: [
        'Initial GitHub Actions workflow draft (build + typecheck)',
        'Configured dependency caching for faster pipelines'
      ],
      documentation: [
        'Authored README with setup, scripts, and deployment guide',
        'Added component usage notes (buttons, badges, timeline)',
        'Documented theming + adding new Shadcn components',
        'Included Tailwind config notes for v4 transition',
        'Added release workflow & semantic versioning guidelines'
      ],
      contributors: [
        'Don Puerto (@donPuerto) - Lead Developer'
      ]
    }
  },
  {
    id: 2,
    title: 'v0.9.5 - Release Candidate',
    tag: 'v0.9.5',
    description: 'Release candidate with final refinements before 1.0.0.',
    date: new Date('2024-01-10'),
    author: 'Don Puerto',
    changelog: {
      fixes: [
        'Fixed memory leak in navigation component',
        'Resolved SSR hydration mismatch'
      ],
      chore: [
        'Updated build configuration',
        'Cleaned up development dependencies'
      ],
      tests: [
        'Added missing test coverage for edge cases',
        'Fixed flaky integration tests'
      ]
    }
  },
  {
    id: 3,
    title: 'v0.9.0 - Beta Release',
    tag: 'v0.9.0',
    description: 'Beta release with major features and improvements.',
    date: new Date('2024-01-05'),
    author: 'Don Puerto',
    changelog: {
      features: [
        'Added dark mode support',
        'Implemented user authentication',
        'Added dashboard functionality'
      ],
      fixes: [
        'Fixed responsive layout issues',
        'Resolved API timeout problems'
      ]
    }
  },
  {
    id: 4,
    title: 'v0.8.0 - Alpha Release',
    tag: 'v0.8.0',
    description: 'Alpha release with core functionality.',
    date: new Date('2023-12-20'),
    author: 'Don Puerto',
    changelog: {
      features: [
        'Initial project setup',
        'Basic routing implementation',
        'Component library integration'
      ]
    }
  }
])

onMounted(() => {
  allReleases.value.forEach(r => (collapsedReleases.value[r.id] = true))
})

const releases = computed(() => {
  if (searchQuery.value.trim() !== '') return allReleases.value
  return allReleases.value.slice(0, displayedCount.value)
})

const hasMoreReleases = computed(() => displayedCount.value < allReleases.value.length)

// Search Title + Tag + Date (long, short, ISO). (Description intentionally excluded per request)
const filteredReleases = computed(() => {
  if (!searchQuery.value) return releases.value
  const q = searchQuery.value.toLowerCase()
  return releases.value.filter(release => {
    const baseMatch = [release.title, release.tag].some(s => s.toLowerCase().includes(q))
    let dateMatch = false
    if (release.date) {
      const d = release.date
      const variants = [
        d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
        d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        d.toISOString().slice(0,10) // YYYY-MM-DD
      ]
      dateMatch = variants.some(v => v.toLowerCase().includes(q))
    }
    return baseMatch || dateMatch
  })
})

const sortedFilteredReleases = computed(() =>
  [...filteredReleases.value].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )
)

const loadMoreReleases = async () => {
  isLoadingMore.value = true
  await new Promise(r => setTimeout(r, 1200))
  displayedCount.value = Math.min(displayedCount.value + 2, allReleases.value.length)
  isLoadingMore.value = false
}

onMounted(async () => {
  await new Promise(r => setTimeout(r, 800))
  isLoading.value = false
})
</script>
