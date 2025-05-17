<template>
  <main class="flex flex-col items-center">
    <div class="flex items-center gap-x-1.5 text-7xl font-bold">
      <span>4</span>
      <span class="loading_circle"></span>
      <span>4</span>
    </div>
    <p class="text-lg mt-4">Page Not Found</p>
  </main>
</template>

<script setup></script>
<style scoped>
.loading_circle {
  width: 4rem;
  height: 4rem;
  border-radius: 50%;

  border: 0.6rem solid transparent;

  border-top-color: #000;

  animation: loading 1s ease infinite;

  /* margin: 0 0.5rem; */
}

@keyframes loading {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
