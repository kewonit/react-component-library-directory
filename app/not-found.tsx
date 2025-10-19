"use client";

import Link from "next/link";
import { Button } from "./components/ui/button";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        <div className="mb-6">
          <h1 className="text-7xl sm:text-8xl font-bold text-gray-900 mb-4 tracking-tight">
            404
          </h1>
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-3">
            Page Not Found
          </h2>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/">
            <Button className="w-full sm:w-auto">
              <Home className="w-4 h-4 mr-2" />
              Go Home
            </Button>
          </Link>
          <Button
            variant="outline"
            onClick={() => window.history.back()}
            className="w-full sm:w-auto"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
}
