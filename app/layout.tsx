import type { Metadata, Viewport } from 'next'
import { Playfair_Display, DM_Sans } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { CartProvider } from '@/context/cart-context'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { CartSidebar } from '@/components/cart-sidebar'
import { Toaster } from '@/components/toaster'
import { BackToTop } from '@/components/back-to-top'

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  weight: ['700', '900'],
  variable: '--font-display'
})

const dmSans = DM_Sans({ 
  subsets: ["latin"],
  weight: ['400', '500', '600'],
  variable: '--font-body'
})

export const metadata: Metadata = {
  title: 'Piturca Pizzaria — Pizzas Artesanais em Luanda',
  description: 'Deliciosas pizzas artesanais feitas com ingredientes frescos em Luanda, Angola. Entrega rápida no Camama e arredores.',
  keywords: 'pizza, pizzaria, Luanda, Angola, artesanal, delivery, Camama',
  authors: [{ name: 'Piturca Pizzaria' }],
  openGraph: {
    title: 'Piturca Pizzaria',
    description: 'Deliciosas pizzas artesanais feitas com ingredientes frescos em Luanda.',
    type: 'website',
    locale: 'pt_AO',
  },
}

export const viewport: Viewport = {
  themeColor: '#d4880a',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-AO" data-scroll-behavior="smooth" className={`${playfair.variable} ${dmSans.variable}`}>
      <body className="font-body antialiased bg-background text-foreground">
        <CartProvider>
          <Navbar />
          <main className="min-h-screen pt-16">
            {children}
          </main>
          <Footer />
          <CartSidebar />
          <BackToTop />
          <Toaster />
        </CartProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
