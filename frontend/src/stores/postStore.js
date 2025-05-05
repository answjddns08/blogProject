import { defineStore } from "pinia";
import { computed, ref, watch } from "vue";

export const usePostStore = defineStore("postStore", () => {
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
   * @type {Array<Post>}
   * @description posts array
   */
  const posts = ref([]);

  const currentPostId = ref(null);

  /** LocalStorage에서 posts 불러오기 */
  function loadPostsFromLocalStorage() {
    const savedPosts = localStorage.getItem("posts");
    if (savedPosts) {
      posts.value = JSON.parse(savedPosts);
    }
  }

  /** LocalStorage에 posts 저장 */
  function savePostsToLocalStorage() {
    localStorage.setItem("posts", JSON.stringify(posts.value));
  }

  /** posts를 업데이트하는 함수 */
  function setPosts(newPosts) {
    posts.value = newPosts;
  }

  /** 현재 포스트 ID 설정 */
  function setCurrentPostId(postId) {
    currentPostId.value = postId;
  }

  /** 현재 포스트의 인덱스 계산 */
  const currentPostIndex = computed(() =>
    posts.value.findIndex((post) => post.folder === currentPostId.value)
  );

  /** 이전 포스트 계산 */
  const previousPost = computed(() =>
    currentPostIndex.value > 0 ? posts.value[currentPostIndex.value - 1] : null
  );

  /** 다음 포스트 계산 */
  const nextPost = computed(() =>
    currentPostIndex.value < posts.value.length - 1 ? posts.value[currentPostIndex.value + 1] : null
  );

  // LocalStorage와 동기화
  watch(posts, savePostsToLocalStorage, { deep: true });

  // 초기화
  loadPostsFromLocalStorage();

  return {
    posts,
    currentPostId,
    setPosts,
    setCurrentPostId,
    loadPostsFromLocalStorage,
    previousPost,
    nextPost,
  };
});
