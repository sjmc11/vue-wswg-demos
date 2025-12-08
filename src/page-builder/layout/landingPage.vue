<template>
   <div class="landing-page-layout">
      <AppHeader :links="links" :logo="logo" :logoWidth="logoWidth" />
      <main class="relative z-10">
         <slot name="default">
            <!-- page blocks will be rendered here -->
         </slot>
      </main>
      <div class="graphics z-0">
         <img src="../../assets/marketing/shape-1.png" alt="branding" class="shape-1" />
         <img src="../../assets/marketing/shape-2.png" alt="branding" class="shape-2" />
         <img src="../../assets/marketing/shape-3.png" alt="branding" class="shape-3" />
         <img src="../../assets/marketing/shape-4.png" alt="branding" class="shape-4" />
         <img src="../../assets/marketing/shape-5.png" alt="branding" class="shape-5" />
         <img src="../../assets/marketing/shape-6.png" alt="branding" class="shape-6" />
         <img src="../../assets/marketing/shape-7.png" alt="branding" class="shape-7" />
         <img src="../../assets/marketing/shape-8.png" alt="branding" class="shape-8" />
      </div>
      <AppFooter />
   </div>
</template>

<script setup lang="ts">
import AppHeader from "./partials/appHeader/AppHeader.vue";
import AppFooter from "./partials/AppFooter.vue";
import { createField } from "vue-wswg-editor";
import { useHead } from "@vueuse/head";

// Editor field options
defineOptions({
   label: "Landing page layout",
   fields: {
      // Header options
      logo: createField.image({ label: "Logo", required: true, group: "header" }),
      logoWidth: createField.range({
         label: "Logo Width",
         min: 50,
         max: 300,
         step: 5,
         default: 144,
         valueSuffix: "px",
         group: "header",
         description: "Logo width in pixels",
      }),
      links: createField.repeater(
         {
            text: createField.text({ label: "Text", required: true }),
            url: createField.url({ label: "URL", required: true }),
            style: createField.select(
               [
                  { label: "Solid", value: "solid", id: "style-solid" },
                  { label: "Text", value: "text", id: "style-text" },
               ],
               { default: "text", label: "Style" }
            ),
         },
         {
            label: "Links",
            minItems: 1,
            maxItems: 7,
            group: "header",
            repeaterFieldLabel: "text",
            default: {
               text: "Link",
               url: "#",
               style: "text",
            },
         }
      ),
      // Meta fields
      title: createField.text({ label: "Title", required: true, group: "meta" }),
      meta: createField.object(
         {
            description: createField.textarea({ label: "Description", required: true }),
            image: createField.image({ label: "Image", required: true }),
         },
         { group: "meta", label: "Page meta" }
      ),
   },
});

// Props
const props = withDefaults(
   defineProps<{
      logo: string;
      logoWidth: number | string;
      links: { text: string; url: string; style: "solid" | "text" }[];
      meta: Record<string, any>;
      title?: string; // Page title
   }>(),
   {
      logo: "",
      logoWidth: 144,
      links: () => [],
      meta: () => ({}),
   }
);

// Head management
useHead({
   title: `${props.title || props.meta.title} | WSWG Demos`,
   meta: [
      { name: "description", content: `${props.meta.description} | ${import.meta.env.VITE_SITE_NAME}` },
      { property: "og:title", content: `${props.title || props.meta.title} | ${import.meta.env.VITE_SITE_NAME}` },
      {
         property: "og:description",
         content: `${props.meta.description} | ${import.meta.env.VITE_SITE_NAME} | WSWG Demos`,
      },
      { property: "og:image", content: props.meta.image },
      { name: "twitter:card", content: "summary_large_image" },
   ],
});
</script>

<style lang="scss" scoped>
.landing-page-layout {
   display: flex;
   flex-direction: column;
   height: 100%;

   .graphics {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;

      .shape-1 {
         position: absolute;
         top: 32%;
         right: 5%;
         width: 100px;
         height: auto;
      }
      .shape-2 {
         position: absolute;
         top: 5%;
         left: -5%;
         width: 130px;
         height: auto;
      }
      .shape-3 {
         position: absolute;
         top: 12%;
         right: -5%;
         width: 200px;
         height: auto;
      }
      .shape-4 {
         position: absolute;
         top: 27%;
         left: -3%;
         width: 140px;
         height: auto;
         rotate: -20deg;
      }
      .shape-5 {
         position: absolute;
         top: 50%;
         right: -2%;
         width: 180px;
         height: auto;
         rotate: -10deg;
      }
      .shape-6 {
         position: absolute;
         top: 40%;
         left: -6%;
         width: 210px;
         height: auto;
         rotate: 10deg;
      }
      .shape-7 {
         position: absolute;
         bottom: 20%;
         left: -3%;
         width: 200px;
         height: auto;
         rotate: 10deg;
      }
      .shape-8 {
         position: absolute;
         bottom: 17%;
         right: 2%;
         width: 120px;
         height: auto;
         rotate: -10deg;
      }
   }
}
</style>
