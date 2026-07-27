'use client'

import { TrendingUp } from 'lucide-react'

const topProducts = [
  { rank: 1, name: 'Margarita Clássica', sales: 342, revenue: '2.565 Kz', trend: '+12%' },
  { rank: 2, name: 'Frango BBQ', sales: 298, revenue: '2.235 Kz', trend: '+8%' },
  { rank: 3, name: 'Portuguesa', sales: 265, revenue: '1.995 Kz', trend: '+5%' },
  { rank: 4, name: 'Chocolate com Banana', sales: 187, revenue: '1.405 Kz', trend: '+3%' },
  { rank: 5, name: 'Suprema', sales: 156, revenue: '1.170 Kz', trend: '+2%' },
]

export function TopProducts() {
  return (
    <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl border border-slate-700/50 overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-slate-700/50 bg-slate-900/50">
        <h2 className="text-lg font-bold text-white">Produtos Mais Vendidos</h2>
        <p className="text-sm text-slate-400 mt-1">Top 5 produtos este mês</p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-700/50">
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Rank</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Produto</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Vendas</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Receita</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Crescimento</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700/50">
            {topProducts.map((product) => (
              <tr key={product.rank} className="hover:bg-slate-700/20 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center justify-center">
                    <span className="text-lg font-bold text-orange-400">#{product.rank}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-slate-700 flex items-center justify-center text-lg">
                      🍕
                    </div>
                    <span className="text-sm font-medium text-white">{product.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm font-semibold text-white">{product.sales}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm font-semibold text-white">{product.revenue}</span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1">
                    <TrendingUp className="w-4 h-4 text-green-400" />
                    <span className="text-sm font-semibold text-green-400">{product.trend}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
