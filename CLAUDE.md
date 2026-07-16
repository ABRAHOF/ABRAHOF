@AGENTS.md
## Contexto

Este repositório contém a reconstrução mobile do aplicativo Abrahof Connections.

O aplicativo anterior foi criado para web usando React, Vite e TypeScript.
Ele deve ser usado somente como referência visual e funcional.

O novo aplicativo deve funcionar em Android e iOS usando:

- React Native;
- Expo;
- TypeScript;
- Expo Router.

## Etapa atual

Construir inicialmente somente:

- estrutura de pastas;
- navegação;
- telas básicas;
- componentes compartilhados;
- reprodução visual progressiva do projeto de referência.

Não implementar ainda:

- autenticação real;
- Supabase;
- pagamentos;
- notificações push;
- painel administrativo;
- integrações externas.

Usar dados mockados temporariamente.

## Regras técnicas

- Utilizar TypeScript.
- Utilizar Expo Router.
- Utilizar apenas componentes React Native.
- Não utilizar elementos HTML.
- Não utilizar React Router DOM.
- Não reutilizar componentes shadcn ou Radix.
- Não copiar configurações do Vite.
- Manter compatibilidade com Android e iOS.
- Tratar Safe Area.
- Criar componentes reutilizáveis.
- Evitar dependências desnecessárias.
- Preferir nomes em português.
- Não inserir credenciais no código.
- Não fazer commit automaticamente.

## Processo de alteração

Antes de alterar arquivos:

1. analisar a estrutura atual;
2. apresentar um plano curto;
3. informar os arquivos que pretende criar ou modificar.

Depois de alterar:

1. executar npm run lint;
2. executar npx tsc --noEmit;
3. informar os arquivos modificados;
4. explicar as decisões;
5. listar possíveis limitações;
6. não realizar commit.

## Git

Branches de funcionalidades:

- feat/nome-da-funcionalidade

Commits:

- adição: descrição
- correção: descrição
- documentação: descrição
- refatoração: descrição
- teste: descrição