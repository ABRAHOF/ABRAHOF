# Banco de Dados — Mapeamento do Projeto de Referência

Mapeamento completo do schema Supabase do projeto de referência, com finalidade,
campos, relacionamentos, índices, políticas RLS recomendadas e melhorias para a
versão mobile.

> **Data:** 16/07/2026
> **Fonte:** `supabase/migrations/20260411080148_e5f39452-30d0-4755-9621-1d15d64040ef.sql`
> (migration única) e `src/integrations/supabase/types.ts` (tipos gerados).
> **Relacionados:** [`ANALISE_PROJETO_REFERENCIA.md`](./ANALISE_PROJETO_REFERENCIA.md) · [`REQUISITOS.md`](./REQUISITOS.md) · [`ARQUITETURA.md`](./ARQUITETURA.md)
> **Natureza:** documento descritivo. Nenhum código ou schema foi alterado.

> ### Correção de contagem
>
> Os documentos anteriores afirmam "12 tabelas". **São 13.** O erro veio dos
> comentários da migration, que numeram 12 *domínios* — mas o domínio "2. ACADEMY"
> cria duas tabelas (`academy_cursos` e `academy_aulas`). Confirmado por
> `grep -c "^CREATE TABLE public\."` = 13 e pelos tipos gerados.
> As demais contagens permanecem: **3 consumidas, 10 ociosas**.

---

## Visão geral

| Aspecto | Situação |
| --- | --- |
| Tabelas | **13** |
| Consumidas pelo app | **3** (`academy_cursos`, `academy_aulas`, `eventos_parceiros`) |
| Ociosas | **10** |
| Chaves estrangeiras | **1** (`academy_aulas.curso_id`) |
| Índices explícitos | **0** |
| Constraints `UNIQUE` | **0** |
| Constraints `CHECK` | **0** |
| Views / Enums / Funções RPC | **0** |
| Funções | 1 (`update_updated_at_column`, trigger) |
| Triggers | 12 (`updated_at`) |
| RLS | Habilitado nas 13 |
| Tabelas de usuário/perfil/papel | **Nenhuma** |

### Leitura geral

O schema é **coerente, consistente e bem mais completo que o aplicativo**. Foi
escrito de uma vez, numa única migration, com convenções uniformes: `id` UUID,
`created_at`/`updated_at` com trigger, campo `ativo` e campo `ordem`. Isso é um
ativo real — o modelo de dados das telas que ainda são estáticas **já existe**.

Os problemas não estão na forma, e sim em três pontos: **ausência total de
modelagem de usuário**, **três divergências entre o que a tabela guarda e o que a
tela mostra**, e **RLS uniformemente público**, que só se sustenta enquanto todo o
conteúdo for público.

### Convenções observadas

Todas as 13 tabelas seguem o mesmo padrão, e a nova versão deve mantê-lo:

- `id UUID PRIMARY KEY DEFAULT gen_random_uuid()`
- `created_at TIMESTAMPTZ DEFAULT now()`
- `updated_at TIMESTAMPTZ DEFAULT now()` + trigger (exceto `contatos`)
- Nomes de tabela e coluna em **português, snake_case, plural**
- `ativo BOOLEAN` como *soft delete* / rascunho (8 tabelas)
- `ordem INT DEFAULT 0` para ordenação manual (5 tabelas)
- Texto sem limite de tamanho (`TEXT`, nunca `VARCHAR(n)`)

**Exceções relevantes:** `contatos` não tem `updated_at` nem trigger (correto —
é log de entrada, imutável). `revista_aos` e `documentos` não têm `ativo`.

---

## Sumário das tabelas

| # | Tabela | Finalidade | Uso | Tela |
| --- | --- | --- | --- | --- |
| 1 | [`transmissoes`](#1-transmissoes) | Transmissões ao vivo | ❌ Ociosa | Transmissão (estática) |
| 2 | [`academy_cursos`](#2-academy_cursos) | Cursos | ✅ Em uso | Academy |
| 3 | [`academy_aulas`](#3-academy_aulas) | Aulas dos cursos | ✅ Em uso | Academy |
| 4 | [`eventos_parceiros`](#4-eventos_parceiros) | Eventos chancelados | ✅ Em uso | Eventos |
| 5 | [`revista_aos`](#5-revista_aos) | Artigos da revista | ❌ Ociosa | — (link externo) |
| 6 | [`telemedicina`](#6-telemedicina-e-7-teleodontologia) | Profissionais | ❌ Ociosa | ❌ Inexistente |
| 7 | [`teleodontologia`](#6-telemedicina-e-7-teleodontologia) | Profissionais | ❌ Ociosa | ❌ Inexistente |
| 8 | [`documentos`](#8-documentos) | Arquivos | ❌ Ociosa | Documentos (estática) |
| 9 | [`clube_beneficios`](#9-clube_beneficios) | Benefícios | ❌ Ociosa | Benefícios (estática) |
| 10 | [`galeria`](#10-galeria) | Fotos | ❌ Ociosa | Galeria (Unsplash) |
| 11 | [`contatos`](#11-contatos) | Mensagens recebidas | ❌ Ociosa | Contato (não envia) |
| 12 | [`patrocinadores`](#12-patrocinadores) | Apoiadores | ❌ Ociosa | Patrocinadores (estática) |
| 13 | [`advogados_parceiros`](#13-advogados_parceiros) | Advogados | ❌ Ociosa | ❌ Inexistente |

---

## Nota sobre índices

**Recomendação geral: não criar índice agora.**

As tabelas têm dezenas de linhas, não milhões. Abaixo de ~1.000 registros o
PostgreSQL faz *sequential scan* e **ignora o índice** — que passa a custar
escrita e espaço sem devolver leitura. Cada tabela já tem o índice implícito da
PK, e `academy_aulas.curso_id` ganha um do FK.

Por isso, cada seção abaixo traz o índice **que fará sentido quando o volume
justificar**, com o gatilho explícito. A única exceção com prazo curto é
`contatos`, que cresce sozinha por ser escrita pelo público.

---

## Nota sobre RLS

O padrão atual é `SELECT USING (true)` em 12 tabelas e `INSERT WITH CHECK (true)`
em `contatos`. **Para conteúdo público, isso está correto** — RLS liberado não é
descuido quando o dado é mesmo público.

Há, porém, duas lacunas em todas as 13 tabelas:

1. **Nenhuma política de escrita** (`INSERT`/`UPDATE`/`DELETE`) além de
   `contatos`. Com RLS ativo e sem política, escrita pela chave anon é bloqueada —
   o conteúdo só entra pelo painel do Supabase (que usa `service_role` e ignora
   RLS). Funciona, mas significa que **não existe administração pelo app**, e
   qualquer painel futuro precisa dessas políticas.
2. **Nenhum papel de administrador.** Não há tabela de perfis nem de papéis, então
   não há como escrever `USING (é_admin())`.

As recomendações por tabela abaixo pressupõem duas peças que **ainda não
existem**: `perfis` e a função `tem_papel()` (ver §14).

---

## 1. `transmissoes`

### Finalidade

Transmissões ao vivo (podcasts do CIOSP 2026). **Ociosa** — a tela usa cinco
registros fixos no código.

### Campos

| Campo | Tipo | Nulo | Default | Uso |
| --- | --- | --- | --- | --- |
| `id` | UUID | não | `gen_random_uuid()` | PK |
| `titulo` | TEXT | **não** | — | — |
| `descricao` | TEXT | sim | — | — |
| `url_stream` | TEXT | sim | — | — |
| `thumbnail_url` | TEXT | sim | — | — |
| `data_inicio` | TIMESTAMPTZ | sim | — | — |
| `data_fim` | TIMESTAMPTZ | sim | — | — |
| `ativo` | BOOLEAN | sim | **`false`** | — |
| `created_at` | TIMESTAMPTZ | sim | `now()` | — |
| `updated_at` | TIMESTAMPTZ | sim | `now()` | trigger |

**Atenção:** é a **única** tabela com `ativo DEFAULT false`. Registro inserido sem
`ativo` explícito nasce invisível. É defensável (rascunho antes de publicar), mas
diverge das outras sete — e uma divergência silenciosa dessas gera "cadastrei e
não aparece".

### Relacionamentos

Nenhum. Isolada.

### Índices

Nenhum. Quando houver histórico de transmissões:

```
(ativo, data_inicio DESC)   -- gatilho: > 100 registros
```

### RLS recomendada

| Operação | Política |
| --- | --- |
| SELECT | `USING (ativo = true)` — hoje é `USING (true)`, e expõe rascunhos |
| INSERT/UPDATE/DELETE | `tem_papel('admin')` |

**Este é o único caso em que o RLS atual é objetivamente frouxo**: com
`DEFAULT false`, a tabela foi desenhada para ter rascunhos — e a política deixa
qualquer um lê-los.

### Melhorias

- **Adicionar `idioma`** (PT/EN) e **`palestrante`** — a tela exibe os dois e a
  tabela não tem nenhum. Sem isso, a migração força enfiá-los em `descricao`, que
  é exatamente o erro já cometido em `eventos_parceiros`.
- Considerar `palestrantes` como tabela própria: o mesmo profissional se repete
  entre transmissões, cursos e eventos.
- `plataforma` (YouTube, Zoom…) — `url_stream` sozinho não diz como abrir.
- `CHECK (data_fim > data_inicio)`.
- Estado derivado de `data_inicio`/`data_fim`/`ativo` ("agendada", "ao vivo",
  "encerrada") — hoje a tela não sabe dizer o que está no ar.

---

## 2. `academy_cursos`

### Finalidade

Catálogo de cursos da Academy. **Em uso** — filtra `ativo = true`, ordena por
`ordem`.

### Campos

| Campo | Tipo | Nulo | Default | Uso |
| --- | --- | --- | --- | --- |
| `id` | UUID | não | `gen_random_uuid()` | PK, FK das aulas |
| `titulo` | TEXT | **não** | — | ✅ |
| `descricao` | TEXT | sim | — | ❌ não usado |
| `instrutor` | TEXT | sim | — | ✅ fallback "ABRAHOF" |
| `carga_horaria` | TEXT | sim | — | ✅ |
| `thumbnail_url` | TEXT | sim | — | ✅ |
| `ordem` | INT | sim | `0` | ✅ |
| `ativo` | BOOLEAN | sim | `true` | ✅ |
| `created_at` | TIMESTAMPTZ | sim | `now()` | ❌ |
| `updated_at` | TIMESTAMPTZ | sim | `now()` | trigger |

### Relacionamentos

`academy_aulas.curso_id → academy_cursos.id` (1:N, `ON DELETE CASCADE`).

### Índices

Nenhum além da PK. Quando o catálogo crescer:

```
(ativo, ordem)   -- gatilho: > 200 cursos
```

### RLS recomendada

| Operação | Política |
| --- | --- |
| SELECT | `USING (ativo = true)` |
| INSERT/UPDATE/DELETE | `tem_papel('admin')` |

Se a decisão de produto (`ARQUITETURA.md` §17.1) for restringir cursos a
associados, esta é a tabela mais provável de mudar:
`USING (ativo AND tem_papel('associado'))`.

### Melhorias

- **`carga_horaria TEXT` deveria ser `INT` (minutos).** Texto livre não ordena,
  não soma e não filtra — e vai chegar com "2h", "120 min" e "2 horas" na mesma
  coluna.
- **Campo `destaque`/`novo` explícito.** Hoje o selo "Novo" é dado por
  `index === 0` no cliente: mude a ordenação e o selo pula de curso. Alternativa:
  derivar de `created_at`.
- Usar `descricao`, hoje ignorada — a tela de detalhe proposta em `REQUISITOS.md`
  §4 precisa dela.
- `nivel` (iniciante/intermediário/avançado): a UI já tem o selo pronto e nada
  para colocar nele.
- `slug` para deep link legível (`abrahof://academy/harmonizacao-basica`).

---

## 3. `academy_aulas`

### Finalidade

Aulas de um curso. **Em uso** — mas consultada **sem filtro de curso** e agrupada
no cliente.

### Campos

| Campo | Tipo | Nulo | Default | Uso |
| --- | --- | --- | --- | --- |
| `id` | UUID | não | `gen_random_uuid()` | PK |
| `curso_id` | UUID | **sim** | — | ✅ agrupamento |
| `titulo` | TEXT | **não** | — | ✅ |
| `descricao` | TEXT | sim | — | ❌ |
| `video_url` | TEXT | sim | — | ✅ |
| `duracao` | TEXT | sim | — | ✅ |
| `ordem` | INT | sim | `0` | ✅ |
| `created_at` | TIMESTAMPTZ | sim | `now()` | ❌ |
| `updated_at` | TIMESTAMPTZ | sim | `now()` | trigger |

### Relacionamentos

`curso_id → academy_cursos(id) ON DELETE CASCADE`. **É a única FK do banco
inteiro.**

**Problema:** `curso_id` é **nullable**. Aula órfã é registro válido — e o código
da referência trata isso (`if (aula.curso_id)`), o que confirma que o caso
acontece. Aula sem curso não aparece em curso nenhum, mas **aparece na lista solta
"Aulas Disponíveis"**. É inconsistência silenciosa.

### Índices

O FK gera índice em `curso_id`. Quando crescer:

```
(curso_id, ordem)   -- gatilho: > 500 aulas
```

### RLS recomendada

| Operação | Política |
| --- | --- |
| SELECT | `USING (EXISTS (SELECT 1 FROM academy_cursos c WHERE c.id = curso_id AND c.ativo))` |
| INSERT/UPDATE/DELETE | `tem_papel('admin')` |

**Nota:** hoje `academy_aulas` é `USING (true)` — ou seja, **as aulas de um curso
inativo continuam visíveis** e são listadas na seção "Aulas Disponíveis".
Desativar um curso não esconde suas aulas. É um vazamento pequeno, mas real, e a
política acima o fecha.

### Melhorias

- **`curso_id NOT NULL`.** Aula sem curso não tem sentido de negócio e já produz
  o `if` defensivo no cliente.
- **`duracao TEXT` → `INT` (segundos).** Mesmo caso de `carga_horaria`.
- `UNIQUE (curso_id, ordem)` para impedir empate de ordenação.
- `gratuita BOOLEAN` — permitiria aula de amostra num catálogo pago.
- `video_url` merece `CHECK` de formato, ou uma coluna `plataforma`.

---

## 4. `eventos_parceiros`

### Finalidade

Eventos chancelados pela ABRAHOF. **Em uso** — filtra `ativo`, ordena por
`data_evento`.

### Campos

| Campo | Tipo | Nulo | Default | Uso |
| --- | --- | --- | --- | --- |
| `id` | UUID | não | `gen_random_uuid()` | PK |
| `titulo` | TEXT | **não** | — | ✅ |
| `descricao` | TEXT | sim | — | ⚠️ **usado como tipo** |
| `local` | TEXT | sim | — | ✅ fallback "A definir" |
| `data_evento` | TIMESTAMPTZ | sim | — | ✅ |
| `imagem_url` | TEXT | sim | — | ❌ |
| `link_inscricao` | TEXT | sim | — | ✅ |
| `organizador` | TEXT | sim | — | ❌ |
| `ativo` | BOOLEAN | sim | `true` | ✅ |
| `created_at` | TIMESTAMPTZ | sim | `now()` | ❌ |
| `updated_at` | TIMESTAMPTZ | sim | `now()` | trigger |

### Relacionamentos

Nenhum. `organizador` é texto livre — deveria apontar para um parceiro.

### Índices

Nenhum. Quando a agenda crescer:

```
(ativo, data_evento)   -- gatilho: > 500 eventos
```

### RLS recomendada

| Operação | Política |
| --- | --- |
| SELECT | `USING (ativo = true)` |
| INSERT/UPDATE/DELETE | `tem_papel('admin')` |

Se "Solicitar Chancela" virar fluxo no app, aparece um caso novo: o organizador
insere e edita **o próprio** evento até a aprovação —
`USING (auth.uid() = criado_por AND status = 'rascunho')`. Isso exigiria as
colunas `criado_por` e `status`.

### Melhorias

- **Criar a coluna `tipo`** (Congresso, Simpósio, Workshop, Curso). **Esta é a
  correção mais importante do banco inteiro**: sem ela, `descricao` acumula duas
  funções e as pílulas de filtro da tela **nunca tiveram como funcionar**
  (`REQUISITOS.md` §5). A interface parece quebrada, mas a causa está aqui.
- `data_fim` — evento de vários dias não cabe em `data_evento`.
- `estado`/`cidade` estruturados: a tela alega "27 estados" e o campo `local` é
  texto livre, então esse número não pode ser calculado.
- `status` (rascunho/pendente/aprovado) se houver fluxo de chancela.
- Usar `imagem_url` e `organizador`, hoje ignorados.
- `CHECK (data_evento > '2000-01-01')` contra erro de digitação.

---

## 5. `revista_aos`

### Finalidade

Artigos da revista científica. **Ociosa** — o menu abre o site externo.

### Campos

| Campo | Tipo | Nulo | Default |
| --- | --- | --- | --- |
| `id` | UUID | não | `gen_random_uuid()` |
| `titulo` | TEXT | **não** | — |
| `resumo` | TEXT | sim | — |
| `autor` | TEXT | sim | — |
| `edicao` | TEXT | sim | — |
| `data_publicacao` | **DATE** | sim | — |
| `pdf_url` | TEXT | sim | — |
| `capa_url` | TEXT | sim | — |
| `created_at` | TIMESTAMPTZ | sim | `now()` |
| `updated_at` | TIMESTAMPTZ | sim | `now()` |

Única tabela com `DATE` em vez de `TIMESTAMPTZ` — e aqui está **correto**: data de
publicação não tem hora nem fuso.

**Não tem `ativo`** — não há como despublicar um artigo.

### Relacionamentos

Nenhum. `autor` é texto livre.

### Índices

```
(data_publicacao DESC)   -- gatilho: > 500 artigos
```

### RLS recomendada

| Operação | Política |
| --- | --- |
| SELECT | `USING (true)` — ou `tem_papel('associado')` se a revista for benefício de associação |
| INSERT/UPDATE/DELETE | `tem_papel('admin')` |

### Melhorias

- **Decidir antes de mexer** (`ARQUITETURA.md` §17.3): se a revista continuar no
  site externo, **esta tabela deve ser removida**, não migrada. Tabela vazia que
  ninguém alimenta é dívida de manutenção pura.
- Se virar leitor no app: `autores` como array ou tabela (artigo científico
  raramente tem um autor só), `doi`, `palavras_chave`, e `edicao` como tabela
  própria (hoje o texto "Vol. 3, n. 2" se repete e diverge a cada digitação).
- `ativo` para despublicar.

---

## 6. `telemedicina` e 7. `teleodontologia`

### Finalidade

Diretórios de profissionais parceiros. **Ociosas — e as telas nunca existiram**
(`REQUISITOS.md` §13.1–13.2).

### Campos (idênticos nas duas)

| Campo | Tipo | Nulo | Default |
| --- | --- | --- | --- |
| `id` | UUID | não | `gen_random_uuid()` |
| `profissional` | TEXT | **não** | — |
| `especialidade` | TEXT | sim | — |
| `descricao` | TEXT | sim | — |
| `telefone` | TEXT | sim | — |
| `email` | TEXT | sim | — |
| `link_agendamento` | TEXT | sim | — |
| `foto_url` | TEXT | sim | — |
| `ativo` | BOOLEAN | sim | `true` |
| `created_at` | TIMESTAMPTZ | sim | `now()` |
| `updated_at` | TIMESTAMPTZ | sim | `now()` |

**As duas tabelas são byte a byte idênticas.**

### Relacionamentos

Nenhum.

### Índices

```
(ativo, especialidade)   -- gatilho: > 500 profissionais
```

### RLS recomendada

| Operação | Política |
| --- | --- |
| SELECT | `USING (ativo = true)` |
| INSERT/UPDATE/DELETE | `tem_papel('admin')` |

**Alerta de dado pessoal:** estas tabelas (com `advogados_parceiros`) são as
únicas que guardam **telefone, e-mail e foto de pessoas físicas**. `USING (true)`
publica isso para qualquer um com a chave anon — que está embutida no APK e pode
ser extraída. Não é vazamento de banco: é publicação deliberada de dado de
contato. **Só é aceitável com consentimento explícito de cada profissional**
(LGPD). Se a intenção for expor o contato apenas a associados, o RLS precisa mudar
**antes** da tela existir.

### Melhorias

- **Unificar as duas em uma tabela `profissionais` com coluna `area`**
  (telemedicina / teleodontologia / jurídico). Três tabelas idênticas significam
  três migrations, três políticas e três telas para cada mudança. A arquitetura já
  prevê um único serviço `profissionais.ts` (`ARQUITETURA.md` §7) — o banco
  deveria acompanhar.
- Padronizar o nome da coluna: aqui é `profissional`, em `advogados_parceiros` é
  `nome`. Mesma coisa, nomes diferentes.
- `registro_conselho` (CRM/CRO) — `advogados_parceiros` tem `oab` e estas não têm
  equivalente.
- `especialidade` deveria ser referência, não texto livre — é justamente o campo
  pelo qual se vai filtrar.
- **Revisar o nome "Telemedicina"**: a tabela guarda contato e link, não consulta.
  É diretório. Nome que promete ato médico atrai exigência regulatória (CFM/CFO) e
  escrutínio das lojas (`REQUISITOS.md` §13.3).

---

## 8. `documentos`

### Finalidade

Arquivos para download. **Ociosa** — a tela lista cinco documentos fixos, **sem
arquivo real**.

### Campos

| Campo | Tipo | Nulo | Default |
| --- | --- | --- | --- |
| `id` | UUID | não | `gen_random_uuid()` |
| `titulo` | TEXT | **não** | — |
| `descricao` | TEXT | sim | — |
| `categoria` | TEXT | sim | — |
| `arquivo_url` | TEXT | **não** | — |
| `tamanho_bytes` | **BIGINT** | sim | — |
| `tipo_arquivo` | TEXT | sim | — |
| `created_at` | TIMESTAMPTZ | sim | `now()` |
| `updated_at` | TIMESTAMPTZ | sim | `now()` |

`arquivo_url NOT NULL` é acerto de modelagem: documento sem arquivo não existe. E
`tamanho_bytes BIGINT` está certo — **é a tela que erra**, exibindo "2.4 MB"
digitado à mão (`REQUISITOS.md` §6).

**Não tem `ativo`** — não há como despublicar.

### Relacionamentos

Nenhum. Depende de **Supabase Storage**, que ainda não existe.

### Índices

```
(categoria)   -- gatilho: > 500 documentos
```

### RLS recomendada

| Operação | Política |
| --- | --- |
| SELECT | `USING (true)` enquanto público |
| INSERT/UPDATE/DELETE | `tem_papel('admin')` |

**Ponto central:** RLS protege a **linha**, não o **arquivo**. Se o documento for
restrito a associados, esconder a linha não basta — quem tiver a `arquivo_url`
baixa direto. A restrição real vem da política do **bucket** + URL assinada
(`ARQUITETURA.md` §13). É o erro clássico: proteger a tabela e deixar o arquivo
aberto.

### Melhorias

- **Criar o bucket e subir os arquivos** — sem isso a tabela não tem o que
  guardar. É pré-requisito, não melhoria.
- `ativo` para despublicar (ex.: regulamento de edição anterior).
- `evento_id` ou `ano`: "Programação CIOSP 2026" fica obsoleta em 2027 e não há
  como filtrar.
- `tipo_arquivo` como enum (`pdf`, `docx`) em vez de texto livre — a tela quer
  escolher o ícone por ele.
- `downloads INT` para métrica de uso.
- `CHECK (tamanho_bytes > 0)`.

---

## 9. `clube_beneficios`

### Finalidade

Benefícios de parceiros para associados. **Ociosa** — dez benefícios fixos no
código.

### Campos

| Campo | Tipo | Nulo | Default |
| --- | --- | --- | --- |
| `id` | UUID | não | `gen_random_uuid()` |
| `parceiro` | TEXT | **não** | — |
| `descricao` | TEXT | sim | — |
| `desconto` | TEXT | sim | — |
| `codigo_promocional` | TEXT | sim | — |
| `logo_url` | TEXT | sim | — |
| `link` | TEXT | sim | — |
| `categoria` | TEXT | sim | — |
| `ativo` | BOOLEAN | sim | `true` |
| `created_at` | TIMESTAMPTZ | sim | `now()` |
| `updated_at` | TIMESTAMPTZ | sim | `now()` |

### Relacionamentos

Nenhum.

### Índices

```
(ativo, categoria)   -- gatilho: > 500 benefícios
```

### RLS recomendada

**Esta é a tabela mais importante do banco do ponto de vista de RLS**, porque é a
única que contém dado que faz sentido restringir:

| Operação | Política |
| --- | --- |
| SELECT | `USING (ativo = true)` — mas **`codigo_promocional` não deveria estar aqui** |
| INSERT/UPDATE/DELETE | `tem_papel('admin')` |

O RLS do PostgreSQL filtra **linhas**, não **colunas**. Não dá para "mostrar o
benefício a todos e o código só a associados" com uma política. As saídas:

1. **Mover `codigo_promocional` para `clube_beneficios_codigos`**, com RLS
   `USING (tem_papel('associado'))`. Duas tabelas, uma política cada, e a vitrine
   segue pública.
2. Função `obter_codigo(beneficio_id)` com `SECURITY DEFINER`, que valida o papel.
3. `GRANT` por coluna — funciona, mas é fácil de contornar por engano e não é
   revisável no painel.

**Recomendação: opção 1.** É explícita e sobrevive a mudança de UI.

### Melhorias

- **Resolver o conflito modelo × tela.** A coluna se chama `parceiro` (esperando
  "MedStation"), mas a tela lista **categorias** ("Congressos e Eventos",
  "Equipamentos Estéticos"). Não é detalhe: define se um benefício é *uma empresa
  parceira* ou *uma categoria de vantagem* — e muda a tela inteira
  (`REQUISITOS.md` §7). **Decidir antes de migrar.**
- **`desconto TEXT` → estruturado.** Hoje aceita "Até 30% OFF", "20% OFF", "50%
  OFF". A tela afirma "40% desconto máx." e esse número **não pode ser calculado**
  a partir de texto livre. Sugestão: `desconto_valor NUMERIC` +
  `desconto_tipo` (percentual/fixo) + `desconto_texto` para o caso irregular.
- `validade` — benefício sem prazo é promessa eterna.
- `codigo_promocional` único por associado, se algum parceiro exigir rastreio.
- Usar `link` e `logo_url`, hoje ignorados: sem eles o benefício não é resgatável.

---

## 10. `galeria`

### Finalidade

Fotos de eventos. **Ociosa** — a tela usa seis imagens do Unsplash.

### Campos

| Campo | Tipo | Nulo | Default |
| --- | --- | --- | --- |
| `id` | UUID | não | `gen_random_uuid()` |
| `titulo` | TEXT | sim | — |
| `descricao` | TEXT | sim | — |
| `imagem_url` | TEXT | **não** | — |
| `album` | TEXT | sim | — |
| `data_foto` | DATE | sim | — |
| `ordem` | INT | sim | `0` |
| `created_at` | TIMESTAMPTZ | sim | `now()` |
| `updated_at` | TIMESTAMPTZ | sim | `now()` |

Única tabela cujo `titulo` é **nullable** — coerente: foto sem legenda é normal.

**Não tem `ativo`.**

### Relacionamentos

Nenhum. `album` é texto livre — deveria ser tabela ou apontar para
`eventos_parceiros`.

### Índices

```
(album, ordem)   -- gatilho: > 1.000 fotos
```

### RLS recomendada

| Operação | Política |
| --- | --- |
| SELECT | `USING (true)` |
| INSERT/UPDATE/DELETE | `tem_papel('admin')` |

Mesma ressalva de `documentos`: a proteção real da imagem é a política do bucket.
E vale lembrar da **LGPD** — foto de evento contém rosto de pessoa identificável.
Galeria pública de terceiros exige base legal e um canal de remoção a pedido.

### Melhorias

- **`album` como tabela** (`galeria_albuns`) ou FK para `eventos_parceiros`.
  Texto livre vai render "CIOSP 2026", "Ciosp 2026" e "CIOSP2026" como três
  álbuns.
- **`thumbnail_url` separado.** A tela atual reescreve a URL do Unsplash
  (`w=400&h=300` → `w=800&h=600`) — truque que **quebra no dia em que a fonte
  mudar** (`REQUISITOS.md` §8). Ou duas colunas, ou transformação do Storage.
- `largura`/`altura` para reservar espaço e evitar salto de layout.
- `ativo` para despublicar.
- `creditos` do fotógrafo.

---

## 11. `contatos`

### Finalidade

Mensagens do "Fale Conosco". **Ociosa** — o formulário não envia
(`REQUISITOS.md` §9). **É a única tabela de escrita pública do banco.**

### Campos

| Campo | Tipo | Nulo | Default | Coletado pela tela |
| --- | --- | --- | --- | --- |
| `id` | UUID | não | `gen_random_uuid()` | — |
| `nome` | TEXT | **não** | — | ✅ (sem estado) |
| `email` | TEXT | **não** | — | ✅ (sem estado) |
| `telefone` | TEXT | sim | — | ❌ |
| `assunto` | TEXT | sim | — | ❌ |
| `mensagem` | TEXT | **não** | — | ✅ (sem estado) |
| `lido` | BOOLEAN | sim | `false` | — |
| `created_at` | TIMESTAMPTZ | sim | `now()` | — |

**Única tabela sem `updated_at` e sem trigger** — correto: é log de entrada. Mas
`lido` é mutável, então há atualização sem rastro de quando ocorreu.

### Relacionamentos

Nenhum. `lido` não registra **quem** leu.

### Índices

**A única tabela que vai precisar de índice cedo**, porque cresce por escrita
pública:

```
(lido, created_at DESC)   -- gatilho: > 1.000 mensagens, ou já na triagem
```

### RLS recomendada

| Operação | Política atual | Recomendada |
| --- | --- | --- |
| INSERT | `WITH CHECK (true)` | Manter, **com rate limit** |
| SELECT | **inexistente** | `tem_papel('admin')` |
| UPDATE | inexistente | `tem_papel('admin')` (marcar como lido) |
| DELETE | inexistente | `tem_papel('admin')` |

**A ausência de SELECT está correta e é boa modelagem**: o app envia e não lê, e
mensagens de terceiros não devem vazar. Mas hoje **ninguém lê** — nem o app, nem
um painel (que não existe). Ou seja: a mensagem entra e morre.

**Risco real:** `INSERT WITH CHECK (true)` sem limite é um endpoint aberto de
escrita, com a chave anon extraível do APK. Um script insere milhões de linhas e o
custo é seu. **Isso precisa ser resolvido antes de ligar o formulário, não
depois.**

Mitigações, em ordem de preferência:

1. Insert via **Edge Function** com rate limit por IP e validação (a chave anon
   perde o `INSERT` direto).
2. Captcha/Turnstile no cliente, validado no servidor.
3. `CHECK` de tamanho (`length(mensagem) BETWEEN 10 AND 5000`) — barra o caso
   trivial, não um script.

### Melhorias

- **Resolver quem lê.** Sem painel nem política de SELECT, a tabela é um ralo.
  Alternativa barata: trigger → Edge Function → e-mail para
  `contato@abrahof.com.br`. Assim a mensagem chega a um humano sem depender de
  painel.
- Coletar `telefone` e `assunto` — o modelo já prevê.
- `respondido_em`, `respondido_por` para triagem real.
- `CHECK` de formato de e-mail.
- **LGPD**: mensagem contém dado pessoal. Definir prazo de retenção e expurgo —
  guardar para sempre "porque é barato" é passivo.

---

## 12. `patrocinadores`

### Finalidade

Empresas apoiadoras. **Ociosa** — dez empresas fixas, **todas exibindo o logo da
ABRAHOF**.

### Campos

| Campo | Tipo | Nulo | Default |
| --- | --- | --- | --- |
| `id` | UUID | não | `gen_random_uuid()` |
| `nome` | TEXT | **não** | — |
| `descricao` | TEXT | sim | — |
| `logo_url` | TEXT | sim | — |
| `site_url` | TEXT | sim | — |
| `categoria` | TEXT | sim | — |
| `ordem` | INT | sim | `0` |
| `ativo` | BOOLEAN | sim | `true` |
| `created_at` | TIMESTAMPTZ | sim | `now()` |
| `updated_at` | TIMESTAMPTZ | sim | `now()` |

### Relacionamentos

Nenhum — mas **deveria haver**: `eventos_parceiros.organizador` é texto livre e
frequentemente é um patrocinador; `clube_beneficios.parceiro` também. **Três
tabelas guardam a mesma empresa, em texto solto, sem se conhecerem.**

### Índices

```
(ativo, ordem)   -- gatilho: > 500 patrocinadores
```

### RLS recomendada

| Operação | Política |
| --- | --- |
| SELECT | `USING (ativo = true)` |
| INSERT/UPDATE/DELETE | `tem_papel('admin')` |

### Melhorias

- **`categoria` como nível de patrocínio** (master/ouro/prata), com ordenação e
  destaque proporcionais. É o que quem paga espera — e a coluna já existe, vazia.
- **Considerar uma tabela `parceiros` única**, referenciada por
  `patrocinadores`, `eventos_parceiros.organizador` e `clube_beneficios`. Hoje,
  corrigir o nome de uma empresa exige três `UPDATE` em três tabelas, por texto.
- **`logo_url` é o gargalo real** — e não é técnico: os logos não existem
  (`REQUISITOS.md` §10). Enquanto não chegarem, exibir o nome é mais honesto que o
  logo errado.
- `cliques INT` ou tabela de eventos para provar retorno na renovação de contrato
  (com aviso de privacidade e declaração nas lojas).
- `contrato_inicio`/`contrato_fim` — patrocínio expira, e `ativo` manual será
  esquecido.

---

## 13. `advogados_parceiros`

### Finalidade

Advogados parceiros. **Ociosa — e a tela nunca existiu.**

### Campos

| Campo | Tipo | Nulo | Default |
| --- | --- | --- | --- |
| `id` | UUID | não | `gen_random_uuid()` |
| `nome` | TEXT | **não** | — |
| `oab` | TEXT | sim | — |
| `especialidade` | TEXT | sim | — |
| `descricao` | TEXT | sim | — |
| `telefone` | TEXT | sim | — |
| `email` | TEXT | sim | — |
| `foto_url` | TEXT | sim | — |
| `ativo` | BOOLEAN | sim | `true` |
| `created_at` | TIMESTAMPTZ | sim | `now()` |
| `updated_at` | TIMESTAMPTZ | sim | `now()` |

Quase idêntica a `telemedicina`/`teleodontologia`. Diferenças: tem `oab`, não tem
`link_agendamento`, e o nome da coluna é `nome` em vez de `profissional`.

### Relacionamentos

Nenhum.

### Índices

```
(ativo, especialidade)   -- gatilho: > 500 advogados
```

### RLS recomendada

Igual a `telemedicina` — **incluindo o alerta de LGPD**: telefone, e-mail e foto
de pessoa física expostos por `USING (true)`.

### Melhorias

- **Unificar com `telemedicina`/`teleodontologia`** numa tabela `profissionais`
  com `area` e `registro_conselho` (que acomoda OAB, CRM e CRO).
- `UNIQUE (oab)` se a OAB for identificador.
- `estado`/`cidade` — advogado atende por região, e é assim que se busca.

---

## 14. Tabelas ausentes

O schema não tem **nenhuma** modelagem de usuário. Isto não é lacuna de detalhe:
é o que impede autenticação, notificações e pagamentos.

### 14.1 `perfis` — bloqueia autenticação

Sem ela não há papel, não há `tem_papel()` e **nenhuma política RLS deste
documento pode ser escrita**.

Forma esperada: `id UUID` referenciando `auth.users(id) ON DELETE CASCADE`, mais
`nome`, `registro_conselho`, `telefone`, `avatar_url`, `created_at`. Populada por
trigger em `auth.users`.

### 14.2 `papeis_usuario` — bloqueia administração

Papel em tabela separada, **não em coluna de `perfis`**. O motivo é concreto: se o
papel vive numa linha que o próprio usuário pode atualizar, ele se promove a
admin. Tabela separada, sem política de escrita para o usuário, e leitura via
função `SECURITY DEFINER`:

```
tem_papel(usuario UUID, papel papel_app) → BOOLEAN
```

É essa função que as políticas acima chamam.

### 14.3 `dispositivos` — bloqueia notificações

Token de push por dispositivo (`ARQUITETURA.md` §14): `token` (único),
`plataforma`, `usuario_id` (nullable — visitante também recebe aviso de evento),
`ativo`, `ultimo_uso`.

### 14.4 `assinaturas` — só se a decisão §15 for vender no app

Estado da assinatura vindo por **webhook** da loja. **Nunca confiar no cliente**
para determinar direito de acesso.

### 14.5 Provável: `associados`

Se "associado" for quem pagou anuidade, o app precisa saber disso — e essa
informação **hoje vive fora**, no sistema de adesão do site. Nenhum documento do
projeto mapeia essa integração, e ela é pré-requisito de qualquer conteúdo
exclusivo.

---

## 15. Problemas transversais

### 15.1 Nenhum `CHECK`, nenhum `UNIQUE`

O banco não tem **uma** constraint de validação. Qualquer texto entra em qualquer
campo: e-mail inválido em `contatos.email`, `tamanho_bytes` negativo, `data_fim`
anterior a `data_inicio`, `ordem` repetida.

Validação de cliente é conveniência; **a garantia é do banco**. E o cliente aqui
não valida nada (`REQUISITOS.md` §2 e §9).

### 15.2 Texto livre onde o negócio precisa de estrutura

| Coluna | Hoje | Consequência |
| --- | --- | --- |
| `eventos_parceiros.descricao` | tipo do evento | filtros nunca funcionaram |
| `clube_beneficios.desconto` | "Até 30% OFF" | "40% máx." não é calculável |
| `academy_cursos.carga_horaria` | "2h" / "120 min" | não ordena, não soma |
| `academy_aulas.duracao` | idem | idem |
| `galeria.album` | nome digitado | álbuns duplicados |
| `eventos_parceiros.local` | endereço solto | "27 estados" não é calculável |

**Padrão:** todo número que a tela promete (estatísticas) sai de uma coluna de
texto — por isso são fixos no código.

### 15.3 Entidades repetidas sem chave

`organizador`, `parceiro`, `autor`, `instrutor`, `profissional` são texto livre em
tabelas diferentes. A mesma pessoa ou empresa aparece várias vezes, escrita de
formas diferentes, sem relação entre si.

### 15.4 `ativo` inconsistente

Oito tabelas têm `ativo`; `documentos`, `revista_aos` e `galeria` não têm.
`transmissoes` tem `DEFAULT false`; as outras, `true`. Não há padrão — e cada
exceção vira um "por que isso não aparece?".

### 15.5 RLS de leitura sem contrapartida de escrita

Doze tabelas leem para todo mundo e nenhuma aceita escrita. É seguro, mas
significa que **todo conteúdo depende do painel do Supabase**. Não existe painel
administrativo, e criá-lo exige políticas que não existem.

---

## 16. Ordem recomendada

Alinhada a `ARQUITETURA.md` §11, com o que o banco exige antes:

| # | Ação | Por quê |
| --- | --- | --- |
| 1 | **`eventos_parceiros.tipo`** | Destrava os filtros; a tela já os desenha |
| 2 | **Decidir `clube_beneficios`: parceiro ou categoria?** | Muda a tela; não dá para migrar sem resposta |
| 3 | **`transmissoes`: `idioma` + `palestrante`** | A tela exibe, a tabela não guarda |
| 4 | Migrar leitura simples (documentos, galeria, patrocinadores, benefícios) | Maior ganho, menor risco — o modelo já existe |
| 5 | **Bucket + arquivos reais** | `documentos` sem Storage não tem função |
| 6 | **`contatos`: rate limit + destino da mensagem** | Endpoint público de escrita; não ligar antes |
| 7 | Unificar `telemedicina`/`teleodontologia`/`advogados_parceiros` | Antes de escrever três telas iguais |
| 8 | `perfis` + `papeis_usuario` + `tem_papel()` | Depende da decisão §17.1 |
| 9 | Revisar RLS com papéis | Só faz sentido depois de 8 |
| 10 | `dispositivos` | Fase de notificações |

Os itens 1–3 são **correções de modelo** e devem vir **antes** da migração das
telas correspondentes. Migrar primeiro e corrigir depois significa reescrever
serviço, tela e dados.

---

## Resumo

| Achado | Impacto |
| --- | --- |
| **13 tabelas**, 3 usadas | 10 telas prontas no banco esperando código |
| Nenhuma tabela de usuário/papel | Bloqueia auth, admin e pagamentos |
| `eventos_parceiros` sem `tipo` | Filtros nunca puderam funcionar |
| `clube_beneficios`: parceiro vs. categoria | Conflito modelo × tela, não resolvido |
| `codigo_promocional` em tabela pública | Único dado que justifica login — hoje aberto |
| `contatos` com INSERT público sem limite | Vetor de spam; resolver antes de ligar |
| Dados pessoais com `USING (true)` | LGPD: telefone, e-mail e foto de terceiros |
| Zero `CHECK`/`UNIQUE`, cliente sem validação | Nada garante integridade |
| Três tabelas de profissionais idênticas | Triplica migration, política e tela |
| Zero índices | **Correto hoje** — criar só com volume |

**Conclusão:** o banco é o **melhor ativo** herdado da referência — coerente,
uniforme e mais completo que o app. As correções necessárias são poucas e
localizadas (`tipo`, `idioma`/`palestrante`, o conflito de `clube_beneficios`), e
todas ficam mais caras depois da migração. A ausência de modelagem de usuário não
é um defeito do schema: é o reflexo fiel de uma decisão de produto que ainda não
foi tomada (`ARQUITETURA.md` §17.1).
