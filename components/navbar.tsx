"use client"

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ShoppingCart, Menu, X, LogOut, User } from 'lucide-react'
import { useCart } from '@/context/cart-context'
import { cn } from '@/lib/utils'
import { authClient } from '@/lib/auth-client'
import type { Session } from 'better-auth/types'

const navLinks = [
  { href: '/', label: 'Início' },
  { href: '/cardapio', label: 'Cardápio' },
  { href: '/sobre', label: 'Sobre' },
  { href: '/localizacao', label: 'Localização' },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [session, setSession] = useState<{user: any; session: any} | null>(null)
  const [loading, setLoading] = useState(true)
  const pathname = usePathname()
  const { openCart, getTotalItems } = useCart()
  const totalItems = getTotalItems()
  const sessionRef = useRef<boolean>(false)

  useEffect(() => {
    if (sessionRef.current) return
    
    const getSession = async () => {
      try {
        const { data } = await authClient.getSession()
        if (data) {
          setSession(data)
        }
      } catch (error) {
        // Silently fail on session fetch errors
      } finally {
        setLoading(false)
      }
    }
    
    sessionRef.current = true
    getSession()
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLogout = async () => {
    try {
      await authClient.signOut()
      setSession(null)
      setIsMobileMenuOpen(false)
      // Reload page to clear all client state
      window.location.reload()
    } catch (error) {
      // Silently handle logout errors
    }
  }

  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMobileMenuOpen(false)
      }
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [])

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-[#0d0d0d]/95 backdrop-blur-md shadow-lg'
          : 'bg-[#0d0d0d]'
      )}
    >
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link
          href="/"
          className="font-display text-xl md:text-2xl font-bold text-white hover:text-[#e8c46a] transition-colors"
        >
          Piturca Pizzaria
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={cn(
                  'text-sm font-medium uppercase tracking-wider text-white/85 hover:text-white transition-colors relative pb-1',
                  'after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all after:duration-300',
                  'hover:after:w-full',
                  pathname === link.href && 'text-white after:w-full'
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right side: Auth + Cart + Mobile Menu */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* Auth Buttons */}
          {!loading && (
            <>
              {session?.user ? (
                <>
                  <div className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10">
                    <User className="w-4 h-4 text-white" />
                    <span className="text-sm text-white/90">{session.user?.name || session.user?.email}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="hidden md:flex items-center gap-2 px-4 py-2 text-sm font-medium text-white rounded-lg hover:bg-red-600/20 hover:text-red-400 transition-colors"
                    title="Sair da conta"
                  >
                    <LogOut className="w-4 h-4" />
                    <span className="hidden lg:inline">Sair</span>
                  </button>
                </>
              ) : (
                <div className="hidden sm:flex items-center gap-2">
                  <Link
                    href="/sign-in"
                    className="px-4 py-2 text-sm font-medium text-white rounded-lg hover:bg-white/10 transition-colors"
                  >
                    Entrar
                  </Link>
                  <Link
                    href="/sign-up"
                    className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    Criar conta
                  </Link>
                </div>
              )}
            </>
          )}

          {/* Cart Icon */}
          <button
            onClick={openCart}
            className="relative p-2 rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Abrir carrinho de compras"
          >
            <ShoppingCart className="w-6 h-6 text-white" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-white text-xs font-semibold w-5 h-5 rounded-full flex items-center justify-center animate-in zoom-in duration-200">
                {totalItems}
              </span>
            )}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
            aria-label={isMobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-white" />
            ) : (
              <Menu className="w-6 h-6 text-white" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={cn(
            'absolute top-full left-0 right-0 bg-[#0d0d0d] md:hidden transition-all duration-300 overflow-hidden',
            isMobileMenuOpen ? 'max-h-96 shadow-xl' : 'max-h-0'
          )}
        >
          <ul className="flex flex-col p-6 gap-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    'block text-sm font-medium uppercase tracking-wider text-white/85 hover:text-white transition-colors',
                    pathname === link.href && 'text-primary'
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            
            {/* Mobile Auth Section */}
            {!loading && (
              <li className="pt-4 border-t border-white/10">
                {session ? (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 px-2 py-2">
                      <User className="w-4 h-4 text-primary" />
                      <span className="text-sm text-white/90">{session.user.name || session.user.email}</span>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-3 py-2 text-sm font-medium text-white rounded-lg hover:bg-red-600/20 hover:text-red-400 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      Sair
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2">
                    <Link
                      href="/sign-in"
                      className="block px-4 py-2 text-sm font-medium text-white rounded-lg hover:bg-white/10 transition-colors text-center"
                    >
                      Entrar
                    </Link>
                    <Link
                      href="/sign-up"
                      className="block px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary/90 transition-colors text-center"
                    >
                      Criar conta
                    </Link>
                  </div>
                )}
              </li>
            )}
          </ul>
        </div>
      </nav>
    </header>
  )
}
