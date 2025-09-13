"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { candlesData } from "@/public/data"
import Link from "next/link"
import Image from "next/image"

interface CategoryProps {
  onCategorySelect: (category: string) => void
}

export default function ShopByCategory({ onCategorySelect }: CategoryProps) {
  // Extract unique scent categories from candles data
  const [categories, setCategories] = useState<string[]>([])
  const [activeCategory, setActiveCategory] = useState<string>('')
  const [isHovering, setIsHovering] = useState<string | null>(null)

  useEffect(() => {
    // Extract all scents and split multi-scent entries
    const allScents = candlesData.flatMap(candle => 
      candle.scent.split(',').map(scent => scent.trim())
    )
    
    // Get unique scent categories
    const uniqueScents = Array.from(new Set(allScents))
    setCategories(uniqueScents)
    
    // Set default active category
    if (uniqueScents.length > 0) {
      setActiveCategory(uniqueScents[0])
    }
  }, [])

  // Get a representative image for each category
  const getCategoryImage = (category: string) => {
    const candle = candlesData.find(c => c.scent.includes(category))
    return candle ? candle.image : '/placeholder.jpg'
  }

  // Get count of candles in each category
  const getCategoryCount = (category: string) => {
    return candlesData.filter(candle => 
      candle.scent.split(',').map(s => s.trim()).includes(category)
    ).length
  }

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category)
    onCategorySelect(category)
  }

  return (
    <section className="py-16 bg-gradient-to-b from-white to-orange-50">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Shop By Category</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our candles by your favorite scents and find the perfect match for your mood
          </p>
        </div>

        {/* Category Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {categories.map((category) => (
            <motion.div
              key={category}
              className={`relative overflow-hidden rounded-xl shadow-lg cursor-pointer transition-all duration-300 ${activeCategory === category ? 'ring-4 ring-orange-400' : ''}`}
              whileHover={{ y: -5, scale: 1.02 }}
              onClick={() => handleCategoryClick(category)}
              onMouseEnter={() => setIsHovering(category)}
              onMouseLeave={() => setIsHovering(null)}
            >
              <div className="relative h-64 w-full">
                <Image 
                  src={getCategoryImage(category)}
                  alt={category}
                  fill
                  className="object-cover transition-transform duration-500 ease-in-out"
                  style={{
                    transform: isHovering === category ? 'scale(1.1)' : 'scale(1)'
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
                  <div className="absolute bottom-0 left-0 p-4 text-white">
                    <h3 className="text-xl font-bold mb-1">{category}</h3>
                    <p className="text-sm">{getCategoryCount(category)} products</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Featured Products from Selected Category */}
        <div className="mt-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-semibold text-gray-800">{activeCategory} Candles</h3>
            <Button 
              variant="outline" 
              className="border-orange-400 text-orange-600 hover:bg-orange-50"
              onClick={() => onCategorySelect(activeCategory)}
            >
              View All
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {candlesData
              .filter(candle => 
                candle.scent.split(',').map(s => s.trim()).includes(activeCategory)
              )
              .slice(0, 3)
              .map(candle => (
                <motion.div 
                  key={candle.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                  whileHover={{ y: -5 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="relative h-48 w-full">
                    <Image 
                      src={candle.image} 
                      alt={candle.name} 
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h4 className="text-lg font-medium text-gray-900 mb-1">{candle.name}</h4>
                    <p className="text-orange-600 font-semibold mb-2">₹{candle.price}</p>
                    <p className="text-sm text-gray-500 line-clamp-2">{candle.description}</p>
                  </div>
                </motion.div>
              ))}
          </div>
        </div>
      </div>
    </section>
  )
}