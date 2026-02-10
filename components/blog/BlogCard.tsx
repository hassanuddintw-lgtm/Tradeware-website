"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Calendar, User, ArrowRight, Clock } from "lucide-react";
import { routes } from "@/config/routes";
import { formatDate } from "@/lib/utils";
import Badge from "@/components/ui/Badge";

export interface BlogCardProps {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  author: string;
  publishedAt: string;
  category?: string;
  readingTime?: number;
  featured?: boolean;
}

export default function BlogCard({
  slug,
  title,
  excerpt,
  image,
  author,
  publishedAt,
  category,
  readingTime,
  featured = false,
}: BlogCardProps) {
  return (
    <motion.article
      className="card card-cinematic p-0 overflow-hidden group"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02, y: -5 }}
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden bg-dark-800">
        <Image
          src={image}
          alt={`${title} - Blog article featured image`}
          fill
          className="object-cover object-center group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {featured && (
          <div className="absolute top-4 left-4">
            <Badge variant="info">Featured</Badge>
          </div>
        )}
        {category && (
          <div className="absolute top-4 right-4">
            <Badge variant="default">{category}</Badge>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Meta */}
        <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
          <div className="flex items-center gap-1.5">
            <Calendar className="h-4 w-4" />
            <span>{formatDate(publishedAt)}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <User className="h-4 w-4" />
            <span>{author}</span>
          </div>
          {readingTime && (
            <div className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              <span>{readingTime} min read</span>
            </div>
          )}
        </div>

        {/* Title */}
        <h3 className="text-xl font-black text-white mb-3 group-hover:text-cyan-400 transition-colors">
          {title}
        </h3>

        {/* Excerpt */}
        <p className="text-gray-300 mb-4 line-clamp-3">{excerpt}</p>

        {/* Link */}
        <Link
          href={routes.blogPost(slug)}
          className="inline-flex items-center gap-2 text-cyan-500 hover:text-cyan-400 font-semibold transition-colors cursor-pointer"
        >
          Read More
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </motion.article>
  );
}
