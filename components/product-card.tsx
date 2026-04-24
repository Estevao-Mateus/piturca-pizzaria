"use client"

import { useState } from 'react'
import Image from 'next/image'
import { ShoppingCart } from 'lucide-react'
import { useCart } from '@/context/cart-context'
import { showToast } from '@/components/toaster'
import { cn } from '@/lib/utils'
import { pizzaSizes, getPriceForSize, getSizeLabel, type Product, type PizzaSize } from '@/lib/products'

interface ProductCardProps {
  product: Product
  index?: number
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { addItem, openCart } = useCart()
  const [selectedSize, setSelectedSize] = useState<PizzaSize>('media')
  const [selectedCalzone, setSelectedCalzone] = useState<string>(product.calzoneOptions?.[0] || '')

  const currentPrice = product.hasSizes 
    ? getPriceForSize(selectedSize) 
    : product.fixedPrice || 0

  const handleAddToCart = () => {
    const itemName = product.calzoneOptions 
      ? `${product.name} (${selectedCalzone})`
      : product.name

    addItem({
      id: product.id,
      name: itemName,
      price: currentPrice,
      image: product.image,
      category: product.category,
      size: product.hasSizes ? selectedSize : undefined,
      sizeLabel: product.hasSizes ? getSizeLabel(selectedSize) : undefined,
      calzoneOption: product.calzoneOptions ? selectedCalzone : undefined,
    })
    
    const sizeText = product.hasSizes ? ` (${getSizeLabel(selectedSize)})` : ''
    showToast(`${itemName}${sizeText} adicionado ao carrinho!`, 'success')
    openCart()
  }

  const getBadgeStyles = (type: string) => {
    switch (type) {
      case 'destaque':
        return 'bg-primary/90 text-white'
      case 'picante':
        return 'bg-red-500/90 text-white'
      case 'veggie':
        return 'bg-green-500/90 text-white'
      case 'doce':
        return 'bg-amber-600/90 text-white'
      default:
        return 'bg-gray-500/90 text-white'
    }
  }

  const formatPrice = (price: number) => {
    return `${price.toLocaleString('pt-AO')} Kz`
  }

  return (
    <article
      className="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {product.badge && (
          <span
            className={cn(
              'absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold backdrop-blur-sm',
              getBadgeStyles(product.badge.type)
            )}
          >
            {product.badge.text}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-display text-xl font-bold text-foreground leading-tight">
          {product.name}
        </h3>
        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
          {product.description}
        </p>
        
        {/* Ingredients */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {product.ingredients.slice(0, 5).map((ingredient, i) => (
            <span 
              key={i} 
              className="inline-block px-2 py-0.5 bg-gray-100 text-xs text-gray-600 rounded-full"
            >
              {ingredient}
            </span>
          ))}
          {product.ingredients.length > 5 && (
            <span className="inline-block px-2 py-0.5 bg-gray-100 text-xs text-gray-600 rounded-full">
              +{product.ingredients.length - 5}
            </span>
          )}
        </div>

        {/* Calzone Options */}
        {product.calzoneOptions && (
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sabor do Calzone:
            </label>
            <div className="flex flex-wrap gap-2">
              {product.calzoneOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => setSelectedCalzone(option)}
                  className={cn(
                    'px-3 py-1.5 text-sm rounded-lg border transition-all',
                    selectedCalzone === option
                      ? 'bg-primary text-white border-primary'
                      : 'bg-white text-gray-700 border-gray-200 hover:border-primary'
                  )}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Size Selector - Responsive Button Grid */}
        {product.hasSizes && (
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tamanho:
            </label>
            <div className="grid grid-cols-3 gap-2">
              {pizzaSizes.map((size) => (
                <button
                  key={size.id}
                  onClick={() => setSelectedSize(size.id)}
                  className={cn(
                    'flex flex-col items-center justify-center px-2 py-2.5 rounded-lg border-2 transition-all text-center',
                    selectedSize === size.id
                      ? 'bg-primary/10 border-primary text-primary'
                      : 'bg-gray-50 border-gray-200 text-gray-700 hover:border-primary/50'
                  )}
                >
                  <span className="text-xs font-medium leading-tight">{size.label}</span>
                  <span className={cn(
                    "text-sm font-bold mt-0.5",
                    selectedSize === size.id ? "text-primary" : "text-gray-800"
                  )}>
                    {(size.price / 1000).toFixed(1)}k
                  </span>
                </button>
              ))}
            </div>
            <p className="text-center text-primary font-bold text-lg mt-2">
              {formatPrice(currentPrice)}
            </p>
          </div>
        )}

        {/* Fixed Price (for items without sizes) */}
        {!product.hasSizes && product.fixedPrice && (
          <div className="mt-4">
            <span className="text-2xl font-bold text-primary">
              {formatPrice(product.fixedPrice)}
            </span>
          </div>
        )}

        {/* Add to Cart Button */}
        <div className="mt-auto pt-4">
          <button
            onClick={handleAddToCart}
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-[#25D366] text-white rounded-xl font-semibold text-sm hover:bg-[#1aad54] transition-all hover:scale-[1.02] active:scale-[0.98]"
            aria-label={`Adicionar ${product.name} ao carrinho`}
          >
            <ShoppingCart className="w-5 h-5" />
            Adicionar ao Carrinho
          </button>
        </div>
      </div>
    </article>
  )
}
