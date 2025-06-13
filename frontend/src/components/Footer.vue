<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="footer-section">
        <h3 class="footer-title">redeyes Blog</h3>
        <p class="footer-description">개발과 기술에 대한 이야기</p>
        <p class="footer-subtitle">눈(snow)이 너무 빨감</p>
      </div>

      <div class="footer-section">
        <h4 class="footer-heading">Statistics</h4>
        <div class="footer-stats">
          <p>총 {{ totalPosts }}개의 포스트</p>
          <p>{{ totalTags }}개의 태그</p>
          <p>마지막 업데이트: {{ lastUpdate }}</p>
        </div>
      </div>

      <div class="footer-section">
        <h4 class="footer-heading">Tech Stack</h4>
        <div class="footer-tech">
          <p>Vue.js + Express.js</p>
          <p>Tailwind CSS</p>
          <p>Pinia State Management</p>
          <p>Virtual Scrolling</p>
        </div>
      </div>

      <div class="footer-section">
        <h4 class="footer-heading">Features</h4>
        <div class="footer-features">
          <p>가상 스크롤링</p>
          <p>다크/라이트 모드</p>
          <p>실시간 검색</p>
          <p>성능 최적화</p>
        </div>
      </div>
    </div>

    <div class="footer-bottom">
      <p>© 2025 redeyes. All rights reserved.</p>
      <p class="footer-tech-credit">Built with ❤️ using Vue.js & Express</p>
    </div>
  </footer>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { usePostStore } from "@/stores/postStore";
import axios from "axios";

// 컴포넌트 이름 정의
defineOptions({
  name: "SiteFooter",
});

const postStore = usePostStore();
const totalTags = ref(0);

const totalPosts = computed(() => postStore.posts.length);

const lastUpdate = computed(() => {
  if (postStore.posts.length === 0) return "정보 없음";

  const latestPost = postStore.posts.slice().sort((a, b) => new Date(b.date) - new Date(a.date))[0];

  return new Date(latestPost.date).toLocaleDateString("ko-KR");
});

const fetchTagsCount = async () => {
  try {
    const { data } = await axios.get("https://notebook.o-r.kr/api/tags?withCount=true");
    totalTags.value = data.length;
  } catch (error) {
    console.warn("Failed to fetch tags count:", error);
    totalTags.value = 0;
  }
};

onMounted(() => {
  fetchTagsCount();
});
</script>

<style scoped>
.footer {
  background-color: var(--bg-secondary);
  border-top: 1px solid var(--border-color);
  margin-top: 4rem;
  padding: 2rem 0 1rem 0;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.footer-section {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.footer-title {
  color: var(--text-primary);
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.footer-heading {
  color: var(--text-primary);
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.footer-description {
  color: var(--text-secondary);
  font-size: 1rem;
  line-height: 1.5;
}

.footer-subtitle {
  color: var(--text-secondary);
  font-size: 0.875rem;
  font-style: italic;
}

.footer-stats,
.footer-tech,
.footer-features {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.footer-stats p,
.footer-tech p,
.footer-features p {
  color: var(--text-secondary);
  font-size: 0.875rem;
  transition: color 0.2s ease;
}

.footer-stats p:hover,
.footer-tech p:hover,
.footer-features p:hover {
  color: var(--text-primary);
}

.footer-bottom {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1.5rem 2rem 0 2rem;
  border-top: 1px solid var(--border-color);
  margin-top: 2rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.footer-bottom p {
  color: var(--text-secondary);
  font-size: 0.875rem;
}

.footer-tech-credit {
  font-size: 0.75rem !important;
  opacity: 0.8;
}

@media (max-width: 768px) {
  .footer-content {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    padding: 0 1rem;
  }

  .footer-bottom {
    padding: 1.5rem 1rem 0 1rem;
  }
}
</style>
