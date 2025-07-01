import axios from "axios";
import * as SecureStore from "expo-secure-store";
import Constants from "expo-constants";

const API_URL = Constants.expoConfig?.extra?.API_URL;
const TMDB_PROFILE_PATH = Constants.expoConfig?.extra?.TMDB_PROFILE;

interface ActorDetail {
  id: number;
  name: string;
  biography: string;
  birthday: string;
  place_of_birth: string;
  profile_path: string | null;
  movie_credits: MovieCredit[];
}

interface MovieCredit {
  id: number;
  title: string;
  poster_path: string | null;
  character: string;
}

interface Actor {
  id: number;
  name: string;
  profile_path: string | null;
  popularity: number;
}

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

  searchActors: async (query: string, page: number = 1): Promise<Actor[]> => {
    try {
      const userToken = await SecureStore.getItemAsync("userToken");

      const response = await axios.get(`${API_URL}/actors/search/`, {
        headers: {
          ...(userToken && { Authorization: `Bearer ${userToken}` }),
        },
        params: {
          query: query,
          page: page,
        },
      });

      return response.data.map((actor: any) => ({
        id: actor.id,
        name: actor.name,
        popularity: actor.popularity,
        profile_path: actor.profile_path
          ? `${TMDB_PROFILE_PATH}${actor.profile_path}`
          : null,
      }));
    } catch (error: any) {
      console.error("Aktör arama hatası");
      throw error;
    }
  },

  getActorDetails: async (actorId: number): Promise<ActorDetail> => {
    try {
      const userToken = await SecureStore.getItemAsync("userToken");

      const headers: { [key: string]: string } = {
        "Content-Type": "application/json",
      };

      if (userToken) {
        headers.Authorization = `Bearer ${userToken}`;
      }

      const response = await axios.get(`${API_URL}/actors/${actorId}`, {
        headers: headers,
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
      throw new Error("Aktör detayları yüklenemiyor");
    }
  },
};

export default actorService;
