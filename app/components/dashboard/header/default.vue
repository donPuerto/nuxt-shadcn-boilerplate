<!-- filepath: d:\Code\Nuxt\v4\LearnNuxt\nuxt-shadcn-boilerplate\app\components\dashboard\header\default.vue -->
<script setup lang="ts">
import { Bell, Settings, User } from 'lucide-vue-next';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

// Get config from app.config.ts
const appConfig = useAppConfig();
const dashboardConfig = appConfig.dashboard || {};
</script>

<template>
  <header class="flex h-16 shrink-0 items-center justify-between px-4 border-b">
    <div class="flex items-center gap-4">
      <h1 class="text-lg font-semibold">{{ dashboardConfig.description || 'Dashboard' }}</h1>
    </div>
    
    <div class="flex items-center gap-2">
      <Button variant="outline" size="icon" class="h-9 w-9">
        <Bell class="h-4 w-4" />
        <span class="sr-only">Notifications</span>
      </Button>
      
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <Button variant="ghost" class="relative h-9 w-9 rounded-full p-0">
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
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  </header>
</template>
