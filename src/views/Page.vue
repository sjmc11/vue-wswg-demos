<template>
  <div class="page-preview">
    <div class="page-preview-header sticky top-0 z-10 bg-zinc-800 text-white px-5 py-3 flex items-center gap-x-7 gap-y-3 flex-wrap">
      <router-link to="/" class="text-xs bg-zinc-800 border border-zinc-700 px-3 py-2 rounded-md hover:bg-zinc-700">← Back to editor</router-link>
      <p class="text-sm text-zinc-300">This is a page preview using the <code class="bg-zinc-700 px-2 py-1 rounded-md mx-1">&lt;PageRenderer&gt;</code> component.</p>
    </div>

    <div class="page-preview-content">
      <!-- Loading state -->
      <div v-if="apiStore.isLoading" class="flex items-center justify-center min-h-[400px]">
        <div class="text-center">
          <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-zinc-800 mb-4"></div>
          <p class="text-zinc-600">Loading page...</p>
        </div>
      </div>

      <!-- Page content -->
      <PageRenderer
         v-else-if="apiStore.pageData?.blocks"
         :blocks="apiStore.pageData.blocks"
         :layout="apiStore.pageData?.settings?.layout"
         :settings="apiStore.pageData?.settings"
      />
      
      <!-- Empty state -->
      <div v-else class="flex items-center justify-center min-h-[400px]">
        <p class="text-zinc-500">No page data available</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { PageRenderer } from 'vue-wswg-editor';
import { editorApiStore } from '../pinia/api';

const apiStore = editorApiStore();

async function loadPage() {
  try {
    await apiStore.fetchPage();
  } catch (error) {
    console.error('Error loading page:', error);
  }
}

onMounted(() => {
  // Only fetch if we don't have page data yet
  if (!apiStore.pageData?.blocks || apiStore.pageData.blocks.length === 0) {
    loadPage();
  }
});
</script>
