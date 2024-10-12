import express from "express";
import cors from "cors";

const App = express();

App.set("json spaces", 4);

App.use(cors());
App.use(express.json());
App.use(express.urlencoded({ extended: false }));

export default App;
