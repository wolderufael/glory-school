"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Star, Users, Clock, TrendingUp } from "lucide-react";

// Import our components
import BookCard from "./book-card";
import SearchFilter from "./search-filter";
import FeaturedBooks from "./featured-books";
import NewReleases from "./new-releases";
import ReadingProgress from "./reading-progress";
import CategoriesSection from "./categories-section";

export default function ELibraryDemo() {
  const [activeTab, setActiveTab] = useState("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const demoBooks = [
    {
      id: "1",
      title: "Advanced Mathematics for High School",
      author: "Dr. Sarah Johnson",
      coverImage: "/api/placeholder/300/400/3B82F6/FFFFFF?text=Advanced+Math",
      rating: 4.8,
      downloads: 1250,
      pages: 450,
      category: "Mathematics",
      isNew: true,
      isPopular: true,
    },
    {
      id: "2",
      title: "Physics Fundamentals",
      author: "Prof. Michael Chen123",
      coverImage: "physics-fundamentals.jpeg",
      rating: 4.6,
      downloads: 890,
      pages: 380,
      category: "Science",
      isPopular: true,
    },
    {
      id: "3",
      title: "World Literature Classics",
      author: "Dr. Emily Rodriguez",
      coverImage: "/api/placeholder/300/400/F59E0B/FFFFFF?text=Literature",
      rating: 4.7,
      downloads: 1100,
      pages: 520,
      category: "Literature",
      isNew: true,
    },
  ];

  const demoNewReleases = [
    {
      id: "4",
      title: "Chemistry Lab Manual",
      author: "Lab Sciences Institute",
      coverImage: "/api/placeholder/200/250/EF4444/FFFFFF?text=Chemistry",
      rating: 4.9,
      downloads: 2100,
      pages: 280,
      category: "Science",
      isTop10: true,
    },
    {
      id: "5",
      title: "History of Art",
      author: "Art History Society",
      coverImage: "/api/placeholder/200/250/8B5CF6/FFFFFF?text=Art+History",
      rating: 4.5,
      downloads: 890,
      pages: 320,
      category: "Arts",
      isKnigoChoice: true,
    },
    {
      id: "6",
      title: "Computer Programming Basics",
      author: "Tech Education",
      coverImage: "/api/placeholder/200/250/06B6D4/FFFFFF?text=Programming",
      rating: 4.3,
      downloads: 650,
      pages: 240,
      category: "Technology",
    },
    {
      id: "7",
      title: "Biology Today",
      author: "Life Sciences",
      coverImage: "/api/placeholder/200/250/84CC16/FFFFFF?text=Biology",
      rating: 4.8,
      downloads: 1800,
      pages: 450,
      category: "Science",
      isTop10: true,
    },
    {
      id: "8",
      title: "Creative Writing Workshop",
      author: "Writing Academy",
      coverImage: "/api/placeholder/200/250/F97316/FFFFFF?text=Writing",
      rating: 4.4,
      downloads: 720,
      pages: 180,
      category: "Literature",
    },
  ];

  const demoCurrentBook = {
    title: "Advanced Mathematics for High School",
    author: "Dr. Sarah Johnson",
    coverImage: "/api/placeholder/200/250/3B82F6/FFFFFF?text=Advanced+Math",
    currentPage: 154,
    totalPages: 450,
    synopsis:
      "A comprehensive guide to advanced mathematical concepts including calculus, linear algebra, and differential equations. Perfect for high school students preparing for college-level mathematics.",
  };

  const demoAudiobook = {
    title: "Physics Fundamentals",
    author: "Prof. Michael Chen",
    coverImage: "/api/placeholder/200/200/10B981/FFFFFF?text=Physics",
    currentTime: "25:42",
    totalTime: "01:23:42",
    progress: 30,
    isPlaying: false,
  };

  const demoCategories = [
    "All Resources",
    "E-Books",
    "Research Papers",
    "Video Courses",
    "Audio Books",
    "Journals",
    "Textbooks",
    "Fiction",
    "Non-Fiction",
    "Academic",
    "Science",
    "Mathematics",
    "Literature",
    "History",
    "Arts",
    "Health",
    "Technology",
  ];

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setIsSearching(true);

    if (!query.trim()) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    // Search through all demo data
    const allBooks = [...demoBooks, ...demoNewReleases];
    const results = allBooks.filter((book) => {
      const searchTerm = query.toLowerCase();
      return (
        book.title.toLowerCase().includes(searchTerm) ||
        book.author.toLowerCase().includes(searchTerm) ||
        book.category.toLowerCase().includes(searchTerm)
      );
    });

    setSearchResults(results);
    setIsSearching(false);
    console.log("Search results:", results);
  };

  const handleFilterChange = (filters: string[]) => {
    setActiveFilters(filters);
    console.log("Active filters:", filters);
  };

  const handleBookClick = (book: any) => {
    console.log("Book clicked:", book);
  };

  const handleCategoryClick = (category: any) => {
    console.log("Category clicked:", category);
  };

  const handleContinueReading = () => {
    console.log("Continue reading clicked");
  };

  const handlePlayPause = () => {
    console.log("Play/pause clicked");
  };

  const handleSkipBack = () => {
    console.log("Skip back clicked");
  };

  const handleSkipForward = () => {
    console.log("Skip forward clicked");
  };

  const tabs = [
    { id: "overview", label: "Overview", icon: BookOpen },
    { id: "search", label: "Search & Filter", icon: TrendingUp },
    { id: "featured", label: "Featured Books", icon: Star },
    { id: "new", label: "New Releases", icon: Clock },
    { id: "progress", label: "Reading Progress", icon: Users },
    { id: "categories", label: "Categories", icon: TrendingUp },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white shadow-lg border-b sticky top-0 z-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center">
                <BookOpen className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  E-LIBRARY DEMO
                </h1>
                <p className="text-blue-600 font-medium">
                  Interactive Component Showcase
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Badge className="bg-green-100 text-green-800 px-3 py-1">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                Demo Mode
              </Badge>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Navigation Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8 overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors duration-200 ${
                    activeTab === tab.id
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tab Content */}
        {activeTab === "overview" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Welcome to the E-Library Demo
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                This demo showcases all the components of our comprehensive
                e-library system. Use the navigation tabs above to explore
                different features and see how they work together.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {demoBooks.map((book) => (
                <BookCard
                  key={book.id}
                  {...book}
                  onRead={() => handleBookClick(book)}
                  onDownload={() => handleBookClick(book)}
                />
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === "search" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Search & Filter System
              </h2>
              <p className="text-lg text-gray-600">
                Test the search functionality and category filtering system.
              </p>
            </div>

            <SearchFilter
              onSearch={handleSearch}
              onFilterChange={handleFilterChange}
              categories={demoCategories}
              activeFilters={activeFilters}
            />

            {/* Search Results */}
            {searchResults.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-6"
              >
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Search Results for "{searchQuery}"
                  </h3>
                  <p className="text-gray-600">
                    Found {searchResults.length} book
                    {searchResults.length !== 1 ? "s" : ""} matching your search
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  {searchResults.map((book) => (
                    <BookCard
                      key={book.id}
                      {...book}
                      onRead={() => handleBookClick(book)}
                      onDownload={() => handleBookClick(book)}
                    />
                  ))}
                </div>

                <div className="text-center">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchResults([]);
                      setSearchQuery("");
                    }}
                    className="border-2 border-gray-300 text-gray-600 hover:bg-gray-50 px-6 py-2"
                  >
                    Clear Search
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Loading State */}
            {isSearching && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-8"
              >
                <div className="inline-flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                  <span className="text-gray-600">Searching...</span>
                </div>
              </motion.div>
            )}

            {/* No Results Message */}
            {searchQuery && searchResults.length === 0 && !isSearching && (
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>No Results Found</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    No books found matching "{searchQuery}". Try different
                    keywords or check your spelling.
                  </p>
                </CardContent>
              </Card>
            )}
          </motion.div>
        )}

        {activeTab === "featured" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <FeaturedBooks books={demoBooks} onBookClick={handleBookClick} />
          </motion.div>
        )}

        {activeTab === "new" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <NewReleases
              releases={demoNewReleases}
              onBookClick={handleBookClick}
            />
          </motion.div>
        )}

        {activeTab === "progress" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <ReadingProgress
              currentBook={demoCurrentBook}
              audiobook={demoAudiobook}
              onContinueReading={handleContinueReading}
              onPlayPause={handlePlayPause}
              onSkipBack={handleSkipBack}
              onSkipForward={handleSkipForward}
            />
          </motion.div>
        )}

        {activeTab === "categories" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <CategoriesSection onCategoryClick={handleCategoryClick} />
          </motion.div>
        )}
      </main>
    </div>
  );
}
