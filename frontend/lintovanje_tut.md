# setup eslint

```bash
npm install --save-dev eslint eslint-plugin-solid
npx eslint --init
-> syntax + problems + style
-> javascript modules
-> none of these
-> no typescript
-> node
-> popular style guide
-> airbnb (ne koristim al moze i ovo)
-> json
```

u `.vscode/settings.json` dodati:

```json
{
  "editor.codeActionsOnSave": {
    "source.fixAll": "always"
  }
}
```
  
zamijeniti sadrzaj `.eslintrc.json` sa:
```json
{
  "env": {
    "browser": true,
    "es2021": true
  },
  "plugins": [
    "solid"
  ],
  "extends": [
    "eslint:recommended",
    "plugin:solid/recommended"
  ],
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "rules": {
    "solid/imports": "error",
    "solid/components-return-once": "warn",
    "solid/reactivity": "warn",
    "solid/self-closing-comp": "warn"
  }
}
```

na Marketplace-u vskoda:
- Prettier
- ESLint
- Tailwind CSS IntelliSense
- Autoprefixer (CSS)
- PostCSS Language Support
- SolidJS Snippets (ko voli nek izvoli)