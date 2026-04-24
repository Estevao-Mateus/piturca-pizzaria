import Link from 'next/link'
import { MapPin, Phone, Mail, Clock, ArrowRight } from 'lucide-react'

export default function LocalizacaoPage() {
  return (
    <div className="py-12">
      {/* Header */}
      <section className="text-center mb-12 px-6">
        <h1 className="font-display text-4xl md:text-5xl font-black mb-4">
          Onde <span className="text-primary">Estamos</span>
        </h1>
        <div className="w-16 h-1 bg-gradient-to-r from-primary to-[#e8c46a] rounded-full mx-auto mb-4" />
        <p className="text-muted-foreground max-w-xl mx-auto">
          Venha visitar-nos ou faça o seu pedido para entrega. Estamos à sua espera!
        </p>
      </section>

      {/* Contact & Map Grid */}
      <section className="max-w-7xl mx-auto px-6 mb-16">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="lg:col-span-1 space-y-6">
            {/* Address */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Endereço</h3>
                  <p className="text-muted-foreground">
                    Rua Direita da Unitel, Bar da Cuca
                    <br />
                    Camama, Luanda, Angola
                  </p>
                </div>
              </div>
            </div>

            {/* Phone */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Telefone</h3>
                  <a
                    href="tel:+244952413568"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    +244 952 413 568
                  </a>
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Email</h3>
                  <a
                    href="mailto:estevaomateus407@gmail.com"
                    className="text-muted-foreground hover:text-primary transition-colors break-all"
                  >
                    estevaomateus407@gmail.com
                  </a>
                </div>
              </div>
            </div>

            {/* Hours */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Horário</h3>
                  <p className="text-muted-foreground">
                    <span className="font-medium text-foreground">Segunda a Domingo</span>
                    <br />
                    09:00 às 22:00
                  </p>
                </div>
              </div>
            </div>

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/244952413568"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-4 bg-[#25D366] text-white rounded-xl font-semibold hover:bg-[#1aad54] transition-colors shadow-lg shadow-[#25D366]/30"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              Falar no WhatsApp
            </a>
          </div>

          {/* Map */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg h-full min-h-[400px]">
              <iframe
                title="Localização da Piturca Pizzaria no Google Maps"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3956.93174434727!2d13.25965197507281!3d-8.922735691625627!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1a51f52445bf04b1%3A0xc8642da2d36d3107!2sLoja%20Unitel!5e1!3m2!1spt-PT!2sao!4v1773417017329!5m2!1spt-PT!2sao"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '400px' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Delivery Info */}
      <section className="max-w-4xl mx-auto px-6 mb-16">
        <div className="bg-gradient-to-r from-primary to-[#b5700a] rounded-2xl p-8 md:p-12 text-white text-center">
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">
            Entrega Rápida em Luanda
          </h2>
          <p className="text-white/90 mb-6 max-w-xl mx-auto">
            Entregamos na sua porta em até 45 minutos! Taxa de entrega: Kz 500,00
            <br />
            <span className="text-sm opacity-80">Use o cupom FRETEGRATIS para entrega grátis!</span>
          </p>
          <Link
            href="/cardapio"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary rounded-lg font-semibold hover:bg-white/90 transition-all"
          >
            Fazer Pedido
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-8">
          <h2 className="font-display text-2xl md:text-3xl font-black mb-4">
            Perguntas <span className="text-primary">Frequentes</span>
          </h2>
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-xl p-6 border border-gray-100">
            <h3 className="font-semibold mb-2">Qual é a área de entrega?</h3>
            <p className="text-muted-foreground text-sm">
              Entregamos em todo o Camama e bairros vizinhos de Luanda. Para zonas mais distantes, entre em contacto pelo WhatsApp.
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 border border-gray-100">
            <h3 className="font-semibold mb-2">Aceitam pagamento em cartão?</h3>
            <p className="text-muted-foreground text-sm">
              Aceitamos pagamentos em dinheiro (Kwanzas), Multicaixa Express e transferência bancária.
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 border border-gray-100">
            <h3 className="font-semibold mb-2">Posso personalizar a minha pizza?</h3>
            <p className="text-muted-foreground text-sm">
              Sim! Pode adicionar ou remover ingredientes. Basta indicar as suas preferências no pedido via WhatsApp.
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 border border-gray-100">
            <h3 className="font-semibold mb-2">Fazem entregas ao fim de semana?</h3>
            <p className="text-muted-foreground text-sm">
              Sim! Funcionamos todos os dias, de Segunda a Domingo, das 09:00 às 22:00.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
