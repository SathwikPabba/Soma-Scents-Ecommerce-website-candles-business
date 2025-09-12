"use client"

import CandleCard from "./CandleCard"
import { bestSellersData } from "@/lib/data"
import type { CartItem } from "@/lib/data"

interface BestSellersSectionProps {
  onCandleClick: (candleId: string) => void
  onAddToCart: (candleId: string) => void
  onToggleFavorite: (candleId: string) => void
  favorites: string[]
  cart: CartItem[]
}

export default function BestSellersSection({
  onCandleClick,
  onAddToCart,
  onToggleFavorite,
  favorites,
  cart,
}: BestSellersSectionProps) {
  return (
    <section id="best-sellers-section" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Best Sellers</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our most loved candles, chosen by customers for their exceptional quality and captivating fragrances
          </p>
        </div>

        {/* Best Sellers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {bestSellersData.map((candle) => (
            <CandleCard
              key={candle.id}
              candle={candle}
              onCandleClick={onCandleClick}
              onAddToCart={onAddToCart}
              onToggleFavorite={onToggleFavorite}
              isFavorite={favorites.includes(candle.id)}
              isInCart={cart.some((item) => item.id === candle.id)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
