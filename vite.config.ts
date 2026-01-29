import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
    proxy: {
      "/api": {
        target: "https://praktisibackend.vercel.app",
        changeOrigin: true,
        rewrite: (path: string) => path.replace(/^\/api/, ""),
      },
    },
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    chunkSizeWarningLimit: 700,
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          if (id.includes("node_modules")) {
            if (id.includes("react") || id.includes("react-dom")) return "react";
            if (id.includes("react-router-dom")) return "router";
            if (id.includes("@tanstack/react-query")) return "query";
            if (id.includes("lucide-react")) return "icons";
            if (id.includes("@radix-ui/react")) return "radix";
            return "vendor";
          }
          return undefined;
        },
      },
    },
  },
}));
