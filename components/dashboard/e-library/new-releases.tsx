"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Star, Clock, Users, TrendingUp } from "lucide-react";
import Image from "next/image";

interface NewRelease {
  id: string;
  title: string;
  author: string;
  coverImage: string;
  rating: number;
  downloads: number;
  pages: number | string;
  category: string;
  isTop10?: boolean;
  isKnigoChoice?: boolean;
}

interface NewReleasesProps {
  releases: NewRelease[];
  onBookClick: (book: NewRelease) => void;
}

export default function NewReleases({
  releases,
  onBookClick,
}: NewReleasesProps) {
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
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
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="h-px bg-gray-300 flex-1 max-w-32"></div>
          <h2 className="text-3xl font-bold text-gray-900">New Releases</h2>
          <div className="h-px bg-gray-300 flex-1 max-w-32"></div>
        </div>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Discover the latest additions to our digital library. Fresh content
          updated regularly to keep your reading journey exciting.
        </p>
      </motion.div>

      {/* New Releases Grid */}
      <div className="grid md:grid-cols-5 gap-6">
        {releases.map((book, index) => (
          <motion.div
            key={book.id}
            variants={fadeInUp}
            whileHover={{ y: -8, scale: 1.02 }}
            transition={{ duration: 0.3 }}
            className="group cursor-pointer"
            onClick={() => onBookClick(book)}
          >
            <Card className="h-full overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white flex flex-col">
              {/* Book Cover */}
              <div className="relative flex-shrink-0">
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={book.coverImage}
                    alt={book.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Button
                      size="sm"
                      className="bg-white hover:bg-gray-100 text-gray-900"
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open("/sample-book1.pdf", "_blank");
                      }}
                    >
                      <BookOpen className="h-4 w-4 mr-1" />
                      Read
                    </Button>
                  </div>
                </div>

                {/* Special Badges */}
                <div className="absolute top-2 left-2">
                  {book.isTop10 && (
                    <Badge className="bg-gray-600 text-white text-xs px-2 py-1 font-bold">
                      TOP 10
                    </Badge>
                  )}
                  {book.isKnigoChoice && (
                    <Badge className="bg-blue-600 text-white text-xs px-2 py-1 font-bold">
                      SELECTED
                    </Badge>
                  )}
                </div>

                {/* Category Badge */}
                <div className="absolute top-2 right-2">
                  <Badge variant="secondary" className="text-xs px-2 py-1">
                    {book.category}
                  </Badge>
                </div>
              </div>

              <CardHeader className="pb-2 flex-shrink-0">
                <CardTitle className="text-sm font-bold text-gray-900 line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors duration-200">
                  {book.title}
                </CardTitle>
                <p className="text-xs text-gray-600 font-medium line-clamp-1">
                  {book.author}
                </p>
              </CardHeader>

              <CardContent className="pt-0 flex-1 flex flex-col">
                {/* Stats */}
                <div className="flex items-center justify-between text-xs text-gray-500 mb-3 flex-shrink-0">
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 text-yellow-500 fill-current" />
                    <span>{book.rating}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-3 w-3 text-blue-500" />
                    <span>{book.downloads.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3 text-green-500" />
                    <span>{book.pages}</span>
                  </div>
                </div>

                {/* Action Button - Always at bottom */}
                <div className="mt-auto">
                  <Button
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 text-sm rounded-lg font-medium transition-all duration-200"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open("/sample-book1.pdf", "_blank");
                    }}
                  >
                    <BookOpen className="h-4 w-4 mr-1" />
                    Read Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* View All Button */}
      <motion.div variants={fadeInUp} className="text-center">
        <Button
          variant="outline"
          size="lg"
          className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-3 text-lg rounded-xl transition-all duration-200"
        >
          View All New Releases
        </Button>
      </motion.div>
    </motion.div>
  );
}
