import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import bringPosts from "../functions/getPosts.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const POSTS_DIR = path.join(__dirname, "..", "posts");

/*
    디렉토리에서 포스트들을 가져오고
    그 포스트들의 태그들만 가져옴
*/

async function getTags(req, res) {
	const posts = await bringPosts();
	const tags = new Set(); // Set(집합)을 사용하여 중복된 태그 제거

	posts.forEach((post) => {
		post.tag.forEach((tag) => {
			tags.add(tag);
		});
	});

	const tagsArray = Array.from(tags);

	res.json(tagsArray);
}

export { getTags };
