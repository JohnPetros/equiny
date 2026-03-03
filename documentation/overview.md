# PRD — Equiny (MVP) — Overview

## 1 Visão do produto
**Equiny** é um aplicativo de *matching* para cavalos. Proprietários cadastram seu cavalo (macho ou fêmea) e navegam um feed estilo “Tinder” (cards + swipe / botões de like/dislike).  
Quando acontece **like mútuo**, vira **match** e o próximo passo é **iniciar conversa** para combinar detalhes.

**Core loop:** Feed → Like → Match → (iniciar conversa) → Chat

---

## 2 Objetivos do MVP
- Permitir **cadastro e autenticação** (e-mail + senha).
- Conduzir o usuário pós-login para a etapa correta:
  - Sem cavalo cadastrado → **Criar Cavalo**
  - Com cavalo → **Feed**
- Entregar um **feed confiável** (sem repetição, sem inativos, com elegibilidade correta).
- Criar **match automaticamente** em caso de like mútuo.
- Permitir **início de conversa a partir de Matches** e continuidade via **Inbox**.
- Garantir **chat simples e confiável** (texto + histórico).
- Notificação de match:
  - **Modal “Deu match!” em foreground**
  - **Base técnica de push notification (OneSignal)** no app mobile

---

## 3 Escopo do MVP

### Dntro do escopo
**Auth**
- Sign Up com: **Nome do dono + Email + Senha + Confirmar senha**
- Sign In com: **Email + Senha**
- Validações + estados de erro + loading
- Toggle mostrar/ocultar senha (Sign In)
- Logout

**Feed (Discovery)**
- Cards com swipe e botões (Like/Dislike)
- Card mínimo: foto principal, nome, sexo, idade, localização (+ raça opcional)
- Acesso ao detalhe do cavalo a partir do card
- Estados: loading, erro, zero results, fim do feed
- Feedback de match no feed (ex.: “Deu match!” com CTAs)

**Matching**
- Registro de Like/Dislike com idempotência
- Criação automática de match na reciprocidade
- Tela de Matches com:
  - Agrupamento visual “Novos” e “Todos”
  - Badge “Novo” + contador “X novos”
  - “Novo” só some quando o usuário **toca** no match (não ao apenas visualizar a lista)
  - Ao tocar: abrir **Conversas** já com aquele match selecionado (abrir conversa existente ou preparar conversa para iniciar)

**Messaging**
- **Inbox (Conversas):** lista apenas de conversas com **≥ 1 mensagem**
  - Não permite iniciar novas conversas
  - Ordena por atividade mais recente
  - Mostra preview da última mensagem + não lidas
- **Chat:** apenas texto (MVP)
  - Histórico cronológico + separadores por dia
  - Estado inicial “chat vazio” com sugestões de primeira mensagem
  - Acesso rápido ao perfil do cavalo do match
  - Ação de **apagar conversa** (remove histórico para o usuário)

**Notificações de match**
- Modal foreground “Deu match!” com fila de matches, CTAs e navegação para chat
- Base de push com OneSignal:
  - Permissão solicitada após onboarding concluído
  - Vincular por `ownerId`
  - Logout/limpeza ao perder sessão

### Fra do escopo (MVP)
- Recuperação de senha (“Esqueci minha senha”)
- Login social (Google/Apple)
- Verificação de email
- Deep link de notificação
- Fluxo de background/resumed para matches das últimas 24h
- Telemetria de notificações
- Pagamentos / premium / boost / “quem me curtiu”
- Voz/vídeo
- Moderação avançada/IA
- Multi-cavalos por conta (post-MVP)

---

## 4 Princípios e regras de negócio

### Rgras gerais
- O item “swipável” é o **perfil do cavalo** (não do dono).
- **Só conversa quem deu match**.
- Evitar repetição: perfil avaliado não reaparece no feed.

### Eegibilidade do Feed
- Perfis precisam ter **mínimo 1 foto**.
- Mostrar somente perfis **ativos**.
- Compatibilidade por sexo (padrão: macho vê fêmea e vice-versa).
- (Recomendado) Excluir cavalos do mesmo dono.

### Lkes/Dislikes
- Uma decisão por par de perfis (idempotência).
- Swipe direita = Like; swipe esquerda = Dislike.
- Depois de avaliar, avançar imediatamente para o próximo card.

### Mtches
- Lista única com agrupamento “Novos” no topo e “Todos” abaixo.
- “Novo” só é marcado como visto quando o usuário **toca** e abre o contexto do match.

### Cnversas e Inbox
- Início de conversa acontece **na Tela de Matches**.
- Inbox só mostra conversas com pelo menos **uma mensagem enviada**.

---

## 5 Dados e estados envolvidos (alto nível)
- **Owner**: id, nome, cidade/UF, email, etc.
- **Horse**: id, ownerId, nome, sexo, idade, localização, ativo, fotos (com principal)
- **Decision (Like/Dislike)**: fromHorseId, toHorseId, tipo, createdAt (idempotente)
- **Match**: horseAId, horseBId, createdAt, seenAtByOwnerA?, seenAtByOwnerB?
- **Conversation**: matchId, participants(ownerA, ownerB), lastMessageAt, unreadCountByOwner, hasMessages
- **Message**: conversationId, senderOwnerId, text, createdAt, status (enviado/falhou)
- **PushLink**: ownerId, onesignalPlayerId/deviceId, lastSyncAt

---

## 6 Métricas de sucesso (MVP)
- Ativação: cadastro + cavalo criado com foto
- Engajamento: swipes por usuário/dia
- Conversão: matches por likes enviados
- **Taxa de início de conversa:** % de matches que viram 1ª mensagem
- **Tempo até 1ª mensagem** após match
- Retenção D7
- Qualidade do chat: % de conversas com ≥ 3 mensagens
- Opt-in de push (quando disponível) + taxa de abertura do modal de match (foreground)

---

## 7 Requisitos não funcionais
- Performance: feed sem travadas; imagens com cache/lazy-load; lista de matches paginável
- Confiabilidade: não perder mensagens; estados de erro com “tentar novamente”
- Segurança: erro de credenciais **genérico** no login; rate-limit básico (MVP+ se necessário)
- UX: empty states claros (sem matches / sem cards / fim do feed)

---

## 8 Definition of Done do MVP
Usuário consegue:
1) Cadastrar e entrar  
2) Criar cavalo com foto  
3) Ver feed e dar like/dislike  
4) Gerar match automaticamente  
5) Ver match na tela de Matches como “Novo”  
6) Tocar no match e iniciar conversa  
7) Ver conversa na Inbox depois da 1ª mensagem  
8) Trocar mensagens no chat (texto)  
9) Receber modal de match em foreground + base de push pronta no app mobile