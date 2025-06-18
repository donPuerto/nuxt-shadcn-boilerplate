export interface SocialLink {
  name: string
  username?: string
  handle?: string
  url: string
  icon: string
  color: string
  enabled: boolean
  label?: string
  target?: string
  platform: 'professional' | 'social' | 'contact'
}

export interface ShareButton {
  name: string
  icon: string
  baseUrl: string
  urlPattern: string
  color: string
  enabled: boolean
  label?: string
}

export interface ContactInfo {
  name: string
  title: string
  email: string
  phone?: string
  location: string
  website?: string
  timezone: string
  availability: string
}

// Create social links with environment variables - NO HARDCODED VALUES
export const createSocialLinks = (): SocialLink[] => [
  {
    name: 'GitHub',
    username: process.env.NUXT_PUBLIC_GITHUB_USERNAME || '',
    handle: process.env.NUXT_PUBLIC_GITHUB_USERNAME ? `@${process.env.NUXT_PUBLIC_GITHUB_USERNAME}` : '',
    url: process.env.NUXT_PUBLIC_GITHUB_URL || '',
    icon: 'lucide:github',
    color: '#24292e',
    enabled: Boolean(process.env.NUXT_PUBLIC_GITHUB_URL && process.env.NUXT_PUBLIC_GITHUB_USERNAME),
    label: 'View GitHub profile',
    target: '_blank',
    platform: 'professional'
  },
  {
    name: 'X (Twitter)',
    username: process.env.NUXT_PUBLIC_TWITTER_USERNAME || '',
    handle: process.env.NUXT_PUBLIC_TWITTER_USERNAME ? `@${process.env.NUXT_PUBLIC_TWITTER_USERNAME}` : '',
    url: process.env.NUXT_PUBLIC_TWITTER_URL || '',
    icon: 'lucide:twitter',
    color: '#000000',
    enabled: Boolean(process.env.NUXT_PUBLIC_TWITTER_URL && process.env.NUXT_PUBLIC_TWITTER_USERNAME),
    label: 'Follow on X',
    target: '_blank',
    platform: 'social'
  },
  {
    name: 'LinkedIn',
    username: process.env.NUXT_PUBLIC_LINKEDIN_USERNAME || '',
    handle: process.env.NUXT_PUBLIC_LINKEDIN_HANDLE || '',
    url: process.env.NUXT_PUBLIC_LINKEDIN_URL || '',
    icon: 'lucide:linkedin',
    color: '#0a66c2',
    enabled: Boolean(process.env.NUXT_PUBLIC_LINKEDIN_URL && process.env.NUXT_PUBLIC_LINKEDIN_USERNAME),
    label: 'Connect on LinkedIn',
    target: '_blank',
    platform: 'professional'
  },
  {
    name: 'Email',
    url: process.env.NUXT_PUBLIC_CONTACT_EMAIL ? `mailto:${process.env.NUXT_PUBLIC_CONTACT_EMAIL}` : '',
    icon: 'lucide:mail',
    color: '#ea4335',
    enabled: Boolean(process.env.NUXT_PUBLIC_CONTACT_EMAIL),
    label: 'Send email',
    target: '_self',
    platform: 'contact'
  }
]

// Limited share buttons - only X, Facebook, LinkedIn, GitHub
export const shareButtons: ShareButton[] = [
  {
    name: 'X (Twitter)',
    icon: 'lucide:twitter',
    baseUrl: 'https://twitter.com/intent/tweet',
    urlPattern: '?text={title}&url={url}&via={twitter_username}',
    color: '#000000',
    enabled: Boolean(process.env.NUXT_PUBLIC_TWITTER_USERNAME),
    label: 'Share on X'
  },
  {
    name: 'Facebook',
    icon: 'lucide:facebook',
    baseUrl: 'https://www.facebook.com/sharer/sharer.php',
    urlPattern: '?u={url}&quote={title}',
    color: '#1877f2',
    enabled: true, // Facebook sharing doesn't require personal info
    label: 'Share on Facebook'
  },
  {
    name: 'LinkedIn',
    icon: 'lucide:linkedin',
    baseUrl: 'https://www.linkedin.com/sharing/share-offsite/',
    urlPattern: '?url={url}&title={title}&summary={description}',
    color: '#0a66c2',
    enabled: true, // LinkedIn sharing doesn't require personal info
    label: 'Share on LinkedIn'
  },
  {
    name: 'GitHub',
    icon: 'lucide:github',
    baseUrl: 'https://github.com/',
    urlPattern: '{github_username}?tab=repositories',
    color: '#24292e',
    enabled: Boolean(process.env.NUXT_PUBLIC_GITHUB_USERNAME),
    label: 'View on GitHub'
  }
]

// Create contact info with environment variables - NO HARDCODED VALUES
export const createContactInfo = (): ContactInfo => ({
  name: process.env.NUXT_PUBLIC_CONTACT_NAME || '',
  title: process.env.NUXT_PUBLIC_CONTACT_TITLE || '',
  email: process.env.NUXT_PUBLIC_CONTACT_EMAIL || '',
  phone: process.env.NUXT_PUBLIC_CONTACT_PHONE || undefined,
  location: process.env.NUXT_PUBLIC_CONTACT_LOCATION || '',
  website: process.env.NUXT_PUBLIC_CONTACT_WEBSITE || '',
  timezone: process.env.NUXT_PUBLIC_CONTACT_TIMEZONE || '',
  availability: process.env.NUXT_PUBLIC_CONTACT_AVAILABILITY || ''
})

// Initialize with environment data
export const socialLinks = createSocialLinks()
export const contactInfo = createContactInfo()

// Filtered collections
export const enabledSocialLinks = socialLinks.filter(link => link.enabled)
export const enabledShareButtons = shareButtons.filter(button => button.enabled)

// Grouped social links
export const socialLinksByPlatform = {
  professional: socialLinks.filter(link => link.platform === 'professional' && link.enabled),
  social: socialLinks.filter(link => link.platform === 'social' && link.enabled),
  contact: socialLinks.filter(link => link.platform === 'contact' && link.enabled)
}

// Main social configuration
export const socialConfig = {
  // Core data
  links: socialLinks,
  shareButtons: shareButtons,
  contact: contactInfo,
  
  // Filtered data
  enabled: {
    links: enabledSocialLinks,
    shareButtons: enabledShareButtons
  },
  
  // Grouped data
  byPlatform: socialLinksByPlatform,
  
  // Display settings
  display: {
    social: {
      showLabels: false,
      showHandles: true,
      iconSize: 'h-5 w-5',
      openInNewTab: true,
      animation: 'hover:scale-110 transition-all duration-200',
      spacing: 'space-x-4'
    },
    share: {
      showLabels: true,
      iconSize: 'h-4 w-4',
      buttonSize: 'sm',
      variant: 'outline',
      animation: 'hover:bg-accent transition-colors duration-200'
    },
    contact: {
      showPhone: Boolean(process.env.NUXT_PUBLIC_CONTACT_PHONE),
      showWebsite: Boolean(process.env.NUXT_PUBLIC_CONTACT_WEBSITE),
      showTimezone: Boolean(process.env.NUXT_PUBLIC_CONTACT_TIMEZONE),
      showAvailability: Boolean(process.env.NUXT_PUBLIC_CONTACT_AVAILABILITY)
    }
  },
  
  // Environment variables for share functionality
  env: {
    twitterUsername: process.env.NUXT_PUBLIC_TWITTER_USERNAME || '',
    githubUsername: process.env.NUXT_PUBLIC_GITHUB_USERNAME || '',
    linkedinUsername: process.env.NUXT_PUBLIC_LINKEDIN_USERNAME || ''
  }
}
