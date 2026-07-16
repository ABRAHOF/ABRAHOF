# Análise do Projeto de Referência (Web)

Documento de análise do aplicativo web **Abrahof Connections**, localizado em
`C:\Users\Chama\Documents\ABRAHOF-REFERENCIA\Abrahof lovable`.

O projeto foi gerado na plataforma Lovable com React 18, Vite 5, TypeScript,
Tailwind, shadcn/Radix, React Router 6, TanStack Query e Supabase.

Este documento serve **somente como referência visual e funcional** para a
reconstrução mobile. Nenhum arquivo do projeto de referência foi alterado e
nenhum código, componente, CSS ou configuração deve ser copiado.

> **Data da análise:** 16/07/2026
> **Escopo:** 101 arquivos versionados (excluindo `node_modules`).

---

## 1. Telas existentes

O roteador declara **10 rotas** mais um catch-all. Todas as telas ficam em
`src/pages/`.

| Rota | Arquivo | Título exibido | Dados |
| --- | --- | --- | --- |
| `/` | `Index.tsx` | ABRAHOF | Estático |
| `/login` | `Login.tsx` | ENTRAR | Estático |
| `/transmissao` | `Transmissao.tsx` | TRANSMISSÃO | Estático |
| `/academy` | `Academy.tsx` | Academy ABRAHOF | **Supabase** |
| `/eventos-parceiros` | `EventosParceiros.tsx` | Eventos Parceiros | **Supabase** |
| `/documentos` | `Documentos.tsx` | DOCUMENTOS | Estático |
| `/clube-beneficios` | `ClubeBeneficios.tsx` | Clube de Benefícios | Estático |
| `/galeria` | `Galeria.tsx` | GALERIA | Estático (Unsplash) |
| `/contato` | `Contato.tsx` | FALE CONOSCO | Estático |
| `/patrocinadores` | `Patrocinadores.tsx` | PATROCINADORES | Estático |
| `*` | `NotFound.tsx` | 404 | Estático |

---

## 2. Objetivo de cada tela

**Início (`/`)** — Hub de navegação do aplicativo. Exibe o selo de chancela, o
título "ABRAHOF", a tarja "20 a 25 de Janeiro | CIOSP 2026", um botão de destaque
para a Transmissão e uma grade de 3 colunas com 15 atalhos. Fecha com um selo
"APLICATIVO OFICIAL".

**Login (`/login`)** — Formulário de acesso com e-mail e senha, alternância de
visibilidade da senha, link "Esqueci minha senha" e botão "Cadastrar".

**Transmissão (`/transmissao`)** — Grade de programação dos podcasts ao vivo do
CIOSP 2026. Cada card traz data/hora, idioma (PT/EN), nome do palestrante, título
e descrição. Encerra com link para o canal no YouTube.

**Academy (`/academy`)** — Catálogo de cursos e aulas em vídeo para profissionais
de HOF. Cursos em grade de 2 colunas e aulas em lista; ambos abrem o vídeo no
YouTube.

**Eventos Parceiros (`/eventos-parceiros`)** — Agenda de eventos chancelados pela
ABRAHOF, com cartão de estatísticas, filtros por tipo, lista de eventos com
data/local e CTA "Solicitar Chancela".

**Documentos (`/documentos`)** — Lista de materiais para download (programação,
certificado, manual do expositor, mídia kit, regulamento), com título, descrição,
tamanho e botão de download.

**Clube de Benefícios (`/clube-beneficios`)** — Catálogo de 10 vantagens para
associados, com categoria e percentual de desconto, cartão de estatísticas e CTA
"Quero ser Associado" apontando para a página de adesão.

**Galeria (`/galeria`)** — Grade 2 colunas de fotos de eventos com lightbox em
tela cheia.

**Fale Conosco (`/contato`)** — Dados de contato (e-mail, telefone, endereço),
formulário de mensagem e ícones de redes sociais.

**Patrocinadores (`/patrocinadores`)** — Grade 2 colunas com 10 empresas
apoiadoras e CTA "Entre em contato".

**NotFound (`*`)** — Página 404. Único texto em inglês do aplicativo
("Oops! Page not found").

---

## 3. Componentes reutilizáveis

### Componentes próprios do projeto

| Componente | Arquivo | Função |
| --- | --- | --- |
| `MobileLayout` | `components/layout/MobileLayout.tsx` | Casca das telas: fundo em degradê, header e navegação inferior opcionais (`showHeader`, `showNav`) |
| `MobileHeader` | `components/ui/MobileHeader.tsx` | Cabeçalho fixo: botão de menu, logo centralizado, sino de notificações |
| `BottomNav` | `components/ui/BottomNav.tsx` | Barra inferior fixa com três ações: voltar, início, login |
| `MenuCard` | `components/ui/MenuCard.tsx` | Cartão quadrado do menu: ícone sobre fundo em degradê e rótulo |
| `NavLink` | `components/NavLink.tsx` | Wrapper do NavLink do React Router. **Não é usado por nenhuma tela** |

### Componentes locais (definidos dentro das próprias páginas)

`PodcastCard` (Transmissão), `CourseCard` (Academy), `BenefitCard` (Clube de
Benefícios), `DocumentCard` (Documentos), `EventCard` (Eventos Parceiros) e
`SponsorCard` (Patrocinadores). Nenhum deles foi extraído para um módulo
compartilhado, embora sigam o mesmo padrão de cartão.

### Biblioteca de UI

`src/components/ui/` contém **~50 componentes shadcn/Radix** (accordion, dialog,
carousel, table, sidebar, chart etc.). Apenas `Card`, `Badge`, `Input` e
`Textarea` são efetivamente usados pelas telas. **Nada disso será reaproveitado**
— o mobile usa componentes React Native próprios.

---

## 4. Estrutura de navegação

Navegação plana, sem rotas aninhadas, sem layouts por rota e **sem nenhuma
proteção de rota**. Todas as telas são públicas, inclusive as descritas como
"Área Restrita".

A navegação acontece por três caminhos:

1. **Grade da tela inicial** — 15 atalhos, sendo 13 internos e 2 externos.
2. **Barra inferior** (`BottomNav`) — presente em todas as telas: voltar
   (desabilitado na home), início e login.
3. **Cabeçalho** (`MobileHeader`) — botão de menu e sino de notificações, ambos
   **sem ação implementada**.

### Divergência entre menu e roteador

O menu da tela inicial aponta para **5 rotas que não existem** no roteador. Todas
caem no 404:

- `/telemedicina`
- `/teleodontologia`
- `/advogados-parceiros`
- `/whatsapp`
- `/cadastro` (acessado pelo botão "Cadastrar" da tela de Login)

### Nomes de rota divergentes do app mobile atual

| Referência (web) | Mobile atual |
| --- | --- |
| `/clube-beneficios` | `/beneficios` |
| `/eventos-parceiros` | `/eventos` |

---

## 5. Assets importantes

| Asset | Caminho | Tamanho | Uso |
| --- | --- | --- | --- |
| Logo ABRAHOF | `src/assets/abrahof-logo.png` | 57 KB | Header, Login (duplicado como se fosse o logo do CIOSP), cartões de Patrocinadores |
| Selo Chancela 2026 | `src/assets/selo-chancela.png` | 127 KB | Hero da Início e header de Eventos Parceiros |
| Favicon | `public/favicon.ico` | 20 KB | Apenas web |
| Placeholder | `public/placeholder.svg` | 3 KB | Não referenciado no código |

**Tipografia:** Poppins (pesos 400–800), carregada via Google Fonts. No mobile
precisará ser empacotada como fonte local.

**Imagens remotas:** a Galeria usa 6 fotos do Unsplash como placeholder; os
cartões de Patrocinadores reutilizam o logo da ABRAHOF no lugar das marcas reais.
Nenhum logo de patrocinador existe no repositório.

---

## 6. Integrações existentes

| Integração | Onde | Situação |
| --- | --- | --- |
| Supabase | `integrations/supabase/client.ts` | Ativo em 2 telas |
| TanStack Query | `App.tsx` | Ativo, só para as consultas do Supabase |
| YouTube | Transmissão, Academy | Links externos (`@abrahof_oficial` e vídeos de aula) |
| Site institucional | Início, Clube de Benefícios | `abrahof.org.br` e `abrahof.org.br/adesao/` |
| Revista AOS | Início | `ahof.emnuvens.com.br` (com parâmetros UTM) |
| Unsplash | Galeria | Imagens placeholder |
| Google Fonts | `index.css` | Fonte Poppins |

O cliente Supabase lê `VITE_SUPABASE_URL` e `VITE_SUPABASE_PUBLISHABLE_KEY` de
variáveis de ambiente e usa `localStorage` para persistir sessão — ambos
inaplicáveis no React Native.

> **Atenção:** existe um arquivo `.env` versionado no projeto de referência com a
> URL e a chave do Supabase. Essas credenciais **não devem ser copiadas** para o
> projeto mobile.

**Não existem** integrações de pagamento, notificações push, analytics ou
crash reporting.

---

## 7. Funcionalidades que utilizam Supabase

O banco define **13 tabelas**, mas o código consome apenas **3**.

### Efetivamente consumidas

| Tela | Tabela | Consulta |
| --- | --- | --- |
| Academy | `academy_cursos` | filtra `ativo = true`, ordena por `ordem` |
| Academy | `academy_aulas` | ordena por `ordem`; agrupa por `curso_id` no cliente |
| Eventos Parceiros | `eventos_parceiros` | filtra `ativo = true`, ordena por `data_evento` |

### Tabelas existentes, porém não utilizadas

`transmissoes`, `revista_aos`, `telemedicina`, `teleodontologia`, `documentos`,
`clube_beneficios`, `galeria`, `contatos`, `patrocinadores`,
`advogados_parceiros`.

Ou seja: **Transmissão, Documentos, Clube de Benefícios, Galeria, Patrocinadores
e Contato têm tabela pronta no banco, mas a tela usa dados fixos no código.**

### Segurança (RLS)

Todas as 13 tabelas têm Row Level Security habilitado. Doze delas expõem
`SELECT USING (true)` — leitura pública, sem autenticação. A tabela `contatos`
permite `INSERT WITH CHECK (true)` e **não possui política de SELECT**, portanto
mensagens podem ser enviadas por qualquer um mas não lidas pelo app.

**Não existe** tabela de usuários, perfis, papéis (roles), associados,
pagamentos ou permissões. Nenhuma política de escrita além de `contatos`.

---

## 8. Funcionalidades apenas estáticas

Conteúdo fixo no código (arrays literais dentro do componente):

- **Transmissão** — 5 podcasts com palestrantes, datas e idiomas.
- **Documentos** — 5 documentos com tamanhos declarados (2.4 MB, 890 KB…), mas
  sem nenhum arquivo real; o botão de download não faz nada.
- **Clube de Benefícios** — 10 benefícios com descontos e categorias.
- **Patrocinadores** — 10 empresas, todas exibindo o logo da ABRAHOF.
- **Galeria** — 6 fotos do Unsplash.
- **Contato** — e-mail, telefone e endereço fixos.
- **Estatísticas** — os números de Eventos ("25+ eventos/ano", "15 parceiros",
  "27 estados") e do Clube ("50+ parceiros", "40% desconto máx.", "∞ uso
  ilimitado") são texto fixo, não calculados.
- **Sino de notificações** — o badge exibe "2" fixo no código.

---

## 9. Regras de negócio encontradas

O projeto é essencialmente vitrine; as poucas regras identificáveis são:

1. **Conteúdo ativo** — cursos e eventos só aparecem com `ativo = true`
   (`transmissoes` tem default `false`; as demais, `true`).
2. **Ordenação** — cursos e aulas por campo `ordem`; eventos por `data_evento`
   crescente (não há filtro de eventos passados).
3. **Vínculo curso-aula** — `academy_aulas.curso_id` referencia
   `academy_cursos` com `ON DELETE CASCADE`; o card do curso abre o vídeo da
   **primeira aula** da lista.
4. **Curso sem vídeo** — cursos sem aula com `video_url` ficam esmaecidos e não
   clicáveis; o primeiro curso da lista sempre recebe o selo "Novo"
   (regra posicional, não um campo do banco).
5. **Inscrição em evento** — com `link_inscricao` exibe "Inscrever" (link
   externo); sem ele, exibe "Detalhes" (botão sem ação).
6. **Fallbacks** — instrutor vazio vira "ABRAHOF"; local vazio vira "A definir";
   descrição do evento vazia vira "Evento".
7. **Categorização de eventos** — o campo `descricao` é usado como *tipo* do
   evento (Congresso, Simpósio, Workshop…), acumulando duas funções.
8. **Navegação** — o botão "voltar" é desabilitado na tela inicial.
9. **Público-alvo** — o conteúdo gira em torno do CIOSP 2026 (20 a 25 de
   janeiro) e do público de Harmonização Orofacial.

**Não há** regra de associado x visitante, hierarquia de acesso, validação de
formulário, cálculo de preço ou qualquer lógica de cobrança.

---

## 10. Funcionalidades incompletas

Esta é a parte mais relevante da análise. O projeto de referência está
**substancialmente inacabado**:

| Item | Situação |
| --- | --- |
| **Login** | `handleLogin` apenas faz `console.log` e tem comentário `// TODO: Implement actual login`. Não autentica |
| **Cadastro** | Botão navega para `/cadastro`, rota inexistente → 404 |
| **Esqueci minha senha** | Botão sem `onClick` |
| **Área Restrita** | Leva ao Login; não protege nada |
| **Telemedicina** | Tabela no banco, item no menu, **tela inexistente** → 404 |
| **Teleodontologia** | Tabela no banco, item no menu, **tela inexistente** → 404 |
| **Advogados Parceiros** | Tabela no banco, item no menu, **tela inexistente** → 404 |
| **WhatsApp** | Item no menu aponta para `/whatsapp` (rota interna, não link) → 404 |
| **Revista AOS** | Tabela no banco não usada; menu abre site externo |
| **Formulário de contato** | Sem `onSubmit`, sem validação; tabela `contatos` nunca recebe dados |
| **Redes sociais** | Quatro botões sem `onClick` |
| **Download de documentos** | Botão sem ação; nenhum arquivo real |
| **"Ver mais documentos"** | Link `href="#"` |
| **Menu (hambúrguer)** | `onMenuClick` opcional, nunca fornecido pelo layout |
| **Notificações** | Sino com contador "2" fixo, sem tela nem lógica |
| **Filtros de eventos** | Pills renderizadas; "Todos" fixo como ativo, sem filtragem |
| **"Ver calendário"** | Botão sem ação |
| **"Solicitar Chancela"** | Botão sem ação |
| **"Entre em contato" (Patrocinadores)** | Botão sem ação |
| **Transmissão** | Tabela `transmissoes` (com `url_stream`) não usada; a tela é uma grade estática, sem player |
| **Galeria** | Fotos do Unsplash; tabela `galeria` não usada |
| **Logos de patrocinadores** | Todos exibem o logo da ABRAHOF |
| **Logo do CIOSP** | A tela de Login mostra o logo da ABRAHOF duas vezes |
| **Testes** | `src/test/example.test.ts` é o exemplo padrão; nenhuma cobertura real |
| **Metadados** | `index.html` mantém título "Lovable App" e TODOs do template |

---

## 11. O que deve ser reconstruído no mobile

### Prioridade alta — estrutura e conteúdo já definidos

1. **Design system em React Native** — tokens de cor, tipografia Poppins,
   espaçamentos e raios (ver "Pontos de atenção" abaixo sobre os nomes das
   cores).
2. **Casca de navegação** — equivalente ao `MobileLayout`: header com logo,
   barra inferior e tratamento de Safe Area (o projeto web não tem esse
   conceito).
3. **Cartão de menu e grade da tela inicial** — 15 atalhos, hero com selo,
   CTA de Transmissão.
4. **Componente de cartão genérico** — os seis cartões locais das páginas
   (`PodcastCard`, `CourseCard`, `BenefitCard`, `DocumentCard`, `EventCard`,
   `SponsorCard`) compartilham a mesma anatomia: ícone/miniatura à esquerda,
   bloco de texto, ação à direita. No mobile devem virar **um componente
   parametrizável**, não seis.
5. **As 10 telas existentes**, com dados mockados nesta etapa.

### Prioridade média — telas ausentes na web, mas previstas

6. **Telemedicina**, **Teleodontologia** e **Advogados Parceiros** — o banco já
   define a estrutura (profissional, especialidade, contato, link de
   agendamento). São telas de listagem de profissionais.
7. **WhatsApp** — deve ser link externo (`Linking`), não uma rota.
8. **Revista AOS** — hoje é link externo; a tabela sugere leitor de PDF no app.
9. **Cadastro** e **recuperação de senha**.

### Prioridade baixa — depende de decisão de produto

10. **Autenticação real** e definição do que é "Área Restrita".
11. **Notificações** — hoje só existe o ícone.
12. **Envio do formulário de contato** para a tabela `contatos`.
13. **Player de transmissão ao vivo** — a tabela `transmissoes` prevê
    `url_stream`, mas nunca foi implementado.

### Não reconstruir

- Biblioteca shadcn/Radix (~50 componentes, dos quais 4 são usados).
- `NavLink.tsx` (não utilizado).
- Tela 404 no formato atual — o Expo Router tem `+not-found`.
- Configurações de Vite, Tailwind, PostCSS.
- Animações escalonadas por `animationDelay` em cada item — o padrão web
  (`delay = index * 50ms`) é custoso de reproduzir fielmente e deve ser
  reavaliado com `Animated`/Reanimated apenas onde agregar.

---

## Apêndice — Referência visual (tokens)

Valores extraídos de `src/index.css` e `tailwind.config.ts`, para servir de base
ao tema do mobile. O tema é **escuro por padrão** (não há modo claro real: o
bloco `.dark` repete os mesmos valores de `:root`).

| Papel | HSL | Aproximação |
| --- | --- | --- |
| Fundo | `210 50% 12%` | Azul-marinho profundo |
| Superfície (card) | `210 45% 16%` | Marinho um tom acima |
| Primária | `195 85% 50%` | Ciano |
| Sobre primária | `210 50% 10%` | Marinho quase preto |
| Secundária | `210 40% 22%` | Marinho médio |
| Texto | `200 20% 95%` | Quase branco |
| Texto suave | `210 20% 55%` | Cinza-azulado |
| Borda | `210 35% 24%` | Marinho claro |

**Degradês e sombras**

- Fundo de tela: vertical, `210 50% 14%` → `210 55% 8%`.
- Destaque (botões, ícones): diagonal 135°, `195 85% 50%` → `195 80% 40%`.
- Texto em degradê (títulos): 135°, `195 85% 50%` → `195 90% 60%`.
- Sombra de destaque: ciano a 40% de opacidade, deslocamento 4px, blur 20px.

**Outros valores**

- Raio base: `1rem` (16px); cards usam `2xl` (24px); pílulas usam raio total.
- Fonte: Poppins 400/500/600/700/800.
- Animações: `fade-in` (0.5s), `scale-in` (0.3s), `slide-up` (0.6s) e
  `pulse-cyan` (2s, em laço no botão de Transmissão).

> **Armadilha de nomenclatura:** as classes chamam-se `gradient-gold`,
> `shadow-gold` e `text-gradient-gold`, mas **não há nenhum dourado** — todas
> produzem ciano. O mesmo vale para `gradient-forest`, que produz azul-marinho.
> São nomes herdados de um tema anterior. No mobile os tokens devem ser nomeados
> pelo papel (`primaria`, `fundo`, `destaque`), nunca pela cor herdada.

---

## Mapa de correspondência (web → mobile)

| Tela web | Rota mobile atual | Situação |
| --- | --- | --- |
| `Index` | `/` | Criada (menu com 8 seções) |
| `Login` | `/login` | Criada (visual) |
| `Transmissao` | `/transmissao` | Criada (vazia) |
| `Academy` | `/academy` | Criada (vazia) |
| `EventosParceiros` | `/eventos` | Criada (vazia) — **nome divergente** |
| `Documentos` | `/documentos` | Criada (vazia) |
| `ClubeBeneficios` | `/beneficios` | Criada (vazia) — **nome divergente** |
| `Galeria` | `/galeria` | Criada (vazia) |
| `Contato` | `/contato` | Criada (vazia) |
| `Patrocinadores` | `/patrocinadores` | Criada (vazia) |
| — | — | **Faltam:** Telemedicina, Teleodontologia, Advogados Parceiros, Revista AOS, Cadastro |
