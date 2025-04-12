<template>
  <div class="flex justify-between items-center p-1">
    <!-- left elements -->
    <div class="flex px-10 gap-10 items-center">
      <RouterLink class="hover:text-blue-500 transition font-bold text-4xl" to="/"
        >Kellog</RouterLink
      >
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
      <RouterLink to="/" class="font-bold text-2xl hover:text-blue-500 transition">Blog</RouterLink>
      <RouterLink to="/about" class="font-bold text-2xl hover:text-blue-500 transition"
        >About</RouterLink
      >
      <font-awesome-icon :icon="['fas', 'moon']" size="2xl" />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { RouterLink, useRouter } from "vue-router";

const router = useRouter();

const searchForm = ref("");

function search() {
  router.push({ path: "/", query: { search: searchForm.value } });
}

//TODO: 검색 기능 구현
//TODO: 태그를 누르면 검색창에 tag가 입력되고 tag가 있는 포스트만 보여주기
</script>

<style scoped>
/* dimmed */
.modal-wrap {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  z-index: 10;
}

/* modal or popup */
.modal-container {
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 35rem;
  background: #fff;
  border-radius: 1rem;
  padding: 1rem;
  box-sizing: border-box;
  z-index: 11;

  display: flex;
  flex-direction: column;
  align-items: center;
}

.X-btn {
  position: absolute;

  cursor: pointer;

  right: 0rem;

  transition: all 0.2s ease;
}

.X-btn:hover {
  color: aqua;
}

.modal-btn {
  padding: 0.5rem;
  width: 15rem;
  height: 3.25rem;
  border-radius: 0.5rem;
  color: white;
  font-weight: 700;
  font-size: 1.25rem;
  line-height: 1.25rem;
  background-color: #2663e8;
  transition: background-color 0.2s ease;

  cursor: pointer;
}

.modal-btn:hover {
  background-color: #1a4bb9; /* 호버 시 변경할 색상 */
}
</style>
