"use client";

import { motion } from "framer-motion";
import { Car, FileText, Heart, Settings, TrendingUp, ArrowRight, Package, Clock, MapPin, Gavel } from "lucide-react";
import Link from "next/link";
import { routes } from "@/config/routes";

const stats = [
  { label: "Saved Vehicles", value: "12", icon: Heart, color: "cyan" },
  { label: "Active Inquiries", value: "3", icon: FileText, color: "blue" },
  { label: "Imported Vehicles", value: "5", icon: Car, color: "gold" },
  { label: "Total Spent", value: "$45,000", icon: TrendingUp, color: "green" },
];

const quickActions = [
  {
    title: "My Car Tracking",
    description: "Track where your car is – from purchase to delivery",
    icon: MapPin,
    href: routes.dashboardTracking,
    color: "cyan",
  },
  {
    title: "Payments",
    description: "View invoices and make payments for your orders",
    icon: TrendingUp,
    href: routes.dashboardPayments,
    color: "blue",
  },
  {
    title: "Browse Cars",
    description: "Explore our full vehicle inventory",
    icon: Car,
    href: routes.inventory,
    color: "gold",
  },
  {
    title: "Live Auctions",
    description: "Bid on vehicles directly in live auctions",
    icon: Gavel,
    href: routes.liveAuctions,
    color: "purple",
  },
  {
    title: "Account Settings",
    description: "Manage your profile and preferences",
    icon: Settings,
    href: routes.settings,
    color: "cyan",
  },
];

const colorClasses: Record<string, { icon: string; bg: string }> = {
  cyan: { icon: "text-cyan-500", bg: "bg-cyan-500/20" },
  blue: { icon: "text-blue-500", bg: "bg-blue-500/20" },
  gold: { icon: "text-amber-500", bg: "bg-amber-500/20" },
  green: { icon: "text-green-500", bg: "bg-green-500/20" },
  purple: { icon: "text-purple-500", bg: "bg-purple-500/20" },
};

const recentActivity = [
  {
    type: "Vehicle Saved",
    item: "2020 Toyota Land Cruiser",
    date: "2 days ago",
    icon: Heart,
  },
  {
    type: "Inquiry Sent",
    item: "2019 Honda CR-V",
    date: "5 days ago",
    icon: FileText,
  },
  {
    type: "Vehicle Imported",
    item: "2021 Nissan GT-R",
    date: "2 weeks ago",
    icon: Package,
  },
];

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-dark-950 to-dark-900 py-16 pt-20">
      <div className="container-custom">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-black text-white mb-2">Dashboard</h1>
            <p className="text-gray-400">Welcome back! Here's an overview of your account</p>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="card p-6"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + index * 0.1 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <stat.icon className={`h-6 w-6 text-${stat.color}-500`} />
                </div>
                <div className="text-2xl font-black text-white mb-1">{stat.value}</div>
                <div className="text-sm text-gray-400 uppercase tracking-wider">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Quick Actions */}
            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h2 className="text-2xl font-black text-white mb-6">Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {quickActions.map((action, index) => (
                  <Link
                    key={action.title}
                    href={action.href}
                    className="card p-6 group hover:bg-white/5 transition-colors"
                  >
                    <div className="flex items-start gap-4">
                      {(() => {
                        const Icon = action.icon;
                        const c = colorClasses[action.color] || colorClasses.cyan;
                        return (
                          <div className={`p-3 rounded-xl ${c.bg}`}>
                            <Icon className={`h-6 w-6 ${c.icon}`} />
                          </div>
                        );
                      })()}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-black text-white mb-1 group-hover:text-cyan-400 transition-colors">
                          {action.title}
                        </h3>
                        <p className="text-sm text-gray-400">{action.description}</p>
                      </div>
                      <ArrowRight className="h-5 w-5 text-gray-500 group-hover:translate-x-1 group-hover:text-cyan-400 transition-all" />
                    </div>
                  </Link>
                ))}
              </div>
            </motion.div>

            {/* Recent Activity */}
            <motion.div
              className="card p-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <h2 className="text-2xl font-black text-white mb-6">Recent Activity</h2>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => {
                  const ActIcon = activity.icon;
                  return (
                  <div key={index} className="flex items-start gap-4 pb-4 border-b border-white/10 last:border-0 last:pb-0">
                    <div className="p-2 rounded-lg bg-cyan-500/20">
                      <ActIcon className="h-4 w-4 text-cyan-500" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-semibold text-white mb-1">{activity.type}</div>
                      <div className="text-sm text-gray-400 mb-1">{activity.item}</div>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Clock className="h-3 w-3" />
                        {activity.date}
                      </div>
                    </div>
                  </div>
                );
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
