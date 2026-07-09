import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    proxy: {
      "/api": {
        target: "https://localhost:7069",
        changeOrigin: true,
        secure: false,       // localhost uses a self-signed dev cert
      },
      "/hubs": {
        target: "https://localhost:7069",
        changeOrigin: true,
        secure: false,
        ws: true,            // REQUIRED — lets SignalR's WebSocket upgrade through
      },
    },
  },
})
