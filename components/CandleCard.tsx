"use client"

import { useState } from "react"
import { Heart, ShoppingCart, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Candle } from "@/public/data"

interface CandleCardProps {
  candle: Candle
  onCandleClick: (candleId: string) => void
  onAddToCart: (candleId: string) => void
  onToggleFavorite: (candleId: string) => void
  isFavorite: boolean
  isInCart: boolean
}

export default function CandleCard({
  candle,
  onCandleClick,
  onAddToCart,
  onToggleFavorite,
  isFavorite,
  isInCart,
}: CandleCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)
  const [isHovering, setIsHovering] = useState(false)

  const discount = candle.originalPrice
    ? Math.round(((candle.originalPrice - candle.price) / candle.originalPrice) * 100)
    : 0

  return (
    <div 
      className="group bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-orange-600 border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        <img
          src={imageError ? "/placeholder.svg?height=280&width=280" : 
               isHovering && candle.images && candle.images.length > 1 ? `/public${candle.images[1]}` : `/public${candle.image}`}
          alt={candle.name}
          className={`w-full h-full object-contain transition-all duration-300 group-hover:scale-105 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setImageLoaded(true)}
          onError={() => {
            setImageError(true)
            setImageLoaded(true)
          }}
        />

        {/* Discount Badge */}
        {discount > 0 && (
          <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            {discount}% OFF
          </div>
        )}

        {/* Quick Actions */}
        <div className="absolute top-3 right-3 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button
            size="sm"
            variant="secondary"
            onClick={(e) => {
              e.stopPropagation()
              onToggleFavorite(candle.id)
            }}
            className={`w-8 h-8 p-0 rounded-full shadow-md ${
              isFavorite ? "bg-red-100 text-red-600 hover:bg-red-200" : "bg-white text-gray-600 hover:bg-gray-100"
            }`}
          >
            <Heart className={`w-4 h-4 ${isFavorite ? "fill-current" : ""}`} />
          </Button>

          <Button
            size="sm"
            variant="secondary"
            onClick={(e) => {
              e.stopPropagation()
              onCandleClick(candle.id)
            }}
            className="w-8 h-8 p-0 rounded-full bg-white text-gray-600 hover:bg-gray-100 shadow-md"
          >
            <Eye className="w-4 h-4" />
          </Button>
        </div>

        {/* Overlay for mobile */}
        <div
          className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 cursor-pointer"
          onClick={() => onCandleClick(candle.id)}
        />
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 text-lg mb-2 line-clamp-2 group-hover:text-orange-600 transition-colors">
          {candle.name}
        </h3>

        <p className="text-sm text-gray-600 mb-2 line-clamp-1">{candle.scent}</p>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold text-gray-900">₹{candle.price}</span>
            {candle.originalPrice && (
              <span className="text-sm text-gray-500 line-through">₹{candle.originalPrice}</span>
            )}
          </div>
        </div>

        {/* Add to Cart Button */}
        <Button
          onClick={(e) => {
            e.stopPropagation()
            onAddToCart(candle.id)
          }}
          className={`w-full transition-all duration-300 ${
            isInCart ? "bg-green-600 hover:bg-green-700 text-white" : "bg-orange-600 hover:bg-orange-700 text-white"
          }`}
          size="sm"
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          {isInCart ? "Added to Cart" : "Add to Cart"}
        </Button>
      </div>
    </div>
  )
}
