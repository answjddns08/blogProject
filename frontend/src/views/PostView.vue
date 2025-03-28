<template>
  <main>
    <div class="flex w-full justify-center">
      <div class="flex flex-col w-xl">
        <!-- margin space -->
        <div class="mb-10"></div>

        <!-- title and extra -->
        <div class="flex flex-col w-full mb-10 gap-4">
          <p class="text-5xl font-bold">title</p>
          <div class="flex gap-2">
            <span>author</span>
            <span>1972</span>
          </div>
          <div class="flex gap-3 w-full">
            <div class="tagBlock">tag</div>
            <div class="tagBlock">sex</div>
            <div class="tagBlock">tag</div>
          </div>
        </div>

        <!-- main content -->
        <div class="mb-5">
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
          sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
          est laborum." "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
          exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
          dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
          anim id est laborum."
        </div>

        <!-- author description -->
        <div class="flex mb-5">
          <div class="bg-blue-500 p-7 mr-4 rounded-full"></div>
          <div class="flex flex-col gap-2 items-start justify-center">
            <p>author</p>
            <p>description...</p>
          </div>
        </div>

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
import { onMounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

async function getPostData() {
  console("get test");
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
