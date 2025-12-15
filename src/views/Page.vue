<template>
   <div class="page-preview">
      <div
         class="page-preview-header z-40 flex flex-wrap items-center gap-x-7 gap-y-3 bg-zinc-800 px-5 py-3 text-white"
      >
         <router-link to="/" class="rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2 text-xs hover:bg-zinc-700"
            >← Back to editor</router-link
         >
         <p class="text-sm text-zinc-300">
            This is a page preview using the
            <code class="mx-1 rounded-md bg-zinc-700 px-2 py-1 text-xs">&lt;PageRenderer&gt;</code> component.
         </p>
      </div>

      <div class="page-preview-content">
         <!-- Loading state -->
         <div v-if="apiStore.isLoading" class="flex min-h-[400px] items-center justify-center">
            <div class="text-center">
               <div class="mb-4 inline-block size-8 animate-spin rounded-full border-b-2 border-zinc-800"></div>
               <p class="text-zinc-600">Loading page...</p>
            </div>
         </div>

         <!-- Page content -->
         <PageRenderer
            v-else-if="apiStore.pageData?.blocks"
            :blocks="apiStore.pageData.blocks"
            :layout="apiStore.pageData?.settings?.layout"
            :settings="apiStore.pageData?.settings"
            :with-layout="true"
            :theme="apiStore.appTheme"
         />

         <!-- Empty state -->
         <div v-else class="flex min-h-[400px] items-center justify-center">
            <p class="text-zinc-500">No page data available</p>
         </div>
      </div>
   </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { PageRenderer } from "vue-wswg-editor";
import { editorApiStore } from "../pinia/api";

const apiStore = editorApiStore();

async function loadPage() {
   try {
      await apiStore.fetchPage();
   } catch (error) {
      console.error("Error loading page:", error);
   }
}

onMounted(() => {
   // Only fetch if we don't have page data yet
   if (!apiStore.pageData?.blocks || apiStore.pageData.blocks.length === 0) {
      loadPage();
   }
});
</script>
