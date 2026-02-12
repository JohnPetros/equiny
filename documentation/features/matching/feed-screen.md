# PRD — Tela de Feed (Equiny)

### 1. Visão Geral

A **Tela de Feed** é a experiência principal de **descoberta de cavalos** no Equiny, em formato de **cards com swipe** (like/dislike). Ela permite que o usuário avalie perfis com baixa fricção e avance o funil **Feed → Like → Match → Chat**.

**Problema que resolve:** o usuário precisa descobrir cavalos compatíveis rapidamente e demonstrar interesse sem esforço.

**Objetivo principal e valor entregue:** aumentar a conversão para **match** e acelerar o início de conversas, mantendo o feed confiável (sem repetição, sem perfis inativos e com regras de compatibilidade).

---

### 2. Requisitos

#### Cards do feed (conteúdo mínimo)

* **Cards do feed (conteúdo mínimo)**

**Descrição:** Exibir perfis de cavalos em cards com informações suficientes para decisão rápida.

##### Regras de Negócio

* **Objeto swipável:** o item do feed é o **perfil do cavalo**.
* **Foto obrigatória no perfil:** perfis exibidos devem ter **mínimo de 1 foto** (foto principal).
* **Dados mínimos do card:** o card deve ter dados para renderização (foto principal + atributos básicos).

##### Regras de UI/UX (se houver)

* **Obrigatório no card:** foto principal, nome do cavalo, sexo (ícone/label), idade, localização (cidade/estado).
* **Opcional no card:** raça (se existir), CTA “Ver detalhes”.
* **Leitura rápida:** informações do card devem ser apresentadas para decisão em poucos segundos.

---

#### Ações de Like e Dislike (botão + swipe)

* **Ações de Like e Dislike (botão + swipe)**

**Descrição:** Permitir que o usuário avalie um card com like/dislike por gesto ou botão, avançando o feed imediatamente.

##### Regras de Negócio

* **Ações suportadas:** Like e Dislike.
* **Mapeamento de gestos:** swipe direita = Like; swipe esquerda = Dislike.
* **Registro de decisão:** ao avaliar, registrar a decisão e avançar para o próximo card.
* **Idempotência:** um par de perfis deve ter **uma única decisão registrada** (evitar duplicidade por taps rápidos/requests simultâneos).
* **Não repetição:** perfil avaliado não pode reaparecer no feed.

##### Regras de UI/UX (se houver)

* **Feedback imediato:** animar saída do card e exibir o próximo sem “travadas”.
* **Controles redundantes:** manter botões de Like/Dislike além do gesto.

---

#### Regras de elegibilidade do feed

* **Regras de elegibilidade do feed**

**Descrição:** Garantir que o feed mostre apenas perfis válidos e compatíveis com as regras do produto.

##### Regras de Negócio

* **Compatibilidade por sexo:** exibir apenas cavalos compatíveis conforme regra do produto (ex.: macho vê fêmea e vice-versa).
* **Perfis ativos:** perfil inativo não aparece no feed.
* **Sem repetição:** não exibir perfis já avaliados anteriormente.
* **Mesmo dono (recomendado):** excluir cavalos do **mesmo dono** para reduzir ruído. *(Se for opcional no MVP, tratar como assunção.)*

##### Regras de UI/UX (se houver)

* **Consistência:** o usuário não deve perceber “cards repetidos” ao longo da sessão.

---

#### Acesso ao detalhe do perfil do cavalo

* **Acesso ao detalhe do perfil do cavalo**

**Descrição:** Permitir abrir o detalhe do cavalo a partir do card, sem perder o contexto do feed.

##### Regras de Negócio

* **Origem:** o detalhe deve ser acessível a partir do feed para o cavalo exibido no card.

##### Regras de UI/UX (se houver)

* **Conteúdo do detalhe (mínimo):** descrição (opcional) + galeria completa de fotos.
* **Retorno ao feed:** ao voltar do detalhe, o usuário retorna ao feed mantendo continuidade.

---

#### Filtros básicos do feed

* **Filtros básicos do feed**

**Descrição:** Permitir refinar os resultados do feed com filtros simples e aplicáveis no MVP.

##### Regras de Negócio

* **Filtros do MVP:** idade (min/max) e localização (cidade/estado ou estado).
* **Raça (opcional no MVP):** filtro por raça (multi-select). *(Marcar como “nice-to-have” se não entrar na v1.)*
* **Aplicar filtros:** aplicar deve recarregar o feed e **resetar paginação/cursor**.
* **Limpar filtros:** retorna ao padrão do feed.
* **Persistência:** persistir filtros ao menos durante a sessão (ideal: entre sessões).

##### Regras de UI/UX (se houver)

* **Painel/modal:** abrir interface de filtros com botões “Aplicar” e “Limpar”.
* **Indicador:** mostrar “Filtros ativos (N)”.

---

#### Match: feedback e transição para chat

* **Match: feedback e transição para chat**

**Descrição:** Quando ocorrer like mútuo, informar o match e oferecer caminho direto para o chat.

##### Regras de Negócio

* **Condição de match:** like mútuo gera match.
* **Disponibilização:** match deve aparecer na lista de conexões/matches do usuário.

##### Regras de UI/UX (se houver)

* **Feedback de match:** exibir “Deu match!” (modal/toast).
* **CTAs:** “Ir para o chat” e opção “Continuar no feed”.

---

#### Estados do feed (loading, erro, vazio e fim)

* **Estados do feed (loading, erro, vazio e fim)**

**Descrição:** Tratar estados comuns para evitar sensação de app “quebrado” ou “morto”.

##### Regras de Negócio

* **Zero results:** quando não houver cards por causa de filtros, exibir estado apropriado.
* **Fim do feed:** quando não houver mais cards disponíveis no momento, exibir estado de fim.
* **Erro:** quando falhar o carregamento, permitir tentativa novamente.

##### Regras de UI/UX (se houver)

* **Loading inicial:** skeleton de card.
* **Zero results:** mensagem orientando ampliar busca + CTA “Limpar filtros”.
* **Fim do feed:** mensagem “Você chegou ao fim por enquanto.” + CTA “Ampliar filtros”.
* **Erro:** “Não foi possível carregar o feed.” + CTA “Tentar novamente”.

---

#### Bloqueio por perfil incompleto (qualidade do feed)

* **Bloqueio por perfil incompleto (qualidade do feed)**

**Descrição:** Impedir acesso ao feed quando faltarem pré-requisitos mínimos para a dinâmica do produto.

##### Regras de Negócio

* **Sem cavalo cadastrado:** bloquear acesso e direcionar para criação de perfil.
* **Sem foto (mín. 1):** bloquear acesso ao feed até adicionar foto (recomendado).

##### Regras de UI/UX (se houver)

* **Orientação clara:** explicar o motivo do bloqueio e indicar ação imediata (ex.: “Adicionar foto” / “Criar perfil”).

---

#### Instrumentação mínima de eventos (analytics)

* **Instrumentação mínima de eventos (analytics)**

**Descrição:** Registrar eventos essenciais para medir funil e saúde do feed.

##### Regras de Negócio

* **Eventos mínimos (sugestão):** swipe, like, dislike, match gerado, abertura de detalhe, aplicar/limpar filtros, zero results, erro de carregamento.

##### Regras de UI/UX (se houver)

* 🚧 Em construção

---

### 3. Fluxo de Usuário (User Flow)

**Nome do fluxo:** Descoberta e swipe (sem filtros)

1. O usuário acessa a **Tela de Feed**.
2. O sistema carrega o primeiro card:

   * **Sucesso:** exibe card.
   * **Falha:** exibe estado de erro com “Tentar novamente”.
3. O usuário executa Like/Dislike (gesto ou botão).
4. O sistema registra a decisão (idempotente) e avança para o próximo card.
5. Se houver like mútuo:

   * **Sucesso:** exibe “Deu match!” com CTA “Ir para o chat” ou “Continuar no feed”.

---

**Nome do fluxo:** Aplicar filtros

1. O usuário abre o painel/modal de filtros.
2. Seleciona idade e localização (e raça, se disponível).
3. Toca em “Aplicar”.
4. O sistema recarrega o feed com filtros e reseta paginação:

   * **Sucesso:** exibe cards filtrados.
   * **Sem resultados:** exibe “Não encontramos cavalos com seus filtros…” + “Limpar filtros”.
   * **Falha:** exibe estado de erro + “Tentar novamente”.

---

**Nome do fluxo:** Bloqueio por perfil incompleto

1. O usuário acessa a Tela de Feed.
2. O sistema valida pré-requisitos:

   * **Sem cavalo cadastrado:** redireciona para criar perfil.
   * **Cavalo sem foto:** bloqueia e direciona para adicionar foto.
   * **Sucesso:** carrega o feed normalmente.

---

### 4. Fora do Escopo (Out of Scope)

* Undo swipe.
* Ranking avançado de cards (afinidade/boost).
* Distância por GPS.
* Premium/boost.
* Funcionalidades de moderação/denúncia no detalhe (se não estiverem previstas no MVP).

---