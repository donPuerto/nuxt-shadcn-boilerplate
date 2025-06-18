<!-- filepath: d:\Code\Nuxt\v4\LearnNuxt\nuxt-shadcn-boilerplate\app\components\dashboard\navigation\main.vue -->
<script setup lang="ts">
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { ChevronRight } from 'lucide-vue-next';

interface NavItem {
  title: string;
  url: string;
  icon: any;
  isActive?: boolean;
  items?: Array<{
    title: string;
    url: string;
  }>;
}

const props = defineProps<{
  items: NavItem[];
}>();
</script>

<template>
  <SidebarGroup>
    <SidebarGroupLabel>Platform</SidebarGroupLabel>
    <SidebarMenu>
      <Collapsible v-for="item in items" :key="item.title" as-child :default-open="item.isActive">
        <SidebarMenuItem>
          <SidebarMenuButton :as-child="!!item.items?.length" :is-active="item.isActive">
            <a v-if="!item.items?.length" :href="item.url">
              <component :is="item.icon" />
              <span>{{ item.title }}</span>
            </a>
            <CollapsibleTrigger v-else>
              <component :is="item.icon" />
              <span>{{ item.title }}</span>
              <ChevronRight class="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
            </CollapsibleTrigger>
          </SidebarMenuButton>
          <CollapsibleContent v-if="item.items?.length">
            <SidebarMenuSub>
              <SidebarMenuSubItem v-for="subItem in item.items" :key="subItem.title">
                <SidebarMenuSubButton as-child>
                  <a :href="subItem.url">
                    <span>{{ subItem.title }}</span>
                  </a>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
            </SidebarMenuSub>
          </CollapsibleContent>
        </SidebarMenuItem>
      </Collapsible>
    </SidebarMenu>
  </SidebarGroup>
</template>
