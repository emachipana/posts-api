import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import postsRoutes from "./routes/posts.routes.js";

const App = express();

App.set("json spaces", 4);

App.use(cors());
App.use(express.json());
App.use(express.urlencoded({ extended: false }));

// routes
App.use("/api/v1/auth", authRoutes);
App.use("/api/v1/posts", postsRoutes);

export default App;
