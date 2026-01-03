<template>
   <div class="page-container">
      <hr class="border-t-2 border-emerald-800/30" />
   </div>
</template>

<script lang="ts" setup>
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
