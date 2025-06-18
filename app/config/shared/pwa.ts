export const pwaConfig = {
  // Basic PWA settings
  name: 'Nuxt Shadcn Boilerplate',
  shortName: 'NSB',
  description: 'A modern Nuxt 3 boilerplate with Shadcn UI components',
  
  // Theme and display
  themeColor: '#000000',
  backgroundColor: '#ffffff',
  display: 'standalone', // 'fullscreen' | 'standalone' | 'minimal-ui' | 'browser'
  orientation: 'portrait', // 'portrait' | 'landscape' | 'any'
  
  // Icons (these are actual image files, not lucide icons)
  icons: [
    {
      src: '/icons/icon-72x72.png',
      sizes: '72x72',
      type: 'image/png'
    },
    {
      src: '/icons/icon-96x96.png',
      sizes: '96x96',
      type: 'image/png'
    },
    {
      src: '/icons/icon-128x128.png',
      sizes: '128x128',
      type: 'image/png'
    },
    {
      src: '/icons/icon-144x144.png',
      sizes: '144x144',
      type: 'image/png'
    },
    {
      src: '/icons/icon-152x152.png',
      sizes: '152x152',
      type: 'image/png'
    },
    {
      src: '/icons/icon-192x192.png',
      sizes: '192x192',
      type: 'image/png'
    },
    {
      src: '/icons/icon-384x384.png',
      sizes: '384x384',
      type: 'image/png'
    },
    {
      src: '/icons/icon-512x512.png',
      sizes: '512x512',
      type: 'image/png'
    }
  ],

  // Start URL and scope
  startUrl: '/',
  scope: '/',
  
  // Categories
  categories: ['productivity', 'business', 'developer'],
  
  // Screenshots for app stores
  screenshots: [
    {
      src: '/screenshots/desktop-1.png',
      sizes: '1280x720',
      type: 'image/png',
      platform: 'wide'
    },
    {
      src: '/screenshots/mobile-1.png', 
      sizes: '750x1334',
      type: 'image/png',
      platform: 'narrow'
    }
  ],

  // Advanced features
  features: {
    installPrompt: true,
    offlineSupport: true,
    backgroundSync: false,
    pushNotifications: false
  },

  // Service worker settings
  serviceWorker: {
    enabled: true,
    updateMode: 'manual', // 'auto' | 'manual'
    cacheFirst: [
      '/_nuxt/',
      '/images/',
      '/icons/'
    ],
    networkFirst: [
      '/api/',
      '/_content/'
    ]
  },

  // Manifest shortcuts (like app shortcuts)
  shortcuts: [
    {
      name: 'Dashboard',
      shortName: 'Dashboard', 
      description: 'Go to your dashboard',
      url: '/dashboard',
      icons: [
        {
          src: '/icons/shortcut-dashboard.png',
          sizes: '192x192'
        }
      ]
    },
    {
      name: 'Profile',
      shortName: 'Profile',
      description: 'View your profile',
      url: '/profile', 
      icons: [
        {
          src: '/icons/shortcut-profile.png',
          sizes: '192x192'
        }
      ]
    }
  ]
}
