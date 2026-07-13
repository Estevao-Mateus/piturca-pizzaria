# Scroll Animations - Piturca Pizzaria

## Visão Geral

O projeto agora possui animações premium ao rolar a página, criadas com **Framer Motion**. Essas animações fazem a experiência do usuário ser mais envolvente e profissional.

## Características

### Componentes de Animação Reutilizáveis

#### 1. `ScrollAnimation`
Anima um único elemento quando entra na viewport.

```tsx
<ScrollAnimation variant="fadeInUp" duration={0.6} delay={0}>
  <div>Conteúdo que aparece com animação</div>
</ScrollAnimation>
```

**Variantes disponíveis:**
- `fadeInUp` - Fade in com movimento para cima (padrão)
- `fadeInDown` - Fade in com movimento para baixo
- `fadeInLeft` - Fade in com movimento da esquerda
- `fadeInRight` - Fade in com movimento da direita
- `scaleIn` - Aparece com escala (de 0.8 a 1)
- `rotateIn` - Aparece com rotação suave

#### 2. `ScrollAnimationGroup`
Anima múltiplos filhos com efeito de atraso (stagger).

```tsx
<ScrollAnimationGroup staggerDelay={0.1}>
  <div>Item 1 - Aparece primeiro</div>
  <div>Item 2 - Aparece 100ms depois</div>
  <div>Item 3 - Aparece 200ms depois</div>
</ScrollAnimationGroup>
```

#### 3. `ScrollAnimationItem`
Usado dentro de `ScrollAnimationGroup` para animar itens individuais.

```tsx
<ScrollAnimationGroup staggerDelay={0.15}>
  {items.map(item => (
    <ScrollAnimationItem key={item.id} variant="scaleIn">
      <Card>{item}</Card>
    </ScrollAnimationItem>
  ))}
</ScrollAnimationGroup>
```

## Animações Implementadas

### Página Principal (/)

1. **Hero Section**
   - Texto "Feito com paixão..." com fade-in
   - Título com slide-in-from-bottom
   - Botões com stagger animation
   - Scroll indicator com bounce

2. **Highlights Section**
   - 4 cards aparecem com fadeInUp staggered
   - Atraso: 150ms entre cada card
   - Efeito: Cards vêm de baixo para cima

3. **About Preview Section**
   - Seção inteira com fadeInUp
   - Aparece quando entra em view
   - Link "Saber mais" com transição suave

4. **Featured Products**
   - Cabeçalho com fadeInUp
   - 4 produto cards com scaleIn staggered
   - Atraso: 100ms entre cada produto
   - Efeito: Cards crescem de 0.8x para 1x

5. **CTA Section**
   - Heading + texto com fadeInUp
   - Botão com animação
   - Background escuro para contraste

### Página de Cardápio (/cardapio)

1. **Header**
   - Título com fadeInDown
   - Efeito descida suave

2. **Size & Prices**
   - Container com fadeInUp
   - 3 cards de tamanhos com scaleIn staggered
   - Atraso: 100ms entre cards

3. **Category Filters**
   - Todos os botões com fadeInUp
   - Aparecem antes dos produtos

4. **Product Grid**
   - Produtos aparecem com scaleIn
   - Atraso: 80ms entre produtos
   - Layout responsivo: 1, 2 ou 3 colunas

## Propriedades de Animação

```typescript
interface ScrollAnimationProps {
  children: ReactNode
  variant?: 'fadeInUp' | 'fadeInDown' | 'fadeInLeft' | 'fadeInRight' | 'scaleIn' | 'rotateIn'
  duration?: number // 0.6s por padrão
  delay?: number    // 0ms por padrão
  className?: string
}
```

## Performance

- **Viewport-triggered**: Animações só começam quando o elemento entra na viewport
- **Once: true**: Cada animação executa apenas uma vez
- **Hardware accelerated**: Usa transform e opacity para melhor performance
- **Smooth**: 60fps em dispositivos modernos

## Como Usar em Novos Componentes

### Exemplo 1: Animar um elemento único
```tsx
import { ScrollAnimation } from '@/components/scroll-animations'

export function MyComponent() {
  return (
    <ScrollAnimation variant="fadeInUp">
      <div>Conteúdo que aparece com animação</div>
    </ScrollAnimation>
  )
}
```

### Exemplo 2: Animar uma lista
```tsx
import { ScrollAnimationGroup, ScrollAnimationItem } from '@/components/scroll-animations'

export function ItemList() {
  return (
    <ScrollAnimationGroup staggerDelay={0.1}>
      {items.map(item => (
        <ScrollAnimationItem key={item.id} variant="scaleIn">
          <Card>{item}</Card>
        </ScrollAnimationItem>
      ))}
    </ScrollAnimationGroup>
  )
}
```

## Navegadores Suportados

- Chrome/Edge 88+
- Firefox 87+
- Safari 14+
- Qualquer navegador que suporte CSS transforms

## Notas Importantes

1. **Não abuse de animações** - Use com moderação para manter a usabilidade
2. **Mobile-first** - Animações são mais suaves em mobile quando bem otimizadas
3. **Acessibilidade** - Respeitar `prefers-reduced-motion` para usuários que preferem menos movimento
4. **Performance** - Animations rodam em background, não bloqueiam interações

## Próximas Melhorias

- [ ] Adicionar suporte para `prefers-reduced-motion`
- [ ] Criar animações de hover para cards
- [ ] Adicionar parallax effect na hero section
- [ ] Animar números (contadores) quando aparecem
