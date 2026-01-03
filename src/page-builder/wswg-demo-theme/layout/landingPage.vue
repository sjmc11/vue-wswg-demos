<template>
   <div class="landing-page-layout">
      <AppHeader :links="links" :logo="logo" :logoWidth="logoWidth" data-partial="header" />
      <main class="relative z-10">
         <slot name="default">
            <!-- page blocks will be rendered here -->
         </slot>
      </main>
      <div class="graphics pointer-events-none z-0 w-screen overflow-x-hidden">
         <img v-if="blocks.length > 0" src="../../../assets/marketing/shape-1.png" alt="branding" class="shape-1" />
         <img v-if="blocks.length > 0" src="../../../assets/marketing/shape-2.png" alt="branding" class="shape-2" />
         <img v-if="blocks.length > 3" src="../../../assets/marketing/shape-3.png" alt="branding" class="shape-3" />
         <img v-if="blocks.length > 3" src="../../../assets/marketing/shape-4.png" alt="branding" class="shape-4" />
         <img v-if="blocks.length > 4" src="../../../assets/marketing/shape-5.png" alt="branding" class="shape-5" />
         <img v-if="blocks.length > 5" src="../../../assets/marketing/shape-6.png" alt="branding" class="shape-6" />
         <img v-if="blocks.length > 5" src="../../../assets/marketing/shape-7.png" alt="branding" class="shape-7" />
         <img v-if="blocks.length > 5" src="../../../assets/marketing/shape-8.png" alt="branding" class="shape-8" />
      </div>
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
import { useHead } from "@vueuse/head";

// Editor field options
defineOptions({
   label: "Landing page layout",
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
      footerDescription?: string;
      footerLinks?: { text: string; url: string }[];
      footerSocialLinks?: Record<string, string | undefined>;
      blocks?: Block[];
   }>(),
   {
      logo: "",
      logoWidth: 144,
      links: () => [],
      meta: () => ({}),
      footerDescription: "",
      footerLinks: () => [],
      footerSocialLinks: () => ({
         facebook: "",
      }),
      blocks: () => [],
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

// Smooth scroll anchor links in this template
import { onMounted, onUnmounted } from "vue";

function handleSmoothScroll(e: Event) {
   const target = e.target as HTMLElement;
   const link = target.closest("a");

   if (!link) return;

   const href = link.getAttribute("href");

   // Only handle anchor links (starting with #)
   if (href && href.startsWith("#") && href.length > 1) {
      e.preventDefault();
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
         targetElement.scrollIntoView({
            behavior: "smooth",
            block: "center",
         });
      }
   }
}

onMounted(() => {
   document.addEventListener("click", handleSmoothScroll);
});

onUnmounted(() => {
   document.removeEventListener("click", handleSmoothScroll);
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
