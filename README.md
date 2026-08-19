# 📌 Pollify

**Pollify** é uma aplicação web para criação e participação em enquetes. O projeto foi desenvolvido com foco em uma autenticação segura baseada em JWT, utilizando access token de curta duração e refresh token para renovação automática da sessão, além de uma experiência simples e intuitiva para criar, gerenciar e participar de enquetes.

## ✨ Principais Funcionalidades

- Cadastro e autenticação de usuários
- Autenticação com **JWT + Refresh Token**
- Renovação automática do access token
- Criação de enquetes
- Listagem e visualização de enquetes
- Gerenciamento das próprias enquetes
- Votação em enquetes
- Visualização dos resultados
- Validação de dados no frontend e backend
- Feedback visual das ações realizadas
- Logging estruturado no backend

## 🔐 Autenticação

A autenticação utiliza **JWT** com access token e refresh token.

- O **access token** possui validade de **15 minutos**.
- O **refresh token** é utilizado para renovar o access token automaticamente.
- O refresh token é armazenado em **cookie HTTP**.
- O usuário não precisa realizar login novamente enquanto o refresh token permanecer válido.

## 🏗️ Arquitetura

A estrutura geral do projeto é dividida em:

```text
pollify/
├── api/
└── web/
```

Cada aplicação possui suas próprias configurações, dependências e variáveis de ambiente.

## 🛠️ Tecnologias

### Api

Node.js | TypeScript | Express 5 | PostgreSQL | Prisma ORM | Zod | JWT | Bcrypt | Cookie Parser | CORS | Helmet | Pino | Pino HTTP | Pino Pretty | BiomeJS

### Web

React 19 | TypeScript | Vite | Tailwind CSS 4 | TanStack Query | React Router | React Hook Form | Zod | Axios | Sonner | date-fns | BiomeJS

## 📚 Visão geral da API

### Status da API

| Método | Endpoint | Descrição |
|---|---|---|
| GET | `/health` | Verifica a disponibilidade da API |

### Autenticação

| Método | Endpoint | Descrição |
|---|---|---|
| POST | `/auth/signup` | Cria uma conta |
| POST | `/auth/signin` | Realiza login |
| POST | `/auth/refresh` | Renova o access token |
| POST | `/auth/signout` | Encerra a sessão |
| GET | `/auth/me` | Retorna o usuário autenticado |

### Enquetes

| Método | Endpoint | Descrição |
|---|---|---|
| POST | `/polls` | Cria uma enquete |
| GET | `/polls` | Lista enquetes públicas (`OPEN` e `CLOSED`) |
| GET | `/me/polls` | Lista as enquetes do usuário (`OPEN` e `CLOSED`) |
| GET | `/admin/polls` | Lista todas as enquetes (`DRAFT`, `OPEN` e `CLOSED`) |
| PATCH | `/polls/:id` | Atualiza uma enquete |
| DELETE | `/polls/:id` | Remove uma enquete |

### Votos

| Método | Endpoint | Descrição |
|---|---|---|
| GET | `/polls/:pollId/votes` | Retorna a enquete e o voto do usuário |
| POST | `/polls/:pollId/votes` | Registra um voto |

## 🚀 Executando o projeto

Clone o projeto, instale as dependências e configure os arquivos `.env`:

### Pré-requisitos

- Node.js
- PostgreSQL
- npm

### Variáveis de Ambiente

Cada aplicação deve possuir seu próprio arquivo `.env`, crie com base nas informações abaixo:

#### Api (`api/.env`)

- `NODE_ENV` (padrão: `development ou production`)
- `DATABASE_URL`
- `PORT` (exemplo: `5050`)
- `ACCESS_TOKEN_SECRET`
- `REFRESH_TOKEN_SECRET`
- `FRONTEND_URL` (padrão: `http://localhost:5173`)

#### Web (`web/.env`)

- `VITE_API_URL`  (exemplo: `http://localhost:5050`)
- `VITE_APP_NAME` (exemplo: `Pollify`)

### Instalação

```bash
cd ./api
npm install

cd ./web
npm install
```

### Scripts

#### Api

- `npm run dev` - Inicia o servidor da API em modo de desenvolvimento
- `npm run build` - Compila o TypeScript
- `npm run start` - Inicia o servidor compilado
- `npx prisma db seed` - Cria o administrador do sistema

#### Web

- `npm run dev` - Inicia o servidor de desenvolvimento do Vite
- `npm run build` - Verifica os tipos e gera a build de produção

---

Desenvolvido por **Davidson Ratis** · [GitHub](https://github.com/davR7) · [LinkedIn](https://www.linkedin.com/in/davidson-ratis/)