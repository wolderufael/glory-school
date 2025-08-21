"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Star, TrendingUp, Clock } from "lucide-react";
import Image from "next/image";

interface FeaturedBook {
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
}

interface FeaturedBooksProps {
  books: FeaturedBook[];
  onBookClick: (book: FeaturedBook) => void;
}

export default function FeaturedBooks({
  books,
  onBookClick,
}: FeaturedBooksProps) {
  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  return (
    <motion.div
      variants={staggerContainer}
      initial="initial"
      animate="animate"
      className="space-y-8"
    >
      {/* Section Header */}
      <motion.div variants={fadeInUp} className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Top #3 Books This Month
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Explore the top three most popular academic books this month! From
          essential textbooks to study guides and reference materials, these
          books are helping students excel in their studies. Whether you're
          preparing for exams, working on assignments, or want to deepen your
          knowledge, these academic resources will support your learning
          journey.
        </p>
        <Button className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg rounded-xl">
          Read More
        </Button>
      </motion.div>

      {/* Featured Books Grid */}
      <div className="grid md:grid-cols-3 gap-8">
        {books.map((book, index) => (
          <motion.div
            key={book.id}
            variants={fadeInUp}
            whileHover={{ y: -8, scale: 1.02 }}
            transition={{ duration: 0.3 }}
            className="group cursor-pointer"
            onClick={() => onBookClick(book)}
          >
            <Card className="h-full overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-white to-gray-50 flex flex-col">
              {/* Book Cover with Wooden Shelf Effect */}
              <div className="relative">
                <div className="relative h-80 w-full overflow-hidden">
                  <Image
                    src={book.coverImage}
                    alt={book.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-2">
                  {book.isNew && (
                    <Badge className="bg-green-500 text-white text-xs px-3 py-1 font-bold">
                      NEW
                    </Badge>
                  )}
                  {book.isPopular && (
                    <Badge className="bg-orange-500 text-white text-xs px-3 py-1 font-bold">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      POPULAR
                    </Badge>
                  )}
                </div>

                {/* Category Badge */}
                <div className="absolute top-3 right-3">
                  <Badge
                    variant="secondary"
                    className="text-xs px-3 py-1 font-medium"
                  >
                    {book.category}
                  </Badge>
                </div>

                {/* Wooden Shelf Effect */}
                <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-amber-800 to-amber-600 rounded-t-lg shadow-inner" />
              </div>

              <CardHeader className="pb-3 flex-shrink-0">
                <CardTitle className="text-xl font-bold text-gray-900 line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors duration-200">
                  {book.title}
                </CardTitle>
                <p className="text-sm text-gray-600 font-semibold">
                  {book.author}
                </p>
              </CardHeader>

              <CardContent className="pt-0 flex-1 flex flex-col">
                {/* Stats */}
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4 flex-shrink-0">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="font-medium">{book.rating}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <BookOpen className="h-4 w-4 text-blue-500" />
                    <span className="font-medium">
                      {book.downloads.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4 text-green-500" />
                    <span className="font-medium">{book.pages}</span>
                  </div>
                </div>

                {/* Action Button - Always at bottom */}
                <div className="mt-auto">
                  <Button
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-all duration-200 group-hover:bg-blue-700"
                    size="lg"
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open("/sample-book1.pdf", "_blank");
                    }}
                  >
                    <BookOpen className="h-5 w-5 mr-2" />
                    Start Reading
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Wooden Shelf Decoration */}
      <div className="relative">
        <div className="h-6 bg-gradient-to-r from-amber-800 via-amber-700 to-amber-800 rounded-lg shadow-lg mx-8" />
        <div className="absolute inset-0 bg-gradient-to-r from-amber-600/20 to-amber-800/20 rounded-lg" />
      </div>
    </motion.div>
  );
}
