"use client"

import { useState } from "react"
import { ArrowUp, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import FavoritesModal from "./FavoritesModal"
import type { CartItem } from "@/public/data"

interface QuickActionsProps {
  favorites: string[]
  cart: CartItem[]
  onToggleFavorite: (candleId: string) => void
  onAddToCart: (candleId: string) => void
  onCandleClick: (candleId: string) => void
  onCartClick: () => void
}

export default function QuickActions({
  favorites,
  cart,
  onToggleFavorite,
  onAddToCart,
  onCandleClick,
  onCartClick,
}: QuickActionsProps) {
  const [showFavorites, setShowFavorites] = useState(false)
  const [showScrollTop, setShowScrollTop] = useState(false)

  // Show/hide scroll to top button based on scroll position
  useState(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  })

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const openWhatsApp = () => {
    window.open("https://wa.me/917416778158", "_blank")
  }

  const openInstagram = () => {
    window.open("https://www.instagram.com/somascents_?igsh=Nmx2enA0eXZ4enRm", "_blank")
  }

  return (
    <>
      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 flex flex-col space-y-3 z-40">
        {/* Scroll to Top */}
        {showScrollTop && (
          <Button
            onClick={scrollToTop}
            size="sm"
            className="w-12 h-12 rounded-full bg-gray-800 hover:bg-gray-900 text-white shadow-lg"
          >
            <ArrowUp className="w-5 h-5" />
          </Button>
        )}

        {/* WhatsApp */}
        <Button
          onClick={openWhatsApp}
          size="sm"
          className="w-12 h-12 rounded-full bg-green-500 hover:bg-green-600 text-white shadow-lg"
        >
          <MessageCircle className="w-5 h-5" />
        </Button>

        {/* Instagram */}
        <Button
          onClick={openInstagram}
          size="sm"
          className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
          </svg>
        </Button>
      </div>

      {/* Favorites Modal */}
      {showFavorites && (
        <FavoritesModal
          favorites={favorites}
          cart={cart}
          onClose={() => setShowFavorites(false)}
          onToggleFavorite={onToggleFavorite}
          onAddToCart={onAddToCart}
          onCandleClick={onCandleClick}
        />
      )}
    </>
  )
}
