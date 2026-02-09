# PRD — Tela de Chat

## 1) Visão geral

A tela de Chat permite que **dois donos** que deram match iniciem e mantenham uma conversa para avançar na negociação/combinação de próximos passos, com **contexto do cavalo do match** sempre acessível.

---

## 2) Objetivo do produto

* **Facilitar a primeira mensagem** após o match.
* **Acelerar a troca de informações essenciais** (localização, disponibilidade, condições).
* **Manter a experiência simples, confiável e direta**, sem distrações.

---

## 3) Público-alvo

* Usuários que tiveram match e querem conversar: **donos interessados** e **donos anunciantes**.

---

## 4) Regras de negócio

* **Só pode conversar quem deu match**.
* O chat é **entre donos** (pessoa ↔ pessoa), não “com o cavalo”.
* **Não existe “perfil indisponível”**: o contexto do match sempre existe para o chat.
* **Apagar conversa apaga o chat** (histórico removido para o usuário).

---

## 5) Escopo

### 5.1 MVP (incluído)

* Visualizar histórico de mensagens.
* Enviar mensagem de texto.
* Ver informações de data/hora (de forma discreta).
* Acesso rápido ao **perfil do cavalo do match** (para contexto).
* Sugestões de mensagens prontas para iniciar a conversa.
* Ação de **apagar conversa** (com confirmação).

### 5.2 Fora do escopo (MVP)

* Envio de fotos, vídeos, áudios ou arquivos.
* Chamadas de voz/vídeo.
* “Digitando…”, “visto”, reações, edição de mensagem.
* Negociação estruturada (proposta/oferta dentro do chat).

---

## 6) Principais cenários de uso

### Cenário A — Iniciar conversa (chat vazio)

* Usuário abre o chat pela lista de matches.
* Vê um estado inicial com:

  * Contexto do cavalo do match.
  * Sugestões de mensagens rápidas (chips/modelos).
* Envia a primeira mensagem.

**Resultado esperado:** reduzir fricção e tempo até a 1ª mensagem.

### Cenário B — Conversa em andamento

* Usuário abre o chat pela Inbox.
* Lê o histórico e responde.
* Mensagens novas aparecem no final da conversa.

**Resultado esperado:** continuidade fluida e sem confusão.

### Cenário C — Apagar conversa

* Usuário escolhe “Apagar conversa” no menu do chat.
* Confirma a ação.
* O chat é removido do histórico do usuário.

**Resultado esperado:** dar controle ao usuário com proteção contra exclusões acidentais.

---

## 7) Estrutura da tela (UI/UX)

### Header (topo)

* Botão voltar.
* Identificação do interlocutor (nome/avatares).
* Referência ao match (ex.: “Match: [Nome do cavalo]”).
* Menu de ações (inclui “Apagar conversa”).

### Contexto do match

* Um bloco compacto mostrando o cavalo do match (foto + nome, e poucos atributos se útil).
* Botão “Ver perfil do cavalo”.

### Área de mensagens

* Conversa em formato de bolhas.
* Separadores por dia quando necessário.
* Horário exibido de forma discreta.

### Campo de mensagem (composer)

* Campo de texto.
* Botão “Enviar”.
* No chat vazio, destaque para sugestões de mensagem.

---

## 8) Conteúdo e microcopy (diretrizes)

* Linguagem curta, clara e objetiva.
* Sugestões de mensagem devem incentivar ação e perguntas “de avanço”, por exemplo:

  * “Olá! Tenho interesse. Está disponível para visita?”
  * “Qual a localização e o valor?”
  * “Podemos combinar um horário para conversar melhor?”

---

## 9) Métricas de sucesso

### Métricas principais

* **% de matches que viram conversa iniciada** (pelo menos 1 mensagem).
* **Tempo até a primeira mensagem** após abrir o chat.
* **Taxa de resposta** (conversas com resposta em 24h/48h).

### Métricas de qualidade

* Taxa de envio cancelado (mensagens que o usuário digita e não envia).
* Taxa de apagamento de conversa (monitorar arrependimento/ruído).
* Satisfação qualitativa (feedback dentro do app, se existir).

---

## 10) Critérios de aceite (MVP)

1. Usuário com match consegue **abrir o chat** e **enviar mensagem de texto**.
2. Chat vazio mostra **contexto do cavalo** e **sugestões de mensagem**.
3. Usuário consegue acessar o **perfil do cavalo do match** a partir do chat.
4. Mensagens exibem **ordem correta**, com **separação por dia** quando aplicável.
5. Existe ação “**Apagar conversa**” com confirmação clara.
6. Usuários sem match **não** conseguem iniciar conversa com alguém.

