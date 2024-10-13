import { Router } from "express";
import { login, register } from "../controllers/auth.js";

const router = Router();

router.use((_req, res, next) => {
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, Origin, Content-Type, Accept"
  );

  next();
});

router.post("/login", login);

router.post("/register", register);

export default router;
