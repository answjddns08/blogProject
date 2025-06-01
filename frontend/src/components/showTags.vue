<template>
  <div class="tagBox">
    <div class="fixed">
      <div class="header">
        <h1 class="text-2xl font-bold">Tag List</h1>
      </div>
      <ul class="list-disc gap-2 ml-2.5">
        <li v-for="tag in tagStore.filteredTags" :key="tag" v-show="tag">
          <button @click="handleTagClick(tag)" :class="{ active: tagStore.selectedTag === tag }">
            {{ tag }}
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { useTagStore } from "@/stores/tagStore";

const tagStore = useTagStore();
const router = useRouter();

function handleTagClick(tag) {
  tagStore.toggleTag(tag);

  // toggle 후의 상태로 라우팅 결정
  if (tagStore.selectedTag) {
    router.push({ path: "/", query: { search: "#" + tagStore.selectedTag } });
  } else {
    router.push({ path: "/", query: {} });
  }
}

onMounted(async () => {
  try {
    await tagStore.initializeTags();

    console.log("Tags initialized successfully:", tagStore.selectedTag);
  } catch (error) {
    console.error("Failed to initialize tags:", error);
  }
});
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

.header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.75rem;
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
