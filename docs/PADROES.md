# Padrões de Código

Convenções em vigor no aplicativo mobile, extraídas do código já escrito — não
de intenção. Cada regra abaixo tem dez telas de lastro.

> **Data:** 16/07/2026 (escrito na auditoria visual)
> **Relacionados:** [`ARQUITETURA.md`](./ARQUITETURA.md) · [`DECISOES.md`](./DECISOES.md)

---

## 1. Nomes

| Elemento | Convenção | Exemplo |
| --- | --- | --- |
| Arquivo | kebab-case | `cartao-beneficio.tsx` |
| Componente | PascalCase, em português | `CartaoBeneficio` |
| Tela | `Tela` + seção | `TelaAcademy` |
| Hook | `use` + domínio em português | `useBeneficios` |
| Tipo | PascalCase, singular | `Beneficio`, `EventoParceiro` |
| Constante | SCREAMING_SNAKE_CASE | `CANAL_YOUTUBE`, `PADDING_TELA` |
| Estilos | `estilos`, via `StyleSheet.create` | `estilos.cartao` |

Domínio em português; APIs da plataforma mantêm o nome original (`onPress`,
`FlatList`, `useState`).

---

## 2. Camadas

```
app/            rota — uma linha, só reexporta a tela
funcionalidades/<x>/telas/         compõe a UI, consome hooks
funcionalidades/<x>/hooks/         estado; fronteira com o serviço
funcionalidades/<x>/componentes/   componentes exclusivos da seção
funcionalidades/<x>/tipos.ts       tipos do domínio
components/base|layout|feedback/   UI compartilhada
mocks/                             dados provisórios
constants/                         configuração (links, seções, tema do evento)
utilitarios/                       formatação pura
```

**Regras verificadas na auditoria:**

- **`app/` só contém rotas.** As 10 são `import { X } from '...'; export default X;`.
- **Nenhum componente visual importa `mocks/`.** Quem importa é o hook — ou a
  tela, para dados de configuração.
- **Nenhuma cor literal fora de `theme/`.** Zero ocorrências de hex ou `rgba()`.

---

## 3. Componentes

**Promoção, não antecipação.** Nasce em `funcionalidades/<x>/componentes/`; sobe
para `components/base/` quando a **segunda** funcionalidade precisar.

**Quando reaproveitar o `Cartao`:** anatomia horizontal — ícone à esquerda,
metadados, título, descrição. É o caso de Benefícios, Documentos e Contato.

**Quando criar componente próprio:** anatomia diferente. Academy (vertical, com
capa), Galeria (grade 4:3), Patrocinadores (marca centralizada), Eventos (bloco
de data), Início (ícone sobre rótulo). Forçar tudo no `Cartao` o transformaria
num contêiner para qualquer layout.

**Contrato:** recebe `props`, emite eventos, não busca dados, não conhece a
origem deles.

---

## 4. Listas

| Situação | Solução |
| --- | --- |
| Coleção que virá do banco | `FlatList` + `Tela rolavel={false}` |
| Conteúdo fixo e curto | `ScrollView` da `Tela` (padrão) + `.map()` |

**`FlatList` exige `rolavel={false}`** — aninhá-la no `ScrollView` da `Tela`
quebra a virtualização. Verificado nas 7 telas com lista.

Chave sempre estável (`id` slug), nunca índice.

---

## 5. Estados de tela

Três estados, e **erro nunca é vazio**: no projeto de referência a falha de
consulta cai no estado vazio, e o usuário lê "conteúdo em breve" quando o que
houve foi rede caída.

| Estado | Componente | Hoje |
| --- | --- | --- |
| Normal | a tela | ✅ |
| Vazio | `EstadoVazio` | ✅ |
| Carregando | `Carregamento` | Entra com o Supabase |
| Erro | `EstadoErro` | Entra com o Supabase |

`Carregamento` e `EstadoErro` existem sem uso **de propósito**: sobre um array
local não há espera nem falha, e simular qualquer uma seria fingir trabalho.

---

## 6. Dados provisórios

- Vivem em `mocks/`, **nunca dentro do componente**. Foi o array no componente
  que deixou seis telas estáticas na web mesmo com tabela pronta.
- O cabeçalho do arquivo diz **o que é real e o que é demonstração**.
- **Link público não é mock** → `constants/links.ts`.
- Sem URL privada, sem identificador de banco, sem dado pessoal.

---

## 7. Formatação

Formatação mora em `utilitarios/`, nunca no componente.

**Datas: sem `Date` e sem biblioteca.** `new Date("2026-01-20")` é lido como UTC
e, em GMT-3, retrocede para 19/01 — todo evento apareceria com o dia anterior.
Os utilitários fatiam a string ISO.

**Tamanho de arquivo:** o mock guarda bytes, como o banco; o utilitário formata
("2,4 MB", com vírgula).

---

## 8. Ações e links

**Nunca criar botão que não faz nada.** É o defeito mais comum do projeto de
referência (~25 elementos). Sem destino: elemento informativo, sem
`accessibilityRole="button"`.

**Link externo — padrão obrigatório** (Academy, Benefícios, Transmissão):

```
canOpenURL → openURL → catch → Alert de erro real
```

Sem `catch`, a falha vira rejeição não tratada e o toque não faz nada. `Alert`
só para erro real — nunca para simular funcionalidade futura.

---

## 9. Acessibilidade

- Todo tocável: `accessibilityRole`, `accessibilityLabel`, alvo de 44pt.
- **Não tocável não usa role de botão.**
- Cartão composto: `accessible` + rótulo corrido (`"CIOSP 2026. Congresso. 20 de
  janeiro de 2026…"`), com `importantForAccessibility="no-hide-descendants"` nos
  filhos — melhor que soletrar campos e ícones soltos.
- **Nunca só cor:** status, categoria e formato têm texto.
- Campo sempre com rótulo visível, e erro em texto.

---

## 10. Visual

- Todo valor visual vem de `@/theme`.
- **Sem medida presa a aparelho:** largura de grade sai de
  `useWindowDimensions`; proporção sai de `aspectRatio`, não de altura fixa.
- `cover` para foto (corte aceitável); `contain` para logo (nada pode sumir).
- Imagem ausente mostra marcador — nunca vão vazio.

### Cabeçalho

`marca` aparece **só na home e no login** — hub e entrada carregam identidade.
Nas seções, título e botão voltar bastam; repetir "ABRAHOF" em cada tela é
ruído. Divergência consciente do projeto de referência, que exibe o logo em
todas.

---

## 11. Verificação

Antes de entregar: `npm run lint`, `npx tsc --noEmit`, `npx expo-doctor`.

Os três são análise estática — **não executam o código**. Para mudança que mexe
em import, asset ou rota, `npx expo export --platform android` prova que o
bundle fecha. Utilitário com regra (data, tamanho, e-mail) merece ser exercitado
com casos de borda.

Sem commit e sem push automáticos.
