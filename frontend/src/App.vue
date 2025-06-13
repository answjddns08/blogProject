<script setup>
import { RouterView } from "vue-router";
import { onMounted } from "vue";
import NavBar from "./components/NavBar.vue";
import SiteFooter from "./components/Footer.vue";
import { useDarkModeStore } from "./stores/darkModeStore";

const darkModeStore = useDarkModeStore();

// 앱 시작 시 다크 모드 초기화
onMounted(() => {
  darkModeStore.initializeDarkMode();
});
</script>

<template>
  <div style="min-height: 100vh; width: 100%; display: flex; flex-direction: column">
    <NavBar />
    <main style="flex: 1">
      <RouterView />
    </main>
    <SiteFooter />
  </div>
</template>

<style scoped></style>
