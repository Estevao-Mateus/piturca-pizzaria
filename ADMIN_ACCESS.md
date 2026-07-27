# Painel Administrativo Piturca - Guia de Acesso

## Acesso Seguro e Profissional

O painel administrativo da Piturca está disponível através de múltiplos pontos de acesso profissionais:

### 📍 Formas de Acesso

#### 1. **Footer da Página Principal** (Recomendado)
- Vá para a página inicial (https://piturca.com)
- Scroll até o final da página
- Na seção **"Gestão"**, clique em **"Acesso Admin"**
- Você será redirecionado para a página de login segura

#### 2. **Link Direto**
- Acesse diretamente: `/admin/login`

### 🔐 Credenciais de Acesso

**Ambiente Demo:**
- Senha: `admin123`

> ⚠️ **Produção:** Para ambiente de produção, configure autenticação com JWT/OAuth conforme necessário.

### 🎯 Interface de Login

A página de login oferece:
- Design professional com glassmorphism
- Toggle de visibilidade de senha
- Botão "Copiar" para facilitar entrada de credenciais demo
- Indicador de força visual
- Mensagens de erro claras
- Botão "Voltar" para retornar à homepage

### 📊 Funcionalidades do Painel

Após fazer login, você tem acesso a:

#### **Dashboard**
- Métricas principais (Receita, Pedidos, Clientes, Conversão)
- Gráfico de vendas semanal
- Pedidos recentes em tempo real

#### **Produtos** (`/admin/produtos`)
- Tabela com todos os produtos
- Adicionar, editar, deletar produtos
- Busca e filtro

#### **Pedidos** (`/admin/pedidos`)
- Rastreamento completo de pedidos
- Filtros por status
- Informações detalhadas

#### **Analytics** (`/admin/analytics`)
- Gráficos de vendas mensais
- Distribuição por categoria
- Top produtos

#### **Configurações** (`/admin/configuracoes`)
- Informações da empresa
- Configurações de entrega
- Preferências

### 🛡️ Segurança

O painel implementa:
- Autenticação com cookie seguro
- Token de acesso com expiração de 24 horas
- Redirecionamento automático em caso de sessão expirada
- Interface segura e profissional

### 🚀 Próximos Passos

Para produção:
1. Implementar autenticação robusta (JWT/OAuth)
2. Conectar banco de dados real (Neon/Supabase)
3. Adicionar MFA (Multi-Factor Authentication)
4. Implementar auditoria de ações
5. Adicionar backup automático

---

**Desenvolvido com ❤️ para Piturca Pizzaria**
