<script setup lang="ts">
const { path } = useRoute()
const { data } = await useAsyncData(`content-${path}`, () => {
  return queryContent().where({ _path: path }).findOne()
})
</script>

<template>
  <main class="docs">
    <ContentRenderer v-if="data" :value="data" />
    <ContentNavigation v-slot="{ navigation }">
      <div class="navigation">
        <li v-for="link of navigation" :key="link._path">
          <NuxtLink :to="link._path">{{ link.title }}</NuxtLink>
        </li>
      </div>
    </ContentNavigation>
  </main>
</template>
