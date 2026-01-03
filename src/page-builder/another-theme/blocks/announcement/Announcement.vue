<template>
   <div v-if="!isDismissed" class="border-y border-emerald-800/20 bg-emerald-950 py-3 sm:pt-5">
      <div class="page-container flex items-center justify-between gap-5">
         <span v-if="isDismissable && textAlign === 'center'"> </span>
         <p
            class="flex-1 font-serif font-medium text-stone-50"
            :class="{
               'text-left': textAlign === 'left',
               'text-center': textAlign === 'center',
               'text-right': textAlign === 'right',
            }"
         >
            {{ text }}
         </p>
         <button
            v-if="isDismissable"
            type="button"
            aria-label="Dismiss"
            class="rounded border border-emerald-800/30 bg-stone-50 p-1.5 text-emerald-900 shadow-sm transition-colors hover:bg-emerald-50"
            @click="isDismissed = true"
         >
            <svg
               xmlns="http://www.w3.org/2000/svg"
               fill="none"
               viewBox="0 0 24 24"
               stroke-width="1.5"
               stroke="currentColor"
               class="size-5"
            >
               <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12"></path>
            </svg>
         </button>
      </div>
   </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { createField } from "vue-wswg-editor";

defineOptions({
   label: "Announcement",
   fields: {
      textAlign: createField.select(
         [
            { label: "Left", value: "left", id: "align-left" },
            { label: "Center", value: "center", id: "align-center" },
            { label: "Right", value: "right", id: "align-right" },
         ],
         {
            default: "center",
            label: "Text align",
         }
      ),
      text: createField.text({
         maxLength: 120,
         placeholder: "Enter announcement text...",
         label: "Text",
         required: true,
         validator: async (value: string) => {
            if (value && value.length >= 120) {
               return "Text must be less than 120 characters";
            }
            return true;
         },
      }),
      margin: createField.margin({ group: undefined }),
      isDismissable: createField.boolean({
         label: "Dismissable",
      }),
   },
});

withDefaults(
   defineProps<{
      text?: string;
      textAlign?: "left" | "center" | "right";
      isDismissable?: boolean;
   }>(),
   {
      textAlign: "center",
      text: "Important announcement: Check out our latest updates and features!",
      isDismissable: false,
   }
);

const isDismissed = ref<boolean>(false);
</script>
