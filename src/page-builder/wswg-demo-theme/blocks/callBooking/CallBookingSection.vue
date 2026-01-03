<template>
   <div class="@3xl:py-20 py-12" :class="{ 'bg-gray-900 text-gray-400': isDarkMode }">
      <div
         :id="blockId"
         class="page-container @3xl:grid-cols-2 @4xl:gap-20 @3xl:gap-12 grid grid-cols-1 items-start gap-4"
      >
         <div v-if="heading || description">
            <h2
               v-if="heading"
               class="xs:text-3xl text-xl font-bold"
               :class="isDarkMode ? 'text-white' : 'text-gray-900'"
            >
               {{ heading }}
            </h2>

            <p
               v-if="description"
               class="mt-3 text-pretty text-lg"
               :class="isDarkMode ? 'text-gray-400' : 'text-gray-700'"
            >
               {{ description }}
            </p>
         </div>
         <div v-if="isLoading" class="flex items-center justify-center">
            <svg
               class="mx-auto size-8 animate-spin text-indigo-600 dark:text-indigo-300"
               xmlns="http://www.w3.org/2000/svg"
               fill="none"
               viewBox="0 0 24 24"
            >
               <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>

               <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
               ></path>
            </svg>
         </div>
         <form v-else-if="!isSubmitted" class="space-y-4">
            <div>
               <label for="name" class="block pb-1">Name</label>
               <input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Your name"
                  class="w-full rounded-md border p-2"
                  :class="
                     isDarkMode
                        ? 'border-gray-700 bg-gray-900 hover:border-gray-600'
                        : 'border-gray-200 bg-white hover:border-gray-400'
                  "
               />
            </div>
            <div>
               <label for="email" class="block pb-1">Email</label>
               <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Your email"
                  class="w-full rounded-md border p-2"
                  :class="
                     isDarkMode
                        ? 'border-gray-700 bg-gray-900 hover:border-gray-600'
                        : 'border-gray-200 bg-white hover:border-gray-400'
                  "
               />
            </div>
            <div class="mb-9">
               <label for="company-size" class="block pb-1">Company size</label>
               <select
                  id="company-size"
                  name="company-size"
                  class="w-full rounded-md border p-2"
                  :class="
                     isDarkMode
                        ? 'border-gray-700 bg-gray-900 hover:border-gray-600'
                        : 'border-gray-200 bg-white hover:border-gray-400'
                  "
               >
                  <option value="1-10">1-10</option>
                  <option value="11-50">11-50</option>
                  <option value="51-100">51-100</option>
                  <option value="101-500">101-500</option>
               </select>
            </div>
            <button
               type="button"
               class="flex w-full items-center justify-center gap-2 rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
               :disabled="isLoading"
               @click="submitForm"
            >
               <HeroIcon name="check" class="size-4" />
               {{ submitBtnText }}
            </button>
         </form>
         <div
            v-else
            class="flex items-start gap-4 rounded-lg p-5"
            :class="isDarkMode ? 'bg-gray-800 text-gray-400' : 'bg-gray-100 text-gray-900'"
         >
            <HeroIcon name="check-circle" class="size-7 text-emerald-500" />
            <p>{{ confirmationMessage }}</p>
         </div>
      </div>
   </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { createField } from "vue-wswg-editor";
import HeroIcon from "../../../../components/heroIcon/HeroIcon.vue";

defineOptions({
   label: "Book a call",
   fields: {
      heading: createField.text({
         maxLength: 100,
         placeholder: "Section heading",
         label: "Heading",
         group: "content",
         required: true,
      }),
      description: createField.textarea({
         maxLength: 500,
         rows: 5,
         placeholder: "Section description",
         label: "Description",
         group: "content",
         required: true,
      }),
      submitBtnText: createField.text({
         maxLength: 120,
         placeholder: "eg: Book a call, Get started, etc.",
         label: "Submit button text",
         group: "content",
         required: true,
      }),
      confirmationMessage: createField.textarea({
         maxLength: 240,
         placeholder: "Confirmation message",
         label: "Confirmation message",
         group: "content",
         required: true,
      }),
      margin: createField.margin({ group: "appearance" }),
      isDarkMode: createField.boolean({
         label: "Dark mode",
         group: "appearance",
         default: false,
      }),
      blockId: createField.text({
         label: "Block ID",
         placeholder: "call-booking",
         group: "settings",
         description: "Apply a custom ID for anchor linking",
      }),
   },
});

withDefaults(
   defineProps<{
      heading?: string;
      description?: string;
      submitBtnText?: string;
      confirmationMessage?: string;
      isDarkMode?: boolean;
      blockId?: string;
   }>(),
   {
      heading: "Book a call to get started",
      description: "Speak with our team to discuss your needs and get a free consultation.",
      submitBtnText: "Book a call",
      confirmationMessage: "Thank you for booking a call. We will get back to you soon.",
      isDarkMode: false,
      blockId: () => Math.random().toString(36).substring(2, 15),
   }
);

const isSubmitted = ref(false);
const isLoading = ref(false);

async function submitForm() {
   isLoading.value = true;
   try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      isSubmitted.value = true;
   } catch (error) {
      console.error(error);
   } finally {
      isLoading.value = false;
   }
}
</script>

<style scoped></style>
