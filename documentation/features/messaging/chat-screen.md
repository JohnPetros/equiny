# PRD — Tela de Chat

### 1. Visão Geral

A **Tela de Chat** permite que **dois donos** que deram match iniciem e mantenham uma conversa para avançar na negociação/combinação de próximos passos, com **contexto do cavalo do match** sempre acessível.

**Problema que resolve:** reduzir fricção para iniciar a conversa após o match e dar continuidade de forma simples, direta e confiável.

**Objetivo principal e valor entregue:** facilitar a **primeira mensagem**, acelerar a troca de informações essenciais (ex.: localização, disponibilidade, condições) e manter a conversa organizada, com acesso rápido ao perfil do cavalo do match.

---

### 2. Requisitos

#### Acesso ao chat somente com match

* **Acesso ao chat somente com match**

**Descrição:** Garantir que apenas usuários com match possam acessar e conversar, mantendo o chat sempre ancorado a um match existente.

##### Regras de Negócio

* **Elegibilidade:** só pode conversar quem deu **match**.
* **Participantes:** chat é entre **donos (pessoa ↔ pessoa)**, não “com o cavalo”.
* **Persistência de contexto:** não existe “perfil indisponível” para o match dentro do chat; o contexto do match deve existir para a conversa.

##### Regras de UI/UX

* **Bloqueio de acesso:** tentativas de acesso sem match devem resultar em mensagem de erro amigável e retorno para a origem (ex.: Matches/Inbox).

---

#### Visualizar histórico de mensagens

* **Visualizar histórico de mensagens**

**Descrição:** Exibir o histórico da conversa em ordem correta, com separadores por dia e horário discreto.

##### Regras de Negócio

* **Ordenação:** mensagens devem aparecer na ordem correta (cronológica).
* **Separação por dia:** inserir separadores quando houver mudança de data.

##### Regras de UI/UX

* **Formato:** mensagens em bolhas.
* **Horário:** exibir data/hora de forma discreta.
* **Atualização:** mensagens novas aparecem no final da conversa, mantendo leitura fluida.

---

#### Enviar mensagem de texto

* **Enviar mensagem de texto**

**Descrição:** Permitir envio de mensagens de texto via campo de composição, com ação clara de “Enviar”.

##### Regras de Negócio

* **Tipo suportado (MVP):** apenas **texto**.
* **Condição de envio:** apenas usuários participantes do match/conversa podem enviar.

##### Regras de UI/UX

* **Composer:** campo de texto + botão “Enviar”.
* **Feedback:** indicar sucesso/erro de envio de forma clara (ex.: mensagem falhou e pode tentar novamente). *(Se não houver regra definida, manter como assunção de UX.)*

---

#### Estado inicial para chat vazio com sugestões de mensagem

* **Estado inicial para chat vazio com sugestões de mensagem**

**Descrição:** Quando ainda não houve mensagens, exibir contexto do match e sugestões rápidas para reduzir fricção da primeira mensagem.

##### Regras de Negócio

* **Condição de chat vazio:** quando não existir nenhuma mensagem na conversa, exibir estado inicial.

##### Regras de UI/UX

* **Contexto visível:** exibir bloco compacto do cavalo do match (foto + nome, e poucos atributos se útil).
* **Sugestões rápidas:** exibir chips/modelos de mensagens para iniciar conversa.
* **Diretrizes de microcopy (exemplos):**

  * “Olá! Tenho interesse. Está disponível para visita?”
  * “Qual a localização e o valor?”
  * “Podemos combinar um horário para conversar melhor?”
* **Destaque no vazio:** no chat vazio, dar maior destaque para sugestões de mensagem.

---

#### Acesso rápido ao perfil do cavalo do match

* **Acesso rápido ao perfil do cavalo do match**

**Descrição:** Permitir que o usuário acesse rapidamente o perfil do cavalo associado ao match para consultar contexto durante a conversa.

##### Regras de Negócio

* **Associação:** o chat deve estar sempre ligado ao cavalo do match (contexto consistente).

##### Regras de UI/UX

* **Bloco de contexto:** incluir botão “Ver perfil do cavalo”.
* **Header (referência):** incluir referência ao match (ex.: “Match: [Nome do cavalo]”).

---

#### Apagar conversa

* **Apagar conversa**

**Descrição:** Permitir que o usuário apague a conversa com confirmação, removendo o histórico para aquele usuário.

##### Regras de Negócio

* **Efeito:** apagar conversa apaga o chat (histórico removido **para o usuário**).
* **Confirmação obrigatória:** antes de apagar, solicitar confirmação para evitar exclusões acidentais.

##### Regras de UI/UX

* **Local da ação:** menu de ações no header inclui “Apagar conversa”.
* **Confirmação clara:** modal/diálogo com texto objetivo e opções (confirmar/cancelar).

---

#### Estrutura base da tela

* **Estrutura base da tela**

**Descrição:** Garantir elementos mínimos da tela para navegação e entendimento do contexto.

##### Regras de Negócio

* **Navegação:** usuário deve conseguir voltar para a tela anterior (Matches ou Inbox).

##### Regras de UI/UX

* **Header:** botão voltar + identificação do interlocutor (nome/avatares) + referência ao match + menu de ações.
* **Área de mensagens:** scroll da conversa, bolhas e separadores por dia.
* **Composer:** campo de texto e botão enviar.
* **Simplicidade:** evitar distrações e recursos fora do MVP.

---

### 3. Fluxo de Usuário (User Flow)

**Nome do fluxo:** Iniciar conversa (chat vazio)

1. O usuário acessa a **Tela de Chat** pela tela de **Matches**.
2. O sistema identifica que não há mensagens e exibe estado inicial com:

   * Contexto do cavalo do match
   * Sugestões de mensagens rápidas
3. O usuário seleciona uma sugestão ou digita uma mensagem.
4. O sistema valida a condição de match:

   * **Sucesso:** envia e exibe a primeira mensagem no histórico.
   * **Falha:** exibe erro (ex.: acesso sem match) e retorna para a origem.

---

**Nome do fluxo:** Conversa em andamento

1. O usuário acessa a **Tela de Chat** pela **Inbox**.
2. O sistema exibe o histórico em ordem correta, com separadores por dia.
3. O usuário envia uma nova mensagem.
4. O sistema:

   * **Sucesso:** adiciona a mensagem ao final.
   * **Falha:** exibe feedback de erro e permite nova tentativa.

---

**Nome do fluxo:** Apagar conversa

1. O usuário acessa a **Tela de Chat**.
2. O usuário abre o menu e seleciona “Apagar conversa”.
3. O sistema solicita confirmação:

   * **Sucesso (confirmou):** remove o histórico para o usuário e retorna para a lista anterior (ex.: Inbox).
   * **Falha (cancelou):** fecha confirmação e mantém o chat.

---

### 4. Fora do Escopo (Out of Scope)

* Envio de fotos, vídeos, áudios ou arquivos.
* Chamadas de voz/vídeo.
* Indicadores como “digitando…”, “visto”, reações e edição de mensagem.
* Negociação estruturada dentro do chat (proposta/oferta).

---
