import express from "express";

//------------SCRIPTS------------
import {
  getPopularActors,
  getActorDetails,
  searchActor,
} from "../controllers/actorController";
import { protect, authorizeRoles } from "../middlewares/authMiddleware";

const router = express.Router();

router.get("/search", protect, searchActor);

router.get(
  "/popular",
  protect,
  authorizeRoles(["actorRole", "basicUserRole"]),
  getPopularActors
);

router.get(
  "/:id",
  protect,
  authorizeRoles(["actorRole", "basicUserRole"]),
  getActorDetails
);

export default router;
