import { Request, Response } from "express";
import User from "../models/User";
import jwt from "jsonwebtoken";
import expressAsyncHandler from "express-async-handler";
import mongoose from "mongoose";

const jwtSecret = process.env.JWT_SECRET!;

const generateToken = (id: string, role: string): string => {
  return jwt.sign({ id, role }, jwtSecret, {
    expiresIn: "1h",
  });
};

const registerUser = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const { username, email, password } = req.body;

    //KULLANICI VAR MI YOK MU?
    const userExist = await User.findOne({ $or: [{ email }, { username }] });

    if (userExist) {
      res.status(400).json({ message: "Bu kullanıcı zaten mevcut." });
      return;
    }

    //YENİ KULLANICIYI BURDA OLUSTURDUM
    const user = await User.create({
      username,
      email,
      password,
    });

    if (user) {
      const userId = (user._id as mongoose.Types.ObjectId).toString();
      const userRole = user.role;
      res.status(201).json({
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        token: generateToken(userId, userRole),
      });
    } else {
      res.status(400).json({ message: "Geçersiz Kullanıcı" });
      return;
    }
  }
);

const loginUser = expressAsyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.matchPassword(password))) {
    res.status(401).json({ message: "E-Posta veya Şifre yanlış" });
    return;
  }

  const userId = (user._id as mongoose.Types.ObjectId).toString();
  const userRole = user.role;

  res.json({
    _id: userId,
    username: user.username,
    email: user.email,
    role: userRole,
    token: generateToken(userId, userRole),
  });
});

export { registerUser, loginUser };
