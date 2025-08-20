"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, X } from "lucide-react";

interface SearchFilterProps {
  onSearch: (query: string) => void;
  onFilterChange: (filters: string[]) => void;
  categories: string[];
  activeFilters: string[];
}

export default function SearchFilter({
  onSearch,
  onFilterChange,
  categories,
  activeFilters,
}: SearchFilterProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  const handleFilterToggle = (category: string) => {
    if (activeFilters.includes(category)) {
      onFilterChange(activeFilters.filter((f) => f !== category));
    } else {
      onFilterChange([...activeFilters, category]);
    }
  };

  const clearAllFilters = () => {
    onFilterChange([]);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <Input
          type="text"
          placeholder="Search for books, authors, or subjects..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          className="pl-10 pr-4 py-3 text-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-xl transition-all duration-200"
        />
        <Button
          onClick={handleSearch}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
        >
          Search
        </Button>
      </div>

      {/* Filter Categories */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5 text-gray-600" />
          <h3 className="text-lg font-semibold text-gray-900">
            Filter by Category
          </h3>
          {activeFilters.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="h-4 w-4 mr-1" />
              Clear All
            </Button>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Badge
              key={category}
              onClick={() => handleFilterToggle(category)}
              className={`cursor-pointer transition-all duration-200 px-4 py-2 text-sm font-medium ${
                activeFilters.includes(category)
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {category}
            </Badge>
          ))}
        </div>
      </div>

      {/* Active Filters Display */}
      {activeFilters.length > 0 && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="flex flex-wrap gap-2"
        >
          <span className="text-sm text-gray-600 font-medium">
            Active filters:
          </span>
          {activeFilters.map((filter) => (
            <Badge
              key={filter}
              variant="secondary"
              className="bg-blue-100 text-blue-800 px-3 py-1"
            >
              {filter}
            </Badge>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
}
