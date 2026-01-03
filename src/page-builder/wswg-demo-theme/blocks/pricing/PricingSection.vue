<template>
   <div class="@3xl:py-20 py-12" :class="{ 'bg-gray-900': isDarkMode }">
      <div :id="blockId" class="page-container">
         <div v-if="heading || description" class="@3xl:mb-12 mx-auto mb-9 max-w-prose text-center">
            <h2
               v-if="heading"
               class="@3xl:text-3xl text-xl font-bold"
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
         <div class="@3xl:grid-cols-2 grid grid-cols-1 gap-4 sm:items-center md:gap-8">
            <div
               v-for="pricingPlan in pricingPlans"
               :key="pricingPlan.kicker"
               class="shadow-xs group rounded-2xl border p-6 ring-1 transition-all duration-300 hover:border-indigo-600 hover:ring-indigo-600 sm:order-last sm:px-8 lg:p-12"
               :class="
                  isDarkMode ? 'border-gray-800 ring-gray-800 bg-gray-800' : 'border-gray-200 bg-white ring-gray-200'
               "
            >
               <div class="text-center">
                  <h2 class="text-lg font-medium" :class="isDarkMode ? 'text-gray-100' : 'text-gray-900'">
                     {{ pricingPlan.kicker }}
                     <span class="sr-only">Plan</span>
                  </h2>

                  <p class="mt-2 sm:mt-4">
                     <strong class="text-3xl font-bold" :class="isDarkMode ? 'text-gray-100' : 'text-gray-900'">
                        {{ pricingPlan.price }}$
                     </strong>

                     <span class="text-sm font-medium" :class="isDarkMode ? 'text-gray-400' : 'text-gray-700'">{{
                        pricingPlan.priceSuffix
                     }}</span>
                  </p>
               </div>

               <ul class="mt-6 space-y-2">
                  <li v-for="feature in pricingPlan.features" :key="feature.title" class="flex items-center gap-1">
                     <HeroIcon
                        name="check"
                        class="size-5"
                        :class="isDarkMode ? 'text-indigo-400' : 'text-indigo-600'"
                     />

                     <span :class="isDarkMode ? 'text-gray-400' : 'text-gray-700'">
                        {{ feature.title }}
                     </span>
                  </li>
               </ul>

               <a
                  v-if="pricingPlan.ctaButtonText && pricingPlan.ctaButtonUrl"
                  :href="pricingPlan.ctaButtonUrl"
                  class="@3xl:py-4 mt-8 block rounded-full border px-12 py-3 text-center text-sm font-medium transition-colors hover:bg-indigo-500 hover:text-white"
                  :class="
                     isDarkMode
                        ? 'border-gray-700 bg-gray-800 text-gray-200 hover:bg-gray-800 group-hover:bg-gray-700'
                        : 'border-indigo-600 bg-white text-indigo-600 hover:ring-1 hover:ring-indigo-700 group-hover:bg-indigo-600 group-hover:text-white group-hover:ring-1 group-hover:ring-indigo-700'
                  "
               >
                  {{ pricingPlan.ctaButtonText }}
               </a>
            </div>
         </div>
      </div>
   </div>
</template>

<script setup lang="ts">
import { createField } from "vue-wswg-editor";
import HeroIcon from "../../../../components/heroIcon/HeroIcon.vue";

defineOptions({
   label: "Pricing section",
   fields: {
      heading: createField.text({
         maxLength: 100,
         placeholder: "Section heading",
         label: "Heading",
         group: "content",
      }),
      description: createField.text({
         maxLength: 240,
         placeholder: "Section description",
         label: "Description",
         group: "content",
      }),
      pricingPlans: createField.repeater(
         {
            kicker: createField.text({
               maxLength: 50,
               placeholder: "eg: Pro, Starter, etc.",
               label: "Plan name",
            }),
            price: createField.number({
               min: 0,
               max: 1000,
               placeholder: "eg: 30, 20, etc.",
               label: "Price",
               valueSuffix: "$",
            }),
            priceSuffix: createField.text({
               maxLength: 10,
               placeholder: "eg: /month, /year, etc.",
               label: "Price suffix",
            }),
            features: createField.repeater(
               {
                  title: createField.text({
                     maxLength: 120,
                     placeholder: "eg: 20 users included, 5GB of storage, etc.",
                     label: "Title",
                  }),
               },
               {
                  label: "Features",
                  repeaterFieldLabel: "title",
               }
            ),
            ctaButtonText: createField.text({
               maxLength: 120,
               placeholder: "eg: Get Started, Sign Up, etc.",
               label: "CTA button",
            }),
            ctaButtonUrl: createField.url({
               placeholder: "eg: https://www.example.com",
               label: "CTA button URL",
            }),
         },
         {
            label: "Pricing plans",
            description: "List of pricing plans to show in the section",
            group: "content",
            repeaterFieldLabel: "kicker",
            default: {
               kicker: "Starter",
               price: 20,
               priceSuffix: "/month",
               features: [
                  {
                     title: "10 users included",
                  },
                  {
                     title: "2GB of storage",
                  },
                  {
                     title: "Email support",
                  },
                  {
                     title: "Help center access",
                  },
               ],
               ctaButton: "Get Started",
               ctaButtonUrl: "#",
            },
         }
      ),
      margin: createField.margin({ group: "appearance" }),
      isDarkMode: createField.boolean({
         label: "Dark mode",
         group: "appearance",
         default: false,
      }),
      blockId: createField.text({
         label: "Block ID",
         placeholder: "features",
         group: "settings",
         description: "Apply a custom ID for anchor linking",
      }),
   },
});

withDefaults(
   defineProps<{
      heading?: string;
      description?: string;
      pricingPlans?: {
         kicker: string;
         price: number;
         priceSuffix: string;
         features: {
            title: string;
         }[];
         ctaButtonText: string;
         ctaButtonUrl: string;
      }[];
      isDarkMode?: boolean;
      blockId?: string;
   }>(),
   {
      heading: "Pricing for all sizes",
      description: "Choose the plan that's right for you. No hidden fees, ever.",
      isDarkMode: false,
      pricingPlans: () => [
         {
            kicker: "Starter",
            price: 20,
            priceSuffix: "/month",
            features: [
               {
                  title: "10 users included",
               },
            ],
            ctaButtonText: "Get Started",
            ctaButtonUrl: "#",
         },
         {
            kicker: "Pro",
            price: 30,
            priceSuffix: "/month",
            features: [
               {
                  title: "20 users included",
               },
            ],
            ctaButtonText: "Get Started",
            ctaButtonUrl: "#",
         },
      ],
      blockId: () => Math.random().toString(36).substring(2, 15),
   }
);
</script>

<style scoped></style>
