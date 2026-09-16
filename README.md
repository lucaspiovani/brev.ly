# 🔗 Brev.ly

Aplicação FullStack de encurtador de URLs, desenvolvida como desafio da pós-graduação.

Permite o cadastro, listagem e remoção de links encurtados, geração de relatório
de acessos de cada link e redirecionamento do link encurtado para a URL original.

## Estrutura do repositório
```
brev.ly/
├── server/ → API (Back-end) + Docker (DevOps)
├── web/ → Aplicação React (Front-end)
```

O repositório segue a divisão exigida pelo desafio: `server` concentra a
resolução dos desafios de Back-end e DevOps, `web` concentra a resolução do
desafio de Front-end.


## 📁 server (Back-end)

> Status: ✅ completo — todas as funcionalidades, regras de negócio e o
> Dockerfile de produção implementados e testados.

**Stack obrigatória:** TypeScript, Fastify, Drizzle ORM, PostgreSQL.

**Arquitetura:** camadas inspiradas em princípios SOLID, com ênfase em
**Dependency Inversion (DIP)** — os `UseCases` dependem apenas dos contratos
`LinksRepository` e `StorageProvider` (classes abstratas), nunca das
implementações concretas (`DrizzleLinksRepository`, `R2StorageProvider`). A
ligação entre contrato e implementação é feita em um único lugar:
`shared/container.ts`, usando **tsyringe** para injeção de dependência.

Fluxo de uma requisição: `Route → UseCase → Repository/StorageProvider (contrato) → implementação concreta`

```
server/
├── src/
│ ├── modules/
│ │ └── links/
│ │ ├── entities/ # Link (tipo de domínio puro)
│ │ ├── dtos/ # contratos de entrada (CreateLinkDTO, UploadFileDTO)
│ │ ├── repositories/ # LinksRepository — contrato abstrato (DIP)
│ │ └── use-cases/ # regra de negócio, uma pasta por operação
│ │ ├── create-link/
│ │ ├── delete-link/
│ │ ├── list-links/
│ │ ├── get-original-url/
│ │ └── export-links/
│ ├── infra/
│ │ ├── db/
│ │ │ ├── schema.ts # tabela links (Drizzle)
│ │ │ ├── client.ts # conexão com Postgres
│ │ │ └── drizzle-links-repository.ts # implementação concreta do contrato
│ │ └── storage/
│ │ ├── storage-provider.ts # contrato abstrato (DIP)
│ │ └── r2-storage-provider.ts # implementação via Cloudflare R2
│ ├── http/
│ │ ├── app.ts # instância do Fastify, CORS, error handler global
│ │ ├── server.ts # entry point (start do servidor)
│ │ └── routes/ # uma rota por operação
│ ├── env/
│ │ └── index.ts # validação tipada das env vars (Zod)
│ └── shared/
│ ├── container.ts # registro da injeção de dependência (tsyringe)
│ └── errors/
│ └── app-error.ts
├── Dockerfile # multi-stage build, testado (build + run + health check)
├── docker-compose.yml # Postgres para ambiente de desenvolvimento
├── drizzle.config.ts
├── .env.example
└── package.json
```

**Como rodar (desenvolvimento):**

```bash
cd server
cp .env.example .env        # preencher DATABASE_URL e credenciais do Cloudflare R2
pnpm install
docker compose up -d        # sobe o Postgres local
pnpm run db:generate        # gera as migrations a partir do schema
pnpm run db:migrate         # aplica as migrations
pnpm run dev                # inicia o servidor em modo watch (http://localhost:3333)
```

**Como rodar (via Docker, imagem de produção):**

```bash
cd server
docker build -t brevly-server .
docker run -p 3333:3333 \
  -e DATABASE_URL="postgresql://usuario:senha@host.docker.internal:5432/brevly" \
  -e PORT=3333 \
  brevly-server
```

### ✅ Checklist do desafio (Back-end)

- [x] Deve ser possível criar um link
- [x] Não deve ser possível criar um link com URL encurtada mal formatada
- [x] Não deve ser possível criar um link com URL encurtada já existente
- [x] Deve ser possível deletar um link
- [x] Deve ser possível obter a URL original por meio de uma URL encurtada
- [x] Deve ser possível listar todas as URL's cadastradas
- [x] Deve ser possível incrementar a quantidade de acessos de um link
- [x] Deve ser possível exportar os links criados em um CSV
- [x] Deve ser possível acessar o CSV por meio de uma CDN (Amazon S3, Cloudflare R2, etc)
- [x] Deve ser gerado um nome aleatório e único para o arquivo
- [x] Deve ser possível realizar a listagem de forma performática
- [x] O CSV deve ter campos como URL original, URL encurtada, contagem de acessos e data de criação

---

## 📁 web (Front-end)

> Status: ✅ completo — todas as funcionalidades, fidelidade ao Figma, UX e
> responsividade implementadas e testadas em múltiplos breakpoints.

**Stack obrigatória:** TypeScript, React, Vite (SPA, sem framework).
**Bibliotecas utilizadas:** TailwindCSS, React Query, React Hook Form, Zod, Axios, React Router, Phosphor Icons.

**Páginas:**

| Rota | Descrição |
|---|---|
| `/` | Formulário de cadastro e listagem dos links |
| `/:shortUrl` | Resolução e redirecionamento do link |
| `*` | Página de recurso não encontrado (404) |

web/
├── src/
│ ├── pages/
│ │ ├── Home/ # formulário + listagem
│ │ ├── Redirect/ # resolução e redirecionamento
│ │ └── NotFound/ # 404
│ ├── components/
│ │ ├── Button/
│ │ ├── Input/
│ │ ├── IconButton/
│ │ ├── LinksList/ # busca, empty state, loading
│ │ └── LinkItem/ # item individual da listagem
│ ├── schemas/
│ │ └── create-link.schema.ts # validação Zod (RN01)
│ ├── services/
│ │ └── api.ts # cliente Axios configurado
│ └── App.tsx # definição das rotas
├── .env.example
└── vite.config.ts

**Como rodar:**

```bash
cd web
cp .env.example .env        # preencher VITE_FRONTEND_URL e VITE_BACKEND_URL
pnpm install
pnpm run dev                 # inicia em http://localhost:5173
```

### ✅ Checklist do desafio (Front-end)

- [x] Deve ser possível criar um link
- [x] Não deve ser possível criar um link com encurtamento mal formatado
- [x] Não deve ser possível criar um link com encurtamento já existente
- [x] Deve ser possível deletar um link
- [x] Deve ser possível obter a URL original por meio do encurtamento
- [x] Deve ser possível listar todas as URL's cadastradas
- [x] Deve ser possível incrementar a quantidade de acessos de um link
- [x] Deve ser possível baixar um CSV com o relatório dos links criados
- [x] É obrigatória a criação de uma aplicação React no formato SPA utilizando o Vite como bundler
- [x] Siga o mais fielmente possível o layout do Figma
- [x] Trabalhe com elementos que tragam uma boa experiência ao usuário (empty state, ícones de carregamento, bloqueio de ações a depender do estado da aplicação)
- [x] Foco na responsividade: essa aplicação deve ter um bom uso tanto em desktops quanto em celulares

---

## Requisitos gerais do desafio

- ✅ Aplicação FullStack: Frontend, Backend e DevOps.
- ✅ Cadastro, listagem, remoção e redirecionamento de links encurtados.
- ✅ Geração de relatório (CSV) dos acessos de cada link, hospedado em CDN (Cloudflare R2).

**Status geral: 24/24 itens concluídos (12 back-end + 12 front-end).**