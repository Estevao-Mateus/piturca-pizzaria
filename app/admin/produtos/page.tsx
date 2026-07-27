'use client'

import { useState } from 'react'
import { products } from '@/lib/products'
import { ProductsTable } from '@/components/admin/products-table'
import { AddProductModal } from '@/components/admin/add-product-modal'
import { Plus, Search } from 'lucide-react'

export default function ProdutosPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [productsList, setProductsList] = useState(products)

  const filteredProducts = productsList.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleAddProduct = (newProduct: any) => {
    setProductsList([...productsList, { ...newProduct, id: Math.random() }])
    setIsModalOpen(false)
  }

  return (
    <div className="space-y-6">
      {/* Header with actions */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Gerenciar Produtos</h2>
          <p className="text-slate-400 mt-1">{filteredProducts.length} produtos disponíveis</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-lg font-medium transition-all"
        >
          <Plus className="w-5 h-5" />
          Novo Produto
        </button>
      </div>

      {/* Search bar */}
      <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800/50 border border-slate-700">
        <Search className="w-5 h-5 text-slate-500" />
        <input
          type="text"
          placeholder="Buscar produtos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 bg-transparent text-white placeholder-slate-500 outline-none"
        />
      </div>

      {/* Products table */}
      <ProductsTable products={filteredProducts} />

      {/* Add product modal */}
      {isModalOpen && (
        <AddProductModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onAdd={handleAddProduct}
        />
      )}
    </div>
  )
}
