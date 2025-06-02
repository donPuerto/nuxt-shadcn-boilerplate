<!-- filepath: d:\Code\Nuxt\v4\LearnNuxt\nuxt-shadcn-boilerplate\app\components\dashboard\navigation\projects.vue -->
<template>
  <SidebarGroup>
    <SidebarGroupLabel class="flex items-center justify-between">
      <span class="sidebar-text">Projects</span>
      <Button variant="ghost" size="icon" class="mr-1.5 h-4 w-4">
        <Plus class="h-4 w-4" />
        <span class="sr-only">Add project</span>
      </Button>
    </SidebarGroupLabel>
    <SidebarMenu>
      <SidebarMenuItem v-for="project in projects" :key="project.name">
        <SidebarMenuButton as-child :tooltip="project.name">
          <a :href="project.url">
            <component :is="project.icon" v-if="project.icon" />
            <span class="sidebar-text">{{ project.name }}</span>
          </a>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  </SidebarGroup>
</template>

<script setup lang="ts">
import { Plus, type LucideIcon } from 'lucide-vue-next';
import { Button } from '@/components/ui/button';
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

defineProps<{
  projects: {
    name: string;
    url: string;
    icon?: LucideIcon;
  }[];
}>();
</script>

<style scoped>
/* Hide text when sidebar is collapsed */
[data-sidebar="sidebar"][data-collapsible="icon"] .sidebar-text {
  display: none !important;
}

/* Center button when collapsed */
[data-sidebar="sidebar"][data-collapsible="icon"] [data-sidebar-menu-button] {
  justify-content: center !important;
  padding: 0.5rem !important;
}
</style>
