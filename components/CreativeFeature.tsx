"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { candlesData } from "@/public/data"
import Link from "next/link"
import Image from "next/image"

interface CreativeFeatureProps {
  onCategorySelect: (category: string) => void
  onCandleClick?: (candleId: string) => void
}

export default function CreativeFeature({ onCategorySelect, onCandleClick }: CreativeFeatureProps) {
  // Define creative categories
  const creativeCategories = [
    {
      id: "handcrafted",
      name: "Handcrafted Artistry",
      description: "Meticulously crafted candles made with traditional techniques",
      image: "/jar-of-hearts-main.jpg"
    },
    {
      id: "floral",
      name: "Floral Designs",
      description: "Beautiful candles featuring intricate floral patterns",
      image: "/Rose-Heart-Jar-Candle-main.jpg"
    },
    {
      id: "seasonal",
      name: "Seasonal Collections",
      description: "Special candles designed for festivals and celebrations",
      image: "/scented-diya-candle.jpg"
    },
    {
      id: "luxury",
      name: "Luxury Editions",
      description: "Premium candles with exquisite designs and packaging",
      image: "/Marble-candle-lavender-main.jpg"
    }
  ];
  
  const [activeCategory, setActiveCategory] = useState<string>(creativeCategories[0].id)
  const [isHovering, setIsHovering] = useState<string | null>(null)

  // Get candles that match the creative category
  const getCategoryCandles = (categoryId: string) => {
    // This is a simplified mapping - in a real app, you'd have proper category tagging
    switch(categoryId) {
      case "handcrafted":
        return candlesData.filter(candle => 
          ["1", "7", "13"].includes(candle.id)
        );
      case "floral":
        return candlesData.filter(candle => 
          ["2", "4", "9"].includes(candle.id)
        );
      case "seasonal":
        return candlesData.filter(candle => 
          ["8", "12"].includes(candle.id)
        );
      case "luxury":
        return candlesData.filter(candle => 
          ["5", "6", "11"].includes(candle.id)
        );
      default:
        return [];
    }
  };

  const handleCategoryClick = (categoryId: string) => {
    setActiveCategory(categoryId)
    // We'll still use the existing onCategorySelect function, but pass the scent that matches best
    const matchingScent = categoryId === "floral" ? "Floral" : 
                         categoryId === "luxury" ? "Lavender" : "Rose";
    onCategorySelect(matchingScent)
  }

  return (
    <section className="py-16 bg-gradient-to-b from-white to-orange-50">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Creative Candle Designs</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our unique candle designs that blend artistry with fragrance for a truly special experience
          </p>
        </div>

        {/* Creative Categories */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {creativeCategories.map((category) => (
            <motion.div
              key={category.id}
              className={`relative overflow-hidden rounded-xl shadow-lg cursor-pointer transition-all duration-300 ${activeCategory === category.id ? 'ring-4 ring-orange-400' : ''}`}
              whileHover={{ y: -5, scale: 1.02 }}
              onClick={() => handleCategoryClick(category.id)}
              onMouseEnter={() => setIsHovering(category.id)}
              onMouseLeave={() => setIsHovering(null)}
            >
              <div className="relative h-64 w-full">
                <Image 
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform duration-500 ease-in-out"
                  style={{
                    transform: isHovering === category.id ? 'scale(1.1)' : 'scale(1)'
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
                  <div className="absolute bottom-0 left-0 p-4 text-white">
                    <h3 className="text-xl font-bold mb-1">{category.name}</h3>
                    <p className="text-sm">{category.description}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Featured Products from Selected Category */}
        <div className="mt-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-semibold text-gray-800">
              {creativeCategories.find(c => c.id === activeCategory)?.name} Collection
            </h3>
            <Button 
              variant="outline" 
              className="border-orange-400 text-orange-600 hover:bg-orange-50"
              onClick={() => onCategorySelect(activeCategory === "floral" ? "Floral" : activeCategory === "luxury" ? "Lavender" : "Rose")}
            >
              View All
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {getCategoryCandles(activeCategory)
              .slice(0, 3)
              .map(candle => (
                <motion.div 
                  key={candle.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
                  whileHover={{ y: -5 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => onCandleClick && onCandleClick(candle.id)}
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