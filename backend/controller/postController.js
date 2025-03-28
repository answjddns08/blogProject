import { promises as fs } from "fs";

/**
 * get posts from post directory
 * @param {*} req - request
 * @param {*} res - response
 * @returns posts from post directory
 */
async function getPosts(req, res) {
	try {
		const folders = await fs.readdir("posts");

		if (folders.length > 0) {
			res.json(folders);
		} else {
			res.status(404).json({ message: "No posts found" });
		}
	} catch (error) {
		res.status(500).json({ message: `parsing error: ${error.message}` });
	}
}
/**
 *
 * @param {*} req
 * @param {*} res
 */
async function getPost(req, res) {
	try {
		const folders = await fs.readdir("posts");

		if (folders.length > 0) {
			res.json(folders);
		} else {
			res.status(404).json({ message: "No posts found" });
		}
	} catch (error) {
		res.status(500).json({ message: `parsing error: ${error.message}` });
	}
}

export { getPosts, getPost };
