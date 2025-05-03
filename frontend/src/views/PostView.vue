<template>
  <main>
    <div class="flex w-full justify-center">
      <div class="flex flex-col w-xl">
        <!-- margin space -->
        <div class="mb-10"></div>

        <!-- title and extra -->
        <div class="flex flex-col w-full mb-10 gap-4">
          <p class="text-5xl font-bold">{{ post.title }}</p>
          <div class="flex gap-2">
            <span>redeyes</span>
            <span>-</span>
            <span>{{ post.date }}</span>
          </div>
          <div class="flex gap-3 w-full">
            <RouterLink
              :to="{ path: '/', query: { search: '#' + tag } }"
              class="tagBlock"
              v-for="tag in post.tag"
              v-show="tag"
              :key="tag"
              >{{ tag }}</RouterLink
            >
          </div>
        </div>

        <!-- main content -->
        <div class="mb-5">
          {{ post.content }}
        </div>

        <!-- author description -->
        <AuthorDes />

        <!-- other posts -->
        <div class="bg-gray-400 rounded-lg flex flex-col w-full p-3 mb-5">
          <p>다른 글</p>
          <div class="flex w-full justify-between">
            <p>- option</p>
            <p>1972년 7월 11일</p>
          </div>
          <div class="flex w-full justify-between">
            <p>- option</p>
            <p>1972년 7월 11일</p>
          </div>
          <div class="flex w-full justify-between">
            <p>- option</p>
            <p>1972년 7월 11일</p>
          </div>
          <div class="flex w-full justify-between">
            <p>- option</p>
            <p>1972년 7월 11일</p>
          </div>
        </div>

        <!-- comments panel -->
        <div class="flex flex-col items-end gap-5">
          <input
            class="w-full bg-gray-400 rounded-lg p-4 outline-0"
            placeholder="login before type some comment"
          />
          <button class="bg-blue-500 p-3 rounded-lg">post</button>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRoute, RouterLink } from "vue-router";
import axios from "axios";
import AuthorDes from "@/components/authorDes.vue";

axios.defaults.withCredentials = true;

const route = useRoute();

const postFolder = route.params.folder;

/**
 * post type
 * @typedef {Object} Post
 * @property {string} folder - post folder name
 * @property {string} title - post title
 * @property {string} date - post date
 * @property {Array<string>} tag - post tags
 * @property {string} content - post content
 * @property {string} coverImg - post cover image
 */

/**
 * @type {Post}
 */
const post = ref({});

async function getPostData() {
  const { data } = await axios.get(`https://notebook.o-r.kr/api/posts/${postFolder}`);

  post.value = data;
}

onMounted(getPostData);
</script>

<style scoped>
.tagBlock {
  border-width: 1px;

  padding-inline: 0.35rem;

  border-radius: 0.5rem;
}

.tagBlock::before {
  content: "# ";
}
</style>
