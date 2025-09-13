"use client"

import { useState, useEffect } from "react"
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
    <section id="candle-collection-section" className="py-16 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Our Candle Collection</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our handcrafted candles made with premium ingredients and captivating fragrances
          </p>
        </div>

        {/* Filters and Sort */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 space-y-4 sm:space-y-0">
          <div className="text-gray-600">
            Showing {visibleCandles.length} of {sortedCandles.length} candles
          </div>

          <div className="flex items-center space-x-4">
            <label htmlFor="sort" className="text-sm font-medium text-gray-700">
              Sort by:
            </label>
            <select
              id="sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            >
              <option value="default">Default</option>
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
                  whileInView={{ 
                    opacity: 1, 
                    y: 0,
                    transition: { 
                      duration: 0.5, 
                      delay: index * 0.1 % 0.8, // Creates a wave effect by staggering based on index
                      ease: [0.25, 0.1, 0.25, 1.0] // Smooth easing function
                    }
                  }}
                  viewport={{ once: true, margin: "-100px" }}
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
                <Button onClick={loadMore} variant="outline" size="lg" className="px-8 bg-transparent">
                  Load More Candles
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
