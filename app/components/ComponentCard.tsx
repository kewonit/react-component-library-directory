"use client";

import { Component } from "@/types";
import Image from "next/image";
import { useState, useEffect } from "react";
import { ExternalLink } from "lucide-react";

interface ComponentCardProps {
  component: Component;
}

export default function ComponentCard({ component }: ComponentCardProps) {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  const [cachedSrc, setCachedSrc] = useState<string | null>(null);

  // Simple in-memory cache of fetched image blobs -> object URLs.
  // This is process-lifetime only and intentionally simple.
  // It prevents re-fetch when users re-render the list during the session.
  useEffect(() => {
    let revoked = false;
    const cache: Map<string, string> = (globalThis as any).__COMPONENT_IMAGE_CACHE ||= new Map();

    async function ensureCached() {
      if (!component.image) return;
      if (cache.has(component.image)) {
        setCachedSrc(cache.get(component.image) || null);
        return;
      }

      try {
        const res = await fetch(component.image, { cache: "force-cache" });
        if (!res.ok) throw new Error("Failed to fetch image");
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        cache.set(component.image, url);
        if (!revoked) setCachedSrc(url);
      } catch (err) {
        // ignore and let the normal Image onError handle it
        console.error("Image cache fetch failed:", err);
      }
    }

    ensureCached();

    return () => {
      revoked = true;
    };
  }, [component.image]);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.open(component.website, "_blank", "noopener,noreferrer");
  };

  return (
    <article 
      className="group block cursor-pointer focus-within:ring-2 focus-within:ring-gray-900 focus-within:ring-offset-2 rounded-lg transition-all"
      onClick={handleClick}
    >
      <div className="relative bg-gray-50 hover:bg-gray-100 transition-colors duration-200 aspect-[420/230] rounded-lg overflow-hidden border border-gray-200/80 group-hover:border-gray-300 group-hover:shadow-sm">
        <div className="relative w-full h-full">
          {!imageError ? (
            <>
              {imageLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                  <div className="w-12 h-12 rounded-full bg-white/50 flex items-center justify-center">
                    <span className="text-2xl font-bold text-gray-400">
                      {component.name.charAt(0)}
                    </span>
                  </div>
                </div>
              )}
              {cachedSrc ? (
                // use native img when we have a cached object URL to avoid next/image refetch
                // but keep styling similar
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={cachedSrc}
                  alt={`${component.name} preview`}
                  className={`w-full h-full object-contain object-center p-4 transition-opacity duration-300 ${
                    imageLoading ? "opacity-0" : "opacity-100"
                  }`}
                  onLoad={() => setImageLoading(false)}
                  onError={() => {
                    setImageError(true);
                    setImageLoading(false);
                  }}
                />
              ) : (
                <Image
                  src={component.image}
                  alt={`${component.name} preview`}
                  fill
                  className={`object-contain object-center p-4 transition-opacity duration-300 ${
                    imageLoading ? "opacity-0" : "opacity-100"
                  }`}
                  onLoad={() => setImageLoading(false)}
                  onError={() => {
                    setImageError(true);
                    setImageLoading(false);
                  }}
                  sizes="(max-width: 475px) 100vw, (max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
              )}
            </>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
              <div className="text-center p-4">
                <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-white/50 flex items-center justify-center">
                  <span className="text-2xl font-bold text-gray-400">
                    {component.name.charAt(0)}
                  </span>
                </div>
                <p className="text-xs text-gray-500 font-medium">
                  {component.name}
                </p>
              </div>
            </div>
          )}
        </div>
        
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <div className="bg-white/90 backdrop-blur-sm rounded-full p-1.5 shadow-sm">
            <ExternalLink className="w-3.5 h-3.5 text-gray-700" />
          </div>
        </div>

        {/* removed featured badge per request */}
      </div>

      <div className="py-3 px-1">
        <h3 className="text-sm font-semibold text-gray-900 group-hover:text-gray-700 transition-colors line-clamp-1">
          {component.name}
        </h3>
        <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">
          {component.tags.length > 0
            ? component.tags.slice(0, 3).join(" · ")
            : "React library"}
        </p>
      </div>
    </article>
  );
}
