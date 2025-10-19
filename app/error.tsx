"use client";

import { useEffect } from "react";
import { Button } from "./components/ui/button";
import { AlertCircle, RefreshCcw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="flex-grow flex items-center justify-center px-4 min-h-[60vh]">
      <div className="text-center max-w-lg">
        <div className="mb-6">
          <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
            <AlertCircle className="w-8 h-8 text-red-600" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-3">
            Something went wrong
          </h2>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-2">
            We encountered an unexpected error. Please try again.
          </p>
          {error.message && (
            <p className="text-xs text-gray-500 font-mono bg-gray-100 p-3 rounded-lg mt-4 break-all">
              {error.message}
            </p>
          )}
        </div>

        <Button onClick={reset} className="gap-2">
          <RefreshCcw className="w-4 h-4" />
          Try Again
        </Button>
      </div>
    </div>
  );
}
