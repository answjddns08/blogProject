<template>
  <main>
    <div class="flex justify-center">
      <div class="flex flex-col">
        <div class="flex relative">
          <div class="sortMenu">sort by...</div>
        </div>
        <div class="postContainer">
          <div class="postImageBlock">
            <font-awesome-icon :icon="['fas', 'image']" size="2xl" class="absolute w-1/2~" />
          </div>
          <div class="px-2 py-1 flex flex-col">
            <span class="text-2xl font-bold">title</span>
            <span class="text-gray-700">Lorem Ipsum fkfdsfdsafdsafd ;kjfdsakjfdsa;kj</span>
            <div class="flex gap-1.5 text-gray-500">
              <span>author</span>
              <span>1972/7/11</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup></script>

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
}

.postContainer {
  background-color: #c8c8c8;

  display: flex;

  height: 7.5rem;
  width: 22.5rem;

  border-radius: 1rem;
}

.postImageBlock {
  background-color: aqua;

  position: relative;

  border-top-left-radius: 1rem;
  border-bottom-left-radius: 1rem;

  min-height: 6.5rem;
  min-width: 5.5rem;
}
</style>
