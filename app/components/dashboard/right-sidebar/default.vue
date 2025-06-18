<!-- filepath: d:\Code\Nuxt\v4\LearnNuxt\nuxt-shadcn-boilerplate\app\components\dashboard\right-sidebar\default.vue -->
<script setup lang="ts">
import { X } from 'lucide-vue-next';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from '@/components/ui/sheet';

const emit = defineEmits(['close']);

// Get config from app.config.ts
const appConfig = useAppConfig();
const rightWidth = appConfig.dashboard?.sidebar?.rightWidth || '320px';
</script>

<template>
  <!-- Desktop: Fixed sidebar -->
  <div
    class="fixed top-0 right-0 h-screen bg-background border-l border-border z-40 flex flex-col"
    :style="{ width: rightWidth }"
  >
    <div class="flex items-center justify-between p-4 border-b">
      <h2 class="text-lg font-semibold">Right Sidebar</h2>
      <Button variant="ghost" size="icon" @click="emit('close')">
        <X class="h-4 w-4" />
        <span class="sr-only">Close</span>
      </Button>
    </div>
    
    <div class="p-4 flex-1 overflow-y-auto space-y-4">
      <div class="rounded-lg border p-4">
        <h3 class="text-sm font-medium">Quick Actions</h3>
        <p class="mt-1 text-xs text-muted-foreground">Access frequently used features.</p>
      </div>
      
      <div class="rounded-lg border p-4">
        <h3 class="text-sm font-medium">Recent Activity</h3>
        <p class="mt-1 text-xs text-muted-foreground">Your latest updates and changes.</p>
      </div>
      
      <div class="rounded-lg border p-4">
        <h3 class="text-sm font-medium">Settings</h3>
        <p class="mt-1 text-xs text-muted-foreground">Configure your preferences.</p>
      </div>
      
      <div class="rounded-lg border p-4">
        <h3 class="text-sm font-medium">Help & Support</h3>
        <p class="mt-1 text-xs text-muted-foreground">Get assistance when you need it.</p>
      </div>
    </div>
  </div>
</template>
