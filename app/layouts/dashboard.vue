<template>
  <SidebarProvider>
    <AppSidebar />
    <!-- CHANGED: Wrap main content + right sidebar in flex -->
    <div class="flex flex-1">
      <SidebarInset class="flex-1 min-w-0">
        <!-- ...existing slot & content... -->
        <slot />
        <Footer />
        <BackToTop />
      </SidebarInset>
      <!-- CHANGED: RightSidebar now participates in layout width -->
      <RightSidebar v-model:open="rightOpen" />
    </div>
  </SidebarProvider>
</template>

<script setup lang="ts">
import AppSidebar from "@/components/dashboards/personal/AppSidebar.vue"
import {
  SidebarProvider,
  SidebarInset,
} from "@/components/ui/sidebar"
import RightSidebar from "@/components/dashboards/personal/RightSidebar.vue"
import BackToTop from "@/components/common/BackToTop.vue"


import Footer from "@/components/dashboards/personal/Footer.vue"

const rightOpen = ref(false)
</script>

