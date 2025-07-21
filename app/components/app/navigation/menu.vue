<template>
  <nav class="flex items-center space-x-6 text-sm font-medium">
    <NuxtLink
      v-for="item in visibleMainNav"
      :key="item.key"
      :to="item.to"
      class="transition-colors hover:text-foreground/80 text-foreground/60"
      active-class="text-foreground"
    >
      <div class="flex items-center space-x-2">
        <Icon v-if="item.icon" :name="getIconName(item.icon)" class="h-4 w-4" />
        <span>{{ getNavLabel(item.key) }}</span>
      </div>
    </NuxtLink>
  </nav>
</template>

<script setup lang="ts">
// Correct approach
const appConfig = useAppConfig()


// Get configs
const navigationConfig = computed(() => appConfig.navigation || null)

// State
const isAuthenticated = useState('user-authenticated', () => false)

// Computed navigation items
const visibleMainNav = computed(() => {
  if (!navigationConfig.value?.main) return []

  return navigationConfig.value.main
    .filter(item => item.showInNav && (!item.requiresAuth || isAuthenticated.value))
    .sort((a, b) => (a.order || 0) - (b.order || 0))
})

// Methods
function getNavLabel(key: string) {
  const labels: Record<string, string> = {
    home: 'Home',
    roadmap: 'Roadmap',
    dashboard: 'Dashboard',
    docs: 'Documentation'
  }
  return labels[key] || key
}

function getIconName(icon: string): string {
  // Clean icon mapping for main menu
  const iconMap: Record<string, string> = {
    'Home': 'lucide:home',
    'Map': 'lucide:map',
    'LayoutDashboard': 'lucide:layout-dashboard',
    'Book': 'lucide:book',
    'User': 'lucide:user',
    'Settings': 'lucide:settings',
    'home': 'lucide:home',
    'map': 'lucide:map',
    'layout-dashboard': 'lucide:layout-dashboard',
    'book': 'lucide:book',
    'user': 'lucide:user',
    'settings': 'lucide:settings'
  }

  return iconMap[icon] || `lucide:${icon.toLowerCase()}`
}
</script>