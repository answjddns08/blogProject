import { Router } from "express";
import { getPosts, getPost } from "../controller/postController.js";
import { fileURLToPath } from "url";
import path from "path";
import express from "express";

const router = Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const POSTS_DIR = path.join(__dirname, "..", "posts");

// 정적 파일 제공을 위한 미들웨어(ex: 이미지 파일)
router.use("/images", express.static(POSTS_DIR));

router.get("/", getPosts);
router.get("/:folder", getPost);

export default router;
