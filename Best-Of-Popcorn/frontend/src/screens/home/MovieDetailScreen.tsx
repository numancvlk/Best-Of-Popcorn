import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
} from "react-native";

import { RootStackParamList } from "../../types/types";
import { StackScreenProps } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import movieService from "src/services/movieService";
import stlyes from "src/styles/MovieDetailScreenStyle";

type MovieDetailType = StackScreenProps<RootStackParamList, "MovieDetail">;

interface MovieDetail {
  id: number;
  title: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  overview: string;
  vote_average: number;
  runtime: number | null;
  genres: string;
  tagline: string | null;
}

export default function MovieDetailScreen({
  route,
  navigation,
}: MovieDetailType) {
  const { movieId } = route.params;

  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [loading, setLoading] = useState(true);

  const TMDB_POSTER = process.env.TMDB_POSTER || "";
  const TMDB_BACKDROP = process.env.TMDB_BACKDROP || "";

  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        setLoading(true);
        const movieData = await movieService.getMovieDetailFromTMDB(movieId);
        if (movieData) {
          setMovie(movieData);
        } else {
          Alert.alert("HATA", "Belirtilen film bulunamadı.");
        }
      } catch (error: any) {
        Alert.alert("HATA", error.message || "Film detayları yüklenemedi.");
      } finally {
        setLoading(false);
      }
    };
    fetchMovieDetail();
  }, [movieId]);

  if (loading) {
    return (
      <View>
        <ActivityIndicator size="large" color="#e74c3c" />
        <Text>Film detayları yükleniyor...</Text>
      </View>
    );
  }

  if (!movie) {
    return (
      <View style={stlyes.errorContainer}>
        <Text style={stlyes.errorText}>Film bulunamadı.</Text>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={stlyes.backButton}
        >
          <Text style={stlyes.backButtonText}>Geri Dön</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={stlyes.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={stlyes.backIconContainer}
      >
        <Ionicons name="arrow-back-circle" size={36} color="#e74c3c" />
      </TouchableOpacity>

      {movie.backdrop_path && (
        <>
          <Image
            source={{
              uri: `${TMDB_BACKDROP}${movie.backdrop_path}`,
            }}
            style={stlyes.backdropImage}
          />
        </>
      )}

      <View style={stlyes.posterContainer}>
        {movie.poster_path ? (
          <>
            <Image
              source={{ uri: `${TMDB_POSTER}${movie.poster_path}` }}
              style={stlyes.posterImage}
            />
          </>
        ) : (
          <View style={stlyes.noPosterContainer}>
            <Text style={stlyes.noPosterText}>Afiş Yok</Text>
          </View>
        )}
      </View>

      <View style={stlyes.infoContainer}>
        <Text style={stlyes.title}>{movie.title}</Text>
        {movie.tagline && <Text style={stlyes.tagline}>{movie.tagline}</Text>}
        <Text style={stlyes.detailText}>
          Çıkış Tarihi:{" "}
          {movie.release_date ? movie.release_date.substring(0, 4) : "N/A"}
        </Text>
        <Text style={stlyes.detailText}>
          IMDb Puanı:{" "}
          {movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}
        </Text>
        {movie.runtime && (
          <Text style={stlyes.detailText}>Süre: {movie.runtime} dakika</Text>
        )}
        {movie.genres && movie.genres?.length > 0 && (
          <Text style={stlyes.detailText}>
            Türler: {movie.genres.split(",").join(",")}
          </Text>
        )}
        <Text style={stlyes.overviewTitle}>Genel Bakış</Text>
        <Text style={stlyes.overviewText}>{movie.overview || "BİLGİ YOK"}</Text>
      </View>
    </ScrollView>
  );
}
