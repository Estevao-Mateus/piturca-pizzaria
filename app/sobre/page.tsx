import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Heart, Leaf, Award, Users } from 'lucide-react'

const values = [
  {
    icon: Heart,
    title: 'Paixão',
    description: 'Cada pizza é feita com amor e dedicação, como se fosse para a nossa própria família.',
  },
  {
    icon: Leaf,
    title: 'Frescura',
    description: 'Utilizamos apenas ingredientes frescos e de alta qualidade, selecionados diariamente.',
  },
  {
    icon: Award,
    title: 'Qualidade',
    description: 'Comprometidos com a excelência em cada fatia que servimos aos nossos clientes.',
  },
  {
    icon: Users,
    title: 'Comunidade',
    description: 'Mais do que uma pizzaria, somos parte da comunidade do Camama e de Luanda.',
  },
]

export default function SobrePage() {
  return (
    <div className="py-12">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/about-bg.jpg"
            alt="Interior da Piturca Pizzaria"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white">
          <h1 className="font-display text-4xl md:text-5xl font-black mb-6">
            Sobre <span className="text-[#e8c46a]">Nós</span>
          </h1>
          <p className="text-lg md:text-xl text-white/90 leading-relaxed">
            Desde 2020, a Piturca Pizzaria tem sido sinónimo de pizzas artesanais de qualidade em Luanda.
            Nossa missão é simples: entregar felicidade em cada fatia.
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 bg-[#f7f4ef]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-black mb-6">
                A Nossa <span className="text-primary">História</span>
              </h2>
              <div className="w-16 h-1 bg-gradient-to-r from-primary to-[#e8c46a] rounded-full mb-6" />
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  A Piturca Pizzaria nasceu de um sonho familiar: trazer para Angola o verdadeiro sabor 
                  da pizza artesanal italiana, adaptada ao paladar local com os melhores ingredientes angolanos.
                </p>
                <p>
                  Começámos como uma pequena pizzaria no coração do Camama, e hoje somos reconhecidos 
                  por toda Luanda pela qualidade excepcional das nossas pizzas e pelo atendimento caloroso.
                </p>
                <p>
                  Cada pizza que sai do nosso forno conta uma história de dedicação, utilizando massa 
                  fermentada naturalmente por 48 horas e coberturas preparadas diariamente com ingredientes frescos.
                </p>
              </div>
            </div>
            <div className="relative h-80 md:h-[500px] rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/images/pizzaiolo.jpg"
                alt="Pizzaiolo preparando pizza artesanal"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-black mb-4">
              Os Nossos <span className="text-primary">Valores</span>
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-primary to-[#e8c46a] rounded-full mx-auto mb-4" />
            <p className="text-muted-foreground max-w-xl mx-auto">
              Os princípios que guiam cada decisão que tomamos na Piturca Pizzaria.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div
                key={value.title}
                className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 text-center"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                  <value.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-display text-xl font-bold mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-[#0d0d0d] text-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="font-display text-4xl md:text-5xl font-black text-primary mb-2">5+</div>
              <p className="text-white/70">Anos de experiência</p>
            </div>
            <div>
              <div className="font-display text-4xl md:text-5xl font-black text-[#e8c46a] mb-2">12K+</div>
              <p className="text-white/70">Clientes satisfeitos</p>
            </div>
            <div>
              <div className="font-display text-4xl md:text-5xl font-black text-primary mb-2">4.98</div>
              <p className="text-white/70">Avaliação média</p>
            </div>
            <div>
              <div className="font-display text-4xl md:text-5xl font-black text-[#e8c46a] mb-2">45min</div>
              <p className="text-white/70">Tempo médio entrega</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-black mb-4">
            Venha experimentar!
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Visite-nos no Camama ou faça já o seu pedido online.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/cardapio"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-all shadow-lg shadow-primary/30"
            >
              Ver Cardápio
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/localizacao"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary hover:text-white transition-all"
            >
              Como Chegar
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
