<template>
  <div class="flex justify-between items-center p-1">
    <!-- left elements -->
    <div class="flex px-10 gap-10 items-center">
      <RouterLink class="buttons font-bold text-4xl" to="/">Kellog</RouterLink>
      <form class="flex gap-5 bg-gray-300 rounded-lg p-3" @submit.prevent="search">
        <label
          for="default-search"
          class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >Search</label
        >
        <input
          type="search"
          class="bg-white rounded-lg p-2 text-sm outline-0"
          id="default-search"
          placeholder="search something..."
          v-model="searchForm"
        />
        <button
          type="submit"
          class="bg-blue-500 rounded-lg p-2 text-sm hover:bg-blue-700 transition w-9 h-9"
        >
          <font-awesome-icon :icon="['fas', 'magnifying-glass']" />
        </button>
      </form>
    </div>

    <!-- right elements -->
    <div class="flex gap-10 px-10 items-center">
      <RouterLink to="/" class="font-bold text-2xl buttons">Blog</RouterLink>
      <RouterLink to="/about" class="font-bold text-2xl buttons">About</RouterLink>
      <button @click="darkModeStore.toggleDarkMode">
        <font-awesome-icon
          v-if="darkModeStore.isDarkMode"
          :icon="['fas', 'sun']"
          size="2xl"
          class="hover:text-yellow-500 transition"
        />
        <font-awesome-icon
          v-else
          :icon="['fas', 'moon']"
          size="2xl"
          class="hover:text-blue-700 transition"
        />
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { RouterLink, useRouter } from "vue-router";
import { useDarkModeStore } from "@/stores/darkModeStore";

const router = useRouter();
const darkModeStore = useDarkModeStore();

const searchForm = ref("");

function search() {
  router.push({ path: "/", query: { search: searchForm.value } });
}
</script>

<style scoped>
.buttons {
  color: inherit;
  text-decoration: none;

  transition: all 0.3s ease;
}

.buttons:hover {
  color: var(--accent-color); /* Tailwind's blue-700 */
}
</style>
