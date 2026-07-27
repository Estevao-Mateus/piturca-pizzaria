'use client'

import { useState } from 'react'
import { Save } from 'lucide-react'

export function SettingsForm() {
  const [settings, setSettings] = useState({
    businessName: 'Piturca Pizzaria',
    email: 'contato@piturca.ao',
    phone: '+244 222 123 456',
    address: 'Luanda, Angola',
    deliveryTime: '45',
    minOrder: '5000',
    taxRate: '10',
  })

  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="space-y-6">
      {/* Business Information */}
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl border border-slate-700/50 p-6">
        <h3 className="text-lg font-bold text-white mb-6">Informações da Empresa</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Business Name */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">Nome da Empresa</label>
            <input
              type="text"
              value={settings.businessName}
              onChange={(e) => setSettings({ ...settings, businessName: e.target.value })}
              className="w-full px-4 py-2 rounded-lg bg-slate-700/50 border border-slate-600 text-white placeholder-slate-500 outline-none focus:border-orange-500"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">Email</label>
            <input
              type="email"
              value={settings.email}
              onChange={(e) => setSettings({ ...settings, email: e.target.value })}
              className="w-full px-4 py-2 rounded-lg bg-slate-700/50 border border-slate-600 text-white placeholder-slate-500 outline-none focus:border-orange-500"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">Telefone</label>
            <input
              type="tel"
              value={settings.phone}
              onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
              className="w-full px-4 py-2 rounded-lg bg-slate-700/50 border border-slate-600 text-white placeholder-slate-500 outline-none focus:border-orange-500"
            />
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">Endereço</label>
            <input
              type="text"
              value={settings.address}
              onChange={(e) => setSettings({ ...settings, address: e.target.value })}
              className="w-full px-4 py-2 rounded-lg bg-slate-700/50 border border-slate-600 text-white placeholder-slate-500 outline-none focus:border-orange-500"
            />
          </div>
        </div>
      </div>

      {/* Delivery Settings */}
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl border border-slate-700/50 p-6">
        <h3 className="text-lg font-bold text-white mb-6">Configurações de Entrega</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Delivery Time */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">Tempo de Entrega (minutos)</label>
            <input
              type="number"
              value={settings.deliveryTime}
              onChange={(e) => setSettings({ ...settings, deliveryTime: e.target.value })}
              className="w-full px-4 py-2 rounded-lg bg-slate-700/50 border border-slate-600 text-white placeholder-slate-500 outline-none focus:border-orange-500"
            />
          </div>

          {/* Min Order */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">Pedido Mínimo (Kz)</label>
            <input
              type="number"
              value={settings.minOrder}
              onChange={(e) => setSettings({ ...settings, minOrder: e.target.value })}
              className="w-full px-4 py-2 rounded-lg bg-slate-700/50 border border-slate-600 text-white placeholder-slate-500 outline-none focus:border-orange-500"
            />
          </div>

          {/* Tax Rate */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">Taxa de Imposto (%)</label>
            <input
              type="number"
              value={settings.taxRate}
              onChange={(e) => setSettings({ ...settings, taxRate: e.target.value })}
              className="w-full px-4 py-2 rounded-lg bg-slate-700/50 border border-slate-600 text-white placeholder-slate-500 outline-none focus:border-orange-500"
            />
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex items-center gap-4">
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-lg font-medium transition-all"
        >
          <Save className="w-5 h-5" />
          Salvar Configurações
        </button>
        {saved && (
          <div className="px-4 py-2 rounded-lg bg-green-500/20 border border-green-500/30">
            <p className="text-green-400 text-sm font-medium">Configurações salvas com sucesso!</p>
          </div>
        )}
      </div>
    </div>
  )
}
