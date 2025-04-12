import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";

// 현재 파일의 디렉토리 경로를 가져옴
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// posts 디렉토리의 절대 경로
const POSTS_DIR = path.join(__dirname, "..", "posts");

async function getPosts() {
	try {
		// posts 디렉토리에 있는 폴더(포스트)들을 읽어옴
		const folders = await fs.readdir(POSTS_DIR);

		if (folders.length === 0) {
			return [];
		}

		// posts 디렉토리에 있는 포스트들을 불러옴
		const posts = await Promise.all(
			folders.map(async (folder) => {
				const indexPath = path.join(POSTS_DIR, folder, "index.md");
				const content = await fs.readFile(indexPath, "utf-8");

				const frontMatter = content.split("---")[1].trim();
				const [id, title, date, tag] = frontMatter
					.split("\n")
					.map((line) => line.split(": ")[1]);

				return {
					id,
					title,
					date,
					tag: tag ? tag.split(", ") : [],
					content: content.split("---")[2].trim(),
				};
			})
		);

		return posts;
	} catch (error) {
		console.error("Error reading posts:", error);
		throw new Error("Failed to read posts");
	}
}

export default getPosts;
