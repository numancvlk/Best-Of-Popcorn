import axios from "axios";
import * as SecureStore from "expo-secure-store";
import Constants from "expo-constants";

const API_URL = Constants.expoConfig?.extra?.API_URL;
const TMDB_PROFILE_PATH = Constants.expoConfig?.extra?.TMDB_PROFILE;

if (!API_URL) {
  console.log("API_URL YOK");
}

const actorService = {
  getPopularActors: async (page: number = 1) => {
    try {
      const userToken = await SecureStore.getItemAsync("userToken");

      const response = await axios.get(`${API_URL}/actors/popular`, {
        headers: {
          ...(userToken && { Authorization: `Bearer ${userToken}` }),
        },
        params: {
          page: page,
        },
      });
      return response.data.map((actor: any) => {
        const fullProfilePath = actor.profile_path
          ? `${TMDB_PROFILE_PATH}${actor.profile_path}`
          : null;

        return {
          id: actor.id,
          name: actor.name,
          profile_path: fullProfilePath,
          popularity: actor.popularity,
        };
      });
    } catch (error: any) {
      console.log("AKTÖRLER GETİRME HATASI");
    }
  },

  getActorDetails: async (actorId: number) => {
    try {
      const userToken = await SecureStore.getItemAsync("userToken");

      const response = await axios.get(`${API_URL}/actors/${actorId}`, {
        headers: {
          ...(userToken && { Authorization: `Bearer ${userToken}` }),
        },
      });
      const actor = response.data;

      const fullProfilePath = actor.profile_path
        ? `${TMDB_PROFILE_PATH}${actor.profile_path}`
        : null;

      const movieCreditsFormatted =
        actor.movie_credits?.map((movie: any) => ({
          ...movie,
          poster_path: movie.poster_path
            ? `${Constants.expoConfig?.extra?.TMDB_POSTER}${movie.poster_path}`
            : null,
        })) || [];

      return {
        id: actor.id,
        name: actor.name,
        biography: actor.biography,
        birthday: actor.birthday,
        place_of_birth: actor.place_of_birth,
        profile_path: fullProfilePath,
        movie_credits: movieCreditsFormatted,
      };
    } catch (error: any) {
      console.log("AKTÖR DETAYLARI ÇEKİLEMEDİ");
    }
  },
};

export default actorService;
