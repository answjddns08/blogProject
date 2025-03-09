<template>
  <div class="border border-gray-300">
    <div class="flex justify-between items-center p-1">
      <div class="flex px-10 gap-10 items-center">
        <RouterLink class="hover:text-blue-500 transition font-bold text-4xl" to="/"
          >Kellog</RouterLink
        >
        <div class="flex gap-5 bg-gray-300 rounded-lg p-3">
          <input
            class="bg-white rounded-lg p-2 text-sm outline-0"
            placeholder="search something..."
          />
          <button class="bg-blue-500 rounded-lg p-2 text-sm hover:bg-blue-700 transition w-9 h-9">
            <font-awesome-icon :icon="['fas', 'magnifying-glass']" />
          </button>
        </div>
      </div>

      <div class="flex gap-10 px-10 items-center">
        <font-awesome-icon :icon="['fas', 'moon']" size="2xl" />
        <button class="bg-gray-400 p-2.5 rounded-lg text-white hover:bg-gray-600 transition">
          login
        </button>
        <font-awesome-icon :icon="['fas', 'bars']" size="2xl" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { RouterLink } from "vue-router";
</script>

<style scoped></style>
