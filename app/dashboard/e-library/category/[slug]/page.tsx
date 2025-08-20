"use client";

import { useParams } from "next/navigation";
import CategoryDetail from "@/components/dashboard/e-library/category-detail";
import {
  BookOpen,
  GraduationCap,
  TestTube,
  Calculator,
  Globe,
  Palette,
  Heart,
  Zap,
} from "lucide-react";

// Mock data for each category
const categoryData = {
  mathematics: {
    id: "mathematics",
    name: "Mathematics",
    description:
      "Comprehensive collection of mathematics textbooks, problem-solving guides, and advanced mathematical concepts for high school students.",
    icon: Calculator,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
    bookCount: 156,
    books: [
      {
        id: "math-1",
        title: "Advanced Mathematics for High School",
        author: "Dr. Sarah Johnson",
        coverImage: "/advanced-mathematics.webp",
        rating: 4.8,
        downloads: 12450,
        pages: 480,
        category: "Mathematics",
        isNew: true,
        isPopular: true,
        description:
          "Comprehensive guide covering algebra, geometry, calculus, and statistics.",
      },
      {
        id: "math-2",
        title: "Algebra Fundamentals",
        author: "Prof. Michael Chen",
        coverImage: "/algebra-fundamentals.jpg",
        rating: 4.6,
        downloads: 9870,
        pages: 320,
        category: "Mathematics",
        isPopular: true,
      },
      {
        id: "math-3",
        title: "Geometry in Practice",
        author: "Dr. Emily Rodriguez",
        coverImage: "/geometry-in-practice.jpg",
        rating: 4.7,
        downloads: 11200,
        pages: 360,
        category: "Mathematics",
      },
      {
        id: "math-4",
        title: "Calculus Made Easy",
        author: "Prof. David Thompson",
        coverImage: "/calculus-made-easy.jpg",
        rating: 4.5,
        downloads: 8900,
        pages: 420,
        category: "Mathematics",
      },
      {
        id: "math-5",
        title: "Statistics and Probability",
        author: "Dr. Lisa Wang",
        coverImage: "/statistics-and-probability.webp",
        rating: 4.4,
        downloads: 7600,
        pages: 280,
        category: "Mathematics",
      },
      {
        id: "math-6",
        title: "Trigonometry Essentials",
        author: "Prof. Robert Kim",
        coverImage: "/trigonometry-essesntials.webp",
        rating: 4.6,
        downloads: 6800,
        pages: 240,
        category: "Mathematics",
      },
    ],
  },
  science: {
    id: "science",
    name: "Science",
    description:
      "Explore the wonders of science with our extensive collection of physics, chemistry, biology, and environmental science resources.",
    icon: TestTube,
    color: "text-green-600",
    bgColor: "bg-green-100",
    bookCount: 142,
    books: [
      {
        id: "science-1",
        title: "High School Physics",
        author: "Dr. James Wilson",
        coverImage: "/high-school-physics.jpeg",
        rating: 4.7,
        downloads: 11800,
        pages: 520,
        category: "Science",
        isNew: true,
        isPopular: true,
      },
      {
        id: "science-2",
        title: "Principles of Chemistry",
        author: "Prof. Maria Garcia",
        coverImage: "/principles-of-chemistry.jpg",
        rating: 4.6,
        downloads: 10200,
        pages: 480,
        category: "Science",
        isPopular: true,
      },
      {
        id: "science-3",
        title: "Biology Fundamentals",
        author: "Dr. Kevin Lee",
        coverImage: "/biology-fundamentals.jpg",
        rating: 4.8,
        downloads: 13400,
        pages: 560,
        category: "Science",
      },
      {
        id: "science-4",
        title: "Environmental Science",
        author: "Prof. Rachel Green",
        coverImage: "/environmental-science.jpg",
        rating: 4.5,
        downloads: 7200,
        pages: 380,
        category: "Science",
      },
    ],
  },
  literature: {
    id: "literature",
    name: "Literature",
    description:
      "Discover classic and contemporary literature, poetry, and literary analysis guides designed for high school students.",
    icon: BookOpen,
    color: "text-purple-600",
    bgColor: "bg-purple-100",
    bookCount: 98,
    books: [
      {
        id: "lit-1",
        title: "Classic Literature Collection",
        author: "Various Authors",
        coverImage: "/classic-literature.webp",
        rating: 4.9,
        downloads: 15600,
        pages: 720,
        category: "Literature",
        isPopular: true,
      },
      {
        id: "lit-2",
        title: "Poetry Analysis Guide",
        author: "Dr. Amanda Foster",
        coverImage: "/poetry-analysis.jpg",
        rating: 4.6,
        downloads: 8900,
        pages: 320,
        category: "Literature",
      },
      {
        id: "lit-3",
        title: "Modern Literature",
        author: "Prof. Carlos Mendez",
        coverImage: "/modern-literature.jpg",
        rating: 4.7,
        downloads: 11200,
        pages: 480,
        category: "Literature",
      },
    ],
  },
  history: {
    id: "history",
    name: "History",
    description:
      "Journey through time with our comprehensive history collection covering world history, American history, and historical analysis.",
    icon: GraduationCap,
    color: "text-amber-600",
    bgColor: "bg-amber-100",
    bookCount: 87,
    books: [
      {
        id: "history-1",
        title: "World History",
        author: "Dr. Thomas Brown",
        coverImage: "/world-history.jpg",
        rating: 4.8,
        downloads: 12800,
        pages: 640,
        category: "History",
        isPopular: true,
      },
      {
        id: "history-2",
        title: "American History",
        author: "Prof. Jennifer Davis",
        coverImage: "/american-history.jpg",
        rating: 4.7,
        downloads: 11500,
        pages: 580,
        category: "History",
      },
      {
        id: "history-3",
        title: "Ancient Civilizations",
        author: "Dr. Robert Martinez",
        coverImage: "/ancient-civilizations.jpg",
        rating: 4.6,
        downloads: 9200,
        pages: 420,
        category: "History",
      },
    ],
  },
  geography: {
    id: "geography",
    name: "Geography",
    description:
      "Explore the world through our geography resources covering physical geography, human geography, and global studies.",
    icon: Globe,
    color: "text-teal-600",
    bgColor: "bg-teal-100",
    bookCount: 65,
    books: [
      {
        id: "geo-1",
        title: "World Geography",
        author: "Prof. Linda Anderson",
        coverImage: "/world-geography.jpg",
        rating: 4.6,
        downloads: 8400,
        pages: 480,
        category: "Geography",
      },
      {
        id: "geo-2",
        title: "Physical Geography",
        author: "Dr. Mark Taylor",
        coverImage: "/physical-geography.png",
        rating: 4.5,
        downloads: 7200,
        pages: 360,
        category: "Geography",
      },
    ],
  },
  arts: {
    id: "arts",
    name: "Arts & Design",
    description:
      "Unleash your creativity with our arts and design collection covering visual arts, music theory, and creative expression.",
    icon: Palette,
    color: "text-pink-600",
    bgColor: "bg-pink-100",
    bookCount: 73,
    books: [
      {
        id: "arts-1",
        title: "Visual Arts Guide",
        author: "Prof. Sophia Kim",
        coverImage: "/visual-arts-guide.jpg",
        rating: 4.7,
        downloads: 9600,
        pages: 320,
        category: "Arts & Design",
      },
      {
        id: "arts-2",
        title: "Music Theory",
        author: "Dr. Daniel White",
        coverImage: "/music-theory.jpg",
        rating: 4.6,
        downloads: 8200,
        pages: 280,
        category: "Arts & Design",
      },
    ],
  },
  health: {
    id: "health",
    name: "Health & Wellness",
    description:
      "Learn about physical health, mental wellness, nutrition, and healthy living with our comprehensive health resources.",
    icon: Heart,
    color: "text-red-600",
    bgColor: "bg-red-100",
    bookCount: 58,
    books: [
      {
        id: "health-1",
        title: "Health Education",
        author: "Dr. Patricia Clark",
        coverImage: "/health-education.jpeg",
        rating: 4.7,
        downloads: 7800,
        pages: 360,
        category: "Health & Wellness",
      },
      {
        id: "health-2",
        title: "Nutrition Basics",
        author: "Prof. Steven Wright",
        coverImage: "/nutrition-basics.jpg",
        rating: 4.5,
        downloads: 6500,
        pages: 280,
        category: "Health & Wellness",
      },
    ],
  },
  technology: {
    id: "technology",
    name: "Technology",
    description:
      "Stay ahead with our technology resources covering computer science, programming, and digital literacy for the modern world.",
    icon: Zap,
    color: "text-indigo-600",
    bgColor: "bg-indigo-100",
    bookCount: 82,
    books: [
      {
        id: "tech-1",
        title: "Computer Science",
        author: "Dr. Alex Johnson",
        coverImage: "/computer-science.webp",
        rating: 4.8,
        downloads: 14200,
        pages: 520,
        category: "Technology",
        isNew: true,
        isPopular: true,
      },
      {
        id: "tech-2",
        title: "Programming Basics",
        author: "Prof. Sarah Chen",
        coverImage: "/programming-basics.jpeg",
        rating: 4.7,
        downloads: 11800,
        pages: 480,
        category: "Technology",
      },
      {
        id: "tech-3",
        title: "Digital Literacy",
        author: "Dr. Michael Brown",
        coverImage: "/digital-literacy.jpg",
        rating: 4.6,
        downloads: 9200,
        pages: 320,
        category: "Technology",
      },
    ],
  },
};

export default function CategoryPage() {
  const params = useParams();
  const slug = params.slug as string;

  console.log("CategoryPage - slug:", slug);
  console.log(
    "CategoryPage - available categories:",
    Object.keys(categoryData)
  );

  const category = categoryData[slug as keyof typeof categoryData];

  console.log("CategoryPage - found category:", category);

  if (!category) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Category Not Found
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            The category you're looking for doesn't exist.
          </p>
          <p className="text-sm text-gray-500 mb-4">
            Slug: {slug} | Available: {Object.keys(categoryData).join(", ")}
          </p>
          <a
            href="/dashboard/e-library"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
          >
            Back to Library
          </a>
        </div>
      </div>
    );
  }

  return <CategoryDetail category={category} books={category.books} />;
}
