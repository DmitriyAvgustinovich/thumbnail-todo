import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      pages: "/src/pages",
      components: "/src/components",
      configs: "/src/configs",
      constants: "/src/constants",
      hooks: "/src/hooks",
      store: "/src/store",
      providers: "/src/providers",
      types: "/src/types",
      utils: "/src/utils",
      assets: "/src/assets",
      styles: "/src/styles",
    },
  },
});
