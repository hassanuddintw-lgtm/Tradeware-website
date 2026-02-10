"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { blogPosts } from "@/data/blog";
import { Sparkles } from "lucide-react";
import HeroSection from "@/components/sections/HeroSection";
import BlogList from "@/components/blog/BlogList";
import ScrollReveal from "@/components/animations/ScrollReveal";
import CTASection from "@/components/sections/CTASection";
import { routes } from "@/config/routes";

export default function BlogPage() {
  // Convert blog posts to BlogCard format
  const blogCards = blogPosts.map((post) => ({
    id: post.id,
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    image: post.image,
    author: post.author,
    publishedAt: post.publishedAt,
    category: post.category,
    readingTime: 5, // Default reading time
    featured: false,
  }));

  return (
    <div className="min-h-screen bg-cinematic-base py-16 pt-20 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none bg-cinematic-gradient" aria-hidden />
      <div className="container-custom relative z-10">
        {/* Header */}
        <HeroSection
          title={
            <>
              Blog & <span className="gradient-text gradient-text-glow">News</span>
            </>
          }
          description="Guides, tips, and updates about importing Japanese vehicles"
          badge="Blog & News"
          badgeIcon={<Sparkles className="h-8 w-8" />}
          background="transparent"
        />

        {/* Blog Posts Grid */}
        <ScrollReveal delay={0.2}>
          <BlogList posts={blogCards} columns={3} />
        </ScrollReveal>

        {/* Newsletter Signup */}
        <motion.div
          className="card p-12 bg-gradient-to-r from-gold-500/10 to-blue-500/10 border-2 border-gold-500/30 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h2 className="text-3xl font-black text-white mb-4">
            Stay <span className="gradient-text">Updated</span>
          </h2>
          <p className="text-lg text-gray-300 mb-8">
            Subscribe to our newsletter for the latest guides, tips, and vehicle updates
          </p>
          <div className="max-w-md mx-auto flex gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 input-field"
            />
            <motion.button
              className="btn-primary btn-glow-pulse shadow-cyan-glow whitespace-nowrap"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Subscribe
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
