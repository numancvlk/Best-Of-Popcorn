import { Request, Response, NextFunction } from "express";

const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

const asyncHandler =
  (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };

export const validateEmail = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;

    if (!email || !emailRegex.test(email)) {
      return res
        .status(400)
        .json({ message: "Geçerli bir E-Posta adresi giriniz!" });
    }
    next();
  }
);

export const validateUsername = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { username } = req.body;

    if (!username) {
      return res
        .status(400)
        .json({ message: "Kullanıcı adı alanı boş geçilemez!" });
    }
    if (username.length < 3) {
      return res
        .status(400)
        .json({ message: "Kullanıcı adı en az 3 karakter içermelidir!" });
    }
    next();
  }
);

export const validatePassword = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({ message: "Parola alanı boş geçilemez!" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Parola en az 6 karakter içermelidir!" });
    }
    next();
  }
);

export const validateRegisterFields = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "Tüm alanları doldurunuz!" });
    }
    next();
  }
);

export const validateLoginFields = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Tüm alanları doldurunuz!" });
    }
    next();
  }
);
