'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { authClient } from '@/lib/auth-client'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { AlertCircle, Eye, EyeOff, ArrowRight, Lock } from 'lucide-react'

export function AuthForm({ mode }: { mode: 'sign-in' | 'sign-up' }) {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const routerRef = useRef<boolean>(false)

  const isSignUp = mode === 'sign-up'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const { error } = isSignUp
      ? await authClient.signUp.email({ email, password, name })
      : await authClient.signIn.email({ email, password })

    setLoading(false)

    if (error) {
      setError(error.message ?? 'Algo deu errado. Tente novamente.')
      return
    }

    if (!routerRef.current) {
      routerRef.current = true
      router.push('/')
      router.refresh()
    }
  }

  return (
    <main className="min-h-screen bg-black flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Animated background gradient blobs */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-0 -right-40 w-96 h-96 bg-orange-500 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-orange-600 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo & Header */}
        <div className="text-center mb-12 space-y-4">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-orange-400 to-orange-600 mb-2 shadow-2xl shadow-orange-500/50">
            <span className="text-5xl">🍕</span>
          </div>
          <div>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-white tracking-tight">
              {isSignUp ? 'Bem-vindo' : 'Bem-vindo'}
            </h1>
            <p className="text-xl text-white/70 mt-2 font-medium">
              {isSignUp
                ? 'Crie sua conta na Piturca'
                : 'Acesse sua conta'}
            </p>
          </div>
          <p className="text-base text-gray-400 max-w-sm mx-auto">
            {isSignUp
              ? 'Descubra pizzas artesanais feitas com paixão e ingredientes frescos'
              : 'Entre para acompanhar seus pedidos e desfrutar de ofertas especiais'}
          </p>
        </div>

        {/* Glass morphism form card */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-orange-600/20 rounded-3xl blur-2xl"></div>
          <div className="relative bg-gradient-to-br from-gray-900/80 to-gray-950/80 backdrop-blur-2xl border border-gray-800/50 rounded-3xl p-8 md:p-10 space-y-8">
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              {isSignUp && (
                <div className="space-y-3">
                  <Label htmlFor="name" className="text-sm font-semibold text-gray-200 uppercase tracking-wide">
                    Nome Completo
                  </Label>
                  <Input
                    id="name"
                    placeholder="João Silva"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    autoComplete="name"
                    className="h-13 bg-gray-800/60 border border-gray-700/50 rounded-xl placeholder-gray-500 text-white font-medium focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-200"
                  />
                </div>
              )}

              {/* Email Field */}
              <div className="space-y-3">
                <Label htmlFor="email" className="text-sm font-semibold text-gray-200 uppercase tracking-wide">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  className="h-13 bg-gray-800/60 border border-gray-700/50 rounded-xl placeholder-gray-500 text-white font-medium focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-200"
                />
              </div>

              {/* Password Field */}
              <div className="space-y-3">
                <Label htmlFor="password" className="text-sm font-semibold text-gray-200 uppercase tracking-wide">
                  Senha
                </Label>
                <div className="relative group">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={8}
                    autoComplete={isSignUp ? 'new-password' : 'current-password'}
                    className="h-13 bg-gray-800/60 border border-gray-700/50 rounded-xl placeholder-gray-500 text-white font-medium focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-200 pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-orange-400 transition-colors duration-200"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {isSignUp && (
                  <p className="text-xs text-gray-400 mt-2">
                    Use pelo menos 8 caracteres para maior segurança
                  </p>
                )}
              </div>

              {/* Error Alert */}
              {error && (
                <div className="flex gap-3 p-4 rounded-xl bg-red-500/15 border border-red-500/30 animate-in fade-in duration-300" role="alert">
                  <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-300 font-medium">
                    {error}
                  </p>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full h-13 mt-2 bg-gradient-to-r from-orange-500 via-orange-500 to-orange-600 hover:from-orange-600 hover:via-orange-600 hover:to-orange-700 disabled:from-gray-700 disabled:via-gray-700 disabled:to-gray-700 text-white font-bold uppercase tracking-wider rounded-xl transition-all duration-300 flex items-center justify-center gap-3 shadow-2xl shadow-orange-500/50 hover:shadow-2xl hover:shadow-orange-500/70 hover:scale-105 active:scale-95 disabled:hover:scale-100 disabled:shadow-gray-700/30"
              >
                {loading ? (
                  <>
                    <span className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Processando...</span>
                  </>
                ) : (
                  <>
                    <span>{isSignUp ? 'Criar conta' : 'Entrar'}</span>
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-700/50"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="px-4 bg-gray-950/80 text-xs text-gray-500 uppercase tracking-widest font-semibold">
                  ou
                </span>
              </div>
            </div>

            {/* Toggle Link */}
            <div className="text-center space-y-2">
              <p className="text-gray-400 font-medium">
                {isSignUp ? 'Já tem uma conta?' : 'Não tem conta?'}
              </p>
              <Link
                href={isSignUp ? '/sign-in' : '/sign-up'}
                className="inline-block text-orange-400 hover:text-orange-300 font-bold text-lg transition-colors duration-200 hover:underline underline-offset-4"
              >
                {isSignUp ? 'Entrar agora' : 'Criar conta agora'}
              </Link>
            </div>
          </div>
        </div>

        {/* Security Badge */}
        <div className="flex items-center justify-center gap-2 mt-8 text-gray-400">
          <Lock className="w-4 h-4" />
          <p className="text-sm font-medium">
            Conexão segura e criptografada
          </p>
        </div>
      </div>
    </main>
  )
}
