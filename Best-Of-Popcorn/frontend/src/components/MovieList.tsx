import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  Image,
  FlatList,
  TextInput,
} from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";

//-------------DAHİLİ----------------
import { RootStackParamList } from "src/types/types";
import movieService from "../services/movieService";
import styles from "../styles/MovieListStyle";
import { Colors } from "src/styles/GlobalStyles";

interface Movie {
  id: number;
  title: string;
  release_date: string;
  overview: string;
  poster_path: string | null;
  vote_average: number;
}

const MOVIES_PER_PAGE = 8;

const MovieList: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const fetchMovies = useCallback(
    async (pageNum: number, query: string = "") => {
      if (!hasMore && pageNum > 1) return;

      setLoading(true);
      try {
        let data: Movie[] = [];
        if (query.trim() !== "") {
          data = await movieService.searchMovies(query, pageNum);
        } else {
          data = await movieService.getPopularMovies(pageNum);
        }

        if (data && data.length > 0) {
          setMovies((prevMovies) => {
            const existingMovieIds = new Set(
              prevMovies.map((movie) => movie.id)
            );
            const uniqueNewMovies = data.filter(
              (movie) => !existingMovieIds.has(movie.id)
            );

            if (pageNum === 1) {
              return uniqueNewMovies;
            } else {
              return [...prevMovies, ...uniqueNewMovies];
            }
          });
          setPage(pageNum);

          if (data.length < MOVIES_PER_PAGE) {
            setHasMore(false);
          }
        } else {
          setHasMore(false);
        }
      } catch (error) {
        Alert.alert(
          "HATA",
          "Filmler yüklenemedi. Lütfen internet bağlantınızı kontrol edin."
        );
      } finally {
        setLoading(false);
      }
    },
    [hasMore]
  );

  useEffect(() => {
    const delayDebounceFn = setTimeout(
      () => {
        fetchMovies(1, searchQuery);
      },
      searchQuery ? 500 : 0
    );

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, fetchMovies]);

  const handleLoadMore = () => {
    if (!loading && hasMore) {
      fetchMovies(page + 1, searchQuery);
    }
  };

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
      <TextInput
        style={styles.searchBar}
        placeholder="Film ara..."
        placeholderTextColor={Colors.textSecondary}
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderMovieItem}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.movieGridList}
        showsVerticalScrollIndicator={false}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
};

export default MovieList;
