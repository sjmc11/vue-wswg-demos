<template>
   <div class="default-page-layout bg-stone-50">
      <AppHeader :links="links" :logo="logo" :logoWidth="logoWidth" data-partial="header" />
      <main class="relative z-10 flex-1">
         <slot name="default">
            <!-- page blocks will be rendered here -->
         </slot>
      </main>
      <AppFooter
         :logo="logo"
         :footerDescription="footerDescription"
         :footerLinks="footerLinks"
         :footerSocialLinks="footerSocialLinks"
         data-partial="footer"
      />
   </div>
</template>

<script setup lang="ts">
import AppHeader from "./partials/appHeader/AppHeader.vue";
import AppFooter from "./partials/AppFooter.vue";
import { createField, type Block } from "vue-wswg-editor";

// Editor field options
defineOptions({
   label: "Default layout",
   fields: {
      // Branding options
      logo: createField.image({ label: "Logo", required: true, group: "branding" }),
      // Header options
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
      // Footer options
      footerDescription: createField.textarea({
         label: "Footer Description",
         rows: 5,
         required: true,
         group: "footer",
      }),
      footerLinks: createField.repeater(
         {
            text: createField.text({ label: "Text", required: true }),
            url: createField.url({ label: "URL", required: true }),
         },
         { label: "Footer Links", group: "footer", repeaterFieldLabel: "text" }
      ),
      footerSocialLinks: createField.object(
         {
            facebook: createField.text({
               label: "Facebook URL",
               placeholder: "https://www.facebook.com/your-page",
            }),
            twitter: createField.url({
               label: "Twitter URL",
               placeholder: "https://www.twitter.com/your-page",
            }),
            instagram: createField.url({
               label: "Instagram URL",
               placeholder: "https://www.instagram.com/your-page",
            }),
            github: createField.url({
               label: "GitHub URL",
               placeholder: "https://www.github.com/your-page",
            }),
         },
         {
            label: "Footer Social Links",
            description: "Configure the footer social links",
            group: "Socials",
         }
      ),
   },
});

withDefaults(
   defineProps<{
      logo: string;
      logoWidth: number | string;
      links: { text: string; url: string; style: "solid" | "text" }[];
      footerDescription?: string;
      footerLinks?: { text: string; url: string }[];
      footerSocialLinks?: Record<string, string | undefined>;
      blocks?: Block[];
   }>(),
   {
      logo: "",
      logoWidth: 144,
      links: () => [],
      footerDescription: "",
      footerLinks: () => [],
      footerSocialLinks: () => ({}),
      blocks: () => [],
   }
);
</script>

<style lang="scss" scoped>
// Custom font
@import url("https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&display=swap");

.default-page-layout {
   display: flex;
   flex-direction: column;
   min-height: 100vh;
}

:deep(*) {
   h1,
   h2,
   h3,
   h4,
   h5,
   h6,
   .font-serif {
      font-family: "DM Serif Display", serif;
   }
}
</style>
