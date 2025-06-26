import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { RootStackParamList } from "./src/types/types";

//---------SCREENS--------------
import HomeScreen from "./src/screens/home/HomeScreen";
import LoginScreen from "./src/screens/auth/LoginScreen";
import RegisterScreen from "./src/screens/auth/RegisterScreen";
import MovieDetailScreen from "./src/screens/home/MovieDetailScreen";

const STACK = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <STACK.Navigator>
        <STACK.Screen name="Login" component={LoginScreen} />
        <STACK.Screen name="Register" component={RegisterScreen} />
        <STACK.Screen name="Home" component={HomeScreen} />
        <STACK.Screen name="MovieDetail" component={MovieDetailScreen} />
      </STACK.Navigator>
    </NavigationContainer>
  );
}
