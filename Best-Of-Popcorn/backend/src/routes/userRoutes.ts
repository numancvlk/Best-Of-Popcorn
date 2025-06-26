import express from "express";
//-----------SCRIPTS-------------
import { getAllUsers, updateUserRole } from "../controllers/userController";
import { protect, authorizeRoles } from "../middlewares/authMiddleware";

const router = express.Router();

router.get("/", protect, authorizeRoles(["adminRole"]), getAllUsers);

router.put("/:id/role", protect, authorizeRoles(["adminRole"]), updateUserRole);

export default router;
