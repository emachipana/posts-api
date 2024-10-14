import { JWT_SECRET } from "../config.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if(!user) return res.status(401).json({ message: "Credenciales incorrectas" });

    const isPasswordCorrect = await User.comparePassword(password, user.password);
    if(!isPasswordCorrect) return res.status(401).json({ message: "Credenciales incorrectas" });

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "7d" });

    res.status(200).json({ ...user.toJSON(), token });
  }catch(error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
}

export const register = async (req, res) => {
  const { username, name, password } = req.body;

  try {
    const newUser = new User({ username, name, password });
    const userSaved = await newUser.save();

    const token = jwt.sign({ id: userSaved._id }, JWT_SECRET, { expiresIn: "7d" });

    res.status(200).json({ ...userSaved.toJSON(), token });
  }catch(error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
}
