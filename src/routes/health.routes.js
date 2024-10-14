import { Router } from "express";
import { isLive } from "../controllers/health.js";

const router = Router();

router.get("/", isLive);

export default router;

