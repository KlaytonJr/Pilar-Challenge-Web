/// <reference types="vite/client" />
interface ImportMetaEnv {
  VITE_TMDB_API_URL: string
  VITE_TMDB_ACCESS_TOKEN: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
