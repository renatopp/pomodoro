import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    preprocessorOptions: {
      sass: { api: "modern", silenceDeprecations: ["legacy-js-api"] },
      scss: { api: "modern", silenceDeprecations: ["legacy-js-api"] },
    },
  },
  plugins: [vue()],
});
