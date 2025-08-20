"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

import {
  BookOpen,
  Star,
  Clock,
  Users,
  ArrowLeft,
  Search,
  Filter,
  SortAsc,
  SortDesc,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface Book {
  id: string;
  title: string;
  author: string;
  coverImage: string;
  rating: number;
  downloads: number;
  pages: number | string;
  category: string;
  isNew?: boolean;
  isPopular?: boolean;
  description?: string;
  publishDate?: string;
}

interface CategoryDetailProps {
  category: {
    id: string;
    name: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
    color: string;
    bgColor: string;
    bookCount: number;
  };
  books: Book[];
}

export default function CategoryDetail({
  category,
  books,
}: CategoryDetailProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("title");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [filterBy, setFilterBy] = useState("all");

  const filteredAndSortedBooks = useMemo(() => {
    let filtered = books.filter((book) => {
      const matchesSearch =
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase());

      if (filterBy === "all") return matchesSearch;
      if (filterBy === "new" && book.isNew) return matchesSearch;
      if (filterBy === "popular" && book.isPopular) return matchesSearch;
      if (filterBy === "high-rating" && book.rating >= 4.5)
        return matchesSearch;

      return matchesSearch;
    });

    filtered.sort((a, b) => {
      let aValue: any, bValue: any;

      switch (sortBy) {
        case "title":
          aValue = a.title.toLowerCase();
          bValue = b.title.toLowerCase();
          break;
        case "author":
          aValue = a.author.toLowerCase();
          bValue = b.author.toLowerCase();
          break;
        case "rating":
          aValue = a.rating;
          bValue = b.rating;
          break;
        case "downloads":
          aValue = a.downloads;
          bValue = b.downloads;
          break;
        case "pages":
          aValue = typeof a.pages === "string" ? parseInt(a.pages) : a.pages;
          bValue = typeof b.pages === "string" ? parseInt(b.pages) : b.pages;
          break;
        default:
          aValue = a.title.toLowerCase();
          bValue = b.title.toLowerCase();
      }

      if (sortOrder === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  }, [books, searchQuery, sortBy, sortOrder, filterBy]);

  const handleBookClick = (book: Book) => {
    // For demo purposes, open the sample PDF
    window.open("/sample-book1.pdf", "_blank");
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      className="min-h-screen bg-gradient-to-br from-gray-50 to-white"
    >
      {/* Header */}
      <motion.div variants={fadeInUp} className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-4 mb-6">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.back()}
              className="hover:bg-gray-100"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Library
            </Button>
          </div>

          <div className="flex items-center gap-6">
            <div
              className={`w-20 h-20 ${category.bgColor} rounded-2xl flex items-center justify-center`}
            >
              <category.icon className={`h-10 w-10 ${category.color}`} />
            </div>

            <div className="flex-1">
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                {category.name}
              </h1>
              <p className="text-lg text-gray-600 max-w-3xl">
                {category.description}
              </p>
              <div className="flex items-center gap-6 mt-4">
                <Badge variant="secondary" className="text-sm px-3 py-1">
                  {filteredAndSortedBooks.length} of {category.bookCount} books
                </Badge>
                <span className="text-sm text-gray-500">
                  Explore our comprehensive collection of{" "}
                  {category.name.toLowerCase()} resources
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Controls */}
      <motion.div
        variants={fadeInUp}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6"
      >
        <div className="bg-white rounded-xl shadow-sm border p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search books..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filter */}
            <div className="relative">
              <Button
                variant="outline"
                className="w-full justify-between"
                onClick={() =>
                  setFilterBy(
                    filterBy === "all"
                      ? "new"
                      : filterBy === "new"
                      ? "popular"
                      : filterBy === "popular"
                      ? "high-rating"
                      : "all"
                  )
                }
              >
                <Filter className="h-4 w-4 mr-2" />
                {filterBy === "all" && "All Books"}
                {filterBy === "new" && "New Releases"}
                {filterBy === "popular" && "Popular"}
                {filterBy === "high-rating" && "High Rating (4.5+)"}
              </Button>
            </div>

            {/* Sort By */}
            <div className="relative">
              <Button
                variant="outline"
                className="w-full justify-between"
                onClick={() =>
                  setSortBy(
                    sortBy === "title"
                      ? "author"
                      : sortBy === "author"
                      ? "rating"
                      : sortBy === "rating"
                      ? "downloads"
                      : sortBy === "downloads"
                      ? "pages"
                      : "title"
                  )
                }
              >
                <SortAsc className="h-4 w-4 mr-2" />
                {sortBy === "title" && "Title"}
                {sortBy === "author" && "Author"}
                {sortBy === "rating" && "Rating"}
                {sortBy === "downloads" && "Downloads"}
                {sortBy === "pages" && "Pages"}
              </Button>
            </div>

            {/* Sort Order */}
            <Button
              variant="outline"
              onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
              className="flex items-center gap-2"
            >
              {sortOrder === "asc" ? (
                <SortAsc className="h-4 w-4" />
              ) : (
                <SortDesc className="h-4 w-4" />
              )}
              {sortOrder === "asc" ? "A-Z" : "Z-A"}
            </Button>
          </div>
        </div>

        {/* Books Grid */}
        {filteredAndSortedBooks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredAndSortedBooks.map((book, index) => (
              <motion.div
                key={book.id}
                variants={fadeInUp}
                initial="initial"
                animate="animate"
                transition={{ delay: index * 0.1 }}
                className="group cursor-pointer"
                onClick={() => handleBookClick(book)}
              >
                <Card className="h-full overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white">
                  {/* Book Cover */}
                  <div className="relative">
                    <div className="relative h-64 w-full overflow-hidden">
                      <Image
                        src={book.coverImage}
                        alt={book.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <Button
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open("/sample-book1.pdf", "_blank");
                          }}
                          className="bg-blue-600 hover:bg-blue-700 text-white"
                        >
                          <BookOpen className="h-4 w-4 mr-1" />
                          Read
                        </Button>
                      </div>
                    </div>

                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-2">
                      {book.isNew && (
                        <Badge className="bg-green-500 text-white text-xs px-2 py-1">
                          NEW
                        </Badge>
                      )}
                      {book.isPopular && (
                        <Badge className="bg-orange-500 text-white text-xs px-2 py-1">
                          POPULAR
                        </Badge>
                      )}
                    </div>

                    {/* Category Badge */}
                    <div className="absolute top-3 right-3">
                      <Badge variant="secondary" className="text-xs px-2 py-1">
                        {book.category}
                      </Badge>
                    </div>
                  </div>

                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-semibold text-gray-900 line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors duration-200">
                      {book.title}
                    </CardTitle>
                    <p className="text-sm text-gray-600 font-medium">
                      {book.author}
                    </p>
                  </CardHeader>

                  <CardContent className="pt-0">
                    {/* Stats */}
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span>{book.rating}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4 text-blue-500" />
                        <span>{book.downloads.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4 text-green-500" />
                        <span>{book.pages}</span>
                      </div>
                    </div>

                    {/* Action Button */}
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open("/sample-book1.pdf", "_blank");
                      }}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                      size="sm"
                    >
                      <BookOpen className="h-4 w-4 mr-1" />
                      Read Now
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div variants={fadeInUp} className="text-center py-12">
            <Card className="max-w-md mx-auto p-8">
              <div className="text-gray-400 mb-4">
                <Search className="h-16 w-16 mx-auto" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No books found
              </h3>
              <p className="text-gray-600 mb-4">
                Try adjusting your search terms or filters to find what you're
                looking for.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery("");
                  setFilterBy("all");
                }}
              >
                Clear Filters
              </Button>
            </Card>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}
