<!-- app.vue -->
<script lang="ts" setup>
import { Toaster } from '@/components/ui/sonner'
const activeTheme = useCookie<string>('active_theme', { readonly: true })
const isScaled = computed(() => !!activeTheme.value?.endsWith('-scaled'))

// Add manual fix for sidebar toggle when the app loads
onMounted(() => {
  nextTick(() => {
    // Wait a bit for components to be fully rendered
    setTimeout(() => {
      // Fix sidebar toggle functionality
      const sidebarTriggers = document.querySelectorAll('[data-sidebar-trigger]');
      sidebarTriggers.forEach(trigger => {
        trigger.style.cursor = 'pointer';
        
        // Enhance click handler
        trigger.addEventListener('click', () => {
          const sidebar = document.querySelector('[data-sidebar="sidebar"]');
          if (sidebar) {
            const currentState = sidebar.getAttribute('data-collapsible');
            const newState = currentState === 'icon' ? 'full' : 'icon';
            sidebar.setAttribute('data-collapsible', newState);
            
            // Update inset margin
            const inset = document.querySelector('[data-sidebar="inset"]');
            if (inset) {
              inset.setAttribute('data-collapsible', newState);
            }
          }
        });
      });

      // Ensure sidebar is visible
      const sidebar = document.querySelector('[data-sidebar="sidebar"]');
      if (sidebar) {
        sidebar.style.display = 'flex';
        sidebar.style.visibility = 'visible';
      }
    }, 200);
  });
});
</script>

<template>
  <Body
    class="bg-background overscroll-none font-sans antialiased"
    :class="[
      activeTheme ? `theme-${activeTheme}` : '',
      isScaled ? 'theme-scaled' : '',
    ]"
  >
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <Toaster />
  </Body>
</template>

<style>

</style>
