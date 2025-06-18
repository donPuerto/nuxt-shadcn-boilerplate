import type { NavItem } from './navigation'
import type { SocialLink } from './social'

export const footerNav: NavItem[] = [
  {
    label: 'Company',
    children: [
      {
        label: 'About Us',
        to: '/about',
        icon: 'lucide:info'
      },
      {
        label: 'Our Team',
        to: '/team',
        icon: 'lucide:users'
      },
      {
        label: 'Careers',
        to: '/careers',
        icon: 'lucide:briefcase'
      },
      {
        label: 'Contact',
        to: '/contact',
        icon: 'lucide:mail'
      }
    ]
  },
  {
    label: 'Product',
    children: [
      {
        label: 'Features',
        to: '/features',
        icon: 'lucide:star'
      },
      {
        label: 'Pricing',
        to: '/pricing',
        icon: 'lucide:dollar-sign'
      },
      {
        label: 'Documentation',
        to: '/docs',
        icon: 'lucide:book-open'
      },
      {
        label: 'API Reference',
        to: '/api',
        icon: 'lucide:code'
      }
    ]
  },
  {
    label: 'Resources',
    children: [
      {
        label: 'Blog',
        to: '/blog',
        icon: 'lucide:newspaper'
      },
      {
        label: 'Tutorials',
        to: '/tutorials',
        icon: 'lucide:play-circle'
      },
      {
        label: 'Community',
        href: 'https://discord.gg/your-server',
        icon: 'lucide:message-square',
        target: '_blank'
      },
      {
        label: 'Status',
        href: 'https://status.your-domain.com',
        icon: 'lucide:activity',
        target: '_blank'
      }
    ]
  },
  {
    label: 'Legal',
    children: [
      {
        label: 'Privacy Policy',
        to: '/privacy-policy',
        icon: 'lucide:shield'
      },
      {
        label: 'Terms of Service',
        to: '/terms-of-service',
        icon: 'lucide:file-text'
      },
      {
        label: 'Cookie Policy',
        to: '/cookie-policy',
        icon: 'lucide:cookie'
      },
      {
        label: 'GDPR',
        to: '/gdpr',
        icon: 'lucide:shield-check'
      }
    ]
  }
]

export const footerActions: NavItem[] = [
  {
    label: 'Newsletter',
    icon: 'lucide:mail-plus',
    to: '/newsletter'
  },
  {
    label: 'Support',
    icon: 'lucide:help-circle',
    to: '/support'
  },
  {
    label: 'Feedback',
    icon: 'lucide:message-circle',
    to: '/feedback'
  }
]

export const footerConfig = {
  // Basic info
  companyName: 'Your Company Name',
  description: 'Building amazing experiences with modern web technologies.',
  copyright: `© ${new Date().getFullYear()} Your Company Name. All rights reserved.`,
  
  // Navigation
  navigation: footerNav,
  actions: footerActions,
  
  // Contact info
  contact: {
    email: 'hello@your-domain.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main St, City, State 12345',
    emailIcon: 'lucide:mail',
    phoneIcon: 'lucide:phone',
    addressIcon: 'lucide:map-pin'
  },

  // Display settings
  display: {
    showLogo: true,
    showDescription: true,
    showNavigation: true,
    showSocialLinks: true,
    showNewsletter: true,
    showContact: true,
    showCopyright: true,
    layout: 'columns', // 'columns' | 'minimal' | 'centered'
    theme: 'dark' // 'light' | 'dark' | 'auto'
  },

  // Newsletter
  newsletter: {
    title: 'Stay Updated',
    description: 'Get the latest news and updates delivered to your inbox.',
    placeholder: 'Enter your email address',
    buttonText: 'Subscribe',
    buttonIcon: 'lucide:arrow-right',
    privacyText: 'We respect your privacy. Unsubscribe at any time.'
  },

  // Back to top
  backToTop: {
    enabled: true,
    icon: 'lucide:arrow-up',
    text: 'Back to top'
  }
}
