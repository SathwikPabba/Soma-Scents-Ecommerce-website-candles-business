"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";
import ComingSoonModal from "./ComingSoonModal";

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
  title = "Dussehra Special Offers",
  startDate = "October 22nd",
  endDate,
  discountPercentage = 30,
  collectionName = "Festival Collection",
  actionText = "Shop Now",
  actionUrl = "/category/festival-collection",
  bgColorClass = "bg-gradient-to-r from-orange-500 to-amber-400",
}: PromotionalBannerProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <div className={`w-full py-2 ${bgColorClass} relative overflow-hidden`}>
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full">
          {/* Star decorations */}
          <div className="absolute left-[5%] top-1/2 transform -translate-y-1/2">
            <div className="w-5 h-5 text-yellow-200 opacity-70">✦</div>
          </div>
          <div className="absolute right-[5%] top-1/2 transform -translate-y-1/2">
            <div className="w-5 h-5 text-yellow-200 opacity-70">✦</div>
          </div>
          
          {/* Sparkle effects */}
          <div className="absolute left-[20%] top-1/3">
            <div className="w-3 h-3 bg-yellow-200/30 rotate-45 animate-pulse"></div>
          </div>
          <div className="absolute right-[20%] bottom-1/3">
            <div className="w-3 h-3 bg-yellow-200/30 rotate-45 animate-pulse"></div>
          </div>
          
          {/* Light beam effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse"></div>
        </div>
        
        <div className="container mx-auto flex items-center justify-between px-4 relative z-10">
          {/* Left decorative icon */}
          <div className="hidden md:flex items-center justify-center w-8 h-8 rounded-full bg-yellow-200/20">
            <div className="w-4 h-4 text-white">✦</div>
          </div>
          
          {/* Center content */}
          <div className="flex-1 text-center text-white">
            <div className="flex flex-col md:flex-row items-center justify-center md:space-x-4">
              <span className="text-sm md:text-base font-medium whitespace-nowrap">
                Starting {startDate} | Up to {discountPercentage}% OFF on {collectionName}
              </span>
              <Button 
                  size="sm" 
                  variant="secondary" 
                  className="text-xs md:text-sm bg-white text-orange-600 hover:bg-white/90 px-4 py-1 h-auto rounded-full font-medium"
                  onClick={() => setIsModalOpen(true)}
                >
                  <ShoppingBag className="w-3 h-3 mr-1" />
                  {actionText}
                </Button>
            </div>
          </div>
          
          {/* Right decorative icon */}
          <div className="hidden md:flex items-center justify-center w-8 h-8 rounded-full bg-yellow-200/20">
            <div className="w-4 h-4 text-white">✦</div>
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
    </>
  );
}