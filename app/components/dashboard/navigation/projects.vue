<!-- components/dashboard/navigation/projects.vue -->
<template>
  <SidebarGroup>
    <SidebarGroupLabel>Projects</SidebarGroupLabel>
    <SidebarMenu>
      <SidebarMenuItem v-for="project in projects" :key="project.name">
        <SidebarMenuButton as-child>
          <a :href="project.url" class="flex items-center gap-2">
            <component :is="project.icon" class="size-5" />
            <span>{{ project.name }}</span>
          </a>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  </SidebarGroup>
</template>

<script setup lang="ts">
import type { LucideIcon } from 'lucide-vue-next';
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
    icon: LucideIcon;
  }[];
}>();
</script>
