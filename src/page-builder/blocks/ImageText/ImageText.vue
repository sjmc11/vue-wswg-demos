<template>
   <section class="image-text">
      <div class="page-container">
         <div class="@3xl:grid-cols-2 grid overflow-hidden rounded-xl bg-gray-100">
            <div class="@3xlmd:p-12 @4xl:px-16 @5xl:py-24 p-8">
               <div
                  class="mx-auto max-w-xl"
                  :class="{
                     'text-center': textAlign === 'center',
                     'text-left': textAlign === 'left',
                     'text-right': textAlign === 'right',
                  }"
               >
                  <h2 class="@5xl:text-3xl text-2xl font-bold text-gray-900">
                     {{ heading }}
                  </h2>

                  <div class="rich-text-content @xl:mt-4 @xl:block" v-html="content"></div>

                  <div v-if="ctaText" class="@xl:mt-7 mt-4">
                     <a
                        :href="ctaLink"
                        class="focus:outline-hidden inline-block rounded-sm bg-emerald-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-emerald-700 focus:ring-2 focus:ring-yellow-400"
                     >
                        {{ ctaText }}
                     </a>
                  </div>
               </div>
            </div>

            <img
               alt=""
               src="https://images.unsplash.com/photo-1464582883107-8adf2dca8a9f?auto=format&amp;fit=crop&amp;q=80&amp;w=1160"
               class="@xl:h-full h-56 w-full object-cover"
            />
         </div>
      </div>
   </section>
</template>

<script lang="ts" setup>
import { defineProps, defineOptions } from "vue";
import { createField } from "vue-wswg-editor";
import RichTextField from "../../fields/rich-text/RichTextField.vue";

defineOptions({
   label: "Image & Text",
   fields: {
      textAlign: createField.select(
         [
            { label: "Left", value: "left", id: "align-left" },
            { label: "Center", value: "center", id: "align-center" },
            { label: "Right", value: "right", id: "align-right" },
         ],
         {
            default: "center",
            label: "Text align",
         }
      ),
      heading: createField.text({
         maxLength: 50,
         placeholder: "Enter heading text...",
         label: "Heading",
      }),
      content: createField.custom({
         label: "Content",
         placeholder: "Enter content...",
         component: RichTextField,
      }),
      ctaText: createField.text({
         label: "CTA Button Text",
         placeholder: "Enter button text...",
         maxLength: 50,
      }),
      ctaLink: createField.text({
         label: "CTA Button Link",
         placeholder: "Enter link URL...",
      }),
      margin: createField.margin({ group: undefined }),
   },
});

withDefaults(
   defineProps<{
      heading?: string;
      content?: string;
      textAlign?: "left" | "center" | "right";
      ctaText?: string;
      ctaLink?: string;
   }>(),
   {
      textAlign: "center",
      heading: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
      content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
      ctaText: "Get Started Today",
      ctaLink: "#",
   }
);
</script>

<style scoped lang="scss">
.rich-text-content {
   /* Paragraph spacing */
   :deep(p) {
      margin: 0.75em 0;
   }

   :deep(p:first-child) {
      margin-top: 0;
   }

   :deep(p:last-child) {
      margin-bottom: 0;
   }

   /* Bold text */
   :deep(strong) {
      font-weight: 600;
   }

   /* Italic text */
   :deep(em) {
      font-style: italic;
   }

   /* Lists */
   :deep(ul),
   :deep(ol) {
      padding-left: 1.5em;
      margin: 0.75em 0;
   }

   :deep(ul) {
      list-style-type: disc;
   }

   :deep(ol) {
      list-style-type: decimal;
   }

   :deep(li) {
      margin: 0.375em 0;
      line-height: 1.6;
   }

   /* Nested lists */
   :deep(ul ul),
   :deep(ol ol),
   :deep(ul ol),
   :deep(ol ul) {
      margin-top: 0.375em;
      margin-bottom: 0.375em;
   }

   /* Blockquote */
   :deep(blockquote) {
      border-left: 3px solid #d1d5db;
      padding-left: 1em;
      margin: 1em 0;
      color: #6b7280;
      font-style: italic;
   }

   :deep(blockquote p) {
      margin: 0.5em 0;
   }

   /* Code blocks */
   :deep(pre) {
      background-color: #1f2937;
      color: #f9fafb;
      padding: 1em;
      border-radius: 0.375rem;
      overflow-x: auto;
      margin: 1em 0;
      font-family: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace;
      font-size: 0.875em;
      line-height: 1.5;
   }

   :deep(pre code) {
      background-color: transparent;
      padding: 0;
      color: inherit;
      font-size: inherit;
   }

   /* Inline code */
   :deep(code) {
      background-color: #f3f4f6;
      padding: 0.125em 0.375em;
      border-radius: 0.25rem;
      font-family: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace;
      font-size: 0.9em;
      color: #374151;
   }

   /* Links */
   :deep(a) {
      color: #2563eb;
      text-decoration: underline;
      transition: color 0.15s ease;
   }

   :deep(a:hover) {
      color: #1d4ed8;
   }

   /* Horizontal rule */
   :deep(hr) {
      border: none;
      border-top: 1px solid #e5e7eb;
      margin: 1.5em 0;
   }
}
</style>
