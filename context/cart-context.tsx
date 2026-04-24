"use client"

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react'
import type { PizzaSize } from '@/lib/products'

export interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
  category: string
  size?: PizzaSize
  sizeLabel?: string
  calzoneOption?: string
}

interface CouponData {
  code: string
  discount: number | 'frete'
}

interface CartContextType {
  items: CartItem[]
  isOpen: boolean
  coupon: CouponData | null
  deliveryFee: number
  addItem: (item: Omit<CartItem, 'quantity'>) => void
  removeItem: (id: string, size?: PizzaSize, calzoneOption?: string) => void
  updateQuantity: (id: string, quantity: number, size?: PizzaSize, calzoneOption?: string) => void
  clearCart: () => void
  openCart: () => void
  closeCart: () => void
  applyCoupon: (code: string) => boolean
  removeCoupon: () => void
  getSubtotal: () => number
  getDiscount: () => number
  getTotal: () => number
  getTotalItems: () => number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

const COUPONS: Record<string, number | 'frete'> = {
  "DESCONTO10": 0.10,
  "DESCONTO15": 0.15,
  "PRIMEIRACOMPRA": 0.20,
  "FRETEGRATIS": "frete"
}

const STORAGE_KEY = 'piturca_carrinho'
const DELIVERY_FEE = 500

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [coupon, setCoupon] = useState<CouponData | null>(null)
  const [isHydrated, setIsHydrated] = useState(false)

  // Load cart from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      try {
        setItems(JSON.parse(stored))
      } catch {
        localStorage.removeItem(STORAGE_KEY)
      }
    }
    setIsHydrated(true)
  }, [])

  // Save cart to localStorage on change
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    }
  }, [items, isHydrated])

  // Prevent body scroll when cart is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const addItem = useCallback((newItem: Omit<CartItem, 'quantity'>) => {
    setItems(prev => {
      // Create unique ID based on product + size + calzone option
      const uniqueId = `${newItem.id}-${newItem.size || 'default'}-${newItem.calzoneOption || ''}`
      const existing = prev.find(item => {
        const existingUniqueId = `${item.id}-${item.size || 'default'}-${item.calzoneOption || ''}`
        return existingUniqueId === uniqueId
      })
      if (existing) {
        return prev.map(item => {
          const itemUniqueId = `${item.id}-${item.size || 'default'}-${item.calzoneOption || ''}`
          return itemUniqueId === uniqueId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        })
      }
      return [...prev, { ...newItem, quantity: 1 }]
    })
  }, [])

  const removeItem = useCallback((id: string, size?: PizzaSize, calzoneOption?: string) => {
    const uniqueId = `${id}-${size || 'default'}-${calzoneOption || ''}`
    setItems(prev => prev.filter(item => {
      const itemUniqueId = `${item.id}-${item.size || 'default'}-${item.calzoneOption || ''}`
      return itemUniqueId !== uniqueId
    }))
  }, [])

  const updateQuantity = useCallback((id: string, quantity: number, size?: PizzaSize, calzoneOption?: string) => {
    if (quantity < 1) {
      removeItem(id, size, calzoneOption)
      return
    }
    const uniqueId = `${id}-${size || 'default'}-${calzoneOption || ''}`
    setItems(prev =>
      prev.map(item => {
        const itemUniqueId = `${item.id}-${item.size || 'default'}-${item.calzoneOption || ''}`
        return itemUniqueId === uniqueId ? { ...item, quantity } : item
      })
    )
  }, [removeItem])

  const clearCart = useCallback(() => {
    setItems([])
    setCoupon(null)
  }, [])

  const openCart = useCallback(() => setIsOpen(true), [])
  const closeCart = useCallback(() => setIsOpen(false), [])

  const applyCoupon = useCallback((code: string): boolean => {
    const upperCode = code.toUpperCase()
    if (COUPONS[upperCode]) {
      setCoupon({ code: upperCode, discount: COUPONS[upperCode] })
      return true
    }
    return false
  }, [])

  const removeCoupon = useCallback(() => {
    setCoupon(null)
  }, [])

  const getSubtotal = useCallback(() => {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  }, [items])

  const getDiscount = useCallback(() => {
    if (!coupon || coupon.discount === 'frete') return 0
    return getSubtotal() * coupon.discount
  }, [coupon, getSubtotal])

  const getTotal = useCallback(() => {
    const subtotal = getSubtotal()
    const discount = getDiscount()
    const delivery = coupon?.discount === 'frete' ? 0 : DELIVERY_FEE
    return subtotal - discount + (items.length > 0 ? delivery : 0)
  }, [getSubtotal, getDiscount, coupon, items.length])

  const getTotalItems = useCallback(() => {
    return items.reduce((sum, item) => sum + item.quantity, 0)
  }, [items])

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        coupon,
        deliveryFee: coupon?.discount === 'frete' ? 0 : DELIVERY_FEE,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        openCart,
        closeCart,
        applyCoupon,
        removeCoupon,
        getSubtotal,
        getDiscount,
        getTotal,
        getTotalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
