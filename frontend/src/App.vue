<template>
  <NavBar v-if="route.meta?.showNav" />

  <router-view />

  <Footer v-if="route.meta?.showNav" />
</template>

<script setup>
import { useRoute } from "vue-router"

import NavBar from "./components/NavBar.vue"
import Footer from "./components/Footer.vue"

const route = useRoute()
</script>

<style>
:root {
  --base-font-size: 16px;
}

html {
  font-size: var(--base-font-size);
  transition: font-size 0.2s ease;
}

body {
  margin: 0;
  padding: 0;
  font-family: 'Inter', 'Segoe UI', sans-serif;
  background: #ffffff;
  color: #0a192f;
  -webkit-font-smoothing: antialiased;
}

/* Classe de Alto Contraste Global */
body.high-contrast-mode {
  background: #000 !important;
  color: #fff !important;
}
</style>