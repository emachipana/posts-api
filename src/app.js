import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import postsRoutes from "./routes/posts.routes.js";
import commentsRoutes from "./routes/comments.routes.js";
import likesRoutes from "./routes/likes.routes.js";
import usersRoutes from "./routes/users.routes.js";
import healthRoute from "./routes/health.routes.js";

const App = express();

App.set("json spaces", 4);

App.use(cors());
App.use(express.json());
App.use(express.urlencoded({ extended: false }));

// routes
App.use("/api/v1/auth", authRoutes);
App.use("/api/v1/posts", postsRoutes);
App.use("/api/v1/comments", commentsRoutes);
App.use("/api/v1/likes", likesRoutes);
App.use("/api/v1/users", usersRoutes);
App.use("/api/v1/health", healthRoute);

export default App;
