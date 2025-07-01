import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NavigationProp } from "@react-navigation/native";

//-----------------DAHİLİ-----------------------
import { RootStackParamList } from "src/types/types";
import styles from "src/styles/ActorListStyles";
import actorService from "../services/actorService";
import { Colors } from "src/styles/GlobalStyles";

interface Actor {
  id: number;
  name: string;
  profile_path: string | null;
  popularity: number;
}

const ActorList: React.FC = () => {
  const [actors, setActors] = useState<Actor[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const fetchActors = useCallback(
    async (pageNum: number, query: string = "") => {
      if (!hasMore && pageNum > 1) {
        setLoadingMore(false);
        return;
      }
      if (pageNum === 1) {
        setLoading(true);
      } else {
        setLoadingMore(true);
      }
      try {
        let data: Actor[] = [];

        if (query.trim() !== "") {
          data = await actorService.searchActors(query, pageNum);
        } else {
          data = await actorService.getPopularActors(pageNum);
        }
        if (data && data.length > 0) {
          setActors((prevActors) => {
            const newActors = pageNum === 1 ? data : [...prevActors, ...data];
            const uniqueActors = Array.from(
              new Map(newActors.map((actor) => [actor.id, actor])).values()
            );
            return uniqueActors;
          });
          setPage(pageNum);
          if (data.length < 20) {
            setHasMore(false);
          }
        } else {
          setHasMore(false);
        }
      } catch (error) {
        Alert.alert(
          "HATA",
          "Aktörler sayfasında hata oluştu. Lütfen daha sonra tekrar deneyiniz."
        );
      } finally {
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    const delayDebounceFn = setTimeout(
      () => {
        fetchActors(1, searchQuery);
      },
      searchQuery ? 500 : 0
    );

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, fetchActors]);

  const handleLoadMore = () => {
    if (!loading && hasMore) {
      fetchActors(page + 1, searchQuery);
    }
  };

  const renderActor = ({ item }: { item: Actor }) => (
    <TouchableOpacity
      style={styles.actorCard}
      onPress={() => navigation.navigate("ActorDetail", { actorId: item.id })}
    >
      {item.profile_path ? (
        <Image source={{ uri: item.profile_path }} style={styles.actorImage} />
      ) : (
        <View style={styles.noImageContainer}>
          <Text style={styles.noImageText}>Resim Yok</Text>
        </View>
      )}
      <Text style={styles.actorName}>{item.name}</Text>
      <Text style={styles.actorPopularity}>
        Popülerlik: {item.popularity.toFixed(1)}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Aktör ara..."
        placeholderTextColor={Colors.textSecondary}
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <FlatList
        data={actors}
        renderItem={renderActor}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.listContainer}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={() =>
          loading && hasMore ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : null
        }
        ListEmptyComponent={() =>
          !loading && <Text style={styles.emptyText}>Aktör bulunamadı.</Text>
        }
      />
    </View>
  );
};

export default ActorList;
