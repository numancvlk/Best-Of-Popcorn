import express from "express";
import axios from "axios";
import expressAsyncHandler from "express-async-handler";
//----------SCRIPTS-------------
import {
  addReviewToMovie,
  getMovieDetailAndReviews,
} from "../controllers/movieController";
import { protect, authorizeRoles } from "../middlewares/authMiddleware";

const router = express.Router();
const TMDB_API = process.env.TMDB_API_KEY;
const TMDB_BASE = process.env.TMDB_BASE_URL;

router.get(
  "/popular",
  protect,
  authorizeRoles(["adminRole", "movieRole", "basicUserRole"]),
  expressAsyncHandler(async (req, res) => {
    if (!TMDB_API || !TMDB_BASE) {
      res
        .status(500)
        .json({ message: "TMDB API KEY yada TMDB BASE URL eksik" });
      return;
    }
    try {
      const response = await axios.get(`${TMDB_BASE}/movie/popular`, {
        params: {
          api_key: TMDB_API,
          language: "tr-TR",
          page: req.query.page || 1,
        },
      });
      res.json(response.data.results);
    } catch (error) {
      res.status(500).json({ message: "Film listesi getirilemedi" });
    }
  })
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
