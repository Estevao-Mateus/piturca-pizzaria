# UX/UI Design - Sistema de Autenticação

## Princípios de Design Implementados

### 1. **Confiança & Segurança**
- Logo da pizzaria no topo do formulário
- Mensagens claras sobre proteção de dados
- Link para política de privacidade
- Validação clara de requisitos (senha mínimo 8 caracteres)

### 2. **Simplicidade**
- Formulários minimalistas com 2-3 campos
- Uma ação por página (login OU registro)
- Sem distrações ou elementos desnecessários
- Foco total no formulário

### 3. **Feedback Visual**
- Botão com estado loading (spinner)
- Mensagens de erro em cards destacados com ícone de alerta
- Transições suaves entre estados
- Cor de destaque no botão primário (laranja)

### 4. **Acessibilidade**
- Labels associados aos inputs
- Atributos ARIA (aria-label, role="alert")
- Contraste de cores adequado
- Tamanho de inputs grande (h-11 = 44px)

## Página de Login (`/sign-in`)

### Visual
```
[Pizza Emoji em Box]
"Bem-vindo de volta"
"Entre na sua conta para continuar"

[Email Input]          seu@email.com
[Senha Input]          Mínimo 8 caracteres
[Entrar Button]        (laranja)

────────── ou ──────────
Não tem conta? Criar conta
```

### Características
- **Header**: Pizza emoji + título + subtítulo
- **Card**: Branca com sombra discreta
- **Inputs**: Fundo translúcido, borda sutil
- **Botão**: Laranja vibrante com hover effect
- **Links**: Divider com "ou" + link de sign-up
- **Rodapé**: Link para política de privacidade

### Estados
- **Idle**: Formulário vazio, botão pronto
- **Loading**: Spinner no botão, inputs desabilitados
- **Error**: Card vermelho com ícone de alerta
- **Success**: Redirecionamento automático

## Página de Registro (`/sign-up`)

### Visual
```
[Pizza Emoji em Box]
"Crie sua conta"
"Junte-se à Piturca e aproveite as melhores pizzas"

[Nome Input]           Digite seu nome
[Email Input]          seu@email.com
[Senha Input]          Mínimo 8 caracteres
                       Use pelo menos 8 caracteres
[Criar conta Button]   (laranja)

────────── ou ──────────
Já tem uma conta? Entrar
```

### Diferenças do Login
- Campo adicional: Nome completo
- Texto motivacional customizado
- Dica sobre requisito de senha
- Botão com texto diferente ("Criar conta")

## Navbar - Integração de Autenticação

### Desktop (Não Autenticado)
```
[Logo] [Nav Links] [Entrar] [Criar conta] [🛒 Cart]
```

### Desktop (Autenticado)
```
[Logo] [Nav Links] [👤 Nome do Usuário] [Sair] [🛒 Cart]
```

### Mobile Menu
```
[Logo] [Menu Icon]

Menu Aberto:
├─ Início
├─ Cardápio
├─ Sobre
├─ Localização
├─ ─────────────
└─ [Entrar] / [Nome] + [Sair]
```

### Funcionalidades
- Detecção automática de sessão
- Loading state enquanto verifica auth
- Transição suave entre estados
- Menu mobile inclui opções de auth
- Avatar com ícone de usuário

## Design System - Cores

| Elemento | Cor | Uso |
|----------|-----|-----|
| Background | Light Gray (#f5f5f5) | Fundo da página |
| Card | White | Containers principais |
| Primary | Orange (#d97706) | Botões, destaque |
| Text | Black/Dark Gray | Tipografia |
| Border | Light Gray (#e5e7eb) | Inputs, divisores |
| Error | Red (#dc2626) | Mensagens de erro |
| Success | Green (#16a34a) | Confirmações |

## Design System - Tipografia

| Elemento | Font | Tamanho | Peso |
|----------|------|--------|------|
| Título | Display | 24-32px | 700 (Bold) |
| Subtítulo | Body | 16px | 400 (Regular) |
| Label | Body | 14px | 500 (Medium) |
| Input | Body | 16px | 400 (Regular) |
| Botão | Body | 16px | 600 (Semibold) |

## Design System - Espaçamento

| Elemento | Tamanho |
|----------|--------|
| Gap entre elementos | 16px (gap-4) |
| Padding card | 32px (p-8) |
| Padding input | 12px (px-3 py-2) |
| Border radius | 8-12px |

## Responsividade

### Mobile (< 640px)
- Formulário full width com padding
- Inputs expandem completamente
- Menu mobile com overlay
- Botão de sair no menu

### Tablet (640px - 1024px)
- Botões de auth aparecem
- Menu mobile ainda ativo

### Desktop (> 1024px)
- Botões de auth sempre visíveis
- Menu desktop expandido
- Nome do usuário aparece completo

## Validação & Feedback

### Email
```
Regra: Email válido
Feedback: "Digite um email válido"
```

### Senha
```
Regra: Mínimo 8 caracteres
Feedback: "Use pelo menos 8 caracteres"
```

### Erros de Servidor
```
Exemplo: "Email já cadastrado"
Feedback: Card vermelho com ícone de alerta
```

## Fluxo de Interação

### Sign Up
```
1. Usuário acessa /sign-up
2. Preenche Nome, Email, Senha
3. Clica "Criar conta"
4. Esperando... (spinner no botão)
5. Se sucesso: Redireciona para /
6. Se erro: Exibe mensagem vermelha
```

### Sign In
```
1. Usuário acessa /sign-in
2. Preenche Email, Senha
3. Clica "Entrar"
4. Esperando... (spinner no botão)
5. Se sucesso: Redireciona para /
6. Se erro: Exibe mensagem vermelha
```

### Logout
```
1. Usuário clica "Sair" no navbar
2. Sessão é destruída
3. Página recarrega
4. Navbar mostra "Entrar" e "Criar conta"
```

## Melhorias Futuras

### Animation
- [ ] Fade-in suave ao abrir página
- [ ] Shake no botão ao erro
- [ ] Transição de cards ao aparecer

### Microinteractions
- [ ] Ícone de eye toggle no campo de senha
- [ ] Checkmark ao validar email
- [ ] Counter visual para requisitos de senha

### Progressive Enhancement
- [ ] Suporte a passkeys/WebAuthn
- [ ] Social login (Google, GitHub)
- [ ] Magic link via email

### Performance
- [ ] Lazy load do formulário
- [ ] Prefetch de assets de auth
- [ ] Optimização de LCP

## Referências de Inspiração

Este design foi inspirado em:
- Patterns modernos de SaaS (Vercel, Stripe)
- Melhores práticas de UX (Nielsen Norman Group)
- Acessibilidade web (WCAG 2.1 AA)
- Design system do Tailwind CSS

## Testes Recomendados

### Manual
- [ ] Login com email/senha válidos
- [ ] Registro com novo email
- [ ] Validação de campos vazios
- [ ] Validação de senha curta
- [ ] Validação de email inválido
- [ ] Logout e nova sessão
- [ ] Menu mobile em responsivas

### Automatizado
- [ ] E2E: Sign up → Create order → Sign out
- [ ] E2E: Sign in → Access protected page
- [ ] Visual regression dos formulários
- [ ] Acessibilidade com axe
