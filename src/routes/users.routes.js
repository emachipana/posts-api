import { Router } from "express";
import { checkToken } from "../middlewares/auth.js";
import { profile } from "../controllers/users.js";

const router = Router();

router.get("/profile", [checkToken], profile);

export default router;
