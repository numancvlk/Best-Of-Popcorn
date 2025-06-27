import { Request, Response } from "express";
import axios from "axios";
import "dotenv";
import expressAsyncHandler from "express-async-handler";

const TMDB_API = process.env.TMDB_API_KEY;
const TMDB_BASE = process.env.TMDB_BASE_URL;

const getPopularActors = expressAsyncHandler(
  async (req: Request, res: Response) => {
    if (!TMDB_API || !TMDB_BASE) {
      res
        .status(500)
        .json({ message: "TMDB API veya TMDB BASE URL BULUNAMADI" });
      return;
    }
    try {
      const response = await axios.get(
        `${TMDB_BASE}/person/popular?api_key=${TMDB_API}`
      );
      res.status(200).json(response.data);
    } catch (error) {
      console.log("TMDB API HATASI");
    }
  }
);

export { getPopularActors };
