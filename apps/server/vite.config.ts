import { cloudflare } from "@cloudflare/vite-plugin";
/// <reference types="vitest" />
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [cloudflare(), tsconfigPaths()],
});
