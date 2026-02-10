import { Metadata } from "next";
import Link from "next/link";
import { Plus, Edit, Trash2 } from "lucide-react";
import { blogPosts } from "@/data/blog";

export const metadata: Metadata = {
  title: "Manage Blog | Tradeware Admin",
};

export default function BlogPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Blog Management</h1>
        <Link href="/admin/blog/add" className="btn-primary inline-flex items-center gap-2">
          <Plus className="h-5 w-5" />
          New Post
        </Link>
      </div>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900 uppercase">Title</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900 uppercase">Category</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900 uppercase">Author</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {blogPosts.map((post) => (
                <tr key={post.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{post.title}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{post.category}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{post.author}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{post.publishedAt}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/admin/blog/edit/${post.id}`}
                        className="p-2 text-gray-600 hover:text-primary-600"
                        title="Edit"
                      >
                        <Edit className="h-4 w-4" />
                      </Link>
                      <button
                        className="p-2 text-gray-600 hover:text-red-600"
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
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
