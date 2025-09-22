"use client"

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Gift, Sparkles } from "lucide-react";
import ComingSoonModal from "./ComingSoonModal";
import Image from "next/image";

interface PromotionalBannerProps {
  title?: string;
  startDate?: string;
  endDate?: string;
  discountPercentage?: number;
  collectionName?: string;
  actionText?: string;
  actionUrl?: string;
  bgColorClass?: string;
}

export default function PromotionalBanner({
  title = "Dussehra Offers Live Now",
  startDate = "Limited Time",
  endDate,
  discountPercentage = 40,
  collectionName = "Festival Collection",
  actionText = "Shop Now",
  actionUrl = "/category/festival-collection",
  bgColorClass = "bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500",
}: PromotionalBannerProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [animationIndex, setAnimationIndex] = useState(0);
  
  // Animation effect for the diya flames
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationIndex(prev => (prev + 1) % 3);
    }, 800);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className={`w-full py-3 ${bgColorClass} relative overflow-hidden`}>
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full">
          {/* Diya decorations */}
          <div className="absolute left-[3%] top-1/2 transform -translate-y-1/2 hidden md:block">
            <div className="relative w-8 h-8">
              <div className="absolute bottom-0 w-8 h-4 bg-yellow-800 rounded-b-full"></div>
              <div className="absolute bottom-2 w-8 h-2 bg-yellow-600 rounded-t-full"></div>
              <div className={`absolute bottom-4 w-4 h-6 bg-yellow-400 left-2 rounded-t-full animate-flame-${animationIndex}`}></div>
            </div>
          </div>
          
          <div className="absolute right-[3%] top-1/2 transform -translate-y-1/2 hidden md:block">
            <div className="relative w-8 h-8">
              <div className="absolute bottom-0 w-8 h-4 bg-yellow-800 rounded-b-full"></div>
              <div className="absolute bottom-2 w-8 h-2 bg-yellow-600 rounded-t-full"></div>
              <div className={`absolute bottom-4 w-4 h-6 bg-yellow-400 left-2 rounded-t-full animate-flame-${(animationIndex + 1) % 3}`}></div>
            </div>
          </div>
          
          {/* Rangoli pattern dots */}
          {[...Array(12)].map((_, i) => (
            <div 
              key={i} 
              className="absolute w-2 h-2 rounded-full bg-yellow-200 animate-pulse"
              style={{
                left: `${(i * 8) + 4}%`,
                top: i % 2 === 0 ? '15%' : '85%',
                animationDelay: `${i * 0.1}s`
              }}
            ></div>
          ))}
          
          {/* Floating flower petals */}
          {[...Array(5)].map((_, i) => (
            <div 
              key={i} 
              className="absolute w-3 h-3 bg-pink-400 rotate-45 animate-float-petal"
              style={{
                left: `${(i * 20) + 5}%`,
                top: '10%',
                animationDelay: `${i * 0.5}s`
              }}
            ></div>
          ))}
          
          {/* Light beam effect with more festive colors */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-100/20 to-transparent animate-pulse"></div>
        </div>
        
        <div className="container mx-auto flex items-center justify-between px-4 relative z-10">
          {/* Left decorative icon */}
          <div className="hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-yellow-100/30">
            <Gift className="w-5 h-5 text-yellow-100" />
          </div>
          
          {/* Center content */}
          <div className="flex-1 text-center text-white">
            <div className="flex flex-col md:flex-row items-center justify-center md:space-x-4">
              <div className="flex items-center">
                <Sparkles className="w-5 h-5 text-yellow-200 mr-2 animate-sparkle" />
                <span className="text-sm md:text-lg font-bold whitespace-nowrap">
                  {title} | Up to {discountPercentage}% OFF on {collectionName}
                </span>
                <Sparkles className="w-5 h-5 text-yellow-200 ml-2 animate-sparkle" />
              </div>
              <Button 
                size="sm" 
                variant="secondary" 
                className="mt-2 md:mt-0 text-xs md:text-sm bg-yellow-100 text-red-600 hover:bg-yellow-200 px-6 py-1.5 h-auto rounded-full font-bold shadow-lg transform transition-transform hover:scale-105"
                onClick={() => setIsModalOpen(true)}
              >
                <ShoppingBag className="w-3 h-3 mr-1" />
                {actionText}
              </Button>
            </div>
          </div>
          
          {/* Right decorative icon */}
          <div className="hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-yellow-100/30">
            <Gift className="w-5 h-5 text-yellow-100" />
          </div>
        </div>
      </div>
      
      {/* Coming Soon Modal */}
      <ComingSoonModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        collectionName={collectionName}
        launchDate={startDate}
      />
      
      {/* Add animation styles */}
      <style jsx global>{`
        @keyframes flame-0 {
          0%, 100% { transform: scaleY(1); background-color: #FBBF24; }
          50% { transform: scaleY(1.2); background-color: #F59E0B; }
        }
        @keyframes flame-1 {
          0%, 100% { transform: scaleY(1.1); background-color: #F59E0B; }
          50% { transform: scaleY(0.9); background-color: #FBBF24; }
        }
        @keyframes flame-2 {
          0%, 100% { transform: scaleY(0.9); background-color: #F97316; }
          50% { transform: scaleY(1.1); background-color: #F59E0B; }
        }
        @keyframes float-petal {
          0% { transform: translateY(0) rotate(45deg); opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { transform: translateY(80px) rotate(225deg); opacity: 0; }
        }
        @keyframes sparkle {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(0.8); }
        }
        .animate-flame-0 { animation: flame-0 1.5s infinite; }
        .animate-flame-1 { animation: flame-1 1.8s infinite; }
        .animate-flame-2 { animation: flame-2 1.2s infinite; }
        .animate-float-petal { animation: float-petal 8s infinite; }
        .animate-sparkle { animation: sparkle 2s infinite; }
      `}</style>
    </>
  );
}