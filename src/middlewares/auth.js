import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config.js";
import User from "../models/User.js";

export const checkToken = async (req, res, next) => {
  const token = req.headers.Authorization;
  if(!token) return res.status(401).json({ message: "Debes iniciar sesión primero" });

  try {
    const decodeToken = jwt.verify(token.slice(7), JWT_SECRET); // "Bearer ";
    const { id } = decodeToken;

    const user = await User.findById(id);
    if(!user) return res.status(401).json({ message: "El token es inválido" });
    req.user = user;

    next();
  }catch(error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
}
