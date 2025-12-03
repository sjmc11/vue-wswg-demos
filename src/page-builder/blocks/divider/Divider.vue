<template>
  <div class="max-w-5xl mx-auto px-5">
    <hr class="border-t-2 border-gray-200" />
  </div>
</template>

<script lang="ts" setup>
import { defineOptions, defineProps } from 'vue';

defineOptions({
  label: 'Divider',
});

const props = withDefaults(
  defineProps<{
    kicker?: string;
  }>(),
  {}
);
</script>
