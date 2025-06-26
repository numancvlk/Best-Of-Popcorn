import React from "react";
import { View, Text } from "react-native";
import { RootStackParamList } from "../../types/types";
import { StackScreenProps } from "@react-navigation/stack";

type LoginScreenType = StackScreenProps<RootStackParamList, "Login">;

export default function LoginScreen({ navigation }: LoginScreenType) {
  return (
    <View>
      <Text>LoginScreen</Text>
    </View>
  );
}
