<template>
  <div class="relative mb-5">
    <div v-if="headings.headings.length" class="block">
      <p v-for="heading in headings.headings" :class="`h${heading.depth}`" :key="heading">
        {{ heading.tokens[0].text }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { watch } from "vue";

const props = defineProps({
  headings: {
    Type: Array(Object),
    default: {},
  },
});

console.log(props.headings);

watch(
  () => props.headings,
  () => {
    console.log("changed!");
  },
  { deep: true }
);
</script>

<style scoped>
.block {
  position: absolute;

  width: 15rem;

  left: 100%;

  margin-left: 5rem;

  padding: 0.25rem 0.75rem;

  line-height: 1.5;

  border-left: 2px solid #000;
}

.h2 {
  margin-left: 0.75rem;
}

.h3 {
  margin-left: 1.5rem;
}

.h4 {
  margin-left: 2.25rem;
}

.h5 {
  margin-left: 3rem;
}

.h6 {
  margin-left: 3.75rem;
}
</style>
