import Link from 'next/link'
import { MapPin, Phone, Mail, Clock, Lock } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-[#0d0d0d] text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="font-display text-2xl font-bold text-[#e8c46a]">
              Piturca Pizzaria
            </h3>
            <p className="text-white/70 text-sm leading-relaxed">
              Pizzas artesanais com ingredientes frescos, feitas com paixão e dedicação desde 2020.
            </p>
          </div>

          {/* Links Rápidos */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Links Rápidos</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-white/70 hover:text-primary transition-colors text-sm">
                  Início
                </Link>
              </li>
              <li>
                <Link href="/cardapio" className="text-white/70 hover:text-primary transition-colors text-sm">
                  Cardápio
                </Link>
              </li>
              <li>
                <Link href="/sobre" className="text-white/70 hover:text-primary transition-colors text-sm">
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link href="/localizacao" className="text-white/70 hover:text-primary transition-colors text-sm">
                  Localização
                </Link>
              </li>
            </ul>
          </div>

          {/* Contato */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Contato</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-white/70 text-sm">
                <MapPin className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <span>Rua Direita da Unitel, Bar da Cuca<br />Camama, Luanda, Angola</span>
              </li>
              <li className="flex items-center gap-3 text-white/70 text-sm">
                <Phone className="w-4 h-4 text-primary shrink-0" />
                <a href="tel:+244952413568" className="hover:text-primary transition-colors">
                  +244 952 413 568
                </a>
              </li>
              <li className="flex items-center gap-3 text-white/70 text-sm">
                <Mail className="w-4 h-4 text-primary shrink-0" />
                <a href="mailto:estevaomateus407@gmail.com" className="hover:text-primary transition-colors">
                  estevaomateus407@gmail.com
                </a>
              </li>
            </ul>
          </div>

          {/* Horário */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Horário</h4>
            <div className="flex items-start gap-3 text-white/70 text-sm">
              <Clock className="w-4 h-4 text-primary mt-0.5 shrink-0" />
              <div>
                <p className="font-medium text-white">Segunda a Domingo</p>
                <p>09:00 às 22:00</p>
              </div>
            </div>
          </div>

          {/* Admin Portal - Discrete and Professional */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Gestão</h4>
            <Link 
              href="/admin/login" 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:border-primary/50 hover:bg-primary/5 transition-all group"
            >
              <Lock className="w-4 h-4 text-white/60 group-hover:text-primary transition-colors" />
              <span className="text-white/70 group-hover:text-primary text-sm font-medium transition-colors">
                Acesso Admin
              </span>
            </Link>
            <p className="text-white/50 text-xs">Portal de administração seguro</p>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
            <p className="text-white/60 text-sm">
              &copy; {currentYear} Piturca Pizzaria — Todos os direitos reservados.
            </p>
            <p className="text-white/60 text-sm">
              Desenvolvido por{' '}
              <a 
                href="https://n3rdsites.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary font-semibold hover:text-[#e8c46a] transition-colors"
              >
                N3rdSites
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
