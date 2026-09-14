# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])

```

You can also install [eslint-plugin-react-x](https://npmx.dev/package/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://npmx.dev/package/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])

```

## ✅ Checklist do desafio (Front-end)

item 1  - [x] Deve ser possível criar um link
item 2  - [x] Não deve ser possível criar um link com encurtamento mal formatado
item 3  - [x] Não deve ser possível criar um link com encurtamento já existente
item 4  - [ ] Deve ser possível deletar um link
item 5  - [ ] Deve ser possível obter a URL original por meio do encurtamento
item 6  - [x] Deve ser possível listar todas as URL's cadastradas
item 7  - [ ] Deve ser possível incrementar a quantidade de acessos de um link
item 8  - [ ] Deve ser possível baixar um CSV com o relatório dos links criados
item 9  - [x] É obrigatória a criação de uma aplicação React no formato SPA utilizando o Vite como bundler
item 10 - [ ] Siga o mais fielmente possível o layout do Figma
item 11 - [ ] Trabalhe com elementos que tragam uma boa experiência ao usuário (empty state, ícones de carregamento, bloqueio de ações a depender do estado da aplicação)
item 12 - [ ] Foco na responsividade: essa aplicação deve ter um bom uso tanto em desktops quanto em celulares