import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Pizza, Zap, UtensilsCrossed, Star } from 'lucide-react'
import { products } from '@/lib/products'
import { ProductCard } from '@/components/product-card'
import { ScrollAnimation, ScrollAnimationGroup, ScrollAnimationItem } from '@/components/scroll-animations'

const highlights = [
  {
    icon: Pizza,
    title: 'Massa de 48h',
    description: 'Fermentação natural e leve.',
  },
  {
    icon: Zap,
    title: 'Entrega Rápida',
    description: 'Em até 45 minutos.',
  },
  {
    icon: UtensilsCrossed,
    title: 'Ingredientes Premium',
    description: 'Qualidade Angolana.',
  },
  {
    icon: Star,
    title: 'Nota 4.98',
    description: 'Mais de 12 mil avaliações.',
  },
]

export default function HomePage() {
  // Show only 4 featured products on home
  const featuredProducts = products.slice(0, 4)

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-bg.jpg"
            alt="Pizza artesanal da Piturca Pizzaria"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center text-white px-6 max-w-4xl mx-auto">
          <p className="text-sm md:text-base font-semibold tracking-[0.2em] uppercase text-[#e8c46a] mb-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
            Feito com paixão, assado na perfeição
          </p>
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-black leading-tight mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
            Bem-vindo à
            <br />
            <span className="text-[#e8c46a]">Piturca Pizzaria</span>
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-xl mx-auto mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
            Pizzas artesanais com ingredientes frescos, diretas ao seu coração.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
            <Link
              href="/cardapio"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-white rounded-lg font-semibold text-lg hover:bg-primary/90 transition-all shadow-lg shadow-primary/30 hover:shadow-xl hover:-translate-y-0.5"
            >
              Ver Cardápio
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/localizacao"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-lg font-semibold text-lg hover:bg-white/20 transition-all border border-white/20"
            >
              Nossa Localização
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-3 bg-white/70 rounded-full" />
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="py-16 bg-gradient-to-b from-orange-50/50 to-white">
        <div className="max-w-7xl mx-auto px-6">
          <ScrollAnimationGroup staggerDelay={0.15}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {highlights.map((item) => (
                <ScrollAnimationItem key={item.title} variant="fadeInUp">
                  <div className="group bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 text-center h-full">
                    <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <item.icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="font-display text-lg font-bold mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </ScrollAnimationItem>
              ))}
            </div>
          </ScrollAnimationGroup>
        </div>
      </section>

      {/* About Preview Section */}
      <section className="py-20 bg-[#f7f4ef]">
        <ScrollAnimation variant="fadeInUp">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="font-display text-3xl md:text-4xl font-black mb-4">
              Sobre <span className="text-primary">Nós</span>
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-primary to-[#e8c46a] rounded-full mx-auto mb-8" />
            <p className="text-lg text-muted-foreground leading-relaxed">
              Na nossa pizzaria, cada pizza é feita com paixão e dedicação, utilizando apenas os melhores
              ingredientes para garantir um sabor inigualável. As nossas receitas são cuidadosamente elaboradas
              para oferecer uma experiência gastronómica única, combinando tradição e inovação em cada fatia.
              Venha experimentar o verdadeiro sabor da pizza connosco!
            </p>
            <Link
              href="/sobre"
              className="inline-flex items-center gap-2 mt-8 text-primary font-semibold hover:gap-3 transition-all"
            >
              Saber mais sobre nós
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </ScrollAnimation>
      </section>

      {/* Featured Products Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <ScrollAnimation variant="fadeInUp">
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl md:text-4xl font-black mb-4">
                Nosso <span className="text-primary">Cardápio</span>
              </h2>
              <div className="w-16 h-1 bg-gradient-to-r from-primary to-[#e8c46a] rounded-full mx-auto mb-4" />
              <p className="text-muted-foreground">As pizzas mais pedidas pelos nossos clientes</p>
            </div>
          </ScrollAnimation>

          <ScrollAnimationGroup staggerDelay={0.1}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <ScrollAnimationItem key={product.id} variant="scaleIn">
                  <ProductCard product={product} index={0} />
                </ScrollAnimationItem>
              ))}
            </div>
          </ScrollAnimationGroup>

          <div className="text-center mt-12">
            <Link
              href="/cardapio"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-all shadow-lg shadow-primary/30 hover:shadow-xl hover:-translate-y-0.5"
            >
              Ver Cardápio Completo
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#0d0d0d] text-white">
        <ScrollAnimation variant="fadeInUp">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="font-display text-3xl md:text-4xl font-black mb-4">
              Pronto para experimentar?
            </h2>
            <p className="text-lg text-white/70 mb-8">
              Faça já o seu pedido e receba a sua pizza quentinha em casa!
            </p>
            <Link
              href="/cardapio"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#25D366] text-white rounded-lg font-semibold text-lg hover:bg-[#1aad54] transition-all shadow-lg shadow-[#25D366]/30"
            >
              Pedir Agora via WhatsApp
            </Link>
          </div>
        </ScrollAnimation>
      </section>
    </>
  )
}
