"use client"

import { useState, useCallback } from "react"

interface Toast {
  message: string
  id: number
}

export function useToast() {
  const [toast, setToast] = useState<Toast | null>(null)

  const showToast = useCallback((message: string) => {
    const id = Date.now()
    setToast({ message, id })

    // Auto-hide after 3 seconds
    setTimeout(() => {
      setToast(null)
    }, 3000)
  }, [])

  const hideToast = useCallback(() => {
    setToast(null)
  }, [])

  return {
    toast,
    showToast,
    hideToast,
  }
}
