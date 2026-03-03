# PRD — Tela de Matches (Conexões)

### 1. Visão Geral

A **Tela de Matches (Conexões)** exibe as conexões (likes mútuos) do usuário e serve como atalho para **iniciar conversas** com o menor atrito possível. Ao tocar em um match, o app navega para a **Tela de Conversas** com aquele match selecionado, abrindo uma conversa existente ou preparando uma nova conversa para iniciar.

### 2. Requisitos

#### Estrutura e exibição da tela

* **Header com título e contador de novos**

  **Descrição:** Exibir o título “Matches” e um contador opcional “X novos” apenas quando X > 0.

  ##### Regras de Negócio

  * **Exibição do contador:** Mostrar “X novos” somente se existir ao menos 1 match com status “Novo”.
  * **Atualização do contador:** Ao um match deixar de ser “Novo”, o contador deve refletir o novo total imediatamente.

  ##### Regras de UI/UX (se houver)

  * **Título:** “Matches”.
  * **Contador:** “X novos” visível apenas quando X > 0.
  * **Acessibilidade:** Leitor de tela deve anunciar título e, se presente, o contador.

* **Lista única com agrupamento visual “Novos” e “Todos”**

  **Descrição:** Exibir uma lista única com dois agrupamentos visuais: “Novos” (não vistos) no topo e “Todos” (restante) abaixo, podendo ter títulos de seção para clareza.

  ##### Regras de Negócio

  * **Definição de agrupamento:**

    * “Novos” = matches com status “Novo”
    * “Todos” = matches sem status “Novo”
  * **Manter lista única:** Deve ser uma única lista (sem abas), apenas com separação visual.

  ##### Regras de UI/UX (se houver)

  * **Títulos de seção:** “Novos” e “Todos” (quando aplicável) para orientar o usuário.
  * **Scroll/paginação:** Suportar rolagem longa e paginação/scroll infinito se necessário.
  * **Performance visual:** Placeholder e cache de imagens para evitar “layout shift”.

#### Ordenação e estados

* **Ordenação por data do match (mais recente primeiro)**

  **Descrição:** Ordenar itens dentro de “Novos” e “Todos” por data do match em ordem decrescente.

  ##### Regras de Negócio

  * **Ordem em “Novos”:** data do match desc.
  * **Ordem em “Todos”:** data do match desc.

  ##### Regras de UI/UX (se houver)

  * **Consistência:** A ordem deve permanecer estável entre recarregamentos (exceto por novos matches recebidos).

* **Regra de “Novo” (persistente e removida apenas ao toque)**

  **Descrição:** Um match é “Novo” até o usuário tocar no item (abrir conversas com aquele match). Apenas visualizar a lista não remove o estado.

  ##### Regras de Negócio

  * **Critério de “Novo”:** status “Novo” permanece até ocorrer o evento de toque no item do match.
  * **Remoção do “Novo” após toque:** ao tocar:

    * remover badge “Novo”
    * atualizar contagem “X novos”
  * **Persistência:** Estado “Novo” deve ser consistente entre sessões e (quando aplicável) entre dispositivos.

  ##### Regras de UI/UX (se houver)

  * **Badge “Novo”:** visível apenas para matches com status “Novo”.
  * **Acessibilidade:** Badge deve ter contraste suficiente e ser anunciado pelo leitor de tela.

#### Item do match (card/row)

* **Exibição de informações no item do match**

  **Descrição:** Cada item de match deve exibir informações essenciais do cavalo e, opcionalmente, dados complementares.

  ##### Regras de Negócio

  * **Campos obrigatórios:** foto principal (thumbnail), nome, localização (Cidade/UF).
  * **Campos opcionais:** idade, texto de data relativa (“Conectaram há X dias”).
  * **Estado visual:**

    * Novo: com badge “Novo”
    * Visto: sem badge

  ##### Regras de UI/UX (se houver)

  * **Área de toque:** confortável (tap target adequado).
  * **Leitor de tela:** label combinando nome + localização (e demais infos se exibidas).
  * **Imagens:** cache + placeholder durante carregamento.

#### Interação principal (navegação para conversas)

* **Toque no match abre Conversas com o match selecionado**

  **Descrição:** Ao tocar em um match, navegar para a Tela de Conversas já com aquele match selecionado.

  ##### Regras de Negócio

  * **Se conversa existir:** abrir a conversa correspondente.
  * **Se conversa não existir:** abrir uma conversa pronta para iniciar (ex.: composer aberto e contexto do match carregado).
  * **Atualização do estado “Novo”:** após toque, o match deixa de ser “Novo”.

  ##### Regras de UI/UX (se houver)

  * **Feedback:** indicar carregamento ao abrir conversa (quando necessário) e tratar erros com mensagem amigável.
  * **Confiabilidade:** falhas ao abrir conversa devem ter fallback (ex.: tentar novamente / mensagem de erro).

#### Empty state

* **Empty state quando não há matches**

  **Descrição:** Se o usuário não tiver matches, mostrar mensagem e CTA para voltar ao feed.

  ##### Regras de Negócio

  * **Condição:** lista vazia (0 matches).
  * **CTA:** deve navegar para o Feed.

  ##### Regras de UI/UX (se houver)

  * **Mensagem:** “Sem matches ainda”.
  * **Texto auxiliar:** “Continue no feed para encontrar cavalos compatíveis”.
  * **CTA primário:** “Ir para o Feed”.

#### Requisitos não funcionais (dentro do template)

* **Performance, confiabilidade e acessibilidade mínimas**

  **Descrição:** Garantir performance de carregamento, consistência do estado “Novo” e acessibilidade básica.

  ##### Regras de Negócio

  * **Performance:** carregamento inicial rápido; suportar paginação/scroll infinito se necessário.
  * **Confiabilidade:** estado “Novo” persistente entre sessões e (se aplicável) entre dispositivos.
  * **Taxa de erro:** navegação para Conversas deve tratar falhas e não quebrar o fluxo do usuário.

  ##### Regras de UI/UX (se houver)

  * **Acessibilidade:** contraste no badge “Novo”, suporte a leitor de tela, áreas de toque confortáveis.
  * **Feedback:** estados de loading/erro/sucesso quando aplicável.
  * **Compatibilidade:** 🚧 Em construção (não especificado)
  * **Segurança:** 🚧 Em construção (não especificado)

### 3. Fluxo de Usuário (User Flow)

**Nome do fluxo:** Acessar matches e iniciar conversa

1. O usuário acessa a **Tela de Matches**.
2. O sistema carrega e exibe a lista em agrupamentos visuais:

   * “Novos” (se houver)
   * “Todos”
3. O usuário toca em um item de match.
4. O sistema valida se existe conversa com aquele match:

   * **Sucesso (conversa existe):** abre a conversa existente já selecionada.
   * **Sucesso (conversa não existe):** abre uma conversa pronta para iniciar (composer/contexto carregado).
   * **Falha:** exibe mensagem de erro e permite tentar novamente.
5. O sistema atualiza o estado do match tocado:

   * remove badge “Novo” (se existia)
   * atualiza o contador “X novos” (se exibido)

**Nome do fluxo:** Empty state (sem matches)

1. O usuário acessa a **Tela de Matches**.
2. O sistema valida que não há matches:

   * **Sucesso (0 matches):** exibe empty state.
3. O usuário toca no CTA “Ir para o Feed”.
4. O sistema navega para o **Feed**.

### 4. Fora do Escopo (Out of Scope)

* Arquivar/remover/desfazer match.
* Bloquear/denunciar.
* Filtros avançados, busca e ordenações complexas além do padrão definido.

---
