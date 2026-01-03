<template>
   <div>
      <header class="publishing-bar border-b border-gray-300 bg-white">
         <div class="inline-flex h-16 w-full items-center gap-2 px-5 py-1">
            <div class="branding mr-auto inline-flex items-center gap-3">
               <img src="../assets/branding.png" alt="Branding" class="h-7" />
               <SettingsDropdown label="acme-inc.com" @menu-item-click="handleMenuItemClick" />
            </div>

            <!-- Save/publish status -->
            <div class="text-sm text-zinc-500">
               <span v-if="apiStore.isSaving">Saving...</span>
               <span v-else-if="apiStore.error" class="text-red-600">{{ apiStore.error }}</span>
            </div>
            <!-- Abandon changes button -->
            <button
               :disabled="apiStore.isSaving || apiStore.isLoading || !apiStore.hasUnsavedChanges"
               class="rounded-md border border-zinc-300 bg-zinc-50 px-4 py-2 text-sm text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 disabled:cursor-not-allowed disabled:opacity-50"
               @click="abandonChanges"
            >
               <span>Abandon changes</span>
            </button>
            <!-- Publish button -->
            <button
               class="rounded-md border border-zinc-800 bg-zinc-800 px-4 py-2 text-sm text-white hover:bg-zinc-900 disabled:cursor-not-allowed disabled:opacity-50"
               :title="apiStore.hasUnsavedChanges ? 'You have unsaved changes' : 'No changes to save'"
               :disabled="apiStore.isSaving || apiStore.isLoading || !apiStore.hasUnsavedChanges"
               @click="showSaveChangesModal = true"
            >
               <span>Save changes</span>
            </button>
         </div>
      </header>
      <WswgPageBuilder
         v-model="apiStore.pageData"
         class="wswg-page-builder"
         blocksKey="blocks"
         settingsKey="settings"
         :url="`/page`"
         :showBrowserBar="true"
         :editable="isEditing"
         defaultBlockMargin="small"
         :loading="apiStore.isLoading"
         :theme="apiStore.appTheme"
      />

      <!-- Save changes modal -->
      <SaveChangesModal
         v-if="showSaveChangesModal"
         :pageData="apiStore.pageData"
         @close="showSaveChangesModal = false"
         @save="saveChanges"
      />

      <!-- Theme settings modal -->
      <ThemeSettingsModal v-if="showThemeSettingsModal" @close="showThemeSettingsModal = false" />
   </div>
</template>

<script setup lang="ts">
import "vue-wswg-editor/style.css";
import { ref, onMounted } from "vue";
import { WswgPageBuilder } from "vue-wswg-editor";
import SaveChangesModal from "../components/saveChangesModal/SaveChangesModal.vue";
import { editorApiStore } from "../pinia/api";
import SettingsDropdown from "../components/settingsDropdown/SettingsDropdown.vue";
import ThemeSettingsModal from "../components/themeSettingsModal/ThemeSettingsModal.vue";

const apiStore = editorApiStore();
const isEditing = ref(true);
const showSaveChangesModal = ref(false);
const showThemeSettingsModal = ref(false);

// Load page data on mount
onMounted(async () => {
   try {
      await apiStore.fetchPage();
   } catch (error) {
      console.error("Error loading page:", error);
   }
});

// Save changes handler
async function saveChanges() {
   try {
      await apiStore.saveChanges();
      showSaveChangesModal.value = false;
      console.log("Changes saved successfully");
   } catch (error) {
      console.error("Error saving changes:", error);
   }
}

// Abandon changes handler
function abandonChanges() {
   apiStore.revertChanges();
   showSaveChangesModal.value = false;
   console.log("Changes abandoned successfully");
}

// Handle menu item click
function handleMenuItemClick(item: string) {
   if (item === "theme-settings") {
      showThemeSettingsModal.value = true;
   }
}
</script>

<style scoped>
.wswg-page-builder {
   /* 4rem is the height of the publishing bar */
   /* 1px is the border of the publishing bar */
   --editor-height: calc(100vh - 4rem - 1px);

   /* Editor colors (defaults) */
   --editor-bg-color: #6a6a6a;
   --block-badge-color: #638ef1;
   --block-backdrop-color: transparent;
   --block-border-color: #638ef1;
   --block-border-width: 4px;
   --block-border-style: solid;
   --partial-backdrop-color: transparent;
   --partial-border-color: #638ef1;
   --partial-border-width: 4px;
   --partial-border-style: solid;
   --margin-color: #faf6d5e0;
   --margin-border-width: 2px;
   --margin-border-style: dashed;
   --margin-border-color: #cbc59c;
}
</style>
