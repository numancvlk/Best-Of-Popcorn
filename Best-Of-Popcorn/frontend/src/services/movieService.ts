import axios from "axios";
import * as SecureStore from "expo-secure-store";
import Constants from "expo-constants";

const API_URL = Constants.expoConfig?.extra?.API_URL;
const TMDB_POSTER = Constants.expoConfig?.extra?.TMDB_POSTER;
const TMDB_BACKDROP = Constants.expoConfig?.extra?.TMDB_BACKDROP;

if (!API_URL) {
  console.log("API_URL YOK");
}
const movieService = {
  getPopularMovies: async () => {
    try {
      const userToken = await SecureStore.getItemAsync("userToken");

      const response = await axios.get(`${API_URL}/movies/popular`, {
        headers: {
          ...(userToken && { Authorization: `Bearer ${userToken}` }),
        },
        params: {
          page: 1,
        },
      });
      return response.data.map((movie: any) => ({
        id: movie.id,
        title: movie.title,
        release_date: movie.release_date,
        overview: movie.overview,
        poster_path: movie.poster_path
          ? `${TMDB_POSTER}${movie.poster_path}`
          : null,
        vote_average: movie.vote_average,
      }));
    } catch (error: any) {
      console.log("Poster Hata");
    }
  },

  getMovieDetailFromTMDB: async (movieId: number) => {
    try {
      const userToken = await SecureStore.getItemAsync("userToken");

      const response = await axios.get(`${API_URL}/movies/${movieId}`, {
        headers: {
          ...(userToken && { Authorization: `Bearer ${userToken}` }),
        },
      });
      const movie = response.data;
      return {
        id: movie.id,
        title: movie.title,
        overview: movie.overview,
        release_date: movie.release_date,
        poster_path: movie.poster_path
          ? `${TMDB_POSTER}${movie.poster_path}`
          : null,
        backdrop_path: movie.backdrop_path
          ? `${TMDB_BACKDROP}${movie.backdrop_path}`
          : null,
        vote_average: movie.vote_average,
        genres: movie.genres?.map((genre: any) => genre.name).join(", ") || "",
        runtime: movie.runtime,
        tagline: movie.tagline,
        reviews: movie.reviews || [],
      };
    } catch (error: any) {
      console.log("Film Çekilemedi");
    }
  },
};

export default movieService;
