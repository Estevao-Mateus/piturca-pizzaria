# Sistema de Autenticação - Piturca Pizzaria

## Visão Geral

Este documento descreve o sistema de autenticação implementado na Piturca Pizzaria usando **Better Auth** + **Neon PostgreSQL** + **Drizzle ORM**.

## Stack Tecnológico

- **Better Auth**: Framework de autenticação seguro e moderno
- **Neon PostgreSQL**: Banco de dados serverless
- **Drizzle ORM**: Query builder type-safe
- **Next.js 16**: Framework com App Router
- **TailwindCSS**: Styling com design moderno

## Estrutura de Arquivos

```
├── lib/
│   ├── auth.ts                 # Configuração do Better Auth (load-bearing file)
│   ├── auth-client.ts          # Cliente React para Better Auth
│   └── db/
│       ├── index.ts            # Drizzle client + pg Pool
│       └── schema.ts           # Schema das tabelas (Better Auth + app)
├── app/
│   ├── api/auth/[...all]/route.ts   # Handler do Better Auth
│   ├── sign-in/page.tsx        # Página de login
│   ├── sign-up/page.tsx        # Página de registro
│   └── actions/
│       └── orders.ts           # Server actions para pedidos
├── components/
│   ├── auth-form.tsx           # Formulário de auth (login/signup)
│   └── navbar.tsx              # Header com botões de auth
└── AUTH_IMPLEMENTATION.md      # Este arquivo
```

## Tabelas do Banco de Dados

### User
Armazena dados do usuário:
- `id`: Identificador único
- `name`: Nome completo
- `email`: Email único
- `emailVerified`: Status de verificação
- `createdAt`, `updatedAt`: Timestamps

### Session
Gerencia sessões ativas:
- `id`: ID da sessão
- `userId`: Referência ao usuário
- `token`: Token único da sessão
- `expiresAt`: Expiração da sessão
- `ipAddress`, `userAgent`: Dados do cliente

### Account
Credenciais e dados de autenticação:
- `id`: ID único
- `userId`: Referência ao usuário
- `password`: Hash bcrypt da senha
- Campos para OAuth (opcionais)

### Verification
Códigos de verificação de email:
- `identifier`: Email ou telefone
- `value`: Código verificação
- `expiresAt`: Expiração

### Orders
Pedidos dos usuários autenticados:
- `id`: ID único
- `userId`: Referência ao usuário
- `items`: JSONB com itens do pedido
- `subtotal`, `deliveryFee`, `total`: Valores
- `status`: Estado do pedido (pending, processing, completed, etc)
- `customerName`, `customerEmail`, `customerPhone`: Dados de contato
- `address`: Endereço de entrega
- `notes`: Observações

## Fluxo de Autenticação

### 1. **Registro (Sign Up)**
```
Usuario -> POST /api/auth/signup 
-> Validação de email/senha 
-> Criação de user/account 
-> Sessão criada 
-> Redirecionamento para /
```

### 2. **Login (Sign In)**
```
Usuario -> POST /api/auth/signin 
-> Validação de credenciais 
-> Sessão criada 
-> Cookie httpOnly 
-> Redirecionamento para /
```

### 3. **Logout**
```
Usuario -> Click logout 
-> DELETE /api/auth/signout 
-> Sessão destruída 
-> Cookie limpo
```

## Páginas de Autenticação

### `/sign-in` - Login
- URL: `http://localhost:3000/sign-in`
- Design: Card com gradiente, inputs modernos
- Campos: Email, Senha
- Link para criar conta
- Redireciona usuários autenticados para `/`

### `/sign-up` - Registro
- URL: `http://localhost:3000/sign-up`
- Design: Card com gradiente, inputs modernos
- Campos: Nome completo, Email, Senha
- Link para fazer login
- Redireciona usuários autenticados para `/`

## Componentes Principais

### `<AuthForm>`
Componente reutilizável para login/registro:
```tsx
<AuthForm mode="sign-in" />  // Login
<AuthForm mode="sign-up" />  // Registro
```

Funcionalidades:
- Validação de email e senha
- Feedback visual em tempo real
- Tratamento de erros
- Loading state com spinner
- Links para alternar entre login/registro

### `<Navbar>`
Header com integração de autenticação:
- Botões "Entrar" e "Criar conta" (não autenticado)
- Exibição do nome do usuário (autenticado)
- Botão de logout (autenticado)
- Menu mobile responsivo
- Integração com carrinho

## Server Actions

### `createOrder(input)`
Cria um novo pedido autenticado:
```ts
await createOrder({
  items: [...],
  subtotal: 100,
  deliveryFee: 5,
  total: 105,
  customerName: "João",
  customerEmail: "joao@example.com",
  customerPhone: "+244 912 345 678",
  address: "Av. Secundária, Luanda",
  notes: "Sem cebola"
})
```

### `getOrders()`
Lista todos os pedidos do usuário autenticado.

### `getOrderById(orderId)`
Recupera um pedido específico (com validação de propriedade).

## Segurança

### Proteção de Dados
- **Per-user scoping**: Toda query filtra por `userId` do usuário autenticado
- **No RLS needed**: Validação em nível de aplicação
- **Password hashing**: Bcrypt nativo do Better Auth

### Cookies
- **httpOnly**: Inacessível via JavaScript
- **secure**: Só enviados via HTTPS (production)
- **sameSite**: Proteção contra CSRF
- **Development override**: `sameSite: "none"` em dev para iframe v0

### Sessões
- Token único por sessão
- Expiração configurável
- IP e User-Agent rastreados
- Invalidação ao fazer logout

## Variáveis de Ambiente

**Obrigatórias:**
```
DATABASE_URL=postgresql://...
BETTER_AUTH_SECRET=<generated-with-openssl-rand-base64-32>
```

**Opcionais:**
```
BETTER_AUTH_URL=https://seu-dominio.com
```

## Como Usar

### Criar um Usuário Autenticado no Server Action
```ts
'use server'

import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { db } from '@/lib/db'
import { sql } from 'drizzle-orm'

async function getUserId() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) throw new Error('Unauthorized')
  return session.user.id
}

export async function myAction() {
  const userId = await getUserId()
  // Seu código aqui, userId é garantido ser válido
}
```

### Verificar Sessão no Client
```tsx
'use client'

import { authClient } from '@/lib/auth-client'
import { useEffect, useState } from 'react'

export default function Component() {
  const [session, setSession] = useState(null)

  useEffect(() => {
    const getSession = async () => {
      const { data } = await authClient.getSession()
      setSession(data?.session)
    }
    getSession()
  }, [])

  if (!session) return <div>Faça login para acessar</div>
  return <div>Bem-vindo, {session.user.name}!</div>
}
```

## Próximas Melhorias

1. **Verificação de Email**: Código de confirmação por email
2. **OAuth Social**: Google, GitHub, Facebook
3. **Reset de Senha**: Email com link de recuperação
4. **2FA**: Autenticação de dois fatores
5. **Histórico de Pedidos**: Página protegida com pedidos do usuário
6. **Dashboard de Usuário**: Perfil, configurações, histórico

## Troubleshooting

### "Unauthorized" no Server Action
- Certifique-se de que o usuário está autenticado
- Verifique se `headers()` é passado corretamente
- Confirme que a sessão cookie está sendo enviada

### Cookies Não São Salvos
- Dev: Verifique `sameSite: "none"` em development
- Production: Use HTTPS e domínio correto
- Safari: Pode ter restrições de cookie de terceiros

### Sessão Não Persiste
- Limpe o cache do navegador e cookies
- Regenere `BETTER_AUTH_SECRET`
- Verifique `BETTER_AUTH_URL` em production

## Referências

- [Better Auth Docs](https://www.better-auth.com/)
- [Neon Docs](https://neon.tech/docs)
- [Drizzle Docs](https://orm.drizzle.team/)
- [Next.js App Router](https://nextjs.org/docs/app)
