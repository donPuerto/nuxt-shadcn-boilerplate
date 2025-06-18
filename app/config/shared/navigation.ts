export interface NavItem {
  label: string
  to?: string
  href?: string
  icon?: string
  target?: string
  children?: NavItem[]
  permission?: string
  badge?: string
  disabled?: boolean
}

export const mainNav: NavItem[] = [
  {
    label: 'Home',
    to: '/',
    icon: 'lucide:home'
  },
  {
    label: 'Dashboard',
    to: '/dashboard',
    icon: 'lucide:layout-dashboard'
  },
  {
    label: 'Features',
    to: '/#features',
    icon: 'lucide:star'
  },
  {
    label: 'Components',
    icon: 'lucide:component',
    children: [
      {
        label: 'UI Components',
        to: '/components/ui',
        icon: 'lucide:palette'
      },
      {
        label: 'Forms',
        to: '/components/forms',
        icon: 'lucide:file-text'
      },
      {
        label: 'Charts',
        to: '/components/charts',
        icon: 'lucide:bar-chart-3'
      }
    ]
  },
  {
    label: 'Documentation',
    href: '/docs',
    icon: 'lucide:book-open',
    target: '_blank'
  }
]

export const userNav: NavItem[] = [
  {
    label: 'Profile',
    to: '/profile',
    icon: 'lucide:user'
  },
  {
    label: 'Settings',
    to: '/settings',
    icon: 'lucide:settings'
  },
  {
    label: 'Billing',
    to: '/billing',
    icon: 'lucide:credit-card'
  },
  {
    label: 'Help & Support',
    to: '/support',
    icon: 'lucide:help-circle'
  },
  {
    label: 'Log out',
    to: '/logout',
    icon: 'lucide:log-out'
  }
]

export const adminNav: NavItem[] = [
  {
    label: 'Admin Dashboard',
    to: '/admin',
    icon: 'lucide:shield-check',
    permission: 'admin:dashboard:view'
  },
  {
    label: 'User Management',
    to: '/admin/users',
    icon: 'lucide:users',
    permission: 'admin:users:view'
  },
  {
    label: 'Content Management',
    to: '/admin/content',
    icon: 'lucide:file-edit',
    permission: 'admin:content:manage'
  },
  {
    label: 'Analytics',
    to: '/admin/analytics',
    icon: 'lucide:trending-up',
    permission: 'admin:analytics:view'
  },
  {
    label: 'System Settings',
    to: '/admin/settings',
    icon: 'lucide:cog',
    permission: 'admin:settings:manage'
  }
]

export const mobileNav: NavItem[] = [
  ...mainNav,
  {
    label: 'Account',
    icon: 'lucide:user-circle',
    children: userNav
  }
]

export const breadcrumbConfig = {
  homeIcon: 'lucide:home',
  separatorIcon: 'lucide:chevron-right',
  showHome: true
}

export const navigationConfig = {
  mainNav,
  userNav,
  adminNav,
  mobileNav,
  breadcrumb: breadcrumbConfig,
  
  // Navigation behavior
  behavior: {
    closeOnRouteChange: true,
    highlightActiveItem: true,
    expandOnHover: false
  }
}
