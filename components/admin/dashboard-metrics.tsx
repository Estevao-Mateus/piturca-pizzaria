'use client'

import { TrendingUp, ShoppingCart, DollarSign, Users } from 'lucide-react'

const metrics = [
  {
    title: 'Receita Total',
    value: '150.000 Kz',
    change: '+12.5%',
    trend: 'up',
    icon: DollarSign,
    color: 'from-green-500 to-emerald-600',
  },
  {
    title: 'Pedidos Totais',
    value: '1.234',
    change: '+8.2%',
    trend: 'up',
    icon: ShoppingCart,
    color: 'from-blue-500 to-cyan-600',
  },
  {
    title: 'Clientes',
    value: '856',
    change: '+5.1%',
    trend: 'up',
    icon: Users,
    color: 'from-purple-500 to-pink-600',
  },
  {
    title: 'Taxa de Conversão',
    value: '3.8%',
    change: '+2.3%',
    trend: 'up',
    icon: TrendingUp,
    color: 'from-orange-500 to-red-600',
  },
]

export function DashboardMetrics() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric) => {
        const Icon = metric.icon
        const [fromColor, toColor] = metric.color.split(' to-')

        return (
          <div
            key={metric.title}
            className="group relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700/50 hover:border-slate-600 transition-all duration-300 overflow-hidden"
          >
            {/* Background gradient on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-700/0 to-slate-700/0 group-hover:from-slate-700/10 group-hover:to-slate-700/10 transition-all duration-300" />

            {/* Icon container */}
            <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${metric.color} flex items-center justify-center mb-4 relative z-10`}>
              <Icon className="w-6 h-6 text-white" />
            </div>

            {/* Content */}
            <div className="relative z-10">
              <p className="text-slate-400 text-sm font-medium">{metric.title}</p>
              <div className="flex items-end justify-between mt-2">
                <p className="text-3xl font-bold text-white">{metric.value}</p>
                <span className="text-sm font-semibold text-green-400 bg-green-500/10 px-3 py-1 rounded-full">
                  {metric.change}
                </span>
              </div>
            </div>

            {/* Border accent on hover */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-slate-600/0 via-slate-600 to-slate-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        )
      })}
    </div>
  )
}
