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
  // Define festive creative categories
  const creativeCategories = [
    {
      id: "handcrafted",
      name: "Festival Artistry",
      description: "Handcrafted festive candles with traditional designs - 30% OFF",
      image: "/jar-of-hearts-main.jpg",
      offer: "30% OFF"
    },
    {
      id: "floral",
      name: "Celebration Florals",
      description: "Beautiful floral candles perfect for festival gifting - Buy 1 Get 1 Free",
      image: "/Rose-Heart-Jar-Candle-main.jpg",
      offer: "Buy 1 Get 1"
    },
    {
      id: "seasonal",
      name: "Festival Special",
      description: "Limited edition candles for this festive season - 40% OFF",
      image: "/scented-diya-candle.jpg",
      offer: "40% OFF"
    },
    {
      id: "luxury",
      name: "Premium Gift Sets",
      description: "Luxury candle gift boxes at special festival prices - 25% OFF",
      image: "/Marble-candle-lavender-main.jpg",
      offer: "25% OFF"
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
    <section className="py-16 bg-gradient-to-br from-red-600 via-orange-500 to-yellow-400 relative overflow-hidden">
      {/* Festive decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-10 left-10 w-20 h-20 bg-yellow-300 opacity-30 rounded-full animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-16 h-16 bg-red-300 opacity-30 rounded-full animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-12 h-12 bg-orange-300 opacity-30 rounded-full animate-pulse"></div>
      </div>
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 bg-gradient-to-r from-red-700/80 via-orange-600/80 to-red-700/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border-2 border-yellow-400">
          <div className="inline-block px-6 py-2 bg-yellow-500 text-red-800 font-bold rounded-full mb-4 animate-bounce shadow-md border-2 border-yellow-300">
            Festival Special Offers!
          </div>
          
          {/* Decorative elements */}
          <div className="relative">
            <div className="absolute -top-2 left-1/4 w-16 h-1 bg-yellow-400 rounded"></div>
            <div className="absolute -top-2 right-1/4 w-16 h-1 bg-yellow-400 rounded"></div>
            
            <h2 className="text-3xl lg:text-5xl font-bold text-yellow-300 mb-4 drop-shadow-md">
              Dussehra Special Collection
            </h2>
            
            <div className="absolute -bottom-2 left-1/3 w-16 h-1 bg-yellow-400 rounded"></div>
            <div className="absolute -bottom-2 right-1/3 w-16 h-1 bg-yellow-400 rounded"></div>
          </div>
          
          <p className="text-lg text-white max-w-2xl mx-auto mt-6">
            Celebrate the victory of good over evil with our special festive candles at incredible Dussehra offers
          </p>
          
          <div className="mt-4 inline-block px-8 py-2 border-2 border-yellow-400 rounded-full text-yellow-300 font-bold">
            Dussehra Special: All Candles ₹50 OFF!
          </div>
        </div>

        {/* Festive Categories */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {creativeCategories.map((category) => (
            <motion.div
              key={category.id}
              className={`relative overflow-hidden rounded-xl shadow-xl cursor-pointer transition-all duration-300 ${activeCategory === category.id ? 'ring-4 ring-yellow-400 shadow-yellow-300/50' : 'border-2 border-white/30'}`}
              whileHover={{ y: -8, scale: 1.03 }}
              onClick={() => handleCategoryClick(category.id)}
              onMouseEnter={() => setIsHovering(category.id)}
              onMouseLeave={() => setIsHovering(null)}
            >
              {/* Offer Badge */}
              <div className="absolute top-3 right-3 z-20 bg-red-600 text-yellow-300 font-bold px-3 py-1 rounded-full shadow-lg border-2 border-yellow-400 transform rotate-12">
                {category.offer}
              </div>
              
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
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent">
                  <div className="absolute bottom-0 left-0 p-4 text-white">
                    <h3 className="text-xl font-bold mb-1 text-yellow-300">{category.name}</h3>
                    <p className="text-sm text-white">{category.description}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Featured Products from Selected Category */}
        <div className="mt-8 bg-white/20 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/30">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="w-8 h-8 bg-yellow-500 rounded-full mr-3 animate-pulse"></div>
              <h3 className="text-2xl font-bold text-white drop-shadow-md">
                {creativeCategories.find(c => c.id === activeCategory)?.name} Collection
              </h3>
              <div className="w-8 h-8 bg-yellow-500 rounded-full ml-3 animate-pulse"></div>
            </div>
            <Button 
              className="bg-gradient-to-r from-yellow-500 to-red-600 text-white border-2 border-yellow-300 hover:from-red-600 hover:to-yellow-500 shadow-lg"
              onClick={() => onCategorySelect(activeCategory === "floral" ? "Floral" : activeCategory === "luxury" ? "Lavender" : "Rose")}
            >
              View All Festival Offers
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {getCategoryCandles(activeCategory)
              .slice(0, 3)
              .map(candle => {
                // Calculate festival offer price (using the category offer)
                const categoryOffer = creativeCategories.find(c => c.id === activeCategory)?.offer || "";
                const discountPercent = parseInt(categoryOffer) || 0;
                const festivalPrice = discountPercent > 0 
                  ? Math.round(candle.price * (1 - discountPercent/100)) 
                  : candle.price;
                
                return (
                  <motion.div 
                    key={candle.id}
                    className="bg-gradient-to-b from-white to-yellow-50 rounded-lg shadow-xl overflow-hidden cursor-pointer border-2 border-yellow-200"
                    whileHover={{ y: -8, scale: 1.03 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    onClick={() => onCandleClick && onCandleClick(candle.id)}
                  >
                    {/* Festival Offer Badge */}
                    <div className="absolute top-3 right-3 z-10 bg-red-600 text-yellow-300 font-bold px-3 py-1 rounded-full shadow-lg border-2 border-yellow-400 transform -rotate-12">
                      {categoryOffer}
                    </div>
                    
                    <div className="relative h-48 w-full">
                      <Image 
                        src={candle.image} 
                        alt={candle.name} 
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h4 className="text-lg font-bold text-red-700 mb-1">{candle.name}</h4>
                      <div className="flex items-center mb-2">
                        <p className="text-red-600 font-bold text-lg">₹{festivalPrice}</p>
                        {discountPercent > 0 && (
                          <p className="text-gray-500 line-through ml-2 text-sm">₹{candle.price}</p>
                        )}
                      </div>
                      <p className="text-sm text-gray-700 line-clamp-2">{candle.description}</p>
                      <button className="mt-3 w-full py-2 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-md font-medium hover:from-red-600 hover:to-orange-500 transition-all">
                        Buy Festival Special
                      </button>
                    </div>
                  </motion.div>
                );
              })}
          </div>
        </div>
      </div>
    </section>
  )
}