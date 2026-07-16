# Backlog

Backlog da reconstrução mobile do **Abrahof Connections**, dividido em sprints com
tarefas pequenas.

> **Data:** 16/07/2026
> **Base:** [`REQUISITOS.md`](./REQUISITOS.md) · [`ARQUITETURA.md`](./ARQUITETURA.md) · [`BANCO.md`](./BANCO.md) · [`ANALISE_PROJETO_REFERENCIA.md`](./ANALISE_PROJETO_REFERENCIA.md)
> **Natureza:** planejamento. Nenhum código foi alterado.

---

## Como usar

- Cada tarefa é pequena: **meio dia ou menos**. Se crescer, quebrar em duas.
- `[ ]` pendente · `[x]` concluída
- 🔴 **bloqueada** — depende de decisão ou de terceiro
- 🧭 **decisão** — não é código; é escolha de produto
- Ao fim de cada sprint: `npm run lint` + `npx tsc --noEmit`, sempre.
- **Nenhum commit automático.** Branch `feat/nome-da-funcionalidade`.

### Sequência

| Sprint | Entrega | Bloqueio |
| --- | --- | --- |
| [0](#sprint-0--fundação) | Navegação e telas vazias | — |
| [1](#sprint-1--decisões-e-correções-de-modelo) | Decisões destravadas + correções de banco | 🧭 Produto |
| [2](#sprint-2--identidade-visual) | Tema real, Poppins, componentes base | — |
| [3](#sprint-3--casca-do-aplicativo) | Header, menu, Safe Area, links externos | Sprint 2 |
| [4](#sprint-4--telas-com-dados-mockados) | 10 telas com layout final | Sprint 3 |
| [5](#sprint-5--telas-ausentes) | Profissionais, WhatsApp, 404 | Sprint 4 |
| [6](#sprint-6--dados-reais-leitura) | Supabase substitui os mocks | Sprint 5 + Sprint 1 |
| [7](#sprint-7--arquivos-e-escrita) | Storage, downloads, formulário de contato | Sprint 6 |
| [8](#sprint-8--autenticação) | Login, cadastro, área restrita | 🧭 Decisão 1 |
| [9](#sprint-9--notificações) | Push + development build | Sprint 8 + contas |
| [10](#sprint-10--publicação) | App Store e Play Store | Sprint 9 |

**Sprints 1, 8 e 9 dependem de decisões ou de terceiros.** As demais são
executáveis com o que já existe.

---

## Sprint 0 — Fundação

**Objetivo:** estrutura navegável. ✅ **Concluída**

### Estrutura

- [x] Analisar o template `create-expo-app`
- [x] Remover 23 arquivos de demonstração
- [x] Remover o script `reset-project` do `package.json`
- [x] Reescrever `app/_layout.tsx` com Stack e SafeAreaProvider

### Telas

- [x] Tela inicial com menu de seções
- [x] Tela de login (visual, sem autenticação)
- [x] 8 telas vazias navegáveis
- [x] Títulos simples em cada tela

### Base

- [x] `constants/tema.ts` provisório
- [x] `constants/secoes.ts` mockado
- [x] `TelaBase` com Safe Area
- [x] `Botao`, `CampoTexto`, `CartaoSecao`
- [x] `npm run lint` + `npx tsc --noEmit` sem erros

### Documentação

- [x] `ANALISE_PROJETO_REFERENCIA.md`
- [x] `ARQUITETURA.md`
- [x] `REQUISITOS.md`
- [x] `BANCO.md`
- [x] `BACKLOG.md`
- [x] Corrigir "12 tabelas" → **13** em `ANALISE_PROJETO_REFERENCIA.md` e `ARQUITETURA.md`
- [x] Preencher `PADROES.md` e `DECISOES.md`

---

## Sprint 1.5 — Telas visuais ✅

**Objetivo:** as 10 telas com layout final sobre dados mockados.
**Concluída na auditoria visual de 16/07/2026.**

> Executada antes da Sprint 1 (decisões de produto e correções de banco), que
> segue pendente. As telas foram construídas sobre mocks, então a inversão não
> gerou retrabalho — mas as três correções de modelo continuam bloqueando a
> Sprint 6.

### Fundação visual

- [x] Tema escuro real (ciano sobre marinho), tokens por papel
- [x] `Tela`, `Cabecalho` (ADR-0008), `Cartao`, `Botao*`, `CampoTexto`, `TituloSecao`
- [x] `EstadoVazio`, `EstadoErro`, `Carregamento` (os dois últimos entram na Sprint 6)
- [x] Migração para `src/` (rotas em `src/app`)

### Telas

- [x] Início — hero, grade de 8 seções, selo oficial
- [x] Login — visual, sem autenticação
- [x] Academy — grade 2 colunas, cursos mockados
- [x] Clube de Benefícios — lista, selos de categoria e desconto
- [x] Eventos e Parceiros — bloco de data sem `Date` (bug de fuso evitado)
- [x] Documentos — tamanho formatado a partir de bytes
- [x] Galeria — grade 4:3 com `expo-image`
- [x] Patrocinadores — nome no lugar do logo ausente
- [x] Transmissão — área 16:9, status textual
- [x] Fale Conosco — formulário validado, envio desabilitado

### Auditoria (16/07/2026)

- [x] `Linking` padronizado: `canOpenURL` + tratamento nas 3 telas
- [x] `constants/links.ts` — fim da duplicação de `CANAL_YOUTUBE`
- [x] Rótulo do menu alinhado: "Contato" → "Fale Conosco"
- [x] `expo-haptics` e `expo-symbols` removidas
- [ ] Reavaliar props sem uso: `Cartao.imagem`, `Cartao.fim`, `Tela.semPadding`,
      `Tela.semCabecalho`, `Tela.acaoDireita`, `Cabecalho.logo`, `Sombras.elevada`

---

## Sprint 1 — Decisões e correções de modelo

**Objetivo:** destravar o que bloqueia todo o resto. **Sem código de app.**

> Esta sprint existe porque três correções de banco ficam **muito** mais caras
> depois que as telas forem construídas sobre o modelo errado (`BANCO.md` §16).

### 🧭 Decisões de produto

- [ ] 🧭 **Decisão 1 — A Área Restrita terá conteúdo exclusivo?**
      Destrava autenticação (Sprint 8) **e** pagamentos de uma vez
- [ ] 🧭 **Decisão 2 — Nome das rotas:** `/beneficios` ou `/clube-beneficios`?
      `/eventos` ou `/eventos-parceiros`? Fica mais caro após deep links
- [ ] 🧭 **Decisão 3 — Um benefício é um parceiro nomeado ou uma categoria?**
      Modelo e tela discordam hoje (`BANCO.md` §9)
- [ ] 🧭 **Decisão 4 — Revista AOS:** link externo ou leitor no app?
      Se for link, a tabela `revista_aos` deve ser **removida**, não migrada
- [ ] 🧭 **Decisão 5 — Transmissão:** player embutido ou link para o YouTube?
- [ ] 🧭 **Decisão 6 — "Telemedicina" é diretório ou consulta?**
      O nome promete ato médico; a tabela só guarda contato (risco CFM/CFO)
- [ ] 🧭 Registrar todas as decisões em `DECISOES.md`

### Correções de banco (antes de migrar)

- [ ] Criar coluna `eventos_parceiros.tipo` (Congresso, Simpósio, Workshop, Curso)
- [ ] Migrar os dados de `descricao` → `tipo` e liberar `descricao`
- [ ] Adicionar `transmissoes.idioma` (PT/EN)
- [ ] Adicionar `transmissoes.palestrante`
- [ ] 🔴 Ajustar `clube_beneficios` conforme a Decisão 3
- [ ] Padronizar `ativo`: adicionar em `documentos`, `revista_aos` e `galeria`
- [ ] Revisar `transmissoes.ativo DEFAULT false` (única divergente)

### Conteúdo — dependências externas

> Começar cedo: **não dependem de código e travam a publicação.**

- [ ] 🔴 Obter os logos reais dos 10 patrocinadores
- [ ] 🔴 Obter fotos reais da ABRAHOF (hoje são 6 imagens do Unsplash)
- [ ] 🔴 Obter os arquivos reais dos 5 documentos
- [ ] 🔴 Obter telefone real (hoje `+55 11 99999-9999` é placeholder)
- [ ] 🔴 Obter as URLs das redes sociais
- [ ] 🔴 Obter o número oficial do WhatsApp
- [ ] 🔴 Obter o logo do CIOSP (a web repete o da ABRAHOF)
- [ ] 🔴 Publicar a política de privacidade em URL pública (**obrigatória nas duas lojas**)

**Aceite:** decisões registradas; migrations aplicadas em ambiente de
desenvolvimento; pendências de conteúdo com responsável e prazo.

---

## Sprint 2 — Identidade visual

**Objetivo:** substituir o tema provisório pelo real.

> O tema atual está **errado**: é claro com azul escuro. O app real é **escuro,
> ciano sobre azul-marinho** (`ANALISE_PROJETO_REFERENCIA.md`, apêndice).

### Tema

- [ ] Reescrever `constants/tema.ts` com os tokens reais (fundo `210 50% 12%`,
      primária `195 85% 50%`)
- [ ] Nomear tokens **pelo papel** (`primaria`, `fundo`, `destaque`) — nunca
      `gold`/`forest`, que não produzem dourado nem verde
- [ ] Adicionar tokens de espaçamento, raio e sombra
- [ ] Definir a escala tipográfica (título, subtítulo, corpo, legenda)
- [ ] Ajustar `StatusBar` e `contentStyle` do Stack para o tema escuro

### Fonte

- [ ] Instalar `expo-font` (justificativa: empacotar Poppins localmente)
- [ ] Adicionar os arquivos da Poppins (400, 500, 600, 700)
- [ ] Carregar as fontes no `_layout` com splash até concluir
- [ ] Aplicar a Poppins na escala tipográfica

### Componentes base

- [ ] Migrar `components/` para `components/base/` e `components/layout/`
- [ ] Refatorar `Botao` com os tokens novos (variantes primário/secundário/texto)
- [ ] Refatorar `CampoTexto` (rótulo, erro, ícone opcional)
- [ ] Criar `Cartao` **genérico com slots** (`inicio`, `titulo`, `descricao`, `fim`)
- [ ] Criar `Selo` (categoria, desconto, idioma, "Novo")
- [ ] Criar `Carregando`, `Vazio` e `Erro` em `components/feedback/`
- [ ] Criar `TituloSecao`

**Aceite:** app em tema escuro com Poppins; nenhuma cor literal fora de
`tema.ts`; `Cartao` cobre as seis variações previstas em `REQUISITOS.md`.

---

## Sprint 3 — Casca do aplicativo

**Objetivo:** header, menu completo e navegação correta.

### Cabeçalho

- [ ] Criar `Cabecalho` com o logo da ABRAHOF centralizado
- [ ] Logo navega para o início
- [ ] **Não** incluir o botão hambúrguer (morto em todas as telas da web)
- [ ] **Não** incluir o sino enquanto não houver notificação real (badge "2" fixo
      treina o usuário a ignorar)

### Menu

- [ ] Tipar destino em `secoes.ts`: `tipo: 'rota' | 'externo'`
- [ ] Completar os 15 atalhos (hoje são 8)
- [ ] Ordenar por relevância (na web, "Área Restrita" é o primeiro e não faz nada)
- [ ] Instalar `expo-linking` (justificativa: abrir WhatsApp, site, YouTube)
- [ ] Abrir destino externo por `Linking`/`expo-web-browser`
- [ ] Grade responsiva à largura (a web fixa 3 colunas)
- [ ] `accessibilityLabel` e alvo mínimo de 44×44 pt por atalho

### Hero e rodapé

- [ ] Hero com selo de chancela
- [ ] **Datas do CIOSP fora do código** — fixo exige build novo e envelhece
      sozinho
- [ ] Botão de destaque "Transmissão"
- [ ] Selo "APLICATIVO OFICIAL"

### Navegação

- [ ] 🔴 Renomear rotas conforme a Decisão 2
- [ ] Criar `app/+not-found.tsx` em português, com a casca do app
- [ ] Reduzir a animação escalonada (na web, 800 ms até a grade assentar)
- [ ] Avaliar a barra inferior: com Stack nativa, "voltar" é redundante (Android
      tem gesto de sistema; iOS, gesto de borda)

**Aceite:** 15 atalhos funcionais, nenhum 404; nenhum botão sem ação; Safe Area
correta em aparelho com notch.

---

## Sprint 4 — Telas com dados mockados

**Objetivo:** layout final das 10 telas, sobre `mocks/`.

> Os mocks vivem em `mocks/`, **nunca dentro das telas**. Foi o array dentro do
> componente que deixou seis telas estáticas na web mesmo com tabela pronta.

### Estrutura

- [ ] Criar `mocks/` com um arquivo por domínio
- [ ] Criar `servicos/` devolvendo os mocks (assinatura final, já assíncrona)
- [ ] Criar `funcionalidades/<x>/` conforme `ARQUITETURA.md` §4
- [ ] Instalar `@tanstack/react-query` (justificativa: cache, revalidação,
      estados de carregamento/erro)
- [ ] Configurar o `QueryClientProvider` no `_layout`
- [ ] Criar `tipos/` com os tipos de domínio

### Telas — uma tarefa por tela

- [ ] **Academy** — grade de cursos, lista de aulas, hook `useCursosComAulas`
- [ ] **Eventos** — cartão de evento, data em dia/mês, filtros **funcionando**
      (a web só desenha as pílulas)
- [ ] **Transmissão** — grade de podcasts com selo de idioma
- [ ] **Documentos** — lista com ícone por tipo e tamanho formatado a partir de
      bytes
- [ ] **Benefícios** — 🔴 depende da Decisão 3
- [ ] **Galeria** — grade 2 colunas + lightbox
- [ ] **Patrocinadores** — grade com níveis
- [ ] **Contato** — dados clicáveis (`mailto:`, `tel:`, mapa) e formulário
- [ ] **Login** — `KeyboardAvoidingView`, validação, `autoComplete`
- [ ] **Início** — revisão final

### Regra obrigatória em todas

- [ ] Tratar **três** estados: carregando, vazio e **erro**
- [ ] `FlatList` no lugar de `.map()` em `ScrollView`
- [ ] `pull-to-refresh` nas listas
- [ ] Utilitários de formatação (data, bytes, duração) em `utilitarios/`

**Aceite:** as 10 telas com layout final; **erro nunca exibido como vazio** — o
defeito mais grave da referência (`REQUISITOS.md`, achado 1).

---

## Sprint 5 — Telas ausentes

**Objetivo:** entregar o que a web prometia no menu e nunca teve.

### Profissionais

- [ ] Criar `funcionalidades/profissionais/` com **um** componente para as três
      áreas (as tabelas são idênticas — `BANCO.md` §6)
- [ ] Tela **Telemedicina**
- [ ] Tela **Teleodontologia**
- [ ] Tela **Advogados Parceiros** (com OAB)
- [ ] Contato direto por `Linking` (telefone, e-mail, agendamento)
- [ ] 🔴 Ajustar o nome conforme a Decisão 6

### Outros

- [ ] **WhatsApp** — `Linking` com `wa.me`, **não é rota** (a web faz 404)
- [ ] Fallback quando o WhatsApp não estiver instalado
- [ ] 🔴 **Revista AOS** — conforme a Decisão 4
- [ ] 🔴 **Transmissão** — player ou link, conforme a Decisão 5

**Aceite:** os 15 atalhos do menu chegam a algum lugar; zero 404.

---

## Sprint 6 — Dados reais (leitura)

**Objetivo:** trocar mock por Supabase **sem tocar em nenhuma tela**.

> Se alguma tela precisar mudar, a fronteira de serviço falhou
> (`ARQUITETURA.md` §7).

### Infraestrutura

- [ ] Instalar `@supabase/supabase-js` e `@react-native-async-storage/async-storage`
- [ ] Criar `servicos/supabase/cliente.ts` com `detectSessionInUrl: false`
- [ ] **AsyncStorage**, não SecureStore (limite de ~2 KB no iOS derruba a sessão)
- [ ] Refresh de token atrelado ao `AppState`
- [ ] Variáveis via `EXPO_PUBLIC_…`; **`.env` fora do versionamento** (a web
      commitou as credenciais)
- [ ] Gerar tipos com o CLI do Supabase e versioná-los
- [ ] Criar erro tipado do app; a tela nunca vê `PostgrestError`

### Migração — um serviço por vez

- [ ] `eventos.ts` → `eventos_parceiros` (menor risco: já validada na web)
- [ ] `academy.ts` → cursos + aulas **com join no servidor**
- [ ] `documentos.ts` → `documentos`
- [ ] `galeria.ts` → `galeria`
- [ ] `patrocinadores.ts` → `patrocinadores`
- [ ] `beneficios.ts` → `clube_beneficios`
- [ ] `transmissao.ts` → `transmissoes`
- [ ] `profissionais.ts` → tabelas de profissionais
- [ ] Remover `mocks/`

### RLS

- [ ] `transmissoes`: trocar `USING (true)` por `USING (ativo = true)` — hoje
      expõe rascunhos (`DEFAULT false`)
- [ ] `academy_aulas`: restringir às aulas de curso ativo — hoje aula de curso
      inativo continua visível
- [ ] 🔴 **Revisar exposição de dado pessoal** (telefone, e-mail e foto de
      terceiros com `USING (true)`) — LGPD exige consentimento

**Aceite:** nenhuma tela alterada durante a migração; `mocks/` removida; erro de
rede exibe erro, não "conteúdo em breve".

---

## Sprint 7 — Arquivos e escrita

**Objetivo:** downloads reais e o primeiro `INSERT` do app.

### Storage

- [ ] Criar buckets (`documentos`, `galeria`, `logos`), um por finalidade
- [ ] Definir política **por bucket** — RLS protege a linha, não o arquivo
- [ ] 🔴 Subir os arquivos reais (Sprint 1)
- [ ] Download com progresso e cancelamento (`expo-file-system`, API `File`)
- [ ] Abrir o documento no app; não só baixar (no iOS, arquivo baixado some da
      vista)
- [ ] Formatar `tamanho_bytes` vindo do banco
- [ ] URL assinada para arquivo privado

### Galeria

- [ ] Usar `expo-image` com cache e placeholder
- [ ] `thumbnail_url` separado — **remover o truque de reescrever a URL**
      (`w=400&h=300` → `w=800&h=600`), que quebra fora do Unsplash
- [ ] Zoom por gesto e navegação lateral no lightbox
- [ ] Paginação

### Formulário de contato

- [ ] 🔴 **Rate limit antes de ligar o formulário** — `INSERT WITH CHECK (true)`
      com chave anon extraível do APK é endpoint aberto de escrita
- [ ] Edge Function com validação e limite por IP
- [ ] Enviar com estado de carregamento, confirmação e erro
- [ ] Acrescentar `assunto` e `telefone` (o banco já prevê)
- [ ] 🔴 **Definir quem lê as mensagens** — sem painel nem política de `SELECT`,
      a mensagem entra e morre
- [ ] Trigger → e-mail para `contato@abrahof.com.br` (alternativa barata ao painel)
- [ ] Definir prazo de retenção (LGPD)

**Aceite:** download funciona em Android e iOS; mensagem chega a um humano;
formulário protegido contra spam.

---

## Sprint 8 — Autenticação

**Objetivo:** login real. 🔴 **Bloqueada pela Decisão 1.**

> Sem conteúdo exclusivo, o login é porta que não tranca nada — e a Apple reprova
> app que exige cadastro sem conteúdo próprio (`REQUISITOS.md` §2).

### Banco

- [ ] Criar `perfis` referenciando `auth.users` (`ON DELETE CASCADE`)
- [ ] Trigger para popular `perfis` a partir de `auth.users`
- [ ] Criar `papeis_usuario` **em tabela separada** — papel em coluna que o
      próprio usuário edita é auto-promoção a admin
- [ ] Criar `tem_papel()` com `SECURITY DEFINER`
- [ ] Aplicar as políticas de escrita (`tem_papel('admin')`) nas 13 tabelas
- [ ] 🔴 Mapear a integração com a base de associados (hoje vive no site, fora do
      app — **não está mapeada em lugar nenhum**)

### App

- [ ] `hooks/useSessao` sobre Context enxuto
- [ ] Ligar o login ao Supabase Auth (**remover o `console.log` da senha**)
- [ ] Validação com erro por campo, sem revelar se o e-mail existe
- [ ] Tela de **cadastro** (a web faz 404)
- [ ] Tela de **recuperação de senha** com deep link de retorno
- [ ] `app/(autenticado)/_layout.tsx` com a guarda de rota
- [ ] Splash enquanto a sessão carrega — nunca piscar o login para quem já entrou
- [ ] Logout
- [ ] Ícone de perfil refletindo o estado da sessão

### Benefícios exclusivos

- [ ] Mover `codigo_promocional` para tabela própria com RLS de associado — RLS
      filtra linha, não coluna (`BANCO.md` §9)
- [ ] Exibir o código só para associado autenticado
- [ ] Copiar código com confirmação visual

**Aceite:** rota protegida inacessível sem sessão; senha nunca em log; código
promocional invisível para visitante **na API**, não só na tela.

---

## Sprint 9 — Notificações

**Objetivo:** push real. 🔴 **Exige development build e contas de loja.**

> Primeira funcionalidade que **quebra o fluxo atual**: push remoto não funciona
> no Expo Go em Android desde a SDK 53 (`ARQUITETURA.md` §14).

### Infraestrutura

- [ ] 🔴 Criar a conta Apple Developer (USD 99/ano; verificação leva semanas)
- [ ] 🔴 Criar a conta Google Play Console (USD 25)
- [ ] Configurar EAS e o perfil `development`
- [ ] Gerar development build para Android e iOS
- [ ] Configurar credenciais FCM e APNs

### App

- [ ] Instalar `expo-notifications`
- [ ] Criar a tabela `dispositivos` (token único, plataforma, usuário nullable)
- [ ] Registrar token; revogar no logout
- [ ] Canal de notificação Android (obrigatório antes do token no 13+)
- [ ] Pedir permissão **no contexto**, nunca na abertura
- [ ] Deep link no payload (`scheme` já configurado)
- [ ] Edge Function de envio — chave **nunca** no app
- [ ] Preferências por categoria (eventos, cursos, avisos)
- [ ] 🔴 Tela de notificações, conforme decisão pendente
- [ ] Badge só com contagem real por trás

**Aceite:** push recebido em aparelho físico Android e iOS; tocar abre a tela
certa; permissão negada não quebra o app.

---

## Sprint 10 — Publicação

**Objetivo:** app nas duas lojas.

### Configuração

- [ ] Definir `ios.bundleIdentifier` e `android.package` — **imutáveis após a
      publicação**
- [ ] Revisar o `slug` (hoje `ABRAHOF`, maiúsculo)
- [ ] Configurar `autoIncrement` de `buildNumber`/`versionCode`
- [ ] Criar os perfis `preview` e `production`
- [ ] Configurar EAS Submit

### Ativos

- [ ] Ícone 1024×1024 **sem transparência** (a Apple rejeita com canal alfa)
- [ ] Ícone adaptativo Android (hoje ainda é o do template Expo)
- [ ] Splash com a identidade da ABRAHOF
- [ ] Capturas por tamanho de tela exigido
- [ ] Descrição, palavras-chave e classificação etária

### Conformidade

- [ ] 🔴 Política de privacidade publicada (Sprint 1)
- [ ] Preencher App Privacy (Apple) e Data Safety (Google)
- [ ] Justificar cada permissão no `Info.plist`
- [ ] Conta de teste para a revisão (se houver login)
- [ ] **Varrer botões sem ação** — a Apple reprova; a web tinha ~25
- [ ] 🔴 Revisar a conformidade de pagamentos (§15 da arquitetura) se houver
      conteúdo exclusivo

### Lançamento

- [ ] Build `preview` e testes internos
- [ ] TestFlight e faixa interna do Google Play
- [ ] Configurar EAS Update (OTA só para JS; mudança nativa exige build)
- [ ] Submeter às duas lojas
- [ ] Documentar o processo de release

**Aceite:** aprovado nas duas lojas; nenhum botão sem ação; nenhum dado
placeholder.

---

## Riscos

| Risco | Impacto | Mitigação |
| --- | --- | --- |
| **Decisão 1 não sai** | Trava Sprints 8 e 9 | Sprints 2–7 seguem sem ela |
| **Conteúdo real não chega** (logos, fotos, arquivos) | Trava a publicação | Cobrar na Sprint 1; **não depende de código** |
| **Conta Apple demora** | Trava a Sprint 9 | Abrir na Sprint 1 |
| Migrar antes de corrigir o modelo | Retrabalho em serviço, tela e dados | Sprint 1 antes da 6 |
| `contatos` sem rate limit | Spam com custo | Bloquear a Sprint 7 até resolver |
| Dado pessoal público (LGPD) | Exposição legal | Revisar RLS antes das telas de profissionais |
| Publicar com botão morto | Rejeição | Varredura na Sprint 10 |

---

## Marcos

| Marco | Sprint | Significado |
| --- | --- | --- |
| Navegável | 0 ✅ | Estrutura de pé |
| Decidido | 1 | Modelo corrigido, decisões registradas |
| Apresentável | 4 | Visual final com mock — demonstrável |
| Completo | 5 | Todos os atalhos chegam a algum lugar |
| Vivo | 6 | Conteúdo real do Supabase |
| Funcional | 7 | Download e contato funcionando |
| Publicável | 10 | Nas lojas |

**Sprints 2–7 não dependem de decisão nem de terceiros** — é onde o trabalho pode
começar hoje.
