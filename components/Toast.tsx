"use client"

import { useEffect } from "react"
import { X } from "lucide-react"

interface ToastProps {
  message: string
  onClose: () => void
}

export default function Toast({ message, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, 3000)

    return () => clearTimeout(timer)
  }, [onClose])

  return (
    <div className="fixed top-8 right-8 z-50 animate-in slide-in-from-right-full duration-300">
      <div className="bg-orange-600 text-white px-6 py-4 rounded-lg shadow-lg flex items-center space-x-3 min-w-64">
        <span className="font-medium">{message}</span>
        <button onClick={onClose} className="text-white/80 hover:text-white">
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
