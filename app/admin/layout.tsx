"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  Car,
  FileText,
  DollarSign,
  LogOut,
  BarChart3,
  Settings,
  Users,
  Gavel,
  Globe,
  MessageSquare,
  HelpCircle,
  Type,
} from "lucide-react";
import { useAuthContext } from "@/context/AuthContext";
import { routes } from "@/config/routes";

const navItems = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Users", href: "/admin/users", icon: Users },
  { name: "Vehicles", href: "/admin/vehicles", icon: Car },
  { name: "Auctions", href: "/admin/auctions", icon: Gavel },
  { name: "Japan Auctions", href: "/admin/japan-auctions", icon: Gavel },
  { name: "Site Settings", href: "/admin/settings", icon: Settings },
  { name: "Page Content", href: "/admin/content", icon: Type },
  { name: "FAQ", href: "/admin/faq", icon: HelpCircle },
  { name: "Testimonials", href: "/admin/testimonials", icon: MessageSquare },
  { name: "SEO", href: "/admin/seo", icon: Globe },
  { name: "Blog", href: "/admin/blog", icon: FileText },
  { name: "Pricing", href: "/admin/pricing", icon: DollarSign },
  { name: "Inquiries", href: "/admin/inquiries", icon: BarChart3 },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, isLoading, isAdmin, logout } = useAuthContext();

  useEffect(() => {
    if (isLoading) return;
    if (!user) {
      router.replace(routes.login);
      return;
    }
    if (!isAdmin) {
      router.replace(routes.dashboard);
    }
  }, [user, isLoading, isAdmin, router]);

  const handleLogout = () => {
    logout();
    router.replace(routes.login);
    router.refresh();
  };

  if (isLoading || !user || !isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <aside className="fixed left-0 top-0 h-full w-64 bg-gray-900 text-white z-40">
        <div className="p-6 border-b border-gray-800">
          <Link href="/admin" className="text-2xl font-bold">
            Tradeware Admin
          </Link>
        </div>
        <nav className="p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  active ? "bg-cyan-500/20 text-cyan-400" : "hover:bg-gray-800"
                }`}
              >
                <Icon className="h-5 w-5" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-800">
          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors w-full text-left cursor-pointer"
          >
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      <div className="ml-64">
        <header className="bg-white border-b border-gray-200 px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Admin Panel</h1>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">{user.name}</span>
              <span className="text-xs px-2 py-1 rounded bg-cyan-500/20 text-cyan-600 font-medium">
                Admin
              </span>
            </div>
          </div>
        </header>
        <main className="p-8">{children}</main>
      </div>
    </div>
  );
}
