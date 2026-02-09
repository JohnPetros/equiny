## PRD — Tela de Sign In

### 1. Objetivo

Permitir que o usuário entre no Equiny de forma rápida e confiável usando **e-mail e senha**, e conduzi-lo ao próximo passo do onboarding: **Criar Cavalo** (caso ainda não tenha concluído essa etapa).

---

### 2. Contexto e Premissas

* Autenticação no MVP é **exclusivamente por e-mail + senha**.
* O **cadastro** existe e solicita **nome do dono + e-mail + senha**.
* **Não haverá recuperação de senha** no MVP.
* Após entrar, o usuário deve ser direcionado para **Criar Cavalo** como primeira etapa de ativação.

---

### 3. Público-alvo

* Usuários novos que acabaram de instalar o app.
* Usuários recorrentes que desejam retomar uso do app.

---

### 4. Problema do Usuário

* “Quero acessar minha conta de forma simples e sem confusão.”
* “Quero continuar de onde parei e começar a usar o app (criar cavalo e seguir).”

---

### 5. Escopo

#### Dentro do escopo (in-scope)

* Campos de entrada: **E-mail** e **Senha**
* Ações: **Entrar** e **Criar conta**
* Controle de usabilidade: **Mostrar/ocultar senha**
* Mensagens de erro claras (ex.: credenciais inválidas, falha de conexão)
* Estados de carregamento (ex.: botão “Entrar” desabilitado durante envio)
* Direcionamento pós-login:

  * **Se ainda não criou cavalo → Criar Cavalo**
  * **Se já criou cavalo → Feed** (ou home principal do app)

#### Fora do escopo (out-of-scope)

* Recuperação de senha (“Esqueci minha senha”)
* Login social (Google/Apple)
* Autenticação por telefone/OTP
* 2FA/MFA
* Multi-perfil/contas compartilhadas

---

### 6. Requisitos Funcionais

1. **Entrar com e-mail e senha**

   * Usuário informa e-mail e senha e toca em “Entrar”.
   * Se sucesso: prossegue para o próximo passo adequado (ver requisito 6).

2. **Validação básica de formulário**

   * E-mail deve aceitar formato válido (ex.: contém “@” e domínio).
   * Senha não pode estar vazia.
   * Se inválido: impedir envio e informar o usuário de forma clara.

3. **Mostrar/ocultar senha**

   * Usuário pode alternar visualização da senha.

4. **Estados de carregamento**

   * Durante tentativa de login:

     * Botão “Entrar” fica desabilitado
     * Exibir indicador de carregamento

5. **Tratamento de falha de login**

   * Se credenciais inválidas: exibir mensagem genérica (“E-mail ou senha inválidos.”)
   * Se erro de rede/servidor: mensagem (“Não foi possível entrar. Tente novamente.”)

6. **Redirecionamento pós-login**

   * Se usuário ainda não concluiu “Criar Cavalo”: direcionar para **Criar Cavalo**
   * Caso contrário: direcionar para a tela inicial do app

7. **Acesso ao Cadastro**

   * Link/botão “Criar conta” na tela de login que leva para a tela de cadastro.

---

### 7. Requisitos de Conteúdo (microcopy)

* Título: “Entrar”
* Campo e-mail: “E-mail”
* Campo senha: “Senha”
* CTA primário: “Entrar”
* CTA secundário: “Criar conta”
* Mensagens:

  * Credenciais inválidas: “E-mail ou senha inválidos.”
  * Erro geral: “Não foi possível entrar. Tente novamente.”
  * Validação e-mail: “Informe um e-mail válido.”
  * Validação senha: “Informe sua senha.”

> Nota importante de produto (por não haver reset):

* No cadastro (não nesta tela), incluir aviso: “Guarde sua senha — ainda não temos recuperação no MVP.”

---

### 8. Requisitos de UX

* Layout limpo, com foco no CTA principal.
* Teclado apropriado para e-mail (ex.: “@” facilitado).
* Botão “Entrar” sempre visível sem rolagem em telas comuns.
* Acessibilidade:

  * Labels claros
  * Estados de erro visíveis e compreensíveis
  * Tamanho de toque adequado para botões

---

### 9. Métricas de Sucesso

* **Taxa de sucesso no login** (logins bem-sucedidos / tentativas)
* **Tempo para login** (mediana)
* **Taxa de abandono** na tela de login
* **Taxa de ativação pós-login**: % que conclui **Criar Cavalo** após entrar
* **Taxa de falhas por credenciais inválidas**

---

### 10. Critérios de Aceite (QA)

* [ ] É possível entrar com e-mail e senha válidos.
* [ ] Ao entrar, usuário é direcionado para **Criar Cavalo** se ainda não completou essa etapa.
* [ ] Com dados inválidos, o app bloqueia envio e mostra mensagens adequadas.
* [ ] Ao errar credenciais, o app mostra “E-mail ou senha inválidos.”
* [ ] Em falha de conexão, o app mostra mensagem de erro genérica e permite tentar novamente.
* [ ] Existe opção de mostrar/ocultar senha.
* [ ] Link “Criar conta” leva para a tela de cadastro.

---

### 11. Dependências

* Tela de **Cadastro**
* Fluxo de **Criar Cavalo**
* Tela inicial do app (Feed)
