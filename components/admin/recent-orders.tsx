'use client'

import { Clock, CheckCircle, AlertCircle } from 'lucide-react'

const recentOrders = [
  { id: '#001', customer: 'João Silva', amount: '7.500 Kz', status: 'completed', time: '2 min' },
  { id: '#002', customer: 'Maria Santos', amount: '12.000 Kz', status: 'pending', time: '5 min' },
  { id: '#003', customer: 'Carlos Pedro', amount: '5.800 Kz', status: 'completed', time: '12 min' },
  { id: '#004', customer: 'Ana Costa', amount: '9.200 Kz', status: 'pending', time: '18 min' },
  { id: '#005', customer: 'Luís Gomes', amount: '8.500 Kz', status: 'completed', time: '25 min' },
]

const statusConfig = {
  completed: { label: 'Entregue', icon: CheckCircle, color: 'text-green-400' },
  pending: { label: 'Pendente', icon: Clock, color: 'text-orange-400' },
  cancelled: { label: 'Cancelado', icon: AlertCircle, color: 'text-red-400' },
}

export function RecentOrders() {
  return (
    <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700/50 h-full">
      <div className="mb-6">
        <h2 className="text-lg font-bold text-white">Pedidos Recentes</h2>
        <p className="text-sm text-slate-400 mt-1">5 últimos pedidos</p>
      </div>

      <div className="space-y-4">
        {recentOrders.map((order) => {
          const config = statusConfig[order.status as keyof typeof statusConfig]
          const StatusIcon = config.icon

          return (
            <div key={order.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-700/50 transition-colors">
              <div className="flex-1">
                <p className="text-sm font-medium text-white">{order.id}</p>
                <p className="text-xs text-slate-400 mt-1">{order.customer}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-white">{order.amount}</p>
                <div className="flex items-center gap-1 justify-end mt-1">
                  <StatusIcon className={`w-3 h-3 ${config.color}`} />
                  <p className={`text-xs font-medium ${config.color}`}>{config.label}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <button className="w-full mt-6 px-4 py-2 rounded-lg bg-slate-700/50 hover:bg-slate-700 text-slate-300 text-sm font-medium transition-colors">
        Ver todos os pedidos
      </button>
    </div>
  )
}
