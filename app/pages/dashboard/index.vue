<!-- filepath: d:\Code\Nuxt\v4\LearnNuxt\nuxt-shadcn-boilerplate\app\pages\dashboard\index.vue -->
<template>
  <ClientOnly>
    <SidebarProvider
      class="sidebar-provider-client-only"
      :style="{
        '--sidebar-width': '280px',
        '--sidebar-width-icon': '48px',
      }"
    >
      <DashboardSidebarDefault />
      <SidebarInset>
        <header class="flex h-16 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div class="flex items-center gap-2 px-4">
            <SidebarTrigger class="-ml-1" />
            <!-- Use the shadcn Separator component with increased visibility -->
            <Separator orientation="vertical" class="mx-2 h-5 opacity-80" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem class="hidden md:block">
                  <BreadcrumbLink href="#">
                    {{ parentPage }}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator class="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>{{ currentPage }}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          
          <!-- Right side actions -->
          <div class="ml-auto flex items-center gap-2 px-4">
            <Button variant="outline" size="icon" class="h-8 w-8">
              <Bell class="h-4 w-4" />
              <span class="sr-only">Notifications</span>
            </Button>
            
            <!-- Right Sidebar Toggle Button -->
            <Button 
              variant="outline" 
              size="icon"
              class="h-8 w-8"
              :class="{ 'bg-muted': rightSidebarVisible }"
              @click="toggleRightSidebar"
            >
              <PanelRight class="h-4 w-4" />
              <span class="sr-only">Toggle right panel</span>
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger as-child>
                <Button variant="ghost" class="relative h-8 w-8 rounded-full">
                  <Avatar class="h-8 w-8">
                    <AvatarImage src="/avatars/shadcn.jpg" />
                    <AvatarFallback>UN</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" class="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User class="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings class="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut class="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        
        <!-- Fix content overlap by adding proper spacing -->
        <div class="flex flex-1 flex-col gap-4 p-4 pt-4 overflow-y-auto">
          <div class="grid auto-rows-min gap-4 md:grid-cols-3">
            <div class="aspect-video rounded-xl bg-muted/50" />
            <div class="aspect-video rounded-xl bg-muted/50" />
            <div class="aspect-video rounded-xl bg-muted/50" />
          </div>
          <div class="min-h-[60vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
        </div>
        <DashboardFooterDefault />
      </SidebarInset>
      <DashboardRightSidebarDefault 
        :visible="rightSidebarVisible" 
        @close="rightSidebarVisible = false"
      />
    </SidebarProvider>
    
    <template #fallback>
      <div class="flex min-h-screen items-center justify-center">
        <div class="text-center">
          <div class="mb-4 text-3xl font-bold">Loading Dashboard...</div>
          <div class="text-muted-foreground">Please wait while we set up your workspace</div>
        </div>
      </div>
    </template>
  </ClientOnly>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Bell, LogOut, PanelRight, Settings, User } from 'lucide-vue-next';
import { 
  SidebarProvider, 
  SidebarInset, 
  SidebarTrigger 
} from '@/components/ui/sidebar';
import { 
  Breadcrumb, 
  BreadcrumbItem, 
  BreadcrumbLink, 
  BreadcrumbList, 
  BreadcrumbPage, 
  BreadcrumbSeparator 
} from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import DashboardSidebarDefault from '@/components/dashboard/sidebar/default.vue';
import DashboardFooterDefault from '@/components/dashboard/footer/default.vue';
import DashboardRightSidebarDefault from '@/components/dashboard/right-sidebar/default.vue';

definePageMeta({
  layout: 'dashboard',
});

// State for right sidebar visibility
const rightSidebarVisible = ref(false);

// Page info
const parentPage = 'Building Your Application';
const currentPage = 'Data Fetching';

// Toggle function for right sidebar
const toggleRightSidebar = () => {
  rightSidebarVisible.value = !rightSidebarVisible.value;
};

// Description for documentation
defineExpose({
  description: 'Dashboard with collapsible sidebars.',
  iframeHeight: '800px',
  containerClass: 'w-full h-full'
});
</script>

<style scoped>
/* Consistent button sizes on the right */
.h-8.w-8 {
  height: 2rem !important;
  width: 2rem !important;
}

/* Adjust icon sizes to be consistent */
.h-8.w-8 svg,
.h-4.w-4 {
  height: 1rem !important;
  width: 1rem !important;
}

/* Make the separator more visible */
:deep(.separator[data-orientation="vertical"]) {
  background-color: var(--border) !important;
  opacity: 0.8 !important;
  height: 20px !important;
  margin: 0 8px !important;
}
</style>
