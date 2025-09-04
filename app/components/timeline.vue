<template>
  <nav aria-label="Timeline" class="relative">
    <div
      v-if="showLine"
      class="absolute left-6 sm:left-32 sm:ml-4 lg:ml-6 top-0 bottom-0 w-0.5"
      :class="lineClass"
    />

    <div class="space-y-8 sm:space-y-10">
      <div
        v-for="(item, index) in items"
        :key="item.id"
        class="relative flex items-start"
      >
        <div
          class="absolute left-4 sm:left-32 sm:ml-2 lg:ml-4 w-5 h-5 sm:w-6 sm:h-6 bg-primary/10 rounded-full ring-4 sm:ring-8 ring-background border-2 border-primary flex items-center justify-center z-10"
        >
          <Icon :name="icon" class="w-2 h-2 sm:w-2.5 sm:h-2.5 text-primary" />
        </div>

        <!-- Mobile -->
        <div class="sm:hidden pl-12 w-full">
          <div class="mb-2">
            <time class="text-xs font-normal leading-none text-muted-foreground block mb-1">
              <slot name="date" :item="item" :index="index">
                {{ formatDate(item.date) }}
              </slot>
            </time>
            <div class="text-xs text-muted-foreground font-medium">
              <slot name="author" :item="item" :index="index">
                {{ item.author || '' }}
              </slot>
            </div>
          </div>
          <div>
            <slot :item="item" :index="index" />
          </div>
        </div>

        <!-- Desktop -->
        <div class="hidden sm:flex items-start w-full">
          <div class="w-32 lg:w-40 text-right pr-4 lg:pr-6 flex flex-col items-end justify-start pt-1">
            <time class="text-xs font-normal leading-none text-muted-foreground mb-1">
              <slot name="date" :item="item" :index="index">
                {{ formatDate(item.date) }}
              </slot>
            </time>
            <div class="text-xs text-muted-foreground font-medium">
              <slot name="author" :item="item" :index="index">
                {{ item.author || '' }}
              </slot>
            </div>
          </div>
          <div class="w-6 flex-shrink-0"/>
          <div class="flex-1 pl-4 lg:pl-6">
            <slot :item="item" :index="index" />
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
// Use relative path so it works even if srcDir = 'app'
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
  showLine?: boolean
  lineClass?: string
}

withDefaults(defineProps<TimelineProps>(), {
  icon: 'lucide:calendar',
  showLine: true,
  lineClass: 'bg-border'
})
</script>
