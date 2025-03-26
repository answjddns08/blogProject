<template>
  <div class="flex justify-center">
    <div class="flex flex-col">
      <div class="flex relative mb-10">
        <!-- <div class="sortMenu">sort by...</div> -->
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
          <span class="text-2xl font-bold">{{ post.frontmatter.title }}</span>
          <span class="flex text-gray-700">
            {{ post.content.slice(0, 100) }}
          </span>
          <div class="flex gap-3 w-full">
            <div class="tagBlock" v-for="tag in post.frontmatter.tag" :key="tag">
              {{ tag }}
            </div>
          </div>
          <div class="flex gap-1.5 justify-between text-gray-500">
            <div>
              <span>redeyes - {{ post.frontmatter.date }}</span>
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
    // import.meta.glob을 사용하여 src/posts 폴더에 있는 모든 md 파일을 가져옴
    const modules = import.meta.glob("/src/posts/**/*.md", {
      query: "?raw",
      import: "default",
    });

    /*example
    const modules = {
      "/src/posts/post1.md": () => Promise.resolve("post1 content"),
      "/src/posts/post2.md": () => Promise.resolve("post2 content"),
      };
    */

    const blogPosts = await Promise.all(
      // Object.entries로 파일 경로와 내용을 가져와서 각각 처리

      Object.entries(modules).map(async ([filePath, getContent]) => {
        // 파일 내용을 문자열로 가져옴
        const content = await getContent();

        // 파일 경로에서 폴더명과 파일명 추출
        const pathParts = filePath.split("/");
        const folder = pathParts[pathParts.length - 2];
        const fileName = pathParts[pathParts.length - 1];

        // 정규식을 사용하여 frontmatter(--- 사이의 내용)와 마크다운 본문 분리
        const frontmatterMatch = content.match(/^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/);
        let frontmatter = {};
        let markdownContent = content;

        // frontmatter가 존재하는 경우 처리
        if (frontmatterMatch) {
          // frontmatter 텍스트 추출
          const frontmatterText = frontmatterMatch[1];

          // frontmatter를 객체로 변환
          // 각 줄을 key: value 형태로 파싱
          frontmatter = frontmatterText.split("\n").reduce((acc, line) => {
            const [key, ...values] = line.split(":").map((s) => s.trim());
            if (key && values.length) {
              const value = values.join(":").replace(/^["']|["']$/g, "");
              // 쉼표가 있는 값은 배열로 변환 (예: tag: "test, test1" -> ["test", "test1"])
              acc[key] = value.includes(",") ? value.split(",").map((v) => v.trim()) : value;
            }
            return acc;
          }, {});

          // 마크다운 본문 추출
          markdownContent = frontmatterMatch[2];
        }

        // 처리된 데이터를 객체로 반환
        return {
          folder,
          fileName,
          frontmatter,
          content: markdownContent,
        };
      })
    );

    // 결과를 posts ref에 저장
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
