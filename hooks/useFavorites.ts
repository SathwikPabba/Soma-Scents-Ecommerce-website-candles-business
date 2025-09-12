"use client"

import { useState, useEffect } from "react"

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([])

  // Load favorites from localStorage on mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem("somascents_favorites")
    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites))
      } catch (error) {
        console.error("Error loading favorites from localStorage:", error)
      }
    }
  }, [])

  // Save favorites to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("somascents_favorites", JSON.stringify(favorites))
  }, [favorites])

  const toggleFavorite = (candleId: string) => {
    setFavorites((prevFavorites) => {
      const isFavorite = prevFavorites.includes(candleId)

      if (isFavorite) {
        return prevFavorites.filter((id) => id !== candleId)
      } else {
        return [...prevFavorites, candleId]
      }
    })
  }

  const isFavorite = (candleId: string) => {
    return favorites.includes(candleId)
  }

  return {
    favorites,
    toggleFavorite,
    isFavorite,
  }
}
