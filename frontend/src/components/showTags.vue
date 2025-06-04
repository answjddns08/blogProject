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

.header h1 {
  color: var(--text-primary);
  margin: 0;
}

button {
  background: none;

  border: none;
  border-radius: 4px;

  color: var(--text-primary);

  cursor: pointer;

  font-size: larger;
  font-weight: 550;

  transition: all 0.3s ease;

  padding: 0rem 0.5rem;

  position: relative;
}

button:hover {
  color: var(--accent-color);
  background-color: var(--bg-primary);

  text-decoration: underline;

  transform: translateY(-2px);
}

button::before {
  content: "# ";
}

button.active {
  color: var(--accent-color);
  background-color: var(--bg-primary);
}

/* 리스트 스타일 */
ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

li {
  margin-bottom: 0.25rem;
}
</style>
