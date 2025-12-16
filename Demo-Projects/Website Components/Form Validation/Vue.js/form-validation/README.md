# Vue 3 FormValidation Component

Single File Component (SFC) using the Composition API.

## Files
- `src/components/FormValidation/FormValidation.vue` — Component
- `src/components/FormValidation/index.ts` — Barrel export
- `src/components/FormValidation/FormValidation.spec.ts` — Unit tests (Vitest + Vue Test Utils)

## Install (Vite + Vue 3 project assumed)
```bash
npm i -D vitest @vue/test-utils vue@^3 @vitejs/plugin-vue jsdom
```

Add to your Vite config if needed:
```ts
// vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  test: {
    environment: 'jsdom',
    globals: true
  }
})
```

## Usage
```ts
// main.ts
import { createApp } from 'vue'
import App from './App.vue'
createApp(App).mount('#app')
```

```vue
<!-- App.vue -->
<script setup lang="ts">
import { FormValidation } from './src/components/FormValidation'
</script>

<template>
  <FormValidation />
</template>
```

## Run tests
```bash
npx vitest
```
