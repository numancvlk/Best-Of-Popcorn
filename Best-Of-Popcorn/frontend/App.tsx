import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { RootStackParamList } from "./src/types/types";

//---------SCREENS--------------
import HomeScreen from "./src/screens/home/HomeScreen";
import LoginScreen from "./src/screens/auth/LoginScreen";
import RegisterScreen from "./src/screens/auth/RegisterScreen";
import MovieDetailScreen from "./src/screens/home/MovieDetailScreen";
import ActorDetailScreen from "src/screens/home/ActorDetailScreen";
import { AuthProvider, useAuth } from "./src/context/AuthContext";

const STACK = createStackNavigator<RootStackParamList>();

function AppContent() {
  const { userToken, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <STACK.Navigator screenOptions={{ headerShown: false }}>
        {userToken === null ? (
          <>
            <STACK.Screen name="Login" component={LoginScreen} />
            <STACK.Screen name="Register" component={RegisterScreen} />
          </>
        ) : (
          <>
            <STACK.Screen name="Home" component={HomeScreen} />
            <STACK.Screen name="MovieDetail" component={MovieDetailScreen} />
            <STACK.Screen name="ActorDetail" component={ActorDetailScreen} />
          </>
        )}
      </STACK.Navigator>
    </NavigationContainer>
  );
}
export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1a1a2e",
  },
});
