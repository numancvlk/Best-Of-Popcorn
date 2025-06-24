import express from "express";

//------------SCRIPTS------------
import { getPopularActors } from "../controllers/actorController";
import { protect, authorizeRoles } from "../middlewares/authMiddleware";

const router = express.Router();

router.get("/popular", protect, authorizeRoles(["user2"]), getPopularActors);

export default router;
