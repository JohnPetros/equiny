## PRD — Tela de Sign Up (Cadastro)

### 1) Visão geral

**Objetivo:** permitir que novos usuários criem uma conta Equiny usando **nome do dono + email + senha**, com confirmação de senha, e direcionar imediatamente para o passo de ativação **Criar Cavalo**.

**Status:** MVP
**Plataformas:** Mobile (prioritário), Web (se aplicável)

---

### 2) Problema e contexto

* Usuários precisam se cadastrar rapidamente para entrar no produto.
* O Equiny depende do “core loop” iniciar com **Criar Cavalo**; portanto, o cadastro deve conduzir o usuário direto para essa etapa.

---

### 3) Escopo

#### Dentro do escopo (MVP)

* Cadastro com **Nome do dono, Email, Senha, Confirmar senha**
* Validações básicas de formulário (client + server)
* Criação de conta e autenticação (sessão ativa após cadastro)
* Redirecionamento automático para **Criar Cavalo**
* Tratamento de erros (email já cadastrado, email inválido, senhas diferentes, senha fraca, nome inválido)

#### Fora do escopo (MVP)

* Checkbox de termos/privacidade
* Recuperação de senha (“esqueci minha senha”)
* Login social (Google/Apple)
* Verificação de email (link/código)
* Captura de outros dados (telefone, endereço, etc.)

---

### 4) Usuários e cenários

#### Persona primária

* Pessoa que quer criar conta para cadastrar seu cavalo e começar a explorar o app.

#### Cenários principais

1. Usuário abre Sign Up, preenche corretamente, cria conta e é levado para **Criar Cavalo**.
2. Usuário tenta cadastrar com nome vazio/muito curto → recebe erro e corrige.
3. Usuário tenta cadastrar com email inválido → recebe erro e corrige.
4. Usuário tenta cadastrar com email já em uso → recebe orientação para ir ao **Entrar**.
5. Usuário digita senhas diferentes → recebe erro e ajusta.
6. Usuário coloca senha abaixo do mínimo → recebe erro e ajusta.

---

### 5) Requisitos funcionais

#### 5.1 Formulário

**Campos:**

1. **Nome do dono**

* Tipo: texto
* Obrigatório
* Placeholder: “Seu nome”
* Regras:

  * mínimo: 2 caracteres
  * máximo recomendado: 60 caracteres
  * trim (remove espaços no início/fim)
  * permitir acentos e espaços (nome composto)

2. **Email**

* Tipo: texto/email
* Obrigatório
* Normalização: trim + lowercase

3. **Senha**

* Tipo: password
* Obrigatório

4. **Confirmar senha**

* Tipo: password
* Obrigatório

**Validações (cliente):**

* Nome: não vazio, min/max
* Email: formato válido
* Senha: mínimo recomendado 8 caracteres
* Confirmar senha: igual à senha

**Validações (servidor):**

* Nome dentro das regras
* Email válido e não existente
* Política mínima de senha (mesmo critério do client, no mínimo)

#### 5.2 Ações e navegação

* CTA principal: **Criar conta**
* Link secundário: **Já tenho conta → Entrar**
* Após sucesso:

  * Criar conta
  * Autenticar usuário (sessão/token)
  * Navegar automaticamente para **Tela Criar Cavalo** (sem opção de pular)

#### 5.3 Estados da UI

* **Default:** campos vazios
* **Loading:** CTA mostra loading e bloqueia múltiplos envios
* **Erro de campo:** mensagem abaixo do campo
* **Erro geral:** banner/toast quando erro não for de campo (ex.: rede)
* **Sucesso:** transição automática para Criar Cavalo

#### 5.4 Mensagens de erro (copy sugerida)

* Nome vazio: “Digite seu nome.”
* Nome curto demais: “O nome deve ter pelo menos 2 caracteres.”
* Email inválido: “Digite um email válido.”
* Email já cadastrado: “Esse email já está em uso. Entre na sua conta.”
* Senha curta: “A senha deve ter pelo menos 8 caracteres.”
* Senhas diferentes: “As senhas não coincidem.”
* Erro de rede: “Não foi possível criar sua conta. Tente novamente.”

---

### 6) Requisitos não funcionais

* **Performance:** primeira renderização rápida, validações leves
* **Acessibilidade:** labels, foco correto, teclado “email”, leitura por screen reader
* **Segurança:**

  * Senha nunca exibida nem registrada em logs/analytics
  * Rate limit / proteção contra abuso no endpoint de sign-up (mínimo)
* **Confiabilidade:** evitar criação duplicada em double-tap (UI bloqueia; idealmente idempotência no backend)

---

### 7) Critérios de aceitação (QA)

1. **Cadastro válido**

* Dado que o usuário preenche nome válido + email válido + senha >= 8 + confirmação igual
* Quando toca “Criar conta”
* Então a conta é criada, o usuário fica autenticado e é redirecionado para **Criar Cavalo**.

2. **Nome inválido**

* Dado nome vazio ou < 2 caracteres
* Quando tenta enviar
* Então mostra erro no campo “Nome do dono” e impede o envio.

3. **Email inválido**

* Dado email inválido
* Quando tenta enviar
* Então mostra erro no campo email e não prossegue.

4. **Email já em uso**

* Dado email já cadastrado
* Quando envia
* Então mostra mensagem “email já em uso” e oferece caminho para “Entrar”.

5. **Senha fraca**

* Dado senha < 8
* Quando envia
* Então mostra erro no campo senha.

6. **Senhas diferentes**

* Dado senha e confirmação diferentes
* Quando envia
* Então mostra erro de “não coincidem”.

7. **Múltiplos cliques**

* Dado usuário clica repetidamente no CTA
* Então apenas uma tentativa é enviada (UI em loading bloqueia).

8. **Falha de rede**

* Dado falha de rede
* Quando envia
* Então mostra erro geral e mantém os dados preenchidos.

---

### 8) Dependências

* Endpoint de cadastro no backend (Auth)
* Sistema de sessão/token
* Roteamento pós-cadastro para a tela **Criar Cavalo**
* Tela “Criar Cavalo” pronta para receber usuário recém-criado

---

### 9) Decisões (fixas no MVP)

* Confirmar senha: **SIM**
* Checkbox de termos: **NÃO**
* Pós-cadastro: **direto para Criar Cavalo**
* Recuperação de senha: **NÃO (MVP)**

Se quiser, eu também ajusto o PRD para refletir detalhes de UX que impactam conversão: **ordem dos campos**, **validação em tempo real vs ao enviar**, e **mostrar/ocultar senha**.
