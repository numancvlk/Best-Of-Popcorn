import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";
import expressAsyncHandler from "express-async-handler";
import mongoose from "mongoose";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: mongoose.Types.ObjectId;
        role: "user1" | "user2" | "user3";
      };
    }
  }
}

const jwtSecret = process.env.JWT_SECRET!;

export const protect = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      try {
        token = req.headers.authorization.split(" ")[1];

        const decoded: any = jwt.verify(token, jwtSecret);

        const user = await User.findById(decoded.id).select("-password");

        if (!user) {
          res.status(401);
          throw new Error("Kullanıcı bulunamadı, token geçersiz.");
        }

        req.user = {
          id: user._id as mongoose.Types.ObjectId,
          role: user.role,
        };

        next();
      } catch (error: any) {
        console.error(error);
        res.status(401);
        throw new Error("Yetkisiz erişim, token başarısız oldu.");
      }
    }

    if (!token) {
      res.status(401);
      throw new Error("Yetkisiz erişim, token bulunamadı.");
    }
  }
);

export const authorizeRoles = (roles: Array<"user1" | "user2" | "user3">) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      res.status(401);
      throw new Error("Yetkilendirme için kullanıcı bilgisi bulunamadı.");
    }

    if (req.user.role === "user1") {
      return next();
    }

    if (!roles.includes(req.user.role)) {
      res.status(403);
      throw new Error("Rolünüz bu işleme yetkili değil.");
    }
    next();
  };
};
