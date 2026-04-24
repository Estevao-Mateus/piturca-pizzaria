"use client"

import { useState, useEffect } from 'react'
import { ChevronUp } from 'lucide-react'
import { cn } from '@/lib/utils'

export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <button
      onClick={scrollToTop}
      className={cn(
        'fixed bottom-6 right-6 z-50 w-12 h-12 bg-primary text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:bg-primary/90 hover:scale-110',
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      )}
      aria-label="Voltar ao topo"
    >
      <ChevronUp className="w-6 h-6" />
    </button>
  )
}
