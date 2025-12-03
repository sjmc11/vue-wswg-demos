<template>
  <div>
    <header class="publishing-bar border-b border-gray-300 bg-white">

      <div class="inline-flex gap-2 items-center w-full px-5 py-1 h-16">
        <div class="branding mr-auto inline-flex gap-3 items-center">
          <img src="../assets/branding.png" alt="Branding" class="h-7" />
          <span class="text-zinc-800 font-medium text-sm">Vue WSWG Editor</span>
        </div>

        <!-- Auto-save status -->
        <div class="text-sm text-zinc-500">
          <span v-if="apiStore.isSaving">Saving...</span>
          <span v-else-if="apiStore.error" class="text-red-600">{{ apiStore.error }}</span>
        </div>
        <!-- Abandon changes button -->
        <button
          :disabled="apiStore.isSaving || apiStore.isLoading || !apiStore.hasUnsavedChanges"
          class="bg-zinc-50 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 border border-zinc-300 px-4 py-2 rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed" 
          @click="abandonChanges">
          <span>Abandon changes</span>
        </button>
        <!-- Publish button -->
        <button
          class="bg-zinc-800 text-white hover:bg-zinc-900 border border-zinc-800 px-4 py-2 rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed" 
          :title="apiStore.hasUnsavedChanges ? 'You have unsaved changes' : 'No changes to save'"
          :disabled="apiStore.isSaving || apiStore.isLoading || !apiStore.hasUnsavedChanges"
          @click="showSaveChangesModal = true">
          <span>Save changes</span>
        </button>
      </div>
    </header>
    <WswgJsonEditor
      class="wswg-json-editor"
      v-model="apiStore.pageData"
      blocksKey="blocks"
      settingsKey="settings"
      :url="`/page`"
      :showBrowserBar="true"
      :editable="isEditing"
      defaultBlockMargin="small"
      :loading="apiStore.isLoading"
    >
      <template #toolbar>
        <div class="inline-flex gap-2 items-center px-3">
          <RouterLink
            to="/page"
            class="bg-zinc-50 px-2 py-1 rounded-md text-xs hover:bg-blue-100 hover:text-blue-600 hover:border-blue-300 border"
            >Page renderer</RouterLink
          >
          <RouterLink
            to="/page"
            class="bg-zinc-50 px-2 py-1 rounded-md text-xs hover:bg-blue-100 hover:text-blue-600 hover:border-blue-300 border"
            >View JSON</RouterLink
          >
          <p
            class="bg-amber-100 px-2 py-1 rounded-md text-xs inline-flex gap-2 border border-amber-200 cursor-default"
          >
            <span>ℹ️</span>
            <span>Add custom toolbar elements via slot</span>
          </p>
        </div>
      </template>
    </WswgJsonEditor>

    <!-- Save changes modal -->
    <SaveChangesModal v-if="showSaveChangesModal" :pageData="apiStore.pageData" @close="showSaveChangesModal = false" @save="saveChanges" />
  </div>
</template>

<script setup lang="ts">
import 'vue-wswg-editor/style.css';
import { ref, onMounted } from 'vue';
import { WswgJsonEditor } from 'vue-wswg-editor';
import SaveChangesModal from '../components/SaveChangesModal.vue';
import { editorApiStore } from '../pinia/api';

const apiStore = editorApiStore();
const isEditing = ref(true);
const showSaveChangesModal = ref(false);

// Load page data on mount
onMounted(async () => {
  try {
    await apiStore.fetchPage();
  } catch (error) {
    console.error('Error loading page:', error);
  }
});

// Save changes handler
async function saveChanges() {
  try {
    await apiStore.saveChanges();
    showSaveChangesModal.value = false;
    console.log('Changes saved successfully');
  } catch (error) {
    console.error('Error saving changes:', error);
  }
}

// Abandon changes handler
function abandonChanges() {
  apiStore.revertChanges();
  showSaveChangesModal.value = false;
  console.log('Changes abandoned successfully');
}
</script>

<style scoped>
.wswg-json-editor {
  /* 4rem is the height of the publishing bar */
  /* 1px is the border of the publishing bar */
  --editor-height: calc(100vh - 4rem - 1px);
}
</style>