import bringPosts from "../functions/getPosts.js";
import cache from "../utils/cache.js";

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

/*
	검색어가 있을 경우(search 값이 있을 경우)
	제목에서 검색어가 포함된 포스트를 찾음
	그리고 #tag로 되어 있을 경우 특정 태그를 찾을 수 있도록 해야 함
	쉼표(,)로 각 검색할 내용을 분리함
	각각의 검색어가 들어있는 것들을 찾음(태그 검색도 포함)
	검색어가 없으면 포스트를 가져오지 않음
*/

/**
 * get posts from post directory
 * @param {import("express").Request} req - request
 * @param {import("express").Response} res - response
 * @returns {Promise<Array<import("../functions/getPosts.js").Post>>} posts from post directory
 */
async function getPosts(req, res) {
	try {
		const search = req.query.search ? req.query.search : null;
		const cacheKey = search ? `posts_search_${search}` : 'posts_all';

		// 캐시에서 먼저 확인
		const cachedPosts = cache.get(cacheKey);
		if (cachedPosts) {
			console.log(`Cache hit for: ${cacheKey}`);
			res.json(cachedPosts);
			return;
		}

		console.log(`Cache miss for: ${cacheKey}, fetching from disk...`);

		// 여러 개의 포스트를 불러올 때는 content 제외
		const posts = await bringPosts(null, true);

		let result = posts;

		if (search) {
			const searchTerms = search.split(",").map((term) => term.trim());
			const filteredPosts = posts.filter((post) => {
				let titleMatch = false;
				let tagMatch = false;

				searchTerms.forEach((term) => {
					if (term.startsWith("#")) {
						// 태그 검색
						//console.log("tag search: " + term);
						const cleanTerm = term.slice(1).toLowerCase(); // '#' 제거
						if (post.tag.some((tag) => tag.toLowerCase().includes(cleanTerm))) {
							tagMatch = true;
						}
					} else {
						// 제목 검색
						//console.log("normal search: " + term);
						if (post.title.toLowerCase().includes(term.toLowerCase())) {
							titleMatch = true;
						}
					}
				});

				// 태그 또는 제목 중 하나라도 매칭되면 포함
				return titleMatch || tagMatch;
			});

			result = filteredPosts;
		}

		// 결과를 캐시에 저장
		cache.set(cacheKey, result);

		res.json(result);
	} catch (error) {
		res.status(500).json({ message: `parsing error: ${error.message}` });
		console.log(error);
	}
}

/**
 * Get specific post by folder
 * @param {import("express").Request} req - request
 * @param {import("express").Response} res - response
 *
 * @returns {Promise<import("../functions/getPosts.js").Post>} posts from post directory
 */
async function getPost(req, res) {
	try {
		const postFolder = req.params.folder;
		const cacheKey = `post_${postFolder}`;

		// 캐시에서 먼저 확인
		const cachedPost = cache.get(cacheKey);
		if (cachedPost) {
			console.log(`Cache hit for post: ${postFolder}`);
			res.json(cachedPost);
			return;
		}

		console.log(`Cache miss for post: ${postFolder}, fetching from disk...`);

		const post = await bringPosts(postFolder);

		if (!post || post.length === 0) {
			res.status(404).json({ message: "Post not found" });
			return;
		}

		// 결과를 캐시에 저장
		cache.set(cacheKey, post[0]);

		res.json(post[0]);
	} catch (error) {
		res.status(500).json({ message: `parsing error: ${error.message}` });
		console.log(error);
	}
}

export { getPosts, getPost };
