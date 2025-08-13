<script lang="ts" setup>
const route = useRoute()
const { data: page } = await useAsyncData(route.path, () => {
  return queryCollection('content').path(route.path).first()
})
</script>

<template>
  <div>
    <header><!-- ... --></header>

    <ContentRenderer v-if="page" :value="page" />

    <footer><!-- ... --></footer>
  </div>
</template>
