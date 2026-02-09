## PRD — Tela de Feed (Equiny)

### Versão

MVP v1 — Feed de descoberta com swipe (like/dislike) + filtros básicos.

---

## Análise de Produto

### Problema resolvido

O usuário precisa **descobrir cavalos compatíveis rapidamente** e demonstrar interesse com baixa fricção (like/dislike). O feed é o principal motor de conversão para match e chat. 

### Valor gerado

* Aumenta **engajamento** (swipes/sessão)
* Aumenta **conversão** (likes → matches)
* Aumenta **retensão** (usuário volta para continuar descobrindo)

### Público afetado

* 100% dos usuários ativos após onboarding (momento crítico para “primeiro like” e “primeiro match”).

### Métricas de sucesso

**Primárias**

* Swipes por sessão
* Like rate = likes / swipes
* Match rate = matches / likes
* Time-to-first-like
* Time-to-first-match

**Secundárias / Guardrails**

* Zero results rate (sessões sem cards)
* Taxa de erro no feed
* Latência: tempo para 1º card e para próximo card

---

## Escopo

### In-scope (MVP)

* Listagem estilo “Tinder”: **cards + swipe + botões Like/Dislike**
* Acesso ao **detalhe do perfil do cavalo**
* Filtros do feed (MVP):

  * Faixa de idade (min/max)
  * Raça (opcional no MVP, recomendado)
  * Localização (cidade/estado)
* Regras: compatibilidade por sexo + não repetir perfis + ocultar inativos
* Feedback de **match** (quando like mútuo acontecer) e CTA para chat

### Out-of-scope (agora)

* Undo swipe
* Ranking avançado
* Distância por GPS
* Premium/boost

---

## Requisitos Funcionais

### 1) Conteúdo do Card (baseado no Perfil do Cavalo)

Cada card deve exibir informações suficientes para decisão rápida:

**Obrigatório no card**

* Foto principal (obrigatória: perfil precisa de **mín. 1 foto**)
* Nome do cavalo
* Sexo (ícone/label)
* Idade
* Localização (cidade/estado)

**Opcional no card**

* Raça (se existir)
* “Ver detalhes” (CTA)

**No detalhe (fora do card, mas acessível do feed)**

* Descrição (opcional)
* Galeria completa de fotos

> Regra do produto: “o objeto swipável é o perfil do cavalo”. 

---

### 2) Ações: Like / Dislike

* Usuário pode dar Like/Dislike por:

  * Botões
  * Gestos: swipe direita = Like, swipe esquerda = Dislike
* Após ação:

  * Animar a saída do card
  * Carregar imediatamente o próximo card
  * Registrar a decisão (like/dislike)

**Regras de decisão**

* Um par de perfis só pode ter **uma decisão registrada** (idempotência). 
* Perfil avaliado não pode reaparecer no feed. 

---

### 3) Regras do Feed (Elegibilidade)

O feed deve mostrar apenas cavalos:

* Compatíveis por sexo (macho vê fêmea e vice-versa, conforme regra do produto). 
* Ativos (perfil inativo não aparece). 
* Não avaliados anteriormente (sem repetição). 
* (Recomendado) Excluir cavalos do mesmo dono (evita ruído)

---

### 4) Filtros

**Filtros disponíveis no MVP**

* Idade: min/max
* Localização: cidade/estado (ou estado apenas, se simplificar)
* Raça: lista (multi-select)

**Comportamento**

* Abrir painel/modal de filtros
* Botões: **Aplicar** e **Limpar**
* Mostrar indicador “Filtros ativos (N)”
* Persistir os filtros do usuário (ao menos durante a sessão; ideal: entre sessões)

---

### 5) Match (feedback e transição)

* Se Like gerar match (like mútuo):

  * Mostrar feedback (modal/toast de “Deu match!”)
  * CTA: “Ir para o chat” e opção “Continuar no feed”
* Match aparece na lista de conexões. 

---

## UX — Estados da Tela

1. **Loading inicial**

   * Skeleton do card (evita “tela vazia”)
2. **Estado normal**

   * Card(s) disponíveis + botões ativos
3. **Sem resultados (zero)**

   * Mensagem: “Não encontramos cavalos com seus filtros. Tente ampliar a busca.” 
   * CTA: “Limpar filtros”
4. **Fim do feed**

   * Mensagem: “Você chegou ao fim por enquanto.”
   * CTA: “Ampliar filtros”
5. **Erro**

   * Mensagem: “Não foi possível carregar o feed.”
   * CTA: “Tentar novamente”
6. **Bloqueio por perfil incompleto**

   * Se usuário não tem cavalo cadastrado → redirecionar para criar perfil
   * Se cavalo sem foto (mín. 1) → bloquear acesso ao feed até adicionar foto (recomendado, porque feed depende disso). 

---

## Análise Técnica

### Abordagem de implementação

* Buscar feed em **lotes** (ex.: 20 cards) com cursor/paginação
* Pré-busca quando restarem poucos (ex.: 5)
* Swipe com **idempotência** por `(meu_cavalo_id, target_horse_id)`

### Impacto na arquitetura (domínios)

* **Discovery**: query do feed + filtros + paginação
* **Matching**: registrar like/dislike e resolver match
* **Storage**: fotos (URLs) para card e detalhe

### Contratos e interfaces (mínimo necessário)

**GET /feed**

* Parâmetros: filtros + cursor + limit
* Retorna lista de cards com dados mínimos do perfil (foto principal + atributos básicos)

**POST /swipes**

* `{ target_horse_id, action }`
* Retorna `{ match: boolean, match_id? }`

---

## Riscos

### Técnicos

* Repetição de cards por paginação/cursor
* Duplicidade de swipes por taps rápidos / requests simultâneos
* Feed “vazio demais” se filtros forem restritivos

### Produto

* Pouca oferta → percepção de app “morto”
* Filtros demais no MVP → fricção

### Operacionais

* Perfis ruins sem moderação mínima (opcional: denúncia no detalhe)

---

## Alternativas

### Mais simples (MVP ultra-enxuto)

* Filtros apenas por idade + estado
* Card com 1 foto (galeria só no detalhe)

### Mais robusto (pós-MVP)

* Ranking por afinidade/atividade
* Undo swipe
* Distância por GPS

---

## Critérios de Aceite (Checklist)

**Feed**

* [ ] Exibe cards com foto + nome + sexo + idade + localização
* [ ] Não repete perfis já avaliados
* [ ] Não mostra perfis inativos
* [ ] Respeita compatibilidade por sexo

**Swipe**

* [ ] Like/Dislike via botão e gesto
* [ ] Swipe registra decisão e avança para próximo card
* [ ] Idempotente: não duplica likes/dislikes

**Filtros**

* [ ] Aplicar filtros recarrega feed e reseta paginação
* [ ] Limpar filtros volta ao padrão
* [ ] Mostra “Filtros ativos (N)”

**Match**

* [ ] Like mútuo gera match e feedback
* [ ] CTA para abrir chat funciona

**Estados**

* [ ] Loading com skeleton
* [ ] Zero results com CTA “Limpar filtros”
* [ ] Erro com “Tentar novamente”
* [ ] Bloqueio se cavalo sem foto (mín. 1)

---

## Recomendações

### Caminho sugerido

* Implementar o feed com **card mínimo + swipe idempotente + filtros básicos** (idade/localização + raça se der)
* Bloquear feed para perfis sem foto (garante qualidade e evita frustração)
* Instrumentar analytics desde o início (swipes, filtros, zero results, match)

### Próximos passos

1. Confirmar decisão: **raça entra no MVP ou fica como “nice-to-have”?** (eu colocaria, porque seu modelo já tem)
2. Definir microcopy e layout do card (ordem das infos)
3. Especificar eventos de analytics (para medir conversão do feed)

Se você quiser, eu também escrevo a **spec detalhada da UI** (com componentes e spacing) e um **roteiro de testes de QA** com casos de borda (ex.: mudar filtros no meio do lote, falha no swipe, voltar do detalhe, feed acabando).
