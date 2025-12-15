<template>
   <div ref="dropdownRef" class="relative inline-flex">
      <span class="inline-flex divide-x divide-gray-300 overflow-hidden rounded-md border border-gray-300 bg-gray-50">
         <button
            type="button"
            class="px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 hover:text-gray-900 focus:relative"
            @click="toggleDropdown"
         >
            <span>{{ label }}</span>
         </button>

         <button
            type="button"
            class="px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 hover:text-gray-900 focus:relative"
            aria-label="Menu"
            :aria-expanded="isOpen ? 'true' : 'false'"
            aria-haspopup="true"
            @click="toggleDropdown"
         >
            <HeroIcon name="chevron-down" :class="chevronClass" />
         </button>
      </span>

      <div
         v-if="isOpen"
         role="menu"
         class="absolute start-0 top-12 z-20 w-56 divide-y divide-gray-200 overflow-hidden rounded border border-gray-300 bg-white py-1.5 shadow-sm"
      >
         <div>
            <a
               href="#"
               class="block px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 hover:text-gray-900"
               role="menuitem"
               @click="handleMenuItemClick('theme-settings')"
            >
               Theme settings
            </a>
         </div>
      </div>
   </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";
import HeroIcon from "../heroIcon/HeroIcon.vue";

defineProps<{
   label: string;
}>();

const emit = defineEmits<{
   (e: "menu-item-click", item: string): void;
}>();

const isOpen = ref(false);
const dropdownRef = ref<HTMLElement | null>(null);

const chevronClass = computed(() => {
   return `size-4 text-zinc-800 transition-transform ${isOpen.value ? "rotate-180" : ""}`;
});

function toggleDropdown() {
   isOpen.value = !isOpen.value;
}

function closeDropdown() {
   isOpen.value = false;
}

function handleMenuItemClick(item: string) {
   emit("menu-item-click", item);
   closeDropdown();
}

function handleClickOutside(event: MouseEvent) {
   if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
      closeDropdown();
   }
}

function handleEscapeKey(event: KeyboardEvent) {
   if (event.key === "Escape" && isOpen.value) {
      closeDropdown();
   }
}

onMounted(() => {
   document.addEventListener("click", handleClickOutside);
   document.addEventListener("keydown", handleEscapeKey);
});

onUnmounted(() => {
   document.removeEventListener("click", handleClickOutside);
   document.removeEventListener("keydown", handleEscapeKey);
});
</script>
