import { defineStore } from "pinia";
import axios from "axios";

export const useTagStore = defineStore("tags", {
  state: () => ({
    tags: [],
    selectedTag: null,
    isLoading: false,
    lastFetched: null,
    cacheExpiry: 7 * 24 * 60 * 60 * 1000, // 7일 캐시 유효시간
  }),

  getters: {
    isCacheValid() {
      return this.lastFetched && Date.now() - this.lastFetched < this.cacheExpiry;
    },

    filteredTags() {
      return this.tags.filter((tag) => tag && tag.trim() !== "");
    },
  },

  actions: {
    // localStorage에서 태그 데이터 로드
    loadFromLocalStorage() {
      try {
        const cachedData = localStorage.getItem("tagStore");
        if (cachedData) {
          const { tags, lastFetched } = JSON.parse(cachedData);
          this.tags = tags || [];
          this.lastFetched = lastFetched;

          console.log("Tags loaded from localStorage:", this.tags.length, "tags");
          return true;
        }
      } catch (error) {
        console.error("Error loading tags from localStorage:", error);
        localStorage.removeItem("tagStore");
      }
      return false;
    },

    // localStorage에 태그 데이터 저장
    saveToLocalStorage() {
      try {
        const dataToSave = {
          tags: this.tags,
          lastFetched: this.lastFetched,
        };
        localStorage.setItem("tagStore", JSON.stringify(dataToSave));
        console.log("Tags saved to localStorage");
      } catch (error) {
        console.error("Error saving tags to localStorage:", error);
      }
    },

    // 서버에서 태그 목록 가져오기
    async fetchTags(forceRefresh = false) {
      // 캐시가 유효하고 강제 새로고침이 아닌 경우 서버 요청 건너뛰기
      if (!forceRefresh && this.isCacheValid && this.tags.length > 0) {
        console.log("Using cached tags, skipping server request");
        return this.tags;
      }

      this.isLoading = true;

      try {
        console.log("Fetching tags from server...");
        const { data } = await axios.get("https://notebook.o-r.kr/api/tags/");

        this.tags = data || [];
        this.lastFetched = Date.now();

        // localStorage에 저장
        this.saveToLocalStorage();

        console.log("Tags fetched and cached:", this.tags.length, "tags");
        return this.tags;
      } catch (error) {
        console.error("Error fetching tags:", error);
        // 오류 발생 시 캐시된 데이터 사용
        if (this.tags.length > 0) {
          console.log("Using cached tags due to fetch error");
          return this.tags;
        }
        throw error;
      } finally {
        this.isLoading = false;
      }
    },

    // 태그 초기화 (캐시에서 로드하거나 서버에서 가져오기)
    async initializeTags() {
      // 먼저 localStorage에서 로드 시도
      const loadedFromCache = this.loadFromLocalStorage();

      // 캐시가 유효하면 서버 요청 건너뛰기
      if (loadedFromCache && this.isCacheValid) {
        console.log("Using valid cached tags");
        return this.tags;
      }

      // 캐시가 없거나 만료된 경우 서버에서 가져오기
      return await this.fetchTags(true);
    },

    // 선택된 태그 설정
    setSelectedTag(tag) {
      this.selectedTag = this.selectedTag === tag ? null : tag;
    },

    // 태그 토글
    toggleTag(tag) {
      this.setSelectedTag(tag);
    },

    // 캐시 강제 갱신
    async refreshTags() {
      console.log("Forcing tag refresh...");
      return await this.fetchTags(true);
    },

    // 캐시 클리어
    clearCache() {
      this.tags = [];
      this.selectedTag = null;
      this.lastFetched = null;
      localStorage.removeItem("tagStore");
      console.log("Tag cache cleared");
    },
  },
});
