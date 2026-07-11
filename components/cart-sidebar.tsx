"use client"

import { useState } from 'react'
import Image from 'next/image'
import { X, Plus, Minus, Trash2, ShoppingBag, MessageCircle } from 'lucide-react'
import { useCart } from '@/context/cart-context'
import { AddressModal } from './address-modal'
import { cn } from '@/lib/utils'

export function CartSidebar() {
  const {
    items,
    isOpen,
    closeCart,
    deliveryFee,
    removeItem,
    updateQuantity,
    getSubtotal,
    getTotal,
  } = useCart()

  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false)

  const handleCheckout = () => {
    if (items.length === 0) return
    setIsAddressModalOpen(true)
  }

  const formatPrice = (price: number) => {
    return `Kz ${price.toLocaleString('pt-AO')}`
  }

  return (
    <>
      {/* Overlay */}
      <div
        className={cn(
          'fixed inset-0 bg-black/50 z-[199] transition-opacity duration-300',
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
        onClick={closeCart}
        aria-hidden="true"
      />

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white z-[200] flex flex-col shadow-2xl transition-transform duration-300 ease-out',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
        aria-label="Carrinho de compras"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b">
          <h2 className="font-display text-xl font-bold flex items-center gap-2">
            <ShoppingBag className="w-5 h-5" />
            Seu Pedido
          </h2>
          <button
            onClick={closeCart}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Fechar carrinho"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
              <div className="text-6xl mb-4 opacity-50">🛒</div>
              <h3 className="font-semibold text-lg mb-2">Carrinho vazio</h3>
              <p className="text-sm">Adicione deliciosas pizzas ao seu carrinho!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item, idx) => {
                const uniqueKey = `${item.id}-${item.size || 'default'}-${item.calzoneOption || ''}-${idx}`
                return (
                  <div
                    key={uniqueKey}
                    className="flex gap-4 p-4 bg-gray-50 rounded-xl animate-in slide-in-from-right duration-300"
                  >
                    {/* Image */}
                    <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden shrink-0 relative">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-sm truncate">{item.name}</h4>
                      {item.sizeLabel && (
                        <span className="inline-block mt-1 px-2 py-0.5 bg-primary/10 text-primary text-xs font-medium rounded-full">
                          {item.sizeLabel}
                        </span>
                      )}
                      <p className="text-primary font-semibold text-sm mt-1">
                        {formatPrice(item.price)}
                      </p>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex items-center border rounded-lg bg-white">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1, item.size, item.calzoneOption)}
                            className="p-1.5 hover:bg-gray-100 transition-colors"
                            aria-label="Diminuir quantidade"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-8 text-center text-sm font-semibold">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1, item.size, item.calzoneOption)}
                            className="p-1.5 hover:bg-gray-100 transition-colors"
                            aria-label="Aumentar quantidade"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => removeItem(item.id, item.size, item.calzoneOption)}
                      className="p-2 text-gray-400 hover:text-red-500 transition-colors self-start"
                      aria-label={`Remover ${item.name}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t bg-gray-50 p-6 space-y-4">
            {/* Summary */}
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal:</span>
                <span>{formatPrice(getSubtotal())}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Taxa de entrega:</span>
                <span>{formatPrice(deliveryFee)}</span>
              </div>
              <div className="flex justify-between text-lg font-bold text-primary pt-2 border-t">
                <span>Total:</span>
                <span>{formatPrice(getTotal())}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2">
              <button
                onClick={handleCheckout}
                className="w-full py-3 bg-primary text-white rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                Enviar Pedido via WhatsApp
              </button>
              <button
                onClick={closeCart}
                className="w-full py-3 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary hover:text-white transition-colors"
              >
                Voltar ao Cardápio
              </button>
            </div>
          </div>
        )}
      </aside>

      {/* Address Modal */}
      <AddressModal
        isOpen={isAddressModalOpen}
        onClose={() => setIsAddressModalOpen(false)}
      />
    </>
  )
}
