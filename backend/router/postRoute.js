import { Router } from "express";
import { getPosts, getPost } from "../controller/postController.js";

const router = Router();

router.get("/", getPosts);
router.get("/:id", getPost);

export default router;
