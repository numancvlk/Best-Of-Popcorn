import express from "express";

//----------SCRIPTS-------------
import {
  getPopularMovies,
  addReviewToMovie,
  getMovieDetailAndReviews,
} from "../controllers/movieController";
import { protect, authorizeRoles } from "../middlewares/authMiddleware";

const router = express.Router();

router.get(
  "/popular",
  protect,
  authorizeRoles(["adminRole", "movieRole"]),
  getPopularMovies
);

router.get(
  "/:id",
  protect,
  authorizeRoles(["adminRole", "movieRole"]),
  getMovieDetailAndReviews
);

router.post(
  "/:id/reviews",
  protect,
  authorizeRoles(["adminRole", "movieRole"]),
  addReviewToMovie
);

export default router;
