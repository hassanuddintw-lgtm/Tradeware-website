"use client";

import { motion } from "framer-motion";
import { TrendingUp, Users, Globe, Award } from "lucide-react";

const stats = [
  {
    icon: TrendingUp,
    value: "10,000+",
    label: "Vehicles Exported",
    description: "Successfully shipped worldwide",
    color: "from-gold-500 to-gold-600",
  },
  {
    icon: Users,
    value: "5,000+",
    label: "Satisfied Customers",
    description: "Across 50+ countries",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Globe,
    value: "120+",
    label: "Auction Partners",
    description: "Direct access to Japan's largest network",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Award,
    value: "98%",
    label: "Customer Satisfaction",
    description: "Based on verified reviews",
    color: "from-green-500 to-emerald-500",
  },
];

export default function StatsSection() {
  return (
    <section className="py-20 bg-dark-900 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gold-500 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl" />
      </div>
      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                className="text-center card p-8 glow-effect"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br ${stat.color} mb-6 shadow-lg`}>
                  <Icon className="h-10 w-10 text-white" />
                </div>
                <motion.div
                  className="text-5xl font-black gradient-text mb-3"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.2, type: "spring" }}
                >
                  {stat.value}
                </motion.div>
                <div className="text-lg font-bold text-white mb-2">{stat.label}</div>
                <div className="text-sm text-gray-400">{stat.description}</div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
