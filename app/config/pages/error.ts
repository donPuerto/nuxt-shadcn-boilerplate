import { seoConfig } from '../shared/seo'

export const errorConfig = {
  // 404 Not Found
  404: {
    // Reference SEO from central config
    seo: seoConfig.pages.error[404],
    
    illustration: {
      src: '/images/404-illustration.svg',
      alt: '404-illustration',
      width: 400,
      height: 300
    },
    layout: {
      style: 'centered',
      showSearch: true,
      containerWidth: 'max-w-2xl'
    },
    actions: {
      showBackButton: true,
      showHomeButton: true,
      showSearchButton: true
    },
    suggestedPages: [
      { key: 'home', to: '/', icon: 'Home' },
      { key: 'dashboard', to: '/dashboard', icon: 'LayoutDashboard' },
      { key: 'roadmap', to: '/roadmap', icon: 'Map' }
    ]
  },

  // 500 Server Error
  500: {
    seo: seoConfig.pages.error[500],
    
    illustration: {
      src: '/images/500-illustration.svg',
      alt: '500-illustration',
      width: 400,
      height: 300
    },
    layout: {
      style: 'centered',
      containerWidth: 'max-w-2xl'
    },
    actions: {
      showRetryButton: true,
      showContactButton: true,
      showHomeButton: true
    },
    contact: {
      email: 'support@example.com',
      supportUrl: '/support'
    },
    retry: {
      enabled: true,
      maxAttempts: 3,
      delay: 2000
    }
  },

  // 403 Forbidden
  403: {
    seo: seoConfig.pages.error[403],
    
    illustration: {
      src: '/images/403-illustration.svg',
      alt: '403-illustration',
      width: 400,
      height: 300
    },
    layout: {
      style: 'centered',
      containerWidth: 'max-w-2xl'
    },
    actions: {
      showLoginButton: true,
      showHomeButton: true
    },
    auth: {
      loginUrl: '/auth/login',
      signupUrl: '/auth/register'
    }
  },

  // Network/Connection Error
  network: {
    seo: seoConfig.pages.error.network,
    
    illustration: {
      src: '/images/network-error.svg',
      alt: 'network-error-illustration',
      width: 400,
      height: 300
    },
    layout: {
      style: 'centered',
      containerWidth: 'max-w-2xl'
    },
    actions: {
      showRetryButton: true,
      autoRetry: true
    },
    retry: {
      enabled: true,
      autoRetry: true,
      interval: 5000,
      maxAttempts: 5
    }
  }
}
