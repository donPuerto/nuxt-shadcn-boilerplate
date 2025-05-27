<!-- components/dashboard/sidebar/default.vue -->
<template>
  <aside
:class="[
    'w-64 border-r bg-background transition-all',
    'fixed inset-y-0 left-0 z-50 md:static',
    isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
  ]">
    <div class="flex flex-col h-full">
      <!-- Mobile Close Button -->
      <div class="flex justify-between items-center p-4 md:hidden">
        <div class="flex items-center gap-2">
          <AppNavigationLogo />
          <span class="font-bold text-xl">Menu</span>
        </div>
        <Button variant="ghost" size="icon" @click="closeMobileSidebar">
          <i class="i-lucide-x h-5 w-5" />
        </Button>
      </div>
      
      <!-- Sidebar Content -->
      <div class="p-4 flex-1 overflow-auto">
        <nav class="space-y-6">
          <!-- Main Navigation -->
          <div>
            <div class="text-xs font-semibold text-muted-foreground mb-2">DASHBOARD</div>
            <div class="space-y-1">
              <Button
v-for="item in mainNavItems" :key="item.label" 
                      variant="ghost" 
                      class="w-full justify-start" 
                      :class="{ 'bg-muted': isActive(item.to) }"
                      as-child>
                <NuxtLink :to="item.to" class="flex items-center gap-3">
                  <i :class="`${item.icon} h-5 w-5`" />
                  <span>{{ item.label }}</span>
                </NuxtLink>
              </Button>
            </div>
          </div>
          
          <Separator />
          
          <!-- Account Section -->
          <div>
            <div class="text-xs font-semibold text-muted-foreground mb-2">ACCOUNT</div>
            <div class="space-y-1">
              <Button
v-for="item in accountNavItems" :key="item.label" 
                      variant="ghost" 
                      class="w-full justify-start" 
                      :class="{ 'bg-muted': isActive(item.to) }"
                      as-child>
                <NuxtLink :to="item.to" class="flex items-center gap-3">
                  <i :class="`${item.icon} h-5 w-5`" />
                  <span>{{ item.label }}</span>
                </NuxtLink>
              </Button>
            </div>
          </div>
        </nav>
      </div>
      
      <!-- User Info at Bottom -->
      <div class="border-t p-4">
        <div class="flex items-center gap-3">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>UN</AvatarFallback>
          </Avatar>
          <div>
            <p class="text-sm font-medium">User Name</p>
            <p class="text-xs text-muted-foreground">user@example.com</p>
          </div>
        </div>
      </div>
    </div>
  </aside>
  
  <!-- Mobile Sidebar Backdrop -->
  <div 
    v-if="isMobileOpen" 
    class="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden"
    @click="closeMobileSidebar"
  />
</template>

<script setup>
const route = useRoute();
const isMobileOpen = ref(false);

// Main navigation items
const mainNavItems = [
  { label: 'Overview', to: '/dashboard', icon: 'i-lucide-layout-dashboard' },
  { label: 'Analytics', to: '/dashboard/analytics', icon: 'i-lucide-bar-chart-2' },
  { label: 'Projects', to: '/dashboard/projects', icon: 'i-lucide-folder' },
  { label: 'Tasks', to: '/dashboard/tasks', icon: 'i-lucide-check-square' },
];

// Account related navigation items
const accountNavItems = [
  { label: 'Profile', to: '/dashboard/profile', icon: 'i-lucide-user' },
  { label: 'Settings', to: '/dashboard/settings', icon: 'i-lucide-settings' },
  { label: 'Help', to: '/dashboard/help', icon: 'i-lucide-help-circle' },
];

function isActive(path) {
  return route.path === path || route.path.startsWith(`${path}/`);
}

function toggleSidebar() {
  isMobileOpen.value = !isMobileOpen.value;
}

function closeMobileSidebar() {
  isMobileOpen.value = false;
}

// Expose methods for parent components
defineExpose({ toggleSidebar });
</script>
