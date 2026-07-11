import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { headers } from 'next/headers'
import { auth } from '@/lib/auth'
import { AuthForm } from '@/components/auth-form'

export const metadata: Metadata = {
  title: 'Entrar — Piturca Pizzaria',
  description: 'Faça login na sua conta Piturca Pizzaria para acessar suas encomendas e favoritos.',
}

export default async function SignInPage() {
  const session = await auth.api.getSession({ headers: await headers() })

  if (session?.user) {
    redirect('/')
  }

  return <AuthForm mode="sign-in" />
}
