"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Header from "@/components/Header"
import CandleCard from "@/components/CandleCard"
import Footer from "@/components/Footer"
import { candlesData } from "@/public/data"
import { useCart } from "@/hooks/useCart"
import { useFavorites } from "@/hooks/useFavorites"
import { useToast } from "@/hooks/useToast"
import CartModal from "@/components/CartModal"
import CandleDetailModal from "@/components/CandleDetailModal"
import FavoritesModal from "@/components/FavoritesModal"
import LoadingSpinner from "@/components/LoadingSpinner"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function CategoryPage() {
  const params = useParams()
  const category = decodeURIComponent(params.category as string)
  
  const [selectedCandleId, setSelectedCandleId] = useState<string | null>(null)
  const [isCartModalOpen, setIsCartModalOpen] = useState(false)
  const [isFavoritesModalOpen, setIsFavoritesModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [sortBy, setSortBy] = useState<"default" | "price-low" | "price-high" | "name">("default")

  const { cart, addToCart, removeFromCart, updateQuantity } = useCart()
  const { favorites, toggleFavorite } = useFavorites()
  const { toast, showToast } = useToast()

  // Filter candles by category
  const categoryCandles = candlesData.filter(candle => 
    candle.scent.split(',').map(s => s.trim()).includes(category)
  )

  // Sort candles based on selected option
  const sortedCandles = [...categoryCandles].sort((a, b) => {
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

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  const handleCandleClick = (candleId: string) => {
    setSelectedCandleId(candleId)
  }

  const handleAddToCart = (candleId: string, quantity = 1) => {
    const candle = candlesData.find((c) => c.id === candleId)
    if (candle) {
      addToCart(candle, quantity)
      showToast("🛒 Added to cart!")
    }
  }

  const handleToggleFavorite = (candleId: string) => {
    const isFavorite = favorites.includes(candleId)
    toggleFavorite(candleId)
    showToast(isFavorite ? "💔 Removed from favorites!" : "❤️ Added to favorites!")
  }

  if (isLoading) {
    return <LoadingSpinner />
  }

  return (
    <div className="min-h-screen bg-white">
      <Header
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
        favoritesCount={favorites.length}
        onCartClick={() => setIsCartModalOpen(true)}
        onFavoritesClick={() => setIsFavoritesModalOpen(true)}
        onSearchChange={() => {}}
        searchQuery=""
      />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Category Header */}
          <div className="mb-8">
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
              <Link href="/" className="hover:text-orange-500">Home</Link>
              <span>/</span>
              <span className="font-medium text-gray-700">{category} Candles</span>
            </div>
            
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">{category} Candles</h1>
            <p className="text-lg text-gray-600 max-w-3xl">
              Explore our collection of {category.toLowerCase()} scented candles, handcrafted with premium ingredients for a luxurious experience.
            </p>
          </div>

          {/* Filters and Sort */}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-8 space-y-4 sm:space-y-0">
            <div className="text-gray-600">
              Showing {sortedCandles.length} {category} candles
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
          {sortedCandles.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
              {sortedCandles.map((candle) => (
                <CandleCard
                  key={candle.id}
                  candle={candle}
                  onCandleClick={handleCandleClick}
                  onAddToCart={handleAddToCart}
                  onToggleFavorite={handleToggleFavorite}
                  isFavorite={favorites.includes(candle.id)}
                  isInCart={cart.some((item) => item.id === candle.id)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium text-gray-700 mb-4">No candles found in this category</h3>
              <p className="text-gray-500 mb-6">Try exploring our other categories or return to the home page.</p>
              <Button asChild>
                <Link href="/">Return to Home</Link>
              </Button>
            </div>
          )}
        </div>
      </main>

      <Footer />

      {/* Modals */}
      {selectedCandleId && (
        <CandleDetailModal
          candleId={selectedCandleId}
          onClose={() => setSelectedCandleId(null)}
          onAddToCart={handleAddToCart}
          onToggleFavorite={handleToggleFavorite}
          isFavorite={favorites.includes(selectedCandleId)}
          isInCart={cart.some((item) => item.id === selectedCandleId)}
        />
      )}

      {isCartModalOpen && (
        <CartModal
          cart={cart}
          onClose={() => setIsCartModalOpen(false)}
          onUpdateQuantity={updateQuantity}
          onRemoveItem={removeFromCart}
          onClearCart={() => {
            removeFromCart("all");
            showToast("Cart cleared!");
          }}
        />
      )}
      
      {isFavoritesModalOpen && (
        <FavoritesModal
          favorites={favorites}
          cart={cart}
          onClose={() => setIsFavoritesModalOpen(false)}
          onToggleFavorite={handleToggleFavorite}
          onAddToCart={handleAddToCart}
          onCandleClick={handleCandleClick}
        />
      )}
    </div>
  )
}