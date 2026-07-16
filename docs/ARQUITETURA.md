# Arquitetura do Aplicativo Mobile

Documento de arquitetura da reconstrução mobile do **Abrahof Connections**.

Descreve as decisões estruturais do projeto e a estratégia para os assuntos que
ainda **não serão implementados nesta etapa** (Supabase, autenticação, uploads,
notificações, pagamentos). O objetivo é que a fundação criada hoje comporte essas
funcionalidades depois, sem reescrita.

> **Data:** 16/07/2026
> **Base:** Expo SDK 54, Expo Router 6, React Native 0.81, React 19
> **Referência funcional:** [`ANALISE_PROJETO_REFERENCIA.md`](./ANALISE_PROJETO_REFERENCIA.md)

---

## 1. Princípios

Cinco regras orientam todas as decisões deste documento:

1. **Nada de camada especulativa.** Estrutura só nasce quando existe código para
   ocupá-la. Pastas vazias "para o futuro" são custo sem retorno.
2. **A UI não conhece o backend.** Nenhuma tela importa o cliente Supabase
   diretamente. Isso é o que permite trocar dados mockados por dados reais sem
   tocar em nenhuma tela.
3. **Dependência precisa de justificativa.** Cada biblioteca adicionada responde
   por escrito: o que resolve e por que não dá para fazer sem ela.
4. **Português no domínio, inglês na plataforma.** Nomes de negócio em português
   (`Evento`, `buscarCursos`); APIs da plataforma mantêm o nome original
   (`useEffect`, `FlatList`, `onPress`).
5. **Android e iOS em paridade.** Nenhuma funcionalidade depende de uma
   plataforma só; diferenças ficam isoladas em `Platform.select`.

---

## 2. Arquitetura escolhida

**Camadas com organização por funcionalidade.**

O fluxo de dados é unidirecional e atravessa quatro camadas:

```
Rota (app/)              → declara a tela e o título; sem lógica
  ↓
Tela (funcionalidades/)  → compõe a UI e consome hooks
  ↓
Hook de dados            → estado, carregamento, erro
  ↓
Serviço                  → única camada que fala com o mundo externo
  ↓
Supabase / HTTP / mock
```

A regra que sustenta tudo: **as dependências só apontam para baixo**. Um serviço
nunca importa um componente; um componente nunca importa o cliente Supabase.

### Por que esta arquitetura

O projeto de referência colocou consulta de banco, regra de negócio e JSX no
mesmo arquivo (`Academy.tsx` faz duas queries, agrupa dados no cliente e
renderiza tudo). Funciona em uma tela, mas torna impossível trocar a fonte de
dados ou testar a regra isoladamente.

Aqui a fronteira serviço/UI existe exatamente para permitir a estratégia de
transição da etapa atual: **hoje o serviço devolve mock, amanhã devolve
Supabase, e nenhuma tela muda**. Sem essa fronteira, ligar o Supabase depois
significaria reescrever as 10 telas.

### O que foi descartado

| Alternativa | Motivo |
| --- | --- |
| **Clean Architecture / DDD completo** (entidades, casos de uso, repositórios) | Excesso de indireção para um app majoritariamente de leitura. As "regras de negócio" da análise são filtros e ordenações |
| **Atomic Design** (atoms/molecules/organisms) | A fronteira entre "molécula" e "organismo" gera discussão sem ganho. `base/` vs. `layout/` vs. funcionalidade é objetivo |
| **Monorepo com pacotes** | Um único app, um único time. Complexidade sem benefício |
| **Tudo em `app/`** | O Expo Router trata cada arquivo em `app/` como rota. Componentes ali viram rotas indesejadas |

---

## 3. Stack tecnológica

### Já instalado e em uso

| Item | Versão | Papel |
| --- | --- | --- |
| Expo | ~54.0.35 | Plataforma, build, distribuição |
| React Native | 0.81.5 | Runtime, Nova Arquitetura ativa |
| React | 19.1.0 | Biblioteca de UI |
| TypeScript | ~5.9.2 | Tipos, modo `strict` |
| Expo Router | ~6.0.24 | Navegação baseada em arquivos |
| react-native-safe-area-context | ~5.6.0 | Safe Area |
| react-native-screens / gesture-handler / reanimated | — | Dependências do Router |
| @expo/vector-icons | ^15.0.3 | Ícones (Ionicons) |
| eslint-config-expo | ~10.0.0 | Lint |

### Instalado pelo template, hoje sem uso

`expo-image`, `expo-haptics`, `expo-symbols`, `expo-web-browser`,
`@react-navigation/bottom-tabs`. Não foram removidas porque a maioria retorna nas
próximas fases (`expo-image` na Galeria, `expo-web-browser` nos links externos).
**Se em duas fases continuarem sem uso, devem ser desinstaladas.**

### Previstas, com justificativa

Nenhuma será instalada agora. Cada uma entra na fase que a exige:

| Biblioteca | Fase | Justificativa | Alternativa descartada |
| --- | --- | --- | --- |
| `@supabase/supabase-js` | Dados | Cliente oficial; sem ele seria REST na mão sobre PostgREST | Fetch direto — perderia tipos e auth |
| `@react-native-async-storage/async-storage` | Dados | Persistir sessão do Supabase | Ver §11 sobre SecureStore |
| `@tanstack/react-query` | Dados | Cache, revalidação, estados de carregamento/erro. Já é o padrão da referência | `useEffect` + `useState` — reimplementaria cache e race conditions |
| `expo-font` | Visual | Empacotar Poppins localmente | Fonte do sistema — perderia identidade visual |
| `expo-image-picker` | Uploads | Único acesso a câmera/galeria | — |
| `expo-notifications` | Notificações | Push local e remoto | — |
| `expo-linking` | Links | Abrir WhatsApp, site, YouTube | — |
| `react-native-purchases` (RevenueCat) | Pagamentos | Só se a decisão de §15 for vender no app | Ver §15 |

**Regra:** nenhuma biblioteca de UI genérica (Paper, NativeBase, Tamagui). Os
componentes são próprios — é o que a análise recomendou ao constatar que a
referência usava 4 de ~50 componentes shadcn instalados.

---

## 4. Estrutura de pastas

### Hoje

```
app/                    10 rotas + _layout
components/             tela-base, cartao-secao, botao, campo-texto
constants/              tema.ts, secoes.ts
assets/images/          ícones e splash
docs/                   esta documentação
```

### Alvo

```
app/                          Rotas. Só declaração — sem lógica
  _layout.tsx
  index.tsx
  (autenticado)/              Grupo protegido (fase de auth)
  +not-found.tsx

funcionalidades/              Uma pasta por seção do app
  academy/
    telas/
    componentes/              Componentes exclusivos da seção
    hooks/
    tipos.ts
  eventos/
  ...

components/                   UI compartilhada por 2+ funcionalidades
  base/                       botao, campo-texto, cartao, selo, avatar
  layout/                     tela-base, cabecalho, barra-inferior
  feedback/                   carregando, vazio, erro

servicos/
  supabase/                   cliente + tipos gerados
  academy.ts                  buscarCursos, buscarAulas
  eventos.ts
  ...

hooks/                        Hooks globais (sessão, tema, conectividade)
constants/                    tema.ts, config.ts, secoes.ts
tipos/                        Tipos de domínio compartilhados
utilitarios/                  Formatação de data, texto, número
mocks/                        Dados mockados (removida ao fim da transição)
assets/
docs/
```

### Regras da estrutura

- **`app/` contém apenas rotas.** Cada arquivo é uma rota; um componente ali
  vira uma rota fantasma. A rota importa a tela de `funcionalidades/` e não faz
  mais nada.
- **Promoção, não antecipação.** Um componente nasce dentro de
  `funcionalidades/<x>/componentes/`. Só sobe para `components/` quando a
  **segunda** funcionalidade precisar dele. Copiar uma vez é mais barato que
  abstrair cedo.
- **`mocks/` tem prazo de validade.** Existe para a etapa atual e some quando os
  serviços apontarem para o Supabase.
- **Alias `@/`** já configurado no `tsconfig.json`; imports relativos com `../..`
  são proibidos entre pastas de topo.

### Sobre a migração

A estrutura de hoje é o subconjunto mínimo do alvo. As telas atuais vivem em
`app/` porque são triviais (título e nada mais). **A migração acontece por
necessidade, não por cronograma**: a primeira tela que ganhar conteúdo real muda
para `funcionalidades/<x>/telas/`, e sua rota vira uma linha de importação.

---

## 5. Organização das telas

### Mapa completo

Consolidando o que existe na referência e o que ela previa mas não entregou:

| Rota | Situação hoje | Origem |
| --- | --- | --- |
| `/` | Menu criado | Web `Index` |
| `/login` | Visual, sem auth | Web `Login` |
| `/transmissao` | Vazia | Web `Transmissao` |
| `/academy` | Vazia | Web `Academy` |
| `/eventos` | Vazia | Web `EventosParceiros` |
| `/documentos` | Vazia | Web `Documentos` |
| `/beneficios` | Vazia | Web `ClubeBeneficios` |
| `/galeria` | Vazia | Web `Galeria` |
| `/contato` | Vazia | Web `Contato` |
| `/patrocinadores` | Vazia | Web `Patrocinadores` |
| `/telemedicina` | **A criar** | Tabela no banco, tela nunca existiu |
| `/teleodontologia` | **A criar** | Idem |
| `/advogados-parceiros` | **A criar** | Idem |
| `/revista-aos` | **A decidir** | Hoje é link externo; tabela sugere leitor no app |
| `/cadastro` | **A criar** | Botão existe na web, rota não |
| `/recuperar-senha` | **A criar** | Botão sem ação na web |
| `/notificacoes` | **A decidir** | Só existe o sino com "2" fixo |

### Anatomia de uma tela

Toda tela segue o mesmo contrato:

1. Recebe dados de um hook (`useCursos()`), nunca de um serviço direto.
2. Trata **três estados obrigatórios**: carregando, vazio e erro. A referência
   trata carregando e vazio, mas **ignora erro** — se a query do Supabase falha,
   a tela mostra "Nenhum evento disponível", que é mentira. Não repetir.
3. Não conhece navegação além de `router.push`.
4. Delega a casca visual ao `TelaBase`.

### Convenções

- Um arquivo por tela, nome em português: `TelaAcademy`, `TelaLogin`.
- Sem lógica de formatação embutida — vai para `utilitarios/`.
- Listas longas usam `FlatList`, nunca `.map()` dentro de `ScrollView` (a
  referência usa `.map()` em tudo; aceitável na web, custoso no mobile).

---

## 6. Organização dos componentes

### Três níveis

| Nível | Onde | Critério | Exemplos |
| --- | --- | --- | --- |
| **Base** | `components/base/` | Sem conhecimento de domínio | `Botao`, `CampoTexto`, `Cartao`, `Selo` |
| **Layout** | `components/layout/` | Estrutura de tela | `TelaBase`, `Cabecalho`, `BarraInferior` |
| **Funcionalidade** | `funcionalidades/<x>/componentes/` | Conhece o domínio | `CartaoCurso`, `CartaoEvento` |

### O cartão genérico

A análise identificou seis cartões na referência (`PodcastCard`, `CourseCard`,
`BenefitCard`, `DocumentCard`, `EventCard`, `SponsorCard`) com a mesma anatomia:
**bloco visual à esquerda, texto no meio, ação à direita**.

No mobile isso é **um** componente `Cartao` em `components/base/`, com slots
(`inicio`, `titulo`, `descricao`, `fim`). Os cartões de domínio são configurações
finas dele — `CartaoCurso` decide *o que* mostrar, `Cartao` decide *como*.

Ganho concreto: um ajuste de espaçamento ou de sombra acontece em um arquivo, não
em seis. Se algum caso divergir demais dos slots, ele não força o componente —
vira um componente próprio.

### Contrato

- **Sem estado de servidor.** Componente recebe `props` e emite eventos. Quem
  busca dados é a tela.
- **Sem cores literais.** Todo valor visual vem de `constants/tema.ts`. Um
  `#0B3A67` solto no meio de um componente é bug de revisão.
- **Acessibilidade obrigatória:** `accessibilityRole` e `accessibilityLabel` em
  tudo que é tocável; alvo mínimo de 44×44 pt.
- **Animação com parcimônia.** A referência anima cada item com atraso escalonado
  (`index * 50ms`). Reproduzir isso item a item em lista virtualizada custa caro e
  atrapalha a rolagem. Animar transições de tela e feedback de toque; o resto,
  não.

---

## 7. Organização dos serviços

Um arquivo por domínio em `servicos/`, espelhando as tabelas: `academy.ts`,
`eventos.ts`, `documentos.ts`, `beneficios.ts`, `galeria.ts`,
`patrocinadores.ts`, `contato.ts`, `transmissao.ts`, `profissionais.ts`
(atende telemedicina, teleodontologia e advogados — as três tabelas têm a mesma
forma: profissional, especialidade, contato, link de agendamento).

### Responsabilidades

O serviço **faz**: monta a consulta, aplica os filtros de negócio
(`ativo = true`, ordenação), traduz o formato do banco para o tipo de domínio,
normaliza o erro.

O serviço **não faz**: formatar data para exibição, decidir cor de selo, guardar
estado, chamar hooks.

### Contrato

- Funções assíncronas puras: entram parâmetros, sai dado de domínio.
- **Sempre devolvem tipo de domínio, nunca a linha crua do banco.** É aqui que
  se corrige a herança da referência em que `eventos_parceiros.descricao` era
  usado como *tipo* do evento (Congresso, Workshop). O serviço traduz; a tela
  recebe um campo `tipo` honesto.
- Erro vira um erro tipado do app, com mensagem em português. A tela nunca vê
  `PostgrestError`.
- Sem `console.log` de dados.

### A transição mock → Supabase

É a decisão mais importante do documento e o que torna a etapa atual descartável
sem prejuízo:

```
Fase atual   →  servicos/eventos.ts lê de mocks/eventos.ts
Fase Dados   →  servicos/eventos.ts consulta o Supabase
```

**A assinatura da função não muda. O tipo de retorno não muda. Nenhuma tela
muda.** Por isso os mocks vivem em `mocks/` e não dentro das telas — a referência
colocou os arrays dentro dos componentes, e é exatamente por isso que Documentos,
Galeria, Benefícios e Patrocinadores continuam estáticas lá, mesmo com tabela
pronta no banco. O caminho de menor esforço tem que ser o caminho certo.

---

## 8. Organização dos hooks

### Dois níveis

**Globais** (`hooks/`) — atravessam funcionalidades:

| Hook | Papel | Fase |
| --- | --- | --- |
| `useSessao` | Usuário atual e estado de autenticação | Auth |
| `useTema` | Acesso aos tokens visuais | Visual |
| `useConectividade` | Online/offline | Dados |

**De funcionalidade** (`funcionalidades/<x>/hooks/`) — um por caso de uso:
`useCursos`, `useEventos`, `useDocumentos`.

### Contrato

- Nome sempre `use…`, em português quando o domínio for português.
- **O hook é a fronteira entre a tela e o serviço.** Ele chama o serviço e devolve
  `{ dados, carregando, erro }` — nada além disso.
- Um hook por caso de uso, não por tabela. Se a tela Academy precisa de cursos com
  suas aulas, existe `useCursosComAulas` — a composição fica no hook, não na tela.
  (Na referência, esse agrupamento está dentro do componente, misturado ao JSX.)
- Hook não renderiza e não navega.

---

## 9. Gerenciamento de estado

**Não haverá Redux, Zustand, Jotai ou MobX.** O app é majoritariamente leitura;
estado global de cliente é quase inexistente. A justificativa está na natureza
das telas: listas vindas do servidor e formulários locais.

Quatro categorias, cada uma com sua ferramenta:

| Categoria | Ferramenta | Exemplo |
| --- | --- | --- |
| **Estado de servidor** | TanStack Query | Cursos, eventos, documentos |
| **Estado de UI local** | `useState` | Senha visível, filtro selecionado, lightbox |
| **Estado global de cliente** | Context enxuto | Sessão do usuário |
| **Estado de navegação** | Expo Router | Rota e parâmetros |

### Por quê

A maior parte do que parece "estado global" é **cache de servidor** — e cache é
o que o React Query faz bem: deduplicação, revalidação, invalidação, retry,
carregamento e erro sem escrever nada disso à mão. Colocar isso num store global
significa reimplementar cache com mais código e mais bugs.

O que sobra de estado verdadeiramente global é a sessão: um objeto pequeno, que
muda raramente e é lido por poucas telas. Um Context resolve; um store seria
peso morto.

**Gatilho para revisão:** se aparecer estado global de cliente que muda com
frequência e é lido por muitas telas (um carrinho, um rascunho longo, um player
persistente entre telas), a decisão se reavalia — provavelmente com Zustand, pelo
custo de adoção baixo. Até lá, não.

### Regras

- Parâmetro de tela viaja pela rota, não por Context.
- Sem cache manual: nada de `useState` + `useEffect` guardando resposta de API.
- Chaves de query padronizadas por domínio (`['eventos']`, `['cursos', id]`).

---

## 10. Navegação

### Modelo

Stack única com `app/index.tsx` como hub — a mesma ideia da referência (grade de
atalhos), que é adequada ao formato: **15 destinos não cabem numa tab bar**
(o confortável são 5).

O header nativo da Stack cuida de título e botão voltar, o que resolve de graça a
Safe Area superior e o gesto de voltar do iOS.

### Divergência a resolver

| Referência | Mobile atual |
| --- | --- |
| `/clube-beneficios` | `/beneficios` |
| `/eventos-parceiros` | `/eventos` |

**Decisão pendente** (§17). Custa pouco agora e cada vez mais depois — deep links
e notificações vão apontar para essas URLs.

### Estrutura prevista

```
app/
  _layout.tsx           Stack raiz + provedores
  index.tsx             Hub
  login.tsx
  cadastro.tsx
  (autenticado)/        Grupo protegido — só na fase de auth
    _layout.tsx         Guarda de rota
  +not-found.tsx
```

O grupo `(autenticado)/` **não existe hoje** e não deve ser criado antes de haver
o que proteger. Quando existir, a guarda fica no `_layout.tsx` do grupo: verifica
a sessão e redireciona para `/login`. É a diferença central em relação à
referência, onde "Área Restrita" apenas leva ao login sem proteger coisa alguma.

### Links externos

WhatsApp, site institucional, YouTube e Revista AOS **não são rotas** — são
`Linking.openURL` ou `expo-web-browser`. A referência trata `/whatsapp` como rota
interna e cai em 404. O menu deve distinguir os dois tipos por um campo
(`tipo: 'rota' | 'externo'`), evitando que o erro se repita.

### Deep linking

O `scheme: "abrahof"` já está no `app.json`. Deep links serão necessários quando
houver notificações (tocar em "novo evento" precisa abrir o evento certo). Como
o Expo Router deriva as rotas dos arquivos, isso já vem quase pronto — mais um
motivo para fixar os nomes de rota agora.

---

## 11. Estratégia para Supabase

> **Não será implementado nesta etapa.**

### Situação

O banco tem **12 tabelas com RLS**, das quais o app web consome **3**. As tabelas
não usadas (`documentos`, `galeria`, `clube_beneficios`, `patrocinadores`,
`transmissoes`, `contatos`, `revista_aos`, `telemedicina`, `teleodontologia`,
`advogados_parceiros`) já definem o formato final das telas — é um ativo, não
uma dívida. O modelo de dados está pronto; falta consumi-lo.

### Cliente

Arquivo único em `servicos/supabase/cliente.ts`, importado **apenas** por
serviços. Diferenças obrigatórias em relação à web:

- `detectSessionInUrl: false` — não há URL no app.
- `persistSession: true` com storage explícito — `localStorage` não existe no
  React Native.
- Refresh de token atrelado ao `AppState` (o app volta do background com token
  vencido; a web não tem esse problema).

### Persistência da sessão: AsyncStorage, não SecureStore

Contra a intuição, a recomendação é **AsyncStorage**.

O SecureStore criptografa, mas historicamente o iOS **recusa valores acima de
~2048 bytes**, e a sessão do Supabase (access token + refresh token + objeto do
usuário) passa disso com facilidade. Usar SecureStore exigiria fragmentar o valor
em pedaços — complexidade que costuma falhar silenciosamente e derrubar o login
em produção.

O access token é de curta duração e o armazenamento é isolado por aplicativo em
ambas as plataformas. Se a análise de risco exigir criptografia, a saída é
SecureStore **com fragmentação testada**, não uma troca ingênua.

### Credenciais

- A chave **anon/publishable** pode ir para o cliente — o RLS é a defesa real.
- Via `EXPO_PUBLIC_…` ou `app.config.ts` + EAS. **Nunca em arquivo versionado**:
  a referência tem um `.env` com URL e chave commitados, erro a não repetir.
- **`EXPO_PUBLIC_` é embutido no bundle e pode ser extraído do APK/IPA.** Ou
  seja: nunca a chave `service_role`, nunca segredo de gateway de pagamento. O
  que precisar de segredo roda em Edge Function.
- Tipos gerados pelo CLI do Supabase, versionados, nunca editados à mão.

### RLS

O RLS atual assume conteúdo **público** (`SELECT USING (true)` em 11 tabelas). Se
"Área Restrita" passar a significar conteúdo exclusivo para associados, o modelo
muda: é preciso tabela de perfis/associados e políticas por papel. **Isso é
mudança de banco, não de app** — e hoje não existe nenhuma tabela de usuários,
perfis ou papéis.

Ponto de atenção: `contatos` aceita `INSERT` de qualquer um e não tem política de
`SELECT`. Para o app, isso basta (envia, não lê). Sem rate limit, porém, o
formulário é um vetor de spam aberto — tratar na Edge Function ou via captcha.

### Ordem de migração

1. `eventos_parceiros` e `academy_*` — já validadas na web, menor risco.
2. `documentos`, `galeria`, `patrocinadores`, `clube_beneficios` — leitura
   simples; troca direta de mock por consulta.
3. `contatos` — primeira escrita do app; exige validação e proteção anti-spam.
4. `transmissoes`, `telemedicina`, `teleodontologia`, `advogados_parceiros`,
   `revista_aos` — telas novas.

---

## 12. Estratégia para autenticação

> **Não será implementado nesta etapa.**

### O problema de produto vem antes do técnico

A referência tem tela de login que não autentica (`// TODO: Implement actual
login`), um item "Área Restrita" que não restringe nada, e **nenhuma tabela de
usuários ou papéis**. Não existe, hoje, resposta para: *o que um associado vê que
um visitante não vê?*

Enquanto isso não for definido, implementar login entrega uma porta que não
tranca nada. **A definição do conteúdo exclusivo precede a implementação.**

### Abordagem prevista

- **Supabase Auth** com e-mail e senha (o que a UI da referência sugere).
- Sessão exposta por `hooks/useSessao` sobre um Context enxuto.
- Guarda em `app/(autenticado)/_layout.tsx`, e não espalhada por telas.
- Enquanto a sessão carrega, splash — nunca piscar o login para quem já entrou.
- Telas necessárias: login (existe), cadastro e recuperação de senha (nenhuma
  existe).
- Login social e biometria: só depois, se houver demanda.

### Impacto no banco

Requer o que hoje não existe: tabela de perfis ligada a `auth.users`, papel
(visitante/associado/admin), e revisão das políticas das tabelas que deixarem de
ser públicas. Vale registrar que **um app de conteúdo público não precisa de
login** — se a Área Restrita não tiver conteúdo próprio, a resposta certa pode
ser não ter login nenhum.

---

## 13. Estratégia para uploads

> **Não será implementado nesta etapa.**

### Necessidade real: baixa

Hoje o app é de leitura. Uploads só aparecem em cenários hipotéticos: foto de
perfil, envio de documento para chancela, anexo no contato. **Nenhum deles está
especificado.** Esta seção é preparação, não plano.

### Se acontecer

- **Supabase Storage**, um bucket por finalidade (`avatares`, `documentos`),
  com política por bucket — nunca um bucket genérico com acesso amplo.
- `expo-image-picker` para câmera/galeria, com permissões pedidas **no momento do
  uso** e justificativa no `app.json` (a App Store rejeita permissão sem
  descrição).
- Upload pela API `File` do `expo-file-system` (SDK 54), que implementa a
  interface `Blob` e vai direto no `fetch`/`FormData`. A API legada
  (`expo-file-system/legacy`) só se algo específico exigir.
- Validar **tipo e tamanho no cliente e no servidor**. Validação de cliente é
  cortesia com o usuário, não segurança.
- Compressão antes do envio: rede móvel torna imagem de câmera crua inviável.
- Progresso visível e cancelamento — upload sem feedback em 4G é abandono.
- Arquivo privado nunca vira URL pública; usa URL assinada com prazo.

---

## 14. Estratégia para notificações

> **Não será implementado nesta etapa.**

### Situação

A referência tem o sino com badge **"2" fixo no código**, sem tela, sem lógica e
sem backend. Não há nada a migrar — é construção do zero.

### Restrição técnica que muda o planejamento

Duas consequências diretas da SDK 54, que precisam ser conhecidas antes de
prometer prazo:

1. **Push remoto não funciona no Expo Go em Android desde a SDK 53.** Exige
   development build. Notificação local ainda roda no Expo Go.
2. **Push exige credenciais**: FCM no Android, APNs no iOS — e APNs depende de
   conta paga no Apple Developer Program.

Ou seja: notificação é a primeira funcionalidade que **quebra o fluxo de
desenvolvimento atual** e exige contas de loja configuradas. Não é uma tarefa de
front-end isolada.

### Abordagem prevista

- `expo-notifications` + Expo Push Service (evita falar com FCM e APNs
  diretamente).
- Token do dispositivo registrado numa tabela nova (`dispositivos`), ligada ao
  usuário quando houver login. Um token por dispositivo, revogado no logout.
- Envio a partir de Edge Function — a chave de envio **nunca** no app.
- Android 13+ exige permissão explícita e canal criado antes do token.
- iOS: pedir permissão **no contexto**, não na abertura. Negada uma vez, só as
  Configurações do sistema revertem.
- Deep link no payload, aproveitando o `scheme` já configurado.
- Preferências por categoria (eventos, cursos, avisos) — sem isso, o usuário só
  tem a opção "desligar tudo".

### Escopo mínimo defensável

Avisos de novo evento, novo curso e início de transmissão. O badge só volta a
existir quando houver contagem real por trás — badge fixo é pior que badge
nenhum.

---

## 15. Estratégia para pagamentos

> **Não será implementado nesta etapa. E é a decisão mais cara do documento.**

### Situação

Não há nada de pagamento na referência: nem tabela, nem gateway, nem tela. A
adesão é um **link externo** para `abrahof.org.br/adesao/` — o app manda o
usuário para o navegador e a transação acontece fora dele.

### O ponto que precisa ser entendido antes de qualquer código

Isto não é uma escolha técnica de gateway. É uma escolha que decide se o
aplicativo **é aprovado ou rejeitado** nas lojas, e que pode custar **15–30% da
receita**.

A regra, em linhas gerais: se o app vende **conteúdo ou funcionalidade digital
consumida dentro dele**, Apple e Google exigem a compra pelo sistema de
in-app purchase, com comissão. Se o que se vende é **bem físico ou serviço
prestado fora do app**, o pagamento externo é permitido (é o caso de e-commerce e
transporte).

A associação ABRAHOF cai exatamente na zona cinzenta: a anuidade é
majoritariamente **filiação a uma entidade profissional** — serviço fora do app.
Mas se essa anuidade **destravar conteúdo no app** (cursos da Academy, Área
Restrita), a leitura mais provável das lojas é de que se trata de assinatura
digital, e a comissão passa a ser exigida.

**O gatilho não é o que se vende — é o que se destrava.**

### Três caminhos

| Caminho | Como | Comissão | Risco |
| --- | --- | --- | --- |
| **A. Não vender no app** | Conteúdo público; adesão continua no site; app sem CTA de compra | Nenhuma | Baixo. É o comportamento atual |
| **B. IAP** | RevenueCat + assinatura nas lojas | 15–30% | Baixo de rejeição, alto de receita |
| **C. Externo com conteúdo travado** | Pagamento no site, mas Área Restrita no app | Nenhuma | **Alto — rejeição provável** |

**Recomendação: A**, enquanto a Área Restrita não tiver conteúdo exclusivo. É o
que o app já faz, custa zero e não tem risco. **C é a armadilha** — parece
economizar a comissão e é o padrão que mais gera rejeição.

Se a decisão for B, o caminho é RevenueCat (`react-native-purchases`): abstrai
StoreKit e Play Billing, valida recibo no servidor e resolve o estado da
assinatura entre plataformas. Fazer isso na mão, com validação de recibo,
renovação e restauração de compras, é projeto próprio — e é o tipo de coisa que
só falha em produção. Nesse caso, o app **precisa** oferecer "Restaurar compras"
(requisito da Apple) e o Supabase precisa de tabela de assinaturas alimentada por
webhook — o direito de acesso é o que o servidor diz, nunca o que o cliente
afirma.

**As regras das lojas mudam com frequência e sofreram alterações recentes,
inclusive por decisão judicial, quanto a links externos de pagamento. Antes de
implementar, confirmar o texto vigente das diretrizes — e, dado o valor
envolvido, com apoio jurídico.**

### Registro da pendência

A decisão depende de definir **se a Área Restrita terá conteúdo exclusivo** — a
mesma pergunta que trava a autenticação (§12). Uma resposta destrava as duas.

---

## 16. Estratégia para publicação (Android e iOS)

> **Não será executado nesta etapa.**

### Ferramenta

**EAS Build** e **EAS Submit**. Compilação nativa local em Windows não é viável
para iOS (exige macOS), e o EAS resolve credenciais, assinatura e envio.

### Pré-requisitos não técnicos

Estes costumam ser o gargalo real do primeiro envio — meses de código param aqui:

| Item | Custo | Prazo |
| --- | --- | --- |
| Apple Developer Program | USD 99/ano | Dias a semanas (verificação de entidade) |
| Google Play Console | USD 25, único | Dias |
| Política de privacidade em URL pública | — | **Obrigatória nas duas lojas** |
| Conta de teste para revisão | — | Se houver login |

O `app.json` de hoje ainda **não tem** `ios.bundleIdentifier` nem
`android.package`, e o `slug` é `ABRAHOF` (maiúsculo). Definir isso cedo:
**identificador de bundle não pode ser alterado depois da publicação**.

### Perfis de build

| Perfil | Uso | Distribuição |
| --- | --- | --- |
| `development` | Dia a dia com `expo-dev-client` | Interna |
| `preview` | Homologação | Interna / TestFlight |
| `production` | Loja | App Store / Play |

O perfil `development` deixa de ser opcional a partir da fase de notificações
(§14).

### Versionamento

`version` semântica no `app.json`; `buildNumber` (iOS) e `versionCode` (Android)
gerenciados pelo EAS com `autoIncrement`. Incrementar à mão é fonte garantida de
build rejeitado por número repetido.

### Ativos obrigatórios

Ícone 1024×1024 sem transparência (a Apple rejeita com canal alfa), splash,
ícone adaptativo Android (os do template ainda são os do Expo), capturas por
tamanho de tela, descrição, palavras-chave e classificação etária.

### Pontos que reprovam revisão

- **Funcionalidade incompleta**: a Apple reprova botão que não faz nada. A
  referência tem ~25 elementos assim — publicar naquele estado seria rejeição
  certa. Vale para o mobile: **tela vazia navegável é fundação, não release.**
- **Login sem conteúdo próprio**: exigir cadastro sem justificativa é motivo de
  reprovação. Reforça §12.
- **Permissão sem justificativa** no `Info.plist`.
- **Formulário de privacidade** (Play Data Safety / App Privacy) incompatível com
  o que o app coleta.
- **Pagamento externo** para conteúdo digital (§15).

### EAS Update (OTA)

Serve para correção de JS sem passar por revisão. **Não** serve para mudança
nativa (biblioteca nova, permissão nova) — isso exige build. Regra: atualização
OTA nunca altera o que foi declarado à loja.

---

## 17. Decisões pendentes

Cinco perguntas travam as fases seguintes. São de produto, não de engenharia:

| # | Pergunta | Trava | Urgência |
| --- | --- | --- | --- |
| 1 | **A Área Restrita terá conteúdo exclusivo?** | §12, §15 | **Alta** — define autenticação e pagamentos de uma vez |
| 2 | Nome das rotas: `/beneficios` ou `/clube-beneficios`? | §10 | **Alta** — custa pouco agora, muito depois de deep links |
| 3 | Revista AOS: link externo ou leitor no app? | §5 | Média |
| 4 | Transmissão: player no app ou link para o YouTube? | §5 | Média |
| 5 | Sino de notificações: o que ele lista? | §14 | Baixa |

A pergunta 1 é a que mais destrava: sem ela, autenticação e pagamentos não podem
sequer ser dimensionados.

---

## 18. Fases

Ordem sugerida. Nenhuma fase começa antes da anterior estar verificada.

| Fase | Entrega | Depende de |
| --- | --- | --- |
| **0 — Fundação** ✅ | Navegação, telas vazias, Safe Area | — |
| **1 — Identidade visual** | Tema real (ciano/marinho, escuro), Poppins, componentes base | — |
| **2 — Conteúdo mockado** | 10 telas com layout final sobre `mocks/` | Fase 1 |
| **3 — Telas ausentes** | Telemedicina, Teleodontologia, Advogados | Fase 2 |
| **4 — Dados reais** | Serviços apontam para o Supabase | Fase 3 |
| **5 — Autenticação** | Login, cadastro, guarda de rota | Decisão 1 |
| **6 — Notificações** | Push + development build | Fase 5, contas de loja |
| **7 — Publicação** | EAS Build/Submit | Fase 6 |

A **Fase 1 corrige um erro conhecido**: o tema provisório atual é claro com azul
escuro, e o app real é **escuro, ciano sobre azul-marinho**. Os tokens estão no
apêndice da análise — com o alerta de que as classes da web se chamam
`gradient-gold` e `gradient-forest` mas não produzem nem dourado nem verde.

---

## Resumo das decisões

| Assunto | Decisão |
| --- | --- |
| Arquitetura | Camadas + organização por funcionalidade |
| Navegação | Stack única com hub; sem tabs (15 destinos) |
| Estado de servidor | TanStack Query |
| Estado global | Context enxuto; **sem Redux/Zustand** |
| Serviços | Única camada com acesso externo; mock → Supabase sem tocar em telas |
| Componentes | Próprios; um `Cartao` genérico no lugar de seis |
| Sessão | AsyncStorage (SecureStore tem limite de ~2 KB no iOS) |
| Segredos | `EXPO_PUBLIC_` só para chave anon; segredo real em Edge Function |
| Autenticação | Depende da decisão 1 |
| Pagamentos | Não vender no app enquanto não houver conteúdo exclusivo |
| Publicação | EAS Build/Submit; identificadores definidos antes do primeiro build |
