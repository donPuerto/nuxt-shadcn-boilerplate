<!-- filepath: d:\Code\Nuxt\v4\LearnNuxt\nuxt-shadcn-boilerplate-next\app\components\app\nav\mobileNav.vue -->
<script setup lang="ts">
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"

// Props
interface MobileNavProps {
  open?: boolean
}

const props = withDefaults(defineProps<MobileNavProps>(), {
  open: false
})

// Emits
const emit = defineEmits<{
  'update:open': [value: boolean]
}>()

// Local reactive state for sheet height - CHANGED: Reduced from 85 to 50
const sheetHeight = ref(50) // Default 50vh (half screen)
const isDragging = ref(false)
const initialY = ref(0)
const initialHeight = ref(50) // CHANGED: Updated initial height

const appConfig = useAppConfig()
const mobileRoutes = computed(() => appConfig.navigation.items)

const closeMobileMenu = () => {
  emit('update:open', false)
}

// Drag handle functionality
const startDrag = (event: MouseEvent | TouchEvent) => {
  isDragging.value = true
  initialHeight.value = sheetHeight.value
  
  if (event instanceof MouseEvent) {
    initialY.value = event.clientY
    document.addEventListener('mousemove', onDrag)
    document.addEventListener('mouseup', stopDrag)
  } else {
    initialY.value = event.touches[0].clientY
    document.addEventListener('touchmove', onDrag)
    document.addEventListener('touchend', stopDrag)
  }
  
  event.preventDefault()
}

const onDrag = (event: MouseEvent | TouchEvent) => {
  if (!isDragging.value) return
  
  const currentY = event instanceof MouseEvent ? event.clientY : event.touches[0].clientY
  const deltaY = initialY.value - currentY
  const viewportHeight = window.innerHeight
  const heightChange = (deltaY / viewportHeight) * 100
  
  let newHeight = initialHeight.value + heightChange
  
  // Constrain between 30vh and 95vh
  newHeight = Math.max(30, Math.min(95, newHeight))
  sheetHeight.value = newHeight
}

const stopDrag = () => {
  isDragging.value = false
  document.removeEventListener('mousemove', onDrag)
  document.removeEventListener('mouseup', stopDrag)
  document.removeEventListener('touchmove', onDrag)
  document.removeEventListener('touchend', stopDrag)
}

// Cleanup on unmount
onUnmounted(() => {
  document.removeEventListener('mousemove', onDrag)
  document.removeEventListener('mouseup', stopDrag)
  document.removeEventListener('touchmove', onDrag)
  document.removeEventListener('touchend', stopDrag)
})
</script>

<template>
  <Sheet :open="props.open" @update:open="emit('update:open', $event)">
    <SheetTrigger as-child>
      <!-- CHANGED: Added hover:bg-accent for button background hover -->
      <Button variant="ghost" size="icon" class="lg:hidden hover:bg-accent">
        <Icon name="lucide:menu" class="h-5 w-5" />
        <span class="sr-only">Toggle menu</span>
      </Button>
    </SheetTrigger>
    <SheetContent 
      side="bottom" 
      :style="{ height: `${sheetHeight}vh` }"
      class="rounded-t-[24px] border-t-2 px-0 py-0 overflow-hidden bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60 [&>button]:hidden"
    >
      <!-- Required for accessibility - Hidden with sr-only -->
      <SheetHeader class="sr-only">
        <SheetTitle>Mobile Navigation Menu</SheetTitle>
        <SheetDescription>
          Navigate to main pages including Dashboard and Releases
        </SheetDescription>
      </SheetHeader>

      <!-- Enhanced Blurry Background Overlay -->
      <div class="absolute inset-0 bg-gradient-to-t from-background/95 via-background/85 to-background/75 backdrop-blur-2xl" />
      
      <!-- Content Container -->
      <div class="relative z-10 h-full">
        <!-- Header with Drag Handle and Custom Close Button -->
        <div class="flex items-center justify-between px-6 py-3">
          <!-- Drag Handle -->
          <div class="flex-1 flex justify-center">
            <div 
              class="w-12 h-1.5 bg-muted-foreground/40 rounded-full transition-colors hover:bg-muted-foreground/60 cursor-grab active:cursor-grabbing select-none"
              @mousedown="startDrag"
              @touchstart="startDrag"
            />
          </div>
          
          <!-- Custom Close Button -->
          <Button 
            variant="ghost" 
            size="icon" 
            class="h-8 w-8 rounded-full hover:bg-accent/80 transition-colors"
            @click="closeMobileMenu"
          >
            <Icon name="lucide:x" class="h-4 w-4" />
            <span class="sr-only">Close menu</span>
          </Button>
        </div>

        <!-- Command Palette Style Content -->
        <div class="px-6 pb-6 overflow-y-auto h-full">
          <!-- Pages Section -->
          <div class="space-y-4">
            <div class="px-2">
              <h4 class="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Routes</h4>
            </div>
            <div class="space-y-2">
              <NuxtLink
                v-for="route in mobileRoutes"
                :key="route.href"
                :to="route.href"
                class="flex items-center justify-between px-4 py-4 rounded-xl bg-card/50 hover:bg-accent/80 hover:text-accent-foreground transition-all duration-200 group backdrop-blur-sm"
                @click="closeMobileMenu"
              >
                <div class="flex items-center gap-2">
                  <!-- FIX: removed stray '}' -->
                  <Icon :name="route.icon || 'lucide:circle'" class="h-5 w-5 text-muted-foreground group-hover:text-accent-foreground flex-shrink-0" />
                  <span class="font-semibold text-sm">{{ route.title }}</span>
                </div>
                <kbd
                  v-if="route.shortcut"
                  class="pointer-events-none inline-flex h-6 select-none items-center justify-center rounded-md bg-muted/80 backdrop-blur-sm px-2 font-mono text-xs font-medium text-muted-foreground min-w-[2rem]"
                >
                  {{ route.shortcut }}
                </kbd>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </SheetContent>
  </Sheet>
</template>
