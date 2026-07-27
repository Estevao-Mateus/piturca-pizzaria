'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { AlertCircle, Eye, EyeOff, ArrowLeft, Shield } from 'lucide-react'

export default function AdminLoginPage() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    // MVP: Simple password check (production should use proper auth)
    if (password === 'admin123') {
      // Set admin token in cookie
      document.cookie = 'admin_token=admin_access_token_123; path=/; max-age=86400'
      
      // Redirect to dashboard
      await new Promise(resolve => setTimeout(resolve, 300))
      router.push('/admin')
    } else {
      setError('Senha incorreta. Tente: admin123')
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background gradients */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-orange-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-orange-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Back button */}
      <Link 
        href="/" 
        className="absolute top-6 left-6 flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-white/70 hover:text-white transition-all group z-10"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <span className="text-sm font-medium">Voltar</span>
      </Link>

      {/* Login container */}
      <div className="relative z-10 w-full max-w-md">
        {/* Card */}
        <div className="bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-2xl rounded-2xl border border-slate-700/30 p-8 md:p-10 shadow-2xl">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Piturca</h1>
                <p className="text-orange-400 text-xs font-semibold">PAINEL ADMINISTRATIVO</p>
              </div>
            </div>
            <p className="text-slate-400 text-center text-sm">
              Acesso seguro ao painel de gerenciamento
            </p>
          </div>

          {/* Error message */}
          {error && (
            <div className="mb-6 p-4 bg-red-500/15 border border-red-500/30 rounded-xl flex gap-3 animate-in fade-in duration-300">
              <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-300 font-medium">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Password field */}
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-semibold text-slate-200">
                Senha de Acesso
              </label>
              <div className="relative group">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  className="w-full px-4 py-3 rounded-xl bg-slate-700/30 border border-slate-600/50 group-focus-within:border-orange-500/50 text-white placeholder-slate-500 outline-none transition-all duration-200 focus:ring-2 focus:ring-orange-500/20"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-orange-400 transition-colors duration-200 p-1"
                  aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={loading || !password}
              className="w-full px-4 py-3 bg-gradient-to-r from-orange-500 via-orange-500 to-orange-600 hover:from-orange-600 hover:via-orange-600 hover:to-orange-700 disabled:from-slate-600 disabled:via-slate-600 disabled:to-slate-600 disabled:opacity-60 text-white rounded-xl font-bold uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-orange-500/30 hover:shadow-lg hover:shadow-orange-500/50"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Verificando...</span>
                </>
              ) : (
                <>
                  <Shield className="w-4 h-4" />
                  <span>Acessar Painel</span>
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-3">
            <div className="flex-1 h-px bg-gradient-to-r from-slate-700/0 to-slate-700"></div>
            <span className="text-xs text-slate-500 font-medium">INFORMAÇÕES</span>
            <div className="flex-1 h-px bg-gradient-to-r from-slate-700 to-slate-700/0"></div>
          </div>

          {/* Info box */}
          <div className="bg-orange-500/10 border border-orange-500/20 rounded-xl p-4 space-y-2">
            <p className="text-xs text-orange-300/80 font-medium">
              Demo: Senha padrão
            </p>
            <div className="flex items-center gap-2">
              <code className="flex-1 px-3 py-2 bg-orange-500/5 border border-orange-500/10 rounded-lg text-orange-400 text-sm font-mono font-bold">
                admin123
              </code>
              <button
                type="button"
                onClick={() => setPassword('admin123')}
                className="px-3 py-2 bg-orange-500/20 hover:bg-orange-500/30 text-orange-300 text-xs font-semibold rounded-lg transition-colors"
              >
                Copiar
              </button>
            </div>
          </div>

          {/* Footer */}
          <p className="mt-8 text-center text-xs text-slate-500">
            Conectado a <span className="text-orange-400 font-semibold">Piturca Pizzaria</span>
          </p>
        </div>
      </div>
    </div>
  )
}
