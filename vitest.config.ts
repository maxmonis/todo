import viteTsConfigPaths from "vite-tsconfig-paths"
import { defineConfig } from "vitest/config"

export default defineConfig({
  plugins: [viteTsConfigPaths({ projects: ["./tsconfig.json"] })],
  test: {
    coverage: { reportsDirectory: "./src/test/coverage" },
    dir: "./src",
    environment: "jsdom",
    globals: true,
    sequence: { shuffle: true },
    setupFiles: "./src/test/setup.ts",
  },
})
