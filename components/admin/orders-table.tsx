'use client'

import { Eye, MoreVertical, CheckCircle, Clock, Zap } from 'lucide-react'

interface Order {
  id: string
  customer: string
  amount: string
  status: 'completed' | 'pending' | 'processing'
  date: string
  items: number
}

const statusConfig = {
  completed: { label: 'Entregue', icon: CheckCircle, color: 'bg-green-500/20 text-green-400' },
  pending: { label: 'Pendente', icon: Clock, color: 'bg-orange-500/20 text-orange-400' },
  processing: { label: 'Processando', icon: Zap, color: 'bg-blue-500/20 text-blue-400' },
}

export function OrdersTable({ orders }: { orders: Order[] }) {
  return (
    <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl border border-slate-700/50 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-700/50 bg-slate-900/50">
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">ID Pedido</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Cliente</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Itens</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Valor</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Data</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Status</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700/50">
            {orders.map((order) => {
              const config = statusConfig[order.status]
              const StatusIcon = config.icon

              return (
                <tr key={order.id} className="hover:bg-slate-700/20 transition-colors">
                  <td className="px-6 py-4">
                    <span className="text-sm font-semibold text-white">{order.id}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-slate-300">{order.customer}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-slate-400">{order.items} items</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-semibold text-white">{order.amount}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-slate-400">{order.date}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className={`flex items-center gap-2 px-3 py-1 rounded-full w-fit ${config.color}`}>
                      <StatusIcon className="w-4 h-4" />
                      <span className="text-xs font-semibold">{config.label}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="p-2 rounded-lg hover:bg-slate-700/50 text-slate-400 hover:text-white transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 rounded-lg hover:bg-slate-700/50 text-slate-400 hover:text-white transition-colors">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {orders.length === 0 && (
        <div className="text-center py-12">
          <p className="text-slate-400 text-sm">Nenhum pedido encontrado</p>
        </div>
      )}
    </div>
  )
}
