# PRD — Tela de Conversas (Inbox)

## 1) Contexto e Objetivo

A Tela de Conversas é o ponto de **retomada de interações** entre usuários que já iniciaram uma conversa após um match.
Diferente de uma inbox tradicional, **não exibe matches sem mensagens**, reforçando a regra de que **toda conversa deve ser iniciada exclusivamente na tela de Matches**.

**Objetivo principal**

* Permitir que o usuário visualize e continue **apenas conversas ativas**, com rapidez, clareza e confiança.

**Regras de negócio**

* A tela de Conversas **exibe somente conversas com pelo menos uma mensagem enviada**.
* Não é possível iniciar novas conversas nesta tela.
* Apenas usuários que possuem match podem trocar mensagens.

---

## 2) Personas e Cenários

### Persona primária

* Usuário que já deu matches e precisa **dar continuidade à negociação** (detalhes, disponibilidade, próximos passos).

### Cenários principais

1. Usuário entra para responder mensagens pendentes.
2. Usuário quer retomar uma conversa antiga.
3. Usuário entra pela primeira vez e ainda não iniciou nenhuma conversa.

---

## 3) Métricas de Sucesso (KPIs)

### Métrica principal

* Percentual de conversas com resposta em até 24h.

### Métricas complementares

* Taxa de abertura de conversa a partir da lista.
* Tempo médio para abertura de uma conversa após entrar na tela.
* Percentual de usuários em estado vazio que navegam para a tela de Matches.
* Média de conversas ativas por usuário.

---

## 4) Escopo

### In-scope (MVP)

* Listagem de conversas iniciadas.
* Ordenação por atividade mais recente.
* Indicador de mensagens não lidas.
* Preview da última mensagem.
* Navegação para a thread de conversa.
* Estados de loading, vazio e erro.

### Out-of-scope

* Iniciar conversa pela inbox.
* Busca, filtros, arquivar, silenciar ou bloquear.
* Envio de mídia, áudios ou anexos.
* Indicadores de digitação.
* Mensagens de sistema complexas.

---

## 5) Requisitos Funcionais

### RF1 — Exibição da lista de conversas

* A tela deve listar apenas conversas que possuam ao menos uma mensagem.
* Cada item da lista deve exibir:

  * Avatar do cavalo do match
  * Nome do cavalo
  * Localização curta (opcional)
  * Última mensagem (preview de uma linha)
  * Timestamp da última mensagem
  * Badge de mensagens não lidas (quando aplicável)

### RF2 — Ordenação

* As conversas devem ser ordenadas por atividade mais recente.
* Ao retornar da tela de chat, a lista deve refletir:

  * Atualização do preview da última mensagem
  * Atualização do contador de não lidas
  * Reordenação da conversa para o topo, se necessário

### RF3 — Abertura da conversa

* Ao tocar em um item da lista, o usuário deve ser direcionado para a thread correspondente.
* Caso a conversa não esteja mais disponível, deve ser exibida uma mensagem de erro amigável.

### RF4 — Estado vazio

Quando o usuário não possuir conversas iniciadas:

* Exibir mensagem clara informando que não há conversas.
* Informar que a primeira mensagem deve ser enviada pela tela de Matches.
* Exibir CTA primário “Ir para Matches”, que redireciona para essa tela.

### RF5 — Controle de acesso

* O usuário só pode acessar conversas das quais participa.
* Tentativas de acesso inválidas devem resultar em mensagem de erro e retorno à lista.

---

## 6) Requisitos Não Funcionais

* **Performance:** carregamento rápido da lista, com imagens lazy-loaded.
* **Confiabilidade:** conversas iniciadas não podem desaparecer da lista.
* **Acessibilidade:** navegação por teclado (web), contraste adequado e labels acessíveis.
* **Consistência visual:** alinhamento com o tema visual do produto.

---

## 7) UX/UI — Estrutura e Componentes

### Layout (mobile-first)

**Top bar**

* Título: “Conversas”

**Lista**

* Itens em formato de card ou row:

  * Avatar à esquerda
  * Nome e preview centralizados verticalmente
  * Timestamp e badge de não lidas à direita

**Restrições**

* Não deve existir botão ou affordance para “nova conversa”.

### Componentes principais

* ConversationList
* ConversationListItem
* UnreadBadge
* EmptyState (com CTA para Matches)
* ErrorState
* Skeleton de carregamento

### Estados da tela

1. Loading (skeleton)
2. Lista vazia (empty state + CTA)
3. Erro (mensagem + retry)
4. Lista populada

### Microcopy sugerida

* Título vazio: “Sem conversas ainda”
* Texto: “Para começar uma conversa, vá até Matches e envie sua primeira mensagem.”
* CTA: “Ir para Matches”

---

## 8) Fluxos Principais

### Fluxo A — Usuário com conversas

1. Usuário entra na tela de Conversas.
2. Visualiza lista ordenada por atividade.
3. Abre uma conversa.
4. Responde na thread.
5. Retorna à lista com conversa atualizada no topo.

### Fluxo B — Usuário sem conversas

1. Usuário entra na tela de Conversas.
2. Visualiza estado vazio.
3. Clica no CTA “Ir para Matches”.
4. Seleciona um match.
5. Envia a primeira mensagem.
6. A conversa passa a aparecer na tela de Conversas.

### Fluxo C — Erro

1. Usuário entra na tela.
2. Ocorre falha de carregamento.
3. Exibe mensagem de erro com opção de tentar novamente.

---

## 9) Riscos e Mitigações

### Risco: Confusão do usuário (esperar ver matches aqui)

* **Mitigação:** copy clara no estado vazio + CTA direto para Matches.

### Risco: Conversa não aparecer após primeira mensagem

* **Mitigação:** garantir atualização imediata da lista após criação da conversa.

### Risco: Inconsistência de ordenação

* **Mitigação:** atualizar atividade da conversa sempre que uma nova mensagem for enviada ou recebida.

---

## 10) Critérios de Aceite (Definition of Done)

* A tela lista apenas conversas iniciadas.
* A ordenação reflete corretamente a atividade mais recente.
* Cada item exibe avatar, nome, preview, timestamp e badge de não lidas.
* Estado vazio orienta claramente o usuário a ir para Matches.
* Estados de loading e erro estão implementados.
* A navegação para a thread funciona corretamente.
* A lista é atualizada ao retornar da conversa.
