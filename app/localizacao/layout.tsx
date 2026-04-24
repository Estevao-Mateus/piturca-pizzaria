import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Localização — Piturca Pizzaria',
  description: 'Encontre a Piturca Pizzaria no Camama, Luanda. Horário de funcionamento, endereço e contactos.',
}

export default function LocalizacaoLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
