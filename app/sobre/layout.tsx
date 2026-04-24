import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sobre Nós — Piturca Pizzaria',
  description: 'Conheça a história da Piturca Pizzaria. Pizzas artesanais feitas com paixão desde 2020 em Luanda, Angola.',
}

export default function SobreLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
