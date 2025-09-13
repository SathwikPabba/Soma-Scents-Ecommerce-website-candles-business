"use client"

import { useState, useEffect } from "react"
import { X, Heart, ShoppingCart, Minus, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { candlesData } from "@/public/data"

interface CandleDetailModalProps {
  candleId: string
  onClose: () => void
  onAddToCart: (candleId: string, quantity: number) => void
  onToggleFavorite: (candleId: string) => void
  isFavorite: boolean
  isInCart: boolean
}

export default function CandleDetailModal({
  candleId,
  onClose,
  onAddToCart,
  onToggleFavorite,
  isFavorite,
  isInCart,
}: CandleDetailModalProps) {
  const [quantity, setQuantity] = useState(1)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const candle = candlesData.find((c) => c.id === candleId)

  useEffect(() => {
    // Prevent body scroll when modal is open
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [])
  
  // Reset image index when candle changes
  useEffect(() => {
    setCurrentImageIndex(0)
    setImageLoaded(false)
  }, [candleId])

  if (!candle) return null

  const discount = candle.originalPrice
    ? Math.round(((candle.originalPrice - candle.price) / candle.originalPrice) * 100)
    : 0

  const handleAddToCart = () => {
    onAddToCart(candleId, quantity)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900">Product Details</h2>
          <Button variant="ghost" size="sm" onClick={onClose} className="p-2">
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
          {/* Image */}
          <div className="space-y-4">
            <div className="relative aspect-square bg-gray-50 rounded-lg overflow-hidden">
              {!imageLoaded && (
                <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
                  <div className="w-8 h-8 border-2 border-orange-600 border-t-transparent rounded-full animate-spin" />
                </div>
              )}

              <div className="relative w-full h-full">
                <Image
                  src={candle.images ? candle.images[currentImageIndex] : (candle.image || "/placeholder.svg")}
                  alt={`${candle.name} - Image ${currentImageIndex + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                  className={`object-contain transition-opacity duration-300 ${
                    imageLoaded ? "opacity-100" : "opacity-0"
                  }`}
                  onLoadingComplete={() => setImageLoaded(true)}
                />
              </div>

              {discount > 0 && (
                <div className="absolute top-4 left-4 bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                  {discount}% OFF
                </div>
              )}
              
              {/* Image Counter */}
              {candle.images && candle.images.length > 1 && (
                <div className="absolute bottom-4 right-4 bg-black/60 text-white text-xs px-2 py-1 rounded-full">
                  {currentImageIndex + 1} / {candle.images.length}
                </div>
              )}
              
              {/* Image Navigation Arrows */}
              {candle.images && candle.images.length > 1 && (
                <>
                  <button 
                    onClick={() => {
                      setImageLoaded(false);
                      setCurrentImageIndex((prev) => (prev === 0 ? candle.images!.length - 1 : prev - 1));
                    }}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md"
                    aria-label="Previous image"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button 
                    onClick={() => {
                      setImageLoaded(false);
                      setCurrentImageIndex((prev) => (prev === candle.images!.length - 1 ? 0 : prev + 1));
                    }}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md"
                    aria-label="Next image"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </>
              )}
            </div>
            
            {/* Thumbnail Navigation */}
            {candle.images && candle.images.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto pb-2">
                {candle.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      if (index !== currentImageIndex) {
                        setImageLoaded(false);
                        setCurrentImageIndex(index);
                      }
                    }}
                    className={`relative w-16 h-16 rounded-md overflow-hidden flex-shrink-0 border-2 ${currentImageIndex === index ? 'border-orange-500' : 'border-transparent'}`}
                  >
                    <img 
                      src={img} 
                      alt={`${candle.name} thumbnail ${index + 1}`} 
                      className="w-full h-full object-contain"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">{candle.name}</h1>
              <p className="text-gray-600">{candle.description}</p>
            </div>

            <div>
              <span className="text-sm font-medium text-gray-700">Scent: </span>
              <span className="text-gray-600">{candle.scent}</span>
            </div>

            {/* Price */}
            <div className="flex items-center space-x-3">
              <span className="text-3xl font-bold text-gray-900">₹{candle.price}</span>
              {candle.originalPrice && (
                <span className="text-xl text-gray-500 line-through">₹{candle.originalPrice}</span>
              )}
            </div>

            {/* Pack Price */}
            {candle.packPrice && (
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <div className="text-sm font-medium text-orange-800 mb-1">Special Pack Price</div>
                <div className="text-lg font-bold text-orange-600">₹{candle.packPrice} for pack</div>
              </div>
            )}

            {/* Quantity */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 p-0"
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="text-lg font-medium w-12 text-center">{quantity}</span>
                <Button variant="outline" size="sm" onClick={() => setQuantity(quantity + 1)} className="w-10 h-10 p-0">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex space-x-4">
              <Button onClick={handleAddToCart} className="flex-1 bg-orange-600 hover:bg-orange-700">
                <ShoppingCart className="w-4 h-4 mr-2" />
                {isInCart ? "Update Cart" : "Add to Cart"}
              </Button>

              <Button
                variant="outline"
                onClick={() => onToggleFavorite(candleId)}
                className={`px-6 ${isFavorite ? "bg-red-50 border-red-200 text-red-600 hover:bg-red-100" : ""}`}
              >
                <Heart className={`w-4 h-4 ${isFavorite ? "fill-current" : ""}`} />
              </Button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200">
              <div className="text-center">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-sm text-gray-600">Premium Quality</span>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <span className="text-sm text-gray-600">Long Lasting</span>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </div>
                <span className="text-sm text-gray-600">Handcrafted</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
