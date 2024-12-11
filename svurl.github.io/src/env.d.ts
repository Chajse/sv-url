// src/env.d.ts

/// <reference types="svelte" />

interface ImportMetaEnv {
  VITE_ENCRYPTION_KEY: string;
}

interface ImportMeta {
  env: ImportMetaEnv;
}
