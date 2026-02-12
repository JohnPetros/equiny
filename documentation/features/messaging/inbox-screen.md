# PRD — Tela de Conversas (Inbox)

### 1. Visão Geral

A **Tela de Conversas (Inbox)** é o ponto de **retomada de interações** entre usuários que já iniciaram uma conversa após um match. Diferente de uma inbox tradicional, **não exibe matches sem mensagens**, reforçando a regra de que **toda conversa deve ser iniciada exclusivamente na tela de Matches**.

**Problema que resolve:** dar ao usuário um lugar rápido e confiável para **visualizar e continuar apenas conversas ativas**, sem confundir com a lista de matches.

**Objetivo principal e valor entregue:** permitir que o usuário **encontre e retome conversas com clareza**, com indicadores de atividade e mensagens não lidas, reduzindo atrito para responder e avançar na negociação.

---

### 2. Requisitos

#### Listagem de conversas iniciadas

* **Listagem de conversas iniciadas**

**Descrição:** Exibir uma lista apenas com conversas que já possuem pelo menos uma mensagem enviada.

##### Regras de Negócio

* **Filtro de conversas:** a tela deve exibir somente conversas com **≥ 1 mensagem**.
* **Restrição de início de conversa:** não é permitido iniciar novas conversas nesta tela.
* **Elegibilidade de conversa:** apenas usuários que possuem **match** podem trocar mensagens (logo, conversas só existem se houver match).
* **Controle de participação:** o usuário só pode visualizar conversas **das quais participa**.

##### Regras de UI/UX

* **Item de lista (conteúdo mínimo):** cada item deve exibir:
  * Avatar do cavalo do match
  * Nome do cavalo
  * Localização curta (opcional)
  * Preview da última mensagem (1 linha)
  * Timestamp da última mensagem
  * Badge de não lidas (quando aplicável)
* **Restrições:** não deve existir botão/affordance para “nova conversa”.
* **Performance:** carregamento rápido da lista; imagens com lazy-load.
* **Acessibilidade:** contraste adequado; labels acessíveis; navegação por teclado (web).
* **Confiabilidade:** conversas iniciadas não podem “sumir” da lista sem motivo; exibir estado de erro quando aplicável.

---

#### Ordenação por atividade recente

* **Ordenação por atividade recente**

**Descrição:** Garantir que as conversas apareçam ordenadas pela atividade mais recente e se atualizem ao voltar do chat.

##### Regras de Negócio

* **Critério de ordenação:** ordenar por **atividade mais recente**.
* **Atualização ao retornar do chat:** ao voltar da thread, a lista deve refletir:

  * Atualização do preview da última mensagem
  * Atualização do contador de não lidas
  * Reordenação para o topo quando houver nova atividade

##### Regras de UI/UX

* **Feedback de atualização:** ao retornar, a lista deve “parecer atualizada” imediatamente (sem flicker excessivo).
* **Consistência:** manter alinhamento com o tema visual do produto.

---

#### Abertura da thread de conversa

* **Abertura da thread de conversa**

**Descrição:** Permitir entrar na conversa ao tocar em um item e tratar casos em que a thread não está disponível.

##### Regras de Negócio

* **Navegação:** toque em um item direciona para a thread correspondente.
* **Conversa indisponível:** se a conversa não estiver mais disponível, exibir erro amigável e retornar para a lista.
* **Acesso inválido:** tentativas de acesso inválidas devem resultar em mensagem de erro e retorno à lista.

##### Regras de UI/UX

* **Mensagem amigável:** erro com linguagem clara e orientação do que fazer (ex.: voltar/tentar novamente).
* **Confiabilidade:** evitar loops de navegação em erro.

---

#### Estado vazio (sem conversas)

* **Estado vazio (sem conversas)**

**Descrição:** Quando o usuário não tiver conversas iniciadas, orientar claramente que a primeira mensagem deve ser enviada via Matches e oferecer CTA.

##### Regras de Negócio

* **Condição de vazio:** quando não existir conversa com **≥ 1 mensagem**, exibir estado vazio.
* **CTA obrigatório:** CTA primário “Ir para Matches” deve redirecionar para a tela de Matches.

##### Regras de UI/UX

* **Microcopy (sugerida):**

  * Título: “Sem conversas ainda”
  * Texto: “Para começar uma conversa, vá até Matches e envie sua primeira mensagem.”
  * CTA: “Ir para Matches”
* **Clareza:** reforçar que não dá para iniciar conversa pela Inbox (para evitar confusão).

---

#### Estados de loading e erro

* **Estados de loading e erro**

**Descrição:** Garantir estados consistentes para carregamento, falhas e tentativa de novo.

##### Regras de Negócio

* **Falha de carregamento:** quando houver erro ao carregar a lista, exibir estado de erro e permitir retry.
* **Não quebrar navegação:** o usuário deve conseguir retornar à lista após falhas.

##### Regras de UI/UX

* **Loading:** skeleton de carregamento.
* **Erro:** mensagem + botão “tentar novamente”.
* **Compatibilidade:** funcionar em mobile-first e ambientes suportados do produto.

---

### 3. Fluxo de Usuário (User Flow)

**Nome do fluxo:** Usuário com conversas ativas

1. O usuário acessa a **Tela de Conversas**.
2. O sistema carrega e exibe a lista **ordenada por atividade**.
3. O usuário toca em uma conversa.
4. O sistema abre a **thread**:

   * **Sucesso:** conversa é exibida.
   * **Falha:** conversa indisponível → exibe erro amigável e retorna à lista.
5. O usuário responde na thread.
6. O usuário retorna para a lista.
7. O sistema atualiza preview, não lidas e reordena a conversa (se aplicável).

---

**Nome do fluxo:** Usuário sem conversas

1. O usuário acessa a **Tela de Conversas**.
2. O sistema detecta ausência de conversas com mensagens.
3. O sistema exibe **estado vazio** com orientação + CTA “Ir para Matches”.
4. O usuário toca no CTA.
5. O sistema redireciona para **Matches**.
6. O usuário seleciona um match e envia a primeira mensagem.
7. A conversa passa a aparecer na Tela de Conversas.

---

**Nome do fluxo:** Erro ao carregar lista

1. O usuário acessa a **Tela de Conversas**.
2. Ocorre falha ao carregar.
3. O sistema exibe **ErrorState** com “tentar novamente”.
4. O usuário aciona retry.
5. O sistema:

   * **Sucesso:** exibe lista/estado vazio conforme aplicável.
   * **Falha:** mantém estado de erro.

---

### 4. Fora do Escopo (Out of Scope)

* Iniciar conversa pela inbox.
* Exibir matches sem mensagens nesta tela.
* Busca e filtros.
* Arquivar, silenciar ou bloquear conversas.
* Envio de mídia, áudios ou anexos.
* Indicadores de digitação.
* Mensagens de sistema complexas.

---

**Resumo do que entendi**

* A Inbox lista **somente conversas iniciadas (≥ 1 mensagem)**, serve para **retomar** e não para começar.
* Precisa de **ordenação por atividade**, **não lidas**, **preview**, **timestamp**, e bons **estados de loading/vazio/erro**.
* Estado vazio deve educar e levar o usuário para **Matches**.

**Sugestões de melhoria (opcionais)**

* Definir o que conta como “atividade” (enviada/recebida? inclui leitura?).
* Definir regra de “não lidas” (quando zera? ao abrir thread? ao marcar como lida no backend?).

**Posso registrar essa versão ou deseja ajustar algo?**
