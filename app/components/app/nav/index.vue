<!-- filepath: d:\Code\Nuxt\v4\LearnNuxt\nuxt-shadcn-boilerplate-next\app\components\app\nav\index.vue -->
<script setup lang="ts">
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

// Define props with default values
interface NavProps {
  logoWidth?: string | number
  logoHeight?: string | number
  logoSrc?: string
  brandName?: string
  showBrand?: boolean
}

const props = withDefaults(defineProps<NavProps>(), {
  logoWidth: '32',
  logoHeight: '32',
  logoSrc: '/logo.png',
  brandName: 'Don Puerto',
  showBrand: true
})

// Mobile sheet state
const isMobileMenuOpen = ref(false)

// REMOVE old 'components' demo array and pull items from app config
const appConfig = useAppConfig()
const navItems = computed(() => appConfig.navigation.items)
</script>

<template>
  <nav class="h-16 sm:h-20 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
    <div class="w-full h-full flex items-center justify-between gap-4">

      <!-- Mobile Menu -->
      <AppNavMobileNav v-model:open="isMobileMenuOpen" />
      
      <!-- Left Section - Logo -->
      <div class="flex items-center gap-3">
        <AppLogo 
          :width="props.logoWidth"
          :height="props.logoHeight"
          :img-src="props.logoSrc"
        />
        <!-- Hide brand name on small screens, show on sm and up -->
        <span v-if="props.showBrand" class="hidden sm:block font-semibold text-lg">
          {{ props.brandName }}
        </span>
      </div>

      <!-- Middle Section - Navigation (Desktop only) -->
      <div class="hidden lg:flex flex-1 justify-center min-w-0">
        <NavigationMenu>
          <NavigationMenuList>
            <!-- Simplified route-driven navigation -->
            <NavigationMenuItem
              v-for="item in navItems"
              :key="item.href"
            >
              <NavigationMenuLink
                :href="item.href"
                :class="navigationMenuTriggerStyle()"
              >
                {{ item.title }}
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      <!-- Right Section -->
      <div class="flex items-center gap-4 flex-shrink-0">
        <!-- Theme Toggle -->
        <CommonThemeToggle />
        
        <!-- Discord Icon (Hidden on mobile) -->
        <Icon 
          name="radix-icons:discord-logo"
          class="hidden sm:block w-5 h-5 cursor-pointer hover:text-primary transition-colors"
        />

       
      </div>
    </div>
  </nav>
</template>
