import express from "express";

//----------SCRIPTS-------------
import { getPopularMovies } from "../controllers/movieController";
import { protect, authorizeRoles } from "../middlewares/authMiddleware";

const router = express.Router();

router.get("/popular", protect, authorizeRoles(["user3"]), getPopularMovies);

export default router;
