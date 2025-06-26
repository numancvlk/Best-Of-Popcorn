import express from "express";

//------------SCRIPTS------------
import { getPopularActors } from "../controllers/actorController";
import { protect, authorizeRoles } from "../middlewares/authMiddleware";

const router = express.Router();

router.get(
  "/popular",
  protect,
  authorizeRoles(["actorRole"]),
  getPopularActors
);

export default router;
