<template>
  <hr />
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
