import mongoose from "mongoose";
import { MONGODB } from "../config.js";

try {
  const db = await mongoose.connect(MONGODB);

  console.log(`Database is connected to: ${db.connection.name}`)
}catch(error) {
  console.error(error.message);
}
