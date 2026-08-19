import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/main/index.ts"],
  outDir: "dist",
  format: ["cjs"],
  target: "node24",
  clean: true,
  sourcemap: true,
  splitting: false,
  minify: false,
  dts: false,
  bundle: true,
  platform: "node",
  tsconfig: "./tsconfig.json",
});
