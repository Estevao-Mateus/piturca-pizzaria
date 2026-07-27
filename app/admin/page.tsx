import { DashboardMetrics } from '@/components/admin/dashboard-metrics'
import { RecentOrders } from '@/components/admin/recent-orders'
import { SalesChart } from '@/components/admin/sales-chart'

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      {/* Metrics Grid */}
      <DashboardMetrics />

      {/* Charts and Data */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sales Chart */}
        <div className="lg:col-span-2">
          <SalesChart />
        </div>

        {/* Recent Orders */}
        <div className="lg:col-span-1">
          <RecentOrders />
        </div>
      </div>
    </div>
  )
}
