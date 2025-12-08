<template>
   <div class="page-container">
      <div class="@3xl:p-12 rounded-xl bg-gray-100 p-6">
         <div class="mx-auto max-w-lg text-center">
            <h2 v-if="heading" class="text-xl font-bold text-gray-900">
               {{ heading }}
            </h2>

            <p v-if="description" class="mt-3 text-pretty text-lg text-gray-700">
               {{ description }}
            </p>
         </div>

         <div class="@xl:mt-9 mt-3 flex flex-col gap-0">
            <details
               v-for="(faq, faqIndex) in faqs"
               :key="`faq_${faqIndex}`"
               class="group border-b border-gray-400 [&_summary::-webkit-details-marker]:hidden"
               :open="faqIndex === 0 ? true : false"
            >
               <summary class="@xl:px-5 @xl:py-6 flex items-center justify-between gap-1.5 px-1 py-3 text-gray-900">
                  <h2 class="text-lg font-medium">
                     {{ faq.question }}
                  </h2>

                  <svg
                     class="size-5 shrink-0 transition-transform duration-300 group-open:-rotate-180"
                     xmlns="http://www.w3.org/2000/svg"
                     fill="none"
                     viewBox="0 0 24 24"
                     stroke="currentColor"
                  >
                     <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
               </summary>

               <p class="px-4 pb-5 text-gray-900">
                  {{ faq.answer }}
               </p>
            </details>
         </div>
      </div>
   </div>
</template>

<script lang="ts" setup>
import { defineProps, defineOptions } from "vue";
import { createField } from "vue-wswg-editor";

defineOptions({
   label: "FAQs section",
   fields: {
      heading: createField.text({
         maxLength: 50,
         placeholder: "FAQs heading",
         label: "Heading",
         group: "content",
      }),
      description: createField.text({
         maxLength: 50,
         placeholder: "FAQs description",
         label: "Description",
         group: "content",
      }),
      faqs: createField.repeater(
         {
            question: createField.text({
               maxLength: 50,
               placeholder: "What is the meaning of life?",
               label: "Question",
            }),
            answer: createField.textarea({
               rows: 7,
               maxLength: 500,
               placeholder: "Lorem ipsum dolor sit amet",
               label: "Answer",
            }),
         },
         {
            label: "FAQs",
            description: "List of FAQ items",
            group: "content",
            default: {
               question: "Example FAQ",
               answer: "Lorem ipsum dolor sit amet.",
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
      faqs?: {
         question: string;
         answer: string;
      }[];
   }>(),
   {
      heading: "Common questions answered",
      description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
      faqs: () => [
         {
            question: "Lorem ipsum dolor sit amet consectetur adipisicing?",
            answer:
               "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ab hic veritatis molestias culpa in, recusandae laboriosam neque aliquid libero nesciunt voluptate dicta quo officiis explicabo consequuntur distinctio corporis earum similique!",
         },
         {
            question: "Lorem ipsum dolor sit amet consectetur adipisicing?",
            answer:
               "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ab hic veritatis molestias culpa in, recusandae laboriosam neque aliquid libero nesciunt voluptate dicta quo officiis explicabo consequuntur distinctio corporis earum similique!",
         },
         {
            question: "Lorem ipsum dolor sit amet consectetur adipisicing?",
            answer:
               "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ab hic veritatis molestias culpa in, recusandae laboriosam neque aliquid libero nesciunt voluptate dicta quo officiis explicabo consequuntur distinctio corporis earum similique!",
         },
      ],
   }
);
</script>
