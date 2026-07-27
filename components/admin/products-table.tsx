'use client'

import { Edit2, Trash2, Eye } from 'lucide-react'

interface Product {
  id: number
  name: string
  category: string
  price: number
  image: string
}

export function ProductsTable({ products }: { products: Product[] }) {
  return (
    <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl border border-slate-700/50 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-700/50 bg-slate-900/50">
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Produto</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Categoria</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Preço</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700/50">
            {products.map((product) => (
              <tr
                key={product.id}
                className="hover:bg-slate-700/20 transition-colors"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-slate-700 flex items-center justify-center text-lg">
                      🍕
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">{product.name}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-slate-400">{product.category}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm font-semibold text-white">
                    {typeof product.price === 'number' ? product.price.toLocaleString('pt-AO') : product.price} Kz
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button className="p-2 rounded-lg hover:bg-slate-700/50 text-slate-400 hover:text-blue-400 transition-colors">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-2 rounded-lg hover:bg-slate-700/50 text-slate-400 hover:text-orange-400 transition-colors">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button className="p-2 rounded-lg hover:bg-slate-700/50 text-slate-400 hover:text-red-400 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {products.length === 0 && (
        <div className="text-center py-12">
          <p className="text-slate-400 text-sm">Nenhum produto encontrado</p>
        </div>
      )}
    </div>
  )
}
