export const navigationConfig = {
  brand: {
    name: 'Don Puerto',
    logo: '/logo.png',
    showBrand: true,
    logoWidth: 28,
    logoHeight: 28,
  },
  
  items: [
    { title: 'Home', href: '/' },
    { title: 'About', href: '/about' },
    { title: 'Contact', href: '/contact' }
  ],
  
  social: [
    { name: 'GitHub', href: 'https://github.com', icon: 'radix-icons:github-logo' },
    { name: 'Discord', href: 'https://discord.com', icon: 'radix-icons:discord-logo' }
  ]
} as const

export type NavigationConfig = typeof navigationConfig
