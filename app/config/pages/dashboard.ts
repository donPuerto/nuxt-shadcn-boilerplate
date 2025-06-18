import { seoConfig } from '../shared/seo'

export const dashboardConfig = {
  // Page metadata (auth-related only)
  meta: {
    requiresAuth: true,
    redirectTo: '/auth/login',
    roles: ['user', 'admin'],
    permissions: ['dashboard.view']
  },

  // Reference SEO from central config
  seo: seoConfig.pages.dashboard,

  // Layout configuration
  layout: {
    name: 'dashboard',
    showBreadcrumbs: true,
    containerClass: 'h-screen flex flex-col',
    contentClass: 'flex-1 flex overflow-hidden'
  },

  // ... rest of dashboard config remains the same
  header: {
    enabled: true,
    height: 'h-16',
    sticky: true,
    showTitle: true,
    showSearch: false,
    showNotifications: true,
    showUserMenu: true,
    
    actions: [
      {
        key: 'notifications',
        icon: 'Bell',
        badge: true,
        onClick: 'toggleNotifications'
      },
      {
        key: 'settings',
        icon: 'Settings',
        to: '/dashboard/settings'
      }
    ]
  },

  sidebar: {
    left: {
      enabled: true,
      width: '280px',
      widthCollapsed: '64px',
      defaultCollapsed: false,
      collapsible: true,
      variant: 'sidebar',
      showToggle: true,
      
      navigation: [
        {
          key: 'overview',
          to: '/dashboard',
          icon: 'LayoutDashboard',
          exact: true,
          badge: null
        },
        {
          key: 'analytics',
          to: '/dashboard/analytics',
          icon: 'BarChart3',
          badge: null
        },
        {
          key: 'users',
          to: '/dashboard/users',
          icon: 'Users',
          badge: 'new'
        },
        {
          key: 'products',
          to: '/dashboard/products',
          icon: 'Package',
          badge: null
        },
        {
          key: 'orders',
          to: '/dashboard/orders',
          icon: 'ShoppingCart',
          badge: '5'
        },
        {
          key: 'reports',
          to: '/dashboard/reports',
          icon: 'FileText',
          badge: null
        },
        {
          key: 'settings',
          to: '/dashboard/settings',
          icon: 'Settings',
          badge: null
        }
      ],

      footer: {
        enabled: true,
        showUser: true,
        showUpgrade: false,
        showSupport: true
      }
    },

    right: {
      enabled: false,
      width: '320px',
      variant: 'sheet',
      trigger: 'manual',
      
      sections: [
        {
          key: 'filters',
          collapsible: true,
          defaultOpen: true
        },
        {
          key: 'recent-activity',
          collapsible: true,
          defaultOpen: false
        }
      ]
    }
  },

  content: {
    padding: 'p-6',
    maxWidth: null,
    showPageHeader: true,
    
    pageHeader: {
      showTitle: true,
      showDescription: true,
      showActions: true,
      showBreadcrumbs: true
    }
  },

  footer: {
    enabled: true,
    height: 'h-12',
    position: 'sticky',
    
    content: {
      left: {
        showCopyright: true,
        showVersion: true
      },
      right: {
        showStatus: true,
        showLastUpdated: false
      }
    },
    
    links: [
      { key: 'support', to: '/support' },
      { key: 'docs', to: '/docs' },
      { key: 'api', to: '/api-docs' }
    ]
  },

  userMenu: [
    {
      key: 'profile',
      to: '/dashboard/profile',
      icon: 'User',
      section: 'account'
    },
    {
      key: 'billing',
      to: '/dashboard/billing',
      icon: 'CreditCard',
      section: 'account'
    },
    {
      key: 'preferences',
      to: '/dashboard/preferences',
      icon: 'Settings',
      section: 'account'
    },
    {
      key: 'team',
      to: '/dashboard/team',
      icon: 'Users',
      section: 'workspace'
    },
    {
      key: 'help',
      to: '/help',
      icon: 'HelpCircle',
      section: 'support'
    },
    {
      key: 'logout',
      action: 'logout',
      icon: 'LogOut',
      section: 'account',
      separator: true
    }
  ],

  widgets: {
    overview: [
      {
        key: 'total-users',
        type: 'stat',
        size: 'md',
        refreshInterval: 30000
      },
      {
        key: 'revenue',
        type: 'stat',
        size: 'md'
      },
      {
        key: 'orders',
        type: 'stat',
        size: 'md'
      },
      {
        key: 'growth',
        type: 'stat',
        size: 'md'
      },
      {
        key: 'analytics-chart',
        type: 'chart',
        size: 'xl',
        height: '400px'
      },
      {
        key: 'recent-orders',
        type: 'table',
        size: 'lg'
      }
    ]
  },

  quickActions: [
    {
      key: 'new-user',
      icon: 'UserPlus',
      to: '/dashboard/users/new',
      primary: true
    },
    {
      key: 'new-product',
      icon: 'Plus',
      to: '/dashboard/products/new'
    },
    {
      key: 'export-data',
      icon: 'Download',
      action: 'exportData'
    }
  ],

  shortcuts: [
    { key: ['cmd', 'k'], action: 'openCommandPalette' },
    { key: ['g', 'd'], action: 'gotoDashboard' },
    { key: ['g', 'u'], action: 'gotoUsers' },
    { key: ['g', 'p'], action: 'gotoProducts' },
    { key: ['n', 'u'], action: 'newUser' }
  ]
}
