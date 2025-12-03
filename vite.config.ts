import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { fileURLToPath } from 'url';
import tailwindcss from '@tailwindcss/vite';

/** Vite Wswg editor plugin **/
import { vueWswgEditorPlugin } from 'vue-wswg-editor/vite-plugin';

/**
 * Plugin to wrap vue-wswg-editor CSS in a layer to prevent conflicts
 * Keeps all library styles (including Tailwind utilities) but isolates them
 * so Tailwind v4 utilities take precedence when both exist
 */
function wrapLibraryCSSInLayer() {
  return {
    name: 'wrap-library-css-in-layer',
    enforce: 'pre' as const,
    transform(code: string, id: string) {
      // Only process vue-wswg-editor's style.css (whether imported in main.ts or Editor.vue)
      if (id.includes('vue-wswg-editor') && id.endsWith('style.css')) {
        // Wrap the entire library CSS in a layer with lower priority
        // This allows Tailwind v4 utilities to override v3 utilities when needed
        // while still keeping all library styles available for library components
        return {
          code: `@layer vue-wswg-editor-library {\n${code}\n}`,
          map: null,
        };
      }
      return null;
    },
  };
}

export default defineConfig({
  resolve: {
    alias: {
      '@page-builder': fileURLToPath(
        new URL('./src/page-builder', import.meta.url)
      ),
    },
  },
  plugins: [
    vue(),
    wrapLibraryCSSInLayer(),
    tailwindcss(),
    vueWswgEditorPlugin({
      rootDir: '@page-builder',
    }) as any,
  ],
});
