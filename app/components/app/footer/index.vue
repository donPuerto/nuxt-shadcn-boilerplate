<!-- filepath: d:\Code\Nuxt\v4\LearnNuxt\nuxt-shadcn-boilerplate\app\components\app\footer\index.vue -->
<template>
  <footer class="border-t border-transparent backdrop-blur-sm">
    <div class="mx-auto max-w-7xl px-4 py-12">
      <!-- Footer Top Section with Logo and Links -->
      <div class="grid gap-8 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
        <!-- Logo and Description -->
        <div class="lg:col-span-2">
          <div class="flex items-center gap-2">
            <AppNavigationLogo />
            <span class="text-xl font-bold">Nuxt Shadcn</span>
          </div>
          <p class="mt-4 text-sm text-muted-foreground">
            {{ $t('footer.description') }}
          </p>
          <div class="mt-6 flex items-center gap-4">
            <!-- Social Media Icons -->
            <template v-for="social in socialLinks" :key="social.name">
              <a 
                :href="social.url" 
                target="_blank" 
                rel="noopener noreferrer" 
                class="rounded-full bg-muted/50 p-2 text-muted-foreground transition-colors hover:bg-muted/80 hover:text-foreground"
                :aria-label="social.name"
              >
                <i :class="`i-lucide-${social.icon} h-5 w-5`"/>
              </a>
            </template>
          </div>
        </div>

        <!-- Footer Link Sections (looped) -->
        <template v-for="section in footerSections" :key="section.title">
          <div>
            <h3 class="mb-3 text-sm font-semibold uppercase tracking-wider">{{ $t(`footer.sections.${section.key}.title`) }}</h3>
            <ul class="space-y-2">
              <template v-for="link in section.links" :key="link.key">
                <li>
                  <component 
                    :is="link.isInternal ? 'NuxtLink' : 'a'" 
                    :to="link.isInternal ? link.url : undefined" 
                    :href="link.isInternal ? undefined : link.url" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    class="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {{ $t(`footer.sections.${section.key}.links.${link.key}`) }}
                  </component>
                </li>
              </template>
            </ul>
          </div>
        </template>
      </div>

      <Separator class="my-8 opacity-30" />

      <!-- Footer Bottom Section with Copyright -->
      <div class="flex flex-col items-center justify-between gap-4 sm:flex-row">
        <p class="text-sm text-muted-foreground">
          &copy; {{ new Date().getFullYear() }} {{ $t('footer.copyright') }}
        </p>
        <div class="flex items-center gap-4">
          <LanguageSwitcher />
          <ModeSwitcher />
        </div>
      </div>
    </div>
  </footer>
</template>

<script lang="ts" setup>
const { locale } = useI18n()

// Social media links
const socialLinks = [
  {
    name: 'Twitter',
    url: 'https://x.com/@donpuerto_',
    icon: 'twitter'
  },
  {
    name: 'GitHub',
    url: 'https://github.com/donPuerto',
    icon: 'github'
  },
  {
    name: 'Discord',
    url: 'https://discord.gg/8SesF9ZP',
    icon: 'message-circle'
  }
]

// Footer sections with links
const footerSections = [
  {
    key: 'resources',
    title: 'Resources',
    links: [
      { key: 'components', url: '/components', isInternal: true },
      { key: 'roadmap', url: '/roadmap', isInternal: true },
      { key: 'documentation', url: '#', isInternal: false },
      { key: 'tutorials', url: '#', isInternal: false }
    ]
  },
  {
    key: 'community',
    title: 'Community',
    links: [
      { key: 'github', url: 'https://github.com/donPuerto', isInternal: false },
      { key: 'discord', url: 'https://discord.gg/8SesF9ZP', isInternal: false },
      { key: 'twitter', url: 'https://x.com/@donpuerto_', isInternal: false },
      { key: 'contributors', url: '#', isInternal: false }
    ]
  },
  {
    key: 'legal',
    title: 'Legal',
    links: [
      { key: 'privacy', url: '#', isInternal: false },
      { key: 'terms', url: '#', isInternal: false },
      { key: 'license', url: '#', isInternal: false }
    ]
  }
]
</script>

<style scoped>
footer {
  position: relative;
  z-index: 10;
  transition: background-color 0.3s ease;
}

/* Optional: Add a subtle gradient overlay for better text readability */
footer:before {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100%;
  background: linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.1));
  z-index: -1;
  pointer-events: none;
}

/* Dark mode version */
:global(.dark) footer:before {
  background: linear-gradient(to bottom, transparent, rgba(255, 255, 255, 0.05));
}
</style>
