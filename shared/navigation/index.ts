export const navigationConfig = {
  brand: {
    name: 'Don Puerto',
    logo: '/logo.png',
    showBrand: true,
    logoWidth: 28,
    logoHeight: 28,
  },

  // Official routes
  items: [
    { title: 'Home', href: '/', icon: 'lucide:home', shortcut: '⌘+H' },
    { title: 'Dashboard', href: '/dashboard', icon: 'lucide:layout-dashboard', shortcut: '⌘+D' },
    { title: 'Releases', href: '/releases', icon: 'lucide:package', shortcut: '⌘+R' },
  ],

  social: [
    { name: 'GitHub', href: 'https://github.com', icon: 'radix-icons:github-logo' },
    { name: 'LinkedIn', href: 'https://linkedin.com', icon: 'radix-icons:linkedin-logo' }
  ]
} as const

export type NavigationConfig = typeof navigationConfig
