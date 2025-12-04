<template>
   <div class="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-lg text-center">
         <h2 v-if="heading" class="text-xl font-bold text-gray-900">
            {{ heading }}
         </h2>

         <p v-if="description" class="mt-3 text-pretty text-lg text-gray-700">
            {{ description }}
         </p>
      </div>

      <div class="mt-8 grid grid-cols-3 gap-8">
         <div
            v-for="(feature, featureIndex) in features"
            :key="`feature_${featureIndex}`"
            class="rounded-lg border border-gray-200 p-6"
         >
            <div class="inline-flex rounded-lg bg-gray-100 p-3 text-gray-700">
               <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-6"
               >
                  {{ feature.icon }}
               </svg>
            </div>

            <h3 class="mt-4 text-lg font-semibold text-gray-900">
               {{ feature.heading }}
            </h3>

            <p class="mt-2 text-pretty text-gray-700">
               {{ feature.description }}
            </p>
         </div>
      </div>
   </div>
</template>

<script lang="ts" setup>
import { defineProps, defineOptions } from "vue";
import { createField } from "vue-wswg-editor";

defineOptions({
   label: "Feature grid",
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
      features: createField.repeater(
         {
            heading: createField.text({
               maxLength: 50,
               placeholder: "Feature heading",
               label: "Heading",
            }),
            description: createField.text({
               maxLength: 50,
               placeholder: "Feature description",
               label: "Description",
            }),
            icon: createField.text({
               placeholder: "Feature icon SVG",
               label: "Icon",
            }),
         },
         {
            label: "Features",
            description: "List of features to show in the grid",
            group: "content",
            default: {
               heading: "Example feature",
               description: "Lorem ipsum dolor sit amet.",
               icon: "",
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
      heading: "Features for growth",
      description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
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
