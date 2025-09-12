<template>
  <!-- LAYOUT PARTICIPANT: flex column with animated width -->
  <div class="relative h-full flex">
    <!-- Sliding panel (participates in layout width) -->
    <div
      class="h-full transition-[width] duration-300 overflow-hidden border-l bg-background/95 backdrop-blur flex flex-col"
      :class="props.open ? 'w-72' : 'w-0 border-l-transparent'"
      aria-label="Right sidebar panel"
      :aria-hidden="!props.open"
    >
      <div class="flex items-center justify-between px-4 h-12 border-b">
        <h3 class="text-sm font-medium">Panel</h3>
        <button
          class="text-xs px-2 py-1 rounded-md hover:bg-accent transition"
          aria-label="Close panel"
          @click="close"
        >
          Close
        </button>
      </div>
      <div class="p-4 space-y-5 overflow-y-auto text-sm flex-1">
        <section>
          <h4 class="font-semibold mb-2 text-xs uppercase tracking-wide text-muted-foreground">
            Insights
          </h4>
          <p class="text-muted-foreground leading-relaxed">
            Use this space for contextual analytics or helper widgets.
          </p>
        </section>
        <section class="space-y-2">
            <h4 class="font-semibold mb-1 text-xs uppercase tracking-wide text-muted-foreground">
              Quick Actions
            </h4>
            <button class="w-full text-left px-3 py-2 rounded-md border hover:bg-accent text-xs transition">
              Refresh Data
            </button>
            <button class="w-full text-left px-3 py-2 rounded-md border hover:bg-accent text-xs transition">
              Export
            </button>
        </section>
      </div>
    </div>

    <!-- Centered toggle handle (always visible) -->
    <button
      class="fixed top-1/2 -translate-y-1/2 z-50 rounded-l-md border border-r-0 bg-background/90 backdrop-blur px-2 py-2 shadow-sm hover:bg-accent transition flex items-center justify-center"
      :style="{ right: props.open ? '18rem' : '0' }"
      :aria-expanded="props.open"
      aria-controls="right-sidebar"
      @click="toggle"
    >
      <Icon
        :name="props.open ? 'lucide:panel-right-close' : 'lucide:panel-right-open'"
        class="h-4 w-4"
      />
      <span class="sr-only">Toggle right sidebar</span>
    </button>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{ open: boolean }>(), { open: false })
const emit = defineEmits<{ 'update:open': [boolean] }>()
const toggle = () => emit('update:open', !props.open)
const close = () => emit('update:open', false)
</script>

