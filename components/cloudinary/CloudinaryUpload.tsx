"use client";

import { useCallback, useEffect, useState } from "react";
import Script from "next/script";
import { Upload, ImageIcon } from "lucide-react";

const WIDGET_SCRIPT = "https://widget.cloudinary.com/v2.0/global/all.js";

declare global {
  interface Window {
    cloudinary?: {
      openUploadWidget: (
        options: Record<string, unknown>,
        callback: (error: unknown, result: { event: string; info?: { files?: Array<{ uploadInfo?: { secure_url?: string } }> } }) => void
      ) => { open: () => void; close: () => void };
    };
  }
}

export interface CloudinaryUploadProps {
  /** Called with array of secure_url strings after each successful upload batch */
  onUpload: (urls: string[]) => void;
  /** Already uploaded URLs to show as thumbnails */
  value?: string[];
  /** Optional folder in Cloudinary */
  folder?: string;
  /** Max files per open (default many) */
  maxFiles?: number;
  /** Button/label text */
  buttonLabel?: string;
  /** Optional class for the container */
  className?: string;
}

export default function CloudinaryUpload({
  onUpload,
  value = [],
  folder = "tradeware/vehicles",
  maxFiles = 20,
  buttonLabel = "Upload images",
  className = "",
}: CloudinaryUploadProps) {
  const [scriptReady, setScriptReady] = useState(false);

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY;

  const getSignature = useCallback(async () => {
    const res = await fetch("/api/upload/sign", { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to get upload signature");
    return res.json() as Promise<{ signature: string; timestamp: number }>;
  }, []);

  const openWidget = useCallback(() => {
    if (!scriptReady || !window.cloudinary || !cloudName || !apiKey) {
      if (!cloudName || !apiKey) {
        alert("Cloudinary is not configured. Add NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME and API_KEY to .env");
        return;
      }
      alert("Upload widget is still loading. Try again in a moment.");
      return;
    }

    const options: Record<string, unknown> = {
      cloudName,
      apiKey,
      uploadSignature: getSignature,
      folder,
      maxFiles,
      multiple: true,
      resourceType: "image",
      clientAllowedFormats: ["jpg", "jpeg", "png", "webp", "gif"],
    };

    window.cloudinary.openUploadWidget(options, (err, result) => {
      if (err) return;
      if (result?.event === "success" && result.info?.files?.length) {
        const urls = result.info.files
          .map((f) => f.uploadInfo?.secure_url)
          .filter((u): u is string => Boolean(u));
        if (urls.length) onUpload([...value, ...urls]);
      }
    });
  }, [scriptReady, cloudName, apiKey, getSignature, folder, maxFiles, onUpload, value]);

  useEffect(() => {
    if (typeof window !== "undefined" && window.cloudinary) setScriptReady(true);
  }, []);

  return (
    <>
      <Script
        src={WIDGET_SCRIPT}
        strategy="afterInteractive"
        onLoad={() => setScriptReady(true)}
      />
      <div className={className}>
        {value.length > 0 && (
          <div className="mb-3 flex flex-wrap gap-2">
            {value.map((url, i) => (
              <div
                key={`${url}-${i}`}
                className="relative h-16 w-16 rounded-lg border border-gray-300 bg-gray-100 overflow-hidden"
              >
                <img
                  src={url}
                  alt=""
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
        )}
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 md:p-8 text-center">
          <Upload className="h-10 w-10 md:h-12 md:w-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-600 mb-1">Upload to Cloudinary</p>
          <p className="text-sm text-gray-500 mb-4">PNG, JPG, WebP up to 10MB each</p>
          <button
            type="button"
            onClick={openWidget}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-700 text-white text-sm font-semibold transition-colors"
          >
            <ImageIcon className="h-4 w-4" />
            {buttonLabel}
          </button>
        </div>
      </div>
    </>
  );
}
