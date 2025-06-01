<!-- pages/dashboard/index.vue -->
<template>
  <SidebarProvider>
    <DashboardSidebarDefault />
    <SidebarInset>
      <DashboardHeaderDefault 
        parent-page="Building Your Application" 
        current-page="Data Fetching" 
      />
      <div class="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div class="grid auto-rows-min gap-4 md:grid-cols-3">
          <div class="aspect-video rounded-xl bg-muted/50" />
          <div class="aspect-video rounded-xl bg-muted/50" />
          <div class="aspect-video rounded-xl bg-muted/50" />
        </div>
        <div class="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
      </div>
      <DashboardFooterDefault />
    </SidebarInset>
    <DashboardRightSidebarDefault />
  </SidebarProvider>
</template>

<script setup lang="ts">
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import DashboardSidebarDefault from '@/components/dashboard/sidebar/default.vue';
import DashboardHeaderDefault from '@/components/dashboard/header/default.vue';
import DashboardFooterDefault from '@/components/dashboard/footer/default.vue';
import DashboardRightSidebarDefault from '@/components/dashboard/right-sidebar/default.vue';

definePageMeta({
  layout: 'dashboard',
});

// Description for documentation
defineExpose({
  description: 'A sidebar that collapses to icons.',
  iframeHeight: '800px',
  containerClass: 'w-full h-full'
});
</script>
