<!-- components/dashboard/right-sidebar/default.vue -->
<template>
  <Sidebar
    class="sticky hidden lg:flex top-0 h-svh border-l"
    collapsible="none"
  >
    <SidebarHeader class="h-16 border-b border-sidebar-border">
      <div class="flex items-center justify-between gap-2 p-2">
        <div class="flex items-center gap-2">
          <Avatar>
            <AvatarImage :src="user.avatar" alt="" />
            <AvatarFallback>{{ user.name.charAt(0).toUpperCase() }}</AvatarFallback>
          </Avatar>
          <div class="flex flex-col text-sm">
            <div class="font-medium">{{ user.name }}</div>
            <div class="text-xs text-muted-foreground">{{ user.email }}</div>
          </div>
        </div>
        <Button variant="ghost" size="icon" @click="$emit('close')">
          <X class="h-4 w-4" />
          <span class="sr-only">Close</span>
        </Button>
      </div>
    </SidebarHeader>
    <SidebarContent>
      <div class="p-4">
        <Calendar />
      </div>
      <SidebarSeparator class="mx-0" />
      <div class="px-4 py-2">
        <div v-for="calendar in calendars" :key="calendar.name" class="mb-4">
          <h3 class="text-sm font-medium mb-2">{{ calendar.name }}</h3>
          <div class="space-y-1">
            <div v-for="item in calendar.items" :key="item" class="flex items-center">
              <Checkbox :id="`calendar-${item}`" />
              <label
                :for="`calendar-${item}`"
                class="ml-2 text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {{ item }}
              </label>
            </div>
          </div>
        </div>
      </div>
    </SidebarContent>
    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton>
            <PlusIcon class="mr-2" />
            <span>New Calendar</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  </Sidebar>
</template>

<script setup lang="ts">
import { MoreVertical, Plus as PlusIcon, X } from 'lucide-vue-next';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import { Calendar } from '@/components/ui/calendar';
import { Checkbox } from '@/components/ui/checkbox';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

defineProps<{
  visible: boolean;
}>();

defineEmits(['close']);

// User data
const user = {
  name: 'shadcn',
  email: 'm@example.com',
  avatar: '/avatars/shadcn.jpg',
};

// Calendar data
const calendars = [
  {
    name: 'My Calendars',
    items: ['Personal', 'Work', 'Family'],
  },
  {
    name: 'Favorites',
    items: ['Holidays', 'Birthdays'],
  },
  {
    name: 'Other',
    items: ['Travel', 'Reminders', 'Deadlines'],
  },
];
</script>
