"use client"

import { useState } from 'react'
import { products, categories, pizzaSizes, type Category } from '@/lib/products'
import { ProductCard } from '@/components/product-card'
import { cn } from '@/lib/utils'
import { ScrollAnimation, ScrollAnimationGroup, ScrollAnimationItem } from '@/components/scroll-animations'

export default function CardapioPage() {
  const [activeCategory, setActiveCategory] = useState<Category>('todos')

  const filteredProducts = activeCategory === 'todos'
    ? products
    : products.filter(product => product.category === activeCategory)

  return (
    <div className="py-12">
      {/* Header */}
      <ScrollAnimation variant="fadeInDown">
        <section className="text-center mb-8 px-6">
          <h1 className="font-display text-4xl md:text-5xl font-black mb-4">
            Nosso <span className="text-primary">Cardápio</span>
          </h1>
          <div className="w-16 h-1 bg-gradient-to-r from-primary to-[#e8c46a] rounded-full mx-auto mb-4" />
          <p className="text-muted-foreground max-w-xl mx-auto">
            Pizzas artesanais feitas com os melhores ingredientes. Escolha a sua favorita!
          </p>
        </section>
      </ScrollAnimation>

      {/* Size Prices */}
      <ScrollAnimation variant="fadeInUp">
        <section className="max-w-4xl mx-auto px-6 mb-12">
          <div className="bg-gradient-to-r from-[#0d0d0d] to-[#1a1a1a] rounded-2xl p-6 md:p-8">
            <h2 className="font-display text-xl md:text-2xl font-bold text-white text-center mb-6">
              Tamanhos e Preços
            </h2>
            <ScrollAnimationGroup staggerDelay={0.1}>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {pizzaSizes.map((size) => (
                  <ScrollAnimationItem key={size.id} variant="scaleIn">
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-white/10">
                      <h3 className="text-white font-bold text-lg">{size.label}</h3>
                      <p className="text-[#e8c46a] font-bold text-2xl mt-2">
                        {size.price.toLocaleString('pt-AO')} Kz
                      </p>
                    </div>
                  </ScrollAnimationItem>
                ))}
              </div>
            </ScrollAnimationGroup>
          </div>
        </section>
      </ScrollAnimation>

      {/* Filters */}
      <ScrollAnimation variant="fadeInUp">
        <section className="max-w-7xl mx-auto px-6 mb-10">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={cn(
                  'px-6 py-2.5 rounded-full border-2 font-medium text-sm transition-all duration-200',
                  activeCategory === category.id
                    ? 'bg-primary border-primary text-white shadow-lg shadow-primary/30'
                    : 'border-gray-200 text-muted-foreground hover:border-primary hover:text-primary'
                )}
                aria-pressed={activeCategory === category.id}
              >
                {category.label}
              </button>
            ))}
          </div>
        </section>
      </ScrollAnimation>

      {/* Products Grid */}
      <section className="max-w-7xl mx-auto px-6">
        {filteredProducts.length > 0 ? (
          <ScrollAnimationGroup staggerDelay={0.08}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ScrollAnimationItem key={product.id} variant="scaleIn">
                  <ProductCard product={product} index={0} />
                </ScrollAnimationItem>
              ))}
            </div>
          </ScrollAnimationGroup>
        ) : (
          <ScrollAnimation variant="fadeInUp">
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🍕</div>
              <p className="text-lg text-muted-foreground">
                Nenhuma pizza encontrada nesta categoria.
              </p>
            </div>
          </ScrollAnimation>
        )}
      </section>


    </div>
  )
}
