import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
//----------SCRIPTS---------
import User from "../models/User";

const getAllUsers = expressAsyncHandler(async (req: Request, res: Response) => {
  const users = await User.find({}).select("-password");

  res.status(200).json({
    message: "Kullanıcılar başarıyla listelendi.",
    users: users,
  });
});

const updateUserRole = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.params.id;
    const { role } = req.body;
    const validRoles: Array<"adminRole" | "actorRole" | "movieRole"> = [
      "adminRole",
      "actorRole",
      "movieRole",
    ];

    if (!role || !validRoles.includes(role)) {
      res.status(400).json({ message: "Geçersiz Rol!" });
      return;
    }

    if (
      req.user &&
      req.user.id.toString() === userId &&
      role !== req.user.role
    ) {
      res.status(403).json({ message: "Kendi rolünüzü değiştiremezsiniz" });
      return;
    }

    const user = await User.findById(userId);

    if (!user) {
      res.status(404).json({ message: "Kullanıcı Bulunamadı" });
      return;
    }

    user.role = role;
    await user.save();

    res.status(200).json({
      message: "Kullanıcının rolü başarıyla güncellendi.",
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  }
);

export { getAllUsers, updateUserRole };
