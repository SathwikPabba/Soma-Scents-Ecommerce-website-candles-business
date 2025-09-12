"use client"

import { useState, useEffect } from "react"
import type { Candle, CartItem } from "@/lib/data"

export function useCart() {
  const [cart, setCart] = useState<CartItem[]>([])

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("somascents_cart")
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart))
      } catch (error) {
        console.error("Error loading cart from localStorage:", error)
      }
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("somascents_cart", JSON.stringify(cart))
  }, [cart])

  const addToCart = (candle: Candle, quantity = 1) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === candle.id)

      if (existingItem) {
        return prevCart.map((item) => (item.id === candle.id ? { ...item, quantity: item.quantity + quantity } : item))
      } else {
        return [...prevCart, { ...candle, quantity }]
      }
    })
  }

  const removeFromCart = (candleId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== candleId))
  }

  const updateQuantity = (candleId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(candleId)
      return
    }

    setCart((prevCart) => prevCart.map((item) => (item.id === candleId ? { ...item, quantity } : item)))
  }

  const clearCart = () => {
    setCart([])
  }

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0)
  }

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalPrice,
    getTotalItems,
  }
}
