import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm"], // Build for commonJS and ESmodules
  splitting: false,
  sourcemap: true,
  clean: true,
});