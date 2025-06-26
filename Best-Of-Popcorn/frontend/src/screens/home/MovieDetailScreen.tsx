import React from "react";
import { View, Text } from "react-native";

import { RootStackParamList } from "../../types/types";
import { StackScreenProps } from "@react-navigation/stack";

type MovieDetailType = StackScreenProps<RootStackParamList, "MovieDetail">;

export default function MovieDetailScreen({ navigation }: MovieDetailType) {
  return (
    <View>
      <Text>MovieDetailScreen</Text>
    </View>
  );
}
