/**
 * NAVIGATION CONFIGURATION
 * Centralized navigation structure for header and footer
 */

import { routes } from './routes';

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
  description?: string;
  icon?: string;
}

export const headerNavigation: NavItem[] = [
  {
    label: 'Home',
    href: routes.home,
  },
  {
    label: 'Inventory',
    href: routes.inventory,
  },
  {
    label: 'Destinations',
    href: routes.destinations,
    children: [
      { label: 'New Zealand', href: routes.countryDetail('new-zealand') },
      { label: 'Kenya', href: routes.countryDetail('kenya') },
      { label: 'UK', href: routes.countryDetail('uk') },
      { label: 'Uganda', href: routes.countryDetail('uganda') },
      { label: 'Ireland', href: routes.countryDetail('ireland') },
      { label: 'Tanzania', href: routes.countryDetail('tanzania') },
      { label: 'Jamaica', href: routes.countryDetail('jamaica') },
      { label: 'South Africa', href: routes.countryDetail('south-africa') },
      { label: 'Trinidad & Tobago', href: routes.countryDetail('trinidad-tobago') },
      { label: 'Mauritius', href: routes.countryDetail('mauritius') },
    ],
  },
  {
    label: 'How It Works',
    href: routes.howItWorks,
  },
  {
    label: 'Live Auctions',
    href: routes.liveAuctions,
  },
  {
    label: 'Pricing',
    href: routes.pricing,
  },
  {
    label: 'About',
    href: routes.about,
    children: [
      { label: 'Our Story', href: routes.ourStory },
      { label: 'Global Network', href: routes.globalNetwork },
      { label: 'Success Stories', href: routes.successStories },
    ],
  },
  {
    label: 'Blog',
    href: routes.blog,
  },
  {
    label: 'Contact',
    href: routes.contact,
  },
];

export const footerNavigation = {
  company: [
    { label: 'About Us', href: routes.about },
    { label: 'Our Story', href: routes.ourStory },
    { label: 'Global Network', href: routes.globalNetwork },
    { label: 'Success Stories', href: routes.successStories },
  ],
  services: [
    { label: 'How It Works', href: routes.howItWorks },
    { label: 'Verification', href: routes.verification },
    { label: 'Shipping', href: routes.shipping },
    { label: 'Documentation', href: routes.documentation },
  ],
  resources: [
    { label: 'Blog', href: routes.blog },
    { label: 'FAQ', href: routes.faq },
    { label: 'Cost Calculator', href: routes.costCalculator },
    { label: 'Documentation', href: routes.documentation },
  ],
  legal: [
    { label: 'Terms & Conditions', href: routes.terms },
    { label: 'Privacy Policy', href: routes.privacy },
  ],
};

export const mobileNavigation: NavItem[] = [
  ...headerNavigation,
  {
    label: 'Login',
    href: routes.login,
  },
  {
    label: 'Register',
    href: routes.register,
  },
];

/**
 * Get navigation item by href
 */
export function getNavItemByHref(href: string): NavItem | undefined {
  function findInItems(items: NavItem[]): NavItem | undefined {
    for (const item of items) {
      if (item.href === href) {
        return item;
      }
      if (item.children) {
        const found = findInItems(item.children);
        if (found) return found;
      }
    }
    return undefined;
  }
  return findInItems(headerNavigation);
}

/**
 * Check if navigation item is active
 */
export function isNavItemActive(currentPath: string, item: NavItem): boolean {
  if (item.href === '/') {
    return currentPath === '/';
  }
  if (currentPath.startsWith(item.href)) {
    return true;
  }
  if (item.children) {
    return item.children.some(child => isNavItemActive(currentPath, child));
  }
  return false;
}
