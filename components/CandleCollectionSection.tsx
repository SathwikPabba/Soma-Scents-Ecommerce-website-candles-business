"use client"

import { useState } from "react"
import CandleCard from "./CandleCard"
import { Button } from "@/components/ui/button"
import type { Candle, CartItem } from "@/public/data"
import { motion } from "framer-motion"

interface CandleCollectionSectionProps {
  candles: Candle[]
  onCandleClick: (candleId: string) => void
  onAddToCart: (candleId: string) => void
  onToggleFavorite: (candleId: string) => void
  favorites: string[]
  cart: CartItem[]
}

export default function CandleCollectionSection({
  candles,
  onCandleClick,
  onAddToCart,
  onToggleFavorite,
  favorites,
  cart,
}: CandleCollectionSectionProps) {
  const [visibleCount, setVisibleCount] = useState(12)
  const [sortBy, setSortBy] = useState<"default" | "price-low" | "price-high" | "name">("default")

  // Sort candles based on selected option
  const sortedCandles = [...candles].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "name":
        return a.name.localeCompare(b.name)
      default:
        return 0
    }
  })

  const visibleCandles = sortedCandles.slice(0, visibleCount)
  const hasMore = visibleCount < sortedCandles.length

  const loadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 12, sortedCandles.length))
  }

  return (
    <section id="candle-collection-section" className="py-16 bg-gradient-to-b from-orange-50 to-white relative overflow-hidden">
      {/* Dussehra Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-r from-orange-600 via-yellow-500 to-red-600 opacity-90"></div>
      <div className="absolute top-24 left-0 w-full h-4 bg-gradient-to-r from-yellow-400 via-orange-300 to-yellow-400"></div>
      
      {/* Decorative Diyas */}
      <div className="absolute top-8 left-10 transform -rotate-12">
        <div className="w-8 h-8 bg-yellow-500 rounded-full shadow-lg animate-pulse"></div>
      </div>
      <div className="absolute top-8 right-10 transform rotate-12">
        <div className="w-8 h-8 bg-yellow-500 rounded-full shadow-lg animate-pulse"></div>
      </div>
      
      <div className="container mx-auto px-4 lg:px-8 pt-16">
        {/* Section Header */}
        <div className="text-center mb-12 relative">
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-red-600"></div>
          <h2 className="text-3xl lg:text-4xl font-bold text-red-800 mb-4">Dussehra Special Collection</h2>
          <p className="text-lg text-orange-800 max-w-2xl mx-auto">
            Celebrate the victory of good over evil with our special festive candles at incredible Dussehra offers
          </p>
          <div className="mt-4 bg-yellow-100 text-orange-800 py-2 px-4 rounded-lg inline-block font-semibold border-2 border-dashed border-orange-400">
            Dussehra Special: All Candles ₹50 OFF!
          </div>
        </div>

        {/* Filters and Sort */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 space-y-4 sm:space-y-0 bg-orange-50 p-4 rounded-lg border border-orange-200">
          <div className="text-orange-800 font-medium">
            Showing {visibleCandles.length} of {sortedCandles.length} festive candles
          </div>

          <div className="flex items-center space-x-4">
            <label htmlFor="sort" className="text-sm font-medium text-orange-800">
              Sort by:
            </label>
            <select
              id="sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="border border-orange-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white text-orange-900"
            >
              <option value="default">Dussehra Special</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name">Name: A to Z</option>
            </select>
          </div>
        </div>

        {/* Candles Grid */}
        {visibleCandles.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
              {visibleCandles.map((candle, index) => (
                <motion.div
                  key={candle.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ 
                    duration: 0.5, 
                    delay: (index % 4) * 0.1 + Math.floor(index / 4) * 0.05, // Creates a wave effect by position
                    ease: "easeOut" 
                  }}
                >
                  <CandleCard
                    candle={candle}
                    onCandleClick={onCandleClick}
                    onAddToCart={onAddToCart}
                    onToggleFavorite={onToggleFavorite}
                    isFavorite={favorites.includes(candle.id)}
                    isInCart={cart.some((item) => item.id === candle.id)}
                  />
                </motion.div>
              ))}
            </div>

            {/* Load More Button */}
            {hasMore && (
              <div className="text-center mt-12">
                <Button 
                  onClick={loadMore} 
                  size="lg" 
                  className="px-8 bg-gradient-to-r from-orange-600 to-red-600 text-white hover:from-red-600 hover:to-orange-600 border-2 border-yellow-400 shadow-lg"
                >
                  Explore More Dussehra Specials
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.674-2.64"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No candles found</h3>
            <p className="text-gray-600">Try adjusting your search or filters to find what you're looking for.</p>
          </div>
        )}
      </div>
    </section>
  )
}
