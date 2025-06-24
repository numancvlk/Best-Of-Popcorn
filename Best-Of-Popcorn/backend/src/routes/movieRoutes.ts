import express from "express";

//----------SCRIPTS-------------
import {
  getPopularMovies,
  addReviewToMovie,
  getMovieDetailAndReviews,
} from "../controllers/movieController";
import { protect, authorizeRoles } from "../middlewares/authMiddleware";

const router = express.Router();

router.get("/popular", protect, authorizeRoles(["user3"]), getPopularMovies);

router.get(
  "/:id",
  protect,
  authorizeRoles(["user1", "user3"]),
  getMovieDetailAndReviews
);

router.post(
  "/:id/reviews",
  protect,
  authorizeRoles(["user1", "user3"]),
  addReviewToMovie
);

export default router;
