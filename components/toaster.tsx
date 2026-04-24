"use client"

import { useState, useEffect, createContext, useContext, useCallback, type ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from 'lucide-react'

interface Toast {
  id: string
  message: string
  type: 'success' | 'error' | 'warning' | 'info'
}

interface ToastContextType {
  addToast: (message: string, type?: Toast['type']) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within a Toaster')
  }
  return context
}

export function Toaster({ children }: { children?: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const addToast = useCallback((message: string, type: Toast['type'] = 'info') => {
    const id = Math.random().toString(36).substr(2, 9)
    setToasts(prev => [...prev, { id, message, type }])
  }, [])

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }, [])

  useEffect(() => {
    if (toasts.length > 0) {
      const timer = setTimeout(() => {
        setToasts(prev => prev.slice(1))
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [toasts])

  // Expose addToast globally for components that can't use context
  useEffect(() => {
    (window as Window & { showToast?: typeof addToast }).showToast = addToast
  }, [addToast])

  const getIcon = (type: Toast['type']) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5" />
      case 'error':
        return <AlertCircle className="w-5 h-5" />
      case 'warning':
        return <AlertTriangle className="w-5 h-5" />
      default:
        return <Info className="w-5 h-5" />
    }
  }

  const getStyles = (type: Toast['type']) => {
    switch (type) {
      case 'success':
        return 'bg-green-500 text-white'
      case 'error':
        return 'bg-red-500 text-white'
      case 'warning':
        return 'bg-amber-500 text-white'
      default:
        return 'bg-gray-800 text-white'
    }
  }

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div
        className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-2 pointer-events-none"
        role="status"
        aria-live="polite"
      >
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={cn(
              'flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg pointer-events-auto animate-in slide-in-from-right-5 fade-in duration-300 max-w-sm',
              getStyles(toast.type)
            )}
          >
            {getIcon(toast.type)}
            <span className="text-sm font-medium flex-1">{toast.message}</span>
            <button
              onClick={() => removeToast(toast.id)}
              className="p-1 hover:bg-white/20 rounded-lg transition-colors"
              aria-label="Fechar notificação"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

// Standalone function for use outside React components
export function showToast(message: string, type: Toast['type'] = 'info') {
  const globalShowToast = (window as Window & { showToast?: (message: string, type?: Toast['type']) => void }).showToast
  if (globalShowToast) {
    globalShowToast(message, type)
  }
}
