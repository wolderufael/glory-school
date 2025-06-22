"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  BookOpen,
  Users,
  GraduationCap,
  School,
  ArrowRight,
  Building2,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  User,
  Lock,
  ExternalLink,
  ChevronDown,
  Menu,
  X,
  BarChart3,
  Camera,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { HeroSection } from "../landingPage/hero-section"

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const scaleOnHover = {
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.95 },
}

export default function SchoolPortal() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
 
  const navigationItems = [
    { name: "Home", href: "/", active: true },
    { name: "Announcement", href: "/noticeboard" },
    { name: "Admission", href: "/admission"},
    { name: "Programs", href: "/programs" },
    { name: "Calendar", href: "/calendar" },
  ]

  const serviceCards = [

     {
      title: "Apply for Admission",
      description: "New applicants who aspire to join Wolaita Sodo Agricultural College can apply",
      image: "/placeholder.svg?height=200&width=300",
      href: "/admission",
      color: "from-green-500 to-green-600",
    },
    {
      title: "Campus Tour",
      description:
        "Take an immersive 360° tour of our campus facilities, labs, and learning spaces from anywhere",
      image: "/placeholder.svg?height=200&width=300",
      href: "/virtual-tour",
      color: "from-orange-500 to-orange-600",
      icon: "tour",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
 
      <motion.header
        className="bg-white shadow-lg border-b sticky top-0 z-50"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <motion.div className="flex items-center space-x-3" whileHover={{ scale: 1.05 }}>
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center">
                <School className="h-7 w-7 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">WOLAITA SODO</h1>
                <p className="text-sm text-blue-600 font-medium">AGRICULTURAL COLLEGE</p>
              </div>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navigationItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative group"
                >
                  <Link
                    href={item.href}
                    className={`flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      item.active ? "text-blue-600 bg-blue-50" : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                    }`}
                  >
                    <span>{item.name}</span>
                    {/* {item.hasDropdown && <ChevronDown className="h-4 w-4" />} */}
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <button className="lg:hidden p-2 rounded-lg hover:bg-gray-100" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <motion.div
              className="lg:hidden py-4 border-t"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
            >
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`block px-4 py-2 text-sm font-medium rounded-lg mb-1 ${
                    item.active ? "text-blue-600 bg-blue-50" : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </motion.div>
          )}
        </div>
      </motion.header>

         <HeroSection />

    
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-15">
        <div className="grid lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2">
            <motion.div variants={staggerContainer} initial="initial" animate="animate" className="space-y-6">
              <motion.div variants={fadeInUp}>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome to Our Portal</h2>
                <p className="text-gray-600 mb-8">Access all your academic services and resources in one place</p>
              </motion.div>

              <div className="grid gap-6">
                {serviceCards.map((card, index) => (
                  <motion.div key={card.title} variants={fadeInUp} {...scaleOnHover} className="group">
                    <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white">
                      <div className="flex flex-col md:flex-row">
                        <div className="md:w-1/3 relative overflow-hidden">
                          <div className={`absolute inset-0 bg-gradient-to-r ${card.color} opacity-90`} />
                          <Image
                            src={card.image || "/placeholder.svg"}
                            alt={card.title}
                            width={300}
                            height={200}
                            className="w-full h-48 md:h-full object-cover"
                          />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-white text-center">
                              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2">
                                {card.icon === "dashboard" && <BarChart3 className="h-8 w-8" />}
                                {card.icon === "library" && <BookOpen className="h-8 w-8" />}
                                {card.icon === "tour" && <Camera className="h-8 w-8" />}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="md:w-2/3 p-6 flex flex-col justify-between">
                          <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                              {card.title}
                            </h3>
                            <p className="text-gray-600 leading-relaxed">{card.description}</p>
                          </div>
                          <div className="mt-4">
                            <Link
                              href={card.href}
                              className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium group-hover:translate-x-1 transition-transform"
                            >
                              Learn More
                              <ArrowRight className="h-4 w-4 ml-2" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          <div className="space-y-6 md:pt-22">
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card className="border-0 shadow-lg bg-white">
                <CardHeader className="text-center pb-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Building2 className="h-10 w-10 text-white" />
                  </div>
                  <CardTitle className="text-xl text-gray-900">Self service portal</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Link href='/auth/login'>
                   
                    <Button className="w-full h-12 bg-gradient-to-r cursor-pointer from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium">
                       Login to your account
                    </Button>
                   </Link>
                  </motion.div>

                
                <CardHeader>
                  <CardTitle className="text-lg text-gray-900">Quick Links</CardTitle>
                </CardHeader>
             
                  {[
                   
                    { name: "Student Portal", href: "/student", icon: GraduationCap },
                    { name: "Faculty Portal", href: "/registrar", icon: Users },
                  ].map((link, index) => (
                    <motion.div key={link.name} whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 300 }}>
                      <Link
                        href={link.href}
                        className="flex items-center justify-between p-3 rounded-lg hover:bg-blue-50 transition-colors group"
                      >
                        <div className="flex items-center space-x-3">
                          <link.icon className="h-5 w-5 text-blue-600" />
                          <span className="text-gray-700 group-hover:text-blue-600">{link.name}</span>
                        </div>
                        <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-blue-600" />
                      </Link>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
           
          </div>
        </div>
      </main>

      {/* Footer */}
      <motion.footer
        className="bg-gradient-to-r from-blue-900 to-blue-800 text-white mt-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1 }}
      >
        <div  className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
              <div className="space-y-2 text-blue-100">
                <p>Wolaita Sodo Agricultural College</p>
                <p>Wolaita Sodo, Ethiopia</p>
                <p>Email: info@wsac.edu.et</p>
                <p>Phone: +251 123 456 789</p>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <div className="space-y-2">
                {["About Us", "Academic Programs", "Admissions", "Research", "Contact"].map((link) => (
                  <Link key={link} href="#" className="block text-blue-100 hover:text-white transition-colors">
                    {link}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Social Media</h3>
              <div className="flex space-x-4 mb-4">
                {[Facebook, Twitter, Instagram, Linkedin].map((Icon, index) => (
                  <motion.a
                    key={index}
                    href="#"
                    className="text-blue-100 hover:text-white transition-colors"
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Icon className="h-6 w-6" />
                  </motion.a>
                ))}
              </div>
              <p className="text-blue-100 text-sm">Stay connected with us on social media</p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-blue-700">
            <p className="text-center text-blue-100">
              © {new Date().getFullYear()} Wolaita Sodo Agricultural College. All rights reserved.
            </p>
          </div>
        </div>
      </motion.footer>
    </div>
  )
}
