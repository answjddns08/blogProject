<template>
  <div class="flex justify-between items-center p-2">
    <!-- left elements -->
    <div class="flex px-10 gap-10 items-center">
      <RouterLink class="buttons font-bold text-4xl" to="/">Kellog</RouterLink>
      <form @submit.prevent="search">
        <label
          for="default-search"
          class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >Search</label
        >
        <input
          type="search"
          id="default-search"
          placeholder="search something..."
          v-model="searchForm"
        />
        <button type="submit" class="search-btn">
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

form {
  display: flex;

  gap: 0.75rem;

  padding: 0.5rem;

  border-bottom: 0.25rem solid var(--text-primary);
}

input {
  border-radius: 0.5rem;

  color: var(--text-primary);

  padding: 0rem 0.25rem;

  font-size: medium;

  outline-width: 0px;
}

.search-btn {
  padding: 0.5rem;
  font-size: 0.875rem;

  color: var(--text-primary);

  transition: all 0.3s ease;

  flex-shrink: 0;

  aspect-ratio: 1;

  display: flex;

  align-items: center;
  justify-content: center;

  min-height: 2.25rem;
  min-width: 2.25rem;

  border-radius: 50%;

  border: none;
  cursor: pointer;
}

.search-btn:hover {
  background-color: var(--accent-color); /* blue-700 */
}
</style>
