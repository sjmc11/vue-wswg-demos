<template>
   <header id="app-header" class="sticky top-0 z-20 border-b border-emerald-950/30 bg-emerald-900">
      <div class="page-container @3xl:py-5 @3xl:h-auto z-20 flex h-20 items-center justify-between py-4">
         <img :src="logo" alt="branding" class="h-auto" :style="{ width: logoWidth + 'px' }" />
         <button
            type="button"
            class="@3xl:hidden block rounded-md border border-emerald-800/50 p-2 text-stone-50 hover:bg-emerald-800"
            aria-label="Toggle navigation"
            @click="isNavigationOpen = !isNavigationOpen"
         >
            <svg
               xmlns="http://www.w3.org/2000/svg"
               fill="none"
               viewBox="0 0 24 24"
               stroke-width="1.5"
               stroke="currentColor"
               class="size-6"
            >
               <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
         </button>
         <nav
            class="@3xl:block w-2xs @3xl:size-auto @3xl:border-none @3xl:bg-transparent @3xl:relative @3xl:p-0 @3xl:top-0 absolute right-0 top-20 z-50 h-[calc(100vh-78px)] border-l border-t border-emerald-950/30 bg-emerald-900 p-7"
            :class="{ hidden: !isNavigationOpen }"
         >
            <ul class="@3xl:flex-row @3xl:items-center @3xl:gap-5 sticky top-0 inline-flex flex-col gap-9">
               <li v-for="(link, index) in links" :key="index">
                  <a
                     :href="link.url"
                     class="rounded-full px-4 py-2.5 transition-colors"
                     :class="
                        link.style === 'solid'
                           ? 'bg-stone-50 text-emerald-900 hover:bg-stone-100'
                           : 'text-stone-50 hover:bg-emerald-800'
                     "
                  >
                     {{ link.text }}
                  </a>
               </li>
            </ul>
         </nav>
      </div>
      <div
         class="absolute -bottom-3 left-0 z-0 h-3 w-full"
         :style="{
            backgroundImage: `url(${headerBorderImg})`,
            backgroundRepeat: 'repeat-x',
            backgroundSize: 'auto 100%',
         }"
      ></div>
   </header>
</template>

<script setup lang="ts">
import { ref } from "vue";
import headerBorderImg from "./border.png";

withDefaults(
   defineProps<{
      links: { text: string; url: string; style?: "solid" | "text" }[];
      logo: string;
      logoWidth: number | string;
   }>(),
   {
      links: () => [],
      logo: "",
      logoWidth: 144,
   }
);
const isNavigationOpen = ref(false);
</script>
