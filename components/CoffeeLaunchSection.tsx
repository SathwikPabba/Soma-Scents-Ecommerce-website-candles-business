"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Coffee, Cloud, Clock, Calendar, Star } from "lucide-react"

export default function CoffeeLaunchSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [animationStep, setAnimationStep] = useState(0)

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
    <section className="py-16 relative overflow-hidden bg-gradient-to-b from-amber-50 to-orange-50">
      {/* Background coffee beans pattern - blurred */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 rounded-full border-2 border-brown-600 transform rotate-45"></div>
        <div className="absolute top-40 left-[30%] w-16 h-16 rounded-full border-2 border-brown-600 transform rotate-12"></div>
        <div className="absolute top-20 right-[25%] w-24 h-24 rounded-full border-2 border-brown-600 transform -rotate-20"></div>
        <div className="absolute bottom-20 left-[20%] w-20 h-20 rounded-full border-2 border-brown-600 transform rotate-30"></div>
        <div className="absolute bottom-40 right-[15%] w-16 h-16 rounded-full border-2 border-brown-600 transform -rotate-15"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Section header with animation */}
          <div className={`text-center mb-12 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h2 className="text-3xl md:text-4xl font-bold text-brown-800 mb-4 flex items-center justify-center">
              <Coffee className="w-8 h-8 mr-3 text-amber-700" />
              <span>Coffee Collection</span>
              <span className="ml-2 text-amber-600">Coming Soon</span>
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-amber-400 to-amber-600 mx-auto rounded-full"></div>
          </div>

          {/* Coffee candle preview */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Left side - Coffee video */}
            <div className={`relative w-full md:w-1/2 aspect-square max-w-md mx-auto transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
              <div className="relative mx-auto w-full h-full flex items-center justify-center">
                {/* Coffee video with autoplay and loop */}
                <div className="relative w-64 h-64 rounded-lg overflow-hidden shadow-xl">
                  <video 
                    className="w-full h-full object-cover" 
                    autoPlay 
                    muted 
                    loop 
                    playsInline
                    ref={(el) => {
                      if (el && isVisible) {
                        el.play().catch(e => console.error("Video play error:", e));
                      }
                    }}
                  >
                    <source src="/coffee.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className={`absolute top-5 left-5 transition-opacity duration-500 ${animationStep >= 1 ? 'opacity-100' : 'opacity-0'}`}>
                <Star className="w-6 h-6 text-amber-400 animate-pulse" />
              </div>
              <div className={`absolute bottom-10 right-10 transition-opacity duration-500 ${animationStep >= 3 ? 'opacity-100' : 'opacity-0'}`}>
                <Star className="w-5 h-5 text-amber-500 animate-pulse delay-300" />
              </div>
              <div className={`absolute top-1/2 right-5 transition-opacity duration-500 ${animationStep >= 2 ? 'opacity-100' : 'opacity-0'}`}>
                <div className="w-3 h-3 bg-amber-400/50 rounded-full animate-ping"></div>
              </div>
            </div>
            
            {/* Right side - Information */}
            <div className={`w-full md:w-1/2 text-center md:text-left transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
              <h3 className="text-2xl font-bold text-amber-800 mb-4">Aromatic Coffee Candle Collection</h3>
              
              <p className="text-gray-700 mb-6">
                Experience the rich, inviting aroma of freshly brewed coffee in our upcoming collection. 
                Handcrafted with premium ingredients and real coffee extracts for an authentic sensory experience.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className={`flex items-center transition-all duration-500 delay-300 ${animationStep >= 1 ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-5'}`}>
                  <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center mr-3">
                    <Calendar className="w-5 h-5 text-amber-700" />
                  </div>
                  <span className="text-gray-700">Launching soon</span>
                </div>
                
                <div className={`flex items-center transition-all duration-500 delay-500 ${animationStep >= 2 ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-5'}`}>
                  <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center mr-3">
                    <Coffee className="w-5 h-5 text-amber-700" />
                  </div>
                  <span className="text-gray-700">Featuring Espresso, Mocha, and Vanilla Latte scents</span>
                </div>
                
                <div className={`flex items-center transition-all duration-500 delay-700 ${animationStep >= 3 ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-5'}`}>
                  <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center mr-3">
                    <Clock className="w-5 h-5 text-amber-700" />
                  </div>
                  <span className="text-gray-700">30+ hours of cozy coffee ambiance</span>
                </div>
              </div>
              
              <div className={`transition-all duration-500 delay-1000 ${animationStep >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
                <Button 
                  className="bg-amber-700 hover:bg-amber-800 text-white px-6 py-2 rounded-full"
                  onClick={() => alert("You'll be notified when our Coffee Collection launches!")}
                >
                  Notify Me When Available
                </Button>
              </div>
            </div>
          </div>
          
          {/* Blurred preview tag */}
          <div className="mt-16 text-center">
            <div className="inline-block px-6 py-2 bg-amber-100/50 backdrop-blur-sm rounded-full">
              <span className="text-amber-800 font-medium">Preview images coming soon</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}