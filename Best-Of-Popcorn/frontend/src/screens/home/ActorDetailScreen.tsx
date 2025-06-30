import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  ActivityIndicator,
  Alert,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useRoute, RouteProp, useNavigation } from "@react-navigation/native";
import actorService from "../../services/actorService";
import styles from "src/styles/ActorDetailScreenStyles";
import { Ionicons } from "@expo/vector-icons";
import { RootStackParamList } from "src/types/types";
import { NavigationProp } from "@react-navigation/native";
type ActorDetailRouteParams = {
  actorId: number;
};

type ActorDetailScreenRouteProp = RouteProp<
  Record<string, ActorDetailRouteParams>,
  "ActorDetail"
>;

type ActorDetailScreenNavigationProp = NavigationProp<
  RootStackParamList,
  "ActorDetail"
>;

const ActorDetailScreen: React.FC = () => {
  const route = useRoute<ActorDetailScreenRouteProp>();
  const navigation = useNavigation<ActorDetailScreenNavigationProp>();
  const { actorId } = route.params;

  const [actorDetails, setActorDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchActorDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const details = await actorService.getActorDetails(actorId);
        setActorDetails(details);
      } catch (err: any) {
        Alert.alert("Hata", "Aktör bilgileri getirilirken bir hata oluştu.");
      } finally {
        setLoading(false);
      }
    };

    if (actorId) {
      fetchActorDetails();
    } else {
      setLoading(false);
    }
  }, [actorId]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Yükleniyor...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Hata: {error}</Text>
      </View>
    );
  }

  if (!actorDetails) {
    return (
      <View style={styles.centered}>
        <Text>Aktör detayı bulunamadı.</Text>
      </View>
    );
  }

  const renderMovieCredit = ({ item }: { item: any }) => (
    <View style={styles.movieCard}>
      <Image
        source={{
          uri: item.poster_path,
        }}
        style={styles.moviePoster}
      />
      <Text style={styles.movieTitle} numberOfLines={2}>
        {item.title}
      </Text>
      <Text style={styles.movieCharacter} numberOfLines={1}>
        ({item.character})
      </Text>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backIconContainer}
      >
        <Ionicons name="arrow-back-circle" size={36} color="#e74c3c" />
      </TouchableOpacity>
      <View style={styles.header}>
        {actorDetails.profile_path ? (
          <Image
            source={{ uri: actorDetails.profile_path }}
            style={styles.profileImage}
          />
        ) : (
          <View style={styles.noImageContainer}>
            <Text style={styles.noImageText}>Resim Yok</Text>
          </View>
        )}
        <Text style={styles.actorName}>{actorDetails.name}</Text>
      </View>

      {actorDetails.biography ? (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Biyografi</Text>
          <Text style={styles.biographyText}>{actorDetails.biography}</Text>
        </View>
      ) : null}

      {actorDetails.movie_credits && actorDetails.movie_credits.length > 0 ? (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Oynadığı Filmler</Text>
          <FlatList
            data={actorDetails.movie_credits}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderMovieCredit}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.movieCreditsContainer}
          />
        </View>
      ) : (
        <View style={styles.section}>
          <Text style={styles.noMoviesText}>
            Bu aktöre ait film bilgisi bulunamadı.
          </Text>
        </View>
      )}
    </ScrollView>
  );
};

export default ActorDetailScreen;
