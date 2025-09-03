<!-- filepath: d:\Code\Nuxt\v4\LearnNuxt\nuxt-shadcn-boilerplate-next\app\components\ui\timeline.vue -->
<template>
  <div class="relative">
    <!-- Continuous Timeline Line - responsive positioning -->
    <div class="absolute left-6 sm:left-32 sm:ml-4 lg:ml-6 top-0 bottom-0 w-0.5 bg-border"/>
    
    <div class="space-y-8 sm:space-y-10">
      <div 
        v-for="(item, index) in items" 
        :key="item.id"
        class="relative flex items-start"
      >
        <!-- Timeline Node - responsive positioning -->
        <div class="absolute left-4 sm:left-32 sm:ml-2 lg:ml-4 w-5 h-5 sm:w-6 sm:h-6 bg-primary/10 rounded-full ring-4 sm:ring-8 ring-background border-2 border-primary flex items-center justify-center z-10">
          <Icon name="lucide:calendar" class="w-2 h-2 sm:w-2.5 sm:h-2.5 text-primary" />
        </div>

        <!-- Mobile Layout: Timeline node left, content and labels right -->
        <div class="sm:hidden pl-12 w-full">
          <div class="flex justify-between items-start mb-2">
            <div>
              <!-- Date Info -->
              <time class="text-xs font-normal leading-none text-muted-foreground block mb-1">
                <slot name="date" :item="item" :index="index">
                  {{ formatTimelineDate(item.date) }}
                </slot>
              </time>
              
              <!-- Author Info -->
              <div class="text-xs text-muted-foreground font-medium">
                <slot name="author" :item="item" :index="index">
                  {{ item.author || '' }}
                </slot>
              </div>
            </div>
          </div>
          
          <!-- Content -->
          <div>
            <slot :item="item" :index="index" />
          </div>
        </div>

        <!-- Desktop Layout: Labels left, node center, content right -->
        <div class="hidden sm:flex items-start w-full">
          <!-- Left Side - Date and Author -->
          <div class="w-32 lg:w-40 text-right pr-4 lg:pr-6 flex flex-col items-end justify-start pt-1">
            <!-- Date Info (at top) -->
            <time class="text-xs font-normal leading-none text-muted-foreground mb-1">
              <slot name="date" :item="item" :index="index">
                {{ formatTimelineDate(item.date) }}
              </slot>
            </time>
            
            <!-- Author Info (at bottom) -->
            <div class="text-xs text-muted-foreground font-medium">
              <slot name="author" :item="item" :index="index">
                {{ item.author || '' }}
              </slot>
            </div>
          </div>
          
          <!-- Space for timeline node -->
          <div class="w-6 flex-shrink-0"/>
          
          <!-- Timeline Item Content -->
          <div class="flex-1 pl-4 lg:pl-6">
            <slot :item="item" :index="index" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface TimelineItem {
  id: string | number
  date?: Date
  author?: string
  [key: string]: any
}

interface TimelineProps {
  items: TimelineItem[]
}

defineProps<TimelineProps>()

// Format date for timeline display
const formatTimelineDate = (date: Date | undefined) => {
  if (!date) return ''
  
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric', 
    year: 'numeric'
  })
}
</script>
