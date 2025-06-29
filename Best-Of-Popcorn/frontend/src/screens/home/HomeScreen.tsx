import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { useAuth } from "src/context/AuthContext";
import styles from "src/styles/HomeScreenStyle";
import ActorList from "src/components/ActorList";
import MovieList from "src/components/MovieList";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

export default function HomeScreen() {
  const { currentUser, isLoading: authLoading, signOut } = useAuth();

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

  if (authLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Profil yükleniyor...</Text>
      </View>
    );
  }

  const userRoles = currentUser?.role || "";
  const hasMovieRole = userRoles === "movieRole" || userRoles === "adminRole";
  const hasActorRole = userRoles === "actorRole" || userRoles === "adminRole";

  return (
    <SafeAreaView style={styles.fullContainer}>
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
      {hasMovieRole && hasActorRole ? (
        <Tab.Navigator
          screenOptions={{
            tabBarActiveTintColor: "#e74c3c",
            tabBarInactiveTintColor: "gray",
            tabBarLabelStyle: { fontSize: 12, fontWeight: "bold" },
            tabBarStyle: {
              backgroundColor: "#fff",
              height: 60,
              paddingBottom: 5,
            },
            headerShown: false,
          }}
        >
          <Tab.Screen
            name="Filmler"
            component={MovieList}
            options={{
              tabBarLabel: "Filmler",
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons
                  name="movie-roll"
                  color={color}
                  size={size}
                />
              ),
            }}
          />
          <Tab.Screen
            name="Aktörler"
            component={ActorList}
            options={{
              tabBarLabel: "Aktörler",
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons
                  name="account-group"
                  color={color}
                  size={size}
                />
              ),
            }}
          />
        </Tab.Navigator>
      ) : hasMovieRole ? (
        <MovieList />
      ) : hasActorRole ? (
        <ActorList />
      ) : (
        <View style={styles.noRoleContainer}>
          <Text style={styles.noRoleText}>
            Hesabınız için atanmış içerik bulunamadı.
          </Text>
          <Text style={styles.noRoleSubText}>Lütfen yöneticinize danışın.</Text>
        </View>
      )}
    </SafeAreaView>
  );
}
