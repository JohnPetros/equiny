<h1 align="center">🐴 Equiny</h1>

Sistema completo da plataforma **Equiny**, composto por app mobile, backend, landing page e infraestrutura como código. A regra de negócio central é conectar **donos de cavalos** por interesse mútuo, garantindo um fluxo confiável de descoberta, match e conversa.

## 🚀 Visão Geral

A Equiny conecta proprietários de cavalos em um fluxo de:

- **Feed com swipe:** like/dislike em perfis de cavalos.
- **Match automático:** conexão quando há curtida mútua.
- **Chat em tempo real:** conversa entre perfis com match.
- **Ecossistema integrado:** mobile + API + web + infraestrutura.

## 🧩 Módulos do Monorepo

- **`equiny-mobile/`**: aplicativo Flutter (iOS/Android).
- **`equiny-server/`**: API em FastAPI (Python).
- **`equiny-lp/`**: landing page em Astro + React.
- **`equiny-iac/`**: infraestrutura com Pulumi (GCP).
- **`documentation/`**: PRD's e documentação funcional.

## 🛠 Tech Stack

- **Mobile:** Flutter, Riverpod, Signals, GoRouter, Dio.
- **Backend:** Python, FastAPI, SQLAlchemy, Alembic, Redis, Supabase.
- **Web (LP):** Astro, React, Tailwind, Vite.
- **Infra:** Pulumi + GCP.

## ⚙️ Como começar

Cada módulo tem setup próprio. Entre na pasta desejada e siga o README local:

```bash
cd equiny-mobile   # ou equiny-server / equiny-lp / equiny-iac
```

## 📖 Documentação

- **Visão geral do produto:** `documentation/overview.md`

## 📌 Milestones (PRDs)

Os PRDs e entregas evolutivas do produto estão organizados em milestones no GitHub:

- **Cadastro de dono de cavalo**: https://github.com/JohnPetros/equiny/milestone/1  
  Define o fluxo de cadastro (sign-up), validações de entrada e verificação por e-mail para criação segura de conta.

- **Onboarding**: https://github.com/JohnPetros/equiny/milestone/2  
  Estrutura o passo a passo inicial pós-cadastro para garantir que o usuário configure o primeiro cavalo antes de acessar o feed.

- **Sign In**: https://github.com/JohnPetros/equiny/milestone/3  
  Cobre autenticação com e-mail/senha, tratamento de erros, estados de carregamento e roteamento após login (criar cavalo ou feed).

- **Profile**: https://github.com/JohnPetros/equiny/milestone/4  
  Consolida a tela de perfil (dono e cavalo), incluindo edição de dados, autosave, validações e upload de avatar.

- **Feed**: https://github.com/JohnPetros/equiny/milestone/5  
  Implementa a experiência principal de descoberta com cards, swipe like/dislike, filtros e regras de elegibilidade de perfis.

- **Matches**: https://github.com/JohnPetros/equiny/milestone/6  
  Organiza conexões por status (Novos/Todos), prioriza recência e habilita a transição rápida para início de conversa.

- **Chat**: https://github.com/JohnPetros/equiny/milestone/7  
  Define mensageria entre donos com histórico, envio de texto, anexos (imagem/documento) e estados de envio/falha.

- **Inbox**: https://github.com/JohnPetros/equiny/milestone/8  
  Estrutura a lista de conversas com atualização em tempo real, ordenação por última atividade, não lidas e presença online/offline.

- **Notificacao de Match**: https://github.com/JohnPetros/equiny/milestone/10  
  Entrega modal foreground de match e base técnica de push notification (OneSignal), preparando evolução para deep link e telemetria.

## 📝 Licença

Projeto interno do ecossistema **Equiny**.
