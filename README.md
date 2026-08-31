# 🔗 Brev.ly

Aplicação FullStack de encurtador de URLs, desenvolvida como desafio da pós-graduação.

Permite o cadastro, listagem e remoção de links encurtados, geração de relatório
de acessos de cada link e redirecionamento do link encurtado para a URL original.

## Estrutura do repositório

```
brev.ly/
├── server/   → API (Back-end) + Docker (DevOps)
├── web/      → Aplicação React (Front-end)
```

O repositório segue a divisão exigida pelo desafio: `server` concentra a
resolução dos desafios de Back-end e DevOps, `web` concentra a resolução do
desafio de Front-end.

---

## 📁 server (Back-end)

> Status: estrutura base e injeção de dependência funcionando. Lógica de
> negócio dos UseCases (validações, RN01/RN02/RN04) e rotas HTTP ainda
> serão implementadas nas próximas etapas.

**Stack obrigatória:** TypeScript, Fastify, Drizzle ORM, PostgreSQL.

**Arquitetura:** camadas inspiradas em princípios SOLID, com ênfase em
**Dependency Inversion (DIP)** — os `UseCases` dependem apenas do contrato
`LinksRepository` (classe abstrata), nunca da implementação concreta
(`DrizzleLinksRepository`). A ligação entre contrato e implementação é feita
em um único lugar: `shared/container.ts`, usando **tsyringe** para injeção
de dependência.

Fluxo de uma requisição: `Route → Controller → UseCase → LinksRepository (contrato) → DrizzleLinksRepository (implementação)`

```
server/
├── src/
│   ├── modules/
│   │   └── links/
│   │       ├── entities/          # Link (tipo de domínio puro)
│   │       ├── dtos/              # contratos de entrada (CreateLinkDTO)
│   │       ├── repositories/      # LinksRepository — contrato abstrato (DIP)
│   │       └── use-cases/         # regra de negócio, uma pasta por operação
│   │           ├── create-link/
│   │           ├── delete-link/
│   │           ├── list-links/
│   │           ├── get-original-url/
│   │           └── export-links/
│   ├── infra/
│   │   ├── db/
│   │   │   ├── schema.ts                  # tabela `links` (Drizzle)
│   │   │   ├── client.ts                  # conexão com Postgres
│   │   │   └── drizzle-links-repository.ts # implementação concreta do contrato
│   │   └── storage/                        # integração com CDN (S3/R2) — próxima etapa
│   ├── http/
│   │   ├── app.ts       # instância do Fastify, CORS, rotas
│   │   └── server.ts     # entry point (start do servidor)
│   ├── env/
│   │   └── index.ts       # validação tipada das env vars (Zod)
│   └── shared/
│       ├── container.ts    # registro da injeção de dependência (tsyringe)
│       └── errors/
│           └── app-error.ts
├── Dockerfile              # a ser criado (última etapa do back-end)
├── docker-compose.yml      # Postgres para ambiente de desenvolvimento
├── drizzle.config.ts
├── .env.example
└── package.json
```

**Como rodar:**

```bash
cd server
cp .env.example .env       # preencher DATABASE_URL e credenciais do R2/S3
npm install
docker compose up -d        # sobe o Postgres local
npm run db:generate         # gera as migrations a partir do schema
npm run db:migrate          # aplica as migrations
npm run dev                 # inicia o servidor em modo watch (http://localhost:3333)
```

---

## 📁 web (Front-end)

> Status: ainda não iniciado. Estrutura de pastas será definida e documentada
> quando o desenvolvimento do front-end começar.

**Stack obrigatória:** TypeScript, React, Vite (SPA, sem framework).
**Bibliotecas cogitadas (uso flexível):** TailwindCSS, React Query, React Hook Form, Zod.

**Páginas obrigatórias:**

| Rota | Descrição |
|---|---|
| `/` | Formulário de cadastro e listagem dos links |
| `/:url-encurtada` | Resolução e redirecionamento do link |
| `*` | Página de recurso não encontrado |

**Como rodar** (a ser preenchido quando o front-end for iniciado):

```bash
# em construção
```

---

## Requisitos gerais do desafio

- Aplicação FullStack: Frontend, Backend e DevOps.
- Cadastro, listagem, remoção e redirecionamento de links encurtados.
- Geração de relatório (CSV) dos acessos de cada link, hospedado em CDN (S3/R2).

Este README será atualizado incrementalmente à medida que cada parte do
projeto for implementada.