"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import CloudinaryUpload from "@/components/cloudinary/CloudinaryUpload";

export default function AddVehiclePage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    stockId: "",
    make: "",
    model: "",
    year: "",
    price: "",
    engine: "",
    transmission: "",
    mileage: "",
    color: "",
    grade: "",
    condition: "",
    location: "",
    description: "",
    images: [] as string[],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const handleImagesUpload = (urls: string[]) => {
    setFormData((prev) => ({ ...prev, images: urls }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const res = await fetch("/api/vehicles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          stockId: formData.stockId.trim(),
          make: formData.make,
          model: formData.model,
          year: formData.year ? parseInt(formData.year, 10) : 0,
          price: formData.price ? parseFloat(formData.price) : 0,
          mileage: formData.mileage ? parseInt(formData.mileage, 10) : 0,
          fuelType: formData.engine || "Petrol",
          transmission: formData.transmission || "Automatic",
          color: formData.color,
          condition: formData.condition || "Good",
          location: formData.location,
          auctionGrade: formData.grade || null,
          description: formData.description,
          images: formData.images,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error || "Failed to add vehicle");
        setSubmitting(false);
        return;
      }
      router.push("/admin/vehicles");
      router.refresh();
    } catch {
      setError("Something went wrong");
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <Link
        href="/admin/vehicles"
        className="inline-flex items-center gap-2 text-gray-600 hover:text-primary-600"
      >
        <ArrowLeft className="h-5 w-5" />
        Back to Vehicles
      </Link>

      <h1 className="text-3xl font-bold text-gray-900">Add New Vehicle</h1>

      <form onSubmit={handleSubmit} className="card p-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">Stock ID *</label>
            <input
              type="text"
              name="stockId"
              required
              value={formData.stockId}
              onChange={handleChange}
              className="input-field"
              placeholder="STK-2024-001"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">Make *</label>
            <select
              name="make"
              required
              value={formData.make}
              onChange={handleChange}
              className="input-field"
            >
              <option value="">Select Make</option>
              <option value="Toyota">Toyota</option>
              <option value="Nissan">Nissan</option>
              <option value="Honda">Honda</option>
              <option value="Mazda">Mazda</option>
              <option value="Subaru">Subaru</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">Model *</label>
            <input
              type="text"
              name="model"
              required
              value={formData.model}
              onChange={handleChange}
              className="input-field"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">Year *</label>
            <input
              type="number"
              name="year"
              required
              value={formData.year}
              onChange={handleChange}
              className="input-field"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">FOB Price (USD) *</label>
            <input
              type="number"
              name="price"
              required
              value={formData.price}
              onChange={handleChange}
              className="input-field"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">Engine *</label>
            <input
              type="text"
              name="engine"
              required
              value={formData.engine}
              onChange={handleChange}
              className="input-field"
              placeholder="2.8L Diesel"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">Transmission *</label>
            <select
              name="transmission"
              required
              value={formData.transmission}
              onChange={handleChange}
              className="input-field"
            >
              <option value="">Select</option>
              <option value="Automatic">Automatic</option>
              <option value="Manual">Manual</option>
              <option value="CVT">CVT</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">Mileage (km) *</label>
            <input
              type="number"
              name="mileage"
              required
              value={formData.mileage}
              onChange={handleChange}
              className="input-field"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">Color *</label>
            <input
              type="text"
              name="color"
              required
              value={formData.color}
              onChange={handleChange}
              className="input-field"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">Auction Grade *</label>
            <select
              name="grade"
              required
              value={formData.grade}
              onChange={handleChange}
              className="input-field"
            >
              <option value="">Select Grade</option>
              <option value="6">6 - Excellent</option>
              <option value="5">5 - Very Good</option>
              <option value="4.5">4.5 - Good</option>
              <option value="4">4 - Fair</option>
              <option value="3.5">3.5 - Below Average</option>
              <option value="3">3 - Poor</option>
              <option value="R">R - Repaired</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">Condition *</label>
            <select
              name="condition"
              required
              value={formData.condition}
              onChange={handleChange}
              className="input-field"
            >
              <option value="">Select</option>
              <option value="Excellent">Excellent</option>
              <option value="Very Good">Very Good</option>
              <option value="Good">Good</option>
              <option value="Fair">Fair</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">Location *</label>
            <select
              name="location"
              required
              value={formData.location}
              onChange={handleChange}
              className="input-field"
            >
              <option value="">Select Port</option>
              <option value="Yokohama Port">Yokohama Port</option>
              <option value="Kobe Port">Kobe Port</option>
              <option value="Osaka Port">Osaka Port</option>
              <option value="Nagoya Port">Nagoya Port</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">Description *</label>
          <textarea
            name="description"
            required
            rows={6}
            value={formData.description}
            onChange={handleChange}
            className="input-field"
            placeholder="Vehicle description..."
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">Vehicle Images (Cloudinary)</label>
          <CloudinaryUpload
            value={formData.images}
            onUpload={handleImagesUpload}
            folder="tradeware/vehicles"
            buttonLabel="Select Images"
            className="mt-1"
          />
        </div>

        {error && (
          <p className="text-red-600 text-sm">{error}</p>
        )}

        <div className="flex items-center gap-4 pt-6 border-t border-gray-200">
          <button type="submit" className="btn-primary" disabled={submitting}>
            {submitting ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin mr-2 inline" />
                Saving…
              </>
            ) : (
              "Add Vehicle"
            )}
          </button>
          <Link href="/admin/vehicles" className="btn-secondary">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
