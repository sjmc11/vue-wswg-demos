<template>
   <div class="page-container py-8">
      <div v-if="heading || description" class="mb-3 max-w-prose">
         <h2 v-if="heading" class="text-xl font-bold text-gray-900 md:text-2xl lg:text-3xl">
            {{ heading }}
         </h2>

         <p v-if="description" class="mt-3 text-pretty text-lg text-gray-700">
            {{ description }}
         </p>
      </div>

      <form action="#" class="mt-6">
         <fieldset class="flex flex-col gap-3">
            <legend class="sr-only">Select an option</legend>
            <template v-for="option in pollResults" :key="option.key">
               <div class="flex items-center gap-4">
                  <label
                     :for="`poll-${option.key}`"
                     class="shadow-xs relative block flex-1 overflow-hidden rounded border border-gray-300 px-4 py-2 hover:cursor-pointer hover:border-indigo-400"
                  >
                     <div
                        class="duration-1200 absolute inset-y-0 left-0 rounded bg-gray-100 transition-all"
                        :style="{ width: `${option.percentage ?? 5}%` }"
                     ></div>

                     <div class="relative flex items-center gap-4">
                        <input
                           :id="`poll-${option.key}`"
                           type="radio"
                           name="Poll1"
                           :value="option.key"
                           class="shadow-xs size-5 border-gray-300"
                           @change="handleVote"
                        />

                        <span class="font-medium text-gray-900"> {{ option.label }} </span>
                     </div>
                  </label>

                  <span class="text-gray-700">{{ option.percentage ?? 5 }}%</span>
               </div>
            </template>
         </fieldset>
      </form>
   </div>
</template>

<script lang="ts" setup>
import { defineOptions, ref, onMounted } from "vue";
import { createField } from "vue-wswg-editor";

defineOptions({
   label: "Poll",
   fields: {
      heading: createField.text({
         required: true,
         placeholder: "Section heading",
         label: "Heading",
         group: "content",
      }),
      description: createField.textarea({
         rows: 6,
         placeholder: "Section description",
         label: "Description",
         group: "content",
      }),
      options: createField.repeater(
         {
            label: createField.text({
               maxLength: 50,
               label: "Label",
            }),
            key: createField.text({
               maxLength: 50,
               placeholder: "The corresponding option key",
               label: "Key",
               required: true,
            }),
         },
         {
            label: "Options",
            description: "The available options",
            group: "content",
            repeaterFieldLabel: "label",
            default: {
               label: "Another option",
               key: "",
            },
         }
      ),
      margin: createField.margin({ group: "appearance" }),
   },
});

const props = withDefaults(
   defineProps<{
      heading?: string;
      description?: string;
      options?: {
         label: string;
         key: string;
      }[];
   }>(),
   {
      heading: "Where Do You Want to Boost Conversions?",
      description:
         "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Saepe maiores exercitationem id soluta eaque harum eligendi distinctio sapiente esse ad! Sit expedita eos quam numquam ea, assumenda officiis minus ut.",
      options: () => [
         {
            label: "Option 1",
            key: "option1",
         },
         {
            label: "Option 2",
            key: "option2",
         },
         {
            label: "Option 3",
            key: "option3",
         },
      ],
   }
);

/** Your computed function or methods to handle poll data */
const pollResults = ref<{ label: string; key: string; percentage: string }[]>([]);

async function handleVote() {
   // Retrigger the computedPollResults function so the percentage is updated
   fetchPollResults();
}

// Fetch poll results
function fetchPollResults() {
   pollResults.value = props.options.map((option) => {
      return {
         label: option.label,
         key: option.key,
         percentage: Number(Math.random() * 100).toFixed(0),
      } as { label: string; key: string; percentage: string };
   });
}

// Life cycle
onMounted(async () => {
   fetchPollResults();
});
</script>
