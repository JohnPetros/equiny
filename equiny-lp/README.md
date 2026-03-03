<h1 align="center">🐴 Equiny</h1>

Landing page oficial do **Equiny**, plataforma que conecta proprietarios e haras para encontrar o par ideal de cavalos com seguranca, privacidade e fluidez de uso.

## 🚀 Visao Geral

Este projeto entrega uma LP moderna e responsiva para apresentar o aplicativo e incentivar o pre-cadastro/download:

- **Hero de Conversao:** proposta de valor clara com chamadas para download.
- **Fluxo em 4 Etapas:** explicacao visual de cadastro, filtros, match e chat.
- **Blocos de Beneficios e Seguranca:** reforco de confianca para novos usuarios.
- **Preview do Produto:** mockups e carousel com visao da experiencia no app.
- **FAQ e CTA Final:** respostas rapidas para duvidas e aumento de conversao.

## 🛠 Tech Stack

O projeto foi construido com foco em performance e manutencao simples:

- **Framework:** [Astro](https://astro.build)
- **Linguagem:** [TypeScript](https://www.typescriptlang.org)
- **UI:** Componentes `.astro` + CSS global
- **Estilizacao:** [Tailwind CSS v4](https://tailwindcss.com)
- **Runtime:** [Node.js](https://nodejs.org)

## 🏗 Arquitetura

Organizacao baseada em componentes e dados desacoplados:

- **Pages (`src/pages`)**: rotas da aplicacao (entrada principal em `index.astro`).
- **Components (`src/components`)**: blocos reutilizaveis da interface (Navbar, FAQ, CTA, etc).
- **Layouts (`src/layouts`)**: estrutura base da pagina.
- **Data (`src/data`)**: conteudo da landing centralizado (menus, passos, beneficios, FAQ).
- **Styles (`src/styles`)**: estilos globais e tokens visuais.

## 📂 Estrutura do Projeto

```bash
src/
├── assets/         # Imagens e recursos visuais
├── components/     # Componentes da landing page
├── data/           # Dados de conteudo da pagina
├── layouts/        # Layout base
├── pages/          # Rotas Astro
└── styles/         # Estilos globais
```

## ⚙️ Configuracao e Instalacao

### Pre-requisitos

- Node.js 18+
- npm

### Passo a Passo

1. **Clone o repositorio:**

   ```bash
   git clone <url-do-repositorio>
   cd equiny-lp
   ```

2. **Configure o ambiente:**
   Copie `.env.example` para `.env` e ajuste as variaveis necessarias.

   ```bash
   cp .env.example .env
   ```

3. **Instale as dependencias:**

   ```bash
   npm install
   ```

4. **Execute em desenvolvimento:**

   ```bash
   npm run dev
   ```

## 📜 Scripts

- `npm run dev` - inicia servidor local em `http://localhost:3000`
- `npm run build` - gera build de producao
- `npm run preview` - visualiza build localmente
- `npm run lint` - validacao de tipos com TypeScript
- `npm run clean` - remove pasta `dist`

## 🧪 Testes e Qualidade

Atualmente o projeto possui validacao de tipos via TypeScript:

```bash
npm run lint
```

## 📝 Licenca

Projeto privado Equiny. Todos os direitos reservados.
