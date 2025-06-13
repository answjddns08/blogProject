<template>
  <div class="virtual-scroll-container" ref="containerRef" @scroll="onScroll">
    <div class="virtual-scroll-content" :style="{ height: totalHeight + 'px' }">
      <div 
        class="virtual-scroll-item"
        v-for="item in visibleItems" 
        :key="item.index"
        :style="{ 
          transform: `translateY(${item.top}px)`,
          height: itemHeight + 'px'
        }"
      >
        <slot :item="item.data" :index="item.index"></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue';

const props = defineProps({
  items: {
    type: Array,
    required: true
  },
  itemHeight: {
    type: Number,
    default: 200 // 기본 포스트 아이템 높이
  },
  buffer: {
    type: Number,
    default: 5 // 화면 위아래로 몇 개의 아이템을 미리 렌더링할지
  },
  containerHeight: {
    type: Number,
    default: 600
  }
});

const containerRef = ref(null);
const scrollTop = ref(0);
const containerHeight = ref(props.containerHeight);

// 전체 높이 계산
const totalHeight = computed(() => props.items.length * props.itemHeight);

// 보이는 아이템 범위 계산
const visibleRange = computed(() => {
  const start = Math.floor(scrollTop.value / props.itemHeight);
  const end = Math.min(
    start + Math.ceil(containerHeight.value / props.itemHeight),
    props.items.length - 1
  );
  
  return {
    start: Math.max(0, start - props.buffer),
    end: Math.min(props.items.length - 1, end + props.buffer)
  };
});

// 화면에 렌더링할 아이템들
const visibleItems = computed(() => {
  const items = [];
  for (let i = visibleRange.value.start; i <= visibleRange.value.end; i++) {
    items.push({
      index: i,
      data: props.items[i],
      top: i * props.itemHeight
    });
  }
  return items;
});

const onScroll = (event) => {
  scrollTop.value = event.target.scrollTop;
};

const updateContainerHeight = () => {
  if (containerRef.value) {
    containerHeight.value = containerRef.value.clientHeight;
  }
};

onMounted(() => {
  updateContainerHeight();
  window.addEventListener('resize', updateContainerHeight);
});

onUnmounted(() => {
  window.removeEventListener('resize', updateContainerHeight);
});

// props.items가 변경될 때 스크롤 위치 초기화
watch(() => props.items, () => {
  scrollTop.value = 0;
  if (containerRef.value) {
    containerRef.value.scrollTop = 0;
  }
});
</script>

<style scoped>
.virtual-scroll-container {
  height: 100%;
  overflow-y: auto;
  position: relative;
}

.virtual-scroll-content {
  position: relative;
}

.virtual-scroll-item {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
}
</style>
