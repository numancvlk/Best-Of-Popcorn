import React from "react";
import { View, Text } from "react-native";
import { RootStackParamList } from "../../types/types";
import { StackScreenProps } from "@react-navigation/stack";

type HomeScreenType = StackScreenProps<RootStackParamList, "Home">;

export default function HomeScreen({ navigation }: HomeScreenType) {
  return (
    <View>
      <Text>HomeScreen</Text>
    </View>
  );
}
