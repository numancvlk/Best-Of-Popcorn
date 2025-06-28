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
import styles from "src/styles/MovieDetailScreenStyle";

type MovieDetailType = StackScreenProps<RootStackParamList, "MovieDetail">;

interface Comment {
  id: string;
  userId: {
    username: string;
  };
  rating: number;
  comment: string;
  createdAt: string;
}
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
  reviews?: Comment[];
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
        const movieData = await movieService.getMovieDetailAndReviews(movieId);
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
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Film bulunamadı.</Text>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Text style={styles.backButtonText}>Geri Dön</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backIconContainer}
      >
        <Ionicons name="arrow-back-circle" size={36} color="#e74c3c" />
      </TouchableOpacity>

      {movie.backdrop_path && (
        <>
          <Image
            source={{
              uri: `${TMDB_BACKDROP}${movie.backdrop_path}`,
            }}
            style={styles.backdropImage}
          />
        </>
      )}

      <View style={styles.posterContainer}>
        {movie.poster_path ? (
          <>
            <Image
              source={{ uri: `${TMDB_POSTER}${movie.poster_path}` }}
              style={styles.posterImage}
            />
          </>
        ) : (
          <View style={styles.noPosterContainer}>
            <Text style={styles.noPosterText}>Afiş Yok</Text>
          </View>
        )}
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.title}>{movie.title}</Text>
        {movie.tagline && <Text style={styles.tagline}>{movie.tagline}</Text>}
        <Text style={styles.detailText}>
          Çıkış Tarihi:{" "}
          {movie.release_date ? movie.release_date.substring(0, 4) : "N/A"}
        </Text>
        <Text style={styles.detailText}>
          IMDb Puanı:{" "}
          {movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}
        </Text>
        {movie.runtime && (
          <Text style={styles.detailText}>Süre: {movie.runtime} dakika</Text>
        )}
        {movie.genres && movie.genres?.length > 0 && (
          <Text style={styles.detailText}>
            Türler: {movie.genres.split(",").join(",")}
          </Text>
        )}
        <Text style={styles.overviewTitle}>Genel Bakış</Text>
        <Text style={styles.overviewText}>{movie.overview || "BİLGİ YOK"}</Text>

        <Text style={styles.sectionTitle}>Yorumlar</Text>

        {movie.reviews && movie.reviews.length > 0 ? (
          movie.reviews.map((comment, index) => (
            <View key={index.toString()} style={styles.commentContainer}>
              <Text style={styles.commentAuthor}>
                {comment.userId.username}{" "}
              </Text>
              <Text style={styles.commentText}>{comment.comment}</Text>
              {comment.createdAt && (
                <Text style={styles.commentDate}>
                  {new Date(comment.createdAt).toLocaleDateString()}
                </Text>
              )}
            </View>
          ))
        ) : (
          <Text style={styles.noCommentsText}>
            Bu film için henüz yorum bulunmamaktadır.
          </Text>
        )}
      </View>
    </ScrollView>
  );
}
