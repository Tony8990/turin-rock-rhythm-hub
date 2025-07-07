import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// Get backend API address from env or default to WSL IP
const backendHost = process.env.VITE_API_HOST || "http://172.28.155.57:666";

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 666,
    proxy: {
      '/api': {
        target: backendHost,
        changeOrigin: true,
        secure: false,
      },
    },
  },
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
