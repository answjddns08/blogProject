import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";

// 현재 파일의 디렉토리 경로를 가져옴
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// posts 디렉토리의 절대 경로
const POSTS_DIR = path.join(__dirname, "..", "posts");

/**
 * get posts from post directory
 * @param {import("express").Request} req - request
 * @param {import("express").Response} res - response
 * @returns {Promise<void>} posts from post directory
 */
async function getPosts(req, res) {
	try {
		const folders = await fs.readdir(POSTS_DIR);

		const search = req.query.search ? req.query.search : null;

		console.log("the query is " + search);

		/*
            post 디렉토리에 있는 폴더(포스트)들을 읽어옴
            각 포스트에 있는 index.md 파일을 읽어옴
            그중 ---사이 부분 (front matter)을 파싱하여
            id, title, date,tag를 추출하여 json으로 만들어 res.json으로 반환
            tag는 front matter에 없을 수 있으므로 없으면 빈 배열로 만들어 반환
            있으면 배열 형태로 반환
            그리고 그 밑에 있는 것들은 content로 만들어서 반환
        */

		/*
			커버 이미지랑 content에서 인용된 사진들을 따로 보내야 함
			cover: cover.img
			images: []
		*/

		if (folders.length == 0) {
			res.status(404).json({ message: "No posts found" });
			return;
		}

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
					tag: frontMatter.tag ? frontMatter.tag.split(",") : [],
					content: content.split("---").slice(2).join("---"),
					coverImg: frontMatter.coverImg || null,
				};
			})
		);

		res.json(posts);
	} catch (error) {
		res.status(500).json({ message: `parsing error: ${error.message}` });
		console.log(error);
	}
}

/**
 * Get specific post by folder
 * @param {import("express").Request} req - request
 * @param {import("express").Response} res - response
 */
async function getPost(req, res) {
	try {
		const postFolder = req.params.folder;

		const postPath = path.join(POSTS_DIR, postFolder);

		const folder = await fs.readdir(postPath);

		if (folder.length == 0) {
			res.status(404).json({ message: "No post found" });
			return;
		}

		const indexPath = path.join(postPath, "index.md");
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

		const post = {
			folder: postFolder,
			title: frontMatter.title,
			date: frontMatter.date,
			tag: frontMatter.tag ? frontMatter.tag.split(",") : [],
			content: content.split("---").slice(2).join("---"),
			coverImg: frontMatter.coverImg || null,
		};

		res.json(post);
	} catch (error) {
		res.status(500).json({ message: `parsing error: ${error.message}` });
		console.log(error);
	}
}

export { getPosts, getPost };
