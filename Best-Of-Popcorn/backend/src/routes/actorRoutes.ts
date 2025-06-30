import express from "express";

//------------SCRIPTS------------
import {
  getPopularActors,
  getActorDetails,
} from "../controllers/actorController";
import { protect, authorizeRoles } from "../middlewares/authMiddleware";

const router = express.Router();

router.get(
  "/popular",
  protect,
  authorizeRoles(["actorRole"]),
  getPopularActors
);

router.get("/:id", protect, authorizeRoles(["actorRole"]), getActorDetails);

export default router;
