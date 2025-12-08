<template>
   <li class="overflow-hidden rounded-md border border-gray-300 bg-gray-200/50">
      <!-- Nested ValidationResult -->
      <div v-if="isValidationResult(error)" class="p-2">
         <div class="mb-2 flex items-center gap-2">
            <span class="text-xs font-medium text-zinc-700">{{ fieldLabel }}</span>
         </div>
         <ul class="space-y-2">
            <ValidationErrorItem
               v-for="(nestedError, nestedFieldLabel) in error.errors"
               :key="nestedFieldLabel"
               :error="nestedError"
               :field-label="nestedFieldLabel"
            />
         </ul>
      </div>
      <!-- Simple error (string or boolean) -->
      <div v-else class="flex items-center gap-2">
         <span class="border-r border-gray-300 px-3 py-2 text-xs font-medium">{{ fieldLabel }}</span>
         <p>{{ error }}</p>
      </div>
   </li>
</template>

<script setup lang="ts">
// Type definition matching the library's ValidationResult interface
export interface ValidationResult {
   title: string;
   isValid: boolean;
   errors: Record<string, string | boolean | ValidationResult>;
}

defineProps<{
   error: string | boolean | ValidationResult;
   fieldLabel: string;
}>();

function isValidationResult(error: string | boolean | ValidationResult): error is ValidationResult {
   return typeof error === "object" && error !== null && "isValid" in error && "errors" in error;
}
</script>
