import { BlogPost } from "@/types";

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Understanding Japanese Vehicle Inspection (Shaken)",
    slug: "understanding-japanese-vehicle-inspection-shaken",
    excerpt: "Learn about Japan's mandatory vehicle inspection system (Shaken) and how it ensures the quality and safety of used vehicles.",
    content: `# Understanding Japanese Vehicle Inspection (Shaken)

Learn about Japan's mandatory vehicle inspection system (Shaken) and how it ensures the quality and safety of used vehicles. Shaken is a periodic inspection required for all vehicles in Japan, covering safety and emissions. This system helps maintain high standards for used vehicles exported from Japan.`,
    author: "Tradeware",
    publishedAt: "2026-02-15",
    image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=92&w=1200",
    category: "Buying Guide",
    tags: ["Shaken", "Inspection", "Japan"],
  },
  {
    id: "2",
    title: "Best Japanese SUVs for 2024: Top Picks and Reviews",
    slug: "best-japanese-suvs-2024-top-picks-reviews",
    excerpt: "Explore the best Japanese SUVs available in 2024. From compact crossovers to full-size SUVs, find the perfect vehicle for your needs.",
    content: `# Best Japanese SUVs for 2024: Top Picks and Reviews

Explore the best Japanese SUVs available in 2024. From compact crossovers to full-size SUVs, find the perfect vehicle for your needs. Japanese manufacturers continue to lead in reliability, fuel efficiency, and value.`,
    author: "Tradeware",
    publishedAt: "2026-02-14",
    image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=92&w=1200",
    category: "Reviews",
    tags: ["SUV", "2024", "Reviews"],
  },
  {
    id: "3",
    title: "Top 10 Most Reliable Japanese Car Brands in 2024",
    slug: "top-10-reliable-japanese-car-brands-2024",
    excerpt: "Discover the most reliable Japanese car brands based on quality, durability, and customer satisfaction. Find out which brands offer the best value.",
    content: `# Top 10 Most Reliable Japanese Car Brands in 2024

Discover the most reliable Japanese car brands based on quality, durability, and customer satisfaction. Find out which brands offer the best value. Toyota, Honda, Nissan, and others consistently rank among the world's most dependable manufacturers.`,
    author: "Tradeware",
    publishedAt: "2026-02-13",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=92&w=1200",
    category: "Reviews",
    tags: ["Reliability", "Brands", "2024"],
  },
  {
    id: "4",
    title: "Electric Vehicles from Japan: The Future of Automotive",
    slug: "electric-vehicles-japan-future-automotive",
    excerpt: "Explore Japan's leading role in electric vehicle technology and discover the best EVs available from Japanese manufacturers.",
    content: `# Electric Vehicles from Japan: The Future of Automotive

Explore Japan's leading role in electric vehicle technology and discover the best EVs available from Japanese manufacturers. Japan continues to invest heavily in EV development and export.`,
    author: "Tradeware",
    publishedAt: "2026-02-12",
    image: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&q=92&w=1200",
    category: "Electric Vehicles",
    tags: ["EV", "Electric", "Japan"],
  },
  {
    id: "5",
    title: "Complete Guide to Buying Japanese Used Cars",
    slug: "complete-guide-buying-japanese-used-cars",
    excerpt: "Learn everything you need to know about purchasing high-quality used vehicles from Japan. From inspection to shipping, we cover it all.",
    content: `# Complete Guide to Buying Japanese Used Cars

Learn everything you need to know about purchasing high-quality used vehicles from Japan. From inspection to shipping, we cover it all. This guide walks you through grades, documentation, and the export process.`,
    author: "Tradeware",
    publishedAt: "2026-02-11",
    image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&q=92&w=1200",
    category: "Buying Guide",
    tags: ["Buying", "Guide", "Used Cars"],
  },
  {
    id: "6",
    title: "Maintenance Tips for Japanese Used Cars",
    slug: "maintenance-tips-japanese-used-cars",
    excerpt: "Essential maintenance tips to keep your Japanese used car running smoothly for years to come. Expert advice on care and upkeep.",
    content: `# Maintenance Tips for Japanese Used Cars

Essential maintenance tips to keep your Japanese used car running smoothly for years to come. Expert advice on care and upkeep. Regular service and proper fluids help preserve value and reliability.`,
    author: "Tradeware",
    publishedAt: "2026-02-10",
    image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&q=92&w=1200",
    category: "Maintenance",
    tags: ["Maintenance", "Tips", "Used Cars"],
  },
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function getPostById(id: string): BlogPost | undefined {
  return blogPosts.find((post) => post.id === id);
}
