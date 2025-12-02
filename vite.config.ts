import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { fileURLToPath } from 'url';
import tailwindcss from '@tailwindcss/vite';

/** Vite Wswg editor plugin **/
import { vueWswgEditorPlugin } from 'vue-wswg-editor/vite-plugin';

/**
 * Plugin to strip Tailwind utilities from vue-wswg-editor CSS
 * Keeps only custom component styles to prevent v3/v4 conflicts
 * Tailwind v4 will generate utilities by scanning library source files
 */
function stripTailwindFromLibraryCSS() {
  return {
    name: 'strip-tailwind-from-library-css',
    enforce: 'pre' as const,
    transform(code: string, id: string) {
      // Only process vue-wswg-editor's style.css (whether imported in main.ts or Editor.vue)
      if (id.includes('vue-wswg-editor') && id.endsWith('style.css')) {
        // Find where Tailwind base styles start (the universal selector with CSS variables)
        // This marks the beginning of Tailwind v3 utilities
        const tailwindBaseStart = code.indexOf('*,:before,:after{--tw-border-spacing-x:');
        
        if (tailwindBaseStart > 0) {
          // Extract everything before Tailwind base styles
          // This includes all custom component styles (scoped with [data-v-*] and specific classes)
          let customStyles = code.substring(0, tailwindBaseStart);
          
          // Ensure we end with a complete CSS rule
          const lastBrace = customStyles.lastIndexOf('}');
          if (lastBrace > 0 && lastBrace < customStyles.length - 1) {
            const afterLastBrace = customStyles.substring(lastBrace + 1).trim();
            if (afterLastBrace.length > 0) {
              // Remove any incomplete content after the last brace
              customStyles = customStyles.substring(0, lastBrace + 1);
            }
          }
          
          return {
            code: customStyles,
            map: null,
          };
        }
        
        // If we can't find the Tailwind base marker, return empty
        // (safer than including potentially conflicting utilities)
        return {
          code: '',
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
    stripTailwindFromLibraryCSS(),
    tailwindcss(),
    vueWswgEditorPlugin({
      rootDir: '@page-builder',
    }) as any,
  ],
});
