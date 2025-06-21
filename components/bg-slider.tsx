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
    url: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    alt: "Students studying in university library",
    credit: "Photo by Priscilla Du Preez on Unsplash",
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    alt: "University campus building exterior",
    credit: "Photo by Vasily Koloda on Unsplash",
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2086&q=80",
    alt: "Students collaborating on agricultural research",
    credit: "Photo by ThisisEngineering RAEng on Unsplash",
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    alt: "Agricultural field and farming landscape",
    credit: "Photo by Zoe Schaeffer on Unsplash",
  },
  {
    id: 5,
    url: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    alt: "Students in graduation ceremony",
    credit: "Photo by Vasily Koloda on Unsplash",
  },
  {
    id: 6,
    url: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    alt: "Modern university campus courtyard",
    credit: "Photo by Kimberly Farmer on Unsplash",
  },
]

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
