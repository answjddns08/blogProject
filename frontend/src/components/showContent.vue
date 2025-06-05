<template>
  <div class="mb-5" v-html="props.content"></div>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  content: {
    type: String,
    required: true,
  },
});
</script>

<style scoped>
::v-deep p {
  margin-bottom: 1rem;
}

::v-deep h1 {
  font-size: 2.25rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  margin-top: 2rem;
  border-bottom: 2px solid #e5e7eb;
  padding-bottom: 0.5rem;
}

::v-deep h2 {
  font-size: 1.875rem;
  font-weight: bold;
  margin-bottom: 1.25rem;
  margin-top: 1.75rem;
}

::v-deep h3 {
  font-size: 1.5rem;
  font-weight: semibold;
  margin-bottom: 1rem;
  margin-top: 1.5rem;
}

::v-deep h4 {
  font-size: 1.25rem;
  font-weight: semibold;
  margin-bottom: 0.75rem;
  margin-top: 1.25rem;
}

::v-deep h5 {
  font-size: 1.125rem;
  font-weight: semibold;
  margin-bottom: 0.5rem;
  margin-top: 1rem;
}

::v-deep h6 {
  font-size: 1rem;
  font-weight: semibold;
  margin-bottom: 0.5rem;
  margin-top: 1rem;
}

::v-deep ul {
  list-style-type: disc;
  margin-left: 1.5rem;
  margin-bottom: 1.5rem;
}

::v-deep ol {
  list-style-type: decimal;
  margin-left: 1.5rem;
  margin-bottom: 1.5rem;
}

::v-deep li {
  margin-bottom: 0.5rem;
}

::v-deep blockquote {
  border-left: 4px solid #3b82f6;
  padding-left: 1rem;
  margin: 1.5rem 0;
  font-style: italic;
  background-color: #f8fafc;
  padding: 1rem;
  border-radius: 0.5rem;
}

::v-deep code {
  background-color: #f1f5f9;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-family: "Courier New", monospace;
  font-size: 0.875rem;
}

::v-deep pre {
  background-color: #1e293b;
  color: #e2e8f0;
  padding: 1rem;
  border-radius: 0.5rem;
  overflow-x: auto;
  margin: 1.5rem 0;
}

::v-deep pre code {
  background-color: transparent;
  padding: 0;
  color: inherit;
}

::v-deep table {
  width: 100%;
  border-collapse: collapse;
  margin: 1.5rem 0;
}

::v-deep th,
::v-deep td {
  border: 1px solid #d1d5db;
  padding: 0.75rem;
  text-align: left;
}

::v-deep th {
  background-color: #f9fafb;
  font-weight: semibold;
}

::v-deep img {
  max-width: 100%;
  height: auto;
  border-radius: 0.5rem;
  margin: 1rem 0;
}

::v-deep a {
  color: #3b82f6;
  text-decoration: underline;
}

::v-deep a:hover {
  color: #1d4ed8;
}

::v-deep hr {
  border: none;
  border-top: 1px solid #e5e7eb;
  margin: 2rem 0;
}
</style>
