<template>
   <main class="default-page-layout">
      <AppHeader :links="links" :logo="logoImage" :logoWidth="150" />
      <slot name="default">
         <!-- page blocks will be rendered here -->
      </slot>
      <AppFooter :logo="logoImage" />
   </main>
</template>

<script setup lang="ts">
import AppHeader from "./partials/appHeader/AppHeader.vue";
import AppFooter from "./partials/AppFooter.vue";
import logoImage from "../../../assets/logo.png";

defineOptions({
   name: "Default",
   label: "Default page layout",
});

const links: { text: string; url: string; style?: "solid" | "text" }[] = [
   { text: "Home", url: "/", style: "solid" },
   { text: "About", url: "/about" },
   { text: "Contact", url: "/contact" },
];
</script>

<style lang="scss" scoped>
.default-page-layout {
   display: flex;
   flex-direction: column;
   height: 100%;
   background-color: #fff;
}
</style>
