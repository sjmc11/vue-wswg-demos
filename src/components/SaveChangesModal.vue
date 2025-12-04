<template>
   <!-- Main modal -->
   <div
      id="save-changes-modal"
      tabindex="-1"
      class="fixed inset-x-0 top-0 z-50 h-screen max-h-full w-full items-center justify-center overflow-y-auto overflow-x-hidden bg-zinc-800/50 md:inset-0"
   >
      <div class="relative mx-auto flex h-screen max-h-full w-full max-w-2xl items-center justify-center p-4">
         <!-- Modal content -->
         <div class="relative w-full rounded-xl border border-gray-300 bg-white p-4 shadow-sm md:p-6">
            <!-- Modal header -->
            <div class="flex items-center justify-between border-b border-gray-300 pb-4 md:pb-5">
               <h3 class="text-lg font-bold text-zinc-900">Save changes</h3>
               <button
                  type="button"
                  class="text-body hover:bg-neutral-tertiary hover:text-heading rounded-base ms-auto inline-flex size-9 items-center justify-center bg-transparent text-sm"
                  @click="emit('close')"
               >
                  <svg
                     class="size-5"
                     xmlns="http://www.w3.org/2000/svg"
                     width="24"
                     height="24"
                     fill="none"
                     viewBox="0 0 24 24"
                  >
                     <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M6 18 17.94 6M18 18 6.06 6"
                     />
                  </svg>
                  <span class="sr-only">Close modal</span>
               </button>
            </div>
            <!-- Validation errors -->
            <div v-if="hasValidationErrors" class="space-y-4 py-4 md:space-y-4 md:py-6">
               <p class="mb-6 rounded-md bg-amber-500/20 px-4 py-3 text-amber-900">
                  Please fix the following errors before saving:
               </p>
               <template v-for="(blockType, blockTypeKey) in validationResults" :key="blockTypeKey">
                  <div v-if="!blockType.isValid" class="rounded-md border border-gray-300 p-4">
                     <h4 class="mb-2 block text-base font-bold text-zinc-900">{{ blockType.title }}</h4>
                     <ul class="list-inside list-disc space-y-2 text-sm text-zinc-600">
                        <li v-for="(error, errorKey) in blockType.errors" :key="errorKey">{{ error }}</li>
                     </ul>
                  </div>
               </template>
            </div>
            <!-- Confirmation message -->
            <div v-else class="space-y-4 py-4 md:space-y-4 md:py-6">
               <p class="text-body leading-relaxed">Are you sure you want to save changes?</p>
               <p class="text-body leading-relaxed">
                  This action will replace and overwrite all previous published versions of this page.
               </p>
            </div>
            <!-- Modal footer -->
            <div class="flex items-center justify-end space-x-4 border-t border-gray-300 pt-4 md:pt-5">
               <button
                  data-modal-hide="save-changes-modal"
                  type="button"
                  class="text-body rounded-md border border-zinc-300 bg-zinc-100 px-4 py-3 text-sm text-zinc-600 hover:border-zinc-400 hover:text-zinc-900"
                  @click="emit('close')"
               >
                  Cancel
               </button>
               <button
                  v-if="!hasValidationErrors"
                  data-modal-hide="save-changes-modal"
                  type="button"
                  class="rounded-md border border-zinc-800 bg-zinc-800 px-4 py-3 text-sm text-white hover:bg-zinc-900"
                  @click="emit('save')"
               >
                  Save changes
               </button>
            </div>
         </div>
      </div>
   </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { validateAllFields } from "vue-wswg-editor";

// Type definition matching the library's ValidationResult interface
interface ValidationResult {
   title: string;
   isValid: boolean;
   errors: Record<string, string | boolean>;
}
const emit = defineEmits(["close", "save"]);

const props = defineProps<{
   pageData: any;
}>();

const validationResults = ref<Record<string, ValidationResult>>({});

const hasValidationErrors = computed(() => {
   return Object.values(validationResults.value).some((blockType) => !blockType.isValid);
});

/**
 * Validate the page content
 * Sets the sectionValidationResults
 * @returns void
 */
async function validatePageContent() {
   validationResults.value = await validateAllFields(props.pageData, "blocks");
}

onMounted(async () => {
   await validatePageContent();
});
</script>
