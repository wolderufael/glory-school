"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

interface SlideImage {
  id: number
  url: string
  alt: string
  credit: string
}

const schoolImages: SlideImage[] = [
  {
    id: 1,
    url: "/school1.jpg",
    alt: "Students studying in university library",
    credit: "Photo by Priscilla Du Preez on Unsplash",
  },
  {
    id: 2,
    url: "/school2.jpg",
    alt: "University campus building exterior",
    credit: "Photo by Vasily Koloda on Unsplash",
  },
  {
    id: 3,
    url: "/school3.jpg",
    alt: "Students collaborating on agricultural research",
    credit: "Photo by ThisisEngineering RAEng on Unsplash",
  },
  {
    id: 4,
    url: "/school4.jpg",
    alt: "Agricultural field and farming landscape",
    credit: "Photo by Zoe Schaeffer on Unsplash",
  },
  {
    id: 5,
    url: "/school5.jpg",
    alt: "Students in graduation ceremony",
    credit: "Photo by Vasily Koloda on Unsplash",
  },
  {
    id: 6,
    url: "/school6.jpg",
    alt: "Modern university campus courtyard",
    credit: "Photo by Kimberly Farmer on Unsplash",
  },
  {
    id: 7,
    url: "/school7.jpg",
    alt: "Students in graduation ceremony",
    credit: "Photo by Vasily Koloda on Unsplash",
  },
  {
    id: 8,
    url: "/school8.jpg",
    alt: "Modern university campus courtyard",
    credit: "Photo by Kimberly Farmer on Unsplash",
  },
];

interface BackgroundSliderProps {
  autoSlideInterval?: number
  showDots?: boolean
  showCredits?: boolean
}

export function BackgroundSlider({
  autoSlideInterval = 5000,
  showDots = true,
  showCredits = false,
}: BackgroundSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % schoolImages.length)
    }, autoSlideInterval)

    return () => clearInterval(timer)
  }, [autoSlideInterval])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  return (
    <div className="absolute inset-0 overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <Image
            src={schoolImages[currentSlide].url || "/placeholder.svg"}
            alt={schoolImages[currentSlide].alt}
            fill
            className="object-cover"
            priority={currentSlide === 0}
            quality={85}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 via-blue-800/50 to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Slide Indicators */}
      {showDots && (
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
          {schoolImages.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide ? "bg-white scale-110" : "bg-white/50 hover:bg-white/75"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Image Credits */}
      {showCredits && (
        <div className="absolute bottom-2 right-2 text-xs text-white/70 bg-black/20 px-2 py-1 rounded">
          {schoolImages[currentSlide].credit}
        </div>
      )}
    </div>
  )
}
