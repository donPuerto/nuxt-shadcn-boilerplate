<!-- filepath: d:\Code\Nuxt\v4\LearnNuxt\nuxt-shadcn-boilerplate\app\components\dashboard\footer\default.vue -->
<script setup lang="ts">
// Get config from app.config.ts
const appConfig = useAppConfig();
const dashboardConfig = appConfig.dashboard || {};
const company = dashboardConfig.company || { name: 'Company', year: new Date().getFullYear() };
const footerLinks = dashboardConfig.footerLinks || [];
</script>

<template>
  <footer class="border-t bg-background">
    <div class="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
      <div class="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
        <p class="text-center text-sm leading-loose text-muted-foreground md:text-left">
          © {{ company.year }} {{ company.name }}. All rights reserved.
        </p>
      </div>
      <div class="flex items-center gap-4">
        <nav class="flex items-center gap-4">
          <NuxtLink
            v-for="link in footerLinks"
            :key="link.label"
            :to="link.to"
            class="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            {{ link.label }}
          </NuxtLink>
        </nav>
      </div>
    </div>
  </footer>
</template>
