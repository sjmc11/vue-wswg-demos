<template>
   <section class="bg-emerald-700/10 lg:grid lg:h-full lg:place-content-center">
      <div class="page-container @3xl:grid-cols-2 @3xl:items-center @3xl:py-24 grid gap-12 py-9">
         <div
            class="max-w-prose"
            :class="{
               'text-center': textAlign === 'center',
               'text-left': textAlign === 'left',
               'text-right': textAlign === 'right',
               'order-2': imagePosition === 'left',
               'order-1': imagePosition === 'right',
            }"
         >
            <p v-if="kicker" class="@3xl:mb-5 mb-3 text-xs uppercase tracking-widest text-emerald-800">
               {{ kicker }}
            </p>
            <h1 class="@4xl:text-5xl text-4xl font-bold text-emerald-900">
               {{ heading }}
            </h1>

            <p v-if="description" class="@xl:text-lg/relaxed mt-4 text-pretty text-base text-emerald-900/80">
               {{ description }}
            </p>

            <div
               v-if="ctas && ctas.length > 0"
               class="@xl:mt-8 mt-4 flex gap-4"
               :class="{
                  'justify-start': textAlign === 'left',
                  'justify-center': textAlign === 'center',
                  'justify-end': textAlign === 'right',
               }"
            >
               <a
                  v-for="(cta, index) in ctas"
                  :key="index"
                  :href="cta.url"
                  :class="[
                     'inline-block rounded px-5 py-3 font-medium shadow-sm transition-colors',
                     cta.style === 'solid'
                        ? 'border border-emerald-900 bg-emerald-900 text-stone-50 hover:bg-emerald-800'
                        : 'border border-emerald-900/30 text-emerald-900 hover:bg-emerald-50',
                  ]"
               >
                  {{ cta.text }}
               </a>
            </div>
         </div>

         <img
            v-if="image"
            :src="image"
            :alt="heading"
            class="@3xl:aspect-auto aspect-video size-full rounded-xl object-cover"
            :class="{
               'order-1': imagePosition === 'left',
               'order-2': imagePosition === 'right',
            }"
         />
         <div
            v-else
            class="@3xl:order-2 order-1 flex aspect-video size-full items-center justify-center rounded-xl border border-emerald-900/20 bg-emerald-50"
         >
            <HeroIcon name="photo" class="size-10 text-emerald-800/50" />
         </div>
      </div>
   </section>
</template>

<script lang="ts" setup>
import HeroIcon from "../../../../components/heroIcon/HeroIcon.vue";
import fields from "./fields";

defineOptions({
   label: "Hero with image",
   fields,
});

type CtaType = {
   text: string;
   url: string;
   style?: "solid" | "outline";
};

withDefaults(
   defineProps<{
      kicker?: string;
      heading?: string;
      description?: string;
      ctas?: CtaType[];
      textAlign?: "left" | "center" | "right";
      padding?: "sm" | "md" | "lg" | "xl" | undefined;
      image?: string;
      imagePosition?: "left" | "right";
   }>(),
   {
      textAlign: "center",
      padding: "sm",
      heading: "Welcome to our site",
      description:
         "Discover amazing features and services designed to help you succeed. Experience quality and innovation in every interaction.",
      ctas: (): CtaType[] => [
         {
            text: "Get Started",
            url: "#",
            style: "solid",
         },
         {
            text: "Learn more",
            url: "#",
            style: "outline",
         },
      ],
      imagePosition: "right",
   }
);
</script>
