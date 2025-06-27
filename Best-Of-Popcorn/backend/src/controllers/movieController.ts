import { Request, Response } from "express";
import axios from "axios";
import "dotenv";
import expressAsyncHandler from "express-async-handler";

//----------SCRIPTS---------------
import Review from "../models/Review";
import User from "../models/User";

const TMDB_API = process.env.TMDB_API_KEY;
const TMDB_BASE = process.env.TMDB_BASE_URL;

const getPopularMovies = expressAsyncHandler(
  async (req: Request, res: Response) => {
    if (!TMDB_API || !TMDB_BASE) {
      res.status(500).json({ message: "TMDB API veya TMDB BASE URL eksik" });
      return;
    }
    try {
      const response = await axios.get(
        `${TMDB_BASE}/movie/popular?api_key=${TMDB_API}&language=tr-TR&page=${
          req.query.page || 1
        }`
      );
      res.status(200).json(response.data); //API'DEN GELEN VERİYİ DÖNDÜRÜR
    } catch (error) {
      console.log("TMDB API HATASI");
    }
  }
);

const addReviewToMovie = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const movieId = parseInt(req.params.id);
    const { rating, comment } = req.body;

    if (!req.user || !req.user.id) {
      res
        .status(401)
        .json({ message: "Yorum yapmak için lütfen giriş yapınız." });
      return;
    }

    if (isNaN(movieId) || movieId <= 0) {
      res.status(400).json({ message: "Geçersiz Film" });
      return;
    }

    if (!rating || rating < 1 || rating > 10) {
      res
        .status(400)
        .json({ message: "1 ile 10 arasında bir puanlama yapınız" });
      return;
    }

    if (!comment || comment.trim() === "") {
      res.status(400).json({ message: "Yorum alanı boş bırakılamaz" });
      return;
    }

    const existingReview = await Review.findOne({
      movieId,
      userId: req.user.id,
    });
    if (existingReview) {
      res.status(400).json({
        message:
          "Bu filme zaten yorum eklediniz, mevcut yorumunuzu güncelleyebilirsiniz.",
      });
      return;
    }

    const newReview = await Review.create({
      movieId: movieId,
      userId: req.user.id,
      rating: rating,
      comment: comment.trim(),
    });

    res.status(201).json({
      message: "Yorum ve Puan Eklendi",
      review: newReview,
    });
  }
);

const getMovieDetailAndReviews = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const movieId = parseInt(req.params.id);

    if (isNaN(movieId) || movieId <= 0) {
      res.status(400).json({ message: "Film ID geçersiz." });
      return;
    }

    try {
      const movieDetailResponse = await axios.get(
        `${TMDB_BASE}/movie/${movieId}`,
        {
          params: {
            api_key: TMDB_API,
            language: "tr-TR",
          },
        }
      );

      const movieDetails = movieDetailResponse.data;

      const reviews = await Review.find({ movieId: movieId }).populate({
        path: "userId",
        select: "username",
        model: User,
      });

      res.status(200).json({
        ...movieDetails,
        reviews: reviews,
      });
    } catch (error: any) {
      if (error.response && error.response.status === 404) {
        res.status(404).json({ message: "Film Bulunamadı" });
        return;
      }
      res.status(error.response?.status || 500);
    }
  }
);

export { addReviewToMovie, getMovieDetailAndReviews };
