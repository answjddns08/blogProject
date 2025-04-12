<template>
  <div class="tagBox">
    <div class="fixed">
      <h1 class="text-3xl font-bold mb-3">Tag List</h1>
      <div class="flex flex-col gap-2 ml-2.5">
        <button v-for="tag in tags" :key="tag" @click="searchTag(tag)">
          {{ tag }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import { onMounted } from "vue";
import { useRouter } from "vue-router";

const tags = ref([]);

const router = useRouter();

async function getTags() {
  const { data } = await axios.get("https://notebook.o-r.kr/api/tags/");

  tags.value = data;
}

function searchTag(tag) {
  router.push({ path: "/", query: { search: "#" + tag } });
}

onMounted(getTags);
</script>

<style scoped>
.tagBox {
  display: flex;
  flex-direction: column;

  position: absolute;

  left: -13.5rem;

  margin-top: 1.5rem;
}

button {
  background-color: #c6c6c6;
  border-radius: 0.5rem;
  padding: 0.5rem;
  color: #4b5563;
  font-weight: 700;
  font-size: 0.875rem;
  transition: ease-out 0.25s;

  font-size: medium;
}

button::before {
  content: "# ";
}

button:hover {
  background-color: #94969a;
  cursor: pointer;
}
</style>
