<template>
   <!-- Main modal -->
   <div
      id="save-changes-modal"
      tabindex="-1"
      class="fixed inset-x-0 top-0 z-50 h-screen max-h-full w-full items-center justify-center overflow-y-auto overflow-x-hidden bg-zinc-800/50 md:inset-0"
      @click.self="emit('close')"
   >
      <div class="relative mx-auto flex h-screen max-h-full w-full max-w-5xl items-center justify-center p-4">
         <!-- Modal content -->
         <div class="relative max-h-[90vh] w-full overflow-y-auto rounded-xl border border-gray-300 bg-white shadow-sm">
            <!-- Modal header -->
            <div class="sticky top-0 flex items-center justify-between border-b border-gray-300 bg-white p-4 md:p-5">
               <h3 class="text-lg font-bold text-zinc-900">Select theme</h3>
               <button
                  type="button"
                  class="text-body hover:bg-neutral-tertiary hover:text-heading rounded-base ms-auto inline-flex size-9 items-center justify-center bg-transparent text-sm"
                  @click="emit('close')"
               >
                  <HeroIcon name="x-mark" class="size-5" />
                  <span class="sr-only">Close modal</span>
               </button>
            </div>
            <!-- Modal body -->
            <div class="p-4 md:p-5">
               <!-- Theme list grid -->
               <div class="mb-4">
                  <input
                     v-model="themeSearchQuery"
                     type="text"
                     placeholder="Search themes"
                     class="w-full rounded-md border border-gray-300 p-2"
                  />
               </div>

               <div class="grid grid-cols-3 gap-4">
                  <div v-for="(theme, themeIndex) in computedThemeList" :key="`theme-${themeIndex}`">
                     <button
                        :class="
                           [selectedThemeId, activeTheme].includes(theme.id)
                              ? activeTheme === theme.id
                                 ? 'border-green-600 ring-green-100/50 ring-4'
                                 : 'border-blue-600 ring-blue-100/50 ring-4'
                              : 'border-zinc-200 hover:border-zinc-300 hover:shadow-sm'
                        "
                        class="group relative block overflow-hidden rounded-lg border"
                        @click="selectedThemeId = theme.id"
                     >
                        <span
                           v-if="[selectedThemeId, activeTheme].includes(theme.id)"
                           class="absolute right-2 top-2 z-10 inline-flex size-7 items-center justify-center rounded-full border border-white text-white shadow-sm ring-2"
                           :class="
                              activeTheme === theme.id
                                 ? 'bg-green-600 ring-green-100/50'
                                 : 'bg-blue-600 ring-blue-100/50'
                           "
                        >
                           <HeroIcon name="check" class="size-4" />
                        </span>
                        <img
                           v-if="theme.thumbnail"
                           alt="Theme thumbnail"
                           :src="theme.thumbnail"
                           class="object-square aspect-video size-full"
                        />
                        <div v-else class="relative flex aspect-video items-center justify-center bg-stone-100 p-4">
                           <HeroIcon name="photo" class="size-10 text-zinc-400" />
                        </div>

                        <div class="relative border-t border-zinc-200 p-4">
                           <p class="mb-1 font-bold text-zinc-900">{{ theme.title }}</p>

                           <p class="text-sm text-zinc-500">
                              {{ theme.description }}
                           </p>
                        </div>
                     </button>
                  </div>
               </div>
            </div>
            <!-- Modal footer -->
            <div
               class="sticky bottom-0 flex items-center justify-end space-x-4 border-t border-gray-300 bg-white p-4 md:p-5"
            >
               <button
                  data-modal-hide="theme-settings-modal"
                  type="button"
                  class="text-body rounded-md border border-zinc-300 bg-zinc-100 px-4 py-3 text-sm text-zinc-600 hover:border-zinc-400 hover:text-zinc-900"
                  @click="emit('close')"
               >
                  Cancel
               </button>
               <button
                  data-modal-hide="theme-settings-modal"
                  type="button"
                  class="rounded-md border border-zinc-800 bg-zinc-800 px-4 py-3 text-sm text-white hover:bg-zinc-900"
                  @click="saveChanges"
               >
                  Save theme
               </button>
            </div>
         </div>
      </div>
   </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import HeroIcon from "../heroIcon/HeroIcon.vue";
import { getThemes, getThemeThumbnail, type Theme } from "vue-wswg-editor";
import { editorApiStore } from "../../pinia/api";

const apiStore = editorApiStore();

const emit = defineEmits(["close", "save"]);

const themeSearchQuery = ref("");
const selectedThemeId = ref<string | null>(apiStore.appTheme || null);
const activeTheme = computed(() => {
   return apiStore.appTheme;
});

/**
 * Fetch the themes from the wswg-editor-library
 *
 * As we are displaying this modal in the context of an editor, the registries are already loaded and we can access them directly.
 * Otherwise, we would need to initialise the registries to discover the themes.
 *
 */
const availableThemes = computed(() => {
   return getThemes();
});

// Sort and filter the themes
const computedThemeList = computed(() => {
   return availableThemes.value
      .filter((theme: Theme) => {
         // Search title, description and tags
         if (themeSearchQuery.value.trim()) {
            return (
               theme.title.toLowerCase().includes(themeSearchQuery.value.toLowerCase()) ||
               theme.description.toLowerCase().includes(themeSearchQuery.value.toLowerCase()) ||
               theme.tags.some((tag: string) => tag.toLowerCase().includes(themeSearchQuery.value.toLowerCase()))
            );
         }
         return true;
      })
      .map((theme: Theme) => {
         return {
            ...theme,
            thumbnail: getThemeThumbnail(theme.path),
         };
      });
});

// Save changes handler
async function saveChanges() {
   try {
      apiStore.appTheme = selectedThemeId.value ?? undefined;
      emit("close");
   } catch (error) {
      console.error("Error saving changes:", error);
   }
}
</script>
