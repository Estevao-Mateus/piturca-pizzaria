"use client"

import { useState } from 'react'
import { X, Loader2 } from 'lucide-react'
import { useCart } from '@/context/cart-context'
import { cn } from '@/lib/utils'

interface AddressModalProps {
  isOpen: boolean
  onClose: () => void
}

export function AddressModal({ isOpen, onClose }: AddressModalProps) {
  const { items, coupon, getSubtotal, getDiscount, deliveryFee, getTotal, clearCart, closeCart } = useCart()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    neighborhood: '',
    number: '',
    address: '',
    reference: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Build WhatsApp message
    let message = `🍕 *NOVO PEDIDO - PITURCA PIZZARIA*\n\n`
    message += `👤 *Cliente:* ${formData.name}\n`
    message += `📱 *Telefone:* ${formData.phone}\n`
    message += `📍 *Bairro:* ${formData.neighborhood}\n`
    message += `🏠 *Endereço:* ${formData.address}, nº ${formData.number}\n`
    if (formData.reference) {
      message += `📌 *Referência:* ${formData.reference}\n`
    }
    message += `\n*━━━━━━━━━━━━━━━━━━━*\n`
    message += `📋 *ITENS DO PEDIDO:*\n`

    items.forEach(item => {
      message += `• ${item.quantity}x ${item.name} = Kz ${(item.price * item.quantity).toLocaleString()}\n`
    })

    const subtotal = getSubtotal()
    const discount = getDiscount()
    const total = getTotal()

    message += `\n*━━━━━━━━━━━━━━━━━━━*\n`
    message += `💰 *RESUMO:*\n`
    message += `Subtotal: Kz ${subtotal.toLocaleString()}\n`
    if (discount > 0) {
      message += `Desconto: -Kz ${discount.toLocaleString()}\n`
    }
    message += `Taxa de Entrega: Kz ${deliveryFee.toLocaleString()}\n`
    message += `*TOTAL: Kz ${total.toLocaleString()}*\n`
    if (coupon) {
      message += `\n🎉 Cupom aplicado: ${coupon.code}`
    }

    const whatsappNumber = "244952413568"
    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`

    // Clear cart and close modals
    clearCart()
    onClose()
    closeCart()

    // Reset form
    setFormData({
      name: '',
      phone: '',
      neighborhood: '',
      number: '',
      address: '',
      reference: '',
    })

    setIsSubmitting(false)

    // Open WhatsApp
    window.open(whatsappUrl, '_blank')
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 bg-black/50 z-[300] flex items-center justify-center p-4 animate-in fade-in duration-200"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className={cn(
          'bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto animate-in zoom-in-95 slide-in-from-bottom-4 duration-300'
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b sticky top-0 bg-white z-10">
          <h2 className="font-display text-xl font-bold">Endereço de Entrega</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-semibold">
              Nome Completo *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="Seu nome"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="phone" className="block text-sm font-semibold">
              Telefone *
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              placeholder="+244 9XX XXX XXX"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2 space-y-2">
              <label htmlFor="neighborhood" className="block text-sm font-semibold">
                Bairro *
              </label>
              <input
                type="text"
                id="neighborhood"
                name="neighborhood"
                required
                value={formData.neighborhood}
                onChange={handleChange}
                placeholder="ex: Camama"
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="number" className="block text-sm font-semibold">
                Nº *
              </label>
              <input
                type="text"
                id="number"
                name="number"
                required
                value={formData.number}
                onChange={handleChange}
                placeholder="123"
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="address" className="block text-sm font-semibold">
              Endereço Completo *
            </label>
            <input
              type="text"
              id="address"
              name="address"
              required
              value={formData.address}
              onChange={handleChange}
              placeholder="Rua/Avenida"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="reference" className="block text-sm font-semibold">
              Ponto de Referência
            </label>
            <textarea
              id="reference"
              name="reference"
              value={formData.reference}
              onChange={handleChange}
              placeholder="ex: Perto da loja, portão azul..."
              rows={3}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Processando...
              </>
            ) : (
              'Confirmar Pedido'
            )}
          </button>
        </form>
      </div>
    </div>
  )
}
