"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { X, Flame, Calendar, Gift, Star } from "lucide-react"

interface ComingSoonModalProps {
  isOpen: boolean
  onClose: () => void
  collectionName: string
  launchDate?: string
}

export default function ComingSoonModal({
  isOpen,
  onClose,
  collectionName = "Festival Collection",
  launchDate = "October 22nd"
}: ComingSoonModalProps) {
  const [animationStep, setAnimationStep] = useState(0)
  
  useEffect(() => {
    if (isOpen) {
      // Reset animation step when modal opens
      setAnimationStep(0)
      
      // Progress through animation steps
      const timer = setInterval(() => {
        setAnimationStep(prev => (prev < 3 ? prev + 1 : prev))
      }, 800)
      
      return () => clearInterval(timer)
    }
  }, [isOpen])
  
  if (!isOpen) return null
  
  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div 
        className="bg-gradient-to-b from-amber-50 to-orange-50 rounded-lg shadow-xl w-full max-w-md relative overflow-hidden"
        style={{ maxHeight: '90vh' }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 z-10"
        >
          <X className="w-6 h-6" />
        </button>
        
        {/* Content */}
        <div className="p-6 pt-10 text-center">
          <div className="space-y-6">
            {/* Animated candle */}
            <div className="relative h-40 mx-auto w-32">
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-20 h-32 bg-gradient-to-t from-amber-200 to-amber-100 rounded-lg shadow-md">
                {/* Candle body */}
              </div>
              
              {/* Candle wick */}
              <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2 w-1 h-4 bg-gray-800 rounded-full"></div>
              
              {/* Animated flame */}
              <div className="absolute bottom-36 left-1/2 transform -translate-x-1/2">
                <div className="relative">
                  <div className="absolute w-6 h-10 bg-gradient-to-t from-orange-400 via-yellow-300 to-yellow-200 rounded-full animate-flame-flicker opacity-90"></div>
                  <div className="absolute w-4 h-8 bg-gradient-to-t from-yellow-200 via-yellow-100 to-white rounded-full animate-flame-sway opacity-80 top-1 left-1"></div>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute top-0 left-0 w-full h-full">
                <div className={`absolute top-5 left-2 transition-opacity duration-500 ${animationStep >= 1 ? 'opacity-100' : 'opacity-0'}`}>
                  <Star className="w-4 h-4 text-yellow-400 animate-pulse" />
                </div>
                <div className={`absolute top-10 right-3 transition-opacity duration-500 ${animationStep >= 2 ? 'opacity-100' : 'opacity-0'}`}>
                  <Star className="w-5 h-5 text-amber-500 animate-pulse delay-300" />
                </div>
                <div className={`absolute bottom-20 left-3 transition-opacity duration-500 ${animationStep >= 1 ? 'opacity-100' : 'opacity-0'}`}>
                  <Star className="w-3 h-3 text-yellow-300 animate-pulse delay-150" />
                </div>
              </div>
            </div>
            
            {/* Text content */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-orange-600">
                {collectionName} Coming Soon!
              </h2>
              
              <p className="text-gray-600">
                We're crafting something special for you. Our new collection of handmade, aromatic candles will be available soon.
              </p>
              
              <div className="flex items-center justify-center space-x-2 text-amber-700">
                <Calendar className="w-5 h-5" />
                <span>Launching on {launchDate}</span>
              </div>
              
              <div className="bg-orange-100 p-4 rounded-lg mt-4">
                <h3 className="font-medium text-orange-700 flex items-center justify-center">
                  <Gift className="w-4 h-4 mr-2" />
                  Special Launch Offers
                </h3>
                <ul className="text-sm text-gray-700 mt-2 space-y-1">
                  <li>• Early bird discount of 30% OFF</li>
                  <li>• Free shipping on all orders</li>
                  <li>• Exclusive gift with purchase</li>
                </ul>
              </div>
            </div>
            
            {/* Notification signup */}
            <div className="mt-6">
              <Button 
                onClick={onClose}
                className="bg-orange-600 hover:bg-orange-700 text-white w-full"
              >
                <Flame className="w-4 h-4 mr-2" />
                Notify Me When Available
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Add these animations to your globals.css file
/*
@keyframes flame-flicker {
  0%, 100% { transform: scale(1); opacity: 0.9; }
  25% { transform: scale(1.1, 0.9); opacity: 1; }
  50% { transform: scale(0.9, 1.1); opacity: 0.8; }
  75% { transform: scale(1.05); opacity: 0.9; }
}

@keyframes flame-sway {
  0%, 100% { transform: translateX(0) rotate(-5deg); }
  50% { transform: translateX(1px) rotate(5deg); }
}

.animate-flame-flicker {
  animation: flame-flicker 2s infinite ease-in-out;
}

.animate-flame-sway {
  animation: flame-sway 3s infinite ease-in-out;
}
*/