<template>
  <div>
    <transition name="fade">
      <button
        v-if="visible"
        class="fixed bottom-20 right-4 z-50 h-10 w-10 rounded-full border bg-background/80 backdrop-blur flex items-center justify-center text-sm hover:bg-accent hover:text-accent-foreground transition"
        aria-label="Back to top"
        @click="scrollTop"
      >
        ↑
      </button>
    </transition>
  </div>
</template>

<script lang="ts" setup>
const visible = ref(false)

const onScroll = () => {
  visible.value = window.scrollY > 300
}

const scrollTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => window.addEventListener('scroll', onScroll))
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active { transition: opacity .2s; }
.fade-enter-from,
.fade-leave-to { opacity: 0; }
</style>
