"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Camera,
  ArrowLeft,
  Play,
  MapPin,
  Clock,
  Users,
  Building2,
  Microscope,
  TreePine,
  Utensils,
  BookOpen,
  Dumbbell,
  Car,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
}

export default function VirtualTourPage() {
  const tourLocations = [
    {
      name: "Main Campus Building",
      description: "Explore our state-of-the-art administrative building with modern classrooms and faculty offices",
      image: "/placeholder.svg?height=200&width=300",
      duration: "5 min",
      views: "2.1k",
      icon: Building2,
      color: "text-blue-600",
      bg: "bg-blue-50",
      featured: true,
    },
    {
      name: "Agricultural Research Labs",
      description: "Take a look inside our advanced research laboratories equipped with cutting-edge technology",
      image: "/placeholder.svg?height=200&width=300",
      duration: "8 min",
      views: "1.8k",
      icon: Microscope,
      color: "text-green-600",
      bg: "bg-green-50",
      featured: true,
    },
    {
      name: "Experimental Farm",
      description: "Visit our 50-acre experimental farm where students get hands-on agricultural experience",
      image: "/placeholder.svg?height=200&width=300",
      duration: "12 min",
      views: "3.2k",
      icon: TreePine,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      featured: true,
    },
    {
      name: "Student Cafeteria",
      description: "See our modern dining facilities serving healthy and nutritious meals",
      image: "/placeholder.svg?height=200&width=300",
      duration: "3 min",
      views: "950",
      icon: Utensils,
      color: "text-orange-600",
      bg: "bg-orange-50",
    },
    {
      name: "Central Library",
      description: "Discover our comprehensive library with digital resources and study spaces",
      image: "/placeholder.svg?height=200&width=300",
      duration: "6 min",
      views: "1.5k",
      icon: BookOpen,
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
    {
      name: "Sports Complex",
      description: "Tour our fitness center and sports facilities for student recreation",
      image: "/placeholder.svg?height=200&width=300",
      duration: "4 min",
      views: "1.2k",
      icon: Dumbbell,
      color: "text-red-600",
      bg: "bg-red-50",
    },
    {
      name: "Student Dormitories",
      description: "Explore our comfortable and modern student housing facilities",
      image: "/placeholder.svg?height=200&width=300",
      duration: "7 min",
      views: "2.8k",
      icon: Building2,
      color: "text-indigo-600",
      bg: "bg-indigo-50",
    },
    {
      name: "Parking & Transportation",
      description: "See our parking facilities and campus transportation options",
      image: "/placeholder.svg?height=200&width=300",
      duration: "2 min",
      views: "680",
      icon: Car,
      color: "text-gray-600",
      bg: "bg-gray-50",
    },
  ]

  const tourStats = [
    { label: "Total Views", value: "15.2k", icon: Users },
    { label: "Tour Locations", value: "8", icon: MapPin },
    { label: "Total Duration", value: "47 min", icon: Clock },
    { label: "360° Views", value: "24", icon: Camera },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Virtual Campus Tour</h1>
              <p className="text-gray-600">Experience our campus from anywhere with immersive 360° virtual tours</p>
            </div>
            <Camera className="h-8 w-8 text-blue-600" />
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          variants={fadeInUp}
          initial="initial"
          animate="animate"
        >
          {tourStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6 text-center">
                  <stat.icon className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Featured Tours */}
        <motion.div className="mb-8" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }}>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Virtual Tours</h2>
          <div className="grid lg:grid-cols-3 gap-6 mb-8">
            {tourLocations
              .filter((location) => location.featured)
              .map((location, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="group cursor-pointer"
                >
                  <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                    <div className="relative">
                      <Image
                        src={location.image || "/placeholder.svg"}
                        alt={location.name}
                        width={300}
                        height={200}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button className="bg-white/20 backdrop-blur-sm text-white border-white/30 hover:bg-white/30">
                          <Play className="h-4 w-4 mr-2" />
                          Start Tour
                        </Button>
                      </div>
                      <Badge className="absolute top-3 right-3 bg-orange-500">Featured</Badge>
                    </div>
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-3 mb-3">
                        <div className={`p-2 rounded-lg ${location.bg}`}>
                          <location.icon className={`h-5 w-5 ${location.color}`} />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                            {location.name}
                          </h3>
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm mb-4">{location.description}</p>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {location.duration}
                        </div>
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-1" />
                          {location.views} views
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
          </div>
        </motion.div>

        {/* All Tour Locations */}
        <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">All Campus Locations</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tourLocations.map((location, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.02 }}
                className="group cursor-pointer"
              >
                <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden h-full">
                  <div className="relative">
                    <Image
                      src={location.image || "/placeholder.svg"}
                      alt={location.name}
                      width={300}
                      height={150}
                      className="w-full h-32 object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        size="sm"
                        className="bg-white/20 backdrop-blur-sm text-white border-white/30 hover:bg-white/30"
                      >
                        <Play className="h-3 w-3 mr-1" />
                        Tour
                      </Button>
                    </div>
                    {location.featured && (
                      <Badge className="absolute top-2 right-2 bg-orange-500 text-xs">Featured</Badge>
                    )}
                  </div>
                  <CardContent className="p-4 flex-1 flex flex-col">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className={`p-1.5 rounded ${location.bg}`}>
                        <location.icon className={`h-4 w-4 ${location.color}`} />
                      </div>
                      <h3 className="font-semibold text-gray-900 text-sm group-hover:text-blue-600 transition-colors">
                        {location.name}
                      </h3>
                    </div>
                    <p className="text-gray-600 text-xs mb-3 flex-1">{location.description}</p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {location.duration}
                      </div>
                      <div className="flex items-center">
                        <Users className="h-3 w-3 mr-1" />
                        {location.views}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-600 to-blue-700 text-white">
            <CardContent className="p-8">
              <Camera className="h-12 w-12 mx-auto mb-4 text-blue-200" />
              <h3 className="text-2xl font-bold mb-2">Ready to Visit in Person?</h3>
              <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                After exploring our virtual tour, schedule a physical campus visit to experience our facilities
                firsthand and meet our faculty and students.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-white text-blue-600 hover:bg-blue-50">Schedule Campus Visit</Button>
                <Button variant="outline" className="border-white text-white hover:bg-white/10">
                  Contact Admissions
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
