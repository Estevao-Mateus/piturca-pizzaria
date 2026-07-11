# Quick Start - Autenticação Piturca

## 🚀 Começar Rápido

### 1. Variáveis de Ambiente

Certifique-se que você tem as variáveis configuradas:

```bash
# .env.local
DATABASE_URL=postgresql://user:password@host/database
BETTER_AUTH_SECRET=<gerar com: openssl rand -base64 32>
```

### 2. Iniciar o Servidor

```bash
npm run dev
```

O aplicativo estará em `http://localhost:3000`

## 📝 Testar Autenticação

### Criar Conta (Sign Up)
1. Acesse `http://localhost:3000/sign-up`
2. Preencha: Nome, Email, Senha
3. Clique "Criar conta"
4. Será redirecionado para home

### Fazer Login
1. Acesse `http://localhost:3000/sign-in`
2. Preencha: Email, Senha
3. Clique "Entrar"
4. Será redirecionado para home

### Fazer Logout
1. No navbar, clique em "Sair"
2. Sessão será destruída
3. Página recarrega

## 🔍 Verificar Sessão

### No Browser
```javascript
// Console do navegador
const { data } = await fetch('/api/auth/session').then(r => r.json())
console.log(data)
```

### Em um Component
```tsx
'use client'
import { authClient } from '@/lib/auth-client'

export default function Component() {
  const [session, setSession] = useState(null)
  
  useEffect(() => {
    authClient.getSession().then(({ data }) => {
      setSession(data?.session)
    })
  }, [])
  
  return <div>{session ? `Olá ${session.user.name}` : 'Faça login'}</div>
}
```

## 🗄️ Database

### Ver Tabelas Criadas

```sql
-- Conectar ao banco
SELECT * FROM "user";
SELECT * FROM "session";
SELECT * FROM "account";
SELECT * FROM "verification";
SELECT * FROM "orders";
```

### Limpar Dados (Development)

```sql
-- Cuidado: DELETE IRREVOGÁVEL
DELETE FROM "orders";
DELETE FROM "session";
DELETE FROM "account";
DELETE FROM "user";
DELETE FROM "verification";
```

## 🔐 Endpoints da API

### Authentication
```
POST   /api/auth/signup         Criar conta
POST   /api/auth/signin         Fazer login
GET    /api/auth/session        Obter sessão atual
POST   /api/auth/signout        Fazer logout
```

## 📚 Arquivos Principais

| Arquivo | Função |
|---------|--------|
| `lib/auth.ts` | Configuração do Better Auth |
| `lib/auth-client.ts` | Cliente React |
| `lib/db/schema.ts` | Schema do banco |
| `components/auth-form.tsx` | Formulário de auth |
| `components/navbar.tsx` | Header com auth |
| `app/sign-in/page.tsx` | Página de login |
| `app/sign-up/page.tsx` | Página de registro |
| `app/api/auth/[...all]/route.ts` | Handler da API |

## 🛠️ Adicionar Autenticação em Novo Component

### 1. Proteger uma Ação no Server

```ts
// app/actions/myaction.ts
'use server'

import { auth } from '@/lib/auth'
import { headers } from 'next/headers'

async function getUserId() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) throw new Error('Unauthorized')
  return session.user.id
}

export async function myProtectedAction() {
  const userId = await getUserId()
  // Código protegido aqui
}
```

### 2. Proteger uma Página

```tsx
// app/mypages/page.tsx
import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'

export default async function ProtectedPage() {
  const session = await auth.api.getSession({ headers: await headers() })
  
  if (!session?.user) {
    redirect('/sign-in')
  }
  
  return (
    <div>
      <h1>Bem-vindo, {session.user.name}</h1>
    </div>
  )
}
```

### 3. Usar Sessão no Cliente

```tsx
'use client'

import { authClient } from '@/lib/auth-client'
import { useEffect, useState } from 'react'

export default function Component() {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    authClient.getSession().then(({ data }) => {
      setSession(data?.session)
      setLoading(false)
    })
  }, [])
  
  if (loading) return <div>Carregando...</div>
  if (!session) return <div>Não autenticado</div>
  
  return (
    <div>
      <h2>{session.user.name}</h2>
      <p>{session.user.email}</p>
    </div>
  )
}
```

## 🎨 Customizar Design

### Cores
Edite `/globals.css` para alterar o tema:

```css
@theme {
  --primary: #d97706;  /* Laranja */
  --background: #ffffff;
  /* ... */
}
```

### Tipografia
Altere em `app/layout.tsx`:

```tsx
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }) {
  return (
    <html className={inter.className}>
      <body>{children}</body>
    </html>
  )
}
```

## 🐛 Troubleshooting

### "Unauthorized" ao tentar ação
- ✓ Verifique se está autenticado
- ✓ Limpe cookies/cache
- ✓ Confirme BETTER_AUTH_SECRET está definido

### Sessão não persiste
- ✓ Limpe cookies do navegador
- ✓ Verifique se httpOnly está ativo
- ✓ Confirme domínio/URL corretos

### Erro ao criar conta
- ✓ Email já existe?
- ✓ Senha < 8 caracteres?
- ✓ Banco de dados conectado?

## 📖 Documentação Completa

- `AUTH_IMPLEMENTATION.md` - Documentação técnica completa
- `UX_DESIGN.md` - Detalhes de design e UX
- [Better Auth Docs](https://www.better-auth.com/)

## ✨ Próximas Features

- [ ] Verificação de Email
- [ ] Reset de Senha
- [ ] 2FA/MFA
- [ ] OAuth (Google, GitHub)
- [ ] Histórico de Pedidos
- [ ] Dashboard do Usuário

## 📞 Suporte

Para dúvidas sobre a implementação, consulte:
1. `AUTH_IMPLEMENTATION.md`
2. `UX_DESIGN.md`
3. [Better Auth Docs](https://www.better-auth.com/)
