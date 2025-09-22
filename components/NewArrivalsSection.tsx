"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Star, Sparkles } from "lucide-react"
import { newArrivalsData } from "@/public/data"
import Image from "next/image"
import { useCart } from "@/hooks/useCart"
import { useFavorites } from "@/hooks/useFavorites"

export default function NewArrivalsSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [animationStep, setAnimationStep] = useState(0)
  const { addToCart } = useCart()
  const { addToFavorites } = useFavorites()

  useEffect(() => {
    // Set visibility after component mounts for entrance animation
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    // Progress through animation steps
    if (isVisible) {
      const interval = setInterval(() => {
        setAnimationStep(prev => (prev < 4 ? prev + 1 : prev))
      }, 600)

      return () => clearInterval(interval)
    }
  }, [isVisible])

  return (
    <section className="py-16 relative overflow-hidden bg-gradient-to-b from-rose-50 to-pink-50">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 rounded-full border-2 border-pink-400 transform rotate-45"></div>
        <div className="absolute top-40 left-[30%] w-16 h-16 rounded-full border-2 border-pink-400 transform rotate-12"></div>
        <div className="absolute top-20 right-[25%] w-24 h-24 rounded-full border-2 border-pink-400 transform -rotate-20"></div>
        <div className="absolute bottom-20 left-[20%] w-20 h-20 rounded-full border-2 border-pink-400 transform rotate-30"></div>
        <div className="absolute bottom-40 right-[15%] w-16 h-16 rounded-full border-2 border-pink-400 transform -rotate-15"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Section header with animation */}
          <div className={`text-center mb-12 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h2 className="text-3xl md:text-4xl font-bold text-pink-800 mb-4 flex items-center justify-center">
              <Sparkles className="w-8 h-8 mr-3 text-pink-600" />
              <span>New Arrivals</span>
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-pink-400 to-rose-500 mx-auto rounded-full"></div>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              Discover our latest handcrafted candles, made with premium ingredients and unique designs
            </p>
          </div>

          {/* New Arrivals Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            {newArrivalsData.map((candle, index) => (
              <div 
                key={candle.id}
                className={`bg-white rounded-lg shadow-md overflow-hidden transition-all duration-1000 delay-${index * 200} transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
              >
                <div className="relative h-64 overflow-hidden group">
                  <Image 
                    src={candle.image} 
                    alt={candle.name}
                    width={500}
                    height={500}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-2 right-2 bg-pink-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    NEW
                  </div>
                  <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Button 
                      variant="secondary" 
                      size="sm" 
                      className="mr-2 bg-white hover:bg-pink-100"
                      onClick={() => addToCart(candle)}
                    >
                      Add to Cart
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="bg-white hover:bg-pink-100"
                      onClick={() => addToFavorites(candle)}
                    >
                      <Star className="w-4 h-4 mr-1" /> Save
                    </Button>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800">{candle.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">{candle.scent}</p>
                  <div className="mt-2 flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="text-lg font-bold text-pink-600">₹{candle.price}</span>
                      {candle.originalPrice && (
                        <span className="text-sm text-gray-500 line-through ml-2">₹{candle.originalPrice}</span>
                      )}
                    </div>
                    <div className="flex items-center">
                      {Array(5).fill(0).map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* View All Button */}
          <div className="text-center mt-12">
            <Button className="bg-pink-600 hover:bg-pink-700 text-white px-8 py-2">
              View All New Arrivals
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}