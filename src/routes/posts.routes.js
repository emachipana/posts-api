import { Router } from "express";
import { checkToken } from "../middlewares/auth.js";
import { create, destroy, getAll, getAllByLoggedUser } from "../controllers/posts.js";

const router = Router();

router.get("/", getAll);

router.get("/myPosts", [checkToken], getAllByLoggedUser);

router.post("/", [checkToken], create);

router.delete("/:id", [checkToken], destroy);

export default router;
