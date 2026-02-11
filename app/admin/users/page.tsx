"use client";

import { useState, useEffect } from "react";
import { api } from "@/lib/api-client";
import { useAuthContext } from "@/context/AuthContext";
import { CheckCircle, Loader2, UserCheck, Shield } from "lucide-react";

const ROLES = ["super_admin", "admin", "staff", "client"] as const;

interface UserRow {
  id: string;
  name: string;
  email: string;
  role: string;
  status?: "pending" | "approved";
  createdAt: string;
}

function roleLabel(r: string): string {
  switch (r) {
    case "super_admin": return "Super Admin";
    case "admin": return "Admin";
    case "staff": return "Staff";
    case "client":
    case "user": return "Client";
    default: return r;
  }
}

export default function AdminUsersPage() {
  const { user: me } = useAuthContext();
  const [users, setUsers] = useState<UserRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [approvingId, setApprovingId] = useState<string | null>(null);
  const [roleUpdatingId, setRoleUpdatingId] = useState<string | null>(null);

  useEffect(() => {
    api<{ data: UserRow[] }>("/api/admin/users")
      .then((res) => setUsers(res.data ?? []))
      .catch(() => setUsers([]))
      .finally(() => setLoading(false));
  }, []);

  const canAssignRole = me?.role === "super_admin";

  const handleApprove = async (id: string) => {
    setApprovingId(id);
    try {
      await api<{ success: boolean }>(`/api/admin/users/${id}/approve`, { method: "PATCH" });
      setUsers((prev) =>
        prev.map((u) => (u.id === id ? { ...u, status: "approved" as const } : u))
      );
    } catch {
      // keep UI as is on error
    } finally {
      setApprovingId(null);
    }
  };

  const handleRoleChange = async (userId: string, newRole: string) => {
    setRoleUpdatingId(userId);
    try {
      await api<{ success: boolean }>(`/api/admin/users/${userId}/role`, {
        method: "PATCH",
        body: JSON.stringify({ role: newRole }),
      });
      setUsers((prev) =>
        prev.map((u) => (u.id === userId ? { ...u, role: newRole, status: newRole === "client" ? u.status : undefined } : u))
      );
    } catch {
      // keep UI as is on error
    } finally {
      setRoleUpdatingId(null);
    }
  };

  const isClient = (u: UserRow) => u.role === "client" || u.role === "user";
  const pending = users.filter((u) => isClient(u) && u.status === "pending");
  const approved = users.filter((u) => isClient(u) && u.status === "approved");
  const staffAdmins = users.filter((u) => ["super_admin", "admin", "staff"].includes(u.role));

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 className="h-8 w-8 animate-spin text-cyan-600" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
        <p className="text-gray-600 mt-1">
          Approve clients and assign roles. Only Super Admin can change roles (Super Admin, Admin, Staff, Client). Clients get access to bidding and tracking after approval.
        </p>
      </div>

      {/* Pending */}
      <div className="card p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <UserCheck className="h-5 w-5 text-amber-500" />
          Pending approval ({pending.length})
        </h2>
        {pending.length === 0 ? (
          <p className="text-gray-500 text-sm">No users waiting for approval.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 text-left text-gray-600">
                  <th className="pb-3 font-medium">Name</th>
                  <th className="pb-3 font-medium">Email</th>
                  <th className="pb-3 font-medium">Registered</th>
                  <th className="pb-3 font-medium text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {pending.map((u) => (
                  <tr key={u.id} className="border-b border-gray-100">
                    <td className="py-3 font-medium text-gray-900">{u.name}</td>
                    <td className="py-3 text-gray-600">{u.email}</td>
                    <td className="py-3 text-gray-500">
                      {new Date(u.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-3 text-right">
                      <button
                        type="button"
                        onClick={() => handleApprove(u.id)}
                        disabled={approvingId === u.id}
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-cyan-600 text-white text-sm font-medium hover:bg-cyan-700 disabled:opacity-50"
                      >
                        {approvingId === u.id ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <CheckCircle className="h-4 w-4" />
                        )}
                        Approve
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Approved clients */}
      <div className="card p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <CheckCircle className="h-5 w-5 text-green-500" />
          Approved clients ({approved.length})
        </h2>
        {approved.length === 0 ? (
          <p className="text-gray-500 text-sm">No approved clients yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 text-left text-gray-600">
                  <th className="pb-3 font-medium">Name</th>
                  <th className="pb-3 font-medium">Email</th>
                  <th className="pb-3 font-medium">Registered</th>
                  {canAssignRole && <th className="pb-3 font-medium text-right">Change role</th>}
                </tr>
              </thead>
              <tbody>
                {approved.map((u) => (
                  <tr key={u.id} className="border-b border-gray-100">
                    <td className="py-3 font-medium text-gray-900">{u.name}</td>
                    <td className="py-3 text-gray-600">{u.email}</td>
                    <td className="py-3 text-gray-500">
                      {new Date(u.createdAt).toLocaleDateString()}
                    </td>
                    {canAssignRole && (
                      <td className="py-3 text-right">
                        <select
                          value={u.role === "user" ? "client" : u.role}
                          disabled={roleUpdatingId === u.id}
                          onChange={(e) => handleRoleChange(u.id, e.target.value)}
                          className="text-sm border border-gray-300 rounded-lg px-2 py-1.5 bg-white"
                        >
                          {ROLES.map((r) => (
                            <option key={r} value={r} disabled={me?.role === "admin" && r === "super_admin"}>
                              {roleLabel(r)}
                            </option>
                          ))}
                        </select>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Staff & Admins */}
      <div className="card p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Shield className="h-5 w-5 text-cyan-600" />
          Staff & Admins ({staffAdmins.length})
        </h2>
        {staffAdmins.length === 0 ? (
          <p className="text-gray-500 text-sm">No staff or admins yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 text-left text-gray-600">
                  <th className="pb-3 font-medium">Name</th>
                  <th className="pb-3 font-medium">Email</th>
                  <th className="pb-3 font-medium">Role</th>
                  {canAssignRole && <th className="pb-3 font-medium text-right">Action</th>}
                </tr>
              </thead>
              <tbody>
                {staffAdmins.map((u) => (
                  <tr key={u.id} className="border-b border-gray-100">
                    <td className="py-3 font-medium text-gray-900">{u.name}</td>
                    <td className="py-3 text-gray-600">{u.email}</td>
                    <td className="py-3">
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                        u.role === "super_admin" ? "bg-amber-100 text-amber-700" :
                        u.role === "admin" ? "bg-cyan-100 text-cyan-700" : "bg-gray-100 text-gray-700"
                      }`}>
                        {roleLabel(u.role)}
                      </span>
                    </td>
                    {canAssignRole && (
                      <td className="py-3 text-right">
                        {u.id === me?.id ? (
                          <span className="text-gray-400 text-xs">(you)</span>
                        ) : (
                          <select
                            value={u.role}
                            disabled={roleUpdatingId === u.id || (me?.role === "admin" && u.role === "super_admin")}
                            onChange={(e) => handleRoleChange(u.id, e.target.value)}
                            className="text-sm border border-gray-300 rounded-lg px-2 py-1.5 bg-white"
                          >
                            {ROLES.map((r) => (
                              <option key={r} value={r} disabled={me?.role === "admin" && r === "super_admin"}>
                                {roleLabel(r)}
                              </option>
                            ))}
                          </select>
                        )}
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
}
