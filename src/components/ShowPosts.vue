<template>
  <div class="flex justify-center">
    <div class="flex flex-col">
      <div class="flex relative mb-10">
        <!-- <div class="sortMenu">sort by...</div> -->
      </div>
      <RouterLink to="/" class="postContainer" v-for="a in test" :key="a">
        <div class="postImageBlock">
          <font-awesome-icon :icon="['fas', 'image']" size="2xl" class="absolute w-1/2~" />
        </div>
        <div class="px-3 py-1 flex flex-col">
          <span class="text-2xl font-bold">title</span>
          <span class="text-gray-700"
            >sentence test sentence test sentence test sentence test
          </span>
          <div class="flex gap-1.5 justify-between text-gray-500">
            <div>
              <span>author</span>
              <span>1972/7/11</span>
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
import { ref } from "vue";
import { RouterLink } from "vue-router";

const test = ref(4);
</script>

<style scoped>
.sortMenu {
  position: absolute;

  top: 1.5rem;
  left: 35rem;

  padding: 0.5rem;

  color: #727272;
  font-weight: 700;
  font-size: 0.875rem;

  background-color: #b3b3b3;
  border-radius: 0.5rem;

  white-space: nowrap;

  transition: ease-out 0.25s;
}

.sortMenu:hover {
  background-color: #858585;
}

.postContainer {
  background-color: #c8c8c8;

  display: flex;

  width: 27.5rem;

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

  width: 7.5rem;
}
</style>
