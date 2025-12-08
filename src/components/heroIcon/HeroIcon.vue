<template>
   <component :is="iconComponent" v-if="iconComponent" :class="iconClass" />
</template>

<script lang="ts" setup>
import { computed, shallowRef, watch, type Component } from "vue";
import type { HeroIconName } from "./icon";

const props = withDefaults(
   defineProps<{
      name: HeroIconName;
      class?: string;
   }>(),
   {
      class: "",
   }
);

/**
 * Converts kebab-case icon name to PascalCase component name
 * e.g., "check-circle" -> "CheckCircleIcon", "home" -> "HomeIcon", "bars-2" -> "Bars2Icon"
 */
function kebabToPascalCase(kebab: string): string {
   const pascalCase = kebab
      .split("-")
      .map((word) => {
         // Handle numbers - keep them as-is but capitalize preceding letter if needed
         if (/^\d+$/.test(word)) {
            return word;
         }
         return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join("");
   return `${pascalCase}Icon`;
}

const iconClass = computed(() => props.class);

const iconComponent = shallowRef<Component | null>(null);

async function loadIcon() {
   if (!props.name) {
      iconComponent.value = null;
      return;
   }

   try {
      const componentName = kebabToPascalCase(props.name);
      const iconModule = await import("@heroicons/vue/24/outline");
      const IconComponent = (iconModule as any)[componentName];

      if (!IconComponent) {
         console.warn(`HeroIcon "${props.name}" (${componentName}) not found`);
         iconComponent.value = null;
         return;
      }

      iconComponent.value = IconComponent;
   } catch (error) {
      console.error(`Error loading HeroIcon "${props.name}":`, error);
      iconComponent.value = null;
   }
}

// Load icon when name changes
watch(
   () => props.name,
   () => {
      loadIcon();
   },
   { immediate: true }
);
</script>
