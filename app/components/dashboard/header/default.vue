<!-- filepath: d:\Code\Nuxt\v4\LearnNuxt\nuxt-shadcn-boilerplate\app\components\dashboard\header\default.vue -->
<template>
  <header class="dashboard-header sticky top-0 flex h-16 shrink-0 items-center gap-2 border-b bg-background px-4">
    <!-- Left side with trigger and breadcrumb -->
    <div class="flex items-center gap-2">
      <SidebarTrigger class="flex h-9 w-9 items-center justify-center" />
      <Separator orientation="vertical" class="mx-2 h-4" />
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem class="hidden md:block">
            <BreadcrumbLink href="#" class="text-sm">
              {{ parentPage }}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator class="hidden md:block" />
          <BreadcrumbItem>
            <BreadcrumbPage class="text-sm">{{ currentPage }}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>

    <!-- Right side actions -->
    <div class="ml-auto flex items-center gap-2">
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
        @click="$emit('toggle-right-sidebar')"
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
</template>

<script setup lang="ts">
import { Bell, LogOut, PanelRight, Settings, User } from 'lucide-vue-next';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { 
  Breadcrumb, 
  BreadcrumbItem, 
  BreadcrumbLink, 
  BreadcrumbList, 
  BreadcrumbPage, 
  BreadcrumbSeparator 
} from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

// TypeScript-style props definition with defaults
const props = withDefaults(defineProps<{
  parentPage?: string;
  currentPage?: string;
  rightSidebarVisible?: boolean;
}>(), {
  parentPage: 'Building Your Application',
  currentPage: 'Dashboard',
  rightSidebarVisible: false
});

// Define emits
defineEmits(['toggle-right-sidebar']);
</script>

<style scoped>
/* Make the header trigger properly align with breadcrumb */
[data-sidebar-trigger] {
  margin-left: -0.5rem;
  height: 2.25rem !important;
  width: 2.25rem !important;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Ensure consistent icon sizing */
[data-sidebar-trigger] svg {
  height: 1rem;
  width: 1rem;
}

/* Fix breadcrumb alignment */
:deep(.breadcrumb-list) {
  display: flex;
  align-items: center;
  height: 2.25rem;
}

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
</style>
