import { Request, Response } from "express";
import axios from "axios";
import "dotenv";
import expressAsyncHandler from "express-async-handler";

const TMDB_API = process.env.TMDB_API_KEY;
const TMDB_BASE = process.env.TMDB_BASE_URL;

const searchActor = expressAsyncHandler(async (req: Request, res: Response) => {
  const { query, page } = req.query;

  if (!query) {
    res.status(400).json({ message: "Arama sorgusu boş olamaz" });
    return;
  }
  try {
    const response = await axios.get(`${TMDB_BASE}/search/person`, {
      params: {
        api_key: TMDB_API,
        language: "tr-TR",
        query: query,
        page: page || 1,
      },
    });

    res.status(200).json(response.data.results);
  } catch (error: any) {
    res.status(500).json({
      message: "Aktör arama sırasında bir hata oluştu.",
    });
  }
});

const getPopularActors = expressAsyncHandler(
  async (req: Request, res: Response) => {
    if (!TMDB_API || !TMDB_BASE) {
      res
        .status(500)
        .json({ message: "TMDB API veya TMDB BASE URL BULUNAMADI" });
      return;
    }
    try {
      const page = req.query.page || 1;
      const response = await axios.get(
        `${TMDB_BASE}/person/popular?api_key=${TMDB_API}&language=tr-TR&page=${page}`
      );
      res.status(200).json(response.data.results);
    } catch (error) {
      res.status(500).json({ message: "Aktör listesi getirilemedi." });
      return;
    }
  }
);

const getActorDetails = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const actorId = parseInt(req.params.id);

    if (isNaN(actorId) || actorId <= 0) {
      res.status(400).json({ message: "Geçersiz Aktör ID." });
      return;
    }

    if (!TMDB_API || !TMDB_BASE) {
      res
        .status(500)
        .json({ message: "Sunucu hatası: TMDB yapılandırması eksik." });
      return;
    }

    try {
      const actorDetailResponse = await axios.get(
        `${TMDB_BASE}/person/${actorId}?api_key=${TMDB_API}&language=tr-TR`
      );
      const actorDetails = actorDetailResponse.data;

      const movieCreditsResponse = await axios.get(
        `${TMDB_BASE}/person/${actorId}/movie_credits?api_key=${TMDB_API}&language=tr-TR`
      );
      const movieCredits = movieCreditsResponse.data.cast;

      res.status(200).json({
        ...actorDetails,
        movie_credits: movieCredits,
      });
      return;
    } catch (error: any) {
      res.status(500).json({
        message:
          "Aktör detayı getirilemedi. Lütfen sunucu loglarını kontrol edin.",
      });
      return;
    }
  }
);
export { getPopularActors, getActorDetails, searchActor };
