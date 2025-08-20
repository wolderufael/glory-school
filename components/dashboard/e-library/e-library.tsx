"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  Search,
  Filter,
  TrendingUp,
  Clock,
  Users,
  Star,
  Download,
  Play,
  Pause,
  SkipBack,
  SkipForward,
} from "lucide-react";
import Image from "next/image";

// Import our modular components
import BookCard from "./book-card";
import SearchFilter from "./search-filter";
import FeaturedBooks from "./featured-books";
import NewReleases from "./new-releases";
import ReadingProgress from "./reading-progress";
import CategoriesSection from "./categories-section";

// Mock data for demonstration
const mockFeaturedBooks = [
  {
    id: "1",
    title: "Advanced Mathematics for High School",
    author: "Dr. Sarah Johnson",
    coverImage: "/advanced-mathematics.webp",
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
    coverImage: "/physics-fundamentals.jpeg",
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
    coverImage: "/world-literature.jpg",
    rating: 4.7,
    downloads: 1100,
    pages: 520,
    category: "Literature",
    isNew: true,
  },
];

const mockNewReleases = [
  {
    id: "4",
    title: "Chemistry Lab Manual",
    author: "Lab Sciences Institute",
    coverImage: "/chemistry-lab-manual.jpg",
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
    coverImage: "/history-of-art.jpg",
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
    coverImage: "/computer-programming-basics.jpg",
    rating: 4.3,
    downloads: 650,
    pages: 240,
    category: "Technology",
  },
  {
    id: "7",
    title: "Biology Today",
    author: "Life Sciences",
    coverImage: "/biology-today.jpg",
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
    coverImage: "/creative-writing.jpg",
    rating: 4.4,
    downloads: 720,
    pages: 180,
    category: "Literature",
  },
];

const mockCurrentBook = {
  title: "Advanced Mathematics for High School",
  author: "Dr. Sarah Johnson",
  coverImage: "/advanced-mathematics.webp",
  currentPage: 154,
  totalPages: 450,
  synopsis:
    "A comprehensive guide to advanced mathematical concepts including calculus, linear algebra, and differential equations. Perfect for high school students preparing for college-level mathematics.",
};

const mockAudiobook = {
  title: "Physics Fundamentals",
  author: "Prof. Michael Chen",
  coverImage: "/physics-fundamentals.jpeg",
  currentTime: "25:42",
  totalTime: "01:23:42",
  progress: 30,
  isPlaying: false,
};

const mockCategories = [
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

export default function ELibrary() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [isAudiobookPlaying, setIsAudiobookPlaying] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // Handle search
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setIsSearching(true);

    if (!query.trim()) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    // Search through all mock data
    const allBooks = [...mockFeaturedBooks, ...mockNewReleases];
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

  // Handle filter changes
  const handleFilterChange = (filters: string[]) => {
    setActiveFilters(filters);

    // Apply filters to search results if there are any
    if (searchResults.length > 0 && searchQuery.trim()) {
      const allBooks = [...mockFeaturedBooks, ...mockNewReleases];
      let filteredResults = allBooks.filter((book) => {
        const searchTerm = searchQuery.toLowerCase();
        const matchesSearch =
          book.title.toLowerCase().includes(searchTerm) ||
          book.author.toLowerCase().includes(searchTerm) ||
          book.category.toLowerCase().includes(searchTerm);

        // Apply category filters
        if (filters.length > 0 && !filters.includes("All Resources")) {
          return matchesSearch && filters.includes(book.category);
        }

        return matchesSearch;
      });

      setSearchResults(filteredResults);
    }

    console.log("Active filters:", filters);
  };

  // Handle book clicks
  const handleBookClick = (book: any) => {
    console.log("Book clicked:", book);
    // Implement book opening logic here
  };

  // Handle reading progress actions
  const handleContinueReading = () => {
    console.log("Continue reading clicked");
    // Implement continue reading logic here
  };

  const handlePlayPause = () => {
    setIsAudiobookPlaying(!isAudiobookPlaying);
    // Implement play/pause logic here
  };

  const handleSkipBack = () => {
    console.log("Skip back clicked");
    // Implement skip back logic here
  };

  const handleSkipForward = () => {
    console.log("Skip forward clicked");
    // Implement skip forward logic here
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header Section */}
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
                <h1 className="text-3xl font-bold text-gray-900">E-LIBRARY</h1>
                <p className="text-blue-600 font-medium">
                  Digital Learning Hub
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Badge className="bg-green-100 text-green-800 px-3 py-1">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                Online
              </Badge>
              <Button
                variant="outline"
                className="border-blue-600 text-blue-600 hover:bg-blue-50"
                onClick={() =>
                  (window.location.href = "/dashboard/e-library/test-category")
                }
              >
                Test Categories
              </Button>
            </div>
          </div>
        </div>
      </motion.header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section with Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            The Largest Digital Library for High School Students
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Access thousands of digital books, research papers, and educational
            resources. Your gateway to knowledge is just a search away.
          </p>

          {/* Search and Filter */}
          <SearchFilter
            onSearch={handleSearch}
            onFilterChange={handleFilterChange}
            categories={mockCategories}
            activeFilters={activeFilters}
          />
        </motion.div>

        {/* Search Results Section */}
        {searchResults.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Search Results for "{searchQuery}"
              </h2>
              <p className="text-lg text-gray-600">
                Found {searchResults.length} book
                {searchResults.length !== 1 ? "s" : ""} matching your search
              </p>
            </div>

            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
              {searchResults.map((book) => (
                <BookCard
                  key={book.id}
                  {...book}
                  onRead={() => handleBookClick(book)}
                  onDownload={() => handleBookClick(book)}
                />
              ))}
            </div>

            <div className="text-center mt-8">
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
          </motion.section>
        )}

        {/* Loading State for Search */}
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

        {/* Featured Books Section - Hidden when searching */}
        {searchResults.length === 0 && (
          <section className="mb-16">
            <FeaturedBooks
              books={mockFeaturedBooks}
              onBookClick={handleBookClick}
            />
          </section>
        )}

        {/* Reading Progress Section - Hidden when searching */}
        {searchResults.length === 0 && (
          <section className="mb-16">
            <ReadingProgress
              currentBook={mockCurrentBook}
              audiobook={{
                ...mockAudiobook,
                isPlaying: isAudiobookPlaying,
              }}
              onContinueReading={handleContinueReading}
              onPlayPause={handlePlayPause}
              onSkipBack={handleSkipBack}
              onSkipForward={handleSkipForward}
            />
          </section>
        )}

        {/* New Releases Section - Hidden when searching */}
        {searchResults.length === 0 && (
          <section className="mb-16">
            <NewReleases
              releases={mockNewReleases}
              onBookClick={handleBookClick}
            />
          </section>
        )}

        {/* Categories Section - Hidden when searching */}
        {searchResults.length === 0 && (
          <section className="mb-16">
            <CategoriesSection />
          </section>
        )}

        {/* Quick Stats Section - Hidden when searching */}
        {searchResults.length === 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <div className="grid md:grid-cols-4 gap-6">
              <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100">
                <CardContent className="p-6 text-center">
                  <BookOpen className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-blue-900">850+</h3>
                  <p className="text-blue-700 font-medium">Digital Books</p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100">
                <CardContent className="p-6 text-center">
                  <Users className="h-12 w-12 text-green-600 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-green-900">500+</h3>
                  <p className="text-green-700 font-medium">Active Readers</p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-purple-100">
                <CardContent className="p-6 text-center">
                  <Download className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-purple-900">10k+</h3>
                  <p className="text-purple-700 font-medium">Downloads</p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-50 to-orange-100">
                <CardContent className="p-6 text-center">
                  <Star className="h-12 w-12 text-orange-600 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-orange-900">4.8</h3>
                  <p className="text-orange-700 font-medium">Average Rating</p>
                </CardContent>
              </Card>
            </div>
          </motion.section>
        )}

        {/* Call to Action */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Card className="border-0 shadow-xl bg-gradient-to-br from-blue-600 to-blue-700 text-white p-12">
            <CardContent className="p-0">
              <h2 className="text-3xl font-bold mb-4">
                Ready to Start Your Reading Journey?
              </h2>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Join thousands of students who are already exploring our vast
                digital library. Start reading, learning, and growing today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 text-lg rounded-xl"
                >
                  <BookOpen className="h-5 w-5 mr-2" />
                  Start Reading
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  /* className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 text-lg rounded-xl" */
                  className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 text-lg rounded-xl"
                >
                  Learn More
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.section>
      </main>
    </div>
  );
}
