import { Router } from "express";
import { create, getAllByPostId } from "../controllers/comments.js";
import { checkToken } from "../middlewares/auth.js";

const router = Router();

router.get("/:postId", getAllByPostId);

router.post("/", [checkToken], create);

export default router;
