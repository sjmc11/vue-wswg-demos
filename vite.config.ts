import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath } from "url";
import tailwindcss from "@tailwindcss/vite";

/** Vite Wswg editor plugin **/
import { vueWswgEditorPlugin } from "vue-wswg-editor/vite-plugin";

export default defineConfig({
   resolve: {
      alias: {
         "@page-builder": fileURLToPath(new URL("./src/page-builder", import.meta.url)),
      },
   },
   plugins: [
      vue(),
      // wrapLibraryCSSInLayer(),
      tailwindcss(),
      vueWswgEditorPlugin({
         rootDir: "@page-builder",
      }) as any,
   ],
});
