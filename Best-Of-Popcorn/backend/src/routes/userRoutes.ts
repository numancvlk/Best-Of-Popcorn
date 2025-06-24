import express from "express";
//-----------SCRIPTS-------------
import { getAllUsers, updateUserRole } from "../controllers/userController";
import { protect, authorizeRoles } from "../middlewares/authMiddleware";

const router = express.Router();

router.get("/", protect, authorizeRoles(["user1"]), getAllUsers);

router.put("/:id/role", protect, authorizeRoles(["user1"]), updateUserRole);

export default router;
