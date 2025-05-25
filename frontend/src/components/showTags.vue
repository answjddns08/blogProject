<template>
  <div class="tagBox">
    <div class="fixed">
      <h1 class="text-2xl font-bold mb-3">Tag List</h1>
      <ul class="list-disc gap-2 ml-2.5">
        <li v-for="tag in tags" :key="tag" v-show="tag">
          <button @click="toggleTag(tag)" :class="{ active: selectedTag === tag }">
            {{ tag }}
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import { onMounted } from "vue";
import { useRouter } from "vue-router";

const tags = ref([]);
const selectedTag = ref(null);

const router = useRouter();

async function getTags() {
  const { data } = await axios.get("https://notebook.o-r.kr/api/tags/");
  tags.value = data;
}

function toggleTag(tag) {
  if (selectedTag.value === tag) {
    selectedTag.value = null;
    router.push({ path: "/", query: {} });
  } else {
    selectedTag.value = tag;
    router.push({ path: "/", query: { search: "#" + tag } });
  }
}

onMounted(getTags);
</script>

<style scoped>
.tagBox {
  display: flex;
  flex-direction: column;

  position: absolute;

  right: 100%;

  margin-right: 15rem;

  margin-top: 3.5rem;
}

button {
  background: none;
  border: none;
  color: #000;

  cursor: pointer;

  font-size: 1.125rem;
  font-weight: 550;

  transition: all 0.3s ease;
}

button:hover {
  color: #007bff;

  text-decoration: underline;
}

button::before {
  content: "# ";
}

button.active {
  color: #007bff;
}
</style>
