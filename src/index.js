import App from "./app.js";
import { PORT } from "./config.js";
import "./db/index.js";

App.listen(PORT);
console.log(`Server is running on port: ${PORT}`);
