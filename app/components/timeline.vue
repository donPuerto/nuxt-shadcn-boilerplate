<template>
  <nav aria-label="Timeline" :dir="resolvedDir" class="relative">
    <ol
      class="relative space-y-10 sm:space-y-12 before:absolute before:top-0 before:bottom-0 before:w-0.5 before:bg-border before:rounded-full"
      :class="resolvedDir === 'rtl'
        ? 'before:right-5 sm:before:right-6'
        : 'before:left-5 sm:before:left-6'"
      role="list"
    >
      <li
        v-for="(item, index) in items"
        :key="item.id"
        class="relative flex items-start gap-4"
        :class="[
          resolvedDir === 'rtl'
            ? 'pe-10 sm:pe-12 flex-row-reverse text-right'
            : 'ps-10 sm:ps-12'
        ]"
      >
        <!-- Node (absolutely positioned so its center aligns with the vertical line) -->
        <span
          class="absolute top-1 shrink-0 rounded-full ring-4 ring-background border-2 flex items-center justify-center
                 bg-primary/10 border-primary size-5 sm:size-6"
          :class="[
            nodeClass,
            resolvedDir === 'rtl'
              ? 'right-2.5 sm:right-3'
              : 'left-2.5 sm:left-3'
          ]"
        >
          <Icon :name="icon" class="w-2 h-2 sm:w-2.5 sm:h-2.5 text-primary" />
        </span>

        <!-- Body -->
        <div class="-mt-1 flex-1 min-w-0">
          <time
            v-if="showDate"
            class="block text-xs font-medium leading-none text-muted-foreground"
          >
            <slot name="date" :item="item" :index="index">
              {{ formatDate(item.date) }}
            </slot>
          </time>

          <div
            v-if="showAuthor && (item.author || $slots.author)"
            class="mt-1 text-[11px] font-medium uppercase tracking-wide text-muted-foreground"
          >
            <slot name="author" :item="item" :index="index">
              {{ item.author }}
            </slot>
          </div>

          <div class="mt-2">
            <slot :item="item" :index="index" />
          </div>
        </div>
      </li>
    </ol>
  </nav>
</template>

<script setup lang="ts">
import { formatDate } from '@@/shared'

interface TimelineItem {
  id: string | number
  date?: Date | string | number
  author?: string
  [key: string]: any
}

interface TimelineProps {
  items: TimelineItem[]
  icon?: string
  direction?: 'auto' | 'ltr' | 'rtl'
  showDate?: boolean
  showAuthor?: boolean
  nodeClass?: string
}

const props = withDefaults(defineProps<TimelineProps>(), {
  icon: 'lucide:calendar',
  direction: 'auto',
  showDate: true,
  showAuthor: true,
  nodeClass: ''
})

const resolvedDir = computed<'ltr' | 'rtl'>(() => {
  if (props.direction === 'auto') {
    if (import.meta.client) {
      return (document.documentElement.getAttribute('dir') as 'ltr' | 'rtl') || 'ltr'
    }
    return 'ltr'
  }
  return props.direction
})
</script>
