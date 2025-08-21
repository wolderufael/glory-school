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
          className="text-center mb-16"
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

      {/* Modern Footer Section */}
      <motion.footer
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* Library Info */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                  <BookOpen className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Glory School</h3>
                  <p className="text-blue-300 text-sm">E-Library</p>
                </div>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">
                Empowering students with digital knowledge resources. Access
                thousands of academic materials anytime, anywhere.
              </p>
              <div className="flex space-x-4">
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-gray-300 hover:text-white hover:bg-gray-700 p-2"
                >
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-gray-300 hover:text-white hover:bg-gray-700 p-2"
                >
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
                  </svg>
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-gray-300 hover:text-white hover:bg-gray-700 p-2"
                >
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z" />
                  </svg>
                </Button>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-white">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <Button
                    variant="ghost"
                    className="text-gray-300 hover:text-white hover:bg-gray-700 p-0 h-auto font-normal justify-start"
                  >
                    Featured Books
                  </Button>
                </li>
                <li>
                  <Button
                    variant="ghost"
                    className="text-gray-300 hover:text-white hover:bg-gray-700 p-0 h-auto font-normal justify-start"
                  >
                    New Releases
                  </Button>
                </li>
                <li>
                  <Button
                    variant="ghost"
                    className="text-gray-300 hover:text-white hover:bg-gray-700 p-0 h-auto font-normal justify-start"
                  >
                    Study Guides
                  </Button>
                </li>
                <li>
                  <Button
                    variant="ghost"
                    className="text-gray-300 hover:text-white hover:bg-gray-700 p-0 h-auto font-normal justify-start"
                  >
                    Research Papers
                  </Button>
                </li>
              </ul>
            </div>

            {/* Academic Resources */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-white">
                Academic Resources
              </h4>
              <ul className="space-y-2">
                <li>
                  <Button
                    variant="ghost"
                    className="text-gray-300 hover:text-white hover:bg-gray-700 p-0 h-auto font-normal justify-start"
                  >
                    Mathematics
                  </Button>
                </li>
                <li>
                  <Button
                    variant="ghost"
                    className="text-gray-300 hover:text-white hover:bg-gray-700 p-0 h-auto font-normal justify-start"
                  >
                    Science
                  </Button>
                </li>
                <li>
                  <Button
                    variant="ghost"
                    className="text-gray-300 hover:text-white hover:bg-gray-700 p-0 h-auto font-normal justify-start"
                  >
                    Literature
                  </Button>
                </li>
                <li>
                  <Button
                    variant="ghost"
                    className="text-gray-300 hover:text-white hover:bg-gray-700 p-0 h-auto font-normal justify-start"
                  >
                    History
                  </Button>
                </li>
              </ul>
            </div>

            {/* Contact & Support */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-white">
                Contact & Support
              </h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-gray-300">
                  <svg
                    className="h-5 w-5 text-blue-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="text-sm">library@gloryschool.edu</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-300">
                  <svg
                    className="h-5 w-5 text-blue-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <span className="text-sm">+251 911 123 456</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-300">
                  <svg
                    className="h-5 w-5 text-blue-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span className="text-sm">Addis Ababa, Ethiopia</span>
                </div>
              </div>
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white mt-4">
                Get Help
              </Button>
            </div>
          </div>

          {/* Newsletter Subscription */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="border-t border-gray-700 pt-8 mb-8"
          >
            <div className="text-center max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-white mb-2">
                Stay Updated
              </h3>
              <p className="text-gray-300 mb-6">
                Subscribe to our newsletter for the latest academic resources
                and library updates
              </p>
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg bg-gray-800 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg">
                  Subscribe
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Bottom Footer */}
          <div className="border-t border-gray-700 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-gray-400 text-sm">
                © 2025 Glory School. All rights reserved.
              </div>
              <div className="flex space-x-6 text-sm">
                <Button
                  variant="ghost"
                  className="text-gray-400 hover:text-white p-0 h-auto font-normal"
                >
                  Privacy Policy
                </Button>
                <Button
                  variant="ghost"
                  className="text-gray-400 hover:text-white p-0 h-auto font-normal"
                >
                  Terms of Service
                </Button>
                <Button
                  variant="ghost"
                  className="text-gray-400 hover:text-white p-0 h-auto font-normal"
                >
                  Cookie Policy
                </Button>
              </div>
            </div>
          </div>
        </div>
      </motion.footer>
    </div>
  );
}
