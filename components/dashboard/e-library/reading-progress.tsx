"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  BookOpen,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Clock,
} from "lucide-react";
import Image from "next/image";

interface ReadingProgressProps {
  currentBook: {
    title: string;
    author: string;
    coverImage: string;
    currentPage: number;
    totalPages: number;
    synopsis: string;
  };
  audiobook: {
    title: string;
    author: string;
    coverImage: string;
    currentTime: string;
    totalTime: string;
    progress: number;
    isPlaying: boolean;
  };
  onContinueReading: () => void;
  onPlayPause: () => void;
  onSkipBack: () => void;
  onSkipForward: () => void;
}

export default function ReadingProgress({
  currentBook,
  audiobook,
  onContinueReading,
  onPlayPause,
  onSkipBack,
  onSkipForward,
}: ReadingProgressProps) {
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  const readingProgress =
    (currentBook.currentPage / currentBook.totalPages) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="grid lg:grid-cols-2 gap-8"
    >
      {/* Current Book Reading Progress */}
      <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-indigo-50">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-blue-600" />
            Current Reading
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            {/* Book Cover */}
            <div className="relative w-24 h-32 flex-shrink-0">
              <Image
                src={currentBook.coverImage}
                alt={currentBook.title}
                fill
                className="object-cover rounded-lg shadow-md"
              />
            </div>

            {/* Book Details */}
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-bold text-gray-900 line-clamp-2">
                {currentBook.title}
              </h3>
              <p className="text-sm text-gray-600 font-medium mb-2">
                {currentBook.author}
              </p>
              <p className="text-sm text-gray-600 line-clamp-3">
                {currentBook.synopsis}
              </p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Progress</span>
              <span>
                {currentBook.currentPage}/{currentBook.totalPages} pages
              </span>
            </div>
            <Progress value={readingProgress} className="h-2" />
            <div className="text-right text-sm text-gray-500">
              {readingProgress.toFixed(1)}% complete
            </div>
          </div>

          {/* Action Button */}
          <Button
            onClick={onContinueReading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          >
            <BookOpen className="h-4 w-4 mr-2" />
            Continue Reading
          </Button>
        </CardContent>
      </Card>

      {/* Audiobook Player */}
      <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-50 to-amber-50">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-gray-900 flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Play className="h-6 w-6 text-orange-600" />
              Audio Book
            </span>
            <div className="flex gap-1">
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 hover:bg-orange-100"
              >
                <SkipBack className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 hover:bg-orange-100"
              >
                <SkipForward className="h-4 w-4" />
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            {/* Audiobook Cover */}
            <div className="relative w-24 h-24 flex-shrink-0">
              <Image
                src={audiobook.coverImage}
                alt={audiobook.title}
                fill
                className="object-cover rounded-lg shadow-md"
              />
            </div>

            {/* Audiobook Details */}
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-bold text-gray-900 line-clamp-2">
                {audiobook.title}
              </h3>
              <p className="text-sm text-gray-600 font-medium">
                {audiobook.author}
              </p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-600">
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {audiobook.currentTime}
              </span>
              <span>{audiobook.totalTime}</span>
            </div>
            <Progress value={audiobook.progress} className="h-2" />
          </div>

          {/* Playback Controls */}
          <div className="flex items-center justify-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={onSkipBack}
              className="h-10 w-10 p-0 hover:bg-orange-100"
            >
              <SkipBack className="h-5 w-5" />
            </Button>

            <Button
              onClick={onPlayPause}
              className="h-12 w-12 p-0 bg-orange-600 hover:bg-orange-700 text-white rounded-full"
            >
              {audiobook.isPlaying ? (
                <Pause className="h-6 w-6" />
              ) : (
                <Play className="h-6 w-6 ml-1" />
              )}
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={onSkipForward}
              className="h-10 w-10 p-0 hover:bg-orange-100"
            >
              <SkipForward className="h-5 w-5" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
