<!-- filepath: d:\Code\Nuxt\v4\LearnNuxt\nuxt-shadcn-boilerplate-next\app\components\ui\visuallyHidden.vue -->
<script setup lang="ts">
import { VisuallyHidden as VisuallyHiddenPrimitive } from 'radix-vue'

interface VisuallyHiddenProps {
  asChild?: boolean
}

defineProps<VisuallyHiddenProps>()
</script>

<template>
  <VisuallyHiddenPrimitive v-bind="$props">
    <slot />
  </VisuallyHiddenPrimitive>
</template>
