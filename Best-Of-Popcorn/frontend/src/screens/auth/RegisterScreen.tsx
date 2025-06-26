import React from "react";
import { View, Text } from "react-native";

import { RootStackParamList } from "../../types/types";
import { StackScreenProps } from "@react-navigation/stack";

type RegisterScreenType = StackScreenProps<RootStackParamList, "Register">;

export default function RegisterScreen({ navigation }: RegisterScreenType) {
  return (
    <View>
      <Text>RegisterScreen</Text>
    </View>
  );
}
