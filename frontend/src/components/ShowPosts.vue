<template>
  <div class="flex justify-center min-h-screen">
    <div class="flex w-full max-w-7xl px-4 gap-6">
      <!-- 왼쪽: 태그 목록 -->
      <div class="tags-wrapper">
        <ShowTags />
      </div>

      <!-- 가운데: 포스트 목록 -->
      <div class="posts-main-wrapper">
        <div v-if="posts.length > 0" class="posts-content-wrapper">
          <RouterLink
            class="postContainer"
            v-for="post in posts"
            :to="`/posts/${post.folder}`"
            :key="post.folder"
          >
            <div class="postImageBlock">
              <LazyImage
                v-if="post.coverImg"
                :src="getImageUrl(post.folder, post.coverImg)"
                alt="cover img"
                width="10rem"
                height="10rem"
                imageClass="w-full h-full object-cover"
              />
              <div v-else class="placeholder-default">
                <font-awesome-icon
                  :icon="['fas', 'image']"
                  size="2xl"
                  style="color: var(--bg-primary)"
                />
              </div>
            </div>
            <div class="px-3 py-3 gap-1 flex flex-col h-full justify-center">
              <span class="text-2xl font-bold">{{ post.title }}</span>
              <span class="flex grow">
                {{ post.summary.slice(0, 115) }}
              </span>
              <div class="flex gap-3">
                <div class="tagBlock" v-for="tag in post.tag" :key="tag" v-show="tag">
                  {{ tag }}
                </div>
              </div>
              <div class="flex gap-1.5" style="color: var(--text-secondary)">
                <div>
                  <span>redeyes - {{ post.date }}</span>
                </div>
              </div>
            </div>
          </RouterLink>
        </div>

        <!-- 포스트가 없을 때 메시지 -->
        <div v-if="posts.length == 0" class="posts-content-wrapper">
          <p>흠.. 포스트가 없나 보네요 ¯\_(ツ)_/¯</p>
        </div>
      </div>

      <!-- 오른쪽: 작가 정보 -->
      <div class="author-wrapper">
        <AuthorField />
      </div>
    </div>

    <!-- 맨 위로 가기 버튼 -->
    <button
      class="scroll-to-top-btn"
      @click="scrollToTop"
      v-show="posts.length > 0"
      transition="scroll-btn"
      :class="{ 'scroll-btn-enter-active': true, 'scroll-btn-leave-active': true }"
    >
      <font-awesome-icon icon="fa-solid fa-arrow-up" />
    </button>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import { RouterLink, useRoute } from "vue-router";
import axios from "axios";
import ShowTags from "./showTags.vue";
import { usePostStore } from "@/stores/postStore";
import AuthorField from "./authorField.vue";
import LazyImage from "./LazyImage.vue";

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

const posts = ref([]);

/**
 * return image url
 * @param {string} postFolder
 * @param {string} imageName
 */
const getImageUrl = (postFolder, imageName) => {
  return `https://notebook.o-r.kr/api/posts/images/${postFolder}/${imageName}`;
};

/** get Posts */
async function getPosts() {
  if (route.query.search || !postStore.posts.length) {
    const { data } = await axios.get("https://notebook.o-r.kr/api/posts/", {
      params: {
        search: route.query.search, //ex: https://notebook.o-r.kr/api/posts/?search=test
      },
    });

    if (route.query.search) {
      posts.value = data;
      return;
    } else {
      // no posts data in postStore
      postStore.setPosts(data);
    }
  }

  posts.value = postStore.posts;
}

// 맨 위로 스크롤
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

onMounted(getPosts);

watch(route, getPosts, { immediate: true });
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

/* 3단 레이아웃 래퍼들 */
.posts-main-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;

  margin-top: 2.5rem;

  flex: 1; /* 나머지 공간 차지 */
  min-width: 0; /* 자식 요소가 부모의 너비를 넘지 않도록 */
  max-width: 47rem;
}

.posts-content-wrapper {
  width: 100%;
  max-width: 47rem;
}

/* 태그 및 작성자 래퍼 - 사이드바로 고정 */
.tags-wrapper {
  width: 15rem;

  flex-shrink: 0;

  position: sticky;

  top: var(--navbar-height);

  margin-top: 7.5rem;

  padding-top: 5rem;

  height: fit-content;
}

.author-wrapper {
  width: 15rem;
  flex-shrink: 0;
  position: sticky;

  top: var(--navbar-height);

  margin-top: 7.5rem;

  padding-top: 2.5rem;
  padding-left: 10rem;

  height: fit-content;
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

  width: 100%;
  max-width: 47rem;
  height: 11.25rem;

  border-radius: 1rem;
  border: 2px solid transparent;

  margin-bottom: 1.5rem;

  transition: all 0.3s ease;
  position: relative;
}

.postContainer:hover {
  background-color: var(--border-color);
  border: 2px solid var(--accent-color);
  transform: translateY(-2px);
  box-shadow: 0 4px 15px var(--shadow);
}

.postImageBlock {
  background-color: var(--text-secondary);

  position: relative;

  border-radius: 0.75rem;

  overflow: hidden;

  margin-left: 0.625rem;

  width: 10rem;
  height: 10rem;

  flex-shrink: 0;
}

.placeholder-default {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.tagBlock {
  border-width: 0.1rem;

  border-color: var(--text-secondary);

  color: var(--text-secondary);

  font-size: 1rem;

  padding-inline: 0.25rem;

  border-radius: 0.5rem;
}

.tagBlock::before {
  content: "# ";
}

/* 맨 위로 가기 버튼 */
.scroll-to-top-btn {
  position: fixed;

  bottom: 2rem;

  right: 2rem;
  width: 3rem;
  height: 3rem;

  background-color: var(--accent-color);
  color: var(--text-primary);

  border: none;
  border-radius: 50%;

  cursor: pointer;

  box-shadow: 0 4px 15px var(--shadow);

  transition: all 0.3s ease-in-out;

  z-index: 100;
}

.scroll-to-top-btn:hover {
  background-color: var(--text-primary);
  color: var(--accent-color);

  transform: translateY(-2px);

  box-shadow: 0 6px 20px var(--shadow);
}
</style>
