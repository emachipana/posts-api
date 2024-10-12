import { config } from "dotenv";

config();

export const MONGODB = process.env.MONGO_DB_URI;
export const PORT = process.env.PORT || 8085;
