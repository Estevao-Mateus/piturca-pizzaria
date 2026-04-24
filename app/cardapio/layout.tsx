import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cardápio — Piturca Pizzaria',
  description: 'Confira nosso cardápio de pizzas artesanais. Clássicas, especiais e vegetarianas. Entrega em Luanda.',
}

export default function CardapioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
