# Requisitos Funcionais

Levantamento das funcionalidades encontradas no projeto de referência web,
documentadas como requisitos para a reconstrução mobile.

Cada tela é descrita por objetivo, usuário, campos, botões, regras, fluxo, dados
necessários, dependências e melhorias sugeridas.

> **Data:** 16/07/2026
> **Fontes:** [`ANALISE_PROJETO_REFERENCIA.md`](./ANALISE_PROJETO_REFERENCIA.md) · [`ARQUITETURA.md`](./ARQUITETURA.md)
> **Natureza:** documento descritivo. Nenhum código foi implementado.

---

## Como ler este documento

**Legenda de situação**

| Marca | Significado |
| --- | --- |
| ✅ | Funciona na referência |
| ⚠️ | Existe na interface, mas **não funciona** |
| ❌ | Previsto (menu ou banco), **tela inexistente** |
| 🆕 | Requisito novo, sem equivalente na web |

**Sobre "usuário":** o projeto de referência **não tem autenticação**. Todas as
telas são públicas, inclusive a "Área Restrita". Onde este documento menciona
*associado*, trata-se de perfil **presumido**, dependente da decisão pendente
registrada em `ARQUITETURA.md` §17.1.

**Perfis considerados**

| Perfil | Definição | Existe hoje? |
| --- | --- | --- |
| **Visitante** | Qualquer pessoa com o app instalado | Sim — é o único |
| **Associado** | Membro adimplente da ABRAHOF | Não |
| **Administrador** | Gestor de conteúdo | Não (nem painel, nem papel no banco) |

---

## Sumário

| # | Tela | Situação | Dados |
| --- | --- | --- | --- |
| 1 | [Início](#1-início) | ✅ | Estático |
| 2 | [Login](#2-login) | ⚠️ Não autentica | — |
| 3 | [Transmissão](#3-transmissão) | ✅ | Estático |
| 4 | [Academy](#4-academy) | ✅ | Supabase |
| 5 | [Eventos Parceiros](#5-eventos-parceiros) | ✅ | Supabase |
| 6 | [Documentos](#6-documentos) | ⚠️ Download não funciona | Estático |
| 7 | [Clube de Benefícios](#7-clube-de-benefícios) | ✅ | Estático |
| 8 | [Galeria](#8-galeria) | ✅ | Estático |
| 9 | [Fale Conosco](#9-fale-conosco) | ⚠️ Não envia | Estático |
| 10 | [Patrocinadores](#10-patrocinadores) | ✅ | Estático |
| 11 | [NotFound](#11-notfound) | ✅ | — |
| 12 | [Componentes transversais](#12-componentes-transversais) | ⚠️ | — |
| 13 | [Telas previstas e ausentes](#13-telas-previstas-e-ausentes) | ❌ | — |

---

## 1. Início

**Rota:** `/` · **Origem:** `src/pages/Index.tsx` · ✅

### Objetivo

Hub de navegação do aplicativo. Concentra o acesso a todas as seções e posiciona
o CIOSP 2026 como evento central.

### Usuário

Visitante. É a tela de entrada e não exige identificação.

### Campos

Nenhum campo de entrada. Tela exclusivamente de navegação.

### Botões

| Elemento | Ação | Situação |
| --- | --- | --- |
| **Transmissão** (destaque) | Navega para `/transmissao` | ✅ |
| Grade de 15 atalhos | Ver tabela abaixo | 10 ✅ / 5 ❌ |

**Grade de atalhos** (3 colunas, ordem da referência):

| # | Rótulo | Destino | Situação |
| --- | --- | --- | --- |
| 1 | Área Restrita | `/login` | ⚠️ Não restringe nada |
| 2 | Transmissão | `/transmissao` | ✅ |
| 3 | Academy | `/academy` | ✅ |
| 4 | Eventos Parceiros | `/eventos-parceiros` | ✅ |
| 5 | Revista AOS | `ahof.emnuvens.com.br` (externo, com UTM) | ✅ |
| 6 | Telemedicina | `/telemedicina` | ❌ 404 |
| 7 | Teleodontologia | `/teleodontologia` | ❌ 404 |
| 8 | Documentos | `/documentos` | ✅ |
| 9 | Clube de Benefícios | `/clube-beneficios` | ✅ |
| 10 | Website | `abrahof.org.br` (externo) | ✅ |
| 11 | Galeria | `/galeria` | ✅ |
| 12 | Fale Conosco | `/contato` | ✅ |
| 13 | Patrocinadores | `/patrocinadores` | ✅ |
| 14 | Advogados Parceiros | `/advogados-parceiros` | ❌ 404 |
| 15 | WhatsApp | `/whatsapp` | ❌ 404 — deveria ser link externo |

### Regras

1. Item marcado como `external` abre no navegador; os demais navegam internamente.
2. **Um terço dos atalhos está quebrado** (5 de 15 levam a 404).
3. Cada cartão anima com atraso escalonado (`100 + índice × 50 ms`) — o último
   item entra ~800 ms após o primeiro.
4. Conteúdo do hero fixo no código: selo, "ABRAHOF", "20 a 25 de Janeiro |
   CIOSP 2026" e "Uma celebração da excelência em Harmonização Orofacial".
5. Rodapé com selo "APLICATIVO OFICIAL" — estático.

### Fluxo

```
Abrir app → Início → escolher atalho
                       ├─ interno  → tela correspondente
                       ├─ externo  → navegador
                       └─ quebrado → 404
```

### Dados necessários

Nenhum — tudo estático. A lista de atalhos é um array no componente.

### Dependências

Nenhuma externa. Assets: `selo-chancela.png`, `abrahof-logo.png` (via header).

### Melhorias sugeridas

- **Corrigir os 5 destinos quebrados.** Prioridade máxima: é a primeira tela, e
  1 em cada 3 toques falha.
- **Tipar o destino** (`tipo: 'rota' | 'externo'`) em vez de um booleano
  `external` opcional. Foi a ausência disso que fez `/whatsapp` virar rota
  interna e quebrar. Ver `ARQUITETURA.md` §10.
- **Mover a lista para `mocks/secoes.ts`**, fora do componente, para virar dado
  de serviço depois.
- **Datas do CIOSP fora do código.** "20 a 25 de Janeiro" fixo exige build novo
  para corrigir e envelhece sozinho — em janeiro de 2027 o app estará mentindo.
- **Reduzir a animação escalonada** — 800 ms até a grade assentar é lento no
  mobile.
- **Ordem dos atalhos por relevância**, não por acaso: "Área Restrita" ocupa a
  primeira posição e não faz nada.
- Grade responsiva a partir da largura, não fixa em 3 colunas.
- Alvo de toque mínimo de 44×44 pt e `accessibilityLabel` por atalho.

---

## 2. Login

**Rota:** `/login` · **Origem:** `src/pages/Login.tsx` · ⚠️ **Não autentica**

### Objetivo

Declarado: dar acesso à conta ABRAHOF. Real: **nenhum** — o formulário não
autentica.

### Usuário

Visitante tentando se identificar. Não há perfil autenticado no sistema.

### Campos

| Campo | Tipo | Obrigatório | Validação | Placeholder |
| --- | --- | --- | --- | --- |
| E-mail | `email` | Não declarado | **Nenhuma** | "Digite seu e-mail" |
| Senha | `password` | Não declarado | **Nenhuma** | "Digite sua senha" |

### Botões

| Elemento | Ação | Situação |
| --- | --- | --- |
| Olho (senha) | Alterna visibilidade | ✅ Único que funciona |
| **Entrar** | `console.log` + `// TODO: Implement actual login` | ⚠️ Não autentica |
| Esqueci minha senha | — | ⚠️ Sem `onClick` |
| Cadastrar | Navega para `/cadastro` | ❌ 404 |

### Regras

1. `handleLogin` faz `preventDefault` e registra e-mail e senha no console.
   **Nunca chama o Supabase Auth.**
2. Não há validação de formato, campo obrigatório, força de senha ou limite de
   tentativas.
3. Não há estado de carregamento, mensagem de erro ou de sucesso.
4. Nenhuma rota é protegida — pular o login não muda nada.
5. **A tela exibe o logo da ABRAHOF duas vezes**, um deles rotulado como CIOSP.

### Fluxo

```
Início → "Área Restrita" → Login
                             ├─ Entrar   → console.log → nada acontece
                             ├─ Esqueci  → nada
                             └─ Cadastrar → 404
```

**Nenhum caminho conclui.** É uma tela sem saída bem-sucedida.

### Dados necessários

Nada hoje. Para funcionar de verdade exigiria o que **não existe no banco**:
tabela de perfis ligada a `auth.users` e papel do usuário.

### Dependências

- Supabase Auth (não integrado).
- Telas de cadastro e recuperação de senha (não existem).
- **Decisão de produto** `ARQUITETURA.md` §17.1.

### Melhorias sugeridas

- **Antes de implementar, responder: o que o associado vê que o visitante não
  vê?** Sem isso, o login é uma porta que não tranca nada. E a Apple reprova app
  que exige cadastro sem conteúdo próprio por trás.
- Validação de e-mail e senha com feedback por campo.
- Estado de carregamento no botão e bloqueio de duplo envio.
- Mensagens de erro específicas e em português, sem revelar se o e-mail existe
  (evita enumeração de contas).
- `secureTextEntry`, `autoComplete` e `textContentType` corretos para acionar o
  gerenciador de senhas do sistema.
- `KeyboardAvoidingView` — no mobile o teclado cobre o formulário.
- **Nunca registrar senha em log**, nem em desenvolvimento. O `console.log`
  atual imprime a senha em texto puro.
- Obter o logo real do CIOSP ou remover o segundo.
- Recuperação de senha via `resetPasswordForEmail` com deep link de retorno.

---

## 3. Transmissão

**Rota:** `/transmissao` · **Origem:** `src/pages/Transmissao.tsx` · ✅

### Objetivo

Divulgar a programação dos podcasts ao vivo durante o CIOSP 2026 e levar ao canal
do YouTube.

### Usuário

Visitante interessado no evento.

### Campos

Nenhum.

### Botões

| Elemento | Ação | Situação |
| --- | --- | --- |
| Cartão de podcast | **Nada** | ⚠️ Ícone de play sugere reprodução, mas não é clicável |
| Canal ABRAHOF no YouTube | Abre `youtube.com/@abrahof_oficial` | ✅ |

### Regras

1. Cinco podcasts fixos no código, com data/hora, idioma (PT/EN), palestrante,
   título e descrição.
2. Idioma exibido como selo — apenas PT e EN.
3. **A tabela `transmissoes` existe no banco, com `url_stream`, e nunca é
   consultada.**
4. **Não há player.** O ícone de play é decorativo.
5. Ordenação fixa pelo array; não há filtro por data nem destaque do "ao vivo
   agora".

### Fluxo

```
Início → Transmissão → lê a grade → (opcional) YouTube
```

### Dados necessários

Tabela `transmissoes` (já existe, não usada): `titulo`, `descricao`,
`url_stream`, `thumbnail_url`, `data_inicio`, `data_fim`, `ativo`.

**Lacuna:** o modelo não tem campo de **idioma** nem de **palestrante**, ambos
exibidos na tela. Migrar exige alterar a tabela ou derivar de `descricao` — e
essa segunda opção é o mesmo erro já cometido em `eventos_parceiros`, onde
`descricao` virou o tipo do evento.

### Dependências

- `transmissoes` (migração pendente).
- YouTube (link externo).
- Decisão `ARQUITETURA.md` §17.4: player no app ou link?

### Melhorias sugeridas

- **Decidir player vs. link.** Player embutido é bem melhor, mas se o conteúdo é
  do YouTube, a política da plataforma e o custo de manutenção pesam. Link
  externo é honesto; ícone de play que não toca nada não é.
- **Estado "ao vivo agora"** comparando `data_inicio`/`data_fim` com o horário do
  dispositivo — hoje não há indicação de que a transmissão está no ar.
- **Separar programação futura de passada.** Depois de 25/01/2026 a tela vira um
  arquivo morto sem sinalizar isso.
- Acrescentar `idioma` e `palestrante` ao modelo antes de migrar.
- Fuso horário explícito ("13:00 (Brasília)") — o app roda em qualquer fuso.
- Lembrete local de início da transmissão (não exige push).
- `FlatList` no lugar de `.map()`.

---

## 4. Academy

**Rota:** `/academy` · **Origem:** `src/pages/Academy.tsx` · ✅ **Supabase**

### Objetivo

Catálogo de cursos e aulas em vídeo para profissionais de HOF.

### Usuário

Visitante. Apesar de "cursos exclusivos para profissionais", o conteúdo é
**público** (`SELECT USING (true)`).

### Campos

Nenhum. Não há busca nem filtro.

### Botões

| Elemento | Ação | Situação |
| --- | --- | --- |
| Cartão de curso | Abre no YouTube o vídeo da **primeira aula** | ✅ |
| Item de aula | Abre `video_url` no YouTube | ✅ |
| Acessar Canal YouTube | Abre o canal | ✅ |

### Regras

1. Cursos: filtra `ativo = true`, ordena por `ordem`.
2. Aulas: ordena por `ordem`; **agrupamento por `curso_id` feito no cliente**.
3. Curso abre o vídeo da **primeira aula** do grupo — não há tela de detalhe do
   curso nem lista de aulas por curso.
4. Curso sem aula com `video_url` fica com opacidade reduzida e **não é
   clicável**.
5. **O primeiro curso da lista sempre recebe o selo "Novo"** — regra posicional
   (`index === 0`), não um campo do banco. Se a ordenação mudar, o selo migra
   para outro curso.
6. `instrutor` vazio exibe "ABRAHOF".
7. Sem cursos: mensagem "Cursos em breve disponíveis".
8. **Erro de consulta não é tratado** — `isLoading` vira `false`, `cursos` fica
   indefinido e a tela mostra o estado vazio. **Falha de rede é indistinguível de
   catálogo vazio.**
9. A seção "Aulas Disponíveis" lista **todas** as aulas, soltas do curso.

### Fluxo

```
Início → Academy → carregando (esqueleto)
                     ├─ com cursos → toca no curso → YouTube (1ª aula)
                     ├─ sem cursos → "Cursos em breve"
                     └─ erro       → "Cursos em breve"  ← mentira
```

### Dados necessários

| Tabela | Campos usados |
| --- | --- |
| `academy_cursos` | `id`, `titulo`, `instrutor`, `carga_horaria`, `thumbnail_url`, `ordem`, `ativo` |
| `academy_aulas` | `id`, `curso_id`, `titulo`, `video_url`, `duracao`, `ordem` |

Campos existentes e não usados: `academy_cursos.descricao`,
`academy_aulas.descricao`.

### Dependências

- Supabase (`academy_cursos`, `academy_aulas`).
- TanStack Query.
- YouTube.

### Melhorias sugeridas

- **Tratar erro separadamente do vazio.** É o defeito mais grave da referência:
  a tela mente para o usuário quando a rede falha. Ver `ARQUITETURA.md` §5.
- **Tela de detalhe do curso** (`/academy/[id]`) com as aulas. Abrir a primeira
  aula direto é um atalho que descarta as demais.
- **Agrupar no servidor**, com join (`cursos` + `aulas`), em vez de duas queries
  e agrupamento no cliente.
- **Selo "Novo" a partir do banco** (`created_at` ou campo próprio) — a regra
  posicional atual é acidental.
- Curso não clicável precisa dizer por quê ("Em breve"); opacidade não comunica.
- `carga_horaria` é texto livre no banco — padronizar.
- Progresso de aula assistida (exige login).
- Deep link `abrahof://academy/<id>` para notificação de curso novo.

---

## 5. Eventos Parceiros

**Rota:** `/eventos-parceiros` (mobile: `/eventos`) · **Origem:** `src/pages/EventosParceiros.tsx` · ✅ **Supabase**

### Objetivo

Divulgar eventos chancelados pela ABRAHOF e captar solicitações de chancela.

### Usuário

Visitante; organizadores de eventos como público do CTA.

### Campos

Nenhum de entrada. Os filtros são visuais e não funcionam.

### Botões

| Elemento | Ação | Situação |
| --- | --- | --- |
| Pílulas de filtro (Todos, Congresso, Evento, Simpósio, Workshop, Curso) | **Nada** | ⚠️ "Todos" fixo como ativo |
| Ver calendário | — | ⚠️ Sem ação |
| Inscrever | Abre `link_inscricao` | ✅ Só quando o link existe |
| Detalhes | — | ⚠️ Sem ação (fallback quando não há link) |
| Solicitar Chancela | — | ⚠️ Sem ação |

### Regras

1. Filtra `ativo = true`, ordena por `data_evento` crescente.
2. **Não exclui eventos passados** — a lista mistura o que já aconteceu.
3. Data quebrada em dia (`dd`) e mês (`MMM`, ptBR, maiúsculo).
4. `local` vazio exibe "A definir".
5. **`descricao` é usado como *tipo* do evento** (Congresso, Workshop…),
   acumulando duas funções. Vazio vira "Evento".
6. Com `link_inscricao` → "Inscrever" (externo); sem → "Detalhes" (botão morto).
7. Estatísticas ("25+ eventos/ano", "15 parceiros", "27 estados") são **texto
   fixo**, não calculadas.
8. Erro não tratado — mesmo defeito da Academy.

### Fluxo

```
Início → Eventos → carregando
                     ├─ com eventos → Inscrever → navegador
                     │                 Detalhes  → nada
                     ├─ vazio → "Nenhum evento disponível"
                     └─ erro  → "Nenhum evento disponível"  ← mentira
```

### Dados necessários

Tabela `eventos_parceiros`: `id`, `titulo`, `descricao`, `local`, `data_evento`,
`link_inscricao`, `ativo`. Não usados: `imagem_url`, `organizador`.

**Lacuna:** não existe campo `tipo`. As pílulas de filtro não têm por onde
filtrar — provavelmente é por isso que nunca funcionaram.

### Dependências

- Supabase (`eventos_parceiros`).
- `date-fns` + locale ptBR na web (no mobile, avaliar `Intl` nativo antes de
  adicionar dependência).
- Decisão `ARQUITETURA.md` §17.2 (nome da rota).

### Melhorias sugeridas

- **Criar a coluna `tipo`** e fazer os filtros funcionarem. Hoje eles são
  decoração — e a causa raiz está no modelo, não na interface.
- **Liberar `descricao`** para ser descrição de verdade.
- **Separar "Próximos" de "Anteriores"** — a tela promete "Próximos Eventos" e
  entrega tudo.
- **Estatísticas calculadas** ou removidas. Número inventado na tela é dívida de
  credibilidade.
- Tela de detalhe (`/eventos/[id]`) para o botão "Detalhes" fazer sentido, usando
  `imagem_url` e `organizador`, hoje ignorados.
- "Solicitar Chancela" precisa de destino: formulário, e-mail ou WhatsApp.
- Filtro no servidor quando a lista crescer.
- `pull-to-refresh` — esperado em lista mobile e ausente na web.

---

## 6. Documentos

**Rota:** `/documentos` · **Origem:** `src/pages/Documentos.tsx` · ⚠️

### Objetivo

Disponibilizar materiais do CIOSP 2026 para download.

### Usuário

Visitante; expositores e participantes.

### Campos

Nenhum.

### Botões

| Elemento | Ação | Situação |
| --- | --- | --- |
| Download (por item) | **Nada** | ⚠️ Sem `onClick` |
| Ver mais documentos | `href="#"` | ⚠️ Link morto |

### Regras

1. Cinco documentos fixos: Programação CIOSP 2026, Certificado de Participação,
   Manual do Expositor, Mídia Kit do Podcast, Regulamento.
2. **Os tamanhos exibidos (2.4 MB, 890 KB…) são texto inventado — não há
   arquivo.**
3. Sem categoria, busca ou ordenação.
4. **A tabela `documentos` existe e nunca é consultada.**

### Fluxo

```
Início → Documentos → toca em Download → nada acontece
```

**A tela inteira é uma vitrine falsa.** É a candidata número um a reprovação na
App Store (botão que não faz nada).

### Dados necessários

Tabela `documentos` (existe): `titulo`, `descricao`, `categoria`, `arquivo_url`
(NOT NULL), `tamanho_bytes`, `tipo_arquivo`.

O banco guarda `tamanho_bytes` (número) — a tela precisa formatar. Hoje o texto é
digitado à mão.

### Dependências

- `documentos` + Supabase Storage (os arquivos precisam existir).
- `expo-file-system` para baixar; visualizador de PDF ou app externo.

### Melhorias sugeridas

- **Só publicar a tela quando houver arquivo real.** Documento fantasma é pior
  que seção ausente.
- **Formatar `tamanho_bytes` no cliente**, com utilitário — o valor vem do banco.
- **Download com progresso, cancelamento e tratamento de falha.** Em 4G, um PDF
  de 5 MB sem feedback é abandono garantido.
- **Abrir no app** (visualizador) em vez de só baixar; no iOS, arquivo baixado
  sem visualizador some da vista do usuário.
- Agrupar por `categoria` (a coluna existe).
- Cache local com data de sincronização, permitindo consulta offline no evento —
  onde a rede costuma cair.
- Ícone por `tipo_arquivo` em vez de um ícone genérico.
- "Ver mais documentos" ganha destino ou sai.

---

## 7. Clube de Benefícios

**Rota:** `/clube-beneficios` (mobile: `/beneficios`) · **Origem:** `src/pages/ClubeBeneficios.tsx` · ✅

### Objetivo

Apresentar vantagens para associados e converter visitantes em membros.

### Usuário

Visitante (alvo do CTA de adesão) e associado (consulta).

### Campos

Nenhum.

### Botões

| Elemento | Ação | Situação |
| --- | --- | --- |
| Cartão de benefício | **Nada** | ⚠️ Não clicável |
| Quero ser Associado | Abre `abrahof.org.br/adesao/` | ✅ |

### Regras

1. Dez benefícios fixos, com título, descrição, categoria e desconto.
2. Estatísticas fixas: "50+ parceiros", "40% desconto máx.", "∞ uso ilimitado".
   **Só 10 benefícios são listados, e o texto afirma 50+.**
3. Descontos como texto livre ("Até 30% OFF", "20% OFF") — não comparáveis.
4. **Não há como resgatar o benefício.** Nenhum código, link ou instrução.
5. **A tabela `clube_beneficios` existe e nunca é consultada** — inclusive com as
   colunas `codigo_promocional` e `link`, que resolveriam o item anterior.
6. Nenhuma distinção entre associado e visitante: quem não é membro vê tudo.

### Fluxo

```
Início → Clube → lê os benefícios → "Quero ser Associado" → navegador → fim
```

O associado que já pagou **não tem o que fazer nesta tela** — não há resgate.

### Dados necessários

Tabela `clube_beneficios` (existe): `parceiro`, `descricao`, `desconto`,
`codigo_promocional`, `logo_url`, `link`, `categoria`, `ativo`.

Nota: o banco chama de `parceiro` o que a tela chama de título. Os benefícios da
tela são **categorias** ("Congressos e Eventos"), não parceiros nomeados — o
modelo pressupõe parceiro individual. **A tela e a tabela discordam sobre o que é
um benefício.** Resolver antes de migrar.

### Dependências

- `clube_beneficios`.
- Site de adesão (externo).
- **Decisão de pagamentos** `ARQUITETURA.md` §15.

### Melhorias sugeridas

- **Resolver o conflito modelo × tela** (categoria vs. parceiro nomeado).
- **Exibir `codigo_promocional` e `link`** — sem isso o benefício é um anúncio,
  não um benefício.
- **Código só para associado autenticado**, se a decisão §17.1 for por conteúdo
  exclusivo. É o caso de uso mais concreto que encontrei para o login.
- **Atenção à regra das lojas:** se a adesão destravar conteúdo no app, o CTA
  "Quero ser Associado" apontando para pagamento externo é justamente o padrão
  que gera rejeição (`ARQUITETURA.md` §15, caminho C).
- **Corrigir ou calcular as estatísticas** — "50+" com 10 itens à vista.
- Filtro por categoria (a coluna existe).
- Estruturar desconto (`valor` + `unidade`) em vez de texto livre.
- Copiar código para a área de transferência com confirmação visual.

---

## 8. Galeria

**Rota:** `/galeria` · **Origem:** `src/pages/Galeria.tsx` · ✅

### Objetivo

Mostrar registros de eventos.

### Usuário

Visitante.

### Campos

Nenhum.

### Botões

| Elemento | Ação | Situação |
| --- | --- | --- |
| Miniatura | Abre lightbox | ✅ |
| Fechar (X) / fundo | Fecha lightbox | ✅ |

### Regras

1. Seis imagens do **Unsplash**, com comentário `// Placeholder images - in
   production these would come from an API`.
2. **Nenhuma foto é da ABRAHOF.** São fotos genéricas de banco de imagens.
3. Grade fixa de 2 colunas, proporção 4:3.
4. Ampliação por substituição de string na URL (`w=400&h=300` → `w=800&h=600`) —
   truque específico do Unsplash que **quebra assim que a fonte mudar**.
5. **A tabela `galeria` existe e nunca é consultada.**

### Fluxo

```
Início → Galeria → toca na foto → lightbox → fecha
```

### Dados necessários

Tabela `galeria` (existe): `titulo`, `descricao`, `imagem_url`, `album`,
`data_foto`, `ordem`.

### Dependências

- `galeria` + Supabase Storage.
- `expo-image` (já instalado) para cache e placeholder.

### Melhorias sugeridas

- **Substituir as fotos do Unsplash por conteúdo real.** Foto de estoque numa
  galeria institucional é pior que galeria vazia.
- **Remover o truque de redimensionar pela URL.** Guardar miniatura e imagem
  cheia separadamente, ou usar transformação do Supabase Storage.
- **Álbuns** — a coluna `album` existe e a tela ignora.
- Zoom por gesto (pinch) e navegação lateral entre fotos no lightbox: é o mínimo
  esperado em mobile, e o lightbox da web não faz nenhum dos dois.
- `expo-image` com cache e placeholder progressivo.
- Paginação — carregar a galeria inteira de uma vez não escala.
- Legenda com `titulo` e `data_foto` no lightbox.
- `accessibilityLabel` a partir de `descricao`.

---

## 9. Fale Conosco

**Rota:** `/contato` · **Origem:** `src/pages/Contato.tsx` · ⚠️ **Não envia**

### Objetivo

Declarado: canal de contato. Real: exibe dados fixos — **o formulário não envia**.

### Usuário

Visitante.

### Campos

| Campo | Tipo | Obrigatório | Validação |
| --- | --- | --- | --- |
| Seu nome | texto | Não declarado | **Nenhuma** |
| Seu e-mail | `email` | Não declarado | **Nenhuma** |
| Sua mensagem | textarea (4 linhas) | Não declarado | **Nenhuma** |

Os campos **não têm estado** (`useState`) — são inputs não controlados, sem
destino.

### Botões

| Elemento | Ação | Situação |
| --- | --- | --- |
| Enviar Mensagem | **Nada** | ⚠️ `<form>` sem `onSubmit` |
| Instagram, Facebook, LinkedIn, YouTube | **Nada** | ⚠️ Quatro botões sem `onClick` |

### Regras

1. Dados de contato fixos: `contato@abrahof.com.br`, `+55 11 99999-9999`,
   "São Paulo, SP - Brasil".
2. **O telefone é claramente um placeholder** (`99999-9999`).
3. Nenhum dado de contato é clicável — não abre e-mail, discador ou mapa.
4. **A tabela `contatos` existe, aceita `INSERT` de qualquer um, e nunca recebe
   nada.**
5. Redes sociais: ícones sem URL.

### Fluxo

```
Início → Contato → preenche → "Enviar" → nada acontece
                 → toca no e-mail → nada
                 → toca em rede social → nada
```

**Nenhuma ação da tela funciona.** O usuário preenche e acredita ter enviado.

### Dados necessários

Tabela `contatos` (existe): `nome` (NOT NULL), `email` (NOT NULL), `telefone`,
`assunto`, `mensagem` (NOT NULL), `lido`.

A tela não coleta `telefone` nem `assunto`, que o banco prevê.

### Dependências

- `contatos` + política de `INSERT` (já existe).
- `Linking` para e-mail, telefone, mapa e redes.
- Proteção anti-spam (`ARQUITETURA.md` §11).

### Melhorias sugeridas

- **Enviar de verdade**, com validação, estado de carregamento, confirmação e
  tratamento de erro. Formulário que finge enviar é pior que formulário ausente:
  o usuário espera resposta que nunca vem.
- **Rate limit** antes de publicar. `INSERT WITH CHECK (true)` sem limite é
  convite a spam — e a tabela não tem política de `SELECT`, então a limpeza é
  manual no painel.
- **Dados de contato reais e clicáveis** (`mailto:`, `tel:`, mapa). O telefone
  `99999-9999` não pode ir para produção.
- **URLs das redes sociais** ou remover os ícones.
- Acrescentar `assunto` (o banco já espera) e `telefone` opcional.
- `KeyboardAvoidingView` + `keyboardType` apropriado por campo.
- Preencher o e-mail automaticamente quando houver sessão.
- Considerar WhatsApp como canal principal — já é item do menu e é o canal
  preferido do público brasileiro.

---

## 10. Patrocinadores

**Rota:** `/patrocinadores` · **Origem:** `src/pages/Patrocinadores.tsx` · ✅

### Objetivo

Reconhecer empresas apoiadoras e captar novos patrocínios.

### Usuário

Visitante; empresas como alvo do CTA.

### Campos

Nenhum.

### Botões

| Elemento | Ação | Situação |
| --- | --- | --- |
| Cartão de patrocinador | **Nada** | ⚠️ Não clicável |
| Entre em contato | **Nada** | ⚠️ Sem `onClick` |

### Regras

1. Dez empresas fixas: MedStation, HEIOBEN, FACOP, APM EVENTS, Reobote, OYSTER
   DENTAL, ABRAHOF, IHOFG, MACLIFE, CIOSP.
2. **Todos os cartões exibem o logo da ABRAHOF** com opacidade reduzida — nenhum
   logo real existe no repositório.
3. Sem categoria ou nível de patrocínio (ouro/prata), sem link para o site do
   patrocinador.
4. **A tabela `patrocinadores` existe e nunca é consultada** — com `logo_url`,
   `site_url`, `categoria` e `ordem`.
5. A própria ABRAHOF aparece como patrocinadora de si mesma.

### Fluxo

```
Início → Patrocinadores → lê a lista → "Entre em contato" → nada
```

### Dados necessários

Tabela `patrocinadores` (existe): `nome`, `descricao`, `logo_url`, `site_url`,
`categoria`, `ordem`, `ativo`.

### Dependências

- `patrocinadores` + Storage para os logos.
- Logos reais — **dependência externa, não técnica** (obtenção junto às
  empresas).

### Melhorias sugeridas

- **Obter os logos reais.** É a tela mais sensível do app: exibir a marca errada
  para quem paga patrocínio é problema comercial, não bug. Enquanto não houver
  logo, mostrar o nome em tipografia limpa — mais honesto que o logo errado.
- **Níveis de patrocínio** via `categoria`, com destaque proporcional. É o que
  patrocinador master espera pelo investimento.
- **Cartão clicável** abrindo `site_url` — retorno concreto para o patrocinador.
- "Entre em contato" precisa de destino (formulário, e-mail ou WhatsApp).
- Ordenar por `ordem` (a coluna existe) em vez de posição no array.
- Registrar cliques por patrocinador — métrica que sustenta renovação de
  contrato. Exige aviso de privacidade e declaração nas lojas.

---

## 11. NotFound

**Rota:** `*` · **Origem:** `src/pages/NotFound.tsx` · ✅

### Objetivo

Capturar rotas inexistentes.

### Usuário

Qualquer um — **e não é um caminho raro**: 5 itens do menu principal caem aqui.

### Campos / Botões

| Elemento | Ação | Situação |
| --- | --- | --- |
| Return to Home | Volta para `/` | ✅ |

### Regras

1. Exibe "404" e "Oops! Page not found".
2. **Único texto em inglês do aplicativo.**
3. Registra a rota no console.
4. **Não usa o `MobileLayout`** — sem header e sem navegação inferior; o visual
   destoa do resto.

### Fluxo

```
Rota inexistente → 404 → "Return to Home"
```

### Dados necessários

Nenhum.

### Dependências

Nenhuma. No mobile, o Expo Router usa `+not-found.tsx`.

### Melhorias sugeridas

- **Traduzir para português** — o resto do app é todo em português.
- **Manter a casca visual** do app.
- **Corrigir a causa, não o sintoma:** 5 dos 15 atalhos levarem ao 404 é o
  problema; a tela de 404 é só onde ele aparece.
- No mobile, rota inexistente vinda de deep link ou notificação deve cair aqui de
  forma elegante, não travar.

---

## 12. Componentes transversais

Presentes em todas as telas via `MobileLayout`.

### 12.1 Cabeçalho (`MobileHeader`)

| Elemento | Ação | Situação |
| --- | --- | --- |
| Menu (hambúrguer) | `onMenuClick` opcional, **nunca fornecido** | ⚠️ Botão morto em todas as telas |
| Logo ABRAHOF | Decorativo | ✅ |
| Sino de notificações | **Badge "2" fixo no código** | ⚠️ Sem tela, sem lógica |

**Regras:** fixo no topo, com fundo translúcido. **Nenhum dos dois botões faz
qualquer coisa, em nenhuma tela.**

**Melhorias:**
- **Remover o hambúrguer** ou dar-lhe um menu. Um botão morto no topo de todas as
  telas é o defeito mais visível do app.
- **Remover o badge fixo.** Um "2" permanente que nunca zera treina o usuário a
  ignorar o sino — e depois, quando houver notificação real, ele já não olha.
- Logo leva ao início (esperado).
- Safe Area no topo (a web não trata; no iPhone com notch, quebra).

### 12.2 Navegação inferior (`BottomNav`)

| Elemento | Ação | Situação |
| --- | --- | --- |
| Voltar | `navigate(-1)`; desabilitado na home | ✅ |
| Início | Vai para `/`; destacado quando ativo | ✅ |
| Perfil | Vai para `/login` | ✅ |

**Regras:** barra fixa com três ações. Na home, "voltar" fica com opacidade
reduzida e desabilitado.

**Melhorias:**
- **Não replicar o botão "voltar".** No mobile, Android tem botão/gesto de
  sistema e iOS tem gesto de borda — a Stack do Expo Router já entrega os dois.
  Um "voltar" desenhado é redundância que ocupa um terço da barra.
- **Safe Area inferior** — sem isso a barra colide com o indicador de home do
  iPhone.
- Reavaliar a barra inteira: com header e Stack nativos, sobra pouca função para
  ela. Se ficar, que leve a destinos reais, não a "voltar".
- Ícone de perfil deve refletir o estado de sessão quando houver login.

---

## 13. Telas previstas e ausentes

Funcionalidades que **existem no menu ou no banco**, mas nunca tiveram tela. Não
são ideias novas: são promessas não cumpridas da referência.

### 13.1 Telemedicina ❌ · 13.2 Teleodontologia ❌ · 13.3 Advogados Parceiros ❌

**Objetivo:** listar profissionais parceiros e permitir agendamento/contato.

**Usuário:** presumivelmente associado — mas nada no banco indica restrição
(`SELECT USING (true)`).

**Situação:** item no menu → **404**. Tabela criada, tela nunca escrita.

**Dados:** as três tabelas têm forma quase idêntica —
`profissional`/`nome`, `especialidade`, `descricao`, `telefone`, `email`,
`link_agendamento`, `foto_url`, `ativo`. `advogados_parceiros` acrescenta `oab`.

**Fluxo previsto:** lista → detalhe → agendar (link externo) ou contato
(telefone/e-mail).

**Melhorias sugeridas:**
- **Um só componente para as três telas** — a forma dos dados é a mesma
  (`ARQUITETURA.md` §7, serviço `profissionais.ts`). Três telas copiadas seria
  triplicar manutenção.
- Ligar/enviar e-mail direto por `Linking`.
- **Cuidado com o escopo:** "Telemedicina" sugere consulta no app. As tabelas só
  guardam contato e link de agendamento — é um **diretório de profissionais**, e
  o nome promete mais que isso. App que sugere ato médico atrai exigência
  regulatória (CFM/CFO) e escrutínio das lojas. Alinhar o nome ao que é.
- Busca por especialidade quando a lista crescer.

### 13.4 Revista AOS ⚠️

**Objetivo:** acesso à publicação científica da associação.

**Situação:** o menu abre um site externo (`ahof.emnuvens.com.br`, com UTM). A
tabela `revista_aos` (`titulo`, `resumo`, `autor`, `edicao`, `data_publicacao`,
`pdf_url`, `capa_url`) **nunca foi usada** — o modelo prevê um leitor no app que
não existe.

**Decisão pendente:** `ARQUITETURA.md` §17.3. Manter o link externo é legítimo e
custa zero; a tabela sugere que a intenção era outra.

**Melhorias:** se for leitor no app, precisa de lista por edição, busca por autor
e leitura offline — caso contrário, o site externo entrega mais. Remover os
parâmetros UTM do link do app (foram feitos para o Instagram, não para cá).

### 13.5 Cadastro ❌ e 13.6 Recuperação de senha ❌

**Situação:** botões existem no Login; rotas não. Cadastrar → 404; "Esqueci minha
senha" → sem ação.

**Campos previstos (cadastro):** nome, e-mail, senha, confirmação; CRO/CRM e dados
de associação a definir.

**Dependência:** decisão §17.1 e tabela de perfis (inexistente).

**Melhorias:** só construir depois de definido o que o cadastro habilita. Se for
para conteúdo exclusivo, o cadastro precisa se relacionar com a base de associados
— e essa integração não está mapeada em lugar nenhum.

### 13.7 WhatsApp ❌

**Situação:** item do menu aponta para `/whatsapp` (rota interna) → **404**.

**Correção:** não é tela. É `Linking.openURL('https://wa.me/<numero>')`, com
fallback caso o WhatsApp não esteja instalado. Depende de definir o número
oficial — o telefone da tela de Contato é placeholder.

### 13.8 Notificações 🆕

**Situação:** existe apenas o sino com badge "2" fixo. Sem tela, sem backend.

**Decisão pendente:** `ARQUITETURA.md` §17.5 — o que a lista mostraria?

**Melhorias:** só faz sentido junto de push (`ARQUITETURA.md` §14), que exige
development build e contas de loja. Até lá, remover o badge.

---

## Resumo dos achados

### Por situação

| Situação | Qtd. |
| --- | --- |
| Telas que funcionam como anunciado | 5 |
| Telas com defeito relevante | 5 |
| Telas prometidas e inexistentes | 6 |
| Elementos de interface sem ação | ~25 |

### Os cinco pontos que mais importam

1. **Erro tratado como vazio** (Academy, Eventos). Falha de rede exibe "conteúdo
   em breve". O app mente para o usuário — e ninguém percebe que está quebrado.
2. **Formulários que fingem funcionar** (Login, Contato). O usuário preenche,
   toca em enviar e acredita ter enviado. É o defeito com maior custo de
   confiança.
3. **Seis tabelas prontas alimentando telas estáticas.** Documentos, Galeria,
   Benefícios, Patrocinadores, Transmissão e Contato têm modelo pronto no banco e
   dados fixos no código. **É o maior ganho disponível com menor esforço.**
4. **Conteúdo placeholder em produção**: fotos do Unsplash, telefone
   `99999-9999`, logo da ABRAHOF no lugar dos patrocinadores, tamanhos de arquivo
   inventados.
5. **Três divergências entre modelo e tela** que precisam ser resolvidas **antes**
   da migração, não depois:
   - `eventos_parceiros.descricao` usado como tipo → filtros nunca funcionaram;
   - `clube_beneficios.parceiro` (parceiro nomeado) vs. tela (categoria);
   - `transmissoes` não tem idioma nem palestrante, ambos exibidos na tela.

### Impacto nas decisões pendentes

O levantamento aponta para o **Clube de Benefícios** como o caso de uso mais
concreto para a Área Restrita: `codigo_promocional` é o único dado no banco que
faz sentido restringir a associados. Isso não decide a pergunta §17.1 — mas é a
melhor evidência disponível de que ela tem uma resposta útil.
