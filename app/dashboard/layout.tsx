"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { useAuthContext } from "@/context/AuthContext";
import { routes } from "@/config/routes";
import { MapPin, CreditCard, Car, Gavel, Settings, User, LogOut } from "lucide-react";

const userNavItems = [
  { name: "Dashboard", href: routes.dashboard, icon: Car },
  { name: "My Car Tracking", href: routes.dashboardTracking, icon: MapPin },
  { name: "Payments", href: routes.dashboardPayments, icon: CreditCard },
  { name: "Browse Cars", href: routes.inventory, icon: Car },
  { name: "Live Auctions", href: routes.liveAuctions, icon: Gavel },
  { name: "Profile", href: routes.profile, icon: User },
  { name: "Settings", href: routes.settings, icon: Settings },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, isLoading, isAdmin, isApproved } = useAuthContext();

  useEffect(() => {
    if (isLoading) return;
    if (!user) {
      router.replace(routes.login);
      return;
    }
    if (isAdmin) {
      router.replace(routes.admin);
      return;
    }
    if (!isApproved && pathname !== routes.dashboardPending) {
      router.replace(routes.dashboardPending);
    }
  }, [user, isLoading, isAdmin, isApproved, pathname, router]);

  if (isLoading || !user || isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="w-10 h-10 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="border-b border-white/10 bg-black/80 backdrop-blur sticky top-0 z-30">
        <div className="container-custom py-4">
          <div className="flex items-center justify-between">
            <Link href={routes.dashboard} className="text-xl font-bold text-white">
              My Dashboard
            </Link>
            <div className="flex items-center gap-4">
              <span className="text-sm text-zinc-400">{user.name}</span>
              <span className="text-xs px-2 py-1 rounded bg-cyan-500/20 text-cyan-400 font-medium">
                User
              </span>
              <LogoutButton />
            </div>
          </div>
          {isApproved && (
            <nav className="flex flex-wrap gap-2 mt-4 -mb-4">
              {userNavItems.map((item) => {
                const Icon = item.icon;
                const active =
                  pathname === item.href ||
                  (item.href !== routes.dashboard && pathname.startsWith(item.href));
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      active ? "bg-cyan-500/20 text-cyan-400" : "text-zinc-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          )}
        </div>
      </div>
      <div className="container-custom py-8">{children}</div>
    </div>
  );
}

function LogoutButton() {
  const { logout } = useAuthContext();
  const router = useRouter();
  return (
    <button
      type="button"
      onClick={() => {
        logout();
        router.replace(routes.home);
        router.refresh();
      }}
      className="flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 text-zinc-400 hover:text-white hover:border-white/20 transition-colors text-sm cursor-pointer"
    >
      <LogOut className="h-4 w-4" />
      Logout
    </button>
  );
}
