"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import CloudinaryUpload from "@/components/cloudinary/CloudinaryUpload";
import { getToken } from "@/lib/api-client";

export default function EditVehiclePage() {
  const router = useRouter();
  const params = useParams();
  const id = String(params?.id ?? "");
  const [loading, setLoading] = useState(true);
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
    destinationSlug: "",
    description: "",
    images: [] as string[],
  });

  const destinationOptions = [
    { value: "", label: "— Don't show in Global Stock" },
    { value: "uk", label: "UK" },
    { value: "zambia", label: "Zambia" },
    { value: "zimbabwe", label: "Zimbabwe" },
    { value: "tanzania", label: "Tanzania" },
    { value: "kenya", label: "Kenya" },
    { value: "ireland", label: "Ireland" },
    { value: "jamaica", label: "Jamaica" },
  ];

  useEffect(() => {
    if (!id) return;
    fetch(`/api/vehicles/${id}`)
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error("Not found"))))
      .then((v) => {
        setFormData({
          stockId: v.stockId ?? "",
          make: v.make ?? "",
          model: v.model ?? "",
          year: String(v.year ?? ""),
          price: String(v.price ?? ""),
          engine: v.fuelType ?? "",
          transmission: v.transmission ?? "",
          mileage: String(v.mileage ?? ""),
          color: v.color ?? "",
          grade: v.auctionGrade ?? "",
          condition: v.condition ?? "",
          location: v.location ?? "",
          destinationSlug: v.destinationSlug ?? "",
          description: v.description ?? "",
          images: Array.isArray(v.images) ? v.images : [],
        });
      })
      .catch(() => setError("Vehicle not found"))
      .finally(() => setLoading(false));
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
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
      const token = getToken();
      const res = await fetch(`/api/vehicles/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          stockId: formData.stockId.trim(),
          make: formData.make,
          model: formData.model,
          year: formData.year ? parseInt(formData.year, 10) : undefined,
          price: formData.price ? parseFloat(formData.price) : undefined,
          mileage: formData.mileage ? parseInt(formData.mileage, 10) : undefined,
          fuelType: formData.engine || "Petrol",
          transmission: formData.transmission || "Automatic",
          color: formData.color,
          condition: formData.condition || "Good",
          location: formData.location,
          destinationSlug: formData.destinationSlug?.trim() || null,
          auctionGrade: formData.grade || null,
          description: formData.description,
          images: formData.images,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error || "Failed to update");
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

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 className="h-8 w-8 animate-spin text-red-600" />
      </div>
    );
  }

  if (error && !formData.stockId) {
    return (
      <div className="space-y-4">
        <Link href="/admin/vehicles" className="inline-flex items-center gap-2 text-gray-600 hover:text-red-600">
          <ArrowLeft className="h-5 w-5" />
          Back to Vehicles
        </Link>
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Link
        href="/admin/vehicles"
        className="inline-flex items-center gap-2 text-gray-600 hover:text-primary-600"
      >
        <ArrowLeft className="h-5 w-5" />
        Back to Vehicles
      </Link>

      <h1 className="text-3xl font-bold text-gray-900">Edit Vehicle</h1>

      <form onSubmit={handleSubmit} className="card p-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">Stock ID *</label>
            <input type="text" name="stockId" required value={formData.stockId} onChange={handleChange} className="input-field" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">Make *</label>
            <select name="make" required value={formData.make} onChange={handleChange} className="input-field">
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
            <input type="text" name="model" required value={formData.model} onChange={handleChange} className="input-field" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">Year *</label>
            <input type="number" name="year" required value={formData.year} onChange={handleChange} className="input-field" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">Price (USD) *</label>
            <input type="number" name="price" required value={formData.price} onChange={handleChange} className="input-field" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">Engine</label>
            <input type="text" name="engine" value={formData.engine} onChange={handleChange} className="input-field" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">Transmission</label>
            <select name="transmission" value={formData.transmission} onChange={handleChange} className="input-field">
              <option value="Automatic">Automatic</option>
              <option value="Manual">Manual</option>
              <option value="CVT">CVT</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">Mileage (km)</label>
            <input type="number" name="mileage" value={formData.mileage} onChange={handleChange} className="input-field" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">Color</label>
            <input type="text" name="color" value={formData.color} onChange={handleChange} className="input-field" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">Auction Grade</label>
            <select name="grade" value={formData.grade} onChange={handleChange} className="input-field">
              <option value="">—</option>
              <option value="6">6</option>
              <option value="5">5</option>
              <option value="4.5">4.5</option>
              <option value="4">4</option>
              <option value="3.5">3.5</option>
              <option value="3">3</option>
              <option value="R">R</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">Condition</label>
            <select name="condition" value={formData.condition} onChange={handleChange} className="input-field">
              <option value="Excellent">Excellent</option>
              <option value="Very Good">Very Good</option>
              <option value="Good">Good</option>
              <option value="Fair">Fair</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">Location</label>
            <select name="location" value={formData.location} onChange={handleChange} className="input-field">
              <option value="Yokohama Port">Yokohama Port</option>
              <option value="Kobe Port">Kobe Port</option>
              <option value="Osaka Port">Osaka Port</option>
              <option value="Nagoya Port">Nagoya Port</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">Display under country (Explore Global Stock)</label>
            <select name="destinationSlug" value={formData.destinationSlug} onChange={handleChange} className="input-field">
              {destinationOptions.map((o) => (
                <option key={o.value || "none"} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">Description</label>
          <textarea name="description" rows={4} value={formData.description} onChange={handleChange} className="input-field" />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">Images</label>
          <CloudinaryUpload value={formData.images} onUpload={handleImagesUpload} folder="tradeware/vehicles" buttonLabel="Add more images" className="mt-1" />
        </div>

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <div className="flex items-center gap-4 pt-6 border-t border-gray-200">
          <button type="submit" className="btn-primary" disabled={submitting}>
            {submitting ? <><Loader2 className="h-5 w-5 animate-spin mr-2 inline" />Saving…</> : "Update Vehicle"}
          </button>
          <Link href="/admin/vehicles" className="btn-secondary">Cancel</Link>
        </div>
      </form>
    </div>
  );
}
