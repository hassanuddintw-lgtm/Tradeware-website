import { Metadata } from "next";
import { Settings, Edit } from "lucide-react";

export const metadata: Metadata = {
  title: "SEO Management | Tradeware Admin",
};

export default function SEOPage() {
  const seoPages = [
    { path: "/", title: "Home", metaTitle: "Tradeware - Premium Japanese Car Import Marketplace", metaDesc: "Import high-quality used Japanese vehicles..." },
    { path: "/inventory", title: "Inventory", metaTitle: "Vehicle Inventory - Browse Japanese Cars", metaDesc: "Browse our extensive inventory..." },
    { path: "/how-it-works", title: "How It Works", metaTitle: "How It Works - Import Process", metaDesc: "Learn how to import Japanese vehicles..." },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">SEO Meta Management</h1>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900 uppercase">Page</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900 uppercase">Meta Title</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900 uppercase">Meta Description</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {seoPages.map((page, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{page.title}</td>
                  <td className="px-6 py-4 text-sm text-gray-900 max-w-md truncate">{page.metaTitle}</td>
                  <td className="px-6 py-4 text-sm text-gray-600 max-w-md truncate">{page.metaDesc}</td>
                  <td className="px-6 py-4">
                    <button className="p-2 text-gray-600 hover:text-primary-600" title="Edit">
                      <Edit className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
