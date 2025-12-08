<template>
   <div
      v-if="!isDismissed"
      class="border-b py-3"
      :class="isDarkMode ? 'border-gray-800 bg-gray-800 text-gray-300' : 'border-gray-200 bg-gray-100 text-gray-900'"
   >
      <div class="page-container flex items-center justify-between gap-5">
         <span v-if="isDismissable && textAlign === 'center'"> </span>

         <p
            class="flex-1 font-medium"
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
            class="rounded border p-1.5 shadow-sm transition-colors"
            :class="
               isDarkMode
                  ? 'border-gray-700 bg-gray-700 text-gray-300 hover:bg-gray-600'
                  : 'border-gray-200 bg-gray-100 text-gray-900 hover:bg-gray-50'
            "
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
import { defineProps, defineOptions, ref } from "vue";
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
         maxLength: 50,
         placeholder: "Enter announcement text...",
         label: "Text",
         required: true,
         validator: async (value) => {
            if (value && value.length >= 50) {
               return "Text must be less than 50 characters";
            }
            return true;
         },
      }),
      margin: createField.margin({ group: undefined }),
      isDarkMode: createField.boolean({
         label: "Dark mode",
      }),
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
      isDarkMode?: boolean;
   }>(),
   {
      textAlign: "center",
      text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
      isDismissable: false,
      isDarkMode: false,
   }
);

const isDismissed = ref<boolean>(false);
</script>
