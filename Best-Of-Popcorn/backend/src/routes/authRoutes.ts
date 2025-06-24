import express from "express";
import { registerUser, loginUser } from "../controllers/authController";
import {
  validateRegisterFields,
  validateEmail,
  validatePassword,
  validateUsername,
  validateLoginFields,
} from "../middlewares/validationMiddleware";

const router = express.Router();

router.post(
  "/register",
  validateRegisterFields,
  validateEmail,
  validateUsername,
  validatePassword,
  registerUser
);

router.post("/login", validateLoginFields, validateEmail, loginUser);

export default router;
