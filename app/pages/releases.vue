<template>
  <div class="min-h-screen bg-bg">
    <!-- Header -->
    <div class="border-b border-token bg-surface/95 backdrop-blur supports-[backdrop-filter]:bg-surface/75">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col gap-4 py-4 md:flex-row md:items-center">
          <div class="flex items-center gap-2">
            <h1 class="text-lg sm:text-xl font-bold">Releases</h1>
            <Badge variant="secondary" class="text-xs inline-flex items-center h-5 px-2">
              {{ totalReleases }}
            </Badge>
          </div>
          <div class="flex-1 md:ms-auto">
            <div class="flex justify-end">
              <div class="relative w-full sm:w-64 max-w-sm">
                <Icon name="lucide:search" class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-token" />
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

    <!-- Main -->
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <!-- Loading -->
      <div v-if="isLoading" class="flex items-center justify-center min-h-[60vh]">
        <div class="text-center">
          <Icon name="lucide:loader-2" class="h-8 w-8 animate-spin text-primary-token mx-auto mb-4" />
          <h3 class="text-lg font-semibold mb-2">Loading Releases</h3>
          <p class="text-muted-token">Please wait while we fetch the latest releases...</p>
        </div>
      </div>

      <div v-else>
        <!-- Overlay loader for pagination -->
        <div
          v-if="isLoadingMore"
          class="fixed inset-0 bg-bg/80 backdrop-blur-sm z-50 flex items-center justify-center"
        >
          <div class="text-center">
            <Icon name="lucide:loader-2" class="h-8 w-8 animate-spin text-primary-token mx-auto mb-4" />
            <h3 class="text-lg font-semibold mb-2">Loading More Releases</h3>
            <p class="text-muted-token">Fetching additional releases...</p>
          </div>
        </div>

        <div class="space-y-10">
          <div
            v-for="(release, index) in sortedFilteredReleases"
            :key="release.id"
            class="relative bg-surface border border-token rounded-dynamic shadow-sm p-5 sm:p-6 transition-colors"
          >
            <!-- Meta header -->
            <div class="mb-4">
              <div class="text-sm font-medium text-muted-token">
                {{ release.author || 'Unknown Author' }}
              </div>
              <div class="text-xs font-semibold tracking-wide text-primary-token">
                {{ formatReleaseDate(release.date) }}
              </div>
            </div>

            <!-- Title / badges -->
            <div class="flex flex-col sm:flex-row sm:items-start gap-4 mb-4">
              <div class="flex-1 space-y-2 min-w-0">
                <div class="flex flex-col sm:flex-row sm:items-center gap-2">
                  <h2 class="text-lg sm:text-xl font-bold hover:text-primary-token transition-colors break-words">
                    {{ release.title }}
                  </h2>
                  <div class="flex items-center gap-2">
                    <Badge variant="outline" class="w-fit">{{ release.tag }}</Badge>
                    <Badge
                      v-if="index === 0"
                      class="w-fit bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-300 dark:border-green-800"
                    >
                      Latest
                    </Badge>
                  </div>
                </div>
                <p class="text-muted-token leading-relaxed text-sm sm:text-base">
                  {{ release.description }}
                </p>
              </div>
            </div>

            <!-- Changelog -->
            <div
              :id="`changelog-${release.id}`"
              :class="[
                'relative transition-all',
                collapsedReleases[release.id] && shouldShowReadMore(release) ? 'max-h-60 overflow-hidden' : ''
              ]"
            >
              <div class="space-y-6">
                <template v-for="section in sections" :key="section.key">
                  <div v-if="release.changelog?.[section.key]?.length" class="space-y-2">
                    <h3 class="flex items-center gap-2 text-sm font-semibold">
                      <span class="text-base sm:text-lg">{{ section.icon }}</span>
                      {{ section.label }}
                    </h3>
                    <ul class="ms-4 sm:ms-6 space-y-1">
                      <li
                        v-for="(item, i) in release.changelog[section.key]"
                        :key="`${section.key}-${release.id}-${i}`"
                        class="text-xs sm:text-sm text-muted-token flex items-start gap-2"
                      >
                        <span class="text-muted-token mt-1.5 block w-1 h-1 rounded-full bg-current flex-shrink-0"/>
                        {{ item }}
                      </li>
                    </ul>
                  </div>
                </template>
              </div>

              <!-- Overlay -->
              <div
                v-if="collapsedReleases[release.id] && shouldShowReadMore(release)"
                class="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-bg to-bg/0"
              />
            </div>

            <!-- Read more -->
            <div
              v-if="shouldShowReadMore(release)"
              class="mt-5 flex justify-center"
            >
              <button
                class="text-xs sm:text-sm font-medium text-primary-token hover:underline inline-flex items-center gap-1"
                :aria-expanded="!collapsedReleases[release.id]"
                :aria-controls="`changelog-${release.id}`"
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

        <!-- Load more -->
        <div v-if="hasMoreReleases" class="flex justify-center pt-10">
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
        <div v-if="sortedFilteredReleases.length === 0" class="text-center py-16">
          <div class="rounded-full bg-surface border border-token p-4 w-16 h-16 mx-auto mb-4">
            <Icon name="lucide:package" class="h-8 w-8 text-muted-token" />
          </div>
            <h3 class="text-lg font-semibold mb-2">No releases found</h3>
            <p class="text-muted-token mb-4 text-sm sm:text-base">
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
import { allReleases as releasesSeed } from '@@/shared/pages'

definePageMeta({ title: 'Releases' })

const searchQuery = ref('')
const isLoading = ref(true)
const isLoadingMore = ref(false)
const displayedCount = ref(2)

const allReleases = ref([...releasesSeed])
const totalReleases = computed(() => allReleases.value.length)

const collapsedReleases = ref<Record<number, boolean>>({})
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

const toggleCollapse = (id: number) => {
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
  [...filteredReleases.value].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )
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
</script>
