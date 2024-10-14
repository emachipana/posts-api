import { Router } from "express";
import { checkToken } from "../middlewares/auth.js";
import { create, destroy, isPostLiked } from "../controllers/likes.js";

const router = Router();

router.get("/isPostLiked/:postId", [checkToken], isPostLiked);

router.post("/", [checkToken], create);

router.delete("/:id", [checkToken], destroy);

export default router;
