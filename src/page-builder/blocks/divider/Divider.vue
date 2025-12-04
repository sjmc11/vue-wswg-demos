<template>
   <div class="mx-auto max-w-5xl px-5">
      <hr class="border-t-2 border-gray-200" />
   </div>
</template>

<script lang="ts" setup>
import { defineOptions, defineProps } from "vue";

defineOptions({
   label: "Divider",
});

withDefaults(
   defineProps<{
      kicker?: string;
   }>(),
   {}
);
</script>
