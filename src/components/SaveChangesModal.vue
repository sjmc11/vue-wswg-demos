<template>
<!-- Main modal -->
<div id="save-changes-modal" tabindex="-1" class="overflow-y-auto bg-zinc-800/50 overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-screen max-h-full">
    <div class="relative p-4 w-full max-w-2xl max-h-full flex items-center justify-center mx-auto h-screen">
        <!-- Modal content -->
        <div class="relative bg-white border border-gray-300 rounded-xl shadow-sm p-4 md:p-6 w-full">
            <!-- Modal header -->
            <div class="flex items-center justify-between border-b border-gray-300 pb-4 md:pb-5">
                <h3 class="text-lg font-bold text-zinc-900">
                    Save changes
                </h3>
                <button type="button" class="text-body bg-transparent hover:bg-neutral-tertiary hover:text-heading rounded-base text-sm w-9 h-9 ms-auto inline-flex justify-center items-center" @click="emit('close')">
                    <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18 17.94 6M18 18 6.06 6"/></svg>
                    <span class="sr-only">Close modal</span>
                </button>
            </div>
            <!-- Validation errors -->
            <div v-if="hasValidationErrors" class="space-y-4 md:space-y-4 py-4 md:py-6">
              <p class="bg-amber-500/20 text-amber-900 py-3 px-4 rounded-md mb-6">Please fix the following errors before saving:</p>
                <template v-for="(blockType, blockTypeKey) in validationResults" :key="blockTypeKey">
                    <div v-if="!blockType.isValid" class="rounded-md border border-gray-300 p-4">
                      <h4 class="text-base font-bold text-zinc-900 block mb-2">{{ blockType.title }}</h4>
                      <ul class="list-disc list-inside text-sm text-zinc-600 space-y-2">
                        <li v-for="(error, errorKey) in blockType.errors" :key="errorKey">{{ error }}</li>
                      </ul>
                    </div>
                </template>
            </div>
            <!-- Confirmation message -->
            <div v-else class="space-y-4 md:space-y-4 py-4 md:py-6">
                <p class="leading-relaxed text-body">Are you sure you want to save changes?</p>
                <p class="leading-relaxed text-body">This action will replace and overwrite all previous published versions of this page.</p>
            </div>
            <!-- Modal footer -->
            <div class="flex items-center justify-end border-t border-gray-300 space-x-4 pt-4 md:pt-5">
              <button data-modal-hide="save-changes-modal" type="button" class="text-body bg-zinc-100 border border-zinc-300 hover:border-zinc-400 text-zinc-600 hover:text-zinc-900 px-4 py-3 rounded-md text-sm" @click="emit('close')">Cancel</button>
              <button v-if="!hasValidationErrors" data-modal-hide="save-changes-modal" type="button" class="text-white bg-zinc-800 hover:bg-zinc-900 border border-zinc-800 px-4 py-3 rounded-md text-sm" @click="emit('save')">Save changes</button>
            </div>
        </div>
    </div>
</div>

</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { validateAllFields } from "vue-wswg-editor";
import type { ValidationResult } from '../../../vue-wswg-editor/src/util/validation';
const emit = defineEmits(['close', 'save'])

const props = defineProps<{
  pageData: any
}>()

const validationResults = ref<
  Record<string, ValidationResult>
>({});

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