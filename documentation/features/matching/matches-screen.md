## PRD — Tela de Matches (Conexões)

### 1) Visão Geral

A tela de **Matches** apresenta as conexões (likes mútuos) do usuário e funciona como um atalho direto para iniciar conversas. Ao tocar em um match, o app deve abrir a tela de **Conversas** já com aquele match selecionado (abrindo a conversa existente ou preparando uma conversa para iniciar).

---

## 2) Objetivos

* Facilitar o próximo passo após o match: **iniciar conversa** com o mínimo de atrito.
* Destacar **novos matches** para aumentar engajamento imediato.
* Organizar e exibir claramente todos os matches do usuário.

---

## 3) Não-objetivos (fora do escopo)

* Arquivar/remover/desfazer match.
* Bloquear/denunciar.
* Filtros avançados, busca, ordenações complexas além do padrão definido.

---

## 4) Usuários e Casos de Uso

### Persona principal

Usuário que já realizou swipes/likes e obteve **1 ou mais matches**, e quer:

* Ver quem deu match recentemente
* Começar uma conversa rapidamente

### Casos de uso

1. **Ver novos matches** no topo da lista.
2. **Tocar em um match** e ir direto para Conversas com aquele match aberto/selecionado.
3. **Abrir a tela e não ter matches**: ver empty state e voltar ao Feed.

---

## 5) Requisitos Funcionais

### 5.1 Estrutura da Tela

* **Header**

  * Título: “Matches”
  * Contador opcional: “X novos” (exibido apenas se X > 0)

* **Lista única com “Novos” no topo**

  * Uma única lista com **dois agrupamentos visuais**:

    * “Novos” (somente matches não vistos)
    * “Todos” (restante)
  * Cada agrupamento pode ter um “título de seção” (ex.: “Novos”, “Todos”) para clareza, mantendo a experiência de lista única.

### 5.2 Ordenação

* “Novos”: ordem decrescente por **data do match** (mais recente primeiro)
* “Todos”: ordem decrescente por **data do match** (mais recente primeiro)

### 5.3 Item do Match (Card/Row)

Cada item deve exibir:

* Foto principal do cavalo (thumbnail)
* Nome do cavalo
* Localização (Cidade/UF)
* (Opcional) Idade
* (Opcional) Texto de data relativa: “Conectaram há X dias”

Estados visuais:

* **Novo**: badge/etiqueta “Novo”
* **Visto**: sem badge

### 5.4 Interação Principal

* Ao tocar em um item de match:

  * Navegar para **Tela de Conversas** com o match selecionado:

    * Se já existir conversa: abrir essa conversa
    * Se não existir: abrir uma conversa pronta para iniciar (ex.: composer aberto e contexto do match carregado)

### 5.5 Regra de “Novo”

* Um match é considerado **“Novo”** até o usuário **tocar no item** (abrir conversas com aquele match).
* Após o toque:

  * remover badge “Novo”
  * reduzir contador “X novos” (se exibido)

> Observação: visualizar a lista **não** remove o estado “Novo” (para não perder a percepção de novidade e não reduzir conversão para primeira conversa).

### 5.6 Empty State

Quando o usuário não possui matches:

* Mensagem: “Sem matches ainda”
* CTA primário: “Ir para o Feed”
* Texto auxiliar curto: “Continue no feed para encontrar cavalos compatíveis”

---

## 6) Requisitos Não Funcionais

### Performance

* Carregamento inicial da lista deve ser rápido e suportar paginação/scroll infinito se necessário.
* Exibição de imagens deve usar cache e placeholders (evitar layout shift).

### Confiabilidade

* Estado “Novo” deve ser consistente entre sessões/dispositivos (persistência).

### Acessibilidade (mínimo)

* Itens com áreas de toque confortáveis
* Contraste suficiente no badge “Novo”
* Suporte a leitor de tela (nome + localização como label)

---

## 7) Dependências e Integrações

* **Serviço de Matching**: fonte de matches e seus metadados
* **Tela de Conversas**: precisa aceitar parâmetro de navegação para abrir/selecionar um match e resolver criação/abertura da conversa.

---

### Métricas (KPIs)

* Conversão **match → conversa iniciada** (ex.: conversa aberta + 1ª mensagem enviada)
* Time-to-first-message após match
* CTR nos itens de match (match_item_clicked / matches_screen_viewed)
* % de novos matches clicados em até 24h

Guardrails:

* Tempo médio de carregamento da tela
* Taxa de erro ao abrir conversas a partir de match

---

## 9) Critérios de Aceite (Checklist)

1. A tela exibe título “Matches” e, se houver, contador “X novos”.
2. Matches “Novos” aparecem no topo, com badge “Novo” e agrupamento visual.
3. Ao tocar em um match, o app abre a tela de Conversas já com o match selecionado.
4. Um match perde o estado “Novo” **após** o toque (não apenas ao visualizar a lista).
5. Empty state aparece quando não há matches, com CTA “Ir para o Feed”.
6. Ordenação está correta (mais recentes primeiro em ambas as seções).
7. Instrumentação de eventos está disparando conforme especificado.

---

## 10) Decisões e Trade-offs (registrados)

* **Lista única com agrupamento visual** (Novos/Todos) evita complexidade de abas e mantém clareza.
* “Novo” só sai ao clicar melhora foco na ação principal (iniciar conversa), mas pode manter “novos” por mais tempo (o que é desejável para conversão).
