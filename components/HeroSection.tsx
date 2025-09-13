"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Sparkles, Gift, Flame, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"

export default function HeroSection() {
  const [currentOffer, setCurrentOffer] = useState(0)
  const [currentSlide, setCurrentSlide] = useState(0)

  const offers = [
    "🎉 Dussehra Special: Up to 30% OFF on all candles!",
    "✨ Free shipping on orders above ₹999",
    "🎁 Buy 3 Get 1 Free on selected items",
  ]

  const slideImages = [
    "/display1.jpg",
    "/display2.jpg",
    "/display3.jpg",
    "/display4.jpg",
    "/display5.jpg"
  ]

  useEffect(() => {
    const offerInterval = setInterval(() => {
      setCurrentOffer((prev) => (prev + 1) % offers.length)
    }, 4000)

    return () => clearInterval(offerInterval)
  }, [offers.length])

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slideImages.length)
    }, 3000)

    return () => clearInterval(slideInterval)
  }, [slideImages.length])

  const scrollToCandles = () => {
    const section = document.getElementById("candle-collection-section")
    if (section) {
      section.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <>
      {/* Offer Banner */}
      <div className="bg-gradient-to-r from-orange-500 to-amber-500 text-white py-3 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2">
            <Sparkles className="w-4 h-4 animate-pulse" />
            <span className="font-medium text-sm md:text-base">{offers[currentOffer]}</span>
            <Sparkles className="w-4 h-4 animate-pulse" />
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section id="hero-section" className="relative bg-white min-h-[80vh] flex items-center">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className="text-center lg:text-left space-y-6">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Illuminate Your
                  <span className="block text-orange-600">Sacred Moments</span>
                </h1>
                <p className="text-lg md:text-xl text-gray-600 max-w-2xl">
                  Discover our handcrafted candles made with premium ingredients and captivating fragrances. Perfect for
                  creating a warm, inviting atmosphere in your home.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button
                  onClick={scrollToCandles}
                  size="lg"
                  className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 text-lg"
                >
                  <Flame className="w-5 h-5 mr-2" />
                  Shop Now
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => {
                    const section = document.getElementById("about-section")
                    if (section) section.scrollIntoView({ behavior: "smooth" })
                  }}
                  className="px-8 py-3 text-lg bg-transparent"
                >
                  Learn More
                </Button>
              </div>

              {/* Features */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8">
                <div className="text-center lg:text-left">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto lg:mx-0 mb-3">
                    <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">Premium Quality</h3>
                  <p className="text-sm text-gray-600">Made with finest wax and natural fragrances</p>
                </div>

                <div className="text-center lg:text-left">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto lg:mx-0 mb-3">
                    <Gift className="w-6 h-6 text-orange-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">Perfect Gifts</h3>
                  <p className="text-sm text-gray-600">Beautifully packaged for special occasions</p>
                </div>

                <div className="text-center lg:text-left">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto lg:mx-0 mb-3">
                    <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">Long Lasting</h3>
                  <p className="text-sm text-gray-600">Extended burn time for lasting fragrance</p>
                </div>
              </div>
            </div>

            {/* Hero Image Slideshow */}
            <div className="relative">
              <div className="relative aspect-square max-w-lg mx-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-100 to-amber-100 rounded-full" />
                
                {/* Slideshow Images */}
                <div className="relative w-full h-full rounded-full overflow-hidden p-8">
                  {slideImages.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`SomaScents Candles - Slide ${index + 1}`}
                      className={`absolute inset-0 w-full h-full object-cover rounded-full p-8 transition-opacity duration-1000 ${currentSlide === index ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                    />
                  ))}
                  
                  {/* Slide Counter Removed */}
                </div>

                {/* Slideshow Navigation Removed */}

                {/* Navigation Arrows Removed */}

                {/* Floating Elements */}
                <div className="absolute z-20 top-10 right-10 w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center animate-bounce">
                  <Flame className="w-8 h-8 text-orange-600" />
                </div>

                <div className="absolute z-20 bottom-10 left-10 w-12 h-12 bg-orange-600 rounded-full shadow-lg flex items-center justify-center animate-pulse">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
