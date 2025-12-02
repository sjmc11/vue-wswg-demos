<template>
  <div>
    <WswgJsonEditor
      v-model="pageData"
      blocksKey="blocks"
      settingsKey="settings"
      :url="`/page/preview`"
      :showBrowserBar="true"
      :editable="isEditing"
      defaultBlockMargin="small"
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
  </div>
</template>

<script setup lang="ts">
import 'vue-wswg-editor/style.css';
import { ref, onMounted } from 'vue';
import { WswgJsonEditor } from 'vue-wswg-editor';
const isEditing = ref<Boolean>(true);
const pageData = {};
</script>


<style lang="scss">
// @import 'vue-wswg-editor/style.css';
</style>