<template>
  <main class="flex flex-col items-center">
    <div class="flex gap-x-3 text-7xl font-bold">
      <span>4</span>
      <svg class="svg-spinner" viewBox="0 0 50 50">
        <circle class="path" cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
      </svg>
      <span>4</span>
    </div>
    <p class="text-lg mt-4">Page Not Found</p>
  </main>
</template>

<script setup></script>

<style scoped>
.svg-spinner {
  width: 4rem;
  height: 4rem;
  animation: rotate 2s linear infinite;
}

.path {
  stroke: #000;
  stroke-linecap: round;
  animation: dash 1.5s ease-in-out infinite;
}

@keyframes rotate {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes dash {
  0% {
    stroke-dasharray: 1, 150;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -35;
  }
  100% {
    stroke-dasharray: 1, 150;
    stroke-dashoffset: -124;
  }
}
</style>
