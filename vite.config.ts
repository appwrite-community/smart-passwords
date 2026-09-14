import { defineConfig } from 'vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import { nitroV2Plugin } from '@tanstack/nitro-v2-vite-plugin'
import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  server: { port: 3000 },
  resolve: { tsconfigPaths: true },
  plugins: [tailwindcss(), tanstackStart(), nitroV2Plugin({ preset: 'node-server' }), viteReact()],
})
