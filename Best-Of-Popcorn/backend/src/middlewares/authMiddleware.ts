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
        role: "adminRole" | "actorRole" | "movieRole";
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
          res.status(401).json({ message: "Kullanıcı bulunamadı" });
          return;
        }

        req.user = {
          id: user._id as mongoose.Types.ObjectId,
          role: user.role as "adminRole" | "actorRole" | "movieRole",
        };

        next();
      } catch (error: any) {
        console.error(error);
        res.status(401).json({ message: "Yetkisiz erişim!" });
        return;
      }
    }

    if (!token) {
      res.status(401).json({ message: "Yetkisiz erişim!" });
    }
  }
);

export const authorizeRoles = (
  roles: Array<"adminRole" | "actorRole" | "movieRole">
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      res.status(401).json({ message: "Kullanıcı bilgisi bulunamadı" });
      return;
    }

    if (req.user.role === "adminRole") {
      return next();
    }

    if (!roles.includes(req.user.role)) {
      res.status(403).json({ message: "Rolünüz bu işlem için yetkili değil" });
    }
    next();
  };
};
