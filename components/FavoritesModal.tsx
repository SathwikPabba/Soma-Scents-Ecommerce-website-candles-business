"use client"

import { Heart, X, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { candlesData } from "@/public/data"
import type { CartItem } from "@/public/data"
import Image from "next/image"

interface FavoritesModalProps {
  favorites: string[]
  cart: CartItem[]
  onClose: () => void
  onToggleFavorite: (candleId: string) => void
  onAddToCart: (candleId: string) => void
  onCandleClick: (candleId: string) => void
}

export default function FavoritesModal({
  favorites,
  cart,
  onClose,
  onToggleFavorite,
  onAddToCart,
  onCandleClick,
}: FavoritesModalProps) {
  const favoriteCandles = candlesData.filter((candle) => favorites.includes(candle.id))

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <Heart className="w-6 h-6 text-red-600" />
            <h2 className="text-xl font-semibold text-gray-900">My Favorites ({favorites.length})</h2>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose} className="p-2">
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Favorites Items */}
        <div className="flex-1 overflow-y-auto">
          {favoriteCandles.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 px-6">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Heart className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No favorites yet</h3>
              <p className="text-gray-600 text-center mb-6">Start adding candles to your favorites to see them here!</p>
              <Button onClick={onClose} className="bg-orange-600 hover:bg-orange-700">
                Browse Candles
              </Button>
            </div>
          ) : (
            <div className="p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {favoriteCandles.map((candle) => {
                  const isInCart = cart.some((item) => item.id === candle.id)
                  const discount = candle.originalPrice
                    ? Math.round(((candle.originalPrice - candle.price) / candle.originalPrice) * 100)
                    : 0

                  return (
                    <div
                      key={candle.id}
                      className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm"
                    >
                      {/* Image */}
                      <div className="relative aspect-square bg-gray-50">
                        <Image
                          src={candle.image || "/placeholder.svg"}
                          alt={candle.name}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover cursor-pointer hover:scale-105 transition-transform duration-300"
                          onClick={() => {
                            onCandleClick(candle.id)
                            onClose()
                          }}
                        />

                        {discount > 0 && (
                          <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                            {discount}% OFF
                          </div>
                        )}

                        {/* Remove from Favorites */}
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => onToggleFavorite(candle.id)}
                          className="absolute top-2 right-2 w-8 h-8 p-0 rounded-full bg-white text-red-600 hover:bg-red-50 shadow-md"
                        >
                          <Heart className="w-4 h-4 fill-current" />
                        </Button>
                      </div>

                      {/* Content */}
                      <div className="p-4">
                        <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">{candle.name}</h3>
                        <p className="text-sm text-gray-600 mb-3 line-clamp-1">{candle.scent}</p>

                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-2">
                            <span className="text-lg font-bold text-gray-900">₹{candle.price}</span>
                            {candle.originalPrice && (
                              <span className="text-sm text-gray-500 line-through">₹{candle.originalPrice}</span>
                            )}
                          </div>
                        </div>

                        <Button
                          onClick={() => onAddToCart(candle.id)}
                          className={`w-full ${
                            isInCart
                              ? "bg-green-600 hover:bg-green-700 text-white"
                              : "bg-orange-600 hover:bg-orange-700 text-white"
                          }`}
                          size="sm"
                        >
                          <ShoppingCart className="w-4 h-4 mr-2" />
                          {isInCart ? "Added to Cart" : "Add to Cart"}
                        </Button>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {favoriteCandles.length > 0 && (
          <div className="border-t border-gray-200 p-6">
            <Button onClick={onClose} variant="outline" className="w-full bg-transparent">
              Continue Shopping
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
