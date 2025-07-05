import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // Example: alias '@' to 'src' directory
      "@components": path.resolve(__dirname, "./src/components"), // Example: alias '@components' to 'src/components'
      // Add more aliases matching your tsconfig.json paths
    },
  },
});
