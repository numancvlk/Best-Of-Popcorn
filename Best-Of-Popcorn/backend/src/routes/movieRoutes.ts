import express from "express";

//----------SCRIPTS-------------
import {
  addReviewToMovie,
  getMovieDetailAndReviews,
  getPopularMovies,
} from "../controllers/movieController";
import { protect, authorizeRoles } from "../middlewares/authMiddleware";

const router = express.Router();

router.get(
  "/popular",
  protect,
  authorizeRoles(["adminRole", "movieRole", "basicUserRole"]),
  getPopularMovies
);

router.get(
  "/:id",
  protect,
  authorizeRoles(["adminRole", "movieRole", "basicUserRole"]),
  getMovieDetailAndReviews
);

router.post(
  "/:id/reviews",
  protect,
  authorizeRoles(["adminRole", "movieRole", "basicUserRole"]),
  addReviewToMovie
);

export default router;
