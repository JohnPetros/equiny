# PRD — Tela de Sign In (Autenticação)

### 1. Visão Geral

A **Tela de Sign In** permite que o usuário acesse o Equiny de forma rápida e confiável usando **e-mail e senha** (único método no MVP).
O problema que resolve é o acesso simples à conta, com **validações claras**, **feedback de erro**, e **direcionamento correto** após o login.
O objetivo principal é **permitir login com baixa fricção** e conduzir o usuário para a etapa de ativação correta:

* Se ainda não criou cavalo → **Criar Cavalo**
* Se já criou cavalo → **Feed/Home**

**Premissas**

* Autenticação no MVP é **exclusivamente e-mail + senha**
* Existe fluxo de cadastro com **nome do dono + e-mail + senha**
* **Não haverá recuperação de senha** no MVP

**Resumo do que entendi**

* Esta tela é o ponto de entrada do app para usuários novos e recorrentes
* O sucesso do login está diretamente ligado à ativação (Criar Cavalo)

**Sugestões rápidas**

* Manter erro de credenciais **genérico** (segurança) e diferenciar apenas erro de rede/servidor
* Garantir que “Criar conta” seja bem visível para usuários novos

**Posso registrar essa versão ou deseja ajustar algo?**

---

### 2. Requisitos

*Liste das funcionalidades (MVP). Não use IDs numéricos. Use checkboxes.*

#### Autenticar com e-mail e senha

* [ ] **Login com e-mail e senha**

**Descrição:** Usuário informa e-mail e senha e realiza autenticação para entrar no app.

##### Regras de Negócio

* **Método de autenticação:** apenas e-mail + senha no MVP.
* **Envio de login:** só enviar quando campos estiverem válidos.
* **Resposta de autenticação:** em sucesso, o app determina o próximo destino com base no status “Criou Cavalo”.

##### Regras de UI/UX (se houver)

* **Campos:** E-mail (teclado apropriado), Senha (mascarada por padrão).
* **CTA primário:** “Entrar”.
* **CTA secundário:** “Criar conta”.
* **Feedback:** exibir erros abaixo dos campos e/ou como mensagem global.
* **Performance:** mostrar estado de carregamento durante tentativa.
* **Segurança:** não detalhar se foi e-mail ou senha que falhou (mensagem genérica).
* **Acessibilidade:** labels claros, foco correto e mensagens compreensíveis.

---

#### Validação básica do formulário

* [ ] **Validação de e-mail e senha**

**Descrição:** Impedir envio inválido e guiar o usuário com mensagens claras.

##### Regras de Negócio

* **E-mail válido:** deve ter formato válido (ex.: conter “@” e domínio).
* **Senha obrigatória:** não pode estar vazia.
* **Bloqueio de envio:** impedir tentativa até que os requisitos mínimos sejam atendidos.

##### Regras de UI/UX (se houver)

* **Mensagens de validação:**

  * “Informe um e-mail válido.”
  * “Informe sua senha.”
* **Estados do botão:** “Entrar” desabilitado quando inválido ou em loading.

---

#### Mostrar/ocultar senha

* [ ] **Toggle de visibilidade da senha**

**Descrição:** Permitir alternar senha entre mascarada e visível.

##### Regras de Negócio

* **Estado default:** senha mascarada ao abrir a tela.
* **Persistência:** não é necessário persistir escolha entre sessões (MVP).

##### Regras de UI/UX (se houver)

* **Controle:** ícone no campo de senha (olho/olho riscado).
* **Acessibilidade:** controle com rótulo acessível (ex.: “Mostrar senha / Ocultar senha”).

---

#### Estados de carregamento

* [ ] **Loading e prevenção de múltiplos envios**

**Descrição:** Informar processamento e evitar taps repetidos.

##### Regras de Negócio

* **Durante autenticação:** bloquear reenvio.
* **Finalização:** liberar o botão ao concluir sucesso ou falha.

##### Regras de UI/UX (se houver)

* **Botão “Entrar”:** desabilitado durante envio.
* **Indicador:** spinner no botão ou indicador de progresso.

---

#### Tratamento de falhas

* [ ] **Mensagens de erro para credenciais e falhas de rede**

**Descrição:** Informar falhas sem confundir o usuário.

##### Regras de Negócio

* **Credenciais inválidas:** exibir mensagem genérica.
* **Rede/servidor:** exibir mensagem de tentativa novamente.

##### Regras de UI/UX (se houver)

* **Microcopy:**

  * Credenciais inválidas: “E-mail ou senha inválidos.”
  * Erro geral: “Não foi possível entrar. Tente novamente.”
* **Recuperação:** permitir tentar novamente sem reiniciar o app.

---

#### Redirecionamento pós-login

* [ ] **Direcionamento conforme status “Criar Cavalo”**

**Descrição:** Após autenticar, conduzir usuário para o passo correto do onboarding/uso.

##### Regras de Negócio

* **Condição:** verificar se o usuário concluiu “Criar Cavalo”.
* **Destino:**

  * Não concluiu → Criar Cavalo
  * Concluiu → Feed/Home

##### Regras de UI/UX (se houver)

* **Transição:** navegação direta após sucesso (sem telas intermediárias no MVP).
* **Feedback:** evitar “tela em branco”; manter loading até navegar.

---

#### Acesso ao cadastro

* [ ] **Entrada para “Criar conta”**

**Descrição:** Usuário pode ir para a tela de cadastro a partir do login.

##### Regras de Negócio

* **Navegação:** abrir tela de cadastro existente.

##### Regras de UI/UX (se houver)

* **CTA secundário:** “Criar conta” visível sem rolagem.
* **Hierarquia:** CTA primário “Entrar” com maior destaque.

---

**Resumo do que entendi**

* Requisitos cobrem: login, validação, toggle de senha, loading, erros, redirecionamento e acesso ao cadastro.

**Sugestões rápidas**

* Se possível, registrar evento de analytics por tipo de erro (credenciais vs rede) para métricas
* Garantir que o CTA primário fique acima do teclado (em telas menores)

**Posso registrar essa versão ou deseja ajustar algo?**

---

### 3. Fluxo de Usuário (User Flow)

🚧 Em construção

**Fluxo: Entrar no Equiny**

1. O usuário acessa a tela **Entrar**.
2. O usuário preenche **E-mail** e **Senha**.
3. O usuário toca em **Entrar**.
4. O sistema valida o formulário(ões):

   * **Sucesso:** autentica e verifica status de ativação.
   * **Falha (form):** mostra validação (“Informe um e-mail válido.” / “Informe sua senha.”).
   * **Falha (credenciais):** mostra “E-mail ou senha inválidos.”
   * **Falha (rede/servidor):** mostra “Não foi possível entrar. Tente novamente.”
5. Em sucesso, o sistema direciona:

   * **Não criou cavalo:** vai para **Criar Cavalo**
   * **Já criou cavalo:** vai para **Feed/Home**

**Fluxo: Ir para Criar conta**

1. O usuário acessa a tela **Entrar**.
2. O usuário toca em **Criar conta**.
3. O sistema abre a **Tela de Cadastro**.

**Resumo do que entendi**

* Dois fluxos principais: login e navegação para cadastro.

**Sugestões rápidas**

* Se houver teclado aberto, garantir que a UI não esconda “Entrar”
* Considerar “Enter/Go” no teclado para disparar login quando válido

**Posso registrar essa versão ou deseja ajustar algo?**

---

### 4. Fora do Escopo (Out of Scope)

* Recuperação de senha (“Esqueci minha senha”)
* Login social (Google/Apple)
* Autenticação por telefone/OTP
* 2FA/MFA
* Multi-perfil/contas compartilhadas

---
