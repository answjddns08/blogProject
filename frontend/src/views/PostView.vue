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

        <HeadingList />

        <!-- main content -->
        <div class="mb-5" v-html="post.content"></div>

        <!-- author description -->
        <AuthorDes />

        <!-- other posts -->
        <div class="flex justify-between w-full py-3 gap-3 mb-5">
          <!-- Previous Post Button -->
          <button
            class="postButton"
            :class="{ 'disabled-button': !previousPost }"
            @click="navigateToPost(previousPost)"
            :disabled="!previousPost"
          >
            <font-awesome-icon :icon="['fas', 'arrow-left']" size="2xl" />
            <div class="flex flex-col">
              <span>Previous Post</span>
              <span>{{ previousPost ? previousPost.title : "No Previous Post" }}</span>
            </div>
          </button>

          <!-- Next Post Button -->
          <button
            class="postButton justify-end"
            :class="{ 'disabled-button': !nextPost }"
            @click="navigateToPost(nextPost)"
            :disabled="!nextPost"
          >
            <div class="flex flex-col">
              <span>Next Post</span>
              <span>{{ nextPost ? nextPost.title : "No Next Post" }}</span>
            </div>
            <font-awesome-icon :icon="['fas', 'arrow-right']" size="2xl" />
          </button>
        </div>

        <!-- comments panel -->
        <!-- <div class="flex flex-col items-end gap-5">
          <input
            class="w-full bg-gray-400 rounded-lg p-4 outline-0"
            placeholder="login before type some comment"
          />
          <button class="bg-blue-500 p-3 rounded-lg">post</button>
        </div> -->
      </div>
    </div>
  </main>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import { useRoute, RouterLink, useRouter } from "vue-router";
import axios from "axios";
import AuthorDes from "@/components/authorDes.vue";
import { marked } from "marked";
import { usePostStore } from "@/stores/postStore";
import HeadingList from "@/components/HeadingList.vue";

axios.defaults.withCredentials = true;

const route = useRoute();
const router = useRouter();

const postStore = usePostStore();

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

const previousPost = ref(null);
const nextPost = ref(null);

function navigateToPost(post) {
  if (!post) return;

  router.push({ path: `/posts/${post.folder}` });
}

async function getPostData(folder) {
  const { data } = await axios.get(`https://notebook.o-r.kr/api/posts/${folder}`);

  post.value = data;

  post.value.content = marked(data.content, {
    gfm: true,
    breaks: true,
  });

  postStore.setCurrentPostId(folder);

  previousPost.value = postStore.previousPost;
  nextPost.value = postStore.nextPost;
}

onMounted(async () => {
  await getPostData(route.params.folder);
});

watch(
  () => route.params.folder,
  async (newFolder) => {
    await getPostData(newFolder);
  }
);
</script>

<style scoped>
.tagBlock {
  border-width: 0.1rem;

  padding-inline: 0.45rem;

  font-weight: 500;

  font-size: 1.25rem;

  border-radius: 0.5rem;
}

.tagBlock::before {
  content: "#";
  padding-right: 0.5rem;
}

.tagBlock:hover {
  background-color: #c6c6c6;
  color: #4b5563;
  transition: ease-out 0.25s;
}

.postButton {
  display: flex;

  flex: 1;

  align-items: center;

  gap: 0.5rem;
  padding: 0.5rem;

  border-width: 0.15rem;
  border-radius: 0.5rem;

  transition: ease-out 0.25s;
}

.postButton:hover {
  background-color: #c6c6c6;
  color: #1c2129;
}

.postButton:disabled {
  pointer-events: none;
}

.disabled-button {
  background-color: #e0e0e0;
  color: #a0a0a0;
  cursor: not-allowed;
}
</style>
