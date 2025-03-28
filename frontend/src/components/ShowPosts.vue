<template>
  <div class="flex justify-center">
    <div class="flex flex-col">
      <div class="flex relative mb-10">
        <!-- <div class="sortMenu">sort by...</div> -->
      </div>
      <RouterLink
        class="postContainer"
        :to="`/posts/${post.folder}`"
        v-for="post in posts"
        :key="post"
      >
        <div class="postImageBlock">
          <font-awesome-icon
            :icon="['fas', 'image']"
            size="2xl"
            class="absolute top-2/5 left-2/5"
          />
        </div>
        <div class="px-3 py-1 flex flex-col h-full w-full justify-between">
          <span class="text-2xl font-bold">{{ post.title }}</span>
          <span class="flex text-gray-700">
            {{ post.content.slice(0, 100) }}
          </span>
          <div class="flex gap-3">
            <div class="tagBlock" v-for="tag in post.tag" :key="tag">
              {{ tag }}
            </div>
          </div>
          <div class="flex gap-1.5 justify-between text-gray-500">
            <div>
              <span>redeyes - {{ post.date }}</span>
            </div>
            <div class="mr-2 text-sm">
              <span>? comments</span>
            </div>
          </div>
        </div>
      </RouterLink>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { RouterLink } from "vue-router";
import axios from "axios";

const posts = ref([]);

async function getPosts() {
  const { data } = await axios.get("https://notebook.o-r.kr/api/posts/");

  posts.value = data;
}

onMounted(getPosts);

/*
  src 폴더에 있는 blog 폴더에 있는 폴더(포스트)들을 읽음
  폴더들에서 md 파일들을 불러옴
*/
</script>

<style scoped>
.sortMenu {
  position: absolute;

  top: 1.5rem;
  left: 45rem;

  padding: 0.5rem;

  color: #727272;
  font-weight: 700;
  font-size: 0.875rem;

  background-color: #b3b3b3;
  border-radius: 0.5rem;

  white-space: nowrap;
  /* 줄바꿈 끄기 */

  transition: ease-out 0.25s;
}

.sortMenu:hover {
  background-color: #858585;
}

.postContainer {
  background-color: #c8c8c8;

  display: flex;

  width: 40rem;
  height: 10rem;

  border-radius: 1rem;

  margin-bottom: 4rem;

  transition: ease-out 0.25s;
}

.postContainer:hover {
  background-color: #858585;
}

.postImageBlock {
  background-color: aquamarine;

  position: relative;

  border-top-left-radius: 1rem;
  border-bottom-left-radius: 1rem;

  width: 8.5rem;
  flex-shrink: 0;
}

.tagBlock {
  border-width: 1px;

  padding-inline: 0.25rem;

  border-radius: 0.5rem;
}

.tagBlock::before {
  content: "# ";
}
</style>
