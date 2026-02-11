/**
 * ROUTE CONFIGURATION
 * Centralized route definitions for the entire application
 */

export const routes = {
  // Public Routes
  home: '/',
  inventory: '/inventory',
  vehicleDetail: (id: string) => `/vehicles/${id}`,
  destinations: '/destinations',
  countryDetail: (country: string) => `/destinations/${country}`,
  howItWorks: '/how-it-works',
  whyChooseUs: '/why-choose-us',
  importProcess: '/import-process',
  liveAuctions: '/live-auctions',
  auctionRoom: (id: string) => `/auction/${id}`,
  auctionInformation: '/auction-information',
  pricing: '/pricing',
  costCalculator: '/cost-calculator',
  verification: '/verification',
  shipping: '/shipping',
  documentation: '/documentation',
  successStories: '/success-stories',
  about: '/about',
  ourStory: '/about/our-story',
  globalNetwork: '/about/global-network',
  companyProfile: '/company-profile',
  testimonials: '/testimonials',
  faq: '/faq',
  blog: '/blog',
  blogPost: (slug: string) => `/blog/${slug}`,
  contact: '/contact',
  terms: '/terms',
  privacy: '/privacy',
  notFound: '/not-found',

  // Authentication Routes
  login: '/login',
  register: '/register',
  verifyEmail: '/verify-email',

  // Dashboard Routes (user)
  dashboard: '/dashboard',
  dashboardPending: '/dashboard/pending',
  dashboardTracking: '/dashboard/tracking',
  dashboardPayments: '/dashboard/payments',
  profile: '/dashboard/profile',
  settings: '/dashboard/settings',

  // Admin Routes
  admin: '/admin',
  adminUsers: '/admin/users',
  adminVehicles: '/admin/vehicles',
  adminListings: '/admin/listings',
  adminPricing: '/admin/pricing',
  adminBlog: '/admin/blog',
  adminSEO: '/admin/seo',
  adminInquiries: '/admin/inquiries',
  adminJapanAuctions: '/admin/japan-auctions',
} as const;

export type RouteKey = keyof typeof routes;

/**
 * Get route by key
 */
export function getRoute(key: RouteKey, ...params: string[]): string {
  const route = routes[key];
  if (typeof route === 'function') {
    return (route as (...args: string[]) => string)(...params);
  }
  return route;
}

/**
 * Check if route is active
 */
export function isActiveRoute(currentPath: string, route: string): boolean {
  if (route === '/') {
    return currentPath === '/';
  }
  return currentPath.startsWith(route);
}
