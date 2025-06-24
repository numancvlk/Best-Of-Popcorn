import { Request, Response } from "express";
import axios from "axios";
import "dotenv";
import expressAsyncHandler from "express-async-handler";

const api = process.env.TMDB_API_KEY;

const getPopularActors = expressAsyncHandler(
  async (req: Request, res: Response) => {
    if (!api) {
      res.status(500);
      throw new Error("TMDB Anahtarı Bulunamadı");
    }
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/person/popular?api_key=${api}`
      );
      res.status(200).json(response.data);
    } catch (error) {
      console.log("TMDB API HATASI");
    }
  }
);

export { getPopularActors };
