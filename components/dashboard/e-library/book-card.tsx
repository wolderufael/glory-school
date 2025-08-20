"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Download, Eye, Star, Clock, Users } from "lucide-react";
import Image from "next/image";

interface BookCardProps {
  title: string;
  author: string;
  coverImage: string;
  rating: number;
  downloads: number;
  pages: number | string;
  category: string;
  isNew?: boolean;
  isPopular?: boolean;
  onRead?: () => void;
  onDownload?: () => void;
}

export default function BookCard({
  title,
  author,
  coverImage,
  rating,
  downloads,
  pages,
  category,
  isNew = false,
  isPopular = false,
  onRead,
  onDownload,
}: BookCardProps) {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="group"
    >
      <Card className="h-full overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white flex flex-col">
        <div className="relative">
          {/* Book Cover */}
          <div className="relative h-64 w-full overflow-hidden">
            <Image
              src={coverImage}
              alt={title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            {/* Overlay with actions */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
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
              <Button
                size="sm"
                variant="outline"
                onClick={onDownload}
                className="bg-white hover:bg-gray-100 text-gray-900"
              >
                <Download className="h-4 w-4 mr-1" />
                Download
              </Button>
            </div>
          </div>

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {isNew && (
              <Badge className="bg-green-500 text-white text-xs px-2 py-1">
                NEW
              </Badge>
            )}
            {isPopular && (
              <Badge className="bg-orange-500 text-white text-xs px-2 py-1">
                POPULAR
              </Badge>
            )}
          </div>

          {/* Category Badge */}
          <div className="absolute top-3 right-3">
            <Badge variant="secondary" className="text-xs px-2 py-1">
              {category}
            </Badge>
          </div>
        </div>

        <CardHeader className="pb-2 flex-shrink-0">
          <CardTitle className="text-lg font-semibold text-gray-900 line-clamp-2 leading-tight">
            {title}
          </CardTitle>
          <p className="text-sm text-gray-600 font-medium">{author}</p>
        </CardHeader>

        <CardContent className="pt-0 flex-1 flex flex-col">
          {/* Stats */}
          <div className="flex items-center justify-between text-sm text-gray-500 mb-3 flex-shrink-0">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 text-yellow-500 fill-current" />
              <span>{rating}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>{downloads.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{pages}</span>
            </div>
          </div>

          {/* Action Buttons - Always at bottom */}
          <div className="flex gap-2 mt-auto">
            <Button
              onClick={(e) => {
                e.stopPropagation();
                window.open("/sample-book1.pdf", "_blank");
              }}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
              size="sm"
            >
              <BookOpen className="h-4 w-4 mr-1" />
              Read Now
            </Button>
            <Button
              onClick={onDownload}
              variant="outline"
              size="sm"
              className="flex-1"
            >
              <Download className="h-4 w-4 mr-1" />
              Download
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
