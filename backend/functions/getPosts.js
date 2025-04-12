import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";

// 현재 파일의 디렉토리 경로를 가져옴
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// posts 디렉토리의 절대 경로
const POSTS_DIR = path.join(__dirname, "..", "posts");

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
 * @returns {Promise<Post>} posts from post directory
 */
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

				const frontMatter = content
					.split("---")[1]
					.split("\n")
					.filter((line) => line)
					.reduce((acc, line) => {
						const [key, value] = line.split(":").map((x) => x.trim());
						acc[key] = value;
						return acc;
					}, {});

				return {
					folder: folder,
					title: frontMatter.title,
					date: frontMatter.date,
					tag: frontMatter.tag.split(",").map((tag) => tag.trim()),
					content: content.split("---").slice(2).join("---"),
					coverImg: frontMatter.coverImg || null,
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
