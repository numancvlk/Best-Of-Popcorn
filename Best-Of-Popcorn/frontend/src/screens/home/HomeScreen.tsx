import React from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { RootStackParamList } from "../../types/types";
import { StackScreenProps } from "@react-navigation/stack";
import { useAuth } from "src/context/AuthContext";

type HomeScreenType = StackScreenProps<RootStackParamList, "Home">;

export default function HomeScreen({ navigation }: HomeScreenType) {
  const { signOut } = useAuth();

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
  return (
    <View>
      <Text>Hoş Geldin!</Text>
      <TouchableOpacity onPress={handleLogout} activeOpacity={0.7}>
        <Text>Çıkış Yap!</Text>
      </TouchableOpacity>
    </View>
  );
}
