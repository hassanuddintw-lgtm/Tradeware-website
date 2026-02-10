"use client";

import { useState, useEffect } from "react";
import { Eye, Mail, Phone, Loader2 } from "lucide-react";
import { api } from "@/lib/api-client";

interface InquiryRow {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  vehicleId: string | null;
  subject: string | null;
  message: string;
  status: string;
  createdAt: string;
}

export default function InquiriesPage() {
  const [inquiries, setInquiries] = useState<InquiryRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api<InquiryRow[]>("/api/inquiries")
      .then((data) => setInquiries(Array.isArray(data) ? data : (data as { data?: InquiryRow[] })?.data ?? []))
      .catch((e) => setError(e instanceof Error ? e.message : "Failed to load inquiries"))
      .finally(() => setLoading(false));
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new":
        return "bg-blue-100 text-blue-700";
      case "contacted":
        return "bg-yellow-100 text-yellow-700";
      case "resolved":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const formatDate = (d: string) => {
    try {
      const date = new Date(d);
      return date.toLocaleDateString(undefined, { dateStyle: "short" });
    } catch {
      return d;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2 className="h-8 w-8 animate-spin text-cyan-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Customer Inquiries</h1>

      {error && (
        <p className="text-red-600">{error}</p>
      )}

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900 uppercase">Name</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900 uppercase">Contact</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900 uppercase">Subject</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {inquiries.length === 0 && !error ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                    No inquiries yet.
                  </td>
                </tr>
              ) : (
                inquiries.map((inquiry) => (
                  <tr key={inquiry.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-600">{formatDate(inquiry.createdAt)}</td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{inquiry.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 shrink-0" />
                          <span>{inquiry.email}</span>
                        </div>
                        {inquiry.phone && (
                          <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4 shrink-0" />
                            <span>{inquiry.phone}</span>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {inquiry.subject || "—"}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(inquiry.status)}`}>
                        {inquiry.status.charAt(0).toUpperCase() + inquiry.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        type="button"
                        className="p-2 text-gray-600 hover:text-primary-600"
                        title={inquiry.message}
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
