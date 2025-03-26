<template>
  <div class="flex justify-center">
    <div class="flex flex-col">
      <div class="flex relative mb-10">
        <div class="sortMenu">sort by...</div>
      </div>
      <RouterLink
        :to="`/post/${post.folder}`"
        class="postContainer"
        v-for="post in posts"
        :key="post"
      >
        <div class="postImageBlock">
          <font-awesome-icon
            :icon="['fas', 'image']"
            size="2xl"
            class="absolute top-2/5 left-2/5"
          />
        </div>
        <div class="px-3 py-1 flex flex-col h-full justify-between">
          <span class="text-2xl font-bold">title</span>
          <span class="flex text-gray-700">
            sentence test sentence test sentence test sentence test sentence test sentence test
          </span>
          <div class="flex gap-3 w-full">
            <div class="tagBlock">tag</div>
            <div class="tagBlock">sex</div>
            <div class="tagBlock">tag</div>
          </div>
          <div class="flex gap-1.5 justify-between text-gray-500">
            <div>
              <span>author - 1972/7/11</span>
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
import { ref, onMounted } from "vue";
import { RouterLink } from "vue-router";

const posts = ref([]);

async function getPosts() {
  try {
    // src/blog 폴더에 있는 md 파일들 불러옴(문자열 형태로)
    const modules = import.meta.glob("/src/blog/**/*.md", { query: "raw" });

    // --- 안에 포스트 속성들이 있어서 그걸 직접 변환해야 해서 raw로 불러옴

    const blogPosts = await Promise.all(
      Object.entries(modules).map(async ([filePath, getContent]) => {
        const content = await getContent();
        const pathParts = filePath.split("/");
        const folder = pathParts[pathParts.length - 2];
        const fileName = pathParts[pathParts.length - 1];

        const frontmatterMatch = content.match(/^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/);
        let frontmatter = {};
        let markdownContent = content;

        if (frontmatterMatch) {
          const frontmatterText = frontmatterMatch[1];
          frontmatter = frontmatterText.split("\n").reduce((acc, line) => {
            const [key, ...values] = line.split(":").map((s) => s.trim());
            if (key && values.length) {
              acc[key] = values.join(":").replace(/^["']|["']$/g, "");
            }
            return acc;
          }, {});
          markdownContent = frontmatterMatch[2];
        }

        return {
          folder,
          fileName,
          frontmatter,
          content: markdownContent,
        };
      })
    );

    posts.value = blogPosts;
  } catch (error) {
    console.error("Error reading blog files:", error);
  }
}

onMounted(getPosts);

/*
  src 폴더에 있는 blog 폴더에 있는 폴더(포스트)들을 읽음
  폴더들에서 md 파일들을 불러옴
*/
</script>

<style scoped>
.sortMenu {
  position: absolute;

  top: 1.5rem;
  left: 45rem;

  padding: 0.5rem;

  color: #727272;
  font-weight: 700;
  font-size: 0.875rem;

  background-color: #b3b3b3;
  border-radius: 0.5rem;

  white-space: nowrap;
  /* 줄바꿈 끄기 */

  transition: ease-out 0.25s;
}

.sortMenu:hover {
  background-color: #858585;
}

.postContainer {
  background-color: #c8c8c8;

  display: flex;

  width: 40rem;
  height: 10rem;

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

  width: 8.5rem;
  flex-shrink: 0;
}

.tagBlock {
  border-width: 1px;

  padding-inline: 0.25rem;

  border-radius: 0.5rem;
}

.tagBlock::before {
  content: "# ";
}
</style>
