<template>
  <div class="flex flex-1 justify-center">
    <NavigationMenu class="hidden md:flex">
      <NavigationMenuList>
        <NavigationMenuItem v-for="item in visibleMainNav" :key="item.key">
          <NavigationMenuTrigger v-if="item.children" class="text-sm font-medium">
            <Icon v-if="item.icon" :name="`lucide:${getIconName(item.icon)}`" class="mr-2 h-4 w-4" />
            {{ getNavLabel(item.key) }}
          </NavigationMenuTrigger>
          <NavigationMenuLink v-else
            class="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50 cursor-pointer">
            <Icon v-if="item.icon" :name="`lucide:${getIconName(item.icon)}`" class="mr-2 h-4 w-4" />
            {{ getNavLabel(item.key) }}
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  </div>
</template>

<script setup lang="ts">
const { $config } = useNuxtApp()
const { getNavIcon } = useIcons()

// Get navigation config
const navigationConfig = computed(() => $config?.shared?.navigation || null)
const iconsConfig = computed(() => $config?.shared?.icons || null)

// State
const isAuthenticated = useState('user-authenticated', () => false)

// Computed navigation items
const visibleMainNav = computed(() => {
  if (!navigationConfig.value?.main) return []

  return navigationConfig.value.main
    .filter(item => !item.requiresAuth || isAuthenticated.value)
    .sort((a, b) => (a.order || 0) - (b.order || 0))
})

// Methods
function getNavLabel(key: string) {
  const labels: Record<string, string> = {
    home: 'Home',
    roadmap: 'Roadmap',
    dashboard: 'Dashboard',
    docs: 'Documentation',
    profile: 'Profile',
    settings: 'Settings',
    billing: 'Billing',
    logout: 'Sign Out',
    login: 'Sign In',
    register: 'Sign Up'
  }
  return labels[key] || key
}

function getIconName(icon: string): string {
  if (!iconsConfig.value) {
    const fallbackMap: Record<string, string> = {
      'Home': 'home',
      'Map': 'map',
      'LayoutDashboard': 'layout-dashboard',
      'Book': 'book',
      'Menu': 'menu'
    }
    return fallbackMap[icon] || icon.toLowerCase()
  }

  // Try to find icon in config
  if (iconsConfig.value.iconMappings?.[icon]) {
    const [category, iconName] = iconsConfig.value.iconMappings[icon].split('.')
    return iconsConfig.value[category]?.[iconName] || icon.toLowerCase()
  }

  const navIcon = iconsConfig.value.navigation?.[icon.toLowerCase()]
  if (navIcon) return navIcon

  for (const category of Object.values(iconsConfig.value)) {
    if (typeof category === 'object' && category[icon.toLowerCase()]) {
      return category[icon.toLowerCase()]
    }
  }

  return icon.toLowerCase()
}
</script>
