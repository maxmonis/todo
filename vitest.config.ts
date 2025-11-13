import tailwindcss from "@tailwindcss/vite"
import { tanstackStart } from "@tanstack/react-start/plugin/vite"
import viteReact from "@vitejs/plugin-react"
import viteTsConfigPaths from "vite-tsconfig-paths"
import { defineConfig } from "vitest/config"

export default defineConfig({
  cacheDir: "./node_modules",
  plugins: [
    tailwindcss(),
    tanstackStart(),
    viteReact(),
    viteTsConfigPaths({ projects: ["./tsconfig.json"] }),
  ],
  test: {
    dir: "./src",
    environment: "jsdom",
    globals: true,
    isolate: true,
    setupFiles: "./src/test/setup.ts",
  },
})
