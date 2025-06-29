import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  Image,
  FlatList,
  ActivityIndicator,
} from "react-native";
import movieService from "../services/movieService";
import styles from "../styles/HomeScreenStyle";
import { useNavigation, NavigationProp } from "@react-navigation/native";

import { RootStackParamList } from "src/types/types";

interface Movie {
  id: number;
  title: string;
  release_date: string;
  overview: string;
  poster_path: string | null;
  vote_average: number;
}

const MovieList: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const fetchedMovies = await movieService.getPopularMovies();
        setMovies(fetchedMovies);
      } catch (error) {
        Alert.alert(
          "Hata",
          "Filmler yüklenemedi. Lütfen internet bağlantınızı kontrol edin."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const renderMovieItem = ({ item }: { item: Movie }) => (
    <TouchableOpacity
      style={styles.movieGridItem}
      onPress={() => navigation.navigate("MovieDetail", { movieId: item.id })}
    >
      {item.poster_path ? (
        <Image
          source={{ uri: item.poster_path }}
          style={styles.gridPosterImage}
        />
      ) : (
        <View style={styles.gridNoPosterContainer}>
          <Text style={styles.gridNoPosterText}>Poster Yok</Text>
        </View>
      )}
      <View style={styles.gridMovieInfo}>
        <Text style={styles.gridMovieTitle}>{item.title}</Text>
        <Text style={styles.gridMovieDetails}>
          Çıkış Tarihi: {item.release_date}
        </Text>
        <Text style={styles.gridMovieDetails}>
          Oy Ortalaması: {item.vote_average?.toFixed(1)}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#e74c3c" />
          <Text style={styles.loadingText}>Filmler yükleniyor...</Text>
        </View>
      ) : (
        <FlatList
          data={movies}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderMovieItem}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.movieGridList}
        />
      )}
    </View>
  );
};

export default MovieList;
