<template>
  <div class="w-full">
    <!-- Loading -->
    <div v-if="isLoading" class="flex items-center justify-center min-h-[50vh] py-10">
      <div class="text-center px-4">
        <Icon name="lucide:loader-2" class="h-8 w-8 animate-spin text-primary mx-auto mb-4" />
        <h3 class="text-base sm:text-lg font-semibold mb-2">Loading Releases</h3>
        <p class="text-muted-foreground text-sm sm:text-base">Please wait while we fetch the latest releases...</p>
      </div>
    </div>

    <div v-else class="space-y-6 sm:space-y-8">
      <!-- Header -->
      <div class="border-b border-border pb-4 sm:pb-5">
        <div class="flex flex-col md:flex-row md:items-end md:justify-between gap-3 md:gap-4">
          <!-- Title + Description -->
          <div class="flex flex-col gap-2">
            <div class="flex items-center gap-2">
              <h1 class="text-xl sm:text-3xl font-bold tracking-tight text-foreground">Release Notes</h1>
              <Badge variant="secondary" class="text-[10px] sm:text-xs inline-flex items-center h-5 px-2" :style="{ borderRadius: `${currentRadius * 0.5}rem` }">{{ totalReleases }}</Badge>
            </div>
            <p class="text-muted-foreground text-xs sm:text-sm md:text-base max-w-2xl">Stay updated with the latest features, improvements, and bug fixes in our Nuxt boilerplate.</p>
          </div>
          <!-- Search -->
          <div class="w-full md:w-auto md:ms-4">
            <div class="relative w-full sm:w-64 md:w-72">
              <Icon name="lucide:search" class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input v-model="searchQuery" placeholder="Search..." class="pl-9 w-full text-sm h-9 sm:h-10" :style="{ borderRadius: `${currentRadius}rem` }" />
            </div>
          </div>
        </div>
      </div>

      <!-- Overlay loader for pagination -->
      <div v-if="isLoadingMore" class="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
        <div class="text-center px-4">
          <Icon name="lucide:loader-2" class="h-8 w-8 animate-spin text-primary mx-auto mb-4" />
          <h3 class="text-lg font-semibold mb-2 text-foreground">Loading More Releases</h3>
          <p class="text-muted-foreground">Fetching additional releases...</p>
        </div>
      </div>

      <div class="space-y-5 sm:space-y-8">
        <div
          v-for="(release, index) in sortedFilteredReleases"
          :key="release.id"
          class="relative bg-card border border-border text-card-foreground p-4 sm:p-6 transition-all duration-200 shadow-sm hover:shadow-md rounded-md"
          :style="{ borderRadius: `${currentRadius}rem` }"
        >
          <!-- Meta header -->
          <div class="mb-3 sm:mb-4 flex flex-wrap items-center gap-x-4 gap-y-1">
            <div class="text-xs sm:text-sm font-medium text-muted-foreground">{{ release.author || 'Unknown Author' }}</div>
            <div class="text-[10px] sm:text-xs font-semibold tracking-wide text-primary">{{ formatReleaseDate(release.date) }}</div>
          </div>

            <!-- Title / badges -->
          <div class="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
            <div class="flex-1 space-y-2 min-w-0">
              <div class="flex flex-col sm:flex-row sm:items-center gap-2">
                <h2 class="text-base sm:text-xl font-bold text-foreground hover:text-primary transition-colors break-words leading-snug">{{ release.title }}</h2>
                <div class="flex items-center gap-2">
                  <Badge variant="outline" class="w-fit text-[10px] sm:text-xs" :style="{ borderRadius: `${currentRadius * 0.5}rem` }">{{ release.tag }}</Badge>
                  <Badge v-if="index === 0" class="w-fit text-[10px] sm:text-xs bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-300 dark:border-green-800" :style="{ borderRadius: `${currentRadius * 0.5}rem` }">Latest</Badge>
                </div>
              </div>
              <p class="text-muted-foreground leading-relaxed text-xs sm:text-sm md:text-base">{{ release.description }}</p>
            </div>
          </div>

          <!-- Changelog -->
          <div :id="`changelog-${release.id}`" :class="['relative transition-all duration-200', collapsedReleases[release.id] && shouldShowReadMore(release) ? 'max-h-48 sm:max-h-60 overflow-hidden' : '']">
            <div class="space-y-4 sm:space-y-6">
              <template v-for="section in sections" :key="section.key">
                <div v-if="release.changelog?.[section.key]?.length" class="space-y-2">
                  <h3 class="flex items-center gap-2 text-[11px] sm:text-sm font-semibold text-foreground">
                    <span class="text-sm sm:text-lg">{{ section.icon }}</span>
                    {{ section.label }}
                  </h3>
                  <ul class="ms-3 sm:ms-6 space-y-1">
                    <li v-for="(item, i) in release.changelog[section.key]" :key="`${section.key}-${release.id}-${i}`" class="text-[11px] sm:text-sm text-muted-foreground flex items-start gap-2">
                      <span class="text-muted-foreground mt-1.5 block w-1 h-1 flex-shrink-0 bg-muted-foreground" :style="{ borderRadius: `${currentRadius * 0.25}rem` }" />
                      {{ item }}
                    </li>
                  </ul>
                </div>
              </template>
            </div>
            <div v-if="collapsedReleases[release.id] && shouldShowReadMore(release)" class="pointer-events-none absolute inset-x-0 bottom-0 h-12 sm:h-16 bg-gradient-to-t from-background to-background/0" />
          </div>

          <!-- Read more -->
          <div v-if="shouldShowReadMore(release)" class="mt-4 sm:mt-5 flex justify-center">
            <button class="text-[11px] sm:text-sm font-medium text-primary hover:text-primary/80 hover:underline inline-flex items-center gap-1 px-2 py-1 rounded-sm hover:bg-accent" :style="{ borderRadius: `${currentRadius * 0.5}rem` }" :aria-expanded="!collapsedReleases[release.id]" :aria-controls="`changelog-${release.id}`" @click="toggleCollapse(release.id)">
              <span>{{ collapsedReleases[release.id] ? 'Read more...' : 'Show less' }}</span>
              <Icon :name="collapsedReleases[release.id] ? 'lucide:chevron-down' : 'lucide:chevron-up'" class="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <!-- Load more -->
      <div v-if="hasMoreReleases" class="flex justify-center pt-6 sm:pt-10">
        <Button variant="outline" class="gap-2 h-9 sm:h-10 text-xs sm:text-sm" :style="{ borderRadius: `${currentRadius}rem` }" :disabled="isLoadingMore" @click="loadMoreReleases">
          <Icon name="lucide:refresh-cw" class="h-4 w-4" />
          Load more releases
        </Button>
      </div>

      <!-- Empty -->
      <div v-if="sortedFilteredReleases.length === 0" class="text-center py-12 sm:py-16">
        <div class="bg-card border border-border p-4 w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-4 flex items-center justify-center" :style="{ borderRadius: `${currentRadius}rem` }">
          <Icon name="lucide:package" class="h-6 w-6 sm:h-8 sm:w-8 text-muted-foreground" />
        </div>
        <h3 class="text-base sm:text-lg font-semibold mb-2 text-foreground">No releases found</h3>
        <p class="text-muted-foreground mb-4 text-xs sm:text-sm md:text-base">{{ searchQuery ? 'Try adjusting your search terms.' : 'No releases available yet.' }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { allReleases as releasesSeed } from '~~/shared/pages'

definePageMeta({ title: 'Releases' })

const theme = useTheme()
const currentRadius = computed(() => unref(theme.currentRadius))

const searchQuery = ref('')
const isLoading = ref(true)
const isLoadingMore = ref(false)
const displayedCount = ref(2)

const allReleases = ref([...releasesSeed])
const totalReleases = computed(() => allReleases.value.length)

const collapsedReleases = ref<Record<string, boolean>>({})
const sections = [
  { key: 'performance', label: 'Performance', icon: '⚡' },
  { key: 'fixes', label: 'Bug Fixes', icon: '🐛' },
  { key: 'features', label: 'New Features', icon: '✨' },
  { key: 'chore', label: 'Chore', icon: '🧹' },
  { key: 'tests', label: 'Tests', icon: '🧪' },
  { key: 'ci', label: 'CI/CD', icon: '🔧' },
  { key: 'documentation', label: 'Documentation', icon: '📚' },
  { key: 'contributors', label: 'Contributors', icon: '👥' }
]

const changelogItemCount = (r: any) =>
  sections.reduce((acc, s) => acc + (r.changelog?.[s.key]?.length || 0), 0)

const shouldShowReadMore = (r: any) => changelogItemCount(r) > 6

const toggleCollapse = (id: string) => {
  if (collapsedReleases.value[id] === undefined) collapsedReleases.value[id] = true
  collapsedReleases.value[id] = !collapsedReleases.value[id]
}

const initCollapse = () => {
  allReleases.value.forEach(r => {
    if (collapsedReleases.value[r.id] === undefined) collapsedReleases.value[r.id] = true
  })
}

onMounted(initCollapse)
watch(allReleases, initCollapse, { deep: true })

const releases = computed(() => {
  if (searchQuery.value.trim() !== '') return allReleases.value
  return allReleases.value.slice(0, displayedCount.value)
})

const hasMoreReleases = computed(() => displayedCount.value < allReleases.value.length)

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
        d.toISOString().slice(0, 10)
      ]
      dateMatch = variants.some(v => v.toLowerCase().includes(q))
    }
    return baseMatch || dateMatch
  })
})

const sortedFilteredReleases = computed(() =>
  [...filteredReleases.value].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
)

const formatReleaseDate = (date?: Date) => {
  if (!date) return ''
  const day = date.toLocaleDateString('en-US', { day: '2-digit' })
  const month = date.toLocaleDateString('en-US', { month: 'long' })
  const year = date.getFullYear()
  return `${day}, ${month} ${year}`
}

const loadMoreReleases = async () => {
  isLoadingMore.value = true
  await new Promise(r => setTimeout(r, 600))
  displayedCount.value = Math.min(displayedCount.value + 2, allReleases.value.length)
  isLoadingMore.value = false
}

onMounted(async () => {
  await new Promise(r => setTimeout(r, 400))
  isLoading.value = false
})

useSeoMeta({
  title: 'Release Notes - Nuxt Boilerplate',
  description: 'Stay updated with the latest features, improvements, and bug fixes in our Nuxt boilerplate.',
})
</script>
