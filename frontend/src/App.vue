<template>
  <NavBar/>

  <router-view />

  <Footer/>
</template>

<script setup>
import NavBar from './components/NavBar.vue';
import Footer from './components/Footer.vue';
</script>

<style>
body {
  margin: 0;
  font-family: 'Segoe UI', sans-serif;
  background: #f4f4f4;
}
</style>