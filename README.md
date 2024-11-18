# vcourse

Um site para gerenciamento de um curso qualquer. O desenvolvimento tem fins didáticos.

# extensões
No `vscode`, recomendo instalar a extensão `vue - official`.

# json-server

Adicionei um comando `pnpm db` no `package.json` para iniciar o `json-server` e o `json-server-auth` simulando um `backend` real na porta `8080`. Todas as rotas foram criadas automaticamente. Segue a documentação das rotas geradas:

Rotas no geral: https://www.npmjs.com/package/json-server#routes
Autenticação: https://github.com/jeremyben/json-server-auth?tab=readme-ov-file#login-

----

# vue

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
pnpm install
```

### Compile and Hot-Reload for Development

```sh
pnpm dev
```

### Type-Check, Compile and Minify for Production

```sh
pnpm build
```

### Lint with [ESLint](https://eslint.org/)

```sh
pnpm lint
```
