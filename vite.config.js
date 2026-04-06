import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Site is hosted at explain.todie.io (canonical) with rant.todie.io as an
// alias — both subdomains point at the same Cloudflare Pages project, so
// assets resolve from /, not /explainers/.
export default defineConfig({
  plugins: [react()],
  base: '/',
})
