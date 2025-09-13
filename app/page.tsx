"use client"

import { useState, useEffect } from "react"
import Header from "@/components/Header"
import HeroSection from "@/components/HeroSection"
import BestSellersSection from "@/components/BestSellersSection"
import CandleCollectionSection from "@/components/CandleCollectionSection"
import CreativeFeature from "@/components/CreativeFeature"
import AboutSection from "@/components/AboutSection"
import ContactSection from "@/components/ContactSection"
import Footer from "@/components/Footer"
import CartModal from "@/components/CartModal"
import CandleDetailModal from "@/components/CandleDetailModal"
import FavoritesModal from "@/components/FavoritesModal"
import Toast from "@/components/Toast"
import LoadingSpinner from "@/components/LoadingSpinner"
import QuickActions from "@/components/QuickActions"
import { candlesData } from "@/public/data"
import { useCart } from "@/hooks/useCart"
import { useFavorites } from "@/hooks/useFavorites"
import { useToast } from "@/hooks/useToast"

export default function HomePage() {
  const [selectedCandleId, setSelectedCandleId] = useState<string | null>(null)
  const [isCartModalOpen, setIsCartModalOpen] = useState(false)
  const [isFavoritesModalOpen, setIsFavoritesModalOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState("")

  const { cart, addToCart, removeFromCart, updateQuantity, clearCart } = useCart()
  const { favorites, toggleFavorite } = useFavorites()
  const { toast, showToast, hideToast } = useToast()

  // Filter candles based on search query only (category filtering now happens on category page)
  const filteredCandles = candlesData.filter(
    (candle) => 
      candle.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      candle.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      candle.scent.toLowerCase().includes(searchQuery.toLowerCase())
  )

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

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
        onSearchChange={setSearchQuery}
        searchQuery={searchQuery}
      />

      <main>
        <HeroSection />
        <BestSellersSection
          onCandleClick={handleCandleClick}
          onAddToCart={handleAddToCart}
          onToggleFavorite={handleToggleFavorite}
          favorites={favorites}
          cart={cart}
        />
        <CandleCollectionSection
          candles={filteredCandles}
          onCandleClick={handleCandleClick}
          onAddToCart={handleAddToCart}
          onToggleFavorite={handleToggleFavorite}
          favorites={favorites}
          cart={cart}
        />
        <CreativeFeature 
          onCategorySelect={setSelectedCategory}
          onCandleClick={handleCandleClick}
        />
        <AboutSection />
        <ContactSection />
      </main>

      <Footer />

      {/* Quick Actions */}
      <QuickActions
        favorites={favorites}
        cart={cart}
        onToggleFavorite={handleToggleFavorite}
        onAddToCart={handleAddToCart}
        onCandleClick={handleCandleClick}
        onCartClick={() => setIsCartModalOpen(true)}
      />

      {/* Modals */}
      {isCartModalOpen && (
        <CartModal
          cart={cart}
          onClose={() => setIsCartModalOpen(false)}
          onUpdateQuantity={updateQuantity}
          onRemoveItem={removeFromCart}
          onClearCart={clearCart}
        />
      )}

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

      {/* Toast */}
      {toast && <Toast message={toast.message} onClose={hideToast} />}
    </div>
  )
}
