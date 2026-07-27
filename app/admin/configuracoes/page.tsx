'use client'

import { SettingsForm } from '@/components/admin/settings-form'

export default function ConfiguracoesPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-white">Configurações</h2>
        <p className="text-slate-400 mt-1">Gerencie as configurações da sua pizzaria</p>
      </div>

      {/* Settings */}
      <SettingsForm />
    </div>
  )
}
