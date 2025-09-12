"use client"

import { useState, useRef, useEffect } from "react"
import { Search, Heart, ShoppingCart, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { candlesData } from "@/public/data"

interface HeaderProps {
  cartCount: number
  favoritesCount: number
  onCartClick: () => void
  onFavoritesClick: () => void
  onSearchChange: (query: string) => void
  searchQuery: string
}

export default function Header({ cartCount, favoritesCount, onCartClick, onFavoritesClick, onSearchChange, searchQuery }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const [searchSuggestions, setSearchSuggestions] = useState<typeof candlesData>([])
  const searchRef = useRef<HTMLDivElement>(null)

  // Handle search suggestions
  useEffect(() => {
    if (searchQuery.length >= 2) {
      const filtered = candlesData.filter(
        (candle) =>
          candle.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          candle.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          candle.scent.toLowerCase().includes(searchQuery.toLowerCase()),
      )
      setSearchSuggestions(filtered.slice(0, 5)) // Limit to 5 suggestions
    } else {
      setSearchSuggestions([])
    }
  }, [searchQuery])

  // Close search suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleSuggestionClick = (candle: (typeof candlesData)[0]) => {
    onSearchChange(candle.name)
    setIsSearchFocused(false)
    // Scroll to candle collection section
    const section = document.getElementById("candle-collection-section")
    if (section) {
      section.scrollIntoView({ behavior: "smooth" })
    }
  }

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: "smooth" })
    }
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <img src="/favicon.png" alt="SomaScents Logo" className="h-8 w-8 lg:h-10 lg:w-10" />
              <h1 className="text-xl lg:text-2xl font-bold text-gray-900">
                <span className="text-orange-600">Soma</span>Scents
              </h1>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              <button
                onClick={() => scrollToSection("hero-section")}
                className="text-gray-700 hover:text-orange-600 font-medium transition-colors"
              >
                Home
              </button>
              <div className="relative group">
                <button className="text-gray-700 hover:text-orange-600 font-medium transition-colors flex items-center space-x-1">
                  <span>Shop</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {/* Mega Menu */}
                <div className="absolute top-full left-0 w-screen max-w-4xl bg-white shadow-lg border border-gray-100 rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="grid grid-cols-5 gap-6 p-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">CANDLES COLLECTIONS</h4>
                      <div className="space-y-2 text-sm text-gray-600">
                        <div>Flavors of India</div>
                        <div>Flowers of India</div>
                        <div>Fruits of India</div>
                        <div>Wellness of India</div>
                        <div>Spices of India</div>
                        <div>Spirits of India</div>
                        <div>Seasons of India</div>
                        <div>Mithas of India</div>
                        <div>Colours of India</div>
                        <div>Pataka of India</div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">ESSENTIAL KIT</h4>
                      <div className="space-y-2 text-sm text-gray-600">
                        <div>Mosquito Repellant Candle</div>
                        <div>Aroma Wax Bar</div>
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-3 mt-4">FESTIVE</h4>
                      <div className="space-y-2 text-sm text-gray-600">
                        <div>Celebration</div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">SHOP BY PRICE</h4>
                      <div className="space-y-2 text-sm text-gray-600">
                        <div>Below ₹1000</div>
                        <div>₹1000 - ₹2000</div>
                        <div>Above ₹2000</div>
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-3 mt-4">SHOP BY SIZE</h4>
                      <div className="space-y-2 text-sm text-gray-600">
                        <div>Small</div>
                        <div>Medium</div>
                        <div>Large</div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">SHOP BY MOOD</h4>
                      <div className="space-y-2 text-sm text-gray-600">
                        <div>Calming & Relaxation</div>
                        <div>Festive</div>
                        <div>Hopeful & Optimistic</div>
                        <div>Mischievous & Carefree</div>
                        <div>Party & Unwinding</div>
                        <div>Peaceful & Meditative</div>
                        <div>Re-Energising & Uplifting</div>
                        <div>Romance & Passionate</div>
                        <div>Work & Study</div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">FRAGRANCE BY ROOM</h4>
                      <div className="space-y-2 text-sm text-gray-600">
                        <div>Bed Room</div>
                        <div>Dining Area</div>
                        <div>Kitchen</div>
                        <div>Living Room</div>
                        <div>Meditation Room</div>
                        <div>Office</div>
                        <div>Washroom</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <button
                onClick={() => scrollToSection("candle-collection-section")}
                className="text-gray-700 hover:text-orange-600 font-medium transition-colors"
              >
                Candles
              </button>
              <button
                onClick={() => scrollToSection("about-section")}
                className="text-gray-700 hover:text-orange-600 font-medium transition-colors"
              >
                About Us
              </button>
              <button
                onClick={() => scrollToSection("contact-section")}
                className="text-gray-700 hover:text-orange-600 font-medium transition-colors"
              >
                Contact
              </button>
            </nav>

            {/* Right side features */}
            <div className="flex items-center space-x-3 lg:space-x-4">
              {/* Search */}
              <div ref={searchRef} className="relative hidden md:block">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    type="text"
                    placeholder="Search candles..."
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    onFocus={() => setIsSearchFocused(true)}
                    className="pl-10 pr-4 py-2 w-60 rounded-full border-gray-200 focus:border-orange-500 focus:ring-orange-500"
                  />
                </div>

                {/* Search Suggestions */}
                {isSearchFocused && searchSuggestions.length > 0 && (
                  <div className="absolute top-full left-0 w-80 bg-white border border-gray-200 rounded-lg shadow-lg mt-2 z-50 max-h-96 overflow-y-auto">
                    {searchSuggestions.map((candle) => (
                      <div
                        key={candle.id}
                        onClick={() => handleSuggestionClick(candle)}
                        className="flex items-center p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                      >
                        <img
                          src={candle.image || "/placeholder.svg"}
                          alt={candle.name}
                          className="w-12 h-12 object-cover rounded-md mr-3"
                        />
                        <div className="flex-1">
                          <div className="font-medium text-gray-900 text-sm">{candle.name}</div>
                          <div className="text-orange-600 font-semibold text-sm">₹{candle.price}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Favorites */}
              <Button variant="ghost" size="sm" onClick={onFavoritesClick} className="relative p-2">
                <Heart className="w-5 h-5 text-gray-600" />
                {favoritesCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-orange-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {favoritesCount}
                  </span>
                )}
              </Button>

              {/* Cart */}
              <Button variant="ghost" size="sm" onClick={onCartClick} className="relative p-2">
                <ShoppingCart className="w-5 h-5 text-gray-600" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-orange-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Button>

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <>
          <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setIsMobileMenuOpen(false)} />
          <div className="fixed top-16 left-0 right-0 bg-white border-b border-gray-200 z-50 lg:hidden">
            <div className="p-4 space-y-4">
              {/* Mobile Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Search candles..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full rounded-full border-gray-200 focus:border-orange-500 focus:ring-orange-500"
                />
              </div>

              {/* Mobile Navigation */}
              <nav className="space-y-2">
                <button
                  onClick={() => scrollToSection("hero-section")}
                  className="block w-full text-left py-2 px-4 text-gray-700 hover:bg-gray-50 rounded-lg"
                >
                  Home
                </button>
                <button
                  onClick={() => scrollToSection("candle-collection-section")}
                  className="block w-full text-left py-2 px-4 text-gray-700 hover:bg-gray-50 rounded-lg"
                >
                  Shop
                </button>
                <button
                  onClick={() => scrollToSection("candle-collection-section")}
                  className="block w-full text-left py-2 px-4 text-gray-700 hover:bg-gray-50 rounded-lg"
                >
                  Candles
                </button>
                <button
                  onClick={() => scrollToSection("about-section")}
                  className="block w-full text-left py-2 px-4 text-gray-700 hover:bg-gray-50 rounded-lg"
                >
                  About Us
                </button>
                <button
                  onClick={() => scrollToSection("contact-section")}
                  className="block w-full text-left py-2 px-4 text-gray-700 hover:bg-gray-50 rounded-lg"
                >
                  Contact
                </button>
              </nav>

              {/* Mobile Actions */}
              <div className="flex space-x-4 pt-4 border-t border-gray-200">
                <Button 
                  variant="outline" 
                  onClick={onFavoritesClick}
                  className="flex-1 flex items-center justify-center space-x-2 bg-transparent"
                >
                  <Heart className="w-4 h-4" />
                  <span>Favorites ({favoritesCount})</span>
                </Button>
                <Button onClick={onCartClick} className="flex-1 flex items-center justify-center space-x-2">
                  <ShoppingCart className="w-4 h-4" />
                  <span>Cart ({cartCount})</span>
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}
