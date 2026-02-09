# PRD — Tela de Perfil

## 1) Objetivo

Permitir que o usuário crie e edite seu **Perfil** para colocar um **cavalo pronto para aparecer no feed**, com:

* Dados do **Cavalo** (principal)
* Dados do **Dono**
* **Fotos** do cavalo (até 6, mínimo 1)
* **Status Ativo/Inativo** do cavalo
* **Contato** do dono (telefone) com validação

---

## 2) Problema

Sem um perfil completo (especialmente do cavalo), o usuário:

* não entra no fluxo principal (feed → likes → matches → chat)
* gera cards fracos no feed (sem foto/dados essenciais), reduzindo engajamento

---

## 3) Público-alvo

* Donos/Responsáveis que desejam encontrar par para cruzamento para seus cavalos.

---

## 4) Métricas de Sucesso

* **Taxa de perfil do cavalo completo** (pronto para o feed)
* **Tempo até o cavalo ficar ativo** (cadastro → ativo)
* **% de perfis com pelo menos 1 foto** e com **3+ fotos**
* **Taxa de ativação**: usuários que chegam ao feed com cavalo ativo

---

## 5) Escopo

### Dentro do escopo (MVP)

* Visualizar/editar **Perfil do Cavalo** e **Perfil do Dono**
* Adicionar/remover fotos (até 6) e definir **foto principal**
* Ativar/inativar cavalo
* Checklist “Pronto para o feed”
* Campo **Telefone** com validação

### Fora do escopo (MVP)

* Múltiplos cavalos por dono
* Verificações e selos (ex.: verificado)
* Moderação avançada de fotos/conteúdo
* Pré-visualização completa do card do feed (pode virar melhoria futura)

---

## 6) Estrutura da Tela (UX)

### Navegação

* Título: **Perfil**
* Abas:

  * **Cavalo** (padrão)
  * **Dono**

### Aba “Cavalo” (ordem sugerida)

1. **Fotos**

   * Grid de fotos
   * Botão “Adicionar foto”
   * Cada foto tem ações: **Definir como principal** e **Excluir**
   * Selo “Principal” na foto principal
   * Limites:

     * **Máximo: 6 fotos**
     * **Mínimo: 1 foto** (para o cavalo ficar ativo)
2. **Dados do Cavalo**

   * Nome (obrigatório)
   * Sexo (obrigatório)
   * Idade (obrigatório)
   * Raça (opcional)
   * Localização (Cidade/Estado) (obrigatório)
   * Descrição (opcional)
3. **Status**

   * Toggle: **Ativo / Inativo**
   * Texto de ajuda: “Inativo não aparece no feed”
4. **Checklist “Pronto para o feed”**

   * Lista de itens com ✅/⚠️
   * Ao tocar em um item incompleto, leva o usuário ao campo/ação correspondente

### Aba “Dono”

* Nome (obrigatório)
* Localização (Cidade/Estado) (obrigatório)
* Bio (opcional)
* **Telefone** (opcional, com validação)

---

## 7) Regras de Negócio e Validações

### 7.1 Regras para “Cavalo Ativo”

O usuário **não pode ativar** o cavalo se faltar:

* Nome
* Sexo
* Idade
* Localização (Cidade/Estado)
* **Pelo menos 1 foto**

Se o usuário tentar ativar sem cumprir requisitos:

* mostrar mensagem clara do que falta
* destacar os itens incompletos no checklist

### 7.2 Validações de Campos

**Cavalo**

* Nome: 2–40 caracteres (obrigatório)
* Sexo: seleção obrigatória
* Idade: número (obrigatório) (faixa sugerida: 0–35)
* Localização: Cidade/Estado (obrigatório)
* Descrição: até 500 caracteres (opcional)
* Raça: texto livre (opcional)

**Dono**

* Nome: 2–40 caracteres (obrigatório)
* Localização: Cidade/Estado (obrigatório)
* Bio: até 300 caracteres (opcional)
* **Telefone (texto simples + validação)**:

  * aceitar apenas números e símbolos comuns de telefone (`+`, espaço, `(`, `)`, `-`)
  * regra mínima: **8 a 15 dígitos** (contando apenas números)
  * se inválido: mensagem “Telefone inválido”

### 7.3 Regras de Fotos

* Primeira foto adicionada vira **principal** automaticamente
* Usuário pode definir qualquer foto como principal
* Se excluir a foto principal:

  * a próxima foto disponível vira principal automaticamente
  * se não houver mais fotos, fica sem principal e o cavalo não pode ser ativado

---

## 8) Estados e Mensagens da UI

### Estados principais

* Carregando perfil
* Editando (com indicador de alterações não salvas)
* Salvando (feedback visual)
* Erro de salvamento (com opção de tentar novamente)
* Upload de foto em progresso (com feedback por foto)

### Mensagens chave (exemplos)

* “Seu cavalo está inativo e não aparece no feed.”
* “Para ativar, complete: foto, sexo e localização.” (lista dinâmica)
* “Telefone inválido.”

---

## 9) Fluxos Principais

### Fluxo A — Primeiro uso (cadastrar e ativar)

1. Usuário abre Perfil → Aba Cavalo
2. Adiciona **1 foto**
3. Preenche campos obrigatórios
4. Ativa cavalo
5. Vai para o feed

### Fluxo B — Editar perfil

1. Usuário edita qualquer campo/foto
2. Salva alterações
3. Alterações passam a refletir no perfil exibido no app

### Fluxo C — Inativar cavalo

1. Usuário desliga o toggle para Inativo
2. App informa que o cavalo não aparecerá no feed
3. Perfil permanece salvo para reativação futura

---

## 10) Critérios de Aceite

### Cavalo

* [ ] Usuário consegue ver e editar os dados do cavalo
* [ ] Usuário consegue ativar o cavalo **somente** quando campos obrigatórios + 1 foto estiverem completos
* [ ] Ao inativar, o cavalo deixa de aparecer no feed

### Fotos

* [ ] Usuário consegue adicionar fotos até o limite de **6**
* [ ] Usuário não consegue ficar com cavalo ativo sem ao menos **1 foto**
* [ ] Primeira foto vira principal automaticamente
* [ ] Usuário consegue definir outra foto como principal
* [ ] Ao excluir a principal, outra foto vira principal automaticamente (se existir)

### Dono

* [ ] Usuário consegue ver e editar nome e localização
* [ ] Campo de telefone aceita texto simples e valida dígitos (8–15); exibe erro se inválido

### Checklist

* [ ] Checklist reflete corretamente os itens completos/incompletos
* [ ] Tocar em item incompleto leva ao campo/ação correspondente
