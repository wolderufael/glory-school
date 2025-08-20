"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  GraduationCap,
  TestTube,
  Calculator,
  Globe,
  Palette,
  Heart,
  Zap,
  ArrowRight,
} from "lucide-react";
import { useRouter } from "next/navigation";

interface Category {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  bookCount: number;
  color: string;
  bgColor: string;
}

interface CategoriesSectionProps {
  onCategoryClick?: (category: Category) => void;
}

export default function CategoriesSection({
  onCategoryClick,
}: CategoriesSectionProps) {
  const router = useRouter();
  const categories: Category[] = [
    {
      id: "mathematics",
      name: "Mathematics",
      description: "Mathematical concepts, formulas, and problem-solving",
      icon: Calculator,
      bookCount: 156,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      id: "science",
      name: "Science",
      description: "Scientific research, experiments, and discoveries",
      icon: TestTube,
      bookCount: 142,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      id: "literature",
      name: "Literature",
      description: "Classic and contemporary literary works",
      icon: BookOpen,
      bookCount: 98,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      id: "history",
      name: "History",
      description: "Historical events, figures, and civilizations",
      icon: GraduationCap,
      bookCount: 87,
      color: "text-amber-600",
      bgColor: "bg-amber-100",
    },
    {
      id: "geography",
      name: "Geography",
      description: "Physical and human geography, global studies",
      icon: Globe,
      bookCount: 65,
      color: "text-teal-600",
      bgColor: "bg-teal-100",
    },
    {
      id: "arts",
      name: "Arts & Design",
      description: "Creative expression, music, and visual arts",
      icon: Palette,
      bookCount: 73,
      color: "text-pink-600",
      bgColor: "bg-pink-100",
    },
    {
      id: "health",
      name: "Health & Wellness",
      description: "Physical and mental health, wellness, and medicine",
      icon: Heart,
      bookCount: 58,
      color: "text-red-600",
      bgColor: "bg-red-100",
    },
    {
      id: "technology",
      name: "Technology",
      description: "Computing, programming, and digital innovation",
      icon: Zap,
      bookCount: 82,
      color: "text-indigo-600",
      bgColor: "bg-indigo-100",
    },
  ];

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
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Explore by Category
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Browse our extensive collection organized by subject areas. Find
          exactly what you're looking for or discover new interests across
          various academic disciplines.
        </p>
      </motion.div>

      {/* Categories Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((category) => (
          <motion.div
            key={category.id}
            variants={fadeInUp}
            whileHover={{ y: -8, scale: 1.02 }}
            transition={{ duration: 0.3 }}
            className="group cursor-pointer"
            onClick={() => {
              console.log("Category clicked:", category.id);
              router.push(`/dashboard/e-library/category/${category.id}`);
            }}
          >
            <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white group-hover:bg-gray-50">
              <CardHeader className="pb-3">
                <div
                  className={`w-16 h-16 ${category.bgColor} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200`}
                >
                  <category.icon className={`h-8 w-8 ${category.color}`} />
                </div>
                <CardTitle className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                  {category.name}
                </CardTitle>
              </CardHeader>

              <CardContent className="pt-0">
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {category.description}
                </p>

                <div className="flex items-center justify-between">
                  <Badge variant="secondary" className="text-xs">
                    {category.bookCount.toLocaleString()} books
                  </Badge>

                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 group-hover:bg-blue-100 group-hover:text-blue-600 transition-all duration-200"
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log(
                        "Arrow button clicked for category:",
                        category.id
                      );
                      router.push(
                        `/dashboard/e-library/category/${category.id}`
                      );
                    }}
                  >
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* View All Categories Button */}
      <motion.div variants={fadeInUp} className="text-center">
        <Button
          variant="outline"
          size="lg"
          className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-3 text-lg rounded-xl transition-all duration-200"
        >
          View All Categories
        </Button>
      </motion.div>
    </motion.div>
  );
}
