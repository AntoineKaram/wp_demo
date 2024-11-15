import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { defineConfig as vitestDefineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom', // Use jsdom for React tests.
  },
});
