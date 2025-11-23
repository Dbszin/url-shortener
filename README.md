# URL Shortener

Projeto simples de encurtador de URLs feito com NestJS e TypeORM.

## Recursos
- Gerar código curto aleatório
- Redirecionamento por shortCode
- Contador de acessos (hits)

## Requisitos
- Node.js >= 16
- npm ou yarn
- Banco de dados suportado pelo TypeORM (SQLite, Postgres, etc.)

## Instalação
PowerShell / Terminal:
```bash
npm install
```

## Configuração
Crie um arquivo `.env` na raiz com as variáveis necessárias (exemplo para SQLite):
```
DATABASE_URL=sqlite:./data/database.sqlite
PORT=3000
```
Ajuste conforme seu provider (Postgres, MySQL) e sua configuração do TypeORM.

## Execução
Desenvolvimento:
```bash
npm run start:dev
```
Produção:
```bash
npm run build
npm run start:prod
```

## Endpoints principais
- POST /links
  - Body: { "longUrl": "https://example.com" }
  - Retorna o registro criado com `shortCode`.
- GET /:shortCode
  - Redireciona para a URL longa e incrementa `hits`.

Exemplo curl:
```bash
curl -X POST http://localhost:3000/links -H "Content-Type: application/json" -d '{"longUrl":"https://example.com"}'
```

## Testes
```bash
npm run test
```

## Notas
- Confirme a configuração do TypeORM (sincronização/migrações) antes de rodar em produção.
- O gerador de shortCode usa bytes aleatórios; colisões são tratadas ao criar o registro.