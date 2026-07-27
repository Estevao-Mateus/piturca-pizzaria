'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

const categoryData = [
  { name: 'Pizzas', value: 4500 },
  { name: 'Bebidas', value: 2000 },
  { name: 'Sobremesas', value: 1500 },
  { name: 'Acompanhamentos', value: 1200 },
]

const monthlyData = [
  { month: 'Jan', vendas: 8000 },
  { month: 'Fev', vendas: 9200 },
  { month: 'Mar', vendas: 7800 },
  { month: 'Abr', vendas: 10500 },
  { month: 'Mai', vendas: 11200 },
  { month: 'Jun', vendas: 12800 },
  { month: 'Jul', vendas: 13500 },
]

const COLORS = ['#f97316', '#ec4899', '#06b6d4', '#a78bfa']

export function AnalyticsCharts() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Monthly Sales */}
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700/50">
        <div className="mb-6">
          <h2 className="text-lg font-bold text-white">Vendas Mensais</h2>
          <p className="text-sm text-slate-400 mt-1">Últimos 7 meses</p>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="month" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1e293b',
                border: '1px solid #475569',
                borderRadius: '8px',
              }}
              labelStyle={{ color: '#e2e8f0' }}
            />
            <Bar dataKey="vendas" fill="#f97316" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Category Distribution */}
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700/50">
        <div className="mb-6">
          <h2 className="text-lg font-bold text-white">Distribuição por Categoria</h2>
          <p className="text-sm text-slate-400 mt-1">Vendas por tipo de produto</p>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={categoryData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, value }) => `${name}: ${value}`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {categoryData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: '#1e293b',
                border: '1px solid #475569',
                borderRadius: '8px',
              }}
              labelStyle={{ color: '#e2e8f0' }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
