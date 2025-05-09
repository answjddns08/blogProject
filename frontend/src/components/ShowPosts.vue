<template>
  <div class="flex justify-center">
    <div class="flex flex-col">
      <div class="flex relative mb-10">
        <ShowTags />
      </div>
      <RouterLink
        class="postContainer"
        v-for="post in posts"
        :to="`/posts/${post.folder}`"
        :key="post"
      >
        <div class="postImageBlock">
          <font-awesome-icon
            :icon="['fas', 'image']"
            size="2xl"
            class="absolute top-2/5 left-2/5"
            v-if="!post.coverImg"
          />
          <img
            :src="getImageUrl(post.folder, post.coverImg)"
            alt="cover img"
            class="w-full h-full object-cover"
            v-else
          />
        </div>
        <div class="px-3 py-3 gap-1 flex flex-col h-full justify-center">
          <span class="text-2xl font-bold">{{ post.title }}</span>
          <span class="flex grow text-gray-700">
            {{ post.summary.slice(0, 110) }}
          </span>
          <div class="flex gap-3">
            <div class="tagBlock" v-for="tag in post.tag" :key="tag" v-show="tag">
              {{ tag }}
            </div>
          </div>
          <div class="flex gap-1.5 text-gray-500">
            <div>
              <span>redeyes - {{ post.date }}</span>
            </div>
          </div>
        </div>
      </RouterLink>
      <p v-if="posts.length == 0">흠.. 포스트가 없나 보네요 ¯\_(ツ)_/¯</p>
    </div>
  </div>
</template>

<script setup>
import { onMounted, watch } from "vue";
import { RouterLink, useRoute } from "vue-router";
import axios from "axios";
import ShowTags from "./showTags.vue";
import { usePostStore } from "@/stores/postStore";

/**
 * @typedef {Object} Post
 * @property {string} title
 * @property {string} summary
 * @property {string} date
 * @property {string} folder
 * @property {string} coverImg
 * @property {string[]} tag
 * @property {string} content
 */

/**
 * @type {Post[]}
 */

const route = useRoute();
const postStore = usePostStore();

axios.defaults.withCredentials = true;

/**
 * return image url
 * @param {string} folder
 * @param {string} image
 */
const getImageUrl = (postFolder, imageName) => {
  return `https://notebook.o-r.kr/api/posts/images/${postFolder}/${imageName}`;
};

/** get Posts */
async function getPosts() {
  const { data } = await axios.get("https://notebook.o-r.kr/api/posts/", {
    params: {
      search: route.query.search, //ex: https://notebook.o-r.kr/api/posts/?search=test
    },
  });

  postStore.setPosts(data);
}

onMounted(getPosts);

watch(route, getPosts);

const posts = postStore.posts;
</script>

<style scoped>
p {
  font-family: "Noto Sans KR", sans-serif;
  font-optical-sizing: auto;
  font-weight: 500;
  font-style: normal;

  font-size: 2rem;
  line-height: 1.75rem;
}

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
  display: flex;

  align-items: center;

  width: 43.5rem;
  height: 11.25rem;

  border-radius: 1rem;

  margin-bottom: 4rem;

  transition: ease-out 0.25s;
}

.postContainer:hover {
  background-color: #efefef;
}

.postImageBlock {
  background-color: aquamarine;

  position: relative;

  border-radius: 1rem;

  overflow: hidden;

  width: 10rem;
  height: 10rem;

  flex-shrink: 0;
}

.tagBlock {
  border-width: 1px;

  font-size: 1rem;

  padding-inline: 0.25rem;

  border-radius: 0.5rem;
}

.tagBlock::before {
  content: "# ";
}
</style>
