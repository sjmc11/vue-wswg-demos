<template>
   <!-- Main modal -->
   <div
      id="save-changes-modal"
      tabindex="-1"
      class="fixed inset-x-0 top-0 z-50 h-screen max-h-full w-full items-center justify-center overflow-y-auto overflow-x-hidden bg-zinc-800/50 md:inset-0"
      @click.self="emit('close')"
   >
      <div class="relative mx-auto flex h-screen max-h-full w-full max-w-2xl items-center justify-center p-4">
         <!-- Modal content -->
         <div class="relative max-h-[90vh] w-full overflow-y-auto rounded-xl border border-gray-300 bg-white shadow-sm">
            <!-- Modal header -->
            <div class="sticky top-0 flex items-center justify-between border-b border-gray-300 bg-white p-4 md:p-5">
               <h3 class="text-lg font-bold text-zinc-900">Save changes</h3>
               <button
                  type="button"
                  class="text-body hover:bg-neutral-tertiary hover:text-heading rounded-base ms-auto inline-flex size-9 items-center justify-center bg-transparent text-sm"
                  @click="emit('close')"
               >
                  <HeroIcon name="x-mark" class="size-5" />
                  <span class="sr-only">Close modal</span>
               </button>
            </div>
            <!-- Modal body -->
            <div class="p-4 md:p-5">
               <!-- Validation errors -->
               <div v-if="hasValidationErrors" class="space-y-4 md:space-y-4">
                  <div
                     class="flex items-center gap-2 rounded-md bg-amber-500/20 px-4 py-3 text-sm font-medium text-amber-800"
                  >
                     <HeroIcon name="exclamation-triangle" class="size-5" />
                     <p>Please fix the following errors before saving</p>
                  </div>
                  <template v-for="(block, blockKey) in validationResults" :key="blockKey">
                     <div v-if="!block.isValid" class="rounded-md bg-gray-100 p-4">
                        <h4 class="mb-2 block text-sm font-bold text-zinc-900">{{ block.title }}</h4>
                        <ul class="space-y-2 text-sm text-zinc-600">
                           <ValidationErrorItem
                              v-for="(error, fieldLabel) in block.errors"
                              :key="fieldLabel"
                              :error="error"
                              :field-label="fieldLabel"
                           />
                        </ul>
                     </div>
                  </template>
               </div>
               <!-- Confirmation message -->
               <div v-else class="space-y-4 md:space-y-4">
                  <p class="text-body leading-relaxed">Are you sure you want to save changes?</p>
                  <p class="text-body leading-relaxed">
                     This action will replace and overwrite all previous published versions of this page.
                  </p>
               </div>
            </div>
            <!-- Modal footer -->
            <div
               class="sticky bottom-0 flex items-center justify-end space-x-4 border-t border-gray-300 bg-white p-4 md:p-5"
            >
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
import HeroIcon from "../heroIcon/HeroIcon.vue";
import ValidationErrorItem from "../validationErrorItem/ValidationErrorItem.vue";

// Type definition matching the library's ValidationResult interface
interface ValidationResult {
   title: string;
   isValid: boolean;
   errors: Record<string, string | boolean | ValidationResult>;
}

const emit = defineEmits(["close", "save"]);

const props = defineProps<{
   pageData: any;
}>();

const validationResults = ref<Record<string, ValidationResult>>({});

/**
 * Check if an error value is a nested ValidationResult
 */
function isValidationResult(error: string | boolean | ValidationResult): error is ValidationResult {
   return typeof error === "object" && error !== null && "isValid" in error && "errors" in error;
}

/**
 * Recursively check if a ValidationResult has any errors (including nested ones)
 */
function hasAnyErrors(result: ValidationResult): boolean {
   if (!result.isValid) return true;
   for (const error of Object.values(result.errors)) {
      if (isValidationResult(error) && hasAnyErrors(error)) {
         return true;
      }
   }
   return false;
}

const hasValidationErrors = computed(() => {
   return Object.values(validationResults.value).some((blockType) => hasAnyErrors(blockType));
});

/**
 * Validate the page content
 * Sets the sectionValidationResults
 * @returns void
 */
async function validatePageContent() {
   validationResults.value = await validateAllFields(props.pageData);
}

onMounted(async () => {
   await validatePageContent();
});
</script>
