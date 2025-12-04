<template>
   <div class="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
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

            <div class="flex items-center gap-4">
               <label
                  for="Option1"
                  class="shadow-xs relative block flex-1 overflow-hidden rounded border border-gray-300 px-4 py-2"
               >
                  <div class="absolute inset-y-0 left-0 rounded bg-gray-100" style="width: 45%"></div>

                  <div class="relative flex items-center gap-4">
                     <input id="Option1" type="radio" name="Poll1" class="shadow-xs size-5 border-gray-300" />

                     <span class="font-medium text-gray-900"> Option 1 </span>
                  </div>
               </label>

               <span class="text-gray-700">45%</span>
            </div>

            <div class="flex items-center gap-4">
               <label
                  for="Option2"
                  class="shadow-xs relative block flex-1 overflow-hidden rounded border border-gray-300 px-4 py-2"
               >
                  <div class="absolute inset-y-0 left-0 rounded bg-gray-100" style="width: 25%"></div>

                  <div class="relative flex items-center gap-4">
                     <input id="Option2" type="radio" name="Poll1" class="shadow-xs size-5 border-gray-300" />

                     <span class="font-medium text-gray-900"> Option 2 </span>
                  </div>
               </label>

               <span class="text-gray-700">25%</span>
            </div>

            <div class="flex items-center gap-4">
               <label
                  for="Option3"
                  class="shadow-xs relative block flex-1 overflow-hidden rounded border border-gray-300 px-4 py-2"
               >
                  <div class="absolute inset-y-0 left-0 rounded bg-gray-100" style="width: 30%"></div>

                  <div class="relative flex items-center gap-4">
                     <input id="Option3" type="radio" name="Poll1" class="shadow-xs size-5 border-gray-300" />

                     <span class="font-medium text-gray-900"> Option 3 </span>
                  </div>
               </label>

               <span class="text-gray-700">30%</span>
            </div>
         </fieldset>
      </form>

      <p class="mt-4 text-sm text-gray-700">Ends on <time datetime="2025-10-31">October 31, 2025</time></p>
   </div>
</template>

<script lang="ts" setup>
import { defineProps, defineOptions } from "vue";
import { createField } from "vue-wswg-editor";

defineOptions({
   label: "Poll",
   fields: {
      heading: createField.text({
         maxLength: 50,
         placeholder: "Section heading",
         label: "Heading",
         group: "content",
      }),
      description: createField.text({
         maxLength: 50,
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
            default: {
               label: "Another option",
               key: "",
            },
         }
      ),
      margin: createField.margin({ group: "appearance" }),
   },
});

withDefaults(
   defineProps<{
      heading?: string;
      description?: string;
      features?: {
         heading: string;
         description: string;
         icon: string;
      }[];
   }>(),
   {
      heading: "Where shall we go for lunch?",
      description:
         "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Saepe maiores exercitationem id soluta eaque harum eligendi distinctio sapiente esse ad! Sit expedita eos quam numquam ea, assumenda officiis minus ut.",
      features: () => [
         {
            heading: "High performance",
            description: "Lightning-quick load times optimized for every device",
            icon: `<path
    stroke-linecap="round"
    stroke-linejoin="round"
    d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z"
  ></path>`,
         },
         {
            heading: "Enterprise security",
            description: "Enterprise-grade security built into every layer",
            icon: `<path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
    ></path>`,
         },
         {
            heading: "Highly configurable",
            description: "Adapt every aspect to match your brand and needs",
            icon: `<path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M6 13.5V3.75m0 9.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 3.75V16.5m12-3V3.75m0 9.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 3.75V16.5m-6-9V3.75m0 3.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 9.75V10.5"
    ></path>`,
         },
      ],
   }
);
</script>
