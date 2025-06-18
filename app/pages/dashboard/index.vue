<!-- filepath: d:\Code\Nuxt\v4\LearnNuxt\nuxt-shadcn-boilerplate\app\pages\dashboard\index.vue -->
<script setup lang="ts">
import { ref } from 'vue';
import { PanelRight } from 'lucide-vue-next';
import DashboardSidebarDefault from '@/components/dashboard/sidebar/default.vue';
import DashboardRightSidebarDefault from '@/components/dashboard/right-sidebar/default.vue';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';

// Get dashboard config from app.config.ts
const appConfig = useAppConfig();
const dashboardConfig = appConfig.dashboard || {};

// Right sidebar state
const rightSidebarOpen = ref(false);

definePageMeta({
  layout: 'dashboard',
});

useHead({
  title: dashboardConfig.description || 'Dashboard',
});
</script>

<template>
  <SidebarProvider>
    <DashboardSidebarDefault />
    <SidebarInset>
      <header class="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div class="flex items-center gap-2 px-4">
          <SidebarTrigger class="-ml-1" />
          <Separator orientation="vertical" class="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem class="hidden md:block">
                <BreadcrumbLink href="#">
                  Building Your Application
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator class="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Data Fetching</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        
        <!-- Right Sidebar Toggle -->
        <div class="ml-auto px-4">
          <Button
            variant="outline"
            size="icon"
            class="h-9 w-9"
            @click="rightSidebarOpen = !rightSidebarOpen"
          >
            <PanelRight class="h-4 w-4" />
            <span class="sr-only">Toggle right sidebar</span>
          </Button>
        </div>
      </header>
      
      <!-- Main Content -->
      <div class="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div class="grid auto-rows-min gap-4 md:grid-cols-3">
          <div class="aspect-video rounded-xl bg-muted/50" />
          <div class="aspect-video rounded-xl bg-muted/50" />
          <div class="aspect-video rounded-xl bg-muted/50" />
        </div>
        <div class="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
      </div>
    </SidebarInset>
    
    <!-- Right Sidebar -->
    <DashboardRightSidebarDefault 
      v-if="rightSidebarOpen"
      @close="rightSidebarOpen = false"
    />
  </SidebarProvider>
</template>
