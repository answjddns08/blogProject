import { defineStore } from "pinia";
import { ref, watch } from "vue";

export const usePostStore = defineStore("postStore", () => {
  const posts = ref([]);

  // LocalStorage에서 posts 불러오기
  function loadPostsFromLocalStorage() {
    const savedPosts = localStorage.getItem("posts");
    if (savedPosts) {
      posts.value = JSON.parse(savedPosts);
    }
  }

  // LocalStorage에 posts 저장
  function savePostsToLocalStorage() {
    localStorage.setItem("posts", JSON.stringify(posts.value));
  }

  // posts를 업데이트하는 함수
  function setPosts(newPosts) {
    posts.value = newPosts;
  }

  // LocalStorage와 동기화
  watch(posts, savePostsToLocalStorage, { deep: true });

  // 초기화
  loadPostsFromLocalStorage();

  return {
    posts,
    setPosts,
    loadPostsFromLocalStorage,
  };
});
