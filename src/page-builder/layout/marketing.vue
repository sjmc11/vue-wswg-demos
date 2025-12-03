<template>
  <main class="marketing-page-layout">
    <div class="bg-amber-100 text-amber-700 p-5 text-center font-medium">
      <p>Marketing Page Layout</p>
    </div>
    <main>
      <p>
        <slot name="default">
          <!-- page blocks will be rendered here -->
        </slot>
      </p>
    </main>
  </main>
</template>

<script setup lang="ts">
//import { createField } from "vue-wswg-editor";

defineOptions({
  name: 'marketing',
  label: 'Marketing page layout',
  fields: {},
});
</script>

<style lang="scss" scoped>
.default-page-layout {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: #f44;
}
</style>
