'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { authClient } from '@/lib/auth-client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { AlertCircle, CheckCircle2 } from 'lucide-react'

export function AuthForm({ mode }: { mode: 'sign-in' | 'sign-up' }) {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

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
      setError(error.message ?? 'Something went wrong')
      return
    }

    router.push('/')
    router.refresh()
  }

  return (
    <main className="min-h-svh bg-gradient-to-br from-background via-background to-background/95 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 mb-4">
            <span className="text-2xl font-bold text-primary">🍕</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            {isSignUp ? 'Crie sua conta' : 'Bem-vindo de volta'}
          </h1>
          <p className="text-muted-foreground mt-2">
            {isSignUp
              ? 'Junte-se à Piturca e aproveite as melhores pizzas'
              : 'Entre na sua conta para continuar'}
          </p>
        </div>

        <Card className="border-0 shadow-lg p-8 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium">
                  Nome completo
                </Label>
                <Input
                  id="name"
                  placeholder="Digite seu nome"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  autoComplete="name"
                  className="h-11 bg-background/50 border-border/50 focus:border-primary"
                />
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
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
                className="h-11 bg-background/50 border-border/50 focus:border-primary"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">
                Senha
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Mínimo 8 caracteres"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
                autoComplete={isSignUp ? 'new-password' : 'current-password'}
                className="h-11 bg-background/50 border-border/50 focus:border-primary"
              />
              {isSignUp && (
                <p className="text-xs text-muted-foreground mt-1">
                  Use pelo menos 8 caracteres
                </p>
              )}
            </div>

            {error && (
              <div className="flex gap-3 p-3 rounded-lg bg-destructive/10 border border-destructive/20" role="alert">
                <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                <p className="text-sm text-destructive">
                  {error}
                </p>
              </div>
            )}

            <Button 
              type="submit" 
              disabled={loading} 
              className="w-full h-11 text-base font-semibold bg-primary hover:bg-primary/90"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Processando...
                </span>
              ) : isSignUp ? (
                'Criar conta'
              ) : (
                'Entrar'
              )}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border/30"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-2 bg-card text-muted-foreground">ou</span>
            </div>
          </div>

          {/* Toggle Link */}
          <div className="text-center text-sm">
            <span className="text-muted-foreground">
              {isSignUp ? 'Já tem uma conta? ' : 'Não tem conta? '}
            </span>
            <Link
              href={isSignUp ? '/sign-in' : '/sign-up'}
              className="text-primary font-semibold hover:underline"
            >
              {isSignUp ? 'Entrar' : 'Criar conta'}
            </Link>
          </div>
        </Card>

        {/* Footer Info */}
        <p className="text-xs text-muted-foreground text-center mt-6">
          Sua privacidade é importante. Leia nossa{' '}
          <Link href="#" className="underline hover:no-underline">
            política de privacidade
          </Link>
        </p>
      </div>
    </main>
  )
}
