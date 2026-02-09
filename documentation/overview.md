# PRD — Equiny (MVP)

## 1. Visão do produto

**Equiny** é um aplicativo de *matching* para cavalos, onde proprietários cadastram seus cavalos (macho ou fêmea) e utilizam um fluxo estilo “Tinder” (like/dislike com filtros). Quando há **curtida mútua**, os perfis se conectam e os donos podem iniciar uma **conversa via chat** para combinar detalhes.

### Objetivos do MVP

* Permitir cadastro e autenticação de usuários.
* Permitir criação/edição de perfil do dono e do cavalo.
* Exibir um feed com filtros e swipe (like/dislike).
* Criar match automaticamente em caso de like mútuo.
* Permitir chat entre perfis com match.
* Listar matches e conversas.

### O que fica fora do MVP (para evitar escopo)

* Pagamentos, planos premium, boost.
* Verificação documental de cavalo/dono.
* “Quem me curtiu” sem match.
* Chamadas de voz/vídeo.
* Moderação avançada/IA.
* Multi-cavalos por conta (opcional; pode entrar depois).

---

## 2. Público-alvo e casos de uso

### Público-alvo

* Proprietários de cavalos (pessoa física).
* Pequenos criadores/haras (pode entrar depois com recursos específicos).

### Principais casos de uso

1. Dono cadastra seu cavalo e define preferências.
2. Dono navega no feed e curte/descarta perfis.
3. O app cria uma conexão quando há interesse mútuo.
4. Os donos conversam no chat para alinhar detalhes.

---

## 3. Princípios e regras de negócio gerais

### Regras gerais

* O objeto “swipável” é o **perfil do cavalo** (não do dono).
* O chat é entre **dois perfis conectados (match)**.
* O app deve evitar mostrar perfis repetidos e perfis já avaliados.
* O usuário controla a privacidade: certos dados do dono podem ficar **ocultos até o match**.

### Definições

* **Like:** demonstra interesse.
* **Dislike:** descarta perfil.
* **Match:** ocorre quando ambos deram like.
* **Conversa:** chat associado a um match.

---

## 4. Métricas de sucesso (MVP)

* **Ativação:** % de usuários que completam cadastro + criam perfil do cavalo.
* **Engajamento:** swipes por usuário/dia.
* **Conversão:** % de matches por likes enviados.
* **Retenção:** usuários que voltam após 7 dias.
* **Qualidade do chat:** % de matches com pelo menos 1 mensagem enviada.

---

# 5. Módulos do produto (detalhes de negócio)

## 5.1 Auth (Login e Cadastro)

### Objetivo

Garantir acesso seguro ao app e permitir criação de conta.

### Funcionalidades

* Login com e-mail e senha.
* Cadastro de nova conta.
* Logout.
* Recuperação de senha (desejável no MVP; se não houver, deixar roadmap).

### Regras

* Cada e-mail pode ter apenas uma conta.
* Após o primeiro login, o app deve conduzir o usuário para **criar o perfil do cavalo**, se ainda não existir.

### Experiência esperada

* Onboarding curto: entrar → cadastrar cavalo → ir ao feed.

### Critérios de aceite

* Usuário consegue criar conta, entrar e sair.
* Usuário sem cavalo cadastrado é direcionado para criar perfil.

---

## 5.2 Profiling (Perfil do Dono e do Cavalo)

### Objetivo

Criar perfis completos o suficiente para gerar bons matches e conversa.

### Estrutura do perfil

**Perfil do Dono**

* Nome (obrigatório)
* Cidade/Estado (obrigatório)
* Contato (opcional; pode ser oculto até match)
* Bio curta (opcional)

**Perfil do Cavalo**

* Nome do cavalo (obrigatório)
* Sexo (obrigatório)
* Idade (obrigatório)
* Raça (opcional no MVP, recomendado)
* Localização (herda do dono ou própria) (obrigatório)
* Descrição (opcional)
* Fotos (mín. 1 no MVP; recomendado 3)

### Regras

* Um cavalo pode estar **ativo** ou **inativo**:

  * Inativo não aparece no feed e não pode receber novos likes.
* O cavalo deve ter sexo definido para que o feed funcione corretamente.
* Fotos devem ter ordem e uma “foto principal”.

### Critérios de aceite

* Usuário consegue criar/editar dados do dono e do cavalo.
* Usuário consegue ativar/desativar seu cavalo.
* Perfil exibe claramente dono + cavalo (abas ou seções).

---

## 5.3 Discovery (Feed / Search com filtros + Swipe)

### Objetivo

Entregar um feed relevante para o dono navegar e tomar decisões rápidas.

### Feed (experiência principal)

* Exibição em cards com:

  * Fotos (carousel)
  * Nome, idade, raça (se houver), localização (cidade/estado)
  * Botões: Like / Dislike
  * Opção de abrir detalhes do perfil do cavalo

### Filtros (MVP recomendado)

* Faixa de idade (min/max)
* Raça (lista)
* Localização (cidade/estado) ou distância (se houver)
* (Opcional) Preferência por “finalidade” (reprodução, esporte etc.)

### Regras do feed

* Mostrar **apenas cavalos compatíveis**:

  * Por padrão: sexo oposto ao cavalo do usuário (macho vê fêmea e vice-versa).
* Não exibir:

  * perfis já curtidos/descartados
  * perfis inativos
  * (Opcional) perfis do mesmo dono
* Deve haver paginação/continuidade (“acabou o feed” com sugestão de ajustar filtros).

### Estados e mensagens

* Sem perfis: “Não encontramos cavalos com seus filtros. Tente ampliar a busca.”
* Sem fotos suficientes: alertar no onboarding/perfil (não bloquear totalmente, mas incentivar).

### Critérios de aceite

* Usuário consegue ver feed e aplicar filtros.
* Swipe registra a decisão e o perfil não aparece novamente.
* Abrir detalhes do perfil mostra informações completas.

---

## 5.4 Matching (Likes, Dislikes e Conexões)

### Objetivo

Registrar interesses e criar conexões automaticamente quando houver reciprocidade.

### Funcionalidades

* Registrar Like/Dislike.
* Criar Match quando:

  * A curte B **e** B curte A.
* Exibir lista de Matches em “Likes/Conexões”.

### Regras

* Cada par de perfis só pode ter **uma decisão registrada** (não curtir duas vezes).
* Match é irreversível no MVP (desfazer match fica para roadmap).
* Se um cavalo ficar inativo depois do match:

  * o match pode permanecer, mas o perfil aparece como “indisponível” (decisão do produto; recomendado manter e permitir chat continuar).

### Tela de Likes (MVP)

Sugestão de organização:

* Aba **Conexões (Matches)**: lista de matches com preview do perfil e último recado (se houver).
* (Opcional) Aba **Curtidos**: perfis que você curtiu e ainda não deram match.

### Critérios de aceite

* Like mútuo gera match automaticamente.
* Matches aparecem na lista e podem abrir chat.

---

## 5.5 Messaging (Chat)

### Objetivo

Permitir que donos conversem após o match para combinar detalhes com segurança e clareza.

### Funcionalidades (MVP)

* Lista de conversas (uma por match).
* Tela de chat com:

  * histórico de mensagens
  * envio de mensagem de texto
  * indicação simples de data/hora
* Acesso ao perfil do cavalo do match a partir do chat.

### Regras

* Somente perfis com match podem enviar mensagens.
* Mensagens devem ter limite de tamanho (para evitar spam).
* (Opcional no MVP, recomendado) Ações de segurança:

  * bloquear usuário
  * denunciar conversa/perfil

### Conteúdo de suporte (UX)

* Mensagem inicial sugerida (template) para facilitar primeira conversa:

  * “Olá! Gostei do perfil do seu cavalo. Podemos conversar sobre disponibilidade e localização?”

### Critérios de aceite

* Usuário consegue enviar/receber mensagens em um match.
* Conversas aparecem organizadas por mais recentes.

---

## 5.6 Storage (Arquivos / Fotos)

### Objetivo

Gerenciar mídia do cavalo (principalmente fotos) com experiência simples e confiável.

### Funcionalidades (MVP)

* Upload de fotos para o perfil do cavalo.
* Definir foto principal.
* Reordenar fotos (opcional).
* Excluir foto.

### Regras

* Pelo menos 1 foto para aparecer bem no feed (idealmente obrigatório para entrar no feed).
* Limites:

  * quantidade máxima de fotos (ex.: 6 ou 9 no MVP)
  * tamanho máximo por foto
* Formatos aceitos comuns (JPG/PNG/HEIC — se suportar).

### Critérios de aceite

* Usuário consegue subir foto, ver no perfil e no feed.
* Foto principal aparece como capa no card.

---

# 6. Fluxos do usuário (end-to-end)

## 6.1 Primeiro acesso (onboarding)

1. Cadastro/Login
2. Criar perfil do dono
3. Criar perfil do cavalo + fotos
4. Ir para o feed
5. Fazer swipes
6. Receber match (quando ocorrer)
7. Abrir chat e conversar

## 6.2 Fluxo de match

1. Cavalo A dá like em B
2. Se B ainda não curtiu A: nada acontece além de “like enviado”
3. Se B já curtiu A: cria match e ambos veem em “Conexões”
4. Chat fica disponível

---

# 7. Requisitos não funcionais (negócio/experiência)

* **Privacidade:** dados de contato do dono podem ficar ocultos até match (recomendado).
* **Segurança básica:** ferramenta de denunciar/bloquear (pode ser MVP+ se precisar cortar escopo, mas recomendado).
* **Confiabilidade:** não perder mensagens; histórico consistente.
* **Acessibilidade/UX:** navegação simples com 5 áreas principais (Perfil, Feed, Likes, Chat, Config).

---

# 8. Roadmap pós-MVP (prioridade sugerida)

1. **Multi-cavalos por dono** (alternar “cavalo ativo”).
2. **Distância por GPS** e “perto de mim”.
3. **Verificação** (dono e cavalo) com selos.
4. **Desfazer swipe** e “voltar card”.
5. **Bloqueio/denúncia avançados** + moderação.
6. **Notificações push** (match e mensagem).
7. **Planos premium** (boost, destaque, ver quem curtiu).

---

# 9. Critérios de entrega do MVP (Definition of Done)

* Usuário consegue: cadastrar → criar cavalo → ver feed → dar like/dislike → gerar match → abrir chat → trocar mensagens.
* Perfil do cavalo é editável e tem fotos.
* Lista de matches e lista de conversas funcionam e refletem o estado real.
* Regras do feed (não repetir, respeitar sexo e filtros, não mostrar inativos) atendidas.

Se você quiser, eu adapto este PRD para um **formato pronto de documento** (com numeração padrão, escopo “in/out”, dependências e riscos) e já incluo uma seção de **perguntas abertas** e decisões assumidas do Equiny.
