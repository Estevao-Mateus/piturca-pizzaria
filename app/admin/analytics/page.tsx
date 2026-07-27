import { AnalyticsCharts } from '@/components/admin/analytics-charts'
import { TopProducts } from '@/components/admin/top-products'

export default function AnalyticsPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-white">Analytics & Relatórios</h2>
        <p className="text-slate-400 mt-1">Análise detalhada de vendas e desempenho</p>
      </div>

      {/* Charts */}
      <AnalyticsCharts />

      {/* Top Products */}
      <TopProducts />
    </div>
  )
}
