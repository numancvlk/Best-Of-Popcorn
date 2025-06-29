import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Image,
  TouchableOpacity,
} from "react-native";
import actorService from "../services/actorService";
import { useNavigation } from "@react-navigation/native";
import styles from "src/styles/ActorListStyles";
import { NavigationProp } from "@react-navigation/native";

import { RootStackParamList } from "src/types/types";

interface Actor {
  id: number;
  name: string;
  profile_path: string | null;
  popularity: number;
}

const ActorList: React.FC = () => {
  const [actors, setActors] = useState<Actor[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const fetchActors = async (pageNum: number) => {
    if (!hasMore && pageNum > 1) return;
    setLoading(true);
    try {
      const data = await actorService.getPopularActors(pageNum);
      if (data && data.length > 0) {
        setActors((prevActors) =>
          pageNum === 1 ? data : [...prevActors, ...data]
        );
        setPage(pageNum);
        if (data.length < 20) {
          setHasMore(false);
        }
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.log("Aktörleri çekerken hata");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActors(1);
  }, []);

  const handleLoadMore = () => {
    if (!loading && hasMore) {
      fetchActors(page + 1);
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
