<template>
  <main>
    <div class="flex w-full justify-center">
      <div class="flex flex-col w-xl">
        <!-- margin space -->
        <div class="mb-10"></div>

        <!-- title and extra -->
        <div class="flex flex-col w-full mb-10">
          <p class="text-5xl mb-5 font-bold">title</p>
          <div class="flex justify-between w-full">
            <div class="flex gap-2">
              <span>author</span>
              <span>1972</span>
            </div>
            <div class="flex gap-4">
              <span>수정</span>
              <span>삭제</span>
            </div>
          </div>
        </div>

        <!-- main content -->
        <div class="mb-5">
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
          sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
          est laborum."
        </div>

        <!-- author description -->
        <div class="flex w-full justify-between items-center mb-5">
          <div class="flex">
            <div class="bg-blue-500 p-5 rounded-full mr-4">Img</div>
            <div class="flex flex-col gap-2 items-start justify-center">
              <p>author</p>
              <p>description...</p>
            </div>
          </div>
          <button class="bg-blue-500 p-4 rounded-lg">follow</button>
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
            placeholder="Type some comments.."
          />
          <button class="bg-blue-500 p-3 rounded-lg">post</button>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup></script>

<style scoped></style>
