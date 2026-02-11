"use client";

import { useState, useEffect } from "react";
import { Car, Users, DollarSign, TrendingUp, FileText, Gavel, Loader2, UserCheck, Shield } from "lucide-react";
import Link from "next/link";
import { api } from "@/lib/api-client";

interface DashboardData {
  overview?: {
    users?: { total: number; active: number };
    cars?: { total: number; available: number };
    auctions?: { total: number; live: number };
    bids?: { total: number };
    revenue?: { total: number };
  };
  recentActivity?: {
    users?: Array<{ name: string; email: string }>;
    auctions?: Array<{ title: string; status: string; currentBid: number }>;
  };
}

interface UserRow {
  id: string;
  name: string;
  email: string;
  role: string;
  status?: "pending" | "approved";
}

export default function AdminDashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [userList, setUserList] = useState<UserRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api<{ data: DashboardData }>("/api/admin/dashboard")
      .then((res) => {
        const r = res as { data?: DashboardData } & Partial<DashboardData>;
        const dashboard: DashboardData | null = r.data ?? ("overview" in r ? (r as DashboardData) : null);
        setData(dashboard);
      })
      .catch(() => setData(null));
  }, []);

  useEffect(() => {
    api<{ data: UserRow[] }>("/api/admin/users")
      .then((res) => setUserList(res.data ?? []))
      .catch(() => setUserList([]))
      .finally(() => setLoading(false));
  }, []);

  const pendingCount = userList.filter((u) => (u.role === "client" || u.role === "user") && u.status === "pending").length;

  const o = data?.overview;
  const stats = [
    { label: "Total Users", value: o?.users?.total ?? "—", icon: Users, color: "bg-blue-500" },
    { label: "Total Vehicles", value: o?.cars?.total ?? "—", icon: Car, color: "bg-green-500" },
    { label: "Live Auctions", value: o?.auctions?.live ?? "—", icon: Gavel, color: "bg-yellow-500" },
    { label: "Total Revenue", value: o?.revenue?.total != null ? `$${Number(o.revenue.total).toLocaleString()}` : "—", icon: DollarSign, color: "bg-purple-500" },
  ];

  const recentUsers = data?.recentActivity?.users ?? [];
  const recentAuctions = data?.recentActivity?.auctions ?? [];

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 className="h-8 w-8 animate-spin text-cyan-600" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Main admin: approve new users to give them access (Live Auctions, Car Tracking, Payments) */}
      <div className="card p-6 border-2 border-amber-200 bg-amber-50/50">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-amber-500/20">
              <UserCheck className="h-8 w-8 text-amber-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                User approval
                <span className="text-sm font-normal text-gray-600">(only you can give access)</span>
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                New users get limited access only after you approve: Live Auctions (bid), Car Tracking, Payments.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {pendingCount > 0 && (
              <span className="px-4 py-2 rounded-lg bg-amber-200 text-amber-800 font-semibold">
                {pendingCount} pending
              </span>
            )}
            <Link
              href="/admin/users"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-cyan-600 text-white font-semibold hover:bg-cyan-700"
            >
              <Shield className="h-5 w-5" />
              Manage & approve users
            </Link>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="card p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <TrendingUp className="h-5 w-5 text-green-500" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="card p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Recent Users</h2>
            <Link href="/admin/users" className="text-sm text-cyan-600 hover:text-cyan-700">
              View All
            </Link>
          </div>
          <div className="space-y-4">
            {recentUsers.length > 0 ? (
              recentUsers.map((u, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-semibold text-gray-900">{u.name}</div>
                    <div className="text-sm text-gray-600">{u.email}</div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm">No users yet</p>
            )}
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Recent Auctions</h2>
            <Link href="/admin/auctions" className="text-sm text-cyan-600 hover:text-cyan-700">
              View All
            </Link>
          </div>
          <div className="space-y-4">
            {recentAuctions.length > 0 ? (
              recentAuctions.map((a, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-semibold text-gray-900">{a.title}</div>
                    <div className="text-sm text-gray-600">${a.currentBid?.toLocaleString() ?? 0}</div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    a.status === "live" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"
                  }`}>
                    {a.status}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm">No auctions yet</p>
            )}
          </div>
        </div>
      </div>

      <div className="card p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/admin/vehicles/add" className="btn-primary text-center">
            Add New Vehicle
          </Link>
          <Link href="/admin/auctions/create" className="btn-primary text-center">
            Create Auction
          </Link>
          <Link href="/admin/settings" className="btn-secondary text-center">
            Site Settings
          </Link>
          <Link href="/admin/content" className="btn-secondary text-center">
            Page Content
          </Link>
          <Link href="/admin/faq" className="btn-secondary text-center">
            Edit FAQ
          </Link>
          <Link href="/admin/inquiries" className="btn-secondary text-center">
            Inquiries
          </Link>
        </div>
      </div>
    </div>
  );
}
