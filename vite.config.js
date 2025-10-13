import path from "path";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@components": path.resolve(__dirname, "./src/shared/components"),
      "@ui": path.resolve(__dirname, "./src/shared/components/ui"),
      "@features": path.resolve(__dirname, "./src/features"),
      "@layouts": path.resolve(__dirname, "./src/layouts"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@context": path.resolve(__dirname, "./src/context"),
      "@services": path.resolve(__dirname, "./src/shared/services"),
      "@utils": path.resolve(__dirname, "./src/shared/utils"),
      "@hooks": path.resolve(__dirname, "./src/shared/hooks"),
    },
  },
  build: {
    rollupOptions: {
      input: "./src/app/main.jsx",
    },
  },
});
