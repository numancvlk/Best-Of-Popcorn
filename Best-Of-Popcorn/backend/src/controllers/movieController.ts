import { Request, Response } from "express";
import axios from "axios";
import "dotenv";
import expressAsyncHandler from "express-async-handler";

//----------SCRIPTS---------------
import Review from "../models/Review";
import User from "../models/User";

const api = process.env.TMDB_API_KEY;

const getPopularMovies = expressAsyncHandler(
  async (req: Request, res: Response) => {
    if (!api) {
      res.status(500);
      throw new Error("TMDB Anahtarı Bulunamadı");
    }
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${api}`
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
      res.status(401);
      throw new Error("Yorum Eklemek İçin Lütfen Giriş Yapınız");
    }

    if (isNaN(movieId) || movieId <= 0) {
      res.status(400);
      throw new Error("Geçersiz Film");
    }

    if (!rating || rating < 1 || rating > 10) {
      res.status(400);
      throw new Error("1 - 10 arasında seçiminizi yapınız.");
    }

    if (!comment || comment.trim() === "") {
      res.status(400);
      throw new Error("Yorum alanı boş bırakılamaz.");
    }

    const existingReview = await Review.findOne({
      movieId,
      userId: req.user.id,
    });
    if (existingReview) {
      res.status(400);
      throw new Error(
        "Bu filme zaten bir yorum eklediniz. Mevcut yorumunuzu güncelleyebilirsiniz."
      );
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
      res.status(400);
      throw new Error("Geçersiz Film ID'si");
    }

    try {
      const movieDetailResponse = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=${api}`
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
        res.status(404);
        throw new Error("Film bulunamadı.");
      }
      res.status(error.response?.status || 500);
      throw new Error(
        error.response?.data?.status_message ||
          "Film detayları veya yorumlar çekilirken bir hata oluştu."
      );
    }
  }
);

export { getPopularMovies, addReviewToMovie, getMovieDetailAndReviews };
