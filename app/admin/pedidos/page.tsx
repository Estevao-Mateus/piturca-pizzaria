'use client'

import { useState } from 'react'
import { OrdersTable } from '@/components/admin/orders-table'
import { Filter } from 'lucide-react'

const mockOrders = [
  { id: '#001', customer: 'João Silva', amount: '7.500 Kz', status: 'completed', date: '2026-07-27', items: 2 },
  { id: '#002', customer: 'Maria Santos', amount: '12.000 Kz', status: 'pending', date: '2026-07-27', items: 3 },
  { id: '#003', customer: 'Carlos Pedro', amount: '5.800 Kz', status: 'completed', date: '2026-07-26', items: 1 },
  { id: '#004', customer: 'Ana Costa', amount: '9.200 Kz', status: 'processing', date: '2026-07-26', items: 2 },
  { id: '#005', customer: 'Luís Gomes', amount: '8.500 Kz', status: 'completed', date: '2026-07-25', items: 2 },
]

export default function PedidosPage() {
  const [statusFilter, setStatusFilter] = useState('all')

  const filteredOrders = statusFilter === 'all'
    ? mockOrders
    : mockOrders.filter(order => order.status === statusFilter)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-white">Rastrear Pedidos</h2>
        <p className="text-slate-400 mt-1">{filteredOrders.length} pedidos encontrados</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => setStatusFilter('all')}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            statusFilter === 'all'
              ? 'bg-orange-500 text-white'
              : 'bg-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          Todos (5)
        </button>
        <button
          onClick={() => setStatusFilter('pending')}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            statusFilter === 'pending'
              ? 'bg-orange-500 text-white'
              : 'bg-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          Pendentes (1)
        </button>
        <button
          onClick={() => setStatusFilter('processing')}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            statusFilter === 'processing'
              ? 'bg-orange-500 text-white'
              : 'bg-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          Processando (1)
        </button>
        <button
          onClick={() => setStatusFilter('completed')}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            statusFilter === 'completed'
              ? 'bg-orange-500 text-white'
              : 'bg-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          Entregues (3)
        </button>
      </div>

      {/* Orders table */}
      <OrdersTable orders={filteredOrders} />
    </div>
  )
}
