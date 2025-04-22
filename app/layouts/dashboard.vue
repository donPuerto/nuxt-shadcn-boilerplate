<template>
  <SidebarProvider :default-open="defaultOpen">
    <slot />
  </SidebarProvider>
</template>

<script setup lang="ts">
import { Separator } from '@/components/ui/separator'
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar'

const defaultOpen = useCookie<boolean>('sidebar_state')
</script>

<style scoped>

</style>
