'use client'

import { usePathname } from 'next/navigation'
import { Bell, Search, User } from 'lucide-react'

export function AdminHeader() {
  const pathname = usePathname()

  const getPageTitle = () => {
    const pathMap: Record<string, string> = {
      '/admin': 'Dashboard',
      '/admin/produtos': 'Gerenciar Produtos',
      '/admin/pedidos': 'Rastrear Pedidos',
      '/admin/analytics': 'Analytics & Relatórios',
      '/admin/configuracoes': 'Configurações',
    }
    return pathMap[pathname] || 'Admin'
  }

  return (
    <header className="sticky top-0 border-b border-slate-700/50 bg-slate-900/50 backdrop-blur-sm px-8 py-4 flex items-center justify-between">
      {/* Left side */}
      <div>
        <h1 className="text-2xl font-display font-bold text-white">{getPageTitle()}</h1>
        <p className="text-sm text-slate-400 mt-1">Bem-vindo ao painel administrativo</p>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-6">
        {/* Search */}
        <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800/50 border border-slate-700">
          <Search className="w-4 h-4 text-slate-500" />
          <input
            type="text"
            placeholder="Buscar..."
            className="bg-transparent text-sm text-white placeholder-slate-500 outline-none w-48"
          />
        </div>

        {/* Notifications */}
        <button className="relative p-2 rounded-lg hover:bg-slate-800 transition-colors group">
          <Bell className="w-5 h-5 text-slate-400 group-hover:text-white" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
        </button>

        {/* User menu */}
        <button className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-800 transition-colors">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
            <User className="w-4 h-4 text-white" />
          </div>
          <div className="text-left hidden sm:block">
            <p className="text-sm font-medium text-white">Admin</p>
            <p className="text-xs text-slate-400">Manager</p>
          </div>
        </button>
      </div>
    </header>
  )
}
