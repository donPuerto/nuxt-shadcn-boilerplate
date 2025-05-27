<template>
  <div class="min-h-screen flex flex-col">
    <!-- Top Navigation/Header -->
    <DashboardsUserHeader />
    
    <div class="flex-1 flex">
      <!-- Left Sidebar -->
      <DashboardsUserSidebar />
      
      <!-- Main Content Area -->
      <main class="flex-1 p-6 overflow-auto">
        <slot />
      </main>
      
      <!-- Right Sidebar (optional) -->
      <DashboardsUserRightSidebar v-if="showRightSidebar" />
    </div>
  </div>
</template>

<script setup lang="ts">
// Control right sidebar visibility
const showRightSidebar = defineModel<boolean>('showRightSidebar', { default: false });
</script>
