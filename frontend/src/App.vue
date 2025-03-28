<script setup>
import { RouterView } from "vue-router";
import NavBar from "./components/NavBar.vue";
</script>

<template>
  <div style="height: 100vh; width: 100%">
    <NavBar />
    <RouterView />
  </div>
</template>

<style scoped></style>
