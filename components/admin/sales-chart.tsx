'use client'

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const data = [
  { name: 'Seg', value: 4000, target: 3500 },
  { name: 'Ter', value: 3000, target: 3500 },
  { name: 'Qua', value: 2000, target: 3500 },
  { name: 'Qui', value: 2780, target: 3500 },
  { name: 'Sex', value: 1890, target: 3500 },
  { name: 'Sab', value: 2390, target: 3500 },
  { name: 'Dom', value: 3490, target: 3500 },
]

export function SalesChart() {
  return (
    <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700/50">
      <div className="mb-6">
        <h2 className="text-lg font-bold text-white">Vendas Semanais</h2>
        <p className="text-sm text-slate-400 mt-1">Comparação com meta de vendas</p>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
          <XAxis dataKey="name" stroke="#94a3b8" />
          <YAxis stroke="#94a3b8" />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1e293b',
              border: '1px solid #475569',
              borderRadius: '8px',
            }}
            labelStyle={{ color: '#e2e8f0' }}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#f97316"
            strokeWidth={2}
            dot={{ fill: '#f97316', r: 4 }}
            name="Vendas Reais"
          />
          <Line
            type="monotone"
            dataKey="target"
            stroke="#64748b"
            strokeWidth={2}
            strokeDasharray="5 5"
            dot={false}
            name="Meta"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
