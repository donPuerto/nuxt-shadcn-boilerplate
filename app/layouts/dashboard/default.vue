<!-- layouts/dashboard/default.vue -->
<template>
  <div class="min-h-screen flex flex-col">
    <!-- Default Header -->
    <slot name="header">
      <DashboardHeaderDefault />
    </slot>
    
    <div class="flex-1 flex">
      <!-- Default Sidebar -->
      <slot name="sidebar">
        <DashboardSidebarDefault />
      </slot>
      
      <!-- Main Content Area -->
      <main class="flex-1 p-6 overflow-auto">
        <slot />
      </main>
      
      <!-- Optional Right Sidebar -->
      <slot name="right-sidebar"/>
    </div>
    
    <!-- Default Footer -->
    <slot name="footer">
      <DashboardFooterDefault />
    </slot>
  </div>
</template>

<script setup>
// Reference to sidebar for mobile toggle functionality
const sidebarRef = ref(null);

function toggleSidebar() {
  if (sidebarRef.value && typeof sidebarRef.value.toggleSidebar === 'function') {
    sidebarRef.value.toggleSidebar();
  }
}
</script>
