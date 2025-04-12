<template>
  <main class="flex justify-between">
    <showTags />
    <ShowPosts />
    <p>sort Menu</p>
  </main>
</template>

<script setup>
import ShowPosts from "@/components/ShowPosts.vue";
import showTags from "@/components/showTags.vue";
</script>

<style scoped>
.sortMenu {
  position: absolute;

  top: 1.5rem;
  left: 45rem;

  padding: 0.5rem;

  color: #727272;
  font-weight: 700;
  font-size: 0.875rem;

  background-color: #b3b3b3;
  border-radius: 0.5rem;

  white-space: nowrap;
  /* 줄바꿈 끄기 */

  transition: ease-out 0.25s;
}

.sortMenu:hover {
  background-color: #858585;
}
</style>
