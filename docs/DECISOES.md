# Registro de Decisões Arquiteturais

Histórico das decisões de arquitetura do aplicativo mobile **Abrahof
Connections**, no formato ADR (*Architecture Decision Record*).

> **Data:** 16/07/2026
> **Relacionados:** [`ARQUITETURA.md`](./ARQUITETURA.md) · [`BANCO.md`](./BANCO.md) · [`BACKLOG.md`](./BACKLOG.md)
> **Natureza:** registro. Nenhum código foi alterado.

---

## Como ler

Cada decisão traz **contexto** (o que motivou), **decisão** (o que foi escolhido),
**consequências** (o que passa a ser verdade, inclusive o que piora) e
**alternativas** (o que foi descartado e por quê).

**Status possíveis**

| Status | Significado |
| --- | --- |
| **Aceita** | Em vigor |
| **Proposta** | Aguardando decisão |
| **Substituída** | Trocada por outra ADR |
| **Revogada** | Cancelada sem substituição |

Uma ADR **não é editada** depois de aceita. Mudou de ideia? Cria-se uma nova que
substitui a anterior — o histórico é o valor do registro.

### Índice

| ADR | Decisão | Status | Origem |
| --- | --- | --- | --- |
| [0001](#adr-0001--react-native-como-base) | React Native como base | Aceita | Definida no `CLAUDE.md` |
| [0002](#adr-0002--expo-como-plataforma) | Expo como plataforma | Aceita | Definida no `CLAUDE.md` |
| [0003](#adr-0003--expo-router-para-navegação) | Expo Router para navegação | Aceita | Definida no `CLAUDE.md` |
| [0004](#adr-0004--organização-das-pastas) | Organização das pastas | Aceita | Proposta em `ARQUITETURA.md` §4 |
| [0005](#adr-0005--tema-escuro-único) | Tema escuro único | **Substituída** pela [0009](#adr-0009--identidade-clara) | Decidida em 16/07/2026 |
| [0006](#adr-0006--rotas-curtas) | Rotas curtas | Aceita | **Decidida hoje** |
| [0007](#adr-0007--estratégia-para-supabase) | Estratégia para Supabase | Aceita | Proposta em `ARQUITETURA.md` §11 |
| [0008](#adr-0008--cabeçalho-próprio-no-lugar-do-header-nativo) | Cabeçalho próprio no lugar do header nativo | Aceita | **Decidida na fundação visual** |
| [0009](#adr-0009--identidade-clara) | Identidade clara (branco + azul) | Aceita | **Decidida hoje** — substitui a 0005 |

**Nota sobre as três primeiras:** ADR-0001 a 0003 são **registros retroativos**.
Chegaram prontas no `CLAUDE.md`, antes deste histórico existir. Estão aqui porque
uma decisão sem registro é uma decisão que ninguém pode questionar depois — e as
consequências valem para quem chegar ao projeto sem ter vivido a escolha.

---

## ADR-0001 — React Native como base

**Data:** 16/07/2026 (registro retroativo) · **Status:** Aceita

### Contexto

Existe um aplicativo web funcional (React + Vite + TypeScript + Supabase),
construído na plataforma Lovable, usado como referência visual e funcional. A
necessidade é um aplicativo que rode em **Android e iOS**.

A referência já era *mobile-first*: a casca do web se chama `MobileLayout` e o
layout é de app, não de site. Ou seja, a web sempre foi um app disfarçado de
página.

Três caminhos existiam: manter a web e empacotá-la, escrever nativo duas vezes, ou
adotar um framework multiplataforma.

### Decisão

**React Native**, conforme definido no `CLAUDE.md`.

### Consequências

**Positivas**

- Uma base de código para as duas plataformas.
- Conhecimento de React aproveitado da equipe da referência.
- Componentes nativos de verdade — rolagem, teclado e gestos com comportamento do
  sistema, coisa que a web nunca entrega bem.
- Acesso a câmera, arquivos e push (§14 da arquitetura), impossíveis numa web.

**Negativas**

- **Nada da web é reaproveitável.** Nem componente, nem CSS, nem Tailwind, nem
  Radix/shadcn (~50 componentes), nem React Router. A referência é referência
  *visual*, não fonte de código.
- Todo elemento HTML precisa de equivalente React Native — sem `div`, sem `img`,
  sem `<form>`.
- Publicação passa a depender de revisão das lojas, com prazos e regras que a web
  não tem.
- iOS exige macOS para compilar (mitigado pela ADR-0002).

### Alternativas descartadas

| Alternativa | Por que não |
| --- | --- |
| **PWA / empacotar a web** | Sem push confiável no iOS; sem loja; a experiência continuaria de site |
| **Nativo duplo (Swift + Kotlin)** | Duas bases, dois times, dois cronogramas. Injustificável para um app majoritariamente de leitura |
| **Flutter** | Tecnicamente viável, mas descartaria o conhecimento de React já existente |

---

## ADR-0002 — Expo como plataforma

**Data:** 16/07/2026 (registro retroativo) · **Status:** Aceita

### Contexto

Decidido o React Native (ADR-0001), resta escolher entre RN puro (CLI) e Expo.

Um fato do ambiente pesa mais que qualquer preferência: **o desenvolvimento
acontece em Windows**, e compilar para iOS exige macOS. Sem uma solução de build
na nuvem, o iOS simplesmente não sai.

### Decisão

**Expo (SDK 54)** com EAS Build e EAS Submit, conforme o `CLAUDE.md`.

### Consequências

**Positivas**

- **Build de iOS a partir do Windows**, via EAS. É o que viabiliza o projeto neste
  ambiente.
- Módulos oficiais para o que está por vir: notificações, fontes, arquivos,
  imagens, seleção de mídia.
- Credenciais, assinatura e envio às lojas gerenciados.
- EAS Update para correção de JS sem revisão.
- Atualização de SDK com caminho documentado.

**Negativas**

- **Push remoto não funciona no Expo Go em Android desde a SDK 53.** A partir da
  fase de notificações, o fluxo passa obrigatoriamente por development build
  (§14 da arquitetura). É a consequência mais concreta desta escolha.
- Dependência de um serviço externo para build; a fila do EAS entra no
  cronograma.
- Módulo nativo fora do ecossistema exige config plugin ou prebuild.
- SDK amarra versões de React Native e React — atualizar é decisão do Expo, não
  nossa.

### Alternativas descartadas

| Alternativa | Por que não |
| --- | --- |
| **React Native CLI puro** | Sem macOS, não há build de iOS. Encerra a discussão neste ambiente |
| **Expo com bare workflow** | Perderia a gestão de credenciais sem necessidade — não há módulo nativo customizado à vista |

### Notas

O `AGENTS.md` exige consultar a documentação **versionada** (v54) antes de
escrever código. Não é burocracia: já mudou três recomendações deste projeto —
o limite de ~2 KB do SecureStore (ADR-0007), o fim do push no Expo Go em Android,
e a API nova de arquivos do `expo-file-system`.

---

## ADR-0003 — Expo Router para navegação

**Data:** 16/07/2026 (registro retroativo) · **Status:** Aceita

### Contexto

A referência usa React Router DOM com 10 rotas planas, sem aninhamento e **sem
nenhuma proteção de rota**. No React Native, React Router DOM não se aplica.

O app terá **15 destinos** no menu principal — número que, por si só, elimina uma
tab bar (o confortável são cinco).

### Decisão

**Expo Router**, com navegação baseada em arquivos, conforme o `CLAUDE.md`.
Modelo: **Stack única com a tela inicial como hub**.

### Consequências

**Positivas**

- Rota derivada do arquivo: criar tela é criar arquivo.
- `typedRoutes` já ativo — destino inválido vira **erro de compilação**, não 404
  em produção. Na web, 5 dos 15 atalhos do menu levam a 404; com rotas tipadas
  isso não teria passado do editor.
- Header nativo cuida de título e botão voltar, resolvendo Safe Area superior e
  gesto de borda do iOS de graça.
- Deep linking quase pronto (`scheme: "abrahof"` já configurado) — necessário para
  notificações.
- Guarda de rota por grupo (`(autenticado)/_layout.tsx`), em um lugar só.

**Negativas**

- **Todo arquivo em `app/` é rota.** Um componente ali vira rota fantasma — daí a
  regra da ADR-0004 de manter `app/` só com rotas.
- Tipos gerados podem ficar obsoletos: ao remover as telas do template, o `tsc`
  acusou erro em rotas válidas até o dev server regenerar `.expo/types`. É
  confusão garantida para quem não conhece o mecanismo.
- Convenções próprias (`_layout`, `+not-found`, `(grupo)`) que não são óbvias.

### Alternativas descartadas

| Alternativa | Por que não |
| --- | --- |
| **React Navigation puro** | É o que roda por baixo. Usar direto significaria escrever à mão o roteamento, o deep linking e os tipos |
| **Tab bar** | 15 destinos não cabem. Se três ou quatro áreas se destacarem, dá para introduzir abas depois sem refazer telas |

---

## ADR-0004 — Organização das pastas

**Data:** 16/07/2026 · **Status:** Aceita

### Contexto

A referência mistura tudo numa tela só: `Academy.tsx` faz duas consultas ao
Supabase, agrupa dados no cliente e renderiza JSX no mesmo arquivo. Funciona para
uma tela; impede trocar a fonte de dados ou testar a regra isoladamente.

O sintoma disso está em seis telas: **Documentos, Galeria, Benefícios,
Patrocinadores, Transmissão e Contato têm tabela pronta no banco e continuam
estáticas**, com os dados fixos dentro do componente. Não é preguiça — é que o
array estava no lugar mais confortável possível, e trocá-lo por uma consulta
exigiria mexer na tela inteira.

Além disso, o Expo Router transforma qualquer arquivo em `app/` numa rota.

### Decisão

**Camadas com organização por funcionalidade**, conforme `ARQUITETURA.md` §4:

```
app/              apenas rotas
funcionalidades/  telas, componentes e hooks por seção
components/       base/ · layout/ · feedback/
servicos/         única camada com acesso externo
hooks/ constants/ tipos/ utilitarios/ mocks/
```

Com quatro regras:

1. **`app/` só contém rotas.** A rota importa a tela e não faz mais nada.
2. **A UI não conhece o backend.** Nenhuma tela importa o cliente Supabase.
3. **Promoção, não antecipação.** Componente nasce na funcionalidade e só sobe
   para `components/` quando a **segunda** precisar dele.
4. **Estrutura nasce quando há código para ocupá-la.** Sem pasta vazia "para o
   futuro".

### Consequências

**Positivas**

- **Mock vira Supabase sem tocar em nenhuma tela** — a assinatura do serviço não
  muda. É a consequência que justifica a decisão inteira e o que torna a fase
  atual descartável sem prejuízo.
- Regra de negócio testável sem renderizar.
- Nenhuma rota fantasma.
- `mocks/` isolada, com prazo de validade explícito.

**Negativas**

- **Mais arquivos.** Uma tela simples vira rota + tela + hook + serviço + mock.
  Para as telas atuais (só um título), é excesso — por isso a migração é por
  necessidade, não por cronograma.
- Exige disciplina: o caminho curto (array dentro do componente) continua
  existindo e é sempre mais rápido no momento.
- A estrutura de hoje é um subconjunto do alvo, então o projeto passa um tempo
  "no meio do caminho".

### Alternativas descartadas

| Alternativa | Por que não |
| --- | --- |
| **Clean Architecture / DDD** | Indireção demais para um app de leitura cujas regras são filtros e ordenações |
| **Atomic Design** | "Molécula ou organismo?" gera discussão sem ganho |
| **Tudo por tipo** (`telas/`, `componentes/`) | Mexer numa seção espalha por quatro pastas |
| **Copiar a estrutura da web** | É justamente o que produziu seis telas estáticas com tabela pronta |

---

## ADR-0005 — Tema escuro único

**Data:** 16/07/2026 · **Status:** ~~Aceita~~ **Substituída pela ADR-0009**

> Vigorou durante a fundação visual e a construção das 10 telas. A identidade
> escura foi trocada por uma clara em 16/07/2026 — o registro permanece porque
> o histórico é o valor deste documento.

### Contexto

O tema provisório criado na fundação está **errado**: fundo claro com azul escuro.
Foi um placeholder assumido como tal, antes de analisar a referência.

A análise mostrou o app real: **ciano sobre azul-marinho profundo**, escuro. E
mostrou também que a web **não tem modo claro de verdade** — o bloco `.dark` do
CSS repete exatamente os mesmos valores do `:root`. Ou seja: o app sempre foi
escuro; a alternância nunca existiu.

Há ainda uma armadilha herdada: as classes se chamam `gradient-gold`,
`shadow-gold` e `gradient-forest`, mas **não produzem dourado nem verde** — todas
geram ciano ou marinho. São nomes de um tema anterior que ninguém renomeou.

### Decisão

**Tema escuro único.** Sem modo claro, sem alternância.

Tokens em `constants/tema.ts`, nomeados **pelo papel** (`fundo`, `primaria`,
`superficie`, `texto`), nunca pela cor. Valores base:

| Papel | HSL |
| --- | --- |
| Fundo | `210 50% 12%` |
| Superfície | `210 45% 16%` |
| Primária | `195 85% 50%` |
| Texto | `200 20% 95%` |
| Texto suave | `210 20% 55%` |

### Consequências

**Positivas**

- Fidelidade ao app real, que é o objetivo da reconstrução.
- **Um tema para manter, não dois.** Suportar claro custaria o dobro de revisão
  visual para uma experiência que a referência nunca teve.
- Nomes por papel encerram a armadilha `gold`/`forest`. Quem ler `primaria` não
  espera dourado.
- Identidade forte: ciano sobre marinho é distinto e combina com o público
  médico-odontológico.

**Negativas**

- **`app.json` precisa mudar:** `userInterfaceStyle` está `"automatic"` e deve ir
  para `"dark"`. Sem isso, componentes nativos (teclado, seletores, alertas)
  aparecem claros no meio de um app escuro.
- `StatusBar` fixa em `light`.
- **Contraste exige verificação.** Ciano `195 85% 50%` sobre marinho passa
  folgado, mas texto suave (`210 20% 55%`) sobre superfície fica no limite do
  WCAG AA. Precisa ser medido, não estimado.
- Usuário que prefere tema claro não será atendido. Aceitável: é decisão de
  identidade, e a referência nunca ofereceu escolha.
- Ícone, splash e capturas das lojas precisam nascer escuros.
- Legibilidade sob sol forte é pior que num tema claro — e o app será usado em
  congresso, inclusive em área externa. Mitigar com contraste generoso.

### Alternativas descartadas

| Alternativa | Por que não |
| --- | --- |
| **Claro + escuro com alternância** | Dobra a manutenção por algo que a referência não tem. Reavaliar só se houver pedido real |
| **Seguir o sistema** | Exigiria inventar um tema claro que nunca existiu |
| **Manter o tema claro provisório** | Está errado; foi placeholder desde o início |

---

## ADR-0006 — Rotas curtas

**Data:** 16/07/2026 · **Status:** Aceita

> Resolve a **Decisão 2** de `ARQUITETURA.md` §17 e desbloqueia a tarefa
> correspondente da Sprint 3 no `BACKLOG.md`.

### Contexto

A referência usa rotas longas e descritivas: `/clube-beneficios`,
`/eventos-parceiros`, `/advogados-parceiros`. A fundação criou `/beneficios` e
`/eventos`, divergindo — e a divergência ficou registrada como pendência.

Precisa ser resolvida **agora**: depois que deep links e notificações apontarem
para essas URLs, mudar rota significa manter redirecionamento e quebrar links já
distribuídos.

Um ponto que a web tinha e o app não tem: **URL de app não é URL de site**. Não há
SEO, não há barra de endereço, o usuário nunca lê nem digita a rota. Ela aparece
em `Linking`, em payload de notificação e no código.

### Decisão

**Rotas curtas.** Mapa canônico:

| Rota | Substitui (web) |
| --- | --- |
| `/` | `/` |
| `/login` | `/login` |
| `/cadastro` | `/cadastro` |
| `/transmissao` | `/transmissao` |
| `/academy` | `/academy` |
| `/eventos` | `/eventos-parceiros` |
| `/documentos` | `/documentos` |
| `/beneficios` | `/clube-beneficios` |
| `/galeria` | `/galeria` |
| `/contato` | `/contato` |
| `/patrocinadores` | `/patrocinadores` |
| `/telemedicina` | `/telemedicina` |
| `/teleodontologia` | `/teleodontologia` |
| `/advogados` | `/advogados-parceiros` |
| `/revista` | — (era link externo) |

**Regra:** substantivo único, sem qualificador, sem hífen quando possível. O
qualificador ("parceiros", "clube de") é **rótulo de interface**, não de rota — a
tela continua se chamando "Clube de Benefícios" e "Eventos Parceiros" para o
usuário.

Detalhe rotas de detalhe: `/academy/[id]`, `/eventos/[id]`.

### Consequências

**Positivas**

- Menos ruído no código e em payload de notificação.
- `/eventos/[id]` é mais natural que `/eventos-parceiros/[id]`.
- Sem hífen, some a dúvida "era hífen ou underscore?".
- Fixado **antes** de existir deep link — custo zero agora.
- Nome de rota deixa de acompanhar rótulo de marketing: se "Clube de Benefícios"
  virar "Vantagens ABRAHOF" amanhã, `/beneficios` continua válida.

**Negativas**

- **Diverge da web permanentemente.** Quem conhece as URLs antigas não as
  encontra. Impacto baixo: não há URL de app compartilhada em lugar nenhum.
- Perde-se um pouco de precisão: `/eventos` não diz que são eventos *parceiros* —
  a tela diz.
- **Se algum dia existirem eventos próprios da ABRAHOF**, `/eventos` fica
  ambígua. Risco aceito: resolve-se com `/eventos/proprios` ou um filtro.
- `/advogados` e `/telemedicina` não seguem o mesmo padrão de comprimento — vêm da
  nomenclatura do banco. Padronizar exigiria renomear tabelas (`BANCO.md` §6).

### Alternativas descartadas

| Alternativa | Por que não |
| --- | --- |
| **Manter as rotas da web** | Preserva uma correspondência que ninguém consulta, ao custo de verbosidade permanente |
| **Rotas em inglês** (`/benefits`) | Contraria a regra de domínio em português do `CLAUDE.md` |
| **Decidir depois** | É exatamente o que fica caro: deep link e notificação fixam a URL |

---

## ADR-0007 — Estratégia para Supabase

**Data:** 16/07/2026 · **Status:** Aceita

> Define **como** o Supabase será usado. **Não** autoriza implementá-lo agora — a
> etapa atual segue com dados mockados (`CLAUDE.md`).

### Contexto

O banco herdado é o **melhor ativo** da referência: **13 tabelas** com RLS,
convenção uniforme, e um modelo mais completo que o app. Mas só **3 tabelas são
consumidas** — as outras 10 esperam código.

O cliente da web não serve como está: usa `localStorage` (inexistente no RN), lê
variáveis do Vite e assume sessão detectada por URL.

E há um erro a não repetir: **a referência versionou um `.env` com URL e chave do
Supabase**.

### Decisão

Sete regras:

1. **Cliente único** em `servicos/supabase/cliente.ts`, importado **apenas** por
   serviços — nunca por tela (ADR-0004).
2. **`detectSessionInUrl: false`** e refresh atrelado ao `AppState`.
3. **Sessão em AsyncStorage, não SecureStore.**
4. **Chave anon via `EXPO_PUBLIC_…`**, com `.env` fora do versionamento. **Nunca**
   `service_role`; segredo real roda em Edge Function.
5. **RLS é a defesa**, não a chave. Toda tabela nova nasce com política explícita.
6. **Tipos gerados pelo CLI**, versionados, nunca editados à mão.
7. **Corrigir o modelo antes de migrar** as telas correspondentes.

### Sobre a sessão: por que AsyncStorage

Contraintuitivo, e por isso registrado: **SecureStore parece a escolha óbvia e é a
errada.**

O iOS historicamente **recusa valores acima de ~2048 bytes**, e a sessão do
Supabase (access token + refresh token + objeto do usuário) passa disso com
folga. Usar SecureStore exigiria fragmentar o valor — complexidade que falha
silenciosamente e derruba o login **em produção**, não em teste.

O access token é de curta duração e o armazenamento já é isolado por aplicativo
nas duas plataformas. Se uma análise de risco exigir criptografia, a saída é
SecureStore **com fragmentação testada** — não uma troca ingênua de storage.

### Sobre corrigir o modelo antes

Três correções precisam vir **antes** da migração das telas (`BANCO.md` §16):

| Correção | Por quê |
| --- | --- |
| `eventos_parceiros.tipo` | `descricao` acumula duas funções; os filtros **nunca puderam** funcionar |
| `transmissoes.idioma` e `.palestrante` | A tela exibe; a tabela não guarda |
| `clube_beneficios`: parceiro ou categoria? | Modelo e tela discordam |

Migrar antes de corrigir significa reescrever serviço, tela e dados depois.

### Consequências

**Positivas**

- Trocar mock por Supabase não toca em nenhuma tela.
- Credencial fora do repositório desde o primeiro commit.
- Tipos gerados dão erro de compilação quando o schema muda.
- Erro tipado: a tela nunca vê `PostgrestError`.

**Negativas**

- **`EXPO_PUBLIC_` é embutido no bundle** e pode ser extraído do APK/IPA. Não é
  falha da decisão — é a natureza do cliente. Daí a regra 5: **quem protege é o
  RLS**.
- Sessão em AsyncStorage não é criptografada. Trade-off consciente: login que
  funciona vale mais que criptografia que quebra.
- Correção de modelo é trabalho antes de qualquer resultado visível — pressão para
  pular existirá.
- Dependência de um serviço externo; indisponibilidade do Supabase derruba o
  conteúdo.

### Riscos herdados que esta decisão **não** resolve

Registrados para que ninguém os considere resolvidos:

- **Dado pessoal público**: telefone, e-mail e foto de profissionais com
  `SELECT USING (true)`. Questão de LGPD, não de arquitetura.
- **`contatos` com `INSERT` público sem limite**: endpoint aberto de escrita.
- **`codigo_promocional` em tabela pública**: RLS filtra linha, não coluna —
  exige tabela separada.
- **Nenhuma modelagem de usuário**: bloqueia autenticação e administração.

### Alternativas descartadas

| Alternativa | Por que não |
| --- | --- |
| **API própria na frente do Supabase** | Camada a manter sem problema que resolva. O RLS já é o controle |
| **REST direto sobre PostgREST** | Perderia tipos, auth e realtime para economizar uma dependência |
| **Trocar de backend** | O banco é o melhor ativo herdado. Descartá-lo seria jogar fora o modelo de 10 telas |
| **SecureStore para a sessão** | Limite de ~2 KB no iOS; ver acima |
| **Migrar tudo e corrigir depois** | Retrabalho em serviço, tela e dados |

---

## ADR-0008 — Cabeçalho próprio no lugar do header nativo

**Data:** 16/07/2026 (registro retroativo, na auditoria) · **Status:** Aceita

> Substitui parcialmente a **ADR-0003**, que listava como vantagem o header
> nativo da Stack cuidar de título e Safe Area.

### Contexto

A ADR-0003 escolheu o Expo Router e contou entre suas vantagens que "o header
nativo cuida de título e botão voltar, o que resolve de graça a Safe Area
superior".

Na fundação visual, a exigência mudou: o cabeçalho precisava acomodar **logo,
subtítulo e ação à direita** — o header nativo não faz isso bem. Manter os dois
duplicaria o topo da tela.

**Esta decisão foi tomada e implementada, mas nunca registrada.** A auditoria
encontrou a lacuna: o código diz uma coisa, a `ARQUITETURA.md` §10 ainda dizia
outra.

### Decisão

`headerShown: false` no Stack raiz. As telas usam o `Cabecalho` de
`components/layout/`, que trata título, subtítulo, marca, voltar e ação.

### Consequências

**Positivas**

- Logo e subtítulo cabem — impossível com o nativo.
- Um só cabeçalho para manter, com aparência idêntica nas duas plataformas.
- Título deixa de ser declarado no `_layout` e passa a ser responsabilidade da
  tela, ao lado do conteúdo que ele descreve.

**Negativas**

- **A Safe Area superior passa a ser nossa responsabilidade** — o `Cabecalho`
  usa `useSafeAreaInsets`; a `Tela` cuida da inferior. Divisão que precisa ser
  respeitada por quem criar tela nova.
- Perde-se a animação de título e a transição nativa do header no iOS.
- O botão voltar é desenhado à mão. O **gesto** de voltar continua nativo: é da
  Stack, não do header.

### Alternativas descartadas

| Alternativa | Por que não |
| --- | --- |
| **Manter o header nativo** | Não acomoda logo nem subtítulo |
| **Nativo nas seções, próprio na home** | Duas convenções de cabeçalho no mesmo app |

---

## ADR-0009 — Identidade clara

**Data:** 16/07/2026 · **Status:** Aceita

> **Substitui a ADR-0005** (tema escuro único).

### Contexto

A ADR-0005 adotou o tema escuro por fidelidade: o projeto de referência é ciano
sobre azul-marinho, e não tem modo claro real.

A direção de identidade mudou — o aplicativo deve ser claro, limpo e
institucional: branco de fundo, azul de destaque, cinza claro nas bordas,
azul-escuro nos textos. É decisão de marca, não técnica.

O pedido inicial era aplicar a mudança **apenas na tela inicial**. A análise
mostrou que isso seria o pior dos caminhos:

- **App todo:** 4 arquivos, porque os tokens são nomeados por papel e não há
  nenhuma cor literal fora de `theme/` — verificado na auditoria, em 78
  arquivos.
- **Só a home:** ~8 arquivos, com variante de cor em seis componentes
  **compartilhados** (quatro deles usados pelas outras nove telas), resultando
  num aplicativo de duas identidades — branco na home, marinho ao tocar qualquer
  cartão.

A disciplina de tokens inverteu a intuição: mudar tudo saiu mais barato e mais
seguro que mudar uma tela.

### Decisão

Identidade clara em todo o aplicativo, aplicada em `theme/colors.ts`.

| Papel | Valor | Contraste medido |
| --- | --- | --- |
| Fundo | `#FFFFFF` | — |
| Superfície (cartões) | `#F8FAFC` | — |
| Superfície de apoio | `#E8EDF1` | — |
| Primária | `#147DB3` | 4,55:1 sobre branco |
| Sobre primária | `#FFFFFF` | 4,55:1 sobre a primária |
| Texto | `#123247` | 13,3:1 sobre branco |
| Texto suave | `#667580` | 4,75:1 sobre branco |
| Borda | `#DCE3E8` | 1,3:1 — decorativa |
| Pressionado | `#E8F5FB` | — |
| Erro | `#C62828` | 5,6:1 sobre branco |

**Sem modo escuro.** Um tema para manter, como na ADR-0005 — o que mudou foi
qual.

### Consequências

**Positivas**

- **O contraste do texto de apoio deixou de ser um risco.** No tema escuro ele
  ficava no limite do WCAG AA e vinha sendo arrastado como pendência desde a
  fundação; agora rende 4,75:1, medido.
- Sombra preta discreta funciona igual nas duas plataformas. A sombra ciano
  anterior saía acinzentada no Android, que não aceita cor em `elevation`.
- Legibilidade sob sol forte melhora — e o aplicativo será usado em congresso,
  inclusive em área externa. Era uma desvantagem registrada na ADR-0005.
- Nenhum componente precisou de variante de cor.

**Negativas**

- **Diverge do projeto de referência**, que é escuro. A reconstrução deixa de
  ser fiel na cor — decisão consciente, de marca.
- **`#18AEE5` não pode ser usado como conteúdo:** rende 2,55:1 sobre branco,
  abaixo do mínimo de 3:1. Serve como acento e fundo; ícones usam `#147DB3`.
- **O feedback de toque precisou mudar de mecanismo.** Reduzir a opacidade de um
  cartão quase branco sobre fundo branco não produz retorno visível: `Cartao` e
  `CartaoMenu` passaram a trocar o fundo para `Cores.pressionado`. Botões, que
  têm cor sólida, seguem com opacidade.
- `app.json` (`userInterfaceStyle`) e `StatusBar` invertidos para `light` e
  `dark`.
- Ícone, splash e capturas das lojas precisarão nascer claros.

### Alternativas descartadas

| Alternativa | Por que não |
| --- | --- |
| **Só a tela inicial clara** | Duas identidades no mesmo app, e o dobro de arquivos |
| **Claro + escuro com alternância** | Dobra a manutenção; a ADR-0005 já havia recusado, e a razão continua válida |
| **Manter o escuro** | A identidade é decisão do cliente |

---

## Decisões pendentes

Ainda sem ADR, por dependerem de produto (`ARQUITETURA.md` §17):

| # | Pergunta | Trava |
| --- | --- | --- |
| 1 | **A Área Restrita terá conteúdo exclusivo?** | Autenticação **e** pagamentos |
| 3 | Um benefício é parceiro nomeado ou categoria? | Migração de `clube_beneficios` |
| 4 | Revista AOS: link externo ou leitor no app? | Manter ou remover a tabela |
| 5 | Transmissão: player ou link? | Escopo da tela |
| 6 | "Telemedicina" é diretório ou consulta? | Nome e risco regulatório |

A **Decisão 2** (nome das rotas) saiu do quadro: virou a ADR-0006.

A **pergunta 1** continua sendo a mais cara do projeto. Ela decide, de uma vez, se
há login e se o app vende algo — e, portanto, se a comissão de 15–30% das lojas
entra na conta.
