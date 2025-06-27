import React from "react";
import { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  Image,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { RootStackParamList } from "../../types/types";
import { StackScreenProps } from "@react-navigation/stack";
import { useAuth } from "src/context/AuthContext";
import movieService from "src/services/movieService";
import styles from "src/styles/HomeScreenStyle";

type HomeScreenType = StackScreenProps<RootStackParamList, "Home">;

interface Movie {
  id: number;
  title: string;
  release_date: string;
  overview: string;
  poster_path: string | null;
  vote_average: number;
}

export default function HomeScreen({ navigation }: HomeScreenType) {
  const { signOut } = useAuth();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const fetchedMovies = await movieService.getPopularMovies();
        setMovies(fetchedMovies);
      } catch (error) {
        console.error("Filmler yüklenirken hata oluştu");
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

  const handleLogout = () => {
    Alert.alert("Çıkış Yap", "Çıkış yapmak istediğinizden eminmisiniz?", [
      {
        text: "İptal",
        style: "cancel",
      },
      {
        text: "Çıkış Yap",
        onPress: async () => {
          try {
            await signOut();
          } catch (error: any) {
            Alert.alert("Hata", "Çıkış yapılırken bir sorun oluştu");
          }
        },
        style: "destructive",
      },
    ]);
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
      <View style={styles.header}>
        <Text style={styles.headerTitle}>BEST OF POPCORN</Text>
        <TouchableOpacity
          onPress={handleLogout}
          activeOpacity={0.7}
          style={styles.logoutButton}
        >
          <Text style={styles.logoutButtonText}>Çıkış</Text>
        </TouchableOpacity>
      </View>

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
}
