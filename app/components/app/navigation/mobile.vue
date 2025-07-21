<template>
  <Sheet>
    <SheetTrigger as-child>
      <Button variant="ghost" size="icon" class="mr-2 md:hidden">
        <Icon name="lucide:menu" class="h-[1.2rem] w-[1.2rem]" />
        <span class="sr-only">Toggle Menu</span>
      </Button>
    </SheetTrigger>
    <SheetContent side="left" class="pr-0">
      <SheetHeader>
        <SheetTitle>
          <div class="flex items-center space-x-2">
            <img v-if="appConfig?.brand?.logo" :src="appConfig.brand.logo" :alt="appConfig?.app?.name" class="h-6 w-6">
            <span class="font-bold">
              {{ appConfig?.app?.name || 'Nuxt Shadcn' }}
            </span>
          </div>
        </SheetTitle>
      </SheetHeader>

      <div class="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
        <div class="flex flex-col space-y-3">
          <!-- Mobile Navigation Links -->
          <div v-for="item in visibleMobileNav" :key="item.key">
            <div class="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground cursor-pointer">
              <Icon v-if="item.icon" :name="getIconName(item.icon)" class="mr-2 h-4 w-4" />
              {{ getNavLabel(item.key) }}
            </div>
          </div>
        </div>

        <!-- Mobile Icons -->
        <div class="mt-8 flex items-center space-x-4">
          <Button variant="ghost" size="icon">
            <Icon name="lucide:github" class="h-[1.2rem] w-[1.2rem]" />
            <span class="sr-only">GitHub</span>
          </Button>

          <Button variant="ghost" size="icon">
            <Icon name="lucide:twitter" class="h-[1.2rem] w-[1.2rem]" />
            <span class="sr-only">Twitter</span>
          </Button>

          <Button variant="ghost" size="icon" @click="toggleTheme">
            <Icon name="lucide:sun" class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Icon name="lucide:moon" class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span class="sr-only">Toggle theme</span>
          </Button>
        </div>
      </div>
    </SheetContent>
  </Sheet>
</template>

<script setup lang="ts">
// Correct approach
const appConfig = useAppConfig()

// Get configs
const navigationConfig = computed(() => appConfig.navigation || null)

// State
const isAuthenticated = useState('user-authenticated', () => false)

// Computed navigation items
const visibleMobileNav = computed(() => {
  if (!navigationConfig.value?.main) return []

  return navigationConfig.value.main
    .filter(item => item.showInMobile && (!item.requiresAuth || isAuthenticated.value))
    .sort((a, b) => (a.order || 0) - (b.order || 0))
})

// Methods
function toggleTheme() {
  console.log('Toggle theme')
}

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
  // Clean icon mapping for mobile navigation
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