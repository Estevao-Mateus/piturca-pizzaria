import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { products } from '@/lib/products'
import { ProductCard } from '@/components/product-card'
import { ScrollAnimation, ScrollAnimationGroup, ScrollAnimationItem } from '@/components/scroll-animations'

const highlights = [
  {
    title: 'Massa de 48h',
    description: 'Fermentação natural e leve.',
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9H13V7.5h-2V11H8.5v2h2.5v3.5h2V13h2.5v-2z" fill="currentColor"/>
      </svg>
    ),
  },
  {
    title: 'Entrega Rápida',
    description: 'Em até 45 minutos.',
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18 8h-1V6c0-.82-.65-1.5-1.5-1.5H8.5C7.65 4.5 7 5.18 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-7 10.5c-2.49 0-4.5-2.01-4.5-4.5s2.01-4.5 4.5-4.5 4.5 2.01 4.5 4.5-2.01 4.5-4.5 4.5zM9 6h6v2H9V6z" fill="currentColor"/>
      </svg>
    ),
  },
  {
    title: 'Ingredientes Premium',
    description: 'Qualidade Angolana.',
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="currentColor"/>
      </svg>
    ),
  },
  {
    title: 'Nota 4.98',
    description: 'Mais de 12 mil avaliações.',
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2l-2.81 6.63L2 9.24l5.46 4.73L5.82 21 12 17.27z" fill="currentColor"/>
      </svg>
    ),
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
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <ScrollAnimationGroup staggerDelay={0.12}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {highlights.map((item) => (
                <ScrollAnimationItem key={item.title} variant="fadeInUp">
                  <div className="group relative bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 border border-gray-200/60 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 text-center h-full overflow-hidden">
                    {/* Gradient accent on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Icon container with premium styling */}
                    <div className="relative mb-6">
                      <div className="w-14 h-14 mx-auto bg-gradient-to-br from-primary/15 to-primary/5 rounded-xl flex items-center justify-center group-hover:from-primary/25 group-hover:to-primary/10 transition-all duration-300 text-primary group-hover:scale-110">
                        {item.icon}
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="relative">
                      <h3 className="font-display text-lg font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">{item.title}</h3>
                      <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
                    </div>
                    
                    {/* Bottom accent line */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/0 via-primary to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-fr">
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
