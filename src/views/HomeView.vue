<template>
  <main>
    <div class="flex justify-center">
      <div class="flex flex-col">
        <div class="flex relative">
          <div class="sortMenu">sort by...</div>
        </div>
        <div class="postContainer">test</div>
      </div>
    </div>
  </main>
</template>

<script setup></script>

<style scoped>
.sortMenu {
  position: absolute;

  top: 1.5rem;
  left: 15rem;

  padding: 0.5rem;

  color: #727272;
  font-weight: 700;
  font-size: 0.875rem;

  background-color: #b3b3b3;
  border-radius: 0.5rem;

  white-space: nowrap;
}

.postContainer {
  background-color: #b3b3b3;

  padding: 1rem;
}
</style>
