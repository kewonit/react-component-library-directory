"use client";

import { useState, useEffect, useMemo } from "react";
import { components, categories } from "@/lib/components-data";
import ComponentCard from "./components/ComponentCard";
import { Library, Search } from "lucide-react";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isSearching, setIsSearching] = useState(false);

  const filteredComponents = useMemo(() => {
    let filtered = [...components];

    if (selectedCategory && selectedCategory !== "all") {
      filtered = filtered.filter((c) => c.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(
        (c) =>
          c.name.toLowerCase().includes(query) ||
          c.description.toLowerCase().includes(query) ||
          c.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    return filtered;
  }, [selectedCategory, searchQuery]);

  useEffect(() => {
    if (searchQuery.trim()) {
      setIsSearching(true);
      const timer = setTimeout(() => setIsSearching(false), 300);
      return () => clearTimeout(timer);
    } else {
      setIsSearching(false);
    }
  }, [searchQuery]);

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setSearchQuery("");
  };

  const getCategoryCount = (categoryId: string) => {
    if (categoryId === "all") return components.length;
    return components.filter((c) => c.category === categoryId).length;
  };

  return (
    <main className="flex-grow w-full">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid relative">
          <div className="h-8 sm:h-12"></div>

          <div className="grid gap-3 py-6 sm:py-8">
            <div className="font-mono text-[10px] sm:text-xs uppercase text-gray-500 tracking-widest font-medium">
              Discover, compare, choose
            </div>

            <div className="grid gap-4 sm:gap-6">
              <h1 className="tracking-tighter text-gray-900 text-balance text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.1]">
                The ultimate directory of React component libraries.
              </h1>
              <p className="text-gray-600 max-w-[65ch] text-sm sm:text-base leading-relaxed">
                Explore the best React component libraries for your next
                project. From UI frameworks to animation libraries, find the
                perfect tools to build faster.
              </p>
            </div>
          </div>

          <div className="h-6 sm:h-10"></div>

          <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-lg -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-4 border-y border-gray-200/80">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 sm:items-center sm:justify-between">
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => {
                  const count = getCategoryCount(category.id);
                  if (count === 0 && category.id !== "all") return null;

                  return (
                    <button
                      key={category.id}
                      onClick={() => handleCategoryClick(category.id)}
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium transition-all duration-200 ${selectedCategory === category.id
                          ? "bg-gray-900 text-white shadow-sm"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900"
                        }`}
                      aria-pressed={selectedCategory === category.id}
                    >
                      {category.name}
                      {count > 0 && (
                        <span
                          className={`text-[10px] sm:text-xs tabular-nums ${selectedCategory === category.id
                              ? "text-white/70"
                              : "text-gray-500"
                            }`}
                        >
                          {count}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search libraries..."
                  className="w-full h-9 pl-9 pr-3 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all placeholder:text-gray-400"
                  aria-label="Search libraries"
                />
              </div>
            </div>
          </div>

          <div className="h-6 sm:h-8"></div>

          {filteredComponents.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 sm:py-24">
              <div className="w-14 h-14 sm:w-16 sm:h-16 mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <Library className="w-7 h-7 sm:w-8 sm:h-8 text-gray-400" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
                No libraries found
              </h3>
              <p className="text-sm text-gray-500 text-center max-w-sm mb-6">
                {searchQuery.trim()
                  ? `No results for "${searchQuery}". Try a different search term.`
                  : "No component libraries match your current filters."}
              </p>
              {(searchQuery.trim() || selectedCategory !== "all") && (
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("all");
                  }}
                  className="text-sm font-medium text-gray-900 hover:text-gray-700 transition-colors"
                >
                  Clear filters
                </button>
              )}
            </div>
          ) : (
            <>
              <div
                className={`grid grid-cols-1 min-[475px]:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 transition-opacity duration-200 ${isSearching ? "opacity-50" : "opacity-100"
                  }`}
              >
                {filteredComponents.map((component) => (
                  <ComponentCard key={component.id} component={component} />
                ))}
              </div>

              {filteredComponents.length > 0 && (
                <div className="mt-4 sm:mt-6 py-6 sm:py-8 text-center">
                  <p className="text-xs sm:text-sm text-gray-500">
                    Showing {filteredComponents.length} of {components.length}{" "}
                    {filteredComponents.length === 1 ? "library" : "libraries"}
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </main>
  );
}
