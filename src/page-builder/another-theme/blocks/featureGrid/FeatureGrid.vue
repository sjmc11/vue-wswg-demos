<template>
   <div class="page-container py-8 bg-stone-50">
      <div :id="blockId" class="mx-auto max-w-prose text-center">
         <h2 v-if="heading" class="@3xl:text-3xl text-xl font-bold text-emerald-900">
            {{ heading }}
         </h2>

         <p v-if="description" class="mt-3 text-pretty text-lg text-emerald-900/80">
            {{ description }}
         </p>
      </div>

      <div class="@lg:grid-cols-2 @5xl:grid-cols-3 @3xl:mt-12 relative z-10 mt-8 grid grid-cols-1 gap-8">
         <div
            v-for="(feature, featureIndex) in features"
            :key="`feature_${featureIndex}`"
            class="rounded-lg border border-emerald-800/20 bg-stone-50 p-6 shadow-sm hover:shadow-md transition-shadow"
         >
            <div class="inline-flex rounded-lg bg-emerald-900/10 p-3 text-emerald-900">
               <HeroIcon v-if="feature.icon" :name="feature.icon" class="size-6" />
            </div>

            <h3 class="mt-4 text-lg font-semibold text-emerald-900">
               {{ feature.heading }}
            </h3>

            <p class="mt-2 text-pretty text-emerald-900/80">
               {{ feature.description }}
            </p>
         </div>
      </div>
   </div>
</template>

<script lang="ts" setup>
import { createField } from "vue-wswg-editor";
import HeroIcon from "../../../../components/heroIcon/HeroIcon.vue";
import { heroIconNames, type HeroIconName } from "../../../../components/heroIcon/icon";

defineOptions({
   label: "Feature grid",
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
      features: createField.repeater(
         {
            heading: createField.text({
               maxLength: 50,
               placeholder: "Feature heading",
               label: "Heading",
            }),
            description: createField.text({
               maxLength: 120,
               placeholder: "Feature description",
               label: "Description",
            }),
            icon: createField.select(
               heroIconNames.map((iconName) => ({
                  label: iconName.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()),
                  value: iconName,
                  id: iconName,
               })),
               {
                  placeholder: "Select an icon",
                  label: "Icon",
                  description: "Choose a HeroIcon to display",
               }
            ),
         },
         {
            label: "Features",
            description: "List of features to show in the grid",
            group: "content",
            repeaterFieldLabel: "heading",
            default: {
               heading: "Example feature",
               description: "Lorem ipsum dolor sit amet.",
               icon: "star",
            },
         }
      ),
      margin: createField.margin({ group: "appearance" }),
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
      features?: {
         heading: string;
         description: string;
         icon: HeroIconName;
      }[];
      blockId?: string;
   }>(),
   {
      heading: "Key Features",
      description: "Discover what makes us different and how we can help you succeed.",
      features: () => [
         {
            heading: "High performance",
            description: "Lightning-quick load times optimized for every device",
            icon: "bolt",
         },
         {
            heading: "Enterprise security",
            description: "Enterprise-grade security built into every layer",
            icon: "lock-closed",
         },
         {
            heading: "Highly configurable",
            description: "Adapt every aspect to match your brand and needs",
            icon: "adjustments-vertical",
         },
      ],
      blockId: () => Math.random().toString(36).substring(2, 15),
   }
);
</script>
