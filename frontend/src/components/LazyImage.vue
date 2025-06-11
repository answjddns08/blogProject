<template>
  <div class="lazy-image-container" ref="imageRef" :style="{ width: width, height: height }">
    <!-- 교차점에 진입하면 이미지 로드 시작 -->
    <img
      v-if="isIntersecting"
      :src="src"
      :alt="alt"
      :class="imageClass"
      :style="{ opacity: isLoaded ? 1 : 0 }"
      @load="onLoad"
      @error="onError"
    />
    <!-- 로딩 스피너 (교차점 진입했지만 아직 로드 안됨) -->
    <div v-if="isIntersecting && !isLoaded" class="loading-placeholder">
      <font-awesome-icon :icon="['fas', 'spinner']" spin size="2xl" />
    </div>
    <!-- 기본 placeholder (아직 교차점 진입 안함) -->
    <div v-if="!isIntersecting" class="placeholder" :style="placeholderStyle">
      <font-awesome-icon :icon="['fas', 'image']" size="2xl" style="color: var(--text-secondary);" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue';

const props = defineProps({
  src: {
    type: String,
    required: true
  },
  alt: {
    type: String,
    default: ''
  },
  width: {
    type: String,
    default: '100%'
  },
  height: {
    type: String,
    default: 'auto'
  },
  imageClass: {
    type: String,
    default: ''
  },
  placeholderColor: {
    type: String,
    default: 'var(--bg-secondary)'
  }
});

const isIntersecting = ref(false);
const isLoaded = ref(false);
const imageRef = ref(null);
let observer = null;

const placeholderStyle = {
  backgroundColor: props.placeholderColor,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: '100%'
};

const onLoad = () => {
  console.log(`Image loaded: ${props.src}`);
  isLoaded.value = true;
};

const onError = () => {
  console.warn(`Failed to load image: ${props.src}`);
};

// isIntersecting 변화 모니터링
watch(isIntersecting, (newValue) => {
  console.log(`isIntersecting changed for ${props.src}:`, newValue);
});

// isLoaded 변화 모니터링
watch(isLoaded, (newValue) => {
  console.log(`isLoaded changed for ${props.src}:`, newValue);
});

onMounted(() => {
  console.log(`LazyImage component mounted with src: ${props.src}`);

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          console.log(`Image entering viewport: ${props.src}`);
          isIntersecting.value = true;
          observer?.unobserve(entry.target);
        }
      });
    },
    {
      rootMargin: '50px' // 뷰포트에서 50px 전에 로딩 시작
    }
  );

  // nextTick을 사용하여 DOM이 완전히 렌더링된 후 observer 등록
  if (imageRef.value) {
    observer.observe(imageRef.value);
  }
});

onUnmounted(() => {
  if (observer) {
    observer.disconnect();
  }
});
</script>

<style scoped>
.lazy-image-container {
  overflow: hidden;
  position: relative;
}

.loading-placeholder {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: var(--bg-secondary);
  color: var(--text-secondary);
  z-index: 1;
}

.placeholder {
  border-radius: inherit;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: opacity 0.3s ease;
}
</style>
